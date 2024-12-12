### 原始类型封装器
javaScript提供了string、number、bigint、boolean、symbol、null、undefined这几种原始类型  
同时也提供了String、Number、Bigint、Boolean,Symbol这几种针对原始类型的封装器，其中包含方法。  
可以通过new 封装器()创建原始类型对象，也可直接调用封装器方法，生成原始类型值,比如`let num = Number("123")`，它将字符串转换为number。
```javaScript
let str = new String("str");
let number = new Number(12345);
let bigint = new BigInt(12341);
let bool = new Boolean(true);
let sym = new Symbol("sym");
```
尝试访问原始类型的属性值时，会先自动根据原始类型封装器创建一个临时封装对象，在操作执行完成之后，立即删除这个临时对象。

#### 数字类型
```javaScript
// 定义一个10亿
let billion = 1000000000;

// 也可以这样定义10亿
let bill = 1_000_000_000;

// 指数表示法
let bi = 1e9    // 表示1后跟9个0

let b = 1-e9    // 表示小数

// 十六进制，二进制和八进制
let bcd = 0xff;

// 二进制255
let a = 0b11111111;

// 八进制255
let b = 0o377  
```

将数字转换为字符串,并按照指定的进制返回字符串  
默认接收2到36的进制范围,36是最大进制，数字可以是0..9或者A..Z
```javaScript
let num = 255;

// 转换为16进制
num.toString(16);

// 转换为2进制
num.toString(2);

// 这种写法也是正确的。第一个点会被认为是小数，第二个点表示这个数的小数部分为零直接调用方法。
alert( 123456..toString(36) );
```
#### 舍入
```javaScript
// 向下取整
Math.floor(3.1) // 3
// 向上取整
Math.ceil(3.1) // 4
// 四舍五入
Math.round(3.1) // 3
Math.round(3.6) // 4
// 移除小数点后的所有内容
Math.trunc(3.1)

// 保留小数点后n位,进行四舍五入,结果为一个字符串
Math.toFixed(2);

// 转换成数字调用Number
Number(Math.toFixed(2));
```
Number原始类型使用64位bit存储，其中首位表示正负,11位用于表示小数点位置，52为用于存储实际数字,当数字超过这个范围时，该数被解析为Infinity
```javaScript
alert(1e500)
```
#### 不精确的计算
使用二进制数字系统无法 精确 存储 0.1 或 0.2，就像没有办法将三分之一存储为十进制小数一样。

IEEE-754 数字格式通过将数字舍入到最接近的可能数字来解决此问题。这些舍入规则通常不允许我们看到“极小的精度损失”，但是它确实存在。

我们可以看到：
```javaScript
alert( 0.1.toFixed(20) ); // 0.10000000000000000555
```
解决该问题使用toFixed()函数对结果进行舍入
```javaScript
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // "0.30"
```
#### isFinite和isNaN
isFinite用于检测一个值是否为常规数字，isNaN用于检查一个值is Not a Number  
空字符串和仅有空格的字符串均被视为0。

#### parseInt和parseFloat将携带单位的字符串转换为Number
它们可以从字符串中“读取”数字，直到无法读取为止。如果发生 error，则返回收集到的数字。函数 parseInt 返回一个整数，而 parseFloat 返回一个浮点数：  
```javaScript
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12，只有整数部分被返回了
alert( parseFloat('12.3.4') ); // 12.3，在第二个点出停止了读取
```

parseInt() 函数具有可选的第二个参数。它指定了数字系统的基数，因此 parseInt 还可以解析十六进制数字、二进制数字等的字符串：
```javaScript
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255，没有 0x 仍然有效

alert( parseInt('2n9c', 36) ); // 123456
```

#### 其他数学函数
Math.random()，返回从0到1的随机数  
Math.max()、Math.min() 从任意数量的参数中返回最大值和最小值  
Math.pow(n,power),返回 n 的给定（power）次幂。  