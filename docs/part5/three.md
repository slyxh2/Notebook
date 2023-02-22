# 同步异步编程
### 进程 & 线程
+ 进程：程序（浏览器打开一个页面，就会开辟一个进程）
+ 线程：处理任务，一个线程同时只能处理一个任务


- 浏览器是多线程的
    + HTTP 网络线程：用于资源文件的加载
    + GUI 渲染线程：用于页面自上而下渲染，最后绘制出页面
    + JS 渲染线程：专门用于渲染 JS 代码
    + ......

### EventLoop 事件循环机制
+ EventQueue（事件队列） -> 优先级队列
    + 浏览器加载页面，就会创建一个事件队列，用来存储等待执行的任务

+ 事件循环机制
    - **当同步任务都执行完，主线程空闲下来后**，才会看事件队列中是否存在等待的任务，如果存在，按照顺序，依次把等待的任务拿出来，**放到栈内存中，让主线程去执行**
    - 先查找微任务队列（microtask），一般按照存放顺序执行
    - 微任务队列中没有，再找宏任务队列，一般按照谁先到达执行的条件，就把谁拿出来执行

+ 浏览器对定时器的处理（setTimeout）
    - 放置到事件队列中，之后浏览器会开辟一个新的线程 -> **监听线程**
    - **当同步任务没执行完成，或者主线程还没有空闲下来**，有异步任务符合执行条件（计时器到达时间），也不会执行

+ 宏任务：
    - 定时器
    - 事件绑定
    - AJAX/FETCH 等创建的网络请求
+ 微任务
    - Promise：then/resolve（reject）通知注册的方法执行
    - async await


### async await （ES7 新增修饰符）：generator的语法糖
+ async -> 让一个函数返回一个 Promise 实例，默认都是 fulfilled 状态，**除非自己返回一个 Promise 实例**
+ await -> 使异步等编程模拟出同步的效果
    - await 后面一般会放置一个 Promise 实例（其他正常值也可以）
    - 等待 Promise 状态为成功后，获取成功的结果，并且执行函数体中 await 下面的代码
    - **await 跟着的内容会立即执行，但 await 下边的代码会被当作微任务放到任务队列里**
    - 当返回的 Promise 的实例为 rejected 时，后边代码都不执行 -> 解决：try catch
```javascript
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function () {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
});
console.log('script end');

//script start  async1 start  async2  promise1  script end  async1 end  promise2  setTimeout
```
