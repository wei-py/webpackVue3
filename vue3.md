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
### 计算属性缓存 vs 方法
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
<img src="https://staging-cn.vuejs.org/assets/lifecycle.16e4c08e.png" />

## 监听器
