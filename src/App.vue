<template>
  <div id="app">
    <loading-screen></loading-screen>
    <basePage v-show="!loading"></basePage>
  </div>
</template>

<script>
import basePage from "./components/basePage.vue";
export default {
  components: { basePage },
  computed: {
  loading: function () {
    return this.$store.getters.loading;
  }
  },
};
</script>