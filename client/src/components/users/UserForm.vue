<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        <template v-if="user.id !== null">
          <span>Editar usuario</span>
        </template>
        <template v-else>
          <span>Registrar usuario</span>
        </template>
      </p>
    </header>

    <div class="card-content">
      <div class="content is-clearfix">
        <form
          method="POST"
          action="/users/register"
          enctype="multipart/form-data"
          @submit.prevent="saveUser()"
        >
          <div class="columns">
            <div class="column">
              <b-field
                label="Nombre"
                label-position="inside"
              >
                <b-input
                  v-model="user.firstname"
                  type="text"
                  maxlength="50"
                  required
                >
                </b-input>
              </b-field>
            </div>

            <div class="column">
              <b-field
                label="Apellido"
                label-position="inside"
              >
                <b-input
                  v-model="user.lastname"
                  type="text"
                  maxlength="50"
                  required
                >
                </b-input>
              </b-field>
            </div>
          </div>
          
          <div class="columns">
            <div class="column">
              <b-field
                label="Nombre de usuario"
                label-position="inside"
              >
                <b-input
                  v-model="user.username"
                  type="text"
                  maxlength="50"
                  required
                >
                </b-input>
              </b-field>
            </div>

            <div class="column">
              <b-field
                label="Correo electrónico"
                label-position="inside"
              >
                <b-input
                  v-model="user.email"
                  type="email"
                  maxlength="100"
                >
                </b-input>
              </b-field>
            </div>
          </div>
          
          <div class="columns">
            <div class="column">
              <b-field
                label="Contraseña"
                label-position="inside"
              >
                <b-input
                  v-model="user.password"
                  type="password"
                  maxlength="250"
                  icon-pack="fas"
                  password-reveal
                  :required="passwordRequired"
                >
                </b-input>
              </b-field>
            </div>
            
            <div class="column">
              <b-field
                label="Confirmar contraseña"
                label-position="inside"
              >
                <b-input
                  v-model="user.retyped_password"
                  type="password"
                  maxlength="250"
                  icon-pack="fas"
                  password-reveal
                  :required="passwordRequired"
                >
                </b-input>
              </b-field>
            </div>
          </div>
          
          <div class="columns">
            <div class="column">
              <label class="label">Sexo</label>
              <b-field>
                <b-radio-button
                  v-model="user.sex"
                  native-value="M"
                  type="is-info"
                >
                  <b-icon
                    pack="fas"
                    icon="mars"
                  ></b-icon>
                  <span>Masculino</span>
                </b-radio-button>

                <b-radio-button
                  v-model="user.sex"
                  native-value="F"
                  type="is-danger"
                >
                  <b-icon
                    pack="fas"
                    icon="venus"
                  ></b-icon>
                  <span>Femenino</span>
                </b-radio-button>
              </b-field>
            </div>

            <div class="column">
              <div class="columns">
                <div class="column">
                  <b-field
                    label="Dirección"
                    label-position="inside"
                  >
                    <b-select
                      placeholder="Seleccionar ciudad"
                      v-model="user.direction.city"
                    >
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
                    </b-select>
                  </b-field>

                </div>

                <div class="column">
                  <b-field
                    label="Rol"
                    label-position="inside"
                  >
                    <b-select placeholder="Seleccionar rol">
                      <option value="1">Admin</option>
                    </b-select>
                  </b-field>
                </div>
              </div>
            </div>
          </div>

          <div class="hr"></div>

          <div class="columns">
            <div class="column">
              <b-field>
                <b-upload 
                  v-model="file"
                  drag-drop
                  name="user-image"
                  accept="image/*"
                >
                  <section class="section">
                    <div class="content has-text-centered">
                    <p>
                        <b-icon
                        pack="fas"
                        icon="upload"
                        size="is-large"
                        >
                        </b-icon>
                    </p>
                    <p>Drop your files here or click to upload</p>
                    </div>
                  </section>
                </b-upload>
              </b-field>
              <b-field>
                <b-message v-if="file">
                  {{ file.name }}
                </b-message>
              </b-field>
            </div>
          </div>

          <b-field class="is-pulled-right">
            <div class="buttons">
              <b-button
                title="Limpiar campos"
                type="is-text"
                @click="clearInputs()"
              >
                <span>Limpiar</span>
              </b-button>
              <b-button
                title="Registrar usuario"
                type="is-primary"
                native-type="submit"
              >
                <template v-if="user.id !== null">
                  <span>Guardar</span>
                </template>
                <template v-else>
                  <span>Registrar</span>
                </template>
              </b-button>
            </div>
          </b-field>
        </form>
      </div>
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
        id: null,
        index: "",
        username: null,
        firstname: "",
        lastname: "",
        email: "",
        email_id: "",
        password: "",
        retyped_password: "",
        sex: "",
        image: "",
        direction_id: "",
        direction: {
          province: "",
          city: null
        },
        fecha_creacion: "",
        fecha_modificado: ""
      },
      directions: {
        provinces: [],
        cities: []
      },
      passwordRequired: true,
      file: null
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
  async mounted() {
    try {
      const response = await axios.get("http://localhost:8081/directions");
      const direcciones = response.data;
      console.log(response);

      Object.keys(direcciones).forEach(key => {
        this.directions[key] = direcciones[key].sort((a, b) => {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          return 0;
        });
      });

      console.log(this.directions);
    } catch(error) {
        console.log(error, error.response);
    }

    EventBus.$on("edit-user", user => {
      console.log(user);
      Object.assign(this.user, user);
      this.user.password = "";
      this.user.retyped_password = "";
      this.user.direction = {
        province: "",
        city: ""
      };
    });
  },
  methods: {
    clearInputs() {
      for (const key in this.user) {
        if (this.user.hasOwnProperty(key)) {
          this.user[key] = "";
        }
      }
      this.user.id = null;
      this.user.direction = {
        province: "",
        city: ""
      };
    },

    onImageChange() {
      this.isInitial = false;
      this.user.image = this.$refs.userImage.files[0].name
      console.log("H");
    },

    async saveUser() {
      if (
        this.user.username === ""
        || this.user.password === ""
        || this.user.retyped_password === ""
        || this.user.firstname === ""
        || this.user.lastname === ""
        || this.user.sex === ""
      ) {
        this.$toast.error({
          title: "Error",
          message: "Campos no opcionales son requeridos.",
          toastConfigs
        });
        return;
      }

      if (this.user.password !== this.user.retyped_password) {
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

      if (this.$refs.userimage.files[0]) {
        console.log('loaded');
        userData.append(
          "image",
          this.$refs.userimage.files[0],
          this.$refs.userimage.files[0].name
        );
      }

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
              this.user.retyped_password = "";

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
