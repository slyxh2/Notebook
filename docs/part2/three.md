# call apply bind
### 类数组转为数组（call apply）
+ arguments 是类数组，无法直接调用 Array.prototype 上的方法
```javascript
function mySum() {
    // 我们可以把 arguments 转为数组
    let ary = Array.prototype.slice.call(arguments);
    console.log(ary) // => [1, 2, 3, 4, 5]
    // 这样就可以调用数组的方法了
    let result = 0;
    // 也可以直接把数组原型链上的函数 this 改成 arguments
    // 大多数方法都可以这样被类数组调用
    Array.prototype.forEach.call(arguments, item => {
        result += item;
    });
    return result;
}
let sum = mySum(1, 2, 3, 4, 5);
console.log(sum); // => 15
```
### bind 不立即执行的应用
```javascript
let obj = {
    name: 'patrick',
    age: 12
}
function fn(x, y) {
    console.log(this, x, y);
}
window.onclick = fn; // this => window x => PointerEvent y => undefined
// 假设我们想让 fn 的 this 指向 obj，并传递参数
window.onclick = fn.call(obj, 10, 20);
// 调用 call 会立即执行，在事件未触发时，fn 已经被执行
window.onclick = fn.bind(obj, 10, 20);
// 调用 bind 解决此问题，bind 不会立即执行
```

### 重写 call
```javascript
Function.prototype.call = function call(context, ...params) {
    context = Object(context); // 把非引用类型值转为引用类型值
    let proxy = Symbol('fn'); // 用 Symbol 防止原对象属性重名
    context[proxy] = this;
    let result = context[proxy](...params);
    delete context[proxy];
    return result;
}
let obj = {
    name: 'patrick',
    age: 12
};
function fn(x, y) {
    console.log(this, x, y);
    return x + y;
};
fn.call(obj, 10, 20);
```

### 重写 bind
```javascript
Function.prototype.bind = function bind(context, ...params) {
    let that = this;
    return function proxy(...innerParams) {
        params.concat(innerParams);
        that.call(context, ...params);
    }
}
let obj = {
    name: 'patrick',
    age: 12
};
function fn(x, y) {
    console.log(this, x, y);
    return x + y;
};
window.onclick = fn.bind(obj, 10, 20);
```