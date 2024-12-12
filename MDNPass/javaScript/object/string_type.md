### 字符串原始类型
1. 三种在javaScript中创建字符串的方法
    `""`,`''`,`'``'`
2. 特殊字符串
常见的转义字符  
\n  
\t  
\'  
\"  
\\  
\uXXXX 以UTF-16编码的十六进制代码 XXXX 的Unicode字符。  
诸如此类，还有很多
3. 字符串长度,str.length。字符串长度是一个数字属性。
4. 字符串访问可以使用str[0],str.charAt(pos)等方式来访问具体的字符串字符。也可以使用for .. of 的方式来遍历字符。
5. javaScript中字符串不可改变。
6. toLowerCase() 和 toUpperCase() 方法可以改变大小写：
7. str.indexOf
第一个方法是 str.indexOf(substr, pos)。它从给定位置 pos 开始，在 str 中查找 substr，如果没有找到，则返回 -1，否则返回匹配成功的位置。
8. str.lastIndexOf(substr,pos)。它从字符串的末尾开始搜索到开头。它会以相反的顺序列出这些事件。
9. 更现代的方法是使用includes，startsWith，endsWith  
str.includes(substr, pos) 根据 str 中是否包含 substr 来返回 true/false。str.includes 的第二个可选参数是开始搜索的起始位置  
方法 str.startsWith 和 str.endsWith 的功能与其名称所表示的意思相同.
#### 获取子字符串  
JavaScript 中有三种获取字符串的方法：substring、substr 和 slice。  
1. str.slice(start [, end])  
返回字符串从 start 到（但不包括）end 的部分。  
如果没有第二个参数，slice 会一直运行到字符串末尾。  
2. str.substr(start,[,length])  
返回字符串从 start 开始的给定 length 的部分。
3. str.substring(start [, end])  
返回字符串从 start 到（但不包括）end 的部分。  
这与 slice 几乎相同，但它允许 start 大于 end。  
不支持负参数（不像 slice），它们被视为 0。  
#### 比较字符串
所有的字符串都使用 UTF-16 编码。即：每个字符都有对应的数字代码。有特殊的方法可以获取代码表示的字符，以及字符对应的代码。  
str.codePointAt(pos)  
返回在 pos 位置的字符代码 :
```javaScript
// 不同的字母有不同的代码
alert( "z".codePointAt(0) ); // 122
alert( "Z".codePointAt(0) ); // 90
```
String.fromCodePoint(code)
通过数字 code 创建字符
```javaScript
alert( String.fromCodePoint(90) ); // Z
```
现在我们看一下代码为 65..220 的字符（拉丁字母和一些额外的字符），方法是创建一个字符串：
```javaScript
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```