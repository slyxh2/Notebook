# 闭包进阶应用（3）-重写 reduce；柯里化函数思想；两道面试题

```javascript
let arr = [10, 20, 30, 40];
let result = reduce(arr, (result, item, index) => {
  return result + item;
})
console.log(result); // => 100
//如何重构 reduce 函数，达到此例效果？？？
function reduce(arr, callback, initvalue) {
  let result = initvalue,
    i = 0;
  if (typeof result === 'undefined') {
    i = 1;
    result = arr[0];
  }
  for (; i < arr.length; i++) {
    result = callback(result, arr[i], i);
  }
  return result
}
```
+ 柯里化函数 => 预处理思想
    + 执行函数，形成一个闭包，把一些信息存储起来
    + 下级上下文调用闭包里的私有变量
```javascript
let res = fn(1,2)(3);
console.log(res); //=>6  1+2+3

function fn() {
  let outerArray = Array.from(arguments);
  return function () {
    innerArray = Array.from(arguments);
    let arr = outerArray.concat(innerArray);
    let result = arr.reduce(function (result, item) {
      return result + item;
    })
    return result
  }
}

//ES6 可以简化此函数 
const fn1 = (...outerArray) => {
  return (...innerArray) => {
    return outerArray.concat(innerArray).reduce((result, item) => {
      return result + item
    })
  }
}
// 进一步简化箭头函数
const fn2 = (...outerArray) => ((...innerArray) => (outerArray.concat(innerArray).reduce((result, item) => (result + item))))
```