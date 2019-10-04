<template>
  <div>
    <div class="columns">
      <div class="column is-narrow">
        <div>
          <span>Showing&nbsp;</span>
          <div class="select">
            <select v-model="perPage">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <span>&nbsp;entries</span>
        </div>
      </div>

      <div class="column">
        <form
          method="POST"
          action="/users"
          @submit.prevent
        >
          <div class="columns is-desktop is-multiline">
            <div class="column is-offset-4">
              <b-field grouped>
                <b-field label="Activo">
                  <b-switch
                    v-model="filters.activo"
                    :value="true"
                    type="is-info"
                  ></b-switch>
                </b-field>

                <b-field label="Sexo">
                  <b-switch
                    v-model="filters.sexo"
                    :value="true"
                    type="is-info"
                  ></b-switch>
                </b-field>
              </b-field>

              <div class="columns">
                <div class="column">
                  <b-field>
                    <template slot="label">
                        <p>Fecha creación</p>
                        <b-switch
                        v-model="filters.rangedFechaCreacion"
                        :value="true"
                        type="is-info"
                        size="is-small"
                      >
                        Con rango
                      </b-switch>
                    </template>

                    <b-datepicker
                      v-model="filters.fechaCreacion"
                      :first-day-of-week="1"
                      :range="filters.rangedFechaCreacion"
                      placeholder="Fecha creación"
                      icon-pack="fas"
                      icon="calendar-alt"
                    >
                      <b-button
                        type="is-primary"
                        @click="filters.fechaCreacion = new Date()"
                      >
                        <b-icon
                          pack="fas"
                          icon="calendar-day"
                        ></b-icon>
                        <span>Hoy</span>
                      </b-button>

                      <b-button
                        type="is-danger"
                        @click="filters.fechaCreacion = null"
                      >
                        <b-icon
                          pack="fas"
                          icon="times"
                        ></b-icon>
                        <span>Limpiar</span>
                      </b-button>
                    </b-datepicker>

                  </b-field>
                </div>

                <div class="column">
                  <b-field>
                    <template slot="label">
                        <p>Fecha modificado</p>
                        <b-switch
                          v-model="filters.rangedFechaModificado"
                          :value="true"
                          type="is-info"
                          size="is-small"
                        >
                        Con rango
                      </b-switch>
                    </template>
                    <b-datepicker
                      v-model="filters.fechaModificado"
                      :first-day-of-week="1"
                      :range="filters.rangedFechaModificado"
                      placeholder="Fecha modificado"
                      icon-pack="fas"
                      icon="calendar-alt"
                    >

                      <b-button
                        type="is-primary"
                        @click="filters.fechaModificado = new Date()"
                      >
                        <b-icon
                          pack="fas"
                          icon="calendar-day"
                        ></b-icon>
                        <span>Hoy</span>
                      </b-button>

                      <b-button
                        type="is-danger"
                        @click="filters.fechaModificado = null"
                      >
                        <b-icon
                          pack="fas"
                          icon="times"
                        ></b-icon>
                        <span>Limpiar</span>
                      </b-button>
                    </b-datepicker>

                  </b-field>
                </div>
              </div>

              <div class="columns">
                <div class="column">
                  <b-field label="Provincia">
                    <b-select
                      v-model="filters.provincia"
                      placeholder="Seleccionar provincia"
                      icon-pack="fas"
                      icon="map-marked-alt"
                      expanded
                    >
                      <option
                        :value="null"
                        selected
                      >
                        Seleccionar provincia
                      </option>

                      <option
                        v-for="provinces in provinces"
                        :key="provinces.provincia_id"
                        :value="provinces.provincia_id"
                      >
                        {{ provinces.nombre }}
                      </option>
                    </b-select>
                  </b-field>
                </div>

                <div class="column">
                  <b-field label="Ciudad">
                    <b-select
                      v-model="filters.ciudad"
                      placeholder="Seleccionar ciudad"
                      icon-pack="fas"
                      icon="map-marker-alt"
                      expanded
                    >
                      <option
                        :value="null"
                        selected
                      >
                        Seleccionar ciudad
                      </option>

                      <option
                        v-for="city in cities"
                        :key="city.ciudad_id"
                        :value="city.ciudad_id"
                      >
                        {{ city.nombre }}
                      </option>
                    </b-select>
                  </b-field>
                </div>
              </div>

              <b-field>
                <template slot="label">
                  <p>Filtrado</p>
                  <label class="label">
                    <p class="is-size-7 has-text-grey-dark">Por nombre, correo, usuario, etc.</p>
                  </label>
                </template>
                <b-input
                  v-model="filters.query"
                  type="search"
                  placeholder="Búsqueda"
                  icon-pack="fas"
                  icon="search"
                >
                </b-input>
              </b-field>

              <b-field>
                <b-button
                  type="is-primary"
                  size="is-medium"
                  class="is-fullwidth"
                  @click="filterTable()"
                >
                  Search
                </b-button>
              </b-field>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="shr"></div>

    <section>
      <b-table
        :data="(isEmpty) ? [] : users"
        :loading="isLoading"
        :per-page="perPage"
        paginated
        striped
        hoverable
        mobile-cards
        :default-sort="['fecha_creacion', 'desc']"
        icon-pack="fas"
        sort-icon="chevron-up"
        aria-next-label="Next Page"
        aria-previous-label="Previous Page"
        aria-page-label="Page"
        aria-current-label="Current Page"
      >
        <template slot-scope="props">
          <b-table-column field="username" label="Username" sortable>
            <div>
              <template v-if="props.row.activo == 1">
                <b-tag
                  title="Activo"
                  type="is-success"
                >
                  <i class="fas fa-user-check"></i>
                </b-tag>
              </template>
              <template v-else>
                <b-tag
                  title="Inactivo"
                  type="is-danger"
                >
                  <i class="fas fa-user-times"></i>
                </b-tag>
              </template>
              {{ props.row.username }}
            </div>
          </b-table-column>

          <b-table-column field="firstname" label="Nombre" sortable>
            {{ props.row.firstname }} {{ props.row.lastname }}
          </b-table-column>

          <b-table-column field="email" label="Email" sortable>
            {{ props.row.email }}
          </b-table-column>

          <b-table-column field="fecha_creacion" label="Creación" sortable>
            {{ props.row.fecha_creacion }}
          </b-table-column>

          <b-table-column centered>
            <template slot="header">
              <i class='fas fa-bars'></i>
            </template>

            <div>
              <b-button
                title="Editar usuario"
                type="is-info"
                @click="emitEditUser(props.row, props.index)"
              >
                <i class="fas fa-pencil-alt"></i>
              </b-button>
              <template v-if="props.row.activo == 1">
                <b-button
                  title="Desactivar usuario"
                  type="is-danger"
                  outlined
                  @click="toggleUserStatus(props.row, props.index)"
                >
                  <i class="fas fa-user-times"></i>
                </b-button>
              </template>
              <template v-else>
                <b-button
                  title="Activar usuario"
                  type="is-success"
                  outlined
                  @click="toggleUserStatus(props.row, props.index)"
                >
                  <i class="fas fa-user-check"></i>
                </b-button>
              </template>
              <b-button
                title="Ver usuario"
                type="is-dark"
                @click="emitShowModal(props.row, props.index)"
              >
                <i class="fas fa-eye"></i>
              </b-button>
            </div>
          </b-table-column>
        </template>

        <template slot="empty">
          <section
            v-if="isEmpty"
            class="section">
              <div class="content has-text-grey has-text-centered">
                <p>
                  <b-icon
                    pack="far"
                    icon="frown"
                    size="is-large">
                  </b-icon>
                </p>
                <p>Nothing here.</p>
              </div>
          </section>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
