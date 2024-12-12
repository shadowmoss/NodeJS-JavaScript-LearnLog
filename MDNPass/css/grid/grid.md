### 什么是网格布局？
网格是由一系列水平及垂直的线构成的一种布局模式。根据网格，我们能够将设计元素进行排列，帮助我们设计一系列具有固定位置以及宽度的元素的页面，使我们的网站页面更加统一。

一个网格通常具有许多的列（column）与行（row），以及行与行、列与列之间的间隙，这个间隙一般被称为沟槽（gutter）。

#### 定义显式网格
```css
div{
    display:grid;
    grid-template-column: 1fr 1fr 1fr; /*显式定义网格布局行宽*/
    grid-template-row:1fr 1fr 1fr;
    grid-auto-rows:minmax(100px,auto);/*minmax()函数，自动行、列的高度、宽度设置，minmax()第一个参数用于设置最小值，第二个参数设置最小值。*/
}
```
#### 自动使用多列填充
现在来试试把学到的关于网格的一切，包括 repeat 与 minmax 函数，组合起来，来实现一个非常有用的功能。某些情况下，我们需要让网格自动创建很多列来填满整个容器。通过设置grid-template-columns属性，我们可以实现这个效果，不过这一次我们会用到 repeat() 函数中的一个关键字auto-fill来替代确定的重复次数。而函数的第二个参数，我们使用minmax()函数来设定一个行/列的最小值，以及最大值 1fr。

在你的文件中试试看，你也许可以用到以下的代码。
```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 20px;
}

```

#### 基于线的元素放置
在定义完了网格之后，我们要把元素放入网格中。我们的网格有许多分隔线，第一条线的起始点与文档书写模式相关。在英文中，第一条列分隔线（即网格边缘线）在网格的最左边而第一条行分隔线在网格的最上面。而对于阿拉伯语，第一条列分隔线在网格的最右边，因为阿拉伯文是从右往左书写的。

我们根据这些分隔线来放置元素，通过以下属性来指定从那条线开始到哪条线结束。
* grid-column-start
* grid-column-end
* grid-row-start
* grid-row-end
这些属性的值均为分隔线序号，你也可以用以下缩写形式来同时指定开始与结束的线。
* grid-column
* grid-row
注意开始与结束的线的序号要使用/符号分开。
```css
header {
  grid-column: 1 / 3;   /*从第一根线到第3根*/
  grid-row: 1;          /*从第一根行线开始*/
}

article {
  grid-column: 2;   /*从第2根列线开始*/
  grid-row: 2;      /*从第二根行线*/
}

aside {
  grid-column: 1;
  grid-row: 2;
}

footer {
  grid-column: 1 / 3;
  grid-row: 3;
}

```
### 基于网格区域的元素放置
```css
.container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  grid-template-columns: 1fr 3fr;
  gap: 20px;
}

header {
  grid-area: header;
}

article {
  grid-area: content;
}

aside {
  grid-area: sidebar;
}

footer {
  grid-area: footer;
}

```