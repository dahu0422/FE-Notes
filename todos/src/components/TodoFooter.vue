<script setup>
const props = defineProps({
  data: { type: Array, default: () => [] }
})
const emit = defineEmits(['clear'])
</script>

<template>
  <div class="flex justify-between items-center px-2 h-10 border-t border-solid border-gray-100">
    <div>{{ data.length }} items left</div>
    <div @click="$emit('clear')" class="cursor-pointer hover:bg-slate-100">Clear Completed</div>
  </div>
</template>
