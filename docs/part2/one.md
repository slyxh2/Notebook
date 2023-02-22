# JS 中自定义类的创建

## 构造函数
+ 函数执行的时候基于 new 执行
    1. 构造函数执行，最开始会和普通函数一样，形成私有上下文
    2. 创建上下文后，浏览器会再创建一个**实例对象**
    3. 初始化 this 的时候，**让 this 指向当前实例对象**
    4. 在代码执行完成后，返回时：
        + 若不返回，则**默认返回实例对象**
        + 若返回基本数据类型值或不返回，**浏览器会把实例对象返回**
        + 若返回引用数据类型值，**则返回该引用类型值**
```javascript
function fn(x, y) {
    let total = x + y;
    this.x = x;
    this.y = y;
    return total;
}
let f1 = fn(10, 20);
console.log(f1); // => 30
let f2 = new fn(10, 20);
console.log(f2); // {x:10, y:20}
```
### 检测一个属性是否为当前对象成员
+ 属性名 in 对象 => 公有属性和私有属性都返回 true
+ 对象.hasOwnProperty => 只有私有属性，才返回 true

```javascript
function fn(x, y) {
    let total = x + y;
    this.x = x;
    this.y = y;
    return total;
}
let f1 = new fn(10, 20);
// toString 为对象的公共属性
console.log('x' in f1);// true
console.log('toString' in f1);// true
console.log('total' in f1);// false

console.log(f1.hasOwnProperty('x')); // true
console.log(f1.hasOwnProperty('toString'));// false
console.log(f1.hasOwnProperty('total'));// false
```

假设我们现在需要检测一个对象的属性是否为公共属性，利用以上两个语法糖就很方便
```javascript
function fn(x, y) {
    let total = x + y;
    this.x = x;
    this.y = y;
    return total;
}
let f1 = new fn(10, 20);

console.log(hasPubProperty(f1, 'x'));
console.log(hasPubProperty(f1, 'toString'));
console.log(hasPubProperty(f1, 'total'));

function hasPubProperty(obj, name) {
    return name in obj && !obj.hasOwnProperty(name);
}
```
### for in 的一些问题
+ 基于 for in 循环遍历对象
    + 优先遍历数字属性
    + 不会遍历 symbol 属性
    + 会把自己扩展的公共属性也遍历到
```javascript
Object.prototype.AAA = 'AAA';
let obj = {
    name: 'patrick',
    age: 22,
    0: 100,
    [Symbol('AA')]: 200,
    [Symbol.toPrimitive]: function () {
        return 0;
    }
};
for (key in obj) {
    console.log(key);
}
// 0 name age AAA
// AAA 是公共属性，也被遍历到
for (key in obj) {
    // 若不是私有属性 break
    if (!obj.hasOwnProperty(key)) break;
    console.log(key);
}
// 0 name age

// 但我们还没有获取到 symbol 的属性
// => Object.getOwnPropertySymbols(obj) 可以获取对象所有私有 symbol 属性

let keys = [
    ...Object.keys(obj),
    ...Object.getOwnPropertySymbols(obj)
];
console.log(keys); // => ['0', 'name', 'age', Symbol(AA), Symbol(Symbol.toPrimitive)]

keys.forEach(item => {
    console.log(`属性名为${String(item)}, 属性值为${obj[item]}`)
})
// 可以依次获取到 obj 的私有属性
// symbol 没法隐式转换为 string，所以把所有属性名手动转为字符串即可
```
