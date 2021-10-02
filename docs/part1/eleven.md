# JS 函数中的 arguments 以及匿名函数具名化的问题
```javascript
var a = 4;
function b(x, y, a) {
    console.log(a);
    arguments[2] = 10;
    console.log(a);
}
a = b(1, 2, 3);
console.log(a);
//arguments 是一个类数组集合
//以上例子中:
arguments:{
  0:1,
  1:2,
  2:3,
  length:3,
  callee:function b(){...}//当前函数
}
```

+ arguments 在函数中的机制
    + **在非严格模式下**，当**初始化 arguments 和形参赋值**完成后，会给两者建立一个映射机制，集合中的每一相和对应的变量绑定在一起，一个修改都会修改，类似双向绑定。
    + **在非严格模式下**，没有映射机制，也没有 arguments.callee，箭头函数没有 arguments

```javascript
function fn(x, y, z){
  x = 100;
  console.log(x);

  y = 200;
  console.log(y);

  z = 300;
  console.log(z);
}
fn(1, 2);
//映射机制只发生在形参赋值完成之后，z 没有映射
// => 100 200 undefined
```


arguments.callee 可以方便匿名函数递归，比如:
```javascript
let obj = {
  name: 'patrick',
  fn : function(){
    //如果想调用此函数本身：
    arguments.callee();//在此可以实现调用此匿名函数
    obj.fn(); //但也同样可以直接通过成员访问方式实现递归
  }
}
(function (i) {
  if (i > 3) return;
  console.log(i);
  i++;
  arguments.callee(i); //如果是自执行函数，就无法像上个例子一样直接调用了。
})(1)
```

但在实际项目中，一般采取**匿名函数具名化**的方式实现匿名函数的递归
```javascript

(function fn (i) {
  if (i > 3) return;
  console.log(i);
  i++;
  fn(i); 
})(1)
// 直接给匿名函数具名，也可以直接调用，但全局是无法调用此函数的：
fn();// => Uncaught ReferenceError: fn is not defined
```


