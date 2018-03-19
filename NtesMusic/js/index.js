$(function(){
  $.get('../songs.json').then(function(response){
      let items = response
      items.forEach((i)=>{
        let $li = $(`
        <li>
        <a href="../song.html?id=${i.id}">
          <h3>${i.name}</h3>  
          <p>${i.author}</p> 
            <i class="iconfont icon-play-music"></i>
        </a>
      </li>  
        `)
        $('#musicList').append($li)
      })
       $('#load').remove()
      },function(){
  })
  
  $('.siteNav').on('click','ol.tabItems>li',function(e){
    let $li = $(e.currentTarget).addClass('active')
    $li.siblings().removeClass('active')
    let index = $li.index()
    $li.trigger('tabChange',index)
    $('.tabContent>li').eq(index).addClass('active')
    .siblings().removeClass('active')
  })
  $('.siteNav').on('tabChange',function(e,index){
    let $li = $('.tabContent>li').eq(index)
    if($li.attr('data-download') === 'yes'){
      return 
    }
    if(index === 1){
      $.get('../page2.json').then((response)=>{
        $li.text(response.content)
        $li.attr('data-download','yes')
      })
    }else if(index === 2){
      $.get('../page3.json').then((response)=>{
        return 
        $li.text(response.content)
        $li.attr('data-download','yes')
      })
    }
  })
  let timer = undefined
  $('input#searchSong').on('input',function(e){
    let $input = $(e.currentTarget)
    let value = $input.val().trim()
    if(value === ''){return}
    if(timer){
      clearTimeout(timer)
    }

    timer = setTimeout(function(){
      search(value).then((result)=>{
        timer = undefined
        if(result.length !== 0){
          $('#output').text(result.map((r)=>r.name).join(','))
        }else{
          $('#output').text('没有结果')
        }
      })
  },300)
})  
  function search(keyword){
    return new Promise((resolve,reject)=>{
      var database = [
        {"id":"1","name":"像我这样的人",},
        {"id":"2","name":"十年",},
        {"id":"3","name":"山水之间",},
        {"id":"4","name":"阿刁",}
      ]
      let result = database.filter(function(item){
        return item.name.indexOf(keyword)>=0
      })
      setTimeout(function(){
        resolve(result)
      },(Math.random()* 1000 + 1000))
   }) 
  }
  window.search = search
})
