# 循环事件绑定的解决方法

**闭包：函数运行的一种机制**
+ 函数执行会形成一个私有上下文，如果上下文中的某些内容（一般指的是堆内存地址）被上下文以外的一些事物（例如：变量/事件绑定）所占用，则当前上下文不能被出栈释放 => **闭包的机制：形成一个不被释放的上下文**
    + 保护：保护私有上下文的**私有变量**和外界互不影响
    + 保存：上下文不被释放，上下文中的**私有变量**和**值**都会被保存起来，可以供其下级上下文中使用
+ 弊端：大量使用闭包，导致栈内存太大，页面渲染变慢，性能受到影响

看一个例子
```html
  <button>第一个按钮</button>
  <button>第二个按钮</button>
  <button>第三个按钮</button>
```
```javascript
  const btn = document.querySelectorAll('button');
  for (var i = 0; i < btn.length; i++) {
    btn[i].onclick = function () {
      console.log(`当前索引为${i}`);
    }
  }
```
假设有三个按钮，我们进行循环事件绑定，我们希望每次点击按钮都会输出索引

可上述代码并不能实现此功能，每次点击按钮输出的索引为 3，因为在这里 i 是**全局变量**，每一次输出 i 值都是输出代码执行过后的 i 值，即为 3

在这里我们尝试用**闭包**解决此问题，其实有更简单的方法，如直接在 for 循环中用 let 声明变量。

**方案一：闭包**

```javascript
    const btn = document.querySelectorAll('button');
    for (var i = 0; i < btn.length; i++) {
      (function (i) {
        btn[i].onclick = function () {
          console.log(`当前索引为${i}`);
        }
      })(i)
    }
```

我们借用 IIFE(Immediately-invoked function expression) 立即执行函数 来解决此问题。

每次循环过后，函数都会立即执行，形成一个私有的上下文，时间绑定的函数被 button 所占用，所以堆内存不会被释放，所以相对应的私有上下文也不会被释放，这样点击对应的按钮，就可以找到相应私有上下文中的 i 值。

但如果按钮总数很大，每一次循环都要增加一个闭包，会占用大量的栈内存。

**方案二：自定义属性**
```javascript
    const btn = document.querySelectorAll('button');
    for (var i = 0; i < btn.length; i++) {
      btn[i].index = i;
      btn[i].onclick = function () {
        console.log(`当前索引为${this.index}`);
      }
    }
```

每次循环，都给 btn 对象加一个自定义属性，存储相应的索引值。这样节省了闭包所占用的栈内存。

**方案三：事件委托**

虽然方案二提升了性能，但执行代码还是有一个循环的过程，事件委托可以优化这一过程。

```html
  <button index="0">第一个按钮</button>
  <button index="1">第二个按钮</button>
  <button index="2">第三个按钮</button>
```
```javascript
    document.body.onclick = function (ev) {
      var target = ev.target,
        targetTag = target.tagName;
      if (targetTag === "BUTTON") {
        var index = target.getAttribute('index');
        console.log(`当前点击按钮的索引：${index}`)
      }
    }
```
这样不会过多占用堆栈内存，同时也舍去了循环过程。