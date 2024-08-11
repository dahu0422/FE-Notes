<script setup lang="ts">
defineProps(['title'])
const emit = defineEmits(['update:title'])

</script>

<template>
  <div>
    <h2>{{ title }}</h2>

    <button @click="$emit('update:title', 'Hello Dahu')">触发默认 emit 事件</button>
  </div>
</template>
