# Promise (2)
```javascript
let p1 = new Promise((resolve, reject) => {
    reject(10);
});
let p2 = p1.then(result => {
    console.log('成功 ->', result);
}, reason => {
    console.log('失败 ->', reason);
    return 20;
});
p2.then(result => {
    console.log('成功 ->', result);
}, reason => {
    console.log('失败 ->', reason);
});

// 失败 -> 10
// 成功 -> 20
```
+ p1.then 返回的也是 Promise 实例
    + 只要函数执行成功，p2 的状态都是 fulfilled
    + 值为函数执行返回的值 
    + 如果返回一个新的 Promise 实例，p2 的状态和结果就和返回的实例一样
```javascript
let p1 = Promise.resolve('OK');
let p2 = p1.then(result => {
    console.log('成功 ->', result);
    return Promise.reject('NO');
}, reason => {
    console.log('失败 ->', reason);
});
p2.then(result => {
    console.log('成功 ->', result);
}, reason => {
    console.log('失败 ->', reason);
});

// 成功 -> OK
// 失败 -> NO
```
+ 对于失败的 Promise 实例，如果没有编写方法处理其结果，则会报错
+ 在 .then 注入方法的时候，如果其中某个方法没有传递，则会顺延到下一个 then 中具备相同状态需要执行的函数
```javascript
Promise.reject('NO').then(result => {
    console.log('222');
}); // 报错
Promise.reject('NO')
    .then(result => {
        console.log('222');
    }, /*自动补全类似 -> reason => {return Promise.reject(reason)}*/)
    .then(null, reason => { console.log(reason) });
Promise.resolve('OK')
    .then(null/* reason => {return reason} */, reason => { console.log(reason) })
    .then(result => {console.log(result)});
// 所以 .then 方法可以顺延
// .catch -> 失败时进行 -> 一般放在 .then 链后面
```

### 同时处理多个 Promise 实例
+ Promise.all: 等待所有 Promise 实例都成功，整体返回的状态才是成功，只要有一个失败，整体状态就是失败
    + 有一个失败的，则立即结束处理
+ Promise.race: 看多个实例谁先处理完，先处理完成的状态就是最后的整体的状态