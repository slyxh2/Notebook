# 基本数据类型
## JS中的数据类型
### JS 数据类型共有 7 种基本数据类型， 2 种引用数据类型
* 基本数据类型(值类型，原始类型)
    * number
        * NaN
        * Infinity
    * string
    * boolean
    * null
    * undefined
    * symbol
        * static Symbol
        * Symbol.prototype
    * bigint

+ 引用数据类型
    + object
        + 普通对象
        + 数组对象
        + 正则对象
        + 日期对象
        + JSON对象
        + Set
        + Map
        + ...
    + function
        + 普通函数
        + 构造函数
        + 箭头函数
        + 生成器函数
        + ...
#### ECMAScript 并没有规定 function 属于一种引用类型，但 function 的二进制码与 object 并不相同，所以在此也把 function 列为一种数据类型。
### NaN
1. NaN 和任何数据都不相等
```javascript
NaN === NaN // false
```
2. 检测有效数字用`isNaN()`
### Symbol
1. 创造 Symbol() 是唯一值
```javascript
console.log(Symbol() === Symbol()) // false

let symb = Symbol()
console.log(symb === symb) // true
```
2. 可以用来给对象唯一的属性
3. 在 vuex/redux 中做行为派发，统一管理派发的行为标志

### bigint
```javascript
Number.MAX_SAFE_INTEGER //9007199254740991
Number.MIN_SAFE_INTEGER //-9007199254740991

//在数字后加 n 为 bigint
9007199254740991n + 1n // 9007199254740992n
typeof 9007199254740992n // bigint
```
### typeof 检测数据类型局限性
1. 检测 null 不准确
```javascript
typeof null // 输出为 "object"
```
2. 不能细分对象
```javascript
typeof {} // 输出为 "object"
typeof [] // 输出为 "object"
typeof /^$/ // 输出为 "object"
```
typeof 的原理：检测二进制的值，所有对象都是以 000 开始的，无法细分对线。null -> 000000，所以 `typeof null` 为 `object`


        