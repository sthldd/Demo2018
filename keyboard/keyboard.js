    var hashA = init()
    var keys = hashA['keys']
    var hash = hashA['hash']

    function getFormLocalStorage(name){
        return JSON.parse(localStorage.getItem(name) || 'null')
    }

    function tag(tagName){
        return  document.createElement(tagName)
    }
  
   for(var index = 0 ;index < keys['length'];index = index + 1){
      var div = tag('div')
      div.className = 'row'
      mainx.appendChild(div)
      var row = keys[index]
      

      function createSpan(textContent){
        var span = tag('span')
        span.textContent = textContent
        span.className = 'text'
        return span
      }

      function createButton(id){
        var button = tag('button')
            button.textContent = 'E'
            button.id = id
            button.onclick = function(board){
            var button2 = board['target']
              var img2 = button2.previousSibling
              var key = button2['id']
              var web = prompt('请输入一个网址')
              hash[key] = web
              img2.src = 'http://' + web + '/favicon.ico'
              img2 .onerror = function(picture){
                picture.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
            }
                localStorage.setItem('uu',JSON.stringify(hash))
            }
            return button
      }
        

    function createImage(damain){
      var img = tag('img')
           if(damain){
              img.src = 'http://' + damain + '/favicon.ico'
           }else{
              img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
           }
           img.onerror = function(picture){
              picture.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
           }
          return img
    }

    for(var index2 = 0;index2 < row['length'];index2 = index2 + 1){
          var span = createSpan(row [index2])
          var button = createButton(row[index2])
          var img = createImage(hash[row[index2]])
        
          var kbd = tag('kbd')
          kbd.className = 'key'
          kbd.appendChild(img)
          kbd.appendChild(button)
          kbd.appendChild(span)
          div.appendChild(kbd)
          }
          
       }


  // 监听键盘事件
  document.onkeypress = function(board){
     var key = board['key']
     var website = hash[key]
      window.open('http://' + website, '_blank')
      
  }
  
  function init (){
    var keys = {
      '0' : {0:'1',1:'2',2:'3',3:'4',4:'5',5:'6',6:'7',7:'8',8:'9',9:'0',length:10},
      '1' : {0:'q',1:'w',2:'e',3:'r',4:'t',5:'y',6:'u',7:'i',8:'o',9:'p',length:10},
      '2' : {0:'a',1:'s',2:'d',3:'f',4:'g',5:'h',6:'j',7:'k',8:'l',length:9},
      '3' : {0:'z',1:'x',2:'c',3:'v',4:'b',5:'n',6:'m',length:7},
      'length': 4
    }
    var hash = {
      'q': 'qq.com',
      'w': 'weibo.com',
      'e': 'ele.me',
      'r': 'renren.com',
      't': 'tianya.com',
      'y': 'youtube.com',
      'u': undefined,
      'i': 'iqiyi.com',
      'o': 'opera.com',
      'p': 'pptv.com',
      'a': 'acfun.tv',
      's': 'sohu.com',
      'z': 'zhihu.com',
      'x':'xunlei.com',
      'c':'cctv.com',
  } 

 // var hashInLocalStorage = JSON.parse(localStorage.getItem('uu') || 'null') 变形为下面
    var hashInLocalStorage = getFormLocalStorage('uu')
      if(hashInLocalStorage){
        hash = hashInLocalStorage
    }
     return {
       "keys" : keys,
       "hash" : hash
     }
  } 

