var canvas = document.getElementById('xxx'); // canvas上下文
var context = canvas.getContext('2d'); // canvas上下文
autosetCanvasSize(canvas)

ListenToUser(canvas)
clear.onclick = function(){
  context.clearRect(0,0,canvas.width,canvas.height) //垃圾桶清除
}

var lineWidth = 1
thin.onclick = function(){   //细线
  lineWidth = 3
  thin.classList.add('size')
  thick.classList.remove('size')
  middle.classList.remove('size')
}

middle.onclick= function(){
  lineWidth = 5
  thick.classList.remove('size')
  thin.classList.remove('size')
  middle.classList.add('size')
}
thick.onclick = function(){  //粗线
  lineWidth = 7
  thick.classList.add('size')
  thin.classList.remove('size')
  middle.classList.remove('size')
}
download.onclick = function(){   //下载
  var a = document.createElement("a");
    document.body.appendChild(a);
    var imgName = window.prompt("请您为您的爱图保存名字：", "");
    if (imgName) {
      a.setAttribute("download", imgName + ".png");
      a.setAttribute("href", canvas.toDataURL("image/png"));
      a.click();
    } else {
      return;
    }
}
yellow.onclick = function(){
  document.getElementById("xxx").style.background = "yellow";
}

$('#color>li').click(function(){
  sb($(this)[0],$(this)[0].id)
  })
 function sb(node,index){
  context.strokeStyle = index
  context.fillStyle = 'index'
  $(node).addClass('active').siblings().removeClass('active')
}

var eraserEnabled = false //默认橡皮擦不开启
pen.onclick = function(){
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}



  /* 高度宽度相关 */
function  autosetCanvasSize(canvas){
  setCanvasSize() 

  window.onresize = function(){
    setCanvasSize()     //监听用户窗口发生大小改变时 屏幕不会发生改变
  }

  function setCanvasSize(){
    var pageHeight = document.documentElement.clientHeight  //获取页面高度
    var pageWidth = document.documentElement.clientWidth  //获取页面宽度

    canvas.width = pageWidth  //画板宽度等于页面宽度
    canvas.height = pageHeight //画板高度等于页面高度
  }
  
}

function drawCircle(x,y,radius){
  context.beginPath()
  context.fillStyle = 'black'
  context.arc(x,y,radius,0,Math.PI*2);//x,y,半径,从多少度开始，多少度结束
  context.fill() 
}

function drawLine(x1,y1,x2,y2){
  
  context.beginPath()
  context.moveTo(x1,y1) // 起点
  context.lineWidth = lineWidth //线的宽度
  context.lineTo(x2,y2) //终点
  context.stroke()
  context.closePath()
}


function ListenToUser(canvas){
  
  var using = false //画笔没有开启
  var lastPoint = {'x':undefined,'y':undefined}
  
  
  
if(document.body.ontouchstart !== undefined){
canvas.addEventListener("touchstart",function(a){
  
  var x = Math.floor(a.touches[0].clientX)
  var y = Math.floor(a.touches[0].clientY)
  console.log(x,y)
  using = true //点的时候才可以画
  if(eraserEnabled){  //如果橡皮擦开启了
    context.clearRect(x-5,y-5,10,10) //我就去清除
  }else{ 
    lastPoint = {"x":x ,"y":y}
  }
})


 canvas.addEventListener("touchmove",function(a){
    
    var x = Math.floor(a.touches[0].clientX)
    var y = Math.floor(a.touches[0].clientY)

    if (!using) {return}

    if (eraserEnabled) {
      context.clearRect(x - 5, y - 5, 10, 10)
    } else {
      var newPoint = {
        "x": x,
        "y": y
      }
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }

 }); 
  canvas.addEventListener("touchend",function(a){
    using = false
 })
}else{
    canvas.onmousedown = function(a){ //鼠标点击事件
    var x = a.clientX
    var y = a.clientY
    using = true //点的时候才可以画
    if(eraserEnabled){  //如果橡皮擦开启了
      context.clearRect(x-5,y-5,10,10) //我就去清除
    }else{ 
      lastPoint = {"x":x ,"y":y}
    }
   }
  
  
  
  canvas.onmousemove = function(a) {
    
    var x = a.clientX
    var y = a.clientY

    if (!using) {return}

    if (eraserEnabled) {
      context.clearRect(x - 5, y - 5, 10, 10)
    } else {
      var newPoint = {
        "x": x,
        "y": y
      }
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }
  }

  canvas.onmouseup = function(a){ //鼠标离开事件
    using = false
    }
   }
  }
