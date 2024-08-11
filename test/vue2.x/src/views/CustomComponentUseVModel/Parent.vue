<template>
  <div>
    <h1>自定义组件中使用 v-model</h1>

    <fieldset>
      <legend>默认绑定 value prop 和 input 事件</legend>

      <!-- 父组件向子组件传值 -->
      <DefaultChild v-model="pageTitle" />

      <!-- 相当于 -->
      <DefaultChild :value="pageTitle" @input="pageTitle = $event" />
    </fieldset>

    <fieldset>
      <legend>通过 model 选项修改绑定prop 和 event</legend>

      <!-- 父组件向子组件传值 -->
      <ChildWithModelOption v-model="pageTitle" />

      <!-- 相当于 -->
      <ChildWithModelOption :title="pageTitle" @change="pageTitle = $event" />
    </fieldset>

    <fieldset>
      <legend>v-bind:sync</legend>

      <!-- 父组件向子组件传值 -->
      <ChildWithPropSync :title.sync="pageTitle" />

      <!-- 相当于 -->
      <ChildWithPropSync
        :title="pageTitle"
        @update:title="pageTitle = $event"
      />
    </fieldset>

    <button @click="pageTitle = 'Hello Vue2.x'">修改 pageTitle</button>
  </div>
</template>

<script>
import DefaultChild from "./DefaultChild.vue";
import ChildWithModelOption from "./ChildWithModelOption.vue";
import ChildWithPropSync from "./ChildWithPropSync.vue";

export default {
  name: "Parent",
  components: {
    DefaultChild,
    ChildWithModelOption,
    ChildWithPropSync,
  },
  data() {
    return {
      pageTitle: "Hello Vue2.x",
    };
  },
};
</script>

<style scoped>
button {
  margin-top: 16px;
}

fieldset {
  margin-bottom: 20px;
}
</style>
