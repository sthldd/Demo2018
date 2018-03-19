var top250 = {
  init:function(){
    this.$element = $('#top250')
    this.isLoading = false //loading没有开启
    this.index = 0 //数据初始为0
    this.isFinish = false //当前没有加载全部数据
    this.bind()
    this.start()
  },
  bind:function(){
    var _this = this
    this.$element.scroll(function(){
      _this.start()  //滚动的时候调用start
    })
  },
  start:function(){
    var _this = this
    this.getData(function(data){
      _this.render(data) //一开始获取数据并且渲染
    })
  },
  getData: function(callback){
    var _this = this
    if(_this.isLoading) return;
    _this.isLoading = true
    _this.$element.find('.loading').show()
    $.ajax({
      url: 'http://api.douban.com/v2/movie/top250',
      data: {
        start: _this.index||0
      },
      dataType: 'jsonp'
    }).done(function(ret){
      _this.index += 20
      if(_this.index >= ret.total){
        _this.isFinish = true
      }
      callback&&callback(ret)
    }).fail(function(){
      console.log('数据异常')
    }).always(function(){
      _this.isLoading = false
      _this.$element.find('.loading').hide()
    })  
  },
  render: function(data){
    var _this = this
    data.subjects.forEach(function(movie){
      var template = `<div class="item">
    <a href="#">
    <div class="cover">
    <img src="" alt="">
        </div>
    <div class="detail">
    <h2></h2>
    <div class="extra"><span class="score"></span>分 / <span class="collect"></span>收藏</div>
    <div class="extra"><span class="year"></span> / <span class="type"></span></div>
    <div class="extra">导演: <span class="director"></span></div>
    <div class="extra">主演: <span class="actor"></span></div>
  </div>
  </a>
  </div>`
      var $node = $(template)
      $node.find('a').attr('href', movie.alt)
      $node.find('.cover img')
      .attr('src', movie.images.medium )
      $node.find('.detail h2').text(movie.title)
      $node.find('.score').text(movie.rating.average )
      $node.find('.collect').text(movie.collect_count )
      $node.find('.year').text(movie.year)
      $node.find('.type').text(movie.genres.join(' / '))
      $node.find('.director').text(function(){
        var directorsArr = []
        movie.directors.forEach(function(item){
          directorsArr.push(item.name)
        })
        return directorsArr.join('、')
      })
      $node.find('.actor').text(function(){
        var actorArr = []
        movie.casts.forEach(function(item){
          actorArr.push(item.name)
        })
        return actorArr.join('、')
      })
      _this.$element.find('.container').append($node)
    })
  },
  isToBottom: function(){
    return this.$element.find('.container') <= this.$element.height() + this.$element.scrollTop() + 10
  }
}
var usBox = {
    init: function(){
      console.log('usBox ok')
      this.$element = $('#beimei')
      
      this.start()
    },

    start: function(){
      var _this = this
      this.getData(function(data){
        _this.render(data)
      })
    },
    getData: function(callback){
      var _this = this
      if(_this.isLoading) return;
      _this.isLoading = true
      _this.$element.find('.loading').show()
      $.ajax({
        url: 'http://api.douban.com/v2/movie/us_box',
        dataType: 'jsonp'
      }).done(function(ret){
        callback&&callback(ret)
      }).fail(function(){
        console.log('数据异常')
      }).always(function(){
        _this.$element.find('.loading').hide()
      })  
    },
    render: function(data){
      var _this = this
      console.log(data)
      data.subjects.forEach(function(movie){
        movie = movie.subject
        var template = `<div class="item">
      <a href="#">
      <div class="cover">
      <img src="" alt="">
          </div>
      <div class="detail">
      <h2></h2>
      <div class="extra"><span class="score"></span>分 / <span class="collect"></span>收藏</div>
      <div class="extra"><span class="year"></span> / <span class="type"></span></div>
      <div class="extra">导演: <span class="director"></span></div>
      <div class="extra">主演: <span class="actor"></span></div>
    </div>
    </a>
    </div>`
        var $node = $(template)
        $node.find('a').attr('href', movie.alt)
        $node.find('.cover img')
        .attr('src', movie.images.medium )
        $node.find('.detail h2').text(movie.title)
        $node.find('.score').text(movie.rating.average )
        $node.find('.collect').text(movie.collect_count )
        $node.find('.year').text(movie.year)
        $node.find('.type').text(movie.genres.join(' / '))
        $node.find('.director').text(function(){
          var directorsArr = []
          movie.directors.forEach(function(item){
            directorsArr.push(item.name)
          })
          return directorsArr.join('、')
        })
        $node.find('.actor').text(function(){
          var actorArr = []
          movie.casts.forEach(function(item){
            actorArr.push(item.name)
          })
          return actorArr.join('、')
        })
        _this.$element.find('.container').append($node)
      })
    }
  }
   
  var search = {
    init: function(){
      console.log('usBox ok')
      this.$element = $('#search')
      this.keyword = ''
      this.bind()
      this.start()
    },

    bind: function(){
      var _this = this
      this.$element.find('.button').click(function(){
        _this.keyword = _this.$element.find('input').val()
        _this.start()
      })
    },
    start: function(){
      var _this = this
      this.getData(function(data){
        _this.render(data)
      })
    },
    getData: function(callback){
      var _this = this
      _this.$element.find('.loading').show()
      $.ajax({
        url: 'http://api.douban.com/v2/movie/search',
        data: {
          q: _this.keyword
        },
        dataType: 'jsonp'
      }).done(function(ret){
        callback&&callback(ret)
      }).fail(function(){
        console.log('数据异常')
      }).always(function(){
        _this.$element.find('.loading').hide()
      })  
    },
    render: function(data){
      var _this = this
      console.log(data)
      data.subjects.forEach(function(movie){
        var template = `<div class="item">
      <a href="#">
      <div class="cover">
      <img src="" alt="">
          </div>
      <div class="detail">
      <h2></h2>
      <div class="extra"><span class="score"></span>分 / <span class="collect"></span>收藏</div>
      <div class="extra"><span class="year"></span> / <span class="type"></span></div>
      <div class="extra">导演: <span class="director"></span></div>
      <div class="extra">主演: <span class="actor"></span></div>
    </div>
    </a>
    </div>`
        var $node = $(template)
        $node.find('a').attr('href', movie.alt)
        $node.find('.cover img')
        .attr('src', movie.images.medium )
        $node.find('.detail h2').text(movie.title)
        $node.find('.score').text(movie.rating.average )
        $node.find('.collect').text(movie.collect_count )
        $node.find('.year').text(movie.year)
        $node.find('.type').text(movie.genres.join(' / '))
        $node.find('.director').text(function(){
          var directorsArr = []
          movie.directors.forEach(function(item){
            directorsArr.push(item.name)
          })
          return directorsArr.join('、')
        })
        $node.find('.actor').text(function(){
          var actorArr = []
          movie.casts.forEach(function(item){
            actorArr.push(item.name)
          })
          return actorArr.join('、')
        })
        _this.$element.find('.search-result').append($node)
      })
    }
  }
    
  var app = {
    init: function(){
      this.$tabs = $('footer>div')
      this.$panels = $('section')
      this.bind()
      top250.init()
      usBox.init()
      search.init()

    },
    bind: function(){
      var _this = this
      this.$tabs.on('click', function(){
        $(this).addClass('active').siblings().removeClass('active')
        _this.$panels.eq($(this).index()).fadeIn().siblings().hide()
      })
    }

  }


  app.init()


