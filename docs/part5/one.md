# Promise (1)
### Promise -> ES6 新增的一个内置的类
```javascript
let p1 = new Promise(() => {
    console.log(1)
});
console.log(2);
// -> 1 2
```
+ new Promise
    + 立即执行传递的 executor 函数（一般管控一个异步操作）
    + 传递给 executor 函数两个参数 resolve reject，这两个参数都是函数
    + 创建 Promise 实例 -> p1
        + promise状态 -> [[PromiseState]] -> pending fulfilled/resolved rejected
        + promise值 -> [[PromiseResult]]: undefined -> 默认 undefined -> 存储成功结果或者失败原因
        + p1.__proto__ -> Promise.prototype: then/catch/finally
```javascript
let p1 = new Promise(function (resolve, reject) {
    //resolve(100);
    // 执行 resolve 控制实例状态变为成功，传递的值（100）是成功的结果
    // -> [[PromiseState]]:fulfilled  [[PromiseResult]]:100

    // reject(0);
    // 执行 reject 控制实例状态变为失败
    // -> [[PromiseState]]:rejected  [[PromiseResult]]:0

    // 如果 executor 执行报错，状态会变为 rejected，promise值为报错原因

    // 一旦状态从 pending 改变，之后都无法被再次改变
})
p1.then(result => {
    // 状态变为 fulfilled 此函数执行 result -> [[PromiseResult]]
}, reason => {
    // 状态变为 rejected 此函数执行 reason -> [[PromiseResult]]
})
```

### resolve reject 的异步性
```javascript
let p1 = new Promise((resolve, reject) => {
    console.log(1);
    resolve('OK');
    console.log(2);
});
p1.then(result => {
    console.log('成功->', result);
}, reason => {
    console.log('失败->', reason);
});
console.log(3);
// output -> 1 2 3 成功-> OK
```
+ resolve reject 会立即修改状态和值，但**通知.then里的方法执行**这个操作本身是异步的，需要等待同步操作完成后再执行。
