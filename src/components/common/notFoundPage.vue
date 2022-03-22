<template>
  <div>
    <h1>
      Sorry! the URL <span>{{ url }}</span> your trying to reach doesn't exists
    </h1>
    <router-link to="/">Go Back to Home</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: this.$route.fullPath
    }
  }
}
</script>

<style scoped>
span {
  color: red;
}
</style>
