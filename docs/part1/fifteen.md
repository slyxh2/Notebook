# 闭包进阶应用（4）-compose 组合函数（面试题）
```javascript
const add1 = (x) => x + 1;
const mul3 = (x) => x * 3;
const div2 = (x) => x / 2;
div2(mul3(add1(add1(0)))); //=>3
//可读性太差，请构建一个 compose 函数达到如下效果
const operate = compose(div2, mul3, add1, add1);
console.log(operate(0)); // 3
console.log(operate(2)); // 6
console.log(compose()(10)); //10
console.log(compose(div2)(10)); //5

function compose(...args) {
  if (args.length === 0) {
    return function (x) {
      return x;
    }
  }
  if (args.length === 1) {
    return args[0];
  }
  return function (x) {
    let newFun = args.reduceRight(function (result, item) {
      return item(result);
    }, x)
    return newFun;
  }
}


```