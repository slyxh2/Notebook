# 四大数据类型检测底层机制

1. typeof
    + 返回结果是一个字符串，字符串中包含了对应的数据类型"number/string/boolean/undefined/symbol/bigint/object/function"
    + typeof null => "object" => 原理：按照计算机底层存储的二进制结果来检测，对象都是以 000... 开始的 => **无法细分普通对象还是数组等对象**
2. instancof
    + 用来检测当前实例是否属于这个类，不是来检测数据类型的
    + 一般只应用于普通对象/数组对象/正则对象/日期对象的具体细分
    ```javascript
    let arr = [];
    console.log(arr instanceof Array); //true
    console.log(arr instanceof Object); //true true不能证明arr就是普通对象
    console.log(arr instanceof RegExp); //false
    ```
    + 不能应用于原始值类型
    ```javascript
    let n = 10;
    let m = Number(10);
    console.log(n instanceof Number); // false
    console.log(m instanceof Number); //true
    ```
    + 小问题
    ```javascript
    function person(){}
    person.prototype = Array.prototype;
    let p1 = new person;
    console.log(p1 instanceof Array); // true
    ```
    + 原理
    ```javascript
    let arr = [];
    console.log(arr instanceof Array);
    console.log(Array[Symbol.hasInstance](arr));//instanceof 底层处理
    // Symbol.hasInstance 在 Function.prototype 上
    // 基于 __proto__ 向上查找，看有没有类的 prototype
    let obj = {};
    console.log(arr instanceof obj); //报错 只有函数能调用 Symbol.hasInstance
    ```
3. constructor
    + 一样不是用来数据类型检测的，原本就是获取实例的构造函数 => 比 instanceof 好用
    ```javascript
    let arr = [];
    console.log(arr.constructor === Array); // true
    console.log(arr.constructor === Object); // false
    console.log(arr.constructor === RegExp); // false
    ```
    + 重定向会和 instanceof 一样有问题
    ```javascript
    let arr = [];
    function person(){}
    person.prototype = Array.prototype;
    let p1 = new person;
    console.log(p1.constructor === Array)
    ```
    + 基本类型值可以使用
    ```javascript
    let n = 10;
    let m = Number(10);
    console.log(n.constructor ===Number); // true
    console.log(m.constructor === Number); //true
    ```
4. Object.prototype.toString.call([value])
    + 专门用来检测数据类型的（强大且暴力！基本零瑕疵）
    + 返回结果[object, 对象[Symbol.toStringTag]||对象.构造函数（不受自己更改影响）||Object]
    + 非内置类
    ```javascript
    class person {
        get[Symbol.toStringTag](){
            return 'person'
        }
    }
    let p1 = new person;
    console.log(Object.prototype.toString.call(p1)); // [object person]
    ```
### 重写 instanceof
```javascript
function instance_of(test, origin) {
    if (test == null || !/^(object|function)$/i.test(typeof test)) return false;
    if (typeof origin !== 'function') {
        throw new TypeError("Right-hand side of 'instance_of' is not an object");
    }
    let proto = test.__proto__,
        prototype = origin.prototype
    while (true) {
        if (proto === prototype) return true;
        proto = proto.__proto__;
        if (proto == null) return false;
    }
}
```

### 实现类似 Object.prototype.toString.call([value])
```javascript
function toType(obj) {
    //完成你的代码
    if (obj[Symbol.toStringTag]) {
        return obj[Symbol.toStringTag].toLowerCase();
    } else {
        return obj.constructor.name.toLowerCase();
    }
}
console.log(toType(1)); //=>"number"
console.log(toType(NaN)); //=>"number"
console.log(toType([])); //=>"array"
console.log(toType(/^\d+$/)); //=>"regexp"
console.log(toType({})); //=>"object"
```