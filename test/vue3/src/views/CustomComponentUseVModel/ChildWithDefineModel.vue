<script setup lang="ts">
const title = defineModel('title')

function changeValue(value: string) {
  title.value = value
}

</script>

<template>
  <div>
    <h2>{{ title }}</h2>

    <button @click="changeValue('Hello Dahu')">触发默认 defineModel </button>
  </div>
</template>
