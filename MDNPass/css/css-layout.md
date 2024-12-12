### CSS布局
#### 正常布局流
正常布局流（normal flow）是指在不对页面进行任何布局控制时，浏览器默认的 HTML 布局方式。  
```html
<p>I love my cat.</p>

<ul>
  <li>Buy cat food</li>
  <li>Exercise</li>
  <li>Cheer up friend</li>
</ul>

<p>The end!</p>
```
注意，HTML 元素完全按照源码中出现的先后次序显示——第一个段落、无序列表、第二个段落。  

出现在另一个元素下面的元素被描述为块元素，与出现在另一个元素旁边的内联元素不同，内联元素就像段落中的单个单词一样。  

下列布局技术会覆盖默认的布局行为：  

* display 属性 — 标准的 value，比如block, inline 或者 inline-block 元素在正常布局流中的表现形式 (见 Types of CSS boxes). 接着是全新的布局方式，通过设置display的值，比如 CSS Grid 和 Flexbox.  
* 浮动——应用 float 值，诸如 left 能够让块级元素互相并排成一行，而不是一个堆叠在另一个上面。  
* position 属性 — 允许你精准设置盒子中的盒子的位置，正常布局流中，默认为 static ，使用其他值会引起元素不同的布局方式，例如将元素固定到浏览器视口的左上角。  
* 表格布局— 表格的布局方式可以用在非表格内容上，可以使用display: table和相关属性在非表元素上使用。  
* 多列布局— 这个 Multi-column layout 属性可以让块按列布局，比如报纸的内容就是一列一列排布的。  
#### Flex弹性盒容器
下面这些 HTML 标记描述了一个 class 为wrapper的容器元素，它的内部有三个<div>元素。它们在我们的英文文档当中，会默认地作为块元素从上到下进行显示。

现在，当我们把display: flex添加到它的父元素时，这三个元素就自动按列进行排列。这是由于它们变成了flex 项 (flex items)，按照 flex 容器（也就是它们的父元素）的一些 flex 相关的初值进行 flex 布局：它们整整齐齐排成一行，是因为父元素上flex-direction的初值是row。它们全都被拉伸至和最高的元素高度相同，是因为父元素上align-items属性的初值是stretch。这就意味着所有的子元素都会被拉伸到它们的 flex 容器的高度，在这个案例里就是所有 flex 项中最高的一项。所有项目都从容器的开始位置进行排列，排列成一行后，在尾部留下一片空白。
#### grid布局
Flexbox 用于设计横向或纵向的布局，而 Grid 布局则被设计用于同时在两个维度上把元素按行和列排列整齐。  
设置 display: grid
同 flex 一样，你可以通过指定 display 的值来转到 grid 布局：display: grid。下面的例子使用了与 flex 例子类似的 HTML 标记，描述了一个容器和若干子元素。除了使用display:grid，我们还分别使用 grid-template-rows 和 grid-template-columns 两个属性定义了一些行和列的轨道。定义了三个1fr的列，还有两个100px的行之后，无需再在子元素上指定任何规则，它们自动地排列到了我们创建的格子当中。
```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 100px;
  grid-gap: 10px;
}
```
```html
<div class="wrapper">
  <div class="box1">One</div>
  <div class="box2">Two</div>
  <div class="box3">Three</div>
  <div class="box4">Four</div>
  <div class="box5">Five</div>
  <div class="box6">Six</div>
</div>
```
##### 在网格内放置元素
一旦你拥有了一个 grid，你也可以显式地将元素摆放在里面，而不是依赖于浏览器进行自动排列。在下面的第二个例子里，我们定义了一个和上面一样的 grid，但是这一次我们只有三个子元素。我们利用 grid-column 和 grid-row 两个属性来指定每一个子元素应该从哪一行/列开始，并在哪一行/列结束。这就能够让子元素在多个行/列上展开。  
```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 100px;
  grid-gap: 10px;
}

.box1 {
  grid-column: 2 / 4;
  grid-row: 1;
}

.box2 {
  grid-column: 1;
  grid-row: 1 / 3;
}

.box3 {
  grid-row: 2;
  grid-column: 3;
}
```
```html
<div class="wrapper">
  <div class="box1">One</div>
  <div class="box2">Two</div>
  <div class="box3">Three</div>
</div>
```
#### 相对定位
相对定位 (relative positioning) 让你能够把一个正常布局流 (normal flow) 中的元素从它的默认位置按坐标进行相对移动。比如将一个图标往下调一点，以便放置文字。我们可以通过下面的规则添加相对定位来实现效果：
```css
.positioned {
  position: relative;
  top: 30px;
  left: 30px;
}
```
这里我们给中间段落的position 一个 relative值——这属性本身不做任何事情，所以我们还添加了top和left属性。这些可以将受影响的元素向下向右移——这可能看起来和你所期待的相反，但你需要把它看成是左边和顶部的元素被“推开”一定距离，这就导致了它的向下向右移动。
#### 绝对定位
绝对定位用于将元素移出正常布局流 (normal flow)，以坐标的形式相对于它的容器定位到 web 页面的任何位置，以创建复杂的布局。有趣的是，它经常被用于与相对定位和浮动的协同工作。

回到我们最初的非定位示例，我们可以添加以下的 CSS 规则来实现绝对定位：  
```css
.positioned {
  position: absolute;
  top: 30px;
  left: 30px;
}

```
这和之前截然不同！定位元素现在已经与页面布局的其余部分完全分离，并位于页面的顶部。其他两段现在靠在一起，好像之前那个中间段落不存在一样。top和left属性对绝对位置元素的影响不同于相对位置元素。在这一案例当中，他们没有指定元素相对于原始位置的移动程度。相反，在这一案例当中，它们指定元素应该从页面边界的顶部和左边的距离 (确切地说，是 <html>元素的距离)。我们也可以修改作为容器的那个元素（在这里是<html>元素），要了解这方面的知识，参见关于定位 (positioning)的课程

#### 固定定位
固定定位 (fixed positioning) 同绝对定位 (absolute positioning) 一样，将元素从文档流 (document flow) 当中移出了。但是，定位的坐标不会应用于"容器"边框来计算元素的位置，而是会应用于视口 (viewport) 边框。利用这一特性，我们可以轻松搞出一个固定位置的菜单，而不受底下的页面滚动的影响。

在这个例子里面，我们在 HTML 加了三段很长的文本来使得页面可滚动，又加了一个带有position: fixed的盒子。  
```html
<h1>Fixed positioning</h1>

<div class="positioned">Fixed</div>

<p>Paragraph 1.</p>
<p>Paragraph 2.</p>
<p>Paragraph 3.</p>
```
```css
.positioned {
  position: fixed;
  top: 30px;
  left: 30px;
}
```
#### 粘性定位
粘性定位 (sticky positioning) 是最后一种我们能够使用的定位方式。它将默认的静态定位 (static positioning) 和固定定位 (fixed positioning) 相混合。当一个元素被指定了position: sticky时，它会在正常布局流中滚动，直到它出现在了我们给它设定的相对于容器的位置，这时候它就会停止随滚动移动，就像它被应用了position: fixed一样。  
```css
.positioned {
  position: sticky;
  top: 30px;
  left: 30px;
}
```
#### 表格布局
主要关注grid布局和flex弹性盒容器