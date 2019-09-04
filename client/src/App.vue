<template>
  <div id="app">
    <div class="row">
      <div class="container">
        <h1 class="my-4">Usuarios</h1>
        <user-form></user-form>
        <users-table @show-modal="showModal" @close-modal="closeModal"></users-table>
        <user-modal v-if="modalIsVisible" :user="user" @close-modal="closeModal"></user-modal>
      </div>
    </div>
  </div>
</template>

<script>
import UserForm from "./components/UserForm";
import UsersTable from "./components/UsersTable";
import UserModal from "./components/UserModal";

export default {
  name: "App",
  el: "#app",
  components: {
    "user-form": UserForm,
    "users-table": UsersTable,
    "user-modal": UserModal
  },
  data() {
    return {
      modalIsVisible: false,
      user: {}
    };
  },
  methods: {
    showModal(user, index) {
      this.modalIsVisible = true;
      this.user = user;
      this.user.index = index;
    },

    closeModal() {
      this.modalIsVisible = false;
    }
  }
};
</script>