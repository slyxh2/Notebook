# 链表
相对于数组：
+ 内存空间不是必须连续的，可以充分利用内存
+ 不必在创建时确定大些，大小可无限延伸
+ 在插入和删除数据时，时间复杂度可以达到 O(1)，相对数组效率高
缺点：
+ 访问任何一个位置的元素，都需要从头开始访问
+ 无法通过下标直接访问元素

### 单向链表
```javascript
function node(data) {
    this.data = data;
    this.next = null;
}
function linkedList() {
    this.head = null;
    this.length = 0;
    // append -> 链表末尾添加节点
    linkedList.prototype.append = function append(data) {
        var newNode = new node(data);
        if (this.length === 0) {
            this.head = newNode;
        } else {
            this.getLast().next = newNode;
        }
        this.length += 1;
    };
    // getLast -> 获取链表中最后一个节点
    linkedList.prototype.getLast = function getLast() {
        if (this.length === 0) return null;
        var current = this.head;
        while (current.next) {
            current = current.next;
        }
        return current;
    };
    // toString -> 转为字符串
    linkedList.prototype.toString = function toString() {
        if (this.length === 0) return null;
        var res = [],
            current = this.head;
        while (current) {
            res.push(current.data);
            current = current.next;
        };
        return res.join(',');
    };
    // get -> 获取某一项节点
    linkedList.prototype.get = function get(position) {
        if (position < 0 || position >= this.length) return null;
        var current = this.head;
        for (var i = 0; i < position; i++) {
            current = current.next;
        }
        return current;
    };
    // insert -> 插入节点
    linkedList.prototype.insert = function insert(position, data) {
        if (position < 0 || position > this.length) return false;
        var newNode = new node(data);
        if (position === 0) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            var current = this.get(position - 1);
            newNode.next = current.next;
            current.next = newNode;
        }
        this.length += 1;
        return this.toString();
    };
    // indexOf -> 获取某一项索引，没有返回 -1
    linkedList.prototype.indexOf = function indexOf(data) {
        var current = this.head,
            index = 0;
        while (current) {
            if (data === current.data) return index;
            current = current.next;
            index += 1;
        }
        return -1;
    };
    // update -> 更新某一位置的节点
    linkedList.prototype.update = function update(position, element) {
        if (position < 0 || position >= this.length) return false;
        var node = this.get(position);
        node.data = element;
        return this.toString();
    };
    // removeAt -> 删除某一位置的节点
    linkedList.prototype.removeAt = function removeAt(position) {
        if (position < 0 || position >= this.length) return false;
        var current = this.get(position);
        if (position === 0) {
            this.head = current.next;
        } else {
            var previous = this.get(position - 1);
            previous.next = current.next;
        }
        this.length -= 1;
        return this.toString();
    };
    // remove -> 删除某一节点
    linkedList.prototype.remove = function remove(data) {
        var current = this.indexOf(data);
        if (current !== -1) {
            return this.removeAt(current);
        } else {
            return false;
        }
    };
    linkedList.prototype.isEmpty = function isEmpty() {
        return this.length > 0 ? false : true;
    }

}
```

### 双向链表
```javascript
function node(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
}
function doublyLinkedlist() {
    this.head = null;
    this.tail = null;
    this.length = 0;
}
doublyLinkedlist.prototype = {
    constructor: doublyLinkedlist,
    append: function (data) {
        var newNode = new node(data);
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length += 1;
        return this.toString();
    },
    backwardString: function () {
        var current = this.head,
            str = '';
        while (current) {
            str += current.data + ' ';
            current = current.next;
        }
        return str;
    },
    forwardString: function () {
        var current = this.tail,
            str = '';
        while (current) {
            str += current.data + ' ';
            current = current.prev;
        }
        return str;
    },
    toString: function () {
        return this.backwardString();
    },
    get: function (position) {
        if (position < 0 || position >= this.length) return null;
        var current = this.head,
            index = 0;
        while (index !== position) {
            current = current.next;
            index += 1;
        }
        return current;

    },
    insert: function (position, data) {
        if (position < 0 || position > this.length) return false;
        var newNode = new node(data);
        if (position === 0) {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        } else if (position === this.length) {
            return this.append(data);
        } else {
            var current = this.get(position);
            current.prev.next = newNode;
            newNode.prev = current.prev;
            newNode.next = current;
            current.prev = newNode;
        }
        this.length += 1;
        return this.toString();
    },
    indexOf: function (data) {
        var current = this.head,
            index = 0;
        while (current) {
            if (current.data === data) return index;
            index += 1;
            current = current.next;
        }
        return -1;
    },
    update: function (position, data) {
        if (position < 0 || position >= this.length) return false;
        var current = this.get(position);
        current.data = data;
        return true;
    },
    removeAt: function (position) {
        if (position < 0 || position >= this.length) return false;
        var current = this.get(position);
        if (position === 0) {
            this.head = current.next;
            current.next.prev = null;
        } else if (position === this.length - 1) {
            this.tail = current.prev;
            current.prev.next = null;
        } else {
            current.prev.next = current.next;
            current.next.prev = current.prev;
        }
        this.length -= 1;
        return true;
    },
    remove: function (data) {
        var index = this.indexOf(data);
        if (index !== -1) {
            return this.removeAt(index);
        } else {
            return false;
        }
    },
    isEmpty: function () {
        return this.length > 0 ? false : true;
    }
}
```