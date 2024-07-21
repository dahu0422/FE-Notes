<script setup>
import { defineProps, defineEmits, onBeforeMount, onMounted } from 'vue'

const props = defineProps({
  todoList: { type: Array, required: true }
})
const emit = defineEmits(['updateTodo'])

onBeforeMount(() => {
  console.log('子组件beforeMounted')
})
onMounted(() => {
  console.log('子组件mounted')
})
</script>

<template>
  <div class="overflow-hidden flex justify-center items-center flex-1">
    <span class="text-gray-400" v-if="todoList.length === 0">暂无待办事项</span>
    <ul v-else class="overflow-auto w-full h-full todo-wrapper">
      <li
        v-for="(todo, index) in todoList"
        class="flex items-center h-10 px-2 border-solid border-b border-gray-100"
        @click="$emit('updateTodo', todo)"
      >
        <input :checked="todo.status === 'finished'" class="h-4 w-4 mr-2" type="radio" />
        <span
          class="select-none"
          :class="{
            'line-through': todo.status === 'finished'
          }"
        >
          {{ todo.name }}
        </span>
        <button @click.stop="$emit('deleteTodo', index)" class="w-6 h-6 ml-auto hover:bg-slate-100">
          ❌
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.todo-wrapper {
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
