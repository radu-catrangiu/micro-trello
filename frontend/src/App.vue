<template>
  <div id="app">
    <div class="logo">
      <h1>μTrello</h1>
    </div>
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
