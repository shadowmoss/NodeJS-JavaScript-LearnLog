### .?可选链
当前某个对象的某个属性可能是不存在的，使用`?.()`,`?.[]`来进行,调用，前提是允许这种不存在发生
```js
let user = null;

user?.name = "John"; // Error，不起作用
// 因为它在计算的是：undefined = "John"
```