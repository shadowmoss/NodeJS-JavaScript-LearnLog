### javaScript对象
#### 创建对象
对象是拥有一系列键值对的内容
```js
let user = new Object();
let user = {};  // '字面量'语法
```
#### 添加、删除、访问对象属性
我们可以随时添加、删除、访问对象属性
```js
// 我们可以在创建对象的时候，立即将一些属性以键值对的形式放到 {...} 中。
let user = {     // 一个对象
  name: "John",  // 键 "name"，值 "John"
  age: 30        // 键 "age"，值 30
};

// 读取文件的属性：
alert( user.name ); // John
alert( user.age ); // 30

// 移除属性
delete user.age;

// 我们也可以用多字词语来作为属性名，但必须给它们加上引号：
let user = {
  name: "John",
  age: 30,
  "likes birds": true  // 多词属性名必须加引号
};

// 访问多字词属性
// 设置
user["likes birds"] = true;

// 读取
alert(user["likes birds"]); // true

// 删除
delete user["likes birds"];

// 计算属性
// 当创建一个对象时，我们可以在对象字面量中使用方括号。这叫做 计算属性。
let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
  [fruit]: 5, // 属性名是从 fruit 变量中得到的
};

alert( bag.apple ); // 5 如果 fruit="apple"

// 更复杂的表达式
let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};
```
#### 对象属性
1. 对象的属性名，不支持`javaScript`关键字。要注意避免
2. 验证当前对象是否存在一个属性,使用`in` 关键字判断
```js
console.log("keyname" in obj);
```

3. `for..in`循环遍历一个对象当中的所有可访问的属性,准确的说可枚举属性
```js
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // keys
  alert( key );  // name, age, isAdmin
  // 属性键的值
  alert( user[key] ); // John, 30, true
}
```
4. 对象属性的顺序:
对象有顺序吗？换句话说，如果我们遍历一个对象，我们获取属性的顺序是和属性添加时的顺序相同吗？这靠谱吗？

简短的回答是：“有特别的顺序”：整数属性会被进行排序，其他属性则按照创建的顺序显示。详情如下：

例如，让我们考虑一个带有电话号码的对象：
```js
let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ..,
  "1": "USA"
};

for(let code in codes) {
  alert(code); // 1, 41, 44, 49
}
```
5. 对象引用
仅当两个对象为同一对象时，两者才相等。例如，这里a和b两个对象都引用同一个对象，所以它们相等。
```js
let a = {};
let b = a;

alert(a == b);
alert(a === b);
```
6. 克隆与合并,`Object.assign`,浅拷贝
拷贝一个对象变量会创建一个相同对象的引用。
我们想要复制一个对象，创建一个新对象，遍历已有对象的属性，并在原始类型值的层面复制他们。
```js
let user = {
  name:"John",
  age:30
};

let clone = {}; // 新的空对象

// 将user中所有的属性拷贝到其中
for(let key in user){
    clone[key] = user[key];
}

// 现在clone是带有相同内容的完全独立的对象
clone.name = "Pete"; // 改变了其中的数据

alert(user.name); // 原来的对象中的name属性依然是John
```
使用`Object.assign`方法来达成同样的效果:
```js
// Object.assign(dest,[src1,src2,src3]);
// 第一个参数dest是目标对象
// 更后面的参数src1,...,srcN(可按需传递多个参数)是源对象。
// 该方法将所有源对象的属性拷贝到目标对象中。从第二个开始的所有参数的属性都被拷贝到第一个参数的对象中。

let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// 将 permissions1 和 permissions2 中的所有属性都拷贝到 user 中
Object.assign(user, permissions1, permissions2);

// 现在 user = { name: "John", canView: true, canEdit: true }
```
7. 深拷贝,将对象当中的引用属性也一并拷贝
```js
如拷贝下列这个对象
let user = {
  name:"John",
  sizes:{
    weight:182,
    width:50
  }
};

alert(user.sizes.height); // 182
let clone = Object.assign({},user);
alert( user.sizes === clone.sizes ); // true,同一个对象

// user和clone 引用同一个sizes对象
user.sizes.width++;
alert(clone.sizes.width); // 51,能从另外一个获取到变更后的结果

// 实现深拷贝时，需要使用一个拷贝循环来检查user[key]的每个值，如果它是一个对象，也复制它的结构。

// 现成的实现lodash库的_.cloneDeep(obj);

```

8. 使用`const`声明的对象也是可以被修改的。
```js
// 这里只是声明一个常量引用，常量的是引用，而非被引用对象本身，所以对象内容是可以被修改的。
const user = {
  name:"John"
};

user.name = "Pete";

alert(user.name);
```
#### 方法中的"this"
1. 方法声明
```js
user={
  // 对象中的方法声明
  sayHi: function(){
    alert("Hello");
  }
};

// 方法简写看起来更好，对吧？
let user = {
  sayHi(){
    alert("Hello");
  }
}
```
2. 方法中的"this"
```js
let user = {
  name:"John",
  age:30,

  sayHi(){
    // "this"指的是当前的对象
    alert(this.name);
  }
};

user.sayHi(); // John
```
3. "this" 不受限制
`javaScript`中的`this`可以用于任何函数，即使它不是对象的方法。
如下的方法
```js
function sayHi() {
  alert( this.name );
}

let user = {name:"John"};
let admin = {name:"Admin"};

function sayHi(){
  alert(this.name);
}

// 在两个对象中使用相同的函数,this的值是在运行时计算出来的，取决于代码上下文。
user.f = sayHi;
admin.f = sayHi;

// 这两个调用不同的this值
// 函数内部的"this"是"点符号前面"的那个对象
user.f();
admin.f();

```

4. 没有对象的情况下调用: `this == undefined`
可以在没有对象的情况下调用函数:
```js
function sayHi(){
  alert(this);
}

sayHi();  // 此时this的值为undefined  
```
严格模式下`this`的值为`undefined`,在非严格模式情况下，`this`将会是全局对象.不过一个函数内部含有this,通常意味着这个函数是在对象上下文中被调用的。


5. lambda表达式函数(箭头函数)没有自己的"this"
箭头函数有些特别:它们没有自己的`this`。如果我们在这样的函数中引用`this`,`this`值取决于外部"正常的"函数。
```js
let user = {
  firstName: "Ilya",
  sayHi(){
    let arrow = ()=> alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // Ilya
```