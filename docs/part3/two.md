# jQuery 中处理数据类型检测的源码
```javascript
var getProto = Object.getPrototypeOf;
var class2type = {};
var toString = class2type.toString; // Object.prototype.toString 检测数据类型
var hasOwn = class2type.hasOwnProperty; // Object.prototype.hasOwnProperty
var fnToString = hasOwn.toString; // Function.prototype.toString 函数转为字符串
var ObjectFunctionString = fnToString.call( Object ); // Object 转为字符串

// 检测是否为函数
var isFunction = function isFunction( obj ) {

        // obj.nodeType !== "number" 的原因 =>
		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.

        // typeof obj.item !== "function" 的原因 => 
		// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
		// Plus for old WebKit, typeof returns "function" for HTML collections
		// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)

		return typeof obj === "function" && typeof obj.nodeType !== "number" &&
			typeof obj.item !== "function";
	};

// 检测是否为 window
// window.window === window => true
var isWindow = function isWindow( obj ) {
    // null 和 undefined 无法进行成员访问
		return obj != null && obj === obj.window;
	};

// 创建对象类型对应对象
/*
class2type 为 =>
[object Array]: "array"
[object Boolean]: "boolean"
[object Date]: "date"
[object Error]: "error"
[object Function]: "function"
[object Number]: "number"
[object Object]: "object"
[object RegExp]: "regexp"
[object String]: "string"
[object Symbol]: "symbol"
*/
// typeof new Number(10) => object
// 所以这里基本数据类型也进行了处理 => 为了检测基本数据类型的引用类型
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( _i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

// 检测数据类型
function toType( obj ) {
    // null undefined
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
    // 引用数据类型 class2type[ toString.call( obj ) ] || "object"
    // 基本数据类型 typeof obj
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}

// 检测是否为类数组
function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
// 检测是否为纯粹对象
function isPlainObject( obj ) {
    var proto, Ctor;

    // Detect obvious negatives
    // Use toString instead of jQuery.type to catch host objects

    // 不存在或数据类型不为 object
    if ( !obj || toString.call( obj ) !== "[object Object]" ) {
        return false;
    }

    // 获取原型
    proto = getProto( obj );

    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    if ( !proto ) {
        return true;
    }

    // Objects with prototype are plain iff they were constructed by a global Object function
    //存在 constructor 时，获取 constructor
    Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;

    return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
}

function isEmptyObject( obj ) {
    var name;

    for ( name in obj ) {
        return false;
    }
    return true;
}
```