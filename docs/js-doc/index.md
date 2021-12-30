# JAVA-SCRIPT 学习记录

## 节流和防抖

* **首节流**，第一次会马上执行，之后的操作不一定会执行。可以理解问第一次执行，最后一次不执行。
* **尾节流**，第一次不会马上执行，而是一段时间后在执行。可以理解为第一次不执行，最后一次执行。
* **兼顾型节流**，第一次会马上执行，最后一次也会执行。

1. 首节流

    ```javascript
    function throttle(fn, delay){
        let last=0;
        return function(){
            let now=Date.now();
            if(now-last>delay){
                fn.apply(this, arguments);
                last=now;
            }
        }
    }
    ```

以上代码不难看出，在第一次操作的时候就会执行一遍 fn，之后的操作如果时间不超过 delay（例如 2s）就不会在执行函数，理解为第一次执行，最后一次不执行。

2. 尾节流

    ```js
    function throttle(fn, delay) {
        let timer = null;//通过闭包使变量timer存在着

        return function () {
            let context = this; //使下面的apply有正确的指向
            let args = arguments;

            if (!timer) {
                timer = setTimeout(function () { 
                    //使用箭头函数，就不用使用apply来改变this指向
                    fn.apply(context, args);
                    timer = null;
                }, delay);
            }
        }
    }

    ```

尾节流中，第一次是不会直接执行的，而是在一段时间后再执行。理解为第一次不执行，最后一次执行。

3. 兼顾型节流

    ```js

    function throttle(fn, delay){
        let last=0;
        let timer=null;

        return function(){
            let now=Date.now();
            let reming=delay-(now-last);

            clearTimeout(timer);//不管三七二十一，有定时器都先清除定时器
            if(reming<0){
                fn.apply(this, arguments);
                last=now;
            }else{
                setTimeout(()=>{
                    fn.apply(this,arguments);
                }, reming);
            }
        }
    }

    ```

兼顾型节流，就能够在第一次，最后一次都执行代码。

各有自身的应用场景。

4. 防抖

防抖跟节流正好相反，防抖是在多次点击中，只执行最后一次，前面的点击都会被取消

```js

function debounce(fn, delay) {
    let timer = null;

    return function () {
        clearTimeout(timer);
        let context = this;
        let args = arguments;

        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    }
}

```

## js范围内拖动、 缩放

* html

    ```js
        <div id="father">
            <div id="box">
                <img src="http://www.jq22.com/img/cs/500x500-2.png">
                <div id="scale"></div>
            </div>
        </div>
    ```

* css

    ```css
     #box {
        width:100px;
        height:100px;
        background-color:aquamarine;
        position:absolute;
    }
    #father {
        width:600px;
        height:500px;
        background-color:rgb(226,117,184);
        position:relative;
    }
    img {
        width:100%;
        height:100%;
        cursor:move;
    }
    #scale {
        width:10px;
        height:10px;
        overflow:hidden;
        cursor:se-resize;
        position:absolute;
        right:0;
        bottom:0;
        background-color:rgb(122,191,238);
    }

    ```

* javascript
  
  ```js
   // box是装图片的容器,fa是图片移动缩放的范围,scale是控制缩放的小图标
    var fa = document.getElementById('father');
    var box = document.getElementById("box");
    var scale = document.getElementById("scale");
    // 图片移动效果
    box.onmousedown = function(ev) {
        var oEvent = ev;
        // 浏览器有一些图片的默认事件,这里要阻止
        oEvent.preventDefault();
        var disX = oEvent.clientX - box.offsetLeft;
        var disY = oEvent.clientY - box.offsetTop;
        fa.onmousemove = function(ev) {
            oEvent = ev;
            oEvent.preventDefault();
            var x = oEvent.clientX - disX;
            var y = oEvent.clientY - disY;

            // 图形移动的边界判断
            x = x <= 0 ? 0 : x;
            x = x >= fa.offsetWidth - box.offsetWidth ? fa.offsetWidth - box.offsetWidth : x;
            y = y <= 0 ? 0 : y;
            y = y >= fa.offsetHeight - box.offsetHeight ? fa.offsetHeight - box.offsetHeight : y;
            box.style.left = x + 'px';
            box.style.top = y + 'px';
        }
        // 图形移出父盒子取消移动事件,防止移动过快触发鼠标移出事件,导致鼠标弹起事件失效
        fa.onmouseleave = function() {
            fa.onmousemove = null;
            fa.onmouseup = null;
        }
        // 鼠标弹起后停止移动
        fa.onmouseup = function() {
            fa.onmousemove = null;
            fa.onmouseup = null;
        }
    }
    // 图片缩放效果
    scale.onmousedown = function(e) {
        // 阻止冒泡,避免缩放时触发移动事件
        e.stopPropagation();
        e.preventDefault();
        var pos = {
            'w': box.offsetWidth,
            'h': box.offsetHeight,
            'x': e.clientX,
            'y': e.clientY
        };
        fa.onmousemove = function(ev) {
            ev.preventDefault();
            // 设置图片的最小缩放为30*30
            var w = Math.max(30, ev.clientX - pos.x + pos.w)
            var h = Math.max(30, ev.clientY - pos.y + pos.h)
            // console.log(w,h)

            // 设置图片的最大宽高
            w = w >= fa.offsetWidth - box.offsetLeft ? fa.offsetWidth - box.offsetLeft : w
            h = h >= fa.offsetHeight - box.offsetTop ? fa.offsetHeight - box.offsetTop : h
            box.style.width = w + 'px';
            box.style.height = h + 'px';
            // console.log(box.offsetWidth,box.offsetHeight)
        }
        fa.onmouseleave = function() {
            fa.onmousemove = null;
            fa.onmouseup = null;
        }
        fa.onmouseup = function() {
            fa.onmousemove = null;
            fa.onmouseup = null;
        }
    }

  ```
