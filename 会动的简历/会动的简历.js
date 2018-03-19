function writeCode(prefix,code,fn){
  let domCode = document.querySelector('#code')
  domCode.innerHTML = prefix || ''
  let n = 0 
  let id = setInterval(()=>{
      n+=1
      domCode.innerHTML =  Prism.highlight(prefix +code.substring(0,n), Prism.languages.css)
      styleTag.innerHTML = prefix + code.substring(0,n)
      domCode.scrollTop = domCode.scrollHeight
      if(n>=code.length){
          window.clearInterval(id)
          fn && fn.call()
      }
  },1)
}

function writeMarkdown(markdown,fn){
   let domPaper = document.querySelector('#paper>.content')
   let n = 0
   let id = setInterval(()=>{
    n+=1
    domPaper.innerHTML = markdown.substring(0,n)
    domPaper.scrollTop = domPaper.scrollHeight
    if(n>=markdown.length){
        window.clearInterval(id)
        fn && fn.call()
    }
},1)

}

var result = `/*
*你好，我是老马

*我来介绍一下我自己

*算了，还是用代码来介绍我吧

*接招

*/

*{
  transition:all 1s;
}

html{
  background: #eee;
}

#code{
  padding:16px;
}

/*现在我们需要让代码高亮*/

.token.selector{
    color: #690;
}

.token.property{
    color: #905;
}

.token.function{
    color: #DD4A68;
}

/* 加一个呼吸效果 */

#code{
  animation: breath 0.5s infinite alternate-reverse;
}

/*我们来让它翻个跟头*/

#code{
    transform:rotate(360deg);
}

/* 现在正式开始 */

/*我需要一张白纸*/

#code-wrapper{
    width: 50%; left: 0; position: fixed; 
    height: 100%;
}

#paper > .content{
    display:block;
}

/* 于是我就可以在白纸上写字了，请看右边 */
` 
var result2 = ` 
/* 接下来用一个优秀的库 marked.js

* 把 Markdown 变成 HTML

*/




`
var md = `
# 自我介绍

我叫 XXX
1990 年 1 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位

# 技能介绍

熟悉 JavaScript CSS

# 项目介绍

1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

`
var result3 = `
/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`

writeCode('', result, ()=>{ 
    createPaper(() => {
      writeMarkdown(md, ()=> {
        writeCode(result, result2, ()=>{
          MarkdownToHtml(()=>{
            writeCode(result + result2, result3, ()=> {
              console.log('完成')
            })
          })
        })
      })
    })
  })
function createPaper(fn){
    var paper = document.createElement('div')
    paper.id='paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn && fn.call()
}
function MarkdownToHtml(fn){
    var div = document.createElement('div')  
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.replaceWith(div)
    fn && fn.call()
  }
