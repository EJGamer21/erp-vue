<template>
  <users></users>
</template>

<script>
import Users from "@/components/Users";

export default {
  name: "App",
  components: {
    "users": Users
  },
  data() {
    return {
      message: 'Hello from App',
    };
  }
};
</script>
