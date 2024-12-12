### 脚本加载策略
页面上的所有 HTML 代码都按其出现的顺序加载。如果使用 JavaScript 去操作页面上的元素（更准确的说，是文档对象模型），那么如果 JavaScript 在 HTML 之前就被加载和解析了，代码将无法运行。

有几种不同的策略来确保 JavaScript 只在 HTML 解析之后运行：

在上面的内部 JavaScript 示例中，脚本元素放在文档正文的底部，因此只能在 HTML 正文的其他部分被解析以后运行。

在上面的外部 JavaScript 实例中，脚本元素放在文档的头部，在解析 HTML 正文之前解析。但是由于我们使用了 `<script type="module">`，代码被视为一个模块，并且浏览器在执行 JavaScript 模块之前会等待所有的 HTML 代码都处理完毕（也可以把外部脚本放在正文的底部，但是如果 HTML 内容较多且网络较慢，在浏览器开始获取并加载脚本之前可能需要大量的时间，因此将外部脚本放在头部通常会更好一些）。

如果仍然想在文档头部使用非模块脚本，可能阻塞整个页面的显示，并且可能出现错误，因为脚本在文档解析之前执行：

对于外部脚本，应该在 `<script>` 元素上添加 defer（或者如果不需要 HTML 解析完成，则可以使用 async）属性。
对于内部脚本，应该将代码封装在 DOMContextLoaded 事件监听器中。
这超出了本教程的范围，除非你需要支持非常老的浏览器，否则不要这样做，使用 `<script type="module">` 代替即可。
#### 比较运算符
* === 全等(是否完全一样)
* !== 不相等
* < 小于
* > 大于
#### 变量
javaScript变量可以存储任何类型，不管是原始值(Number,String,Boolean)，还是对象(Array,Object)。
#### 文本处理
* 在 JavaScript 中，你可以选择单引号（'）、双引号（"）或反引号（`）来包裹字符串。以下所有方法都可以：
```javaScript
const single = '单引号';
const double = "双引号";
const backtick = `反引号`;

console.log(single);
console.log(double);
console.log(backtick);

```
使用反引号声明的字符串是一种特殊字符串，被称为模板字面量。在大多数情况下，模板字面量与普通字符串类似，但它具有一些特殊的属性：

你可以在其中嵌入 JavaScript
你可以声明多行的模板字面量
```js
const name = "克里斯";
const greeting = `你好，${name}`;
console.log(greeting); // "你好，克里斯"
```
#### 字符串方法
1. 查找字符串,子串
```js
browserType.indexOf("zilla");
// 该函数返回子字符串在字符串中的下标起始地址
```
2. 根据查找到的子串起始下表获取整个子串。当你知道字符串中的子字符串开始的位置，以及想要结束的字符时，slice()可以用来提取 它。尝试以下：
```js
browserType.slice(0, 3);

```
这时返回"moz"——第一个参数是开始提取的字符位置，第二个参数是提取的最后一个字符的后一个位置。所以提取从第一个位置开始，直到但不包括最后一个位置。（此例中）你也可以说第二个参数等于被返回的字符串的长度。  
3. 转换大小写
字符串方法toLowerCase()和toUpperCase()字符串并将所有字符分别转换为小写或大写。例如，如果要在将数据存储在数据库中之前对所有用户输入的数据进行规范化，这可能非常有用。

让我们尝试输入以下几行来看看会发生什么：
```js
let radData = "My NaMe Is MuD";
radData.toLowerCase();
radData.toUpperCase();
```
4. 替换字符串的某部分
你可以使用replace()方法将字符串中的一个子字符串替换为另一个子字符串。在基础的层面上，这个工作非常简单。你当然可以用它做一些更高级的事情，但目前我们不会涉及到。

它需要两个参数 - 要被替换下的字符串和要被替换上的字符串。尝试这个例子：
```js
browserType.replace("moz", "van");
```
注意，在实际程序中，想要真正更新 browserType 变量的值，你需要设置变量的值等于刚才的操作结果；它不会自动更新子串的值。所以事实上你需要这样写：`browserType = browserType.replace('moz','van');`。
#### 数组
1. 创建数组
在这种情况下，数组中的每个项目都是一个字符串，但请记住，你可以将任何类型的元素存储在数组中 - 字符串，数字，对象，另一个变量，甚至另一个数组。你也可以混合和匹配项目类型 - 它们并不都是数字，字符串等。尝试下面这些：
```js
let sequence = [1, 1, 2, 3, 5, 8, 13];
let random = ["tree", 795, [0, 1, 2]];
```
#### 一些有用的数组方法
通常，你会看到一个包含在一个长长的字符串中的原始数据，你可能希望将有用的项目分成更有用的表单，然后对它们进行处理，例如将它们显示在数据表中。为此，我们可以使用 split() 方法。在其最简单的形式中，这需要一个参数，你要将字符串分隔的字符，并返回分隔符之间的子串，作为数组中的项。
```js
let myData = "Manchester,London,Liverpool,Birmingham,Leeds,Carlisle";
let myArray = myData.split(",");/*split方法对字符串分割成数组*/
myArray;
myArray.length;
myArray[0]; // the first item in the array
myArray[1]; // the second item in the array
myArray[myArray.length - 1]; // the last item in the array
```
`join()`方法将数组组合成字符串
```js
let myNewString = myArray.join(",");
myNewString;
```

#### 添加和删除数组项
```js
let myArray = [
  "Manchester",
  "London",
  "Liverpool",
  "Birmingham",
  "Leeds",
  "Carlisle",
];
```
在数组末尾添加或删除一个项目,我们可以使用 push() 和 pop()。
```js
myArray.push("Cardiff");
myArray;
myArray.push("Bradford", "Brighton");
myArray;

/*
    添加新项到数组，返回现在数组长度
*/
var newLength = myArray.push("Bristol");
myArray;
newLength;

myArray.pop();

/*将数组最后一位删除,会已删除的项目*/
let removedItem = myArray.pop();
myArray;
removedItem;

```
unshift()（添加元素到数组开头） 和 shift()(将元素从数组开头删除) 从功能上与 push() 和 pop() 完全相同，只是它们分别作用于数组的开始，而不是结尾。
```js
/*添加元素到数组开头*/
myArray.unshift("Edinburgh");
myArray;

```

```js
/*将数组开头的元素移除，并返回移除元素*/
let removedItem = myArray.shift();
myArray;
removedItem;

```
#### 逻辑运算符
* && 逻辑与不只会返回布尔值，当第一个参数为真时返回第二个参数
* || 逻辑或不只会返回布尔值，当第一个参数为真时，返回第一个参数，第一个参数为假时，返回第二个参数。两个操作数都为false，则返回false,或null,或undefined||NaN(Not a Number)
#### 循环
for()、while()、do...while()循环
#### switch结构
switch结构内部以===(严格相等进行比较)