<template>
  <div id="app">
    <b-container class="logo">
      <b-row align-h="start">
        <h1 class="mx-3 mt-2">μTrello</h1>
      </b-row>
    </b-container>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app .logo {
  color: #CFCFCF;
  font-weight: bold;
}
</style>
