<script setup>
import { onMounted, onBeforeMount } from 'vue'

import TodoHeader from './components/TodoHeader.vue'
import TodoMain from './components/TodoMain.vue'
import TodoFooter from './components/TodoFooter.vue'

import { useTodos } from './compositions/useTodos.js'
const { todoList, pendingTodoList, addTodo, updateTodo, deleteTodo, clearCompleted } = useTodos()

onBeforeMount(() => {
  console.log('父组件beforeMounted')
})
onMounted(() => {
  console.log('父组件mounted')
})
</script>

<template>
  <h1 class="mb-2 text-2xl">TODOS</h1>
  <div class="flex flex-col w-1/2 h-2/5 bg-white">
    <TodoHeader @addTodo="addTodo"></TodoHeader>
    <TodoMain :todoList="todoList" @deleteTodo="deleteTodo" @updateTodo="updateTodo"></TodoMain>
    <TodoFooter :data="pendingTodoList" @clear="clearCompleted"></TodoFooter>
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
