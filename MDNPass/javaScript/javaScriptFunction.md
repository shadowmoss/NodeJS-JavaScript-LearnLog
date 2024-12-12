### javaScriptFunction
#### 函数声明
function 关键字首先出现，然后是 函数名，然后是括号之间的 参数 列表（用逗号分隔，在上述示例中为空，我们将在接下来的示例中看到），最后是花括号之间的代码（即“函数体”）。
```js
function name(parameter1, parameter2, ... parameterN) {
  ...body...
}
```
#### 默认值
如果一个函数被调用，但有参数（argument）未被提供，那么相应的值就会变成 undefined。

例如，之前提到的函数 showMessage(from, text) 可以只使用一个参数（argument）调用：
我们可以使用 = 为函数声明中的参数指定所谓的“默认”（如果对应参数的值未被传递则使用）值：
```js
function showMessage(from, text = "no text given") {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text given
```
这里 "no text given" 是一个字符串，但它可以是更复杂的表达式，并且只会在缺少参数时才会被计算和分配。所以，这也是可能的：
```js
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() 仅在没有给定 text 时执行
  // 其运行结果将成为 text 的值
}
```
几年前，JavaScript 不支持默认参数的语法。所以人们使用其他方式来设置默认参数。

如今，我们会在旧代码中看到它们。

例如，显式地检查 undefined：
```js
function showMessage(from, text) {
  if (text === undefined) {
    text = 'no text given';
  }

  alert( from + ": " + text );
}
/*……或者使用 || 运算符：*/
function showMessage(from, text) {
  // 如果 text 的值为假值，则分配默认值
  // 这样赋值 text == "" 与 text 无值相同
  text = text || 'no text given';
  ...
}
```
还有使用空值合并运算符的`??`:
```js
a??b /* a??b 的结果是，如果a是真值，则结果为a。如果a不是真值，则结果为b，??只在第一个参数为null/undefined时使用第二个默认值.*/
function showCount(count) {
  // 如果 count 为 undefined 或 null，则提示 "unknown"
  alert(count ?? "unknown");
}

showCount(0); // 0
showCount(null); // unknown
showCount(); // unknown
```
#### 箭头函数Lambda表达式
创建函数还有另外一种非常简单的语法，并且这种方法通常比函数表达式更好。

它被称为“箭头函数”，因为它看起来像这样：
```js
let func = (arg1, arg2, ..., argN) => expression;
/*单参数*/
let func = arg1 => expression;

/*
    多行
*/
let sum = ()=>{
    return;
}
```