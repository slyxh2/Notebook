# 栈 队列
### 栈 -> 后入先出
```javascript
function Stack() {
    this.items = [];
    Stack.prototype.push = function push(element) {
        return this.items.push(element);
    };
    Stack.prototype.pop = function pop() {
        return this.items.pop();
    };
    Stack.prototype.peek = function peek() {
        if (this.items.length > 0) return this.items[this.items.length - 1];
        return null;
    };
    Stack.prototype.isEmpty = function isEmpty() {
        return this.items.length === 0;
    };
    Stack.prototype.size = function size() {
        return this.items.length;
    };
    Stack.prototype.toString = function toString() {
        let i = 0,
            str = '';
        for (; i < this.items.length; i++) {
            str += this.items[i] + (i === this.items.length - 1 ? '' : ' ');
        }
        return str
    };
}
```

### 队列 -> 先入先出
+ 基于链表封装性能会高点 -> 出队列是从头出，若基于数组删除第一项，后面全要重新变动
```javascript
function Queue() {
    this.item = [];
    Queue.prototype.enqueue = function enqueue(element) {
        return this.items.push(element);
    };
    Queue.prototype.delqueue = function delqueue() {
        return this.items.shift();
    };
    Queue.prototype.front = function front() {
        if (this.items.length > 0) return this.items[0];
        return null;
    };
    Queue.prototype.isEmpty = function isEmpty() {
        return this.items.length === 0;
    };
    Queue.prototype.size = function size() {
        return this.items.length;
    };
    Queue.prototype.toString = function toString() {
        let i = 0,
            str = '';
        for (; i < this.items.length; i++) {
            str += this.items[i] + (i === this.items.length - 1 ? '' : ' ');
        }
        return str
    };
}
```
+ 应用：击鼓传花游戏
```javascript
function passGame(gameList, num) {
    let queue = new Queue(),
        count = 0;
    gameList.forEach(item => {
        queue.enqueue(item);
    });
    while (queue.size() > 1) {
        count++;
        if (count === num) {
            queue.delqueue();
            count = 0;
        } else {
            queue.enqueue(queue.delqueue());
        }
    }
    return queue.front();
}
let nameList = ['a', 'b', 'c', 'd', 'e'];
console.log(passGame(nameList, 3)); // -> d
```

### 优先级队列 -> 插入元素时和其他数据进行比较，得出元素在队列中正确位置
```javascript
function priorityQueue() {
    Queue.call(this);
    priorityQueue.prototype.__proto__ = Queue.prototype;
    function priorityElement(element, priority) {
        this.element = element;
        this.priority = priority;
    }
    priorityQueue.prototype.enqueue = function enqueue(element, priority) {
        let el = new priorityElement(element, priority);
        if (this.isEmpty()) {
            return this.items.push(el);
        }
        let i = 0;
        for (; i < this.items.length; i++) {
            if (el.priority < this.items[i].priority) {
                return this.items.splice(i, 0, el);
            }
        }
        return this.items.push(el);

    };
    priorityQueue.prototype.toString = function toString() {
        let i = 0,
            str = '';
        for (; i < this.items.length; i++) {
            str += this.items[i].element
                + '-'
                + this.items[i].priority
                + (i === this.items.length - 1 ? '' : ' ');
        }
        return str;

    };
}
}
```