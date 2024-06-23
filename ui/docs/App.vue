<template>
  <div id="app">
    <a @click="$router.push('input-text')">Input-Text</a>

    <router-view></router-view>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 16px;
}
</style>
