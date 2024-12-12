### 构造器和操作符"NEW"

当一个函数被使用 new 操作符执行时，它按照以下步骤：

一个新的空对象被创建并分配给 this。
函数体执行。通常它会修改 this，为其添加新的属性。
返回 this 的值。
```js
function User(name) {
  // this = {};（隐式创建）

  // 添加属性到 this
  this.name = name;
  this.isAdmin = false;

  // return this;（隐式返回）
}
```

1. 在一个函数内部，我们可以使用new.target属性来检查它是否被使用new进行调用了。对于常规调用，它为undefined,对于使用new的调用，则等于该函数:
```js
function User() {
  alert(new.target);
}

// 不带 "new"：
User(); // undefined

// 带 "new"：
new User(); // function User { ... }
```
