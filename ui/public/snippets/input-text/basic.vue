<template>
  <HInputText v-model="v" />
  <br /><br />
  <HInputText v-model="v" placeholder="placeholder" />
  <br /><br />
  <HInputText v-model="v" placeholder="disabled" disabled />
  <br /><br />
  <HInputText v-model="v" placeholder="invalid" required />
  <br /><br />
  <HInputText model-value="readonly" readonly />
</template>

<script setup>
import { ref } from 'vue'

let v = ref('')
</script>
