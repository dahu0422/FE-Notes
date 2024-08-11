<template>
  <div>
    <h2>{{ title }}</h2>

    <button @click="changeValue('Hello Dahu')">触发默认 Input 事件</button>
  </div>
</template>

<script>
export default {
  name: "Child",
  props: {
    title: { type: String, default: "" },
  },
  methods: {
    changeValue(value) {
      this.$emit("update:title", value);
    },
  },
};
</script>
