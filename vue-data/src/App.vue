<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Beranda</router-link> |
      <router-link to="/about">Tentang</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;700&display=swap");
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #6c757d;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