// $('footer>div').click(function(){
//     var index = $(this).index()
//     $('section').hide().eq(index).fadeIn()
//     $(this).addClass('active').siblings().removeClass('active')
// })

// var index = 0
// start()
// var isLoading = false
// function start(){
//     if(isLoading) return
//     isLoading = true
//     $('.loading').show()
//     $.ajax({
//         url:'http://api.douban.com/v2/movie/top250',
//         type:'GET',
//         data:{
//             start:index,
//             count:20
//         },
//         dataType:"jsonp"
//     }).done(function(ret){
//         console.log(ret)
//         setData(ret)
//         index+=20
//     }).fail(function(){
//         console.log('数据出错了哦亲。。')
//     }).always(function(){
//         isLoading = false
//         $('.loading').hide()
//     })
//  }

//  var clock 
// $('main').scroll(function(){
//     if(clock){
//         clearTimeout(clock)
//     }
//     clock = setTimeout(function(){
//         if($('section').eq(0).height() - 20 <= $('main').height() + $('main').scrollTop()){
//             start()    
//         }
//     },300)
// })

// function setData(data){
//     data.subjects.forEach(function(movie){
//         var tpl = `<div class="item">
//         <a href="#">
//           <div class="cover">
//             <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910813120.webp" alt="">
//           </div>
//           <div class="detail">
//             <h2>霸王别姬</h2>
//             <div class="extra"><span class="score"></span>分 / <span class="collect"></span>收藏</div>
//             <div class="extra"><span class="year"></span> / <span class="type"></span></div>
//             <div class="extra">导演: <span class="director"></span></div>
//             <div class="extra">主演: <span class="actor"></span></div>
//           </div>
//         </a>
//       </div> `
//       var $node = $(tpl)
//       $node.find('a').attr('href',movie.alt)
//       $node.find('.cover img').attr('src', movie.images.medium )
//       $node.find('.detail h2').text(movie.title)
//       $node.find('.detail .score').text(movie.rating.average)
//       $node.find('.detail .collect').text(movie.collect_count)
//       $node.find('.year').text(movie.year)
//       $node.find('.type').text(movie.genres.join('/'))
      
//       $node.find('.director').text(function(){
//         var directorArr = []
//         movie.directors.forEach(function(item){
//         directorArr.push(item.name)
//         })
//         return directorArr.join('、')
//       })

//       $node.find('.actor').text(function(){
//         var actorArr = []
//         movie.casts.forEach(function(item){
//         actorArr.push(item.name)
//         })
//         return actorArr.join('、')
//       })
      
//       $('#top250').append($node)
//     })
// }






