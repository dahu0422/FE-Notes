<template>
  <input type="text" :value="modelValue" @input="handleInput" class="h-input-text" />
</template>

<script setup>
defineProps({ modelValue: { type: String, default: '' } })
const emit = defineEmits(['update:modelValue'])

function handleInput($evt) {
  emit('update:modelValue', $evt.target.value)
}
</script>

<style scoped>
.h-input-text {
  height: 32px;
  padding: 0 8px;
  box-sizing: border-box;
  border: none;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.3);
  vertical-align: middle;
  &:disabled {
    cursor: not-allowed;
  }
  &:invalid {
    border-color: #e6202a;
  }
}
</style>
