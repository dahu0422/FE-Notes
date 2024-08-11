<script setup lang="ts">
import ChildWithDefineModel from './ChildWithDefineModel.vue'
import ChildWithModelValue from './ChildWithModelValue.vue';

import { ref } from 'vue'

let pageTitle = ref('Hello Vue3')
</script>

<template>
  <div>
    <h1>自定义组件中使用 v-model</h1>

    <fieldset>
      <legend> v3.4之前使用 modelValue prop 和 update:modelValue 事件 </legend>

      <ChildWithModelValue v-model:title="pageTitle" />
    </fieldset>

    <fieldset>
      <legend> 使用 defineModel() 方法 </legend>

      <ChildWithDefineModel v-model:title="pageTitle" />
    </fieldset>

    <button @click="pageTitle = 'Hello Vue3'">修改 pageTitle</button>
  </div>
</template>



<style scoped>
button {
  margin-top: 16px;
}

fieldset {
  margin-bottom: 20px;
}
</style>
