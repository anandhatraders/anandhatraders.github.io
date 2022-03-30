<template>
<div>
    <app-navbar v-if="navbarCheck"></app-navbar>
    <div class="container">
      <router-view></router-view>
    </div>
</div>
</template>
<script>
export default {
  computed: {
    navbarCheck() {
      return !["signin", "signout", "404page"].includes(this.$route.name);
    }
  },
};
</script>
