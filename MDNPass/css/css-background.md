### CSS背景和边框
#### 背景颜色
background-color 属性定义了 CSS 中任何元素的背景颜色。属性接受任何有效的 `<color>` 值。background-color 可以延伸至元素的内容和内边距盒子的下面。  
#### 背景图片
background-image 属性可以在一个元素的背景中显示一个图像。在下面的例子中，我们有两个盒子，其中一个盒子具有比盒子大的背景图像（balloons.jpg），另一个盒子具有较小的单个星星的图像（star.png）。  

这个示例演示了关于背景图像的两种情形。默认情况下，大图不会缩小以适应盒子，因此我们只能看到它的一个小角，而小图则是平铺以填充方框。  
如果除了背景图像外，还指定了背景颜色，则图像将显示在颜色的上层。  
##### 控制背景平铺行为
background-repeat 属性用于控制图像的平铺行为。可用的值是：  

no-repeat——阻止背景重复平铺。  
repeat-x——仅水平方向上重复平铺。  
repeat-y——仅垂直方向上重复平铺。  
repeat——默认值，在水平和垂直两个方向重复平铺。  
##### 调整背景图像的大小
使用`background-size:`属性设置图像大小,它可以设置长度或百分比值，来调整图像的大小以适应背景。  
你也可以使用关键字：  
  
cover：浏览器将使图像足够大，使它完全覆盖了盒子区域，同时仍然保持其宽高比。在这种情况下，图像的部分区域可能会跳出盒子外。  
contain：浏览器会将图像调整到适合框内的尺寸。在这种情况下，如果图像的长宽比与盒子的长宽比不同，你可能会在图像的两边或顶部和底部出现空隙。  
##### 背景图像定位
`background-position` 属性允许你选择背景图片出现在它所应用的盒子上的位置。这使用了一个坐标系统，其中方框的左上角是 `(0,0)`，方框沿水平`（x）`和垂直`（y）`轴定位。  
你可以使用像 top 和 right 这样的关键字（在 background-image 页面上查找其他的关键字）：  
```css
.box {
  background-image: url(star.png);
  background-repeat: no-repeat;
  background-position: top center;
}

```
或者使用长度和百分比值：  
```css
.box {
  background-image: url(star.png);
  background-repeat: no-repeat;
  background-position: 20px 10%;
}
```
最后，你还可以使用四值语法来指示到盒子的某些边的距离——在本例中，长度单位是与其前面的值的偏移量。所以在下面的 CSS 中，我们将背景定位在距顶部 20px 和右侧 10px 处：  
```css
.box {
  background-image: url(star.png);
  background-repeat: no-repeat;
  background-position: top 20px right 10px;
}
```
#### 多个背景图像
也可以有多个背景图像——在单个属性值中指定多个 background-image 值，用逗号分隔每个值。  

当你这样做时，你可能会出现背景图片相互重叠的情况。背景将分层，最后列出的背景图片位于最下层，而之前的每张图片都堆在代码中紧随其后的那张图片之上。  
其他 background-* 属性也可以像 background-image 一样使用逗号分隔的方式设置：  
```css
.image{
background-image: url(image1.png), url(image2.png), url(image3.png),
  url(image4.png);
background-repeat: no-repeat, repeat-x, repeat;
background-position:
  10px 20px,
  top right;
}


```
#### 边框
通常，当我们使用 CSS 向元素添加边框时，我们使用一个简写属性在一行 CSS 中设置边框的颜色、宽度和样式。  
我们可以使用 border 为一个框的所有四条边设置边框。
```css
p{
    .box {
  border: 1px solid black;
}
}
```
或者我们可以只设置盒子的一条边，例如：
```css
.box {
  border-top: 1px solid black;
}
```
这些简写等价于：
```css
.box {
  border-width: 1px;
  border-style: solid;
  border-color: black;
}
```