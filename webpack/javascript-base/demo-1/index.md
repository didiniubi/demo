# javascript 基础整合

- 变量类型
   - 值类型    
       1 Number   
       2 String   
       3 Boolean   
       4 null   
       5 undefined   
       6 symbol (Es6)
       
   - 引用类型   
      1 Object   
      2 Array   
      3 function
- js按照存储方式区分变量类型
   - 值类型   

       对于值类型来说，数据是直接存储在栈内存中，所以值类型赋值是将实际值复制一份给对应的变量，两个值类型的数据是相互独立的，不会相互影响；
    - 引用类型   
        引用类型的数据通常由多个值构成，比如一个对象多个方法或属性；引用型数据在栈内存中存储的是一个地址，这个地址指向栈内存数据的实际存储的内存地址


```
    // 值类型
    var a = 20, b = a;
    b = 21;
    console.log(a); // 20

    // 引用类型
    var obj = { a: 21}, obj2 = obj; // 将书记书记的内存地址赋值给了变量obj2,也就是说两个变量指向了同一个地址
    obj2.a = 24; 
    console.log(obj); // {a: 24}

```   
 
   
- typeof运算符   
    ```
        typeof 'abc' // string
        typeof 123' // number
        typeof true // boolean
        typeof undefined // undefined
        typeof null // object
        typeof {} // object
        typeof [] // object
        typeof console.log // function
    ```
    可以看出typeof只能区分值类型（null除外，可以理解null为空的指针，定义了一个位置但是并没有指向任何）typeof不能区分引用类型（function除外）
- 变量计算 - 强制类型转换   
    - 字符串拼接
    - 运算符 ==
        ```
            1 == '1' // true
            0 == '' // true
            null == undefined // true
        ```
        所以双等计算慎用
    - if语句   
        ```
            var a = 10;
            if(a) { console.log('10转为了true')} // 10转为了true
            var b = '';
            if(b) {} // b转为了false
            
        ```
        0, NaN, '', null, undefiend 这些类型都被if转为了false
    - 逻辑运算服
        ```
            10 && 0 // 0 10转为了true
            '' || 'abc' // abc ''被转为了false
        ```
            判读一个变量会被当成true还是false !!
            var a = 'test';
            console.log(!!a); // true


- js中的内置函数   
    Object, Array, Boolean, Number, String, Function, Date, RegExp, Error

- 如何理解json   
    Json不仅是一种数据格式 同时也是一个Js对象 JSON.stringify JSON.parse

- 原型规则和示例 （原型规则是原型链的基础）
    - 原型的实际应用 /JQuery中的原型实现
        ```
        ```
    - 所有引用类型都有构造函数   
        ```
        var obj = {} // 实际是var obj = new Object()的语法糖，所有对象的构造函数是Object
        var arr = [] // 实际是var arr = new Array()的语法糖，所以数组的构造函数是Array
        var foo = function() {} // 实际是var foo = new Function()的语法糖，所以方法的构造函数是Function
        ```
    - 所有的引用类型，都具有对象特性，既可自由扩展属性   
        ```
        var obj = {};
        obj.a = 21;
        obj // {a : 21}
        var arr = [1, 2];
        arr.name = 'dd';
        arr // [1, 2, name: 'dd']
        function fn() {};
        fn.age = 21;
        ``` 
    - 所有的引用类型，都有__proto__属性（隐式属性）
        ```
        var obj = {};
        console.log(obj.__proto__)
        ```
    - 所有的函数 都有一个prototype属性（显示属性）， 属性值是一个普通的对象
        ```
        var foo = function() {}
        foo.prototype 
        ```
    - 所有的引用类型的__proto__属性指向他的构造函数的prototype属性
        ```
            var obj = {}; // obj的构造函数为Object
            obj.__proto__ === Object.prototype // true
            var arr = [];
            arr.__proto__ === Array.prototype // true
            
        ```
    - 当试图得到一个引用类型的某个属性时，如果引用类型本身没有这个属性，那么就去他的__proto__隐式属性，既他的构造函数的prototype中寻找
        ```
            // 构造函数 默认返回this
            function Fn(name) {
                this.name = name;
            }
            Fn.prototype.sayHello = function() {
                console.log('Hi' + this.name);
            }
            var myFun = new Fn('dd');
            myFun.getAge = function(age) {
                console.log(this.name + ' is ' + age + 'years old');
            }
            myFun.getAge(24); // dd is 24 years old
            myFun.sayHello(); // Hidd
            myFun // 可以看到myFun的属性有name 和getName 他的__proto__是一个Object
            myFun.__proto__ // 等价于 Fn.prototype当去执行sayHello时就是去他的__proto__去寻找有没有该属性（来自原型的属性）

        ```
