# 彻底弄懂 JS 4 大数据类型转换
+ JS == 比较特殊点
    1. 类型相同比较
        + {} == {} => false 对象比较的是堆内存地址
        + [] == [] => false
        + NaN == NaN => false
    2. 类型不相同比较
        + null == undefined => true;  null === undefine => false
        + String == Object  把对象转为字符串
        + 其余如果两边数据类型不一样，都转为 Number 比较

+ 把其它数据类型转换为 Number 类型
    1. 特定需要转换为 Number 的
        + Number([])
        + parseInt/parseFloat([val])
            + 从字符串左侧第一个字符开始查找有效字符，遇到非有效数字字符停止，把找到的有效数字转为数字；parseFloat 多识别一个小数点
        ```javascript
        let ary = [10.18, 0, 10, 25, 23];
        ary = ary.map(parseInt);
        console.log(ary);
        // map 穿两个参数 第一个是 value 第二个是 index
        // parseInt(value, radix) 接受两个参数，第一个是值，第二个是把 value 看成几进制（2-36），是 0 默认为十进制
        // parseInt(10.18, 0)
        // parseInt(0, 1) => 没有 ‘一进制’ => NaN
        // parseInt(10, 2)
        // parseInt(25, 3) => 从左侧找出符合进制的数 5 > 3 不符合，后面即使有也不查找了 => 2
        // parseInt(23, 4)
        // => ary = [10, NaN, 2, 2, 11]
        ```
    2. 隐式转换（`Number()`）
        + isNaN([val])
        + 数学运算（特殊情况：+在出现字符串的情况下不是数学运算，是字符串拼接）
        + 在 == 比较的时候，有些值需要转换为数字再进行比较
        + ......
    ```javascript
    parseInt(''); // => NaN
    Number(''); // => 0
    isNaN(''); // => false Number('') => 0 0不是 NaN
    parseInt(null); // => NaN 没有有效数字
    isNaN(null); // => false    Number(null) => 0
    parseInt('12px'); // => 12
    Number('12px'); //=> NaN
    isNaN('12px'); // => true

    parseFloat('1.6px') + parseInt('1.8px') + typeof(parseInt(null));
    // => 1.6 + 1 + 'number' => '2.6number'

    isNaN(Number(!!Number(parseInt(0.8))));
    // parseInt(0.8) => 0
    // !!0 => false
    // Number(false) => 0
    // isNaN(0) => false

    typeof(!parseInt(null)) + !isNaN(null);
    // !NaN => true
    // typeof(true) => 'boolean'
    // !isNaN(null) => true
    // => 'boolentrue'
    ```
+ 把其它类型转换为字符串
    1. 方法
        + toString()
        + String()
    2. 隐式转换(一般都是调用其 toString)
        + 加号运算，某一边为字符串，则是字符串拼接
        + 把对象转为数字，先转为字符串，再去转为数字
        + alert/confirm/prompt... 都是先把内容转为字符串，再输出
```javascript
let obj = {
  name: 'patrick'
};
console.log(obj.toString()); // => "[object Object]"
//对象调取的是 Object.prototype.toString => 用于数据监测
//这里要注意 数组 有自己的 toString 方法，所以 String([]) = ''
alert(obj); // => "[object Object]"
```
```javascript
let string = 10 + false + undefined + [] + 'CSDN' + null + true + {};
console.log(string);
// 特别长的拼接问题 => 从左到右依次分析
//1. 10 + false => 把 false 转为 number，Number(false)=0 => 10 + 0 = 10
//2. 10 + undefined => Number(undefined) =NaN => 10 + NaN = NaN
//3. NaN + [] => 两边都转为 string => 'NaN'
//4. 字符串拼接都要把其它数据类型转为字符串再拼接
// => 'NaN' + 'CSDN' + null + true = 'NaNCSDNnulltrue'
// 5. 上个例子说过，任何对象转为对象的隐式转换都为 '[object Object]'
// 最终结果 => 'NaNCSDNnulltrue[object Object]'
```
```javascript
console.log({} + 0); // => 0
console.log(0 + {}); // => "0[object Object]"

//{} 在左边时被看作代码块，不参加运算
```
+ 把其它类型转换为布尔
    1. 基于以下方式可以把其它数据类型转换为布尔
        + ! 转换为布尔值后取反
        + !! 转换为布尔值
        + Boolean()
    2. 隐式转换
        + 在循环或者条件判断中，条件处理的结果就是布尔类型值
    3. **只有 "0 NaN null undefined 空字符串"转为布尔值是 false，其它都是 true**

```javascript
console.log([] == false); // => true
// Object == Boolean 两边类型不一样，要转换为数字比较
// Object -> Number: 先转换为 String,再转换为 Number
// String([]) => ''; Number('') => 0
// false -> 0; true -> 1
// 所以0 == 0 => true
console.log(![] == true); // => false
// ![] 为 Boolean 类型 => false
// false == true     => false
```
  