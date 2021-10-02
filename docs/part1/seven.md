# 全面分析 let 和 var 和 const

+ JS中声明变量
    + 传统：var function
    + ES6：let const import

+ **let vs const**
    + let 声明一个变量，变量存储可以改值
    + const 声明的变量，一旦赋值，则不能再和其他值关联（**不允许指针重新指向**）
    ```javascript
    const obj = {
      name: 'Patrick'
    };
    obj.name = 'Tom';
    console.log(obj.name) // => Tom
    //只是指针不能重新指向，可以改变原指针指向的数据
    ```
    + 很多人认为，const 声明的是一个常量，let 声明的是一个变量。**这句话是不正确的，常量是具体的值，const 声明的还是变量！**

+ **let vs var**
    + var 存在变量提升，let 不存在
        + **变量提升**：在当前上下文，代码执行之前，会把所有带 var/function 关键字的进行提前声明或定义
            + var -> 只是提前声明
            + function -> 提前声明 + 定义
        ```javascript
        console.log(a); // => undefined  a 被提前声明，但没有定义
        console.log(b); // => 报错 因为 let 没有变量提升
        var a = 1;
        let b = 2;
        ```
    + **全局上下文中**，基于 var 声明的变量，也相当于给 GO（全局对象 window）新增一个属性，并且任何一个值的改变，另一个也会跟着变化（**映射机制**）；基于 let 声明的变量，和 GO 没有关系，只是全局变量
    ```javascript
    var a = 1;
    let b = 2;
    console.log(window.a); // => 1
    console.log(window.b); // => undefined 
    ```
    + 在相同的上下文中，**let 不允许重复声明**；**var 很松散，重复声明无所谓**，同样的变量浏览器只会声明一次
    ```javascript
    console.log('代码执行');
    var n = 1;
    let n = 2;
    //代码不会被执行，浏览器会直接报错
    //代码执行之前，浏览器会进行词法分析，发现let const重复定义后，不会执行代码
    ```
    + 暂时性死区 -> 浏览器暂存的 BUG
    ```javascript
    console.log(typeof(a)); // => undefined
    ```
    + let/const/function 会产生块级私有上下文，而 var 不会
        + 上下文（作用域）：
            + **全局作用域**
            + 函数执行形成的"**私有上下文**"
            + 块级作用域（**块级上下文**）
                + 除了对象/函数的大括号以外（if， for， 代码块）都可能产生块级上下文
              ```javascript
              {
                var n = 12;
                let m = 13;
                console.log(n);// 12
                console.log(m); //13
              }
              console.log(n); // 12
              console.log(m); // m is not defined
              // n 是全局上下文的；m 是代码块所代表的的块级上下文私有的
              ```
    

