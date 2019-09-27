<template>
  <transition name="modal">
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <div class="content">
              <div class="columns">
                <div class="column is-4">
                  <div class="card-image">
                    <figure class="image is-4by3">
                      <template v-if="user.image !== null">
                        <img :src="user.image" class="card-img" alt="No image">
                      </template>
                      <template v-else>
                        <img src="https://via.placeholder.com/800x800" class="card-img" alt="No image">
                      </template>
                    </figure>
                  </div>
                </div>
                <div class="column is-8">
                  <div class="title is-3">
                    <span>{{ user.firstname }} {{ user.lastname }}</span>
                    <b-tag type="is-dark">{{ user.rol }}</b-tag>
                  </div>
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
            <div class="card-foot">
              <div class="is-pulled-left">
                <b-button
                  type="is-light"
                  @click="$parent.close()"
                >
                  <span>Cerrar</span>
                </b-button>
              </div>
              <div class="is-pulled-right">
                <template v-if="user.activo == 1">
                  <b-button
                    title="Desactivar usuario"
                    type="is-danger"
                    outlined
                    @click="emitToggleUserStatus(user, user.index)"
                  >
                    <span>Desactivar</span>
                    <i class="fas fa-user-times"></i>
                  </b-button>
                </template>
                <template v-else>
                  <b-button
                    title="Activar usuario"
                    type="is-success"
                    outlined
                    @click="emitToggleUserStatus(user, user.index)"
                  >
                    <span>Activar</span>
                    <i class="fas fa-user-check"></i>
                  </b-button>
                </template>
                <b-button
                  title="Borrar usuario"
                  type="is-danger"
                  @click="emitRemoveUser(user, user.index)"
                >
                  <span>Borrar&nbsp;</span>
                  <i class="fas fa-times"></i>
                </b-button>
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
    isActive: {
      type: Number,
      required: false
    },
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    ciudad() {
      let computedCiudad;
      if (this.user.ciudad == null) computedCiudad = null;
      else computedCiudad = this.user.ciudad;

      if (this.user.provincia !== null && computedCiudad !== null) {
        computedCiudad = computedCiudad + ", ";
      }
      return computedCiudad;
    },

    provincia() {
      let computedProvincia;
      if (this.user.provincia == null) computedProvincia = null;
      else computedProvincia = this.user.provincia;
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
