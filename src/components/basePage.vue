<template>
  <div>
    <app-navbar v-show="navbarCheck"></app-navbar>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    navbarCheck() {
      return ["signin", "signout", "404page"].includes(this.$route.name)
        ? false
        : true;
    },
  },
};
</script>
<style>
.main{
  padding-left: 20%;
  padding-right: 20%;
  margin-bottom: 5%;
  margin-top: 5%;
}

/* Use a media query to add a breakpoint at 800px: */
@media screen and (max-width: 800px) {
  .main{
    padding-left: 7%;
    padding-right: 3%;
    margin-bottom: 5%;
    margin-top: 1%;
  }
}
</style>