<template>
  <h1>{{ count }}</h1>
  <button @click="count++">+</button>
  <br />
  <button @click="count--">-</button>
  <h2 v-for="(value, key) of list" :key="key">{{ key }} {{ value }}</h2>
  <button @click="warn('form click', $event)">click</button>
  <br>
  <span v-for="n in 10" :key="n">{{ n }}</span>
<br>
<input type="radio" id="one" value="one" v-model="picked" />
<label for="one">one</label>

<input type="radio" v-model="picked" value="a" />
<br>
<YesNo />
</template>

<script setup>
import { ref, reactive } from "vue";
import { api } from "@/utils/http/request";
import YesNo from './YesNo.vue'
const count = ref(0);
count.value = api();

const list = reactive({
  item: 1,
  title: 2,
  author: 3,
});

 const picked = ref('one')

function warn(message, event) {
  // 这里可以访问原生事件
  if (event) {
    event.preventDefault();
  }
  alert(message);
}
</script>

<style lang="scss">
#app {
  h1 {
    color: red;
  }
}
</style>
