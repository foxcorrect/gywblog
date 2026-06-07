## 考察promise的运用！！！

```javascript

/***
 * apiGet就是一个简单的方法
 * 请问怎么才能让catch抓出错误
 * 
 */

try {
    apiGet(url,(error,resspon)=>{
        resspon.data.aa = 1;  //可能报错的地方
    })
} catch (error) {
    
}
```

答案：

```javascript
let fn = new Promise((resove, reject)=>{
  setTimeout(()=>{
    apiGet(url,(error,resspon)=>{
      reject(resspon)
    })
  },1000)
});
async function test(){
  try{
    const res = await fn
  }catch(error){
      console.log(error);
  } 
}
test()
```

## 实现 Promise.all  
### 核心考察点
+  返回一个新的 Promise 
+  全部成功才 resolve 
+  任意一个失败直接 reject 
+  保持结果顺序 
+  支持普通值（非 Promise）

```javascript
Promise.myAll = function (promiseList) {
  return new Promise((resolve, reject) => {
    // 参数校验
    if (!Array.isArray(promiseList)) {
      return reject(new TypeError('argument must be an array'));
    }

    const result = [];
    let count = 0;
    const len = promiseList.length;

    // 空数组处理
    if (len === 0) {
      return resolve([]);
    }

    promiseList.forEach((item, index) => {
      // Promise.resolve 包装普通值
      Promise.resolve(item)
        .then((res) => {
          result[index] = res;
          count++;

          // 全部完成
          if (count === len) {
            resolve(result);
          }
        })
        .catch(reject);
    });
  });
};
```

## Promise.all 和 Promise.race 区别？
+ `Promise.all`：全部成功才成功，一个失败就失败 
+ `Promise.race`：谁先返回用谁（成功失败都算） 

---

### map 和 forEach 区别？
| 区别 | map | forEach |
| --- | --- | --- |
| 返回值 | 新数组 | undefined |
| 是否链式调用 | 支持 | 不支持 |
| 是否修改原数组 | 否 | 否（通常） |


## 实现 Promise.race  
```javascript
Promise.myRace = function(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(p => {
      Promise.resolve(p).then(resolve).catch(reject);
    });
  });
};
```

## 考察xss
```javascript
/***
 * 给定一个url为http://www.simple.com?url=http://www.test.com/a.js&b=2&c=3#hash
 * 请分离url中的参数并且生成一个{key:vlaue}形式的对象
 * 在生成的对象中，怎么才能防止页面读取url中的a文件
 */
var searchData = getUrl(url);
var dom = '<img src=' + searchData.url + '/>';
document.createElement(dom);
```

首先对 URL 参数进行解析，可以使用 URLSearchParams，也可以手写 querystring parser。  
对于安全问题，不能直接把 URL 参数拼接进 DOM，否则会导致 XSS。  
我会采用三层防护：

1. **协议校验**：只允许 http/https 
2. **域名白名单**：限制可信 host 
3. **避免 innerHTML 拼接**：使用 createElement + 属性赋值 

企业级还会通过 CSP 策略进一步限制资源加载，防止恶意脚本执行。

```javascript
function getUrl(url) {
  const obj = {};

  // 获取 query
  const search = url.split('?')[1]?.split('#')[0];

  if (!search) return obj;

  search.split('&').forEach(item => {
    const [key, value = ''] = item.split('=');

    obj[decodeURIComponent(key)] =
      decodeURIComponent(value);
  });

  return obj;
}

// 安全校验
function isSafeUrl(url) {
  try {
    const u = new URL(url);

    // 协议白名单 + 域名白名单
    return (
      ['http:', 'https:'].includes(u.protocol) &&
      u.hostname === 'www.test.com'
    );
  } catch {
    return false;
  }
}

const url =
  'http://www.simple.com?url=http://www.test.com/a.js&b=2&c=3#hash';

const searchData = getUrl(url);

// 不拼接字符串，防 XSS
if (isSafeUrl(searchData.url)) {
  const img = document.createElement('img');
  img.src = searchData.url;
  document.body.appendChild(img);
}
```



## 实现防抖节流
### 防抖
#### 核心场景
+  输入框搜索 
+  resize 
+  scroll 高频事件 

#### 核心思想
多次触发只执行最后一次。

```javascript
function debounce(fn, delay) {
  let timer = null;

  return function (...args) {
    const context = this;

    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
```

立即执行版本

```javascript
function debounce(fn, delay, immediate = false) {
  let timer = null;

  return function (...args) {
    const context = this;

    if (timer) clearTimeout(timer);

    if (immediate) {
      const callNow = !timer;

      timer = setTimeout(() => {
        timer = null;
      }, delay);

      if (callNow) {
        fn.apply(context, args);
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    }
  };
}
```

### 节流
#### 核心场景
+  scroll 
+  鼠标移动 
+  拖拽 

#### 核心思想
固定时间内只执行一次。

```javascript
function throttle(fn, delay) {
  let timer = null;
  let prev = 0;

  return function (...args) {
    const now = Date.now();
    const remaining = delay - (now - prev);

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      fn.apply(this, args);
      prev = now;
    } else if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        prev = Date.now();
        timer = null;
      }, remaining);
    }
  };
}
```

