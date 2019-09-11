<template>
  <div class="row">
    <div class="col-10">
      <div class="container-fluid">
        <h1 class="my-4">Usuarios</h1>
        <user-form></user-form>
        <users-table @show-modal="showModal" @close-modal="closeModal"></users-table>
        <user-modal v-if="modalIsVisible" :user="user" @close-modal="closeModal"></user-modal>
      </div>
    </div>
  </div>
</template>

<script>
import UserForm from '@/components/users/UserForm';
import UsersTable from '@/components/users/UsersTable.vue';
import UserModal from '@/components/users/UserModal';

export default {
  name: "Users",
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
      this.user = user;
      this.user.index = index;
      this.modalIsVisible = true;
    },

    closeModal() {
      this.modalIsVisible = false;
    }
  }
}
</script>
