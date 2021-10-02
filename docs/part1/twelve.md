# 闭包进阶应用（1）-循环处理和单例设计模式

1. 循环事件绑定或者循环操作中对于闭包的应用
```javascript
  for(var i = 0; i < 3; i++){
    setTimeout(() => {
      console.log(i);
    }, (i + 1) * 1000);
  }
  //=> 3 3 3
```

如何将上例的输出改为 0 1 2呢，我们可以利用闭包，把相应的 i 值存在函数私用上下文中。

```javascript
  for(var i = 0; i < 3; i++){
    (function(i){
          setTimeout(() => {
            console.log(i);
          }, (i + 1) * 1000);
    })(i)
    //每一次循环，自执行函数执行，都会创建一个函数堆，并把其值给 window.setTimeout,所以该上下文不会被释放
  }
```

实际我们可以利用块级上下文，直接用 let 声明 i，即可解决上述问题：
```javascript
  for(let i = 0; i < 3; i++){
    setTimeout(() => {
      console.log(i);
    }, (i + 1) * 1000);
  }
  // => 0 1 2
  //1. 首先浏览器会创建一个父级私有的上下文，控制循环
  //2. 每一轮循环还会产生一个私有的块级上下文，都有自己的私有变量 i，存储当前的 i 值
  //3. 循环产生的块级上下文，如果没东西被外部占用，循环结束就释放
```
2. 基于闭包实现早期的模块化思想
    + 模块化思想进化史
      + 单例设计模式（模块化概念）
      + AMD -> require.js
      + CMD -> sea.js
      + **CommonJS -> Node本身就是这种规范实现的**
      + **ES6Module**
      + ...

**虽然单例设计模式早已退出历史舞台，但了解后才能更清楚体会之后的出现的设计模式的目的。**


当定义一个单例，我们需要声明很多变量描述此单例，直接声明很容易造成变量冲突。

+ 解决变量冲突
    1. 闭包机制 -> 保护
    ```javascript
    (function () {
      let name = "patrick";
      let age = 22;
      let girlfriend = true;
      const skill = () => {
        console.log('xxx');
      }
      //把私有的信息暴露到全局上，这样在其他的上下文中，就可以调用这些信息了
      window.skill = skill;
    })();
    (function () {
      let name = "Tom";
      let age = 25;
      let girlfriend = false;

      skill();//调用全局的函数
    })();
    ```
    2. 对象 => 把描述当前事物特征的内容，全部汇总到一个对象中（一个堆内存中）
        + 下个例子中，person1 和 person2 是两个完全不同的 Object 实例，所以这种方式也叫**单例设计模式**
        + `new` 操作在 JS 中并不是单例设计模式（在其他语言中 new 操作可视为单例操作模式），在 JS 中是**构造函数模式**
    ```javascript
    //对象起到一个分组作用
    let person1= {
      name: 'patrick',
      age: 22,
      girlfriend: true,
      skill: function () {}
    };
    let person2 = {
      name: 'Tom',
      age: 25,
      girlfriend: false
    }
    ```
3. 高级单例模式：JS 中最早期的模块化开发思想 => 模块之间的**独立性**及**互通性**
    + 把复杂产品，按照功能特点拆分成一个个的模块
    + 每个模块都是独立的，相互之间的信息互不干扰（团队开发）
    + 但是对于一些公共方法，可以实现相互调用 
    + 结合前两种方法，我们可以实现独立性和互通性
    ```javascript
    //假设我们有一个三人小组开发一个较复杂的页面
    //组长 => 公共方法封装
    let utils = (function () {
      let isWindow = true;
      let code = 'xx';

      const handleClick = function handleClick () {};

      return{
        handleClick
      };
    })();

    //组员 A
    let searchModal = (function () {
      let isWindow = true;
      let code = 'xx';

      const handleSearch = function handleSearch () {
        utils.handleClick(); //调用公共方法
       };
      return{
        handleSearch
      };
    })();

    //组员 B
    let infModal = (function () {
      let isWindow = true;
      let code = 'xx';

      const handleSearch = function handleSearch () {
        utils.handleClick(); //调用公共方法
       };
      return{
        handleSearch
      };
    })();
    ```
    + 自执行函数形成闭包，防止全局变量污染，实现模块**独立性**
    + 函数返回对象，可被其他私用上下文调用，实现模块**互通性**
