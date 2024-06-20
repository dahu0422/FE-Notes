<script setup>
import { ref } from 'vue'

let v = ref('')
</script>

<template>
  <HInputText v-model="v" />
  <br />
  <HInputText v-model="v" placeholder="placeholder" />
  <br />
  <HInputText v-model="v" placeholder="disabled" disabled />
  <br />
  <HInputText v-model="v" placeholder="invalid" required />
  <br />
  <HInputText model-value="readonly" readonly />
</template>
