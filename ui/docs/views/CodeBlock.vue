<template>
  <fieldset class="code-block">
    <!-- 标题 -->
    <legend v-if="title" class="title">{{ title }}</legend>

    <!-- 介绍信息 -->
    <section v-if="$slots.description" class="description">
      <slot name="description" />
    </section>

    <!-- 效果展示 -->
    <section class="preview">
      <slot />
    </section>

    <!-- TODO: 代码展示 -->
  </fieldset>
</template>

<script setup>
import { onMounted } from 'vue'
defineProps({
  title: { type: String, default: '' }
})

onMounted(async () => {
  let res = await fetch('/public/snippets/input-text/basic.vue').then((res) => console.log(res))
})
</script>

<style scoped>
.code-block {
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
  margin: 0 0 16px 0;
  padding: 0;
  overflow: auto;
}
.title {
  margin-left: 16px;
}
.description {
  font-size: 14px;
  line-height: 20px;
  padding: 8px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}
.preview {
  padding: 16px;
}
</style>
