<template>
  <div id="app">
    <loading-screen></loading-screen>
    <basePage v-show="!this.$store.getters.loading"></basePage>
  </div>
</template>

<script>
import basePage from "@/components/basePage.vue";
export default {
  name: "App",
  components: {
    basePage
  }
};
</script>

