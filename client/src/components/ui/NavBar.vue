<template>
  <b-navbar
    type="is-dark"
    wrapper-class="container"
    class="b-navbar is-spaced"
  >
    <template slot="brand">
      <b-navbar-item
        tag="router-link"
        :to="{ name: 'home' }"
      >
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        >
      </b-navbar-item>
    </template>

    <template slot="start">
      <b-navbar-item
        tag="router-link"
        :to="{ name: 'home' }"
      >
        <i class="fas fa-home"></i>
        &nbsp;Home
      </b-navbar-item>

      <b-navbar-item
        tag="router-link"
        :to="{ name: 'products' }"
      >
        <i class="fas fa-box-open"></i>
        &nbsp;Products
      </b-navbar-item>

      <b-navbar-item
        tag="router-link"
        :to="{ name: 'clients' }"
      >
        <i class="fas fa-users"></i>
        &nbsp;Clients
      </b-navbar-item>

      <b-navbar-item
        tag="router-link"
        :to="{ name: 'users' }"
      >
        <i class="fas fa-id-badge"></i>
        &nbsp;Users
      </b-navbar-item>

      <b-navbar-item
        tag="router-link"
        :to="{ name: 'bills' }"
      >
        <i class="fas fa-plus"></i>
        &nbsp;New bill
      </b-navbar-item>

      <b-navbar-item
        tag="router-link"
        :to="{ name: 'reports' }"
      >
        <i class="fas fa-file-excel"></i>
        &nbsp;Reports
      </b-navbar-item>

      <b-navbar-item
        tag="router-link"
        :to="{ name: 'config' }"
      >
        <i class="fas fa-cog"></i>
        &nbsp;Settings
      </b-navbar-item>
    </template>

    <template slot="end">
      <template v-if="user.logged">
        <b-navbar-item>
          <span>{{ user_fullname }}</span>
        </b-navbar-item>
      </template>

      <template v-else>
        <b-navbar-item tag=div>
          <b-button
            type="is-primary"
            inverted
            outlined
            icon-left="sign-in-alt"
            icon-pack="fas"
            @click="login()"
          >
            Login
          </b-button>
        </b-navbar-item>
      </template>

      <div class="buttons">
        <template v-if="user.logged">
          <b-navbar-item tag="div">
            <b-button
              type="is-info"
              icon-left="sign-out-alt"
              icon-pack="fas"
              @click="logout()"
            >
              Logout
            </b-button>
          </b-navbar-item>
        </template>

        <template v-else>
          <b-navbar-item tag="div">
            <b-button
              type="is-info"
              @click="signup()"
            >
              Register
            </b-button>
          </b-navbar-item>
        </template>
      </div>

      <!-- <b-dropdown
        position="is-bottom-left"
        aria-role="list"
        :mobile-modal="false"
        @active-change="downIcon = !downIcon"
      >
        <a
          class="navbar-item is-info"
          slot="trigger"
          role="button"
        >
          <span>{{ user_fullname }}</span>
          <b-icon
            pack="fas"
            :icon="(downIcon) ? 'caret-down' : 'caret-up'"
          ></b-icon>
        </a>

        <b-dropdown-item
          aria-role="menuitem"
          has-link
        >
          <router-link :to="{ name: 'home' }">
            <span>My profile</span>
          </router-link>
        </b-dropdown-item>

        <b-dropdown-item
          aria-role="menuitem"
        >
          <form @submit.prevent="logout()">
            <input type="hidden" value="logout">
            <button type="submit" class="button is-primary">
              <b-icon
                pack="fas"
                icon="sign-out-alt"
              ></b-icon>
              <span>Logout</span>
            </button>
          </form>
        </b-dropdown-item>
      </b-dropdown> -->
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      user: {
        firstname: 'Enger',
        lastname: 'Jimenez',
        logged: true,
      },
    }
  },
  computed: {
    user_fullname() {
      return `${this.user.firstname} ${this.user.lastname}`;
    }
  },
  methods: {
    logout() {
      console.log('logged out');
    },
    login() {
      console.log('logged in');
    },
    signup() {
      console.log('signed in');
    },
  }
}
</script>
