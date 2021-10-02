# 闭包进阶应用（2）-惰性思想

**上篇博客介绍了两个闭包的应用，这篇从 3 开始**

3. 惰性函数 => **能干一次的绝不干第二次**

```javascript
// 获取元素的样式
//getComputedStyle 不支持老版本浏览器
// get_css => 判断浏览器是否支持 getComputedStyle，支持则返回，不支持则返回 currentStyle
function get_css(element, attr){
  if(window.getComputedStyle){
    return window.getComputedStyle(element)[attr];
  }
  return element.currentStyle[attr]
}

let bodyWidth = get_css(document.body, 'width');

let bodyHeight = get_css(document.body, 'height');
```

上例中，每一次调用 `get_css()`,都要判断一次是否支持 `getComputedStyle`，明显是没有必要的，只要第一次执行判断一次即可，我们可以基于**惰性思想**提升此函数性能。

```javascript
function get_css(element, attr){
  //第一次执行 get_css 时，根据浏览器兼容情况，重构函数
  if(window.getComputedStyle){
    get_css = function () {
      return window.getComputedStyle(element)[attr];
    }
  }
  get_css = function () {
    return element.currentStyle[attr]
  }
  // 第一次执行也需要获取到结果，重新执行重构后的函数
  return get_css(element, attr);
}

let bodyWidth = get_css(document.body, 'width');

let bodyHeight = get_css(document.body, 'height');
```