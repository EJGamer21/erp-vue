<template>
  <div class="table-responsive mt-4" v-cloak>
    <table id="users-table" class="table table-striped table-hover centered">
      <caption>Listado de usuarios</caption>
      <thead class="thead-dark">
        <tr>
          <th>Usuario</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Creaci&oacute;n</th>
          <th style="text-align:center;">
            <i class="fas fa-bars"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id" :id="user.id">
          <td>
            <a
              :href="'/users/view/' + user.id + '/' +
                            (user.firstname + '-' + user.lastname).toLowerCase()"
            >
              <template v-if="user.activo == 1">
                <span title="Activo" class="badge badge-success">
                  <i class="fas fa-user-check"></i>
                </span>
              </template>
              <template v-else>
                <span title="Inactivo" class="badge badge-danger">
                  <i class="fas fa-user-times"></i>
                </span>
              </template>
              <span>{{ user.username }}</span>
            </a>
          </td>
          <td>
            <a
              :href="'/users/view/' + user.id + '/' +
                            (user.firstname + '-' + user.lastname).toLowerCase()"
            >
              <span>{{ user.firstname + ' ' + user.lastname }}</span>
            </a>
          </td>
          <td>
            <a
              :href="'/users/view/' + user.id + '/' +
                            (user.firstname + '-' + user.lastname).toLowerCase()"
            >
              <span>{{ user.email }}</span>
            </a>
          </td>
          <td>
            <a
              :href="'/users/view/' + user.id + '/' +
                            (user.firstname + '-' + user.lastname).toLowerCase()"
            >
              <span>{{ user.fecha_creacion }}</span>
            </a>
          </td>
          <td style="text-align:center;">
            <button
              title="Editar usuario"
              type="button"
              class="edit-btn btn btn-info"
              @click="emitEditUser(user)"
            >
              <i class="fas fa-pencil-alt"></i>
            </button>
            <template v-if="user.activo == 1">
              <button
                title="Desactivar usuario"
                type="button"
                class="btn btn-outline-danger"
                @click="toggleUserStatus(user, index)"
              >
                <i class="fas fa-user-times"></i>
              </button>
            </template>
            <template v-else>
              <button
                title="Activar usuario"
                type="button"
                class="btn btn-outline-success"
                @click="toggleUserStatus(user, index)"
              >
                <i class="fas fa-user-check"></i>
              </button>
            </template>
            <button
              type="button"
              title="Ver usuario"
              class="btn btn-dark"
              @click="emitShowModal(user, index)"
            >
              <i class="fas fa-eye"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { EventBus } from "@/EventBus";
import axios from "axios";
import swal from "sweetalert";
import { toastConfigs, showAlert } from "@/mixins/mixin";

export default {
  name: "users-table",
  data() {
    return {
      users: []
    };
  },
  async beforeMount() {
    try {
      const response = await axios.get('http://localhost:8081/users');
      let usuarios = response.data;
      this.users = usuarios.sort((a, b) => {
        if (a.fecha_creacion < b.fecha_creacion) {
          return 1;
        }
        if (a.fecha_creacion > b.fecha_creacion) {
          return -1;
        }
        return 0;
      });

    } catch (error) {
      console.log(new Error(error));
    }
  },
  mounted() {
    EventBus.$on("remove-user", (user, index) => {
      this.removeUser(user, index);
    });

    EventBus.$on("toggle-user-status", (user, index) => {
      this.toggleUserStatus(user, index);
    });
  },
  methods: {
    emitEditUser(user) {
      EventBus.$emit("edit-user", user);
    },

    emitShowModal(user, index) {
      this.$emit("show-modal", user, index);
    },

    async toggleUserStatus(user, index) {
      try {
        let message = user.activo === "1" ? "desactivar" : "activar";
        const confirmation = await swal({
          title: "Confirmación",
          text:
            `¿Seguro que desea ${message} al usuario '${user.username}'?`,
          icon: "warning",
          buttons: ["Cancelar", true]
        });

        if (confirmation) {
          try {
            const newStatus = (user.activo === 1) ? 0 : 1;
            const response = await axios.put("http://localhost:8081/users/" + user.id, {activo: newStatus});

            if (this.users[index].activo === 1) {
              this.users[index].activo = 0;
            } else {
              this.users[index].activo = 1;
            }
            showAlert("Información", response.data.message, "success", 2000);
          } catch (error) {
            if (error.response) {
              console.log(error.response);
              this.$toastr.error(error.response.data, "Error", toastConfigs);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    async removeUser(user, index) {
      try {
        const confirmation = await swal({
          title: "Confirmación",
          text: `¿Seguro que desea borrar al usuario '` + user.username + `'?`,
          icon: "warning",
          buttons: ["Cancelar", true],
          dangerMode: true
        });
        if (confirmation) {
          try {
            const response = await axios.delete("http://localhost:8081/users/" + user.id);
            this.$emit("close-modal");

            if (response.data.status === "success") {
              showAlert("Notificación", response.data.message, response.data.status, 2000);
              setTimeout(() => {
                this.users.splice(index, 1);
              }, 300);
            }
          } catch (error) {
            if (error.response) {
              console.log(error.response);
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
