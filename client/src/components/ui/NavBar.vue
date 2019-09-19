<template>
  <b-navbar type="is-dark">
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
        :to="{ name: 'users' }"
      >
        <i class="fas fa-id-badge"></i>
        &nbsp;Users
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        :to="{ name: 'clients' }"
      >
        <i class="fas fa-users"></i>
        &nbsp;Clients
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