import { EventBus } from '@/EventBus';
import { toastr, showAlert } from '@/mixins/mixin';
import axios from 'axios';
import swal from 'sweetalert';

export default {
  name: 'users-table',
  props: {
    provinces: Array,
    cities: Array
  },
  data() {
    return {
      users: [],
      perPage: 10,
      isEmpty: false,
      filters: {
        query: '',
        fechaCreacion: null,
        fechaModificado: null,
        rangedFechaCreacion: false,
        rangedFechaModificado: false,
        ciudad: null,
        provincia: null,
        activo: null,
        sexo: null,
      }
    };
  },

  computed: {
    isLoading() {
      return (this.users && this.users.length === 0)
        ? true
        : false;
    }
  },

  async mounted() {
    try {
      const response = await axios.get('http://localhost:8081/users');
      this.users = response.data.users.sort((a, b) => {
        if (a.fecha_creacion < b.fecha_creacion) {
          return 1;
        }
        if (a.fecha_creacion > b.fecha_creacion) {
          return -1;
        }
        return 0;
      });

      this.users.forEach(user => {
        user.fullname = `${user.firstname} ${user.lastname}`
      });
    } catch (error) {
      this.isEmpty = true;
      this.users = false;
      console.log(new Error(error));
    };

    EventBus.$on('remove-user', (user, index) => {
      this.removeUser(user, index);
    });

    EventBus.$on('toggle-user-status', (user, index) => {
      this.toggleUserStatus(user, index);
    });
  },

  methods: {
    emitEditUser (user) {
      EventBus.$emit('edit-user', user);
    },

    emitShowModal (user, index) {
      this.$emit('show-modal', user, index);
    },

    async filterTable () {
      const formData = new FormData();
      formData.append('search_query', this.filters.query);
      formData.append('fecha_creacion', this.filters.fechaCreacion);
      formData.append('fecha_modificado', this.filters.fechaModificado);
      formData.append('ranged_fecha_creacion', this.filters.rangedFechaCreacion);
      formData.append('ranged_fecha_modificado', this.filters.rangedFechaModificado);
      formData.append('ciudad', this.filters.ciudad);
      formData.append('provincia', this.filters.provincia);
      formData.append('activo', this.filters.activo);
      formData.append('sexo', this.filters.sexo);

      try {
        const response = await axios.get(`http://localhost:8081/users/filter`, formData);
        console.log(response);
        this.isEmpty = (!response.data.users) ? true : false;
        this.users = response.data.users;
      } catch (error) {
        console.log(new Error(error));
      }
    },

    async toggleUserStatus (user, index) {
      try {
        let message = user.activo === '1' ? 'desactivar' : 'activar';
        const confirmation = await swal({
          title: 'Confirmación',
          text:
            `¿Seguro que desea ${message} al usuario '${user.username}'?`,
          icon: 'warning',
          buttons: ['Cancelar', true]
        });

        if (confirmation) {
          try {
            const newStatus = (user.activo === 1) ? 0 : 1;
            const response = await axios.patch('http://localhost:8081/users/' + user.id, {activo: newStatus});
            if (response.data.error === false) {
              showAlert('Información', response.data.message, response.data.status, 2000);
              if (this.users[index].activo === 1) {
                this.users[index].activo = 0;
              } else {
                this.users[index].activo = 1;
              }
            } else {
              showAlert('Error', response.data.message, response.data.status, 2000);
            }
          } catch (error) {
            if (error.response) {
              console.log(error.response);
              toastr(error.response.data, 'is-danger');
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    async removeUser (user, index) {
      try {
        const confirmation = await swal({
          title: 'Confirmación',
          text: `¿Seguro que desea borrar al usuario '` + user.username + `'?`,
          icon: 'warning',
          buttons: ['Cancelar', true],
          dangerMode: true
        });
        if (confirmation) {
          try {
            const response = await axios.delete('http://localhost:8081/users/' + user.id);
            this.$emit('close-modal');

            if (response.data.status === 'success') {
              showAlert('Notificación', response.data.message, response.data.status, 2000);
              setTimeout(() => {
                this.users.splice(index, 1);
              }, 300);
            }
          } catch (error) {
            if (error.response) {
              console.log(error.response);
              toastr(error.response.data.message, 'is-danger');
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