- 原型链 
    ```
            function Fn(name) {
                this.name = name;
            }
            Fn.prototype.sayHello = function() {
                console.log('Hi' + this.name);
            }
            var myFun = new Fn('dd');
            myFun.getAge = function(age) {
                console.log(this.name + ' is ' + age + 'years old');
            }
            // 结合原型规则看
            myFun.getAge(24); // dd is 24 years old
            myFun.sayHello(); // Hidd
            myFun // 可以看到myFun的属性有name 和getName 
            myFun.__proto__ // 等价于 Fn.prototype 当去执行sayHello时就是去他的__proto__去寻找有没有该属性（来自原型的属性）
            myFun.toString() // 访问一个对象的属性时，先在自身属性中查找，找到返回， 如果没有 就按照__proto__这条链向上查找, 找到返回，
            可以看到 myFun的构造函数是Foo函数， 每个函数都有一个Prototype属性，这个属性值是一个对象， 而对象的构造函数是Object， 所以可以在Object中的__proto__中查找toString属性
            // 整个查找方法就是myFun.__proto__.__proto__ 原型链 隐式原型
            // js为了防止死循环 所以Object.__proto__ 为null    
    ```
- instanceof
    ```
        var obj = {}
        obj instanceof Object // true
    ```
    instanceof用于判读引用类型属于哪个构造函数的方法
- new 一个对象的过程/new  的时候都做了些什么   
    1. 创建了一个新的对象
    2. this执行这个新对象
    3. 对这个新对象进行赋值
    4. 返回this
- 原型链的继承的实例
    ```
        function Dom(id) {
            this.ele = document.getElementById(id);
        }
        Dom.prototype.on = function(type, fn) {
            this.ele.addEventListener(type, fn)
        }
        var myDom = new Dom('nav');
        myDom.on('click', function() {
            console.log(111)
        });
    ```
- 作用域和闭包   
    - 作用域   

        - JavaScript语言中无块级作用域
        - 全局作用域
        - 函数作用域
    - 变量提升   
          
        ```
            console.log(a); //undefined
            var a = 1;
        ```
        等同于
        ```
            var a; // 变量声明会被提升
            console.log(a);
            a = 1; // 赋值或其他运行逻辑保留原地
        ```
        ```
            foo(); // 打印为1
            function foo() {console.log(1)}
        ```
        对于函数说明 会把函数声明置顶到当前作用域，所以执行不会报错
        ```
            foo(); // 报错
            var foo = function() {
                console.log(1);
            } // 匿名函数(函数没有名称) 存储在变量中
        ```
        等同于
        ```
            var foo; // 此时的foo为undefiend
            foo();
            foo = function() {}
        ```
        函数表达式是先定义 后执行
        ```
            function foo() {
                var a = 1;
                function a() {};
                console.log(a);
            }
            foo(); // 1
        ```
        等同于
        ```
            function foo() {
                function a (){}// 函数声明置顶
                var a; // a被忽略
                a = 1
            }
        ```
        ```
            function foo() {
                var a;
                function a() {}
                console.log(a)
            }
            foo(); // 打印为a函数
        ```
        函数声明和变量声明都会提升，函数会首先被提升，然后才是变量，同名函数和变量，变量会被忽略
    - 作用域链
        ```
            var b;
            function foo() {
                console.log(b);
            }
            foo(); // undefined
        ```
        首先 此段代码存在全局作用域，作用域里有b变量和foo函数；   
        其次 foo函数有一个函数作用域 作用域里有一个变量b；   
        ```
        当前作用域里没有定义的变量 我们称为自由变量；   
        自由变量会去作用域的父级作用域去一直查找（按照定义顺序，而不是执行顺序）
        ```
        所以 b为undefiend
    - 闭包   
        JavaScript中的函数会形成闭包。 闭包是由函数以及创建该函数的词法环境组合而成。这个环境包含了这个闭包创建时所能访问的所有局部变量。
        ```
            function foo() {
                var name = 'dd';
                function showName() {
                    console.log(name);
                }
                return showName;
            }
            var myFoo = foo();
            myFoo(); // dd 
        ```
        ```
            function makeDirr(x) {
                return function(y) {
                    return x + y;
                }
            }
            var add5 = makeDirr(5);
            var add10 = makeDirr(10);
            console.log(add5(2)) // 7
            console.log(add10(2)) // 12
        ```
        函数的作用域及其所有变量都会在函数执行结束后被销毁。但是，在创建了一个闭包以后，这个函数的作用域就会一直保存到闭包不存在为止
    - 闭包的特点   
        - 函数内部嵌套函数   
        - 内部函数可以引用外部函数的参数和变量
    - 垃圾回收机制
        函数执行完毕后，定义在函数内部的变量会被浏览器内部的垃圾回收机制所收回，但闭包不会；   
        普通函数的垃圾回收
        ```
            function foo() {
                var a = 1;
                a++;
                console.log(a);
            }
            foo(); // 2
            foo(); //2
        ```
        闭包
        ```
            function foo() {
                var a = 1;
                return function() {
                    a ++;
                    console.log(a);
                }
            }
            var myFun = foo();
            myFun(); // 2
            myFun(); // 3 保留了上次执行时的变量a 上次为2 
        ```
    - 循环与闭包   
        输出数字1-5 每秒一个
        ```
            // 错误示范
            for(var i = 0; i <= 5; i++){
                setTimeout(function timer() { 
                    console.log(i) 
                }, i * 1000)
            } // 6个6
        ```
        延迟函数的回调会等循环结束才执行；
        ```
            当定时器运行时及时每个迭代中执行的时setTimeout(..., 0), 所有的回调函数仍旧是在循环结束后才执行
        ```
        ```
            for(var i = 0; i <= 5; i++) {
                (function() {
                    setTimeout(function timer() {
                        console.log(i);
                    }, i * 1000)
                })(); // 通过声明立即执行函数 创建作用域
            } // 还是6个6
        ```
        仍旧错误，拥有了多个作用域，但这个作用域是空的，他需要有自己的变量，用来将i存储
        ```
            // 正确示例
            for(var i = 0; i <=5; i++) {
                (function(j) {
                    setTimeout(function timer() {
                        console.log(j);
                    }, 1000)
                })(i)
            } // 0 1 2 3 4 5
        ```
        在循环中每次迭代都会产生一个新的作用域，使得延迟函数的回调可以将新的作用域封闭在每次循环中；
