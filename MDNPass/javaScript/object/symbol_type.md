### symbol类型。
规范规定，只有两种原始类型可以用作对象属性键:
1. 字符串类型
2. symbol类型
Symbol值表示的是唯一的标识符。
可以使用Symbol()来创建这种类型的值:
```js
let id = Symbol();
```
Symbol值用来创建隐藏的对象属性:  
这些对象属性不参与for..in循环  
但是可以被Object.assign方法浅拷贝。  
### 全局的Symbol
使用Symbol.for()方法可以获取全局Symbol表中的symbol值,已同一个key可以在不同的地方获取同一个symbol.如果key不存在于Symbol全局表中，那么将会创建一个全新的symbol。  
使用Symbol.keyfor()方法可以通过symbol值获取当前symbol在全局Symbol表中的注册key名称。
