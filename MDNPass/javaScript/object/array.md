### javaScript数组
数组是一个对象，
两种主要的创建数组类型的方式
```javaScript
let ar = [0,2,3,4,54,{name:"dksjfs"}]
let arr = new Array();
```
#### 常用的数组方法
```javaScript
let arr = [0,2,3,4];
arr.push();     // 添加一个元素到数组末尾
arr.pop();      // 将数组末尾的一个元素取出

arr.shift();    // 取出数组第一个元素并返回
arr.unshift();  // 将一个元素添加到数组首端。
```
#### 访问数组。
可以使用索引下标访问数组，`arr[2]`  
还有`for..of`遍历数组  
数组的`length`本质上是最大的索引下标加1，且这个`length`属性可以修改，增大`length`不会怎么样，但是减小`length`会将当前数组截断,所以清空一个数组的最好方法就行将`arr.length=0`
```javaScript
let arr = [1,2,3,4,5]
arr.length = 0; // 清空当前数组
```
#### 更多数组方法
数组方法备忘单：

添加/删除元素：

push(...items) —— 向尾端添加元素，
pop() —— 从尾端提取一个元素，
shift() —— 从首端提取一个元素，
unshift(...items) —— 向首端添加元素，
splice(pos, deleteCount, ...items) —— 从 pos 开始删除 deleteCount 个元素，并插入 items。也可用于在指定位置插入元素,当deleteCount为0时。
slice(start, end) —— 创建一个新数组，将从索引 start 到索引 end（但不包括 end）的元素复制进去。
concat(...items) —— 返回一个新数组：复制当前数组的所有元素，并向其中添加 items。如果 items 中的任意一项是一个数组，那么就取其元素。
搜索元素：

indexOf/lastIndexOf(item, pos) —— 从索引 pos 开始搜索 item，搜索到则返回该项的索引，否则返回 -1。
includes(value) —— 如果数组有 value，则返回 true，否则返回 false。
find/filter(func) —— 通过 func 过滤元素，返回使 func 返回 true 的第一个值/所有值。
findIndex 和 find 类似，但返回索引而不是值。
遍历元素：

forEach(func) —— 对每个元素都调用 func，不返回任何内容。
转换数组：

map(func) —— 根据对每个元素调用 func 的结果创建一个新数组。
sort(func) —— 对数组进行原位（in-place）排序，然后返回它。
reverse() —— 原位（in-place）反转数组，然后返回它。
split/join —— 将字符串拆分为数组并返回/将数组项组合成字符串并返回。
reduce/reduceRight(func, initial) —— 通过对每个元素调用 func 计算数组上的单个值，并在调用之间传递中间结果。
其他：

Array.isArray(value) 检查 value 是否是一个数组，如果是则返回 true，否则返回 false。
请注意，sort，reverse 和 splice 方法修改的是数组本身。