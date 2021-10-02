# JS 中 this 几种基本情况

+ this -> 函数的执行主体
    + 函数执行主体：谁把函数执行
    + 函数执行上下文：在哪执行的

+ 函数执行主体规律：
    1. 事件绑定：给当前元素的某个事件行为绑定方法，当事件触发，方法执行，方法中的 this 是**当前元素本身**
    2. 普通函数执行
        + 函数执行前面是否有"点"，没有点，this => window(严格模式下是 undefined)
        ```javascript
        function fn(){
          console.log(this);
        }
        fn(); // => window/undefined
        ```
        + 有"点"，"点"前面是谁 this 就是谁
        ```javascript
        let obj = {
          name: 'patrick',
          fn(){
            console.log(this);
          }
        };
        obj.fn(); // => obj
        ```
        + 匿名函数（自执行函数/回调函数）如果**没有特殊处理**，this => window(严格模式下是 undefined)
        ```javascript
        (function(){
          console.log(this); // => window/undefined
        })()
        ```
        ```javascript
        function fn1(callback){
          callback();
        }
        let obj = {
          name: 'patrick',
          fn2(){
            console.log(this);
          }
        };
        fn1(obj.fn2);// => window/undefined
        ```
        + 特殊处理
        ```javascript
        let obj = {
          name: patrick
        };
        let ary = [1, 2, 3, 4, 5];
        ary.forEach(function(item){
          console.log(this) // => obj
        }, obj)
        //触发回调函数的时候，forEach 内部会把回调函数中的 this 改变为传递的第二个参数（obj）
        ```
        + 括号表达式情况
        ```javascript
        let obj = {
          fn(){
            console.log(this);
          }
        }
        obj.fn(); // => obj
        //括号表达式中只有一项，和不加没本质区别
        (obj.fn())(); // => obj
        //括号表达式有多项时，只取最后一项。
        //括号表达式相当于整体执行，相当于前面没有"点"，所以下方输出为 window
        (10, obj.fn())() // =>window/undefined
        ```

+ 全局上下文中的 this 是 window
+ 块级上下文中没有自己的 this，所用到的 this 都是所处上级上下文中的 this
```javascript
{
  let n = 12;
  console.log(this); // => window
}
```