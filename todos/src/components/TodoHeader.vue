<script setup>
import { ref } from 'vue'
const emit = defineEmits(['addTodo'])
const todo = ref('')

const addTodoHandler = () => {
  emit('addTodo', todo.value)
  todo.value = ''
}
</script>

<template>
  <div class="h-10 py-2 border-b border-solid border-[#f5f5f5]">
    <input
      v-model.trim="todo"
      placeholder="输入待办事项"
      type="text"
      class="w-full h-full px-2 outline-none"
      @keyup.enter.native="addTodoHandler"
    />
  </div>
</template>
