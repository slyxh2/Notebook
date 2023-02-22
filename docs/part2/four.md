# 继承
1. 原型继承
```javascript
function Parent () {
    this.x = 100;
}
Parent.prototype.getX = function getX () {
    return this.x;
}
function Child () {
    this.y = 200;
}
Child.prototype = new Parent; //原型继承
Child.prototype.getY = function getY () {
    return this.y;
}
let c1 = new Child;
```
+ 父类中私有和公有的属性方法，最终都变为子类实例公有的
+ 和其他语言不同，JS 原型继承不会把父类的属性方法拷贝给子类，而是基于原型链查找指向

2. call 继承（只能继承父类中私有的，不能继承父类中公共的）
```javascript
function Parent () {
    this.x = 100;
}
Parent.prototype.getX = function getX () {
    return this.x;
}
function Child () {
    Parent.call(this); // call 继承
    this.y = 200;
}
Child.prototype.getY = function getY () {
    return this.y;
}
let c1 = new Child;
```

3. 寄生组合式继承
```javascript
function Parent () {
    this.x = 100;
}
Parent.prototype.getX = function getX () {
    return this.x;
}
function Child () {
    Parent.call(this); // call 继承
    this.y = 200;
}
Child.prototype.__proto__ = Parent.prototype; // 公共方法继承
// IE 不支持 __proto__
Child.prototype = Object.create(Parent.prototype); //IE下的继承
Child.constructor = Child; //补全 constructor

Child.prototype.getY = function getY () {
    return this.y;
}
let c1 = new Child;
```

4. ES6 class 继承
```javascript
class parent {
    constructor() {
        this.x = 100
    }
    getX() {
        return this.x;
    }
}
class child extends parent {
    constructor() {
        super();
        this.y = 200;
    }
    getY() {
        return this.y;
    }
}
let c1 = new child;
console.log(c1);
```