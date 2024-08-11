<template>
  <div>
    <h2>{{ value }}</h2>

    <button @click="changeValue('Hello Dahu')">触发默认 Input 事件</button>
  </div>
</template>

<script>
export default {
  name: "Child",
  props: {
    value: { type: String, default: "" },
  },
  methods: {
    changeValue(value) {
      this.$emit("input", value);
    },
  },
};
</script>
