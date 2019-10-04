<template>
  <div>
    <div>
      <h1 class="is-size-1">Usuarios</h1>
    </div>
    <user-form
      :directions="directions"
    ></user-form>

    <div class="lhr">
      <div class="hr"></div>
    </div>

    <users-table
      :provinces="directions.provinces"
      :cities="directions.cities"
      @show-modal="showModal"
      @close-modal="closeModal"
    ></users-table>

    <transition name="modal">
      <b-modal
        :active.sync="isModalActive"
        scroll="keep"
        has-modal-card
      >
        <user-modal :user="user" :index="user.index"></user-modal>
      </b-modal>
    </transition>
  </div>
</template>

<script>
import UserForm from '@/components/users/UserForm';
import UsersTable from '@/components/users/UsersTable.vue';
import UserModal from '@/components/users/UserModal';
import axios from 'axios';

const server = `http://localhost:8081`;

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
      user: {},
      directions: {
        provinces: null,
        cities: null
      }
    };
  },

  async mounted() {
    try {
      const provinces = await axios.get(`${server}/provinces`);
      const cities = await axios.get(`${server}/cities`);

      this.directions.provinces = provinces.data;
      this.directions.cities = cities.data;
    } catch(error) {
      console.log(new Error(error));
    }
  },

  methods: {
    showModal(user, index) {
      this.user = user;
      this.user.index = index;
      this.isModalActive = true;
    },

    closeModal() {
      this.user = {};
      this.isModalActive = false;
    }
  }
}
</script>
