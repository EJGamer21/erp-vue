<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/ui/NavBar';

export default {
  name: 'App',
  components: {
    'navbar': NavBar,
  },
};
</script>
