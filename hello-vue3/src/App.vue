<script setup>
import TodoHeader from './components/TodoHeader.vue'
</script>

<template>
  <h1>TODOS</h1>
  <div class="flex flex-col w-1/2 h-2/5 bg-white">
    <TodoHeader></TodoHeader>
  </div>
</template>

<style scoped>
#app {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
