<template>
  <div class="card mb-4">
    <div class="card-header bg-dark text-white">
      <template v-if="user.id !== ''">
        <span>Editar usuario</span>
      </template>
      <template v-else>
        <span>Registrar usuario</span>
      </template>
    </div>
    <div class="card-body bg-light">
      <form
        method="POST"
        action="/users/register"
        enctype="multipart/form-data"
        @submit.prevent
        class="form"
      >
        <div class="form-row">
          <div class="col">
            <div class="form-group">
              <label>Nombre</label>
              <input
                class="form-control"
                type="text"
                name="firstname"
                v-model="user.firstname"
                autofocus
                required
              >
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label>Apellido</label>
              <input
                class="form-control"
                type="text"
                name="lastname"
                v-model="user.lastname"
                required
              >
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="col">
            <div class="form-group">
              <label>Nombre de usuario</label>
              <input
                class="form-control"
                type="text"
                id="username"
                name="username"
                v-model="user.username"
                autocomplete="username"
                required
              >
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label>
                <span>Correo electr&oacute;nico&nbsp;</span>
                <small class="text-muted">
                  <i>Opcional</i>
                </small>
              </label>
              <input class="form-control" type="email" name="email" v-model="user.email">
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="col">
            <div class="form-group">
              <label id="password-label">Contraseña</label>
              <input
                class="form-control"
                type="password"
                id="password"
                name="password"
                v-model="user.password"
                autocomplete="password"
                required
              >
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label id="retyped-password-label">Repetir Contraseña</label>
              <input
                class="form-control"
                type="password"
                id="retyped-password"
                v-model="user.retypedPassword"
                required
              >
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="col">
            <div class="form-group">
              <label class="d-block">Sexo</label>
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  id="m-radio"
                  type="radio"
                  name="sex"
                  class="custom-control-input"
                  value="M"
                  v-model="user.sex"
                  required
                >
                <label for="m-radio" class="custom-control-label">Masculino</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  id="f-radio"
                  type="radio"
                  name="sex"
                  class="custom-control-input"
                  value="F"
                  v-model="user.sex"
                  required
                >
                <label for="f-radio" class="custom-control-label">Femenino</label>
              </div>
            </div>
          </div>
          <div class="col">
            <label>
              <span>Direcci&oacute;n&nbsp;</span>
              <small class="text-muted">
                <i>Opcional</i>
              </small>
            </label>
            <div class="form-row">
              <div class="mb-2 col d-sm-block d-lg-inline">
                <select class="custom-select" v-model="user.direction.city">
                  <option value selected>Seleccionar ciudad...</option>
                  <optgroup
                    v-for="province in directions.provinces"
                    :key="province.provincia_id"
                    :label="province.nombre"
                  >
                    <option
                      v-for="city in cities[province.provincia_id]"
                      :key="city.ciudad_id"
                      :value="city.ciudad_id"
                    >
                      <span>{{ city.nombre }}</span>
                    </option>
                  </optgroup>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="hr"></div>
        <div class="form-row">
          <div class="mb-2 col d-sm-block d-lg-inline" id="image-picker">
            <label>
              <span>Foto de perfil&nbsp;</span>
              <small class="text-muted">
                <i>Opcional</i>
              </small>
            </label>
            <input
              class="form-control-file"
              type="file"
              accept="image/*"
              name="image"
              ref="userimage"
              :disabled="isUploading"
              @change="onImageChange"
            >
            <p v-if="isInitial">Arrastra o selecciona alguna imagen.</p>
            <p v-if="isUploading">Subiendo imagen...</p>
          </div>
        </div>
        <div class="form-row">
          <div class="col-4 offset-8">
            <div class="float-right">
              <button
                id="clear-btn"
                type="button"
                title="Limpiar campos"
                class="btn btn-link"
                @click="clearInputs()"
              >
                <span>Limpiar</span>
              </button>
              <button
                id="submit-btn"
                type="submit"
                title="Registrar usuario"
                class="btn btn-success"
                @click="saveUser()"
              >
                <template v-if="user.id !== ''">
                  <span>Guardar</span>
                </template>
                <template v-else>
                  <span>Registrar</span>
                </template>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/EventBus.js";
import swal from "sweetalert";
import axios from "axios";
import { toastConfigs, showAlert } from "@/mixins/mixin";

