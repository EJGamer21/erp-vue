<template>
  <div>
    <navbar></navbar>
    <section class="section">
      <router-view/>
    </section>
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
