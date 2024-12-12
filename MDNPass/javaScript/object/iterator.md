### 可迭代对象(Iterable Object)
可迭代对象，必须包含一个`[Symbol.iterator]`属性的方法，该方法返回一个迭代器对象(表示该对象是可迭代的)，迭代器对象必须包含一个`next()`方法。  
`next()`方法返回对象格式`{done:Boolean,value:value}`当`done:true`时，表示迭代结束，否则的话，提供下一个值。  
#### 类数组和可迭代对象
类数组对象，表示是拥有index、length长度属性，用数字下标存储键值对的对象。  
可迭代对象表示拥有`[Symbol.iterator]`方法的对象。  
有时我们想要对可迭代对象或者类数组对象使用数组方法，可以通过`Array.from()`方法将其转换为数组，这样即可使用数组方法了。

```javaScript
//Array.from 的完整语法允许我们提供一个可选的“映射（mapping）”函数：
Array.from(obj[, mapFn, thisArg])
```
可选的第二个参数 mapFn 可以是一个函数，该函数会在对象中的元素被添加到数组前，被应用于每个元素，此外 thisArg 允许我们为该函数设置 this。