export default {
  name: "UserForm",
  data() {
    return {
      user: {
        id: "",
        index: "",
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        email_id: "",
        password: "",
        retypedPassword: "",
        sex: "",
        image: "",
        direction_id: "",
        direction: {
          province: "",
          city: ""
        },
        fecha_creacion: "",
        fecha_modificado: ""
      },
      directions: {
        provinces: [],
        cities: []
      },
      isUploading: false,
      isInitial: true
    };
  },
  computed: {
    addresses() {
      let cities = this.directions.cities.reduce((accumulator, value) => {
        if (!accumulator[value.provincia_id]) {
          accumulator[value.provincia_id] = [];
        }

        accumulator[value.provincia_id].push(value);
        return accumulator;
      }, {});

      return this.directions.provinces.map(province => {
        province.cities = cities[province.provincia_id] || [];
        return province;
      });
    },
    cities() {
      return this.directions.cities.reduce((accumulator, value) => {
        if (!accumulator[value.provincia_id]) {
          accumulator[value.provincia_id] = [];
        }

        accumulator[value.provincia_id].push(value);
        return accumulator;
      }, {});
    }
  },
  mounted() {
    // axios
    //   .get("localhost:8081/users")
    //   .then(response => {
    //     let direcciones = response.data;
    //     Object.keys(direcciones).forEach(key => {
    //       this.directions[key] = direcciones[key].sort((a, b) => {
    //         if (a.nombre > b.nombre) {
    //           return 1;
    //         }
    //         if (a.nombre < b.nombre) {
    //           return -1;
    //         }
    //         return 0;
    //       });
    //     });
    //   })
    //   .catch(error => {
    //     console.log(error, error.response);
    //   });
    EventBus.$on("edit-user", user => {
      this.user = user;
      this.user.password = "";
      this.user.retypedPassword = "";
      this.user.direction = {
        province: "",
        city: ""
      };
    });
  },
  methods: {
    clearInputs() {
      Object.keys(this.user).forEach(key => (this.user[key] = ""));
      this.user.direction = {
        province: "",
        city: ""
      };
    },

    onImageChange() {
      this.isInitial = false;
      console.log("H");
    },

    async saveUser() {
      if (
        this.user.username === "" ||
        this.user.password === "" ||
        this.user.retypedPassword === "" ||
        this.user.firstname === "" ||
        this.user.lastname === "" ||
        this.user.sex === ""
      ) {
        this.$toast.error({
          title: "Error",
          message: "Campos no opcionales son requeridos.",
          toastConfigs
        });
        return;
      }

      if (this.user.password !== this.user.retypedPassword) {
        this.$toast.error({
          title: "Error",
          message: "Las constraseñas deben coincidir.",
          toastConfigs
        });
        return;
      }

      let userData = new FormData();
      userData.append("id", this.user.id);
      userData.append("firstname", this.user.firstname);
      userData.append("lastname", this.user.lastname);
      userData.append("username", this.user.username);
      userData.append("email", this.user.email);
      userData.append("password", this.user.password);
      userData.append("sex", this.user.sex);
      userData.append("fecha_creacion", this.user.fecha_creacion);
      userData.append(
        "image",
        this.$refs.userimage.files[0],
        this.$refs.userimage.files[0].name
      );
      console.log(this.$refs.userimage.files[0].name);

      try {
        const confirmation = await swal({
          title: "Confirmar registro",
          icon: "warning",
          buttons: ["Cancelar", "Confirmo"]
        });

        if (confirmation) {
          try {
            const response = await axios.post("/users/register", userData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            });

            console.log(response);

            if (response.data.status === "success") {
              this.clearInputs();

              showAlert("Notificación", response.data.message, "success", 2000);
              this.users.splice(0, 0, response.data.user);
            } else if (response.data.status === "info") {
              this.clearInputs();

              let updatedUser = response.data.user;
              let existingUser = this.users.find(
                user => user.id === updatedUser.id
              );
              let index = this.users.indexOf(existingUser);

              this.users.splice(index, 1, updatedUser);
              showAlert("Información", response.data.message, "info", 2000);
            }
          } catch (error) {
            if (error.response) {
              this.user.password = "";
              this.user.retypedPassword = "";

              this.$toastr.error(
                error.response.data.message,
                "Error",
                toastConfigs
              );
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
