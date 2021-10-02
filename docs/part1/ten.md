# JS 中的变量提升中的难题

之前遇到变量提升问题总是凭感觉，系统学习一下后感觉好好分析一下还是不难，这里总结了几道我觉得比较难的题。

**值得注意的是，新旧版本浏览器对变量提升，块级作用域的处理是完全不同的，学习时应注意**

+ 变量提升：在**当前上下文**中（全局/私有/块级），JS 代码**自上而下**执行之前，浏览器会提前处理一些事情（可以理解为此法解析的一个环节，词法解析一定发生在代码执行之前）
    ```javascript
    if(!('a' in window)){
      var a = 1;
      function func(){
        console.log('This is a function')
      }
    }
    console.log(a); // => undefined
    console.log(func()); // => undefined
    // 新版本浏览器（IE10之后）：
    // 无论条件判断是否成立，var/function 都要变量提升，都只声明，所以两个输出都是 undefined
    // 旧版本浏览器：
    // function 会声明并定义
    ```
    ```javascript
    fn();
    function fn(){
      console.log(1);
    };
    fn();
    function fn(){
      console.log(2);
    };
    fn();
    var fn = function{
      console.log(3);
    };
    fn();
    function fn(){
      console.log(4);
    };
    fn();
    function fn(){
      console.log(5);
    };
    fn();
    //最开始变量提升，从上至下
    // fn => console.log(1) => console.log(2)
    // var fn = ...  fn 之前已经声明过了，不再重复声明
    // => 3 => 4 => 5
    // 代码执行 输出 5 5 5之后 var fn 变量提升没有执行过，要重新赋值 fn => 3
    // 此题最终输出为 5 5 5 3 3 3
    ```
    ```javascript
    var a = 1;
    function fn(){
      if(!a){
        var a = 10; //变量提升在当前上下文，所以输出 10
      }
      console.log(a);
    }
    fn(); // => 10
    ```
+ 新版浏览器机制：
    + 在**当前上下文中**，出现在**非函数对象**的大括号中的 function 只**声明不定义**
    + 如果大括号中出线了 function/let/const 等关键字，则会形成一个全新的块级私有上下文
    + **变态机制**：创建全新的块级上下文后，对块级上下文中的操作都要**映射给全局一份**，但之后对此变量的操作则在私有上下文中


    一个例子：
    ```javascript
    {
    function foo() {}
    foo = 1;
    }
    console.log(foo); // => ƒ foo() {}
    ```
    1. 变量提升，在**全局上下文**声明 foo，但不定义
    2. 代码执行，遇到代码块里的 function foo，创建一个全新的**块级上下文**，声明并定义 foo
    3. 如之前所说的**变态机制**，要把对 foo 所有操作映射到全局，所以第一步**在全局上下文中**声明的 foo 被定义到**块级上下文**中 foo 所关联的函数
    4. `foo = 1` 在**块级上下文中**对 foo 重新赋值，与**全局上下文无直接关联**
    5. 最后输出全局下的 foo，应为对应函数

    ```javascript
    {
    function foo() {}
    foo = 1;
    function foo() {}
    foo = 2;
    }
    console.log(foo); // => 1
    //到第二次声明 foo 时，也要映射之前的操作，所以全局的 foo 为 1
    ```

