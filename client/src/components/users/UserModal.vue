<template>
  <transition name="modal">
    <div class="modal-mask" @keyup.27="emitCloseModal" tabindex="0">
      <div class="modal-wrapper" @click.self="emitCloseModal">
        <div class="modal-container">
          <div class="card bg-light my-3">
            <div class="row no-gutters">
              <div class="col-md-4">
                <template v-if="user.image !== null">
                  <img :src="user.image" class="card-img" alt="No image">
                </template>
                <template v-else>
                  <img src="https://via.placeholder.com/800x800" class="card-img" alt="No image">
                </template>
              </div>
              <div class="col-md-8">
                <button title="Cerrar" class="float-right btn btn-light" @click="emitCloseModal">
                  <span>
                    <i class="fas fa-times"></i>
                  </span>
                </button>
                <div class="card-body">
                  <h3 class="card-title">
                    <span>{{ user.firstname + ' ' + user.lastname}}</span>
                    <div class="mb-2">
                      <span class="badge badge-secondary">{{ user.rol }}</span>
                    </div>
                  </h3>

                  <div class="row mb-2">
                    <div class="col">
                      <strong>ID:</strong>
                      <span>{{ user.id }}</span>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col">
                      <strong>Usuario:</strong>
                      <span>{{ user.username }}</span>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col">
                      <strong>Email:</strong>
                      <span>{{ user.email }}</span>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col">
                      <strong>Sexo:</strong>
                      <template v-if="user.sexo == 'M'">
                        <span>Masculino</span>
                      </template>
                      <template v-else>
                        <span>Femenino</span>
                      </template>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col">
                      <strong>Dirección:</strong>
                      <span>{{ ciudad }}</span>
                      <span>{{ provincia }}</span>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col">
                      <strong>Creado en:</strong>
                      <span>{{ user.fecha_creacion }}</span>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col">
                      <strong>Última modificación:</strong>
                      <span>{{ user.fecha_modificado }}</span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <strong>Estado:</strong>
                      <template v-if="user.activo == 1">
                        <span>Activo</span>
                      </template>
                      <template v-else>
                        <span>Inactivo</span>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col">
                  <div class="float-left">
                    <template v-if="user.activo == 1">
                      <button
                        title="Desactivar usuario"
                        type="button"
                        class="btn btn-outline-danger"
                        @click="emitToggleUserStatus(user, user.index)"
                      >
                        <span>Desactivar</span>
                        <i class="fas fa-user-times"></i>
                      </button>
                    </template>
                    <template v-else>
                      <button
                        title="Activar usuario"
                        type="button"
                        class="btn btn-outline-success"
                        @click="emitToggleUserStatus(user, user.index)"
                      >
                        <span>Activar</span>
                        <i class="fas fa-user-check"></i>
                      </button>
                    </template>
                    <button
                      class="btn btn-danger"
                      type="button"
                      title="Borrar usuario"
                      @click="emitRemoveUser(user, user.index)"
                    >
                      <span>Borrar&nbsp;</span>
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                  <div class="float-right">
                    <button class="btn btn-secondary" @click="emitCloseModal">
                      <span>Cerrar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { EventBus } from "@/EventBus";

export default {
  name: "user-modal",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    ciudad() {
      let computedCiudad;
      // if (this.user.direccion.ciudad == null) computedCiudad = null;
      // else computedCiudad = this.user.direccion.ciudad;

      // if (this.user.direccion.provincia !== null && computedCiudad !== null) {
      //   computedCiudad = computedCiudad + ", ";
      // }
      return computedCiudad;
    },

    provincia() {
      let computedProvincia;
      // if (this.user.direccion.provincia == null) computedProvincia = null;
      // else computedProvincia = this.user.direccion.provincia;
      return computedProvincia;
    }
  },
  methods: {
    emitCloseModal() {
      this.$emit("close-modal");
    },

    emitToggleUserStatus(user, index) {
      EventBus.$emit("toggle-user-status", user, index);
    },

    emitRemoveUser(user, index) {
      EventBus.$emit("remove-user", user, index);
    }
  }
};
</script>
