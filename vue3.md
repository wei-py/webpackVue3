## ref
{ foo: ref(0) } 对象结构 还是ref
模板 {{ 正常使用 }}
仅当 ref 是**模板渲染上下文的顶层** property 时才适用自动解包。
当一个 ref 作为一个**响应式对象**的 property 被访问或更改时，它会自动解包，因此会表现得和一般的 property 一样
```js
const count = ref(0)
const state = reactive({
  count
})
console.log(state.count) // 0
state.count = 1
console.log(count.value) // 1
```
不像响应式对象，当 ref 作为响应式**数组**或像 Map 这种原生集合类型的元素被访问时，不会进行解包
响应式语法糖 🍬 $ref(0)

## computed
```js
const countComputed = computed(() => {
  return author.books.length > 0 ? 'yes' : 'no';
})
```
### 计算属性缓存 🆚 方法
const now = computed(() => Date.now());
### 可写的计算属性
```js
const fullName = computed({
  get() {
    return firstName.value + ' ' + lastName.value;
  },
  set(value) {
    [firstName, lastName] = value.split(' ');
  }
})
```
## Class 和 Style 绑定
```html
<div :class="{ active: isActive }"></div>
<div class="static active"></div>

<div :style="{ 'font-size': fontSize + 'px' }"></div>
```
```js
const isActive = ref(true)
const error = ref(null)

const classObject = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal'
}));
````
## 条件渲染
多了个 v-else-if
## 列表渲染
多了个 对象渲染
使用值范围
## 事件处理
内联事件处理器中访问事件参数
```html
<button click="count++">Add 1</ button>
<button click="warn('Form', $event)">Submit</ button>
```
事件修饰符
stop prevnet self capture once passive
按键修饰符
enter page-down tab delete esc space up down left right
系统修饰符
ctrl alt shift meta
仅 修饰符
exact 
鼠标修饰符
left right middle

## 表单输入绑定
input checkbox radio
select multiple
checkbox true-value false-value
支持对象选项 <option :value="{ number: 123 }">123</option>
### 修饰符
lazy number trim

## 生命周期
<img src="https://staging-cn.vuejs.org/assets/lifecycle.16e4c08e.png" style="width: 50vw" />

## 侦听器
基本使用 watch(variable, async () => {})
### 侦听来源
注意，你不能侦听响应式对象的 property 
watch(obj.count, (count) => {console.log(`count is: ${count}`)})
而用 // 提供一个 getter 函数
watch(() => obj.count,(count) => {console.log(`count is: ${count}`)})
### 深层侦听器
直接给 watch() 传入一个响应式对象，会隐式地创建一个深层侦听器——该回调函数在所有嵌套的变更时都会被触发
这不同于返回响应式对象的 getter 函数：只有在 getter 函数返回不同的对象时，才会触发回调
然而，在上面的例子里，你可以显式地加上 deep 选项，强制转成深层侦听器：
📢 深度侦听需要遍历被侦听对象中的所有嵌套的 property，当用于大型数据结构时，开销很大。因此请只在必要时才使用它，并且要留意性能。
📢 watchEffect() 会立即执行一遍回调函数，如果这时函数产生了副作用，Vue 会自动追踪副作用的依赖关系，自动分析出响应源。上面的例子可以重写为
```js
watchEffect(async () => {
  const response = await fetch(url.value)
  data.value = await response.json()
})
```
### watch 🆚 watchEffect
- watch 只追踪明确侦听的源。它不会追踪任何在回调中访问到的东西。另外，仅在响应源确实改变时才会触发回调。watch 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
- watchEffect，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式 property。这更方便，而且代码往往更简洁，但其响应性依赖关系不那么明确。

### 回调的刷新时机
- 当你更改了响应式状态，它可能会同时触发 Vue 组件更新和侦听器回调。
- 默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新之前被调用。这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。
```js
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})
import { watchPostEffect } from 'vue'
```
### 停止侦听器
一个关键点是，侦听器必须用同步语句创建：如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏。如下方这个例子：
```js
import { watchEffect } from 'vue'
// 它会自动停止
watchEffect(() => {})
// ...这个则不会！
setTimeout(() => {
  watchEffect(() => {})
}, 100)
const unwatch = watchEffect(() => {})
// ...当该侦听器不再需要时
unwatch()
```

## 模板 ref
```html
<script setup>
import { ref, onMounted } from 'vue'

// 声明一个 ref 来存放该元素的引用
// 必须和模板 ref 同名
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
// 如果不使用 <script setup>，需确保从 setup() 返回 ref
</script>

<template>
  <input ref="input" />
</template>
```

### v-for ref
```html
<script setup>
import { ref, onMounted } from 'vue'

const list = ref([1, 2, 3])

const itemRefs = ref([])

onMounted(() => {
  alert(itemRefs.value.map(i => i.textContent))
})
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```
### 函数型 ref
<input :ref="(el) => { /* 将 el 分配给 property 或 ref */ }">

### 组件上的 ref

## 组件基础
