# 浅拷贝和深拷贝

### 对象的浅拷贝
```javascript
let obj = {
    name: 'patrick',
    course: {
        c1: 'chinese',
        c2: 'math'
    }
}
let newObj = obj; //指向同一个堆内存
// 拷贝1:循环遍历(浅拷贝) -> 只拷贝第一级内容，后面还是公用堆内存
let obj1 = {}
let key = [
    ...Object.getOwnPropertyNames(obj),
    ...Object.getOwnPropertySymbols(obj)
];
key.forEach(item => {
    obj1[item] = obj[item];
})
// 拷贝2(浅拷贝)
let obj2 = {
    ...obj1
}
// 拷贝3(浅拷贝)
// Object.assign(obj1,obj2) -> 返回的结果是 obj1 的堆内存，只是把 obj2 中的键值对和原始 obj 1 的键值对合并在一起
// let obj3 = Object.assign(obj1, {});// obj3 === obj1
let obj3 = Object.assign({}, obj);
```

### 数组的浅拷贝
```javascript
let arr = [10, 20, [30, 40]];

// 拷贝1:循环 forEach/map/reduce/...
let arr1 = [];
arr.forEach((item, index) => {
    arr1[index] = item;
})
// 拷贝2:展开运算符 Object.assign
// 拷贝3: 基于 slice/concat ...
let arr3 = arr.slice();
```

### 深拷贝
```javascript
let obj = {
    name: 'patrick',
    course: {
        c1: 'chinese',
        c2: 'math'
    }
}
//深拷贝1
// JSON.stringify -> 把对象/数组转为字符串
// JSON.parse -> 把字符串再转为对象
let obj1 = JSON.parse(JSON.stringify(obj));
// 问题
//  + 正则对象会被处理为空对象 -> stringify 不支持
//  + 函数/Symbol/undefined 会直接被干掉
//  + BigInt 处理不了
//  + 日期对象最后还是字符串
```
### 手写浅拷贝和深拷贝和对象深合并
```javascript
function getKeyAry(obj) {
    let ary = [
        ...Object.keys(obj),
        ...Object.getOwnPropertySymbols(obj)
    ];
    return ary
}
function toType(obj) {
    if (obj == null) return obj + '';
    if (obj[Symbol.toStringTag]) {
        return obj[Symbol.toStringTag].toLowerCase()
    } else {
        return obj.constructor.name.toLowerCase();
    }
}
function shallowCopy(obj) {
    let type = toType(obj);
    if (/^(number|string|bigint|boolean|null|undefined|symbol)$/.test(type)) return obj;
    if (/^function$/.test(type)) {
        return function proxy() {
            return obj();
        }
    }
    if (/^(date|regexp)$/.test(type)) return new obj.constructor(obj);

    // 处理对象 数组
    let keys = getKeyAry(obj)
    target = {}; // object nodelist ....
    if (/^array$/.test(obj)) {
        target = [];
    }
    keys.forEach(key => {
        target[key] = obj[key];
    })
    return target;
}
function deepCopy(obj, cache = new Set()) {
    let type = toType(obj);
    // 非 object array 直接浅拷贝即可
    if (!/^(object|array)$/.test(type)) return shallowCopy(obj);
    // 避免死递归
    if (cache.has(obj)) return shallowCopy(obj);
    cache.add(obj);

    let keys = getKeyAry(obj),
        target = {};
    if (/^(array)$/.test(type)) {
        target = [];
    }
    keys.forEach(key => {
        target[key] = deepCopy(obj[key], cache);
    })
    return target
}
// 对象合并
function merge(obj1, obj2) {
    if (toType(obj1) !== 'object') return obj2;
    if (toType(obj2) !== 'object') return obj1;
    let keys = [
        ...Object.keys(obj2),
        ...Object.getOwnPropertySymbols(obj2)
    ];
    keys.forEach(key => {
        obj1[key] = merge(obj1[key], obj2[key]);
    })

    return obj1;
}
```
