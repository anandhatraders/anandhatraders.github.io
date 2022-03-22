<template>
  <div class="container">
    <h1>Signed out...!! We Miss you</h1>
    <br />
    <h2 class="text-end">Come Again Soon,...</h2>
    <br />
    <p>If it was a mistake you logged out,</p>
    <p class="text-end">
      Please Click <router-link to="/">login Again :)</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  beforeMount() {
    if (this.$store.getters.auth.loggedIn) {
      this.$store.dispatch("troggle_off_auth");
      this.$store.dispatch("troggle_off_admin");
      this.$store.dispatch("troggle_off_owner");
      this.$store.dispatch("delete_token");
    }
    localStorage.clear();
  },
};
</script>
