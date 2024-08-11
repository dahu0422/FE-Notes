<template>
  <div>
    <h2>{{ title }}</h2>

    <button @click="changeValue('Hello Dahu')">触发默认 Change 事件</button>
  </div>
</template>

<script>
export default {
  name: "Child",
  model: {
    prop: "title",
    event: "change",
  },
  props: {
    title: { type: String, default: "Default title" }, // 使用 `title` 代替 `value` 作为 model 的 prop
  },
  methods: {
    changeValue(value) {
      this.$emit("change", value);
    },
  },
};
</script>
