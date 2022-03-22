<template>
  <div id="app">
    <loading-screen v-show="loading"></loading-screen>
    <basePage></basePage>
  </div>
</template>

<script>
import basePage from "@/components/basePage.vue";
export default {
  name: "App",
  components: {
    basePage,
  },
  computed: {
    loading: function () {
      return this.$store.getters.loading;
    },
  },
};
</script>

