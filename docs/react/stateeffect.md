# 搞懂 useState 和 useEffect 的实现原理

现在写 react 组件基本都是 function + hooks 了，因为 hooks 很强大也很灵活。

比如 useState 可以声明和修改 state，useEffect 可以管理异步逻辑，useContext 可以读取 context 的值等等，还可以把它们进一步封装成自定义 hooks（自定义 hooks 其实就是普通的函数封装）。

虽然每天都在用 hooks，但依然有很多人不知道 hooks 的实现原理。

所以这篇文章我们就一起来探究下 hooks 的原理吧，主要是讲 useState 和 useEffect 这两个 hook。

首先，我们过一下 react 的渲染流程。

我们组件里用 jsx 描述页面：

![](../imgs/8a686ca153b4004caf7eeff691e6b862.png)

jsx 会被编译成 render function，也就是类似 React.createElement 这种：

![](../imgs/72d65c239dfd9bf88280f5b874755ecf.png)

所以之前写 React 组件都必须有一行 import * as React from 'react'，因为编译后会用到 React 的 api。

但后来改为了这种 render function：

![](../imgs/5750c54266d751f678b7c20ea7a26c95.png)

由 babel、tsc 等编译工具自动引入一个 react/jsx-runtime 的包，

![](../imgs/4fbd2dd60581fda5ae60f59024fa433f.png)


然后 render function 执行后产生 React Element 对象，也就是常说的 vdom。

![](../imgs/dede72c9c50672b04f189b6fb5994b23.png)

也就是这样的流程：

![](../imgs/be23631286693935a179bad5468db147.png)

然后 vdom 会转换为 fiber 结构，它是一个链表：

![](../imgs/90a95e7d8dec2c264216322d75442db3.png)

vdom 只有 children 属性来链接父子节点，但是转为 fiber 结构之后就有了 child、sibling、return 属性来关联父子、兄弟节点。

vdom 转 fiber 的流程叫做 reconcile，我们常说的 diff 算法就是在 reconcile 这个过程中。

多个节点的 diff 也就是当老的 fiber 子节点列表需要更新的时候，要和新的 vdom 的children 进行对比，找到哪些是可以复用的，直接移动过去，剩下的节点做增删，产生新的 fiber 节点列表。

经过 reconcile 之后，就有了新的 fiber 树了。

这时候还没处理副作用，也就是 useEffect、生命周期等函数，这些会在 reconcile 结束之后处理。

所以 react 渲染流程整体分为两个大阶段： render 阶段和 commit 阶段。

render 阶段也就是 reconcile 的 vdom 转 fiber 的过程，commit 阶段就是具体操作 dom，以及执行副作用函数的过程。

commit 阶段还分为了 3 个小阶段：before mutation、mutation、layout。

![](../imgs/9276ef4553951402ec77d08a3f912c74.png)

具体操作 dom 的阶段是 mutation，操作 dom 之前是 before mutation，而操作 dom 之后是 layout。

layout 阶段在操作 dom 之后，所以这个阶段是能拿到 dom 的，ref 更新是在这个阶段，useLayoutEffect 回调函数的执行也是在这个阶段。

理清了 react 的渲染流程 render + commit(before mutation、mutation、layout) 之后，我们来进入今天的主要内容“hooks 实现原理”部分吧。

hooks 的数据保存在哪里呢？比如 useState 的 state，useRef 的 ref 等。

很容易想到是在 fiber 节点上。

比如这样 3 个 hook：

![](../imgs/5f621d5a7407c0bfb37e9b81dcb829ef.png)

你就可以在 fiber 节点上找到对应的 3 个 memoizedState 的链表节点。

![](../imgs/56b318ac06eca2940a40dec511e2ead7.png)

hook 的 api 就是在 fiber 的 memoizedState 链表上存取数据的。

那是什么时候构造这个链表的呢？

在第一次调用 useXxx api 的时候。

比如 useRef 第一次调用会走到 mountRef：

