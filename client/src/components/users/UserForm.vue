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
          action="/users"
          enctype="multipart/form-data"
          @submit.prevent
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
                  maxlength="25"
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
                  v-model="user.retypedPassword"
                  type="password"
                  maxlength="25"
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
                  v-model="user.sexo"
                  native-value="Masculino"
                  type="is-info"
                  required
                >
                  <b-icon
                    pack="fas"
                    icon="mars"
                  ></b-icon>
                  <span>Masculino</span>
                </b-radio-button>

                <b-radio-button
                  v-model="user.sexo"
                  native-value="Femenino"
                  type="is-danger"
                  required
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
                      <option
                        selected
                        :value="null"
                      >
                        Seleccionar ciudad
                      </option>
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
                    <b-select
                      placeholder="Seleccionar rol"
                      v-model="user.role_id"
                    >
                      <option
                        :value="null"
                        selected
                      >
                        Seleccionar rol
                      </option>

                      <option
                        v-for="role in roles"
                        :key="role.id"
                        :value="role.id"
                      >
                        {{ role.rol }}
                      </option>
                    </b-select>
                  </b-field>
                </div>
              </div>
            </div>
          </div>

          <div class="hr"></div>

          <div class="columns">
            <div class="column">
              <b-field grouped group-multiline>
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
                :disabled="isSaving"
                @click="saveUser()"
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
import { toastr, showAlert } from "@/mixins/mixin";
import swal from "sweetalert";
import axios from "axios";

const server = `http://localhost:8081`;

export default {
  name: "UserForm",
  data() {
    return {
      user: {
        id: null,
        index: null,
        username: null,
        firstname: null,
        lastname: null,
        email: null,
        email_id: null,
        password: null,
        retypedPassword: null,
        sexo: null,
        image: null,
        direction_id: null,
        direction: {
          province: null,
          city: null
        },
        fecha_creacion: null,
        fecha_modificado: null,
        rol: null,
        role_id: null
      },
      directions: {
        provinces: [],
        cities: []
      },
      roles: [],
      passwordRequired: true,
      file: null,
      isSaving: false
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

  watch: {
    file: function(oldValue, newValue) {
      this.user.image = this.file.name;

      const reader = new FileReader();
      reader.onload = function(e) {
        this.file = e.target.result;
      }
      reader.readAsDataURL(oldValue);
    }
  },

  async mounted() {
    try {
      const provinces = await axios.get(`${server}/provinces`);
      const cities = await axios.get(`${server}/cities`);
      const roles = await axios.get(`${server}/roles`);

      this.directions.provinces = provinces.data;
      this.directions.cities = cities.data;
      this.roles = roles.data.sort((a, b) => {
        if (a.rol > b.rol) {
          return 1;
        }
        if (a.rol < b.rol) {
          return -1;
        }
        return 0;
      });
    } catch(error) {
        console.log(error, error.response);
    }

    EventBus.$on("edit-user", user => {
      Object.assign(this.user, user);
      this.passwordRequired = false;
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
      for (const key in this.user) {
        if (this.user.hasOwnProperty(key)) {
          this.user[key] = "";
        }
      }
      this.passwordRequired = true;
      this.user.id = null;
      this.user.direction = {
        province: "",
        city: ""
      };
    },

    async saveUser() {
      if (
        this.user.username
        && this.user.firstname
        && this.user.password
        && this.user.retypedPassword
        && this.user.lastname
        && this.user.sexo
      ) {
        if (this.user.password !== this.user.retypedPassword) {
          toastr('La contraseña debe coincidir', 'is-danger');
          return;
        }

        let formData = new FormData();
        formData.append("id", this.user.id);
        formData.append("firstname", this.user.firstname);
        formData.append("lastname", this.user.lastname);
        formData.append("username", this.user.username);
        formData.append("email", this.user.email);
        formData.append("password", this.user.password);
        formData.append("sexo", this.user.sexo);
        formData.append("role_id", this.user.role_id);

        if (this.file) {
          formData.append(
            "image",
            this.file,
            this.user.image
          );
        }

        try {
          const confirmation = await swal({
            title: "Confirmar registro",
            icon: "warning",
            buttons: ["Cancelar", "Confirmo"]
          });

          if (confirmation) {
            this.isSaving = true;
            try {
              const response = await axios.post(`${server}/users`, formData, {
                headers: {
                  "content-Type": "multipart/form-data"
                }
              });

              console.log(response);

              if (response.data.status === "success") {
                this.clearInputs();

                showAlert("Notificación", response.data.message, "success", 2000);
                this.users.splice(0, 0, response.data.user);
              }

              else if (response.data.status === "info") {
                this.clearInputs();

                let updatedUser = response.data.user;
                let existingUser = this.users.find(
                  user => user.id === updatedUser.id
                );
                let index = this.users.indexOf(existingUser);

                this.users.splice(index, 1, updatedUser);
                showAlert("Información", response.data.message, "info", 2000);
              }
              this.isSaving = false;
            } catch (error) {
              if (error.response) {
                this.user.password = "";
                this.user.retypedPassword = "";
                toastr(error.response.data.message, 'is-danger');
              }
              this.isSaving = false;
            }
          }
        } catch (error) {
          console.log(error);
          this.isSaving = false;
        }
      } else {
        toastr('Campos no opcionales son requeridos.', 'is-danger');
        return;
      }
    }
  }
};
</script>