### 两者结合
```javascript
function throttleDebounce(fn, delay, type='debounce'){
  let timer = null, prev = 0;
  return function(...args){
    const context = this;
    if(type === 'debounce'){
      clearTimeout(timer);
      timer = setTimeout(()=>fn.apply(context,args), delay);
    }else{
      const now = Date.now();
      if(now - prev >= delay){
        fn.apply(context,args);
        prev = now;
      }
    }
  };
}
```

##  实现 Array.prototype.map  
### 核心考察点
+  this 指向 
+  callback 参数 
+  返回新数组 
+  不修改原数组 
+  稀疏数组处理 

 map 本质是遍历数组并返回新数组，不修改原数组。需要处理 callback 的 this 指向、参数校验以及稀疏数组。  

```javascript
Array.prototype.myMap = function (callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const arr = this;
  const result = new Array(arr.length);

  for (let i = 0; i < arr.length; i++) {
    // 处理空位（稀疏数组）
    if (i in arr) {
      result[i] = callback.call(
        thisArg,
        arr[i],
        i,
        arr
      );
    }
  }

  return result;
};
```

## 实现 Array.prototype.filter  
**考察点**：条件筛选、this 指向。  

```javascript
Array.prototype.myFilter = function(fn, thisArg) {
  const arr = this, result = [];
  for(let i=0;i<arr.length;i++){
    if(i in arr && fn.call(thisArg, arr[i], i, arr)) result.push(arr[i]);
  }
  return result;
};
```

## 实现 Array.prototype.reduce  
**考察点**：累加逻辑、初始值处理。  

```javascript
Array.prototype.myReduce = function(fn, init) {
  const arr = this;
  let acc = init, i = 0;
  if(acc === undefined){
    while(i < arr.length && !(i in arr)) i++;
    acc = arr[i++];
  }
  for(; i<arr.length; i++){
    if(i in arr) acc = fn(acc, arr[i], i, arr);
  }
  return acc;
};
```

## 手写深拷贝  
**考察点**：递归、循环引用处理。    

```javascript
function deepClone(obj, map = new WeakMap()){
  if(obj === null || typeof obj !== 'object') return obj;
  if(map.has(obj)) return map.get(obj);
  const copy = Array.isArray(obj)?[]:{};
  map.set(obj, copy);
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      copy[key] = deepClone(obj[key], map);
    }
  }
  return copy;
}
```

## 手写 instanceof  
**考察点**：原型链理解。  

```javascript
function myInstanceof(obj, constructor) {
  let proto = Object.getPrototypeOf(obj);
  const prototype = constructor.prototype;
  while(proto){
    if(proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
```

## 手写 new 操作符  
**考察点**：原型链、构造函数、返回值处理。  

```javascript
function myNew(Constructor, ...args) {
  const obj = {};
  Object.setPrototypeOf(obj, Constructor.prototype);
  const result = Constructor.apply(obj, args);
  return typeof result === 'object' && result !== null ? result : obj;
}
```

## 手写 call  
**考察点**：函数执行上下文、this。  

```javascript
Function.prototype.myCall = function(context, ...args){
  context = context || globalThis;
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};
```

## 手写 apply
**考察点**：数组参数展开、this。

```javascript
Function.prototype.myApply = function(context, args){
  context = context || globalThis;
  const key = Symbol();
  context[key] = this;
  const result = context[key](...(args||[]));
  delete context[key];
  return result;
};
```

## 手写 bind  
**考察点**：this绑定、new 调用情况。  

```javascript
Function.prototype.myBind = function(context, ...args1){
  const fn = this;
  return function(...args2){
    return fn.apply(this instanceof fn ? this : context, [...args1, ...args2]);
  };
};
```

## 手写 flatten 数组扁平化  
**考察点**：递归、reduce。  

```javascript
function flatten(arr) {
  return arr.reduce((acc, cur) => 
    acc.concat(Array.isArray(cur) ? flatten(cur) : cur), []);
}
```

## 手写数组去重  
```javascript
function unique(arr){
  return [...new Set(arr)];
}
// 或
function unique2(arr){
  const res = [];
  arr.forEach(item => {
    if(!res.includes(item)) res.push(item);
  });
  return res;
}
```

## 手写 sleep/延时函数  
```javascript
function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}
// 使用：
async function test(){
  console.log('start');
  await sleep(1000);
  console.log('end');
}
```

## 手写 EventEmitter  
```javascript
class EventEmitter {
  constructor() { this.events = {}; }
  on(event, fn){ (this.events[event] ||= []).push(fn); }
  emit(event, ...args){ (this.events[event] || []).forEach(fn => fn(...args)); }
  off(event, fn){ this.events[event] = (this.events[event] || []).filter(f => f !== fn); }
}
```

## 手写扁平对象转树结构  
```javascript
function listToTree(list){
  const map = {}, res = [];
  list.forEach(item => map[item.id] = {...item, children: []});
  list.forEach(item => {
    if(item.parentId) map[item.parentId].children.push(map[item.id]);
    else res.push(map[item.id]);
  });
  return res;
}
```

## 手写 URL 参数解析  
```javascript
function parseQuery(url){
  const query = url.split('?')[1]?.split('#')[0];
  if(!query) return {};
  return Object.fromEntries(query.split('&')
                            .map(kv => kv.split('=').map(decodeURIComponent)));
}
```