- 异步
    - 同步和异步的区别   
        ```
            // 同步代码
            console.log(1);
            alert(2);
            console.log(3)
        ```
        可以看到结果 先打印1 在弹出2 但是在为点击确定时是不会打印3的
        ```
            console.log(1);
            setTimeout(function() {
                console.log(2);
            }, 1000);
            console.log(3) // 打印结果为1 3 2
        ```
        可以看到先打印1和3 在等待1000ms后打印了2
        ```
            同步和异步的区别是同步会阻塞程序执行而异步不会
        ```
    - 单线程   
        - 什么是单线程？
        ```
            同一时间只能做一件事情；两段js不能同时执行
        ```
        - 单线程的原因
        ```
            浏览器是需要渲染DOM的，而js可以修改DOM;当js执行的时候，浏览器DOM渲染会暂停
        ```
        ```
            单线程是为了避免DOM渲染的冲突；
            （若两段js可以同时执行并且都在修改DOM就会发生冲突）
        ```
    - 异步和单线程
        ```
            console.log(1);
            setTimeout(function() {
                console.log(2)
            }, 1000);
            console.log(3);
        ```
        打印结果为 1 3 2
        这段代码在执行时，先打印1，在执行setTimeout, setTimeout中的callback函数会被暂存起来不会立即执行；
        执行打印3；当所有程序执行完后 会去查看有没有暂存的函数，有就执行
    - event-loop 事件循环/轮询
        - event-loop是实现js异步的具体解决方案
        - event-loop遵循同步代码直接执行，异步函数被放在异步队列中，待同步函数都执行完毕后再 **轮询执行** 异步队列中的函数
        - 实例分析
        ```
            console.log(1);
            setTimeout(function() {
                console.log(2)
            }, 100);
            console.log(3);
            setTimeout(function() {
                console.log(4)
            })
        ```        
        打印结果为 1 3 4 2
        ```
            // 当遇到
            setTimeout(function() {
                console.log(2)
            }, 100);
           // 这块代码时 会在100ms后将function(){console.log}放入异步队列中
            setTimeout(function() {
                console.log(2)
            }); //立刻放入异步队列中
            100ms对于计算机来说是非常非常长的
            当主进程的代码执行完后会在将异步队列的代码放入主进程中，然后在回到异步队列中，看是有后代码需要放入主进程执行，这就是轮询执行
        ```
        ```
            console.log(1);
            $.ajax({
                url: XXXX,
                success: function() {
                    console.log(2)
                } // 当请求成功后将function() {console.log(2)}放入异步队列中
            })
            setTimeout(function() {
                console.log(3)
            }, 100);
        ```
        此时我们只能确认1最先打印，因为我们不确定多久会请求成功
- ES6