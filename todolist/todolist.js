;
(function () {
  var listDom = document.querySelector('.navcrn-ipt'); //文本输入对象
  var listOl = document.querySelector('.mid-ol'); //正在进行的li列表
  var listUl = document.querySelector('.mid-ul'); //已经完成的li列表

  var btnDom = document.getElementById('addbtn'); //添加按钮
  var midCtn = document.querySelector('.ctn-middle');//找到中间部分的容器



  function addList() {

    var iptCheDom = document.createElement("input"); //添加表单元素
    iptCheDom.setAttribute('type', 'checkbox'); //设置文本类型
    iptCheDom.classList.add('checkdom');//添加类名

    var btn = document.createElement("BUTTON"); //添加删除按钮
    btn.innerHTML = 'DEL';//给删除按钮命名DEL
    btn.classList.add("delbtn"); //添加类名
    var node = document.createElement("LI"); //添加li元素
    var value = document.createTextNode(listDom.value); //文本框的输出值

    node.appendChild(iptCheDom)//li元素中添加checkbox勾选元素
    node.appendChild(value);//li元素中添加输入的value值
    node.appendChild(btn);//li元素中添加删除按钮
    listDom.value = '';//清空input输入框的内容
    listOl.appendChild(node);//ol后面添加子节点li元素

    //  删除操作
    function handleDelTodo() {//设置一个handleDelTodo方法
      var ol = e.target.parentNode.parentNode;//设置当前位置的父元素的父元素---》就是ol
      var currLi = e.target.parentNode;//设置当前元素的父元素---》就是li
      ol.removeChild(currLi);//ol移除子节点li
    }
    btn.addEventListener('click', handleDelTodo);//事件方法绑定
  }
  btnDom.onclick = function () {//设置添加按钮的点击事件
    addList()
  }


  /**
   * 设置事件委托---》委托对象为中间的容器
   * 
   */
  midCtn.addEventListener('click', function (e) {
    if (e.target.nodeName.toLowerCase() === 'input') {//e.target.nodeName判断当前元素是否是‘input’
      var li = e.target.parentNode;//找到li的位置为当前元素的父元素
      var cnode = li.cloneNode(true);//克隆整个li元素

      if (li.parentNode.className === 'mid-ol' && e.target.checked) {//判断li的父元素的类名是否为'mid-ol'并且判断checkbox是否被勾选了
        listUl.appendChild(cnode);
        listOl.removeChild(li)
      } else {
        listOl.appendChild(cnode);
        listUl.removeChild(li)
      }
    }
    if (e.target.nodeName.toLowerCase() === 'button') {//e.target.nodeName判断当前元素是否是‘button’
      var ol = e.target.parentNode.parentNode;
      var currLi = e.target.parentNode;
      ol.removeChild(currLi);
    }
  })
})();