![](../imgs/53bb4b4284df3508b69cce20260966e3.png)

在 mountRef 里可以看到它创建了一个 hook 节点，然后设置了 memoizedState 属性为有 current 属性的对象，也就是 ref 对象。

![](../imgs/0773467001ae3cf3e64eaaf5420f6b80.png)

具体创建 hook 链表的过程也很容易看懂：

![](../imgs/a784ef368adf8bbd55f99e374988c7bb.png)

就是第一个节点挂在 fiber 节点的 memoizedState 属性上，后面的挂在上个节点的 next 属性上。

只有第一次 mountRef，那第二次呢？

第二次会走到 updateRef：

![](../imgs/d63cdeb9f5bddfbc01a3769845b32895.png)

这里的 updateRef 就是取出 hook 的 momorizedState 的值直接返回了：

![](../imgs/74e661edb9a016d91aab8c2274ae5748.png)

所以 useRef 的返回的 ref 对象始终是最开始那个。

再看几个别的 hook，比如 useMemo，它是当依赖不变的时候始终返回之前创建的对象，当依赖变了才重新创建。

一般是用在 props 上，因为组件只要 props 变了就会重新渲染，用 useMemo 可以避免没必要的 props 变化。

在 antd 源码里就用到很多：


![](../imgs/97ce103f1c8ce30e23c8c40aeb71c333.png)

上面这个值就是作为组件的 props 的，如果不用 useMemo 包裹，那每次都会变成一个新对象，每次都会触发子组件重新渲染。

这就是 useMemo 的作用，useCallback 也是同理。

![](../imgs/e74e70ec825f9202c5f26385e86f7d7d.png)

它们是怎么实现的呢？

useMemo 同样也是分为 mountMemo 和 updateMemo 两个阶段。

mount 的时候是这样的：

![](../imgs/01e4c38ff2e7756cfb29b6a670df6602.png)

创建 hook，然后执行传入的 create 函数，把值设置到 hook.memoizedState 属性上。

update 的时候会判断依赖有没有变：

![](../imgs/e037f9f6acbaf23ed00198983c909393.png)

如果依赖数组都没变，那就返回之前的值，否则创建新的值更新到 hook.memoizedState。

很容易想到 useCallback 的实现是分为 mountCallback 和 updateCallback 的：

![](../imgs/3508077aa3679bcf28f59c7a5c12b4eb.png)

![](../imgs/1f83d7dd34ad62b69b9f365ca4d8ed09.png)

和 useMemo 的实现大同小异。

至此，我们可以小结一下了：

**hook 的数据是存放在 fiber 的 memoizedState 属性的链表上的，每个 hook 对应一个节点，第一次执行 useXxx 的 hook 会走 mountXxx 的逻辑来创建 hook 链表，之后会走 updateXxx 的逻辑。**

当然，前面的 useRef、useCallback、useMemo 都比较简单，只是 mountXxx 和 updateXxx 里的那几行代码。

但 useState 和 useEffect 就没那么简单了，因为它们涉及到了渲染的流程。

我们先来看 useEffect，它是用来封装副作用逻辑的。

比如这样：

![](../imgs/7d54f5a4fad8a9b8b1c5b08fbd80c597.png)

它同样分了 mountEffect 和 updateEffect 两个阶段：

![](../imgs/12aa8e9d178a018ec50ee32fda77018d.png)

mountEffect 里执行了一个 pushEffect 的函数：

![](../imgs/ee4960d1ee6c93b3e458be96a98cd8b0.png)

在 updateEffect 里也是，只是多了依赖数组变化的检测逻辑：

![](../imgs/b4c72bcc18d27950cc6740f124a1e23d.png)

那这个 pusheEffect 做了什么呢？

这里面创建了 effect 对象并把它放到了 fiber.updateQueue 上：


![](../imgs/ec0a5929108ebf64b975feb5bb433c0a.png)

updateQueue 是个环形链表，有个 lastEffect 来指向最后一个 effect。

为什么要这样设计呢？

