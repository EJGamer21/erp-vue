<template>
  <section>
    <h1 class="is-size-1">Usuarios</h1>
    <user-form></user-form>

    <div class="hr"></div>

    <!-- <users-table @show-modal="showModal" @close-modal="closeModal"></users-table> -->
    <b-modal :active.sync="isModalActive">
      <user-modal v-if="isModalActive" :user="user" @close-modal="closeModal"></user-modal>
    </b-modal>
  </section>
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
      isModalActive: false,
      user: {}
    };
  },
  methods: {
    showModal(user, index) {
      this.user = user;
      this.user.index = index;
      this.isModalActive = true;
    },

    closeModal() {
      this.isModalActive = false;
    }
  }
}
</script>
