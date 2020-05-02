<template>
  <div id="app">
    <b-container v-if="$route.path !== '/login'">
      <b-row class="mx-2 mt-3" align-h="between">
        <b-col>
          <b-row align-h="start">
            <h2 class="top-logo">μTrello</h2>
          </b-row>
        </b-col>
        <b-col>
          <b-row align-h="end" align-v="center">
            <b-button variant="outline-secondary" @click="logout">Log Out</b-button>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$cookies.remove("login_token");
      this.$router.push("/login");
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app .top-logo {
  color: #cfcfcf;
  font-weight: bold;
}
</style>