因为这样新的 effect 好往后面插入呀，直接设置 lastEffect.next 就行。

也就是说我们执行完 useEffect 之后，就把 effect 串联起来放到了 fiber.updateQueue 上。

那什么时候执行 effect 呢？

这个前面说过了，就是 commit 阶段执行。

那是在 commit 阶段的 before mutation、mutation、layout 的哪个阶段执行呢？

![](../imgs/6e3fe0b0a3883c7d2336e9c79452a2c2.png)

都不是。

是在 commit 最开始的时候，异步处理的 effect 列表：

![](../imgs/29593c9334ce922f3f454f5e9ae656d4.png)

具体处理的过程就是取出 fiber.updateQueue，然后从 lastEffect.next 开始循环处理

![](../imgs/1fc435d0dba8b67937ee500db970c443.png)

遍历完一遍 fiber 树，处理完每个 fiber.updateQueue 就处理完了所有的 useEffect 的回调：

![](../imgs/bdbb7bd82ca2aaff004869009eb2f94c.png)

那有的同学说了，不在 before mutation、mutation、layout 阶段执行有啥好处呢？

因为异步执行不阻塞渲染呀！

当然，还有个 useLayoutEffect 的 hook，它是在 layout 阶段同步调用的。

比如这样的代码：

![](../imgs/54245be338e66b86b8c9d38b757b65e6.png)

大家觉得打印顺序是什么呢？

![](../imgs/214684b097c9bd1f99ee75255cd6acf6.png)

结果是先 layout effect 再 effect。

因为 layout effect 是在 layout 阶段，也就是 dom 更新之后同步调用的，而 effect 是异步调用的。

一般不建议用 useLayoutEffect，因为同步逻辑会阻塞渲染。

layout effect 的执行就是在 layout 阶段遍历所有 fiber，取出 updateQueue 的每个 effect 执行。

![](../imgs/dd6f9344444be6729431a5f82045d23e.png)

这就是 effect 的实现原理。

小结一下：

**useEffect 的 hook 在 render 阶段会把 effect 放到 fiber 的 updateQueue 中，这是一个  lastEffect.next 串联的环形链表，然后 commit 阶段会异步执行所有 fiber 节点的 updateQueue 中的 effect。**

**useLayoutEffect 和 useEffect 差不多，区别只是它是在 commit 阶段的 layout 阶段同步执行所有 fiber 节点的 updateQueue 中的 effect。**

最后，我们再来看下 useState 的实现：

同样要分为 mountState 和 updateState 来看：

它把 initialState 设置到了 hook.baseState 上，这是 state 最终保存的地方。

![](../imgs/cd352bd18fb1b300644643d77f11c178.png)

然后创建了一个 queue，这个是用于多个 setState 的时候记录每次更新的。

返回的第二个值是 dispatch 函数，给他绑定了当前的 fiber 还有那个 queue。

这样，当你再执行返回的 setXxx 函数的时候就会走到 dispatch 逻辑：

![](../imgs/95a0cabd9dd2cdcb2cb0171ddb9e3447.png)

这时候前两个参数 fiber 和 queue 都是 bind 的值，只有第三个参数是传入的新 state，当然，现在还叫 action：

![](../imgs/f9d8f3ee9d69e12148b3a0ed0b1323cf.png)

它会创建一个 update 对象，然后标记 fiber 节点，之后调度下次渲染：

![](../imgs/5d6d9afd7cd746a66329cc7f7397894a.png)

这里要简单介绍下优先级机制 lane。

假设有 30 多种优先级，怎么表示呢？

用数字么？

这样计算太慢了，而且如果同时有几种优先级计算起来就比较麻烦了。

所以 react 选择了用二进制的方式来表示：

![](../imgs/9bbeb10117d67345627faf5ac6125149.png)

每个二进制位代表一种优先级，有多个优先级就是多个位为 1。

这样通过位运算就能轻松算出是啥优先级：

![](../imgs/0f9c7a89bc0b455622b2795047a669f5.png)

