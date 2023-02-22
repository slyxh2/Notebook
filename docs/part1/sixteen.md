# 闭包进阶应用（4）- 防抖和截流

## 函数的防抖 => 对于频繁触发某个操作，只识别一次

```HTML
<body>
    <button id='btn'>点我</button>

    <script>
        const btn = document.querySelector('#btn');
        btn.addEventListener('click', () => {
            console.log('点击');
        })
    </script>
</body>
```

假设我们有一个按钮，每次点击都会执行一次点击事件。如果用户频繁点击的话，会造成性能的浪费，甚至可能会让浏览器崩掉。**防抖可以让规定时间内的重复操作只执行一次**

```javascript
// func => 要执行的函数
// wait => 频繁设定的界限
//immediate => true为第一次 false为最后一次
const btn = document.querySelector('#btn');
btn.addEventListener('click', debounce(handleClick));
function handleClick(){
    console.log(this);
}
function debounce(func, wait = 300, immediate = false){
    let timer = null;
    return function (...params) {
        clearTimeout(timer);// 每次点击时，都把之前的定时器清空
        timer = setTimeout(() => {
            timer = null; //回归初始状态 保证下一轮点击 timer = null
            func.call(this, ...params);//把点击事件的 this 和传入的 arguments 给到函数
        }, wait);
    }
}
```

这样，每次点击时，**debounce 函数返回一个函数给点击事件事件调用。每次点击都清空之前的定时器，创造一个新的定时器，这样 wait 时间段内，多次点击只会刷新计时器，等点击结束，计时器时间结束，函数执行。**


接下来，我们考虑 immediate 参数的问题。
```javascript
//immediate 为 true 时，执行第一次触发的函数。false 则触发最后一次。
function debounce(func, wait = 300, immediate = false){
    let timer = null;
    return function (...params) {
        // 判断是否为第一次点击
        let nowFlag = immediate && !timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null; //回归初始状态
            // 若 immediate 为 false 不执行定时器里的函数
            !immediate ? func.call(this, ...params) : null;
        }, wait);
        // 若第一次点击 nowFlag 为 true，直接执行 func
        nowFlag ? func.call(this, ...params) : null;  
    }
}
// 一个简单的防抖函数就完成了
```

## 函数的节流 => 在一段频繁操作中，可以触发多次函数，但触发的频率由自己决定

```HTML
<body>
<div style="width: 100vw; height: 300vh; background-color:aqua"></div>

<script>
    window.addEventListener('scroll', () => {
        console.log('OK');
    })
</script>
</body>
```
假设我们需要对一个可以滚动的页面添加滚动事件。每一次滚动，浏览器有最快反应时间（5ms-7ms），触发频率太高。**节流函数可以被用来控制此频率**

```HTML
<body>
    <div style="width: 100vw; height: 300vh; background-color:aqua"></div>

    <script>
        window.addEventListener('scroll', throttle(handle));
        function handle(){
            console.log('OK');
        }
        function throttle(func, wait = 300){
            let timer = null,
                previous = 0 //记录上一次的时间
            return function (...params) {
                let now = new Date();
                let remain = wait - (now - previous); //距离触发函数还有多长时间
                if(remain <= 0){
                    // 每一次触发时，我们都要把定时器清空，并把 timer 置为 null，让其为初始状态
                    clearTimeout(timer);
                    timer = null;
                    // 这一次操作的时间作为下一次的 上一次（previous）的时间
                    previous = now;
                    // 执行目标函数
                    func.call(this, ...params);
                }else if(!timer){
                    timer = setTimeout(() => {
                        timer = null;
                        // 下一次的 previous 应为执行此函数时的时间，而不是 now
                        previous = new Date();
                        func.call(this, ...params);
                    }, remain)
                }
            }
        }
    </script>
</body>
```