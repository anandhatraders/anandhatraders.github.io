<template>
  <div style="background-color: black; z-index: 1000; height: 100vh"></div>
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