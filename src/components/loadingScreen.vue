<template>
  <div style="background-color: black; height: 100vh" v-if="loading"></div>
</template>

<script>
export default {
  computed: {
    loading: function () {
      return this.$store.getters.loading;
    },
  },
};
</script>