这种机制就叫做 lane，因为二进制的位就像一条条赛道一样，很形象：

![](../imgs/5dc8e9538f3b2cb3fee1b1ff179e9c24.png)

创建了 update 对象之后就要标记 fiber 节点有更新了，不只是要标记那个节点，还要标记它的父节点直到跟节点：

所以这个方法名字就叫做 markUpdateFromFiberToRoot，也就是从当前 fiber 一直到 root 的意思：

![](../imgs/4373cfed4bb73401901fd48719bb4fa2.png)

做的事情就是循环往上一层层 merge lane。

不过当前节点是 fiber.lanes，而父节点是 fiber.childLanes，用来区分是当前节点的更新还是子节点的更新。

标记完更新就是调度下次渲染了。

也就是 scheduleUpdateOnFiber 这个方法：

![](../imgs/ff3d6814511eb9fd640988d28d74de54.png)

它里面最终会调用到 renderRootSync，也就是从跟节点开启新的 vdom 转 fiber 的循环：

![](../imgs/c936a41938d80ecfae1dc7ea625ec63b.png)


![](../imgs/fd7ec5da14499ad23735b29ea2e012d0.png)

这样就触发了新一次渲染。

然后再渲染到这个函数的时候就会执行到 updateState：

![](../imgs/8972e80d04622780efbe6a82ecadcc5e.png)


![](../imgs/af5061bc5fa8a55c263ed9e2f1a05056.png)

updateState 会调用 updateReducer，选出最终的 state 来返回做渲染：

怎么决定 state 要更新成啥呢？

自然也是根据优先级，这里会根据 lane 来比较，然后做 state 的合并，最后返回一个新的 state：

![](../imgs/3195527b0fb5bfa611f5c6bf27438c07.png)

这样组件里拿到的就是新 state，然后根据它做渲染。

这就是 useState 的实现原理。

小结一下：

**useState 同样分为 mountState 和 updateState 两个阶段：**

**mountState 会返回 state 和 dispatch 函数，dispatch 函数里会记录更新到 hook.queue，然后标记当前 fiber 到根 fiber 的 lane 需要更新，之后调度下次渲染。**

**再次渲染的时候会执行 updateState，会取出 hook.queue，根据优先级确定最终的 state 返回，这样渲染出的就是最新的结果。**

## 总结

react 渲染流程分为 render 和 commit 阶段。

render 阶段执行 vdom 转 fiber 的 reconcile，commit 阶段更新 dom，执行 effect 等副作用逻辑。

commit 阶段分为 before mutation、mutation、layout 3 个小阶段。

hook 的数据就是保存在 fiber.memoizedState 的链表上的，每个 hook 对应一个链表节点。

hook 的执行分为 mountXxx 和 updateXxx 两个阶段，第一次会走 mountXxx，创建 hook 链表，之后执行 updateXxx。

我们看了 useRef、useMemo、useCallback 的实现原理，这几个 hook 都比较简单。其中后两个 hook 是作为 props 时为了减少不必要渲染的时候用的。

useState 和 useEffect 就和渲染流程有关了：

useEffect 在 render 阶段会把 effect 放到 fiber.updateQueue 的环形链表上，然后在 commit 阶段遍历所有 fiber 的 updateQueue，取出 effect 异步执行。

useLayoutEffect 和 useEffect 差不多，只是 effect 链表是在 layout 阶段同步执行的。

useState 的 mountState 阶段返回的 setXxx 是绑定了几个参数的 dispatch 函数。执行它会创建  hook.queue 记录更新，然后标记从当前到根节点的 fiber 的 lanes 和 childLanes 需要更新，然后调度下次渲染。

下次渲染执行到 updateState 阶段会取出 hook.queue，根据优先级确定最终的 state，最后返回来渲染。

这样就实现了 state 的更新和重新渲染。

这就是 react hooks 特别是 useState 和 useEffect 的实现原理。理解它们不单单要理解 hook 的存储结构，还要理解 react 的整个渲染流程。









