<template>
  <div id="app">
    <div class="music" :class="{white:!scr,stop:!musicPlay}" @click="toggleMusic">
      <audio src="music.mp3" autoplay loop id="audio"></audio>
    </div>

    <div id="swipeScroll" v-if="scr&&!notConcerned">
      <div class="pp aa">
        <div class="show"></div>
        <div class="down"></div>
      </div>
      <div class="pp bb">
        <div class="show"></div>
        <div class="down"></div>        
      </div>
      <div class="pp cc">
        <div class="show">
          <div class="show3">
            <div :class="[show==1?'active':'' ,'mask' ,'animate']" v-if="sssss"></div>
          </div>
        </div>
        <div class="down"></div>        
      </div>
    </div>

    <div class="Participate" v-if="!notConcerned">
      <div class="bg1">
          <div class="logo">
            
          </div>
      </div>
      <div class="sign">
        <p>曾经与2016订下过很多约定</p>
        <p>去冰岛看极光，非洲看动物，菲律宾潜水...</p>
        <p>而今，它们即将成为遗憾</p>
        <p>你是否感到不甘心</p>
        <p>说出你的旅行遗憾</p>
        <p>赢取<span class="big fff">免费签证+机票酒店</span></p>
        <p class="fff rules" v-on:click="pop(1)">活动规则及大奖设置<span>></span></p>
      </div>
      <form class="part">
        <p class="title">报名参加</p>
        <select placeholder="aaa" v-model="terminal">
          <option disabled>选择遗憾目的地</option>
          <option v-for="item in arr">{{item}}</option>
        </select>
        <textarea placeholder="说说你的旅行想法（15-140字）" maxlength="140" v-model="content">
          
        </textarea>
        <div  class='button' v-on:click="submit">马上集赞</div>
        <div class="ok" v-if="ok"></div>
        
        <p class="red" v-on:click="pop(2)">邀请小伙伴一起玩</p>
      </form>
      <div class="bottom-bar">
        
      </div>
    </div>
    
    <div class="not-concerned"  v-if="notConcerned">
      <div class="bg1">
          <div class="logo">
            
          </div>
      </div>
      <div class="sign">
        <p>曾经与2016订下过很多约定</p>
        <p>去冰岛看极光，非洲看动物，菲律宾潜水...</p>
        <p>而今，它们即将成为遗憾，你是否感到不甘心</p>
        <p>说出你的旅行遗憾</p>
        <p>赢取<span class="big fff">免费签证+机票酒店</span></p>
        <p>就是现在</p>
        <p class="fff rules" v-on:click="pop(1)">活动规则及大奖设置<span>></span></p>
      </div>  
      <div class="bottom-bar">
          <div class="btn"  v-on:click="pop(3)">立即参与</div>
          <div class="des" v-on:click="pop(2)">邀请小伙伴一起玩</div>
      </div>    
    </div>
    
    <div class="popup" id="popup" v-if="pooBox" v-on:click="close">
      <div class="content" @click.stop="cancel" v-if="up==1">
        <div class="timing">活动时间</div>
        <p class="time">2016.12.23-2016.12.28</p>
        <p class="deadline">(12月28日 23:59:59 集赞截止)</p>
        <p class="methods-title">参与方式</p>
        <ol>
          <li>关注【熊猫旅行服务】公众号（xm-visa）, 进入活动页面提交遗憾目的地和感言。</li>
          <li>邀请好友为自己投票, 每个微信号只能投票一次。由点赞数确定排名, 按排名高低赢取相应奖励。</li>
        </ol>
        <p class="methods-title set">奖项设置</p>
        <div class="top1">
          <p><span>一等奖</span>1名</p>
          <div>遗憾目的地豪华双人旅行套餐</div>
          <div>双人签证+双人机票+3晚品质民宿</div>
        </div>
        <div class="flexBox">
          <div class="flexItem">
            <p><span>二等奖</span>1名</p>
            <div>旅行基金1500元</div>
          </div>
          <div class="flexItem">
            <p><span>三等奖</span>1名</p>
            <div>旅行基金500元</div>
          </div>
        </div>
        <div class="flexBox">
          <div  class="flexItem">
            <p><span>四等奖</span>15名</p>
            <div>KLOOK万能转换插座1个 + 萌萌哒熊猫眼罩1个</div>            
          </div>
          <div class="flexItem">
            <p><span>参与奖</span>不限</p>
            <div>熊猫签证APP<br>20元无门槛优惠券</div>            
          </div>
        </div>
        <p class="methods-title set">其他说明</p>
        <ol>
          <li>获奖名单将于12月29日在熊猫旅行服务公众号和熊猫签证官方微博发布，请获奖者于2016年12月31日前在微信公众号联系我们，过期未联系即视为自动放弃。</li>
          <li>一等奖奖品为价值7000元旅行套餐，包括：有效期三个月（2017.1.1-2017.4.1）的双人往返机票、目的地国家签证、Airbnb品质民宿、当地双人游体验券</li>
        </ol> 
        <p class="bottom-bar">本活动最终解释权归熊猫签证所有</p>      
      </div>
      <div class="share" v-if="up==2">
        
      </div>
      <div class="guanzhu" v-if="up==3" v-on:click.stop="cancel">
        <div>
          <img src="./imgs/focus.jpg" style="width:100%;height:100%">
        </div>
        <p>长按识别二维码</p>
        <p>关注【熊猫旅行服务】公众号</p>
        <p>点击下方菜单参与活动</p>   
      </div>      
      <img class="close" src="./imgs/btn-close.png" ></img> 
    </div>    
  </div>
</template>

<script>
import AlloyFinger from 'AlloyFinger'

export default {
  name: 'app',
  data(){
    return {
      //Participate:true,
      notConcerned:false,
      arr:['日本','泰国','韩国','马来西亚','新加坡','柬埔寨','台湾','印度','印度尼西亚','澳大利亚','新西兰','土耳其','越南','尼泊尔','菲律宾','俄罗斯','加拿大','美国','德国','法国','意大利','西班牙','希腊'],
      peop:[0,0,0,0,0,0,0,0],
      open_id:this.$route.query.openid || localStorage.openid,
      scrollY1:"",
      scr:true,
      musicPlay:true,
      timer:true,
      up:"",
      pooBox:0,
      show:0,
      sssss:1,
      terminal:"选择遗憾目的地",
      content: "",
      isPost:false,
      postid:"",
      startMusic:false
    }
  },
  computed:{
    ok:function(){
      var o =  this.terminal=="选择遗憾目的地"||this.content.length<14
      return o
    }
  },
  methods:{
    submit(){
      this.$http.post("https://api.11visa.com/wxs/addpost",{'openid':this.open_id,'content':this.content,'title':this.terminal})
      .then(
        (response)=>{if(response.body.ret==0){
          this.$router.push({path:'share',query:{uid:response.body.body.postid,openid:this.open_id}})
        }else{
          alert(response.body.msg);
        }}
      )
    },
    cancel(){
      return false
    },
    toggleMusic(){
      var ad = document.getElementById("audio");
      var el = document.querySelector('.music');
      this.startMusic=true;

      if(ad.paused){
        this.musicPlay=true;
        ad.play();
      }else{
        this.musicPlay=false;
        ad.pause();
      }
    },
    pop(i){
      this.pooBox=1;
      this.up=i;
      var h = document.documentElement.clientHeight || document.body.clientHeight;      
      document.getElementById("app").style.height=h+'px'
      document.getElementById("app").style.overflow='hidden';
    },
    close(){
      this.pooBox=0;
      document.getElementById("app").style.overflow="";
    },
    getState(){
      this.$http.post("https://api.11visa.com/wxs/getuserstatus",{openid:this.open_id})
        .then(
          (response)=>response.body.body
        ).then(
          (data)=> {
            if(data.status!=0){             
              return this.notConcerned=true;
            }

            if(this.isPost==1){
              startup=1;
              return this.$router.push({path:'/personal',query:{postid:this.postid,openid:this.open_id}})
            }


            var _this=this;
            wx.ready(function(){
              _this.shareBuild();
            });
          },()=>{
            location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe8fe87fd2044c871&redirect_uri=https%3A%2F%2Fapi.11visa.com%2Fwxs%2Fwxs_userinfo_query&response_type=code&scope=snsapi_userinfo&state=/newyear/index.htm%23/?#wechat_redirect";
          }
        )
    },
    shareBuild:function(){
      wx.onMenuShareTimeline({
        title: '2016年，说好要去的旅行却还没实现，参加活动免费帮你实现旅行梦想！', // 分享标题
        link: 'https://h5.11visa.com/newyear/index.htm#/', // 分享链接
        imgUrl: 'http://visa.oss-cn-shenzhen.aliyuncs.com/web/imgs/share.png', // 分享图标
        success: function () {

        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });

      wx.onMenuShareAppMessage({
        title: '熊猫签证，弥补2016年的旅行遗憾！', // 分享标题
        desc: '2016年，说好要去的旅行却还没实现，参加活动免费帮你实现旅行梦想！', // 分享描述
        link: 'https://h5.11visa.com/newyear/index.htm#/', // 分享链接
        imgUrl: 'http://visa.oss-cn-shenzhen.aliyuncs.com/web/imgs/share.png', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });

      wx.showOptionMenu();
      wx.showAllNonBaseMenuItem();
    }
  },
  created(){
    document.documentElement.scrollTop=0;
    document.body.scrollTop=0;
    var href=location.href;

    if(!this.open_id || this.open_id=="undefined"){
      return location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe8fe87fd2044c871&redirect_uri=https%3A%2F%2Fapi.11visa.com%2Fwxs%2Fwxs_userinfo_query&response_type=code&scope=snsapi_userinfo&state=/newyear/index.htm%23/?#wechat_redirect";
    } 

    localStorage.openid = this.open_id;

    this.$http.post("https://api.11visa.com/wxs/getuser",{'openid':this.open_id})
      .then(
        (response)=>response.body.body
      ).then(
        (data)=> {
          this.postid=data.post[0].postid;
          this.isPost=data.ispost==1;

          this.getState();
        },()=>{          
          location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe8fe87fd2044c871&redirect_uri=https%3A%2F%2Fapi.11visa.com%2Fwxs%2Fwxs_userinfo_query&response_type=code&scope=snsapi_userinfo&state=/newyear/index.htm%23/?#wechat_redirect";
        }
      )

  },
  mounted(){

    var h = document.documentElement.clientHeight || document.body.clientHeight;
    var swipeScroll = document.getElementById("swipeScroll");
    swipeScroll.style.height=h+'px';

    [].forEach.call(swipeScroll.querySelectorAll('.pp .show'),function(el){
      el.style.transition="transform 1s ease-in-out,opacity 1.5s ease-in-out";
      console.log(el);
    }); 

    var _this=this;

    document.documentElement.ontouchstart=function(){
      if(!_this.startMusic){
        document.getElementById("audio").play();
      }
    };

    var shows=[
      document.querySelector('.pp.aa .show'),
      document.querySelector('.pp.bb .show'),
      document.querySelector('.pp.cc .show')
    ];
    var downs=[
      document.querySelector('.pp.aa .down'),
      document.querySelector('.pp.bb .down'),
      document.querySelector('.pp.cc .down')
    ];

    setTimeout(function(){
      shows[0].style.transform="none";
      shows[0].style.opacity=1;
    },300);

    setTimeout(function(){
      downs[0].style.opacity=1;
      _this.timer=false;
    },1200);

    var currentIndex=0;
    new AlloyFinger(swipeScroll, {
        touchMove:function(evt) {
          evt.preventDefault();
        },
        swipe:function(evt){
            if(evt.direction==="Up"){
                if(currentIndex<2) {
                    var dis=h*(currentIndex+1);
                    var count = 30;
                    var step = h/count;
                    // swipeScroll.scrollTop= dis
                    if(_this.timer==false){
                      _this.timer = true;
                      downs[currentIndex].parentNode.removeChild(downs[currentIndex]);

                      var t = setInterval(function(){
                        count--;
                        swipeScroll.scrollTop= dis - step*count;
                        if(count==0){
                          currentIndex++;

                          setTimeout(function(){
                            shows[currentIndex].style.transform="none";
                            shows[currentIndex].style.opacity=1;
                          },100);

                          if(currentIndex==2){
                            setTimeout(function(){
                              _this.show=1
                            },1100);

                            setTimeout(function(){
                              downs[currentIndex].style.opacity=1;
                            },1700);
                          }else{
                            setTimeout(function(){
                              downs[currentIndex].style.opacity=1;
                            },1300);
                          }

                          setTimeout(function(){
                            _this.timer = false;
                          },1000);

                          clearInterval(t);
                          count=10;
                        }
                      },17)
                    }
                }else if(currentIndex==2){
                  //swipeScroll.style.height=0;

                  document.querySelector('.Participate').style.transform="none";

                  setTimeout(function(){
                    _this.sssss=0;
                    _this.scr=false
                  },1000)
                }
            }else {
                swipeScroll.scrollTop=h*currentIndex
            }
        }
    });    
  }
}
</script>

<style>
@keyframes music{
  from{
    transform:rotateZ(0);
  }
  to{
    transform:rotateZ(360deg);
  }
}
@-webkit-keyframes music{
  from{
    transform:rotateZ(0);
  }
  to{
    transform:rotateZ(360deg);
  }
}

.music{
  position:fixed;
  top:15px;
  right:20px;
  width:28px;
  height:28px;
  background:url(../imgs/music-lan.png) no-repeat;
  background-size:cover;
  z-index:10;
  animation:music 2.5s linear infinite;
  -webkit-animation:music 2.5s linear infinite;
}
.music.white{
  background-image:url(../imgs/music-bai.png);
}
.music.stop{
  animation-play-state:paused;
  -webkit-animation-play-state:paused;
}
.popup{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.7);
  text-align: center;
  font-size: .13rem;
  color: #777;
  z-index:20;
}
.popup .content{
  width: 3.25rem;
  position: absolute;
  top: .4rem;
  bottom: 1.15rem;
  left: 50%;
  transform:translateX(-50%);
  background-color: #fff;
  border-radius: .1rem;
  padding: 0 .23rem;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.popup .timing{
  font-size: .15rem;
  color: #333;
  height: .6rem;
  line-height: .6rem;
  text-align: center;
}
.popup .time{
  font-size: .18rem;
  color: #ff0040;
  text-align: center;
}
.popup .deadline{
  margin-top: .1rem;
  font-size: .12rem;
  color: #777;

}
.popup .methods-title{
  font-size: .15rem;
  color:#333;
  margin-top: .3rem;
  position: relative;
}
.popup .methods-title:after{
  content:"";
  width: .27rem;
  height: 1px;
  position: absolute;
  left: .77rem;
  top: 50%;
  background-color: #444;

}
.popup .methods-title:before{
  content:"";
  width: .27rem;
  height: 1px;
  position: absolute;
  right: .77rem;
  top: 50%;
  background-color: #444; 

}
.popup ol{
  margin-top: .2rem;
   font-size: .13rem;
   margin-left: 0;
   list-style: decimal;
   padding-left: .08rem;
   color: #777;
   text-align: left;
   line-height: .2rem;
}
.popup ol li{
  margin-top: .08rem
}
.popup .set{
  margin-top: .24rem;
}
.popup .flexBox{
  display: flex;
  margin: .05rem -0.03rem;
}
.popup .flexItem{
  margin: .03rem;
  width: 1.4rem;
  border:1px solid #ff9ca0;
  border-radius: .03rem;
  padding: .1rem;
  text-align: left;
  font-size: .12rem;
  flex:1;
  align-items:center;
  min-height:72px;
}
.popup .flexItem span{
  font-size: .18rem;
  color: #ff0040;
  margin-right: .04rem;
}
.popup .flexItem div{
  margin-top: .05rem;
  line-height:1.6;
}
.popup .top1{
  margin: auto;
  border: 1px solid #ff9ca0;
  text-align: left;
  padding: .1rem;
  border-radius: .04rem;
  margin-top: .1rem;
  margin-bottom: .02rem;
}
.popup .top1 span{
  font-size: .18rem;
  color: #ff0040;
  margin-right: .04rem;
}
.popup .bottom-bar{
  color:#444;
  font-size: .13rem;
  margin-top: .5rem;
  margin-bottom: .15rem;
}
.close{
  width: .15rem;
  height: .15rem;
  position: absolute;
  bottom: .55rem;
  left: 50%;
  transform:translateX(-50%);
}
.popup .share{
  width: 100%;
  height: 100%;
  background-image: url('../imgs/fenxiang.png');
  background-position: 80% .2rem;
  background-size: 70%;
  background-color: rgba(255,255,255,0);
}
.popup .guanzhu{
  position: absolute;
  top: .75rem;
  left: 50%;
  bottom: 1.37rem;
  width: 3.2rem;
  transform:translateX(-50%);
  background-color: #fff;
  border-radius: 9px;
}
.popup .guanzhu div{
  width: 2.4rem;
  height: 2.4rem;
  margin-top: .4rem;
  margin-left: .4rem;
  padding: .1rem;
  box-sizing: border-box;
  margin-bottom: .25rem;
  border: 1px solid #a6a6a6;
}
.popup .guanzhu p{
  line-height: .23rem;
  color: #444;
}


#ap {
  font-family: 'Pingfang SC', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #000034;

}

#swipeScroll{
  height:160px;
  margin: 0 auto;
  overflow: scroll;
  font-size: 0;
  position: relative;
  box-sizing: border-box;
  background-size: 100%;
}
.pp{
  position: relative;
  height: 100%; 
  background-color: #fff;
  overflow: hidden;
}
.pp .show{
  position: relative;
  background-position: center .35rem;
  background-size: 95% auto;
  height: 100%; 
  opacity:0;
  transform: translateY(-10%);
}
.aa .show{
  background-image: url('../imgs/p1.png');
}
.bb .show{
  background-image: url('../imgs/p2.png');
}
.cc .show{
   background-image: url('../imgs/p3.png');
}
.animate{
  transition: all 2s;
}
#swipeScroll .down{
  height: .6rem;
  background:url('../imgs/down.png');
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 10%;
  width: 100%;
  transition:all 500ms;
  opacity:0;
  position: absolute;
  left:0;
  right:0;
  bottom:-5px;
}
.cc .show3{
  position: absolute;
  bottom: 60px;
  left: 0;
  height: 1.2rem;
  width: 100%;
  background-size: 70%;
  background-position: 50% 50%;
  background-image: url(../imgs/pp3.png);
}
.cc .show3 div{
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #fff;
  opacity: 1
}
.cc .show3 .active{
  opacity: 0;
}




.Participate{
  color: #2c3e50;
  background-color: #000034;
  position: fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  z-index:1;
  transform: translateY(100%);
  transition:all 800ms;
}
.Participate .bg1{
  height: 1.8rem;
  background-image: url('../imgs/bg1.png');
  background-size: 110%;
  background-position: 50% 50%;
  padding: 12px 12px
}
.Participate .bg1 .logo{
  height: .5rem;
  width: .88rem;
  background-size: 100%;
  color: rgba(255,255,255,255,.94);
  font-size: .14rem;
  background-image: url('../imgs/logo@2x.png');
}
.Participate .sign{
  height: 2.53rem;
  background-position: 0% 50%;
  background-image: url('../imgs/shape.png');
  font-size: .13rem;
  color: #b9b9be;
  padding-top: .4rem;
  background-size: 98%
}
.Participate .sign p{
  text-align: center;
  line-height: .25rem
}
.Participate .sign .big{
  font-size: .16rem;
}
.Participate .sign .fff{
  color: #fff
}
.Participate .sign .rules{
  margin: auto;
  width: 1.5rem;
  margin-top: .12rem;
  position: relative;
 

}
.Participate .sign .rules:after{
  position: absolute;
  content:"";
  bottom: 0;
  left: 50%;
  transform:translateX(-50%);
  width: 1.33rem;
  height: 0.02rem;
  background-image: url('../imgs/underline.png');
}
.Participate .sign p span{
  margin-left: 4px;
}
.Participate .part{
  width: 3.20rem;
  height: 3.93rem;
  font-size: .14rem;
  background-color: #fff;
  margin: auto;
  margin-top: .08rem;
  position: relative;
  border-radius: .08rem;
  background-image: url('../imgs/bottomBg.png');
  background-position: bottom;
}
.Participate .part p.title {
  font-size: .15rem;
  text-align: center;
  line-height: .55rem;
  height: .55rem;
  position: relative;
}
.Participate .part p.title:after{
  content: "";
  position: absolute;
  top:50%;
  left: .99rem;
  width: .27rem;
  height: 1px;
  background-color: #444;
}
.Participate .part p.title:before{
  content: "";
  position: absolute;
  top:50%;
  right: .99rem;
  width: .27rem;
  height: 1px;
  background-color: #444;
}
.Participate .part select{
  width: 2.6rem;
  height: .4rem;
  position: absolute;
  border: 1px solid #e9e9e9;
  border-radius: 3px;
  top: .55rem;
  left: 50%;
  transform: translateX(-50%);
  color: #333;
  background-color: #fff;
  padding-left: .08rem;
  -webkit-appearance:none;
}
.Participate .part textarea{
  width: 2.6rem;
  height: 1.3rem;
  position: absolute;
  border: 1px solid #e9e9e9;
  border-radius: 3px;
  top: 1.1rem;
  left: 50%;
  transform: translateX(-50%);
  color: #333;
  background-color: #fff;  
  padding: .11rem;
}
.Participate .ok{
  z-index: 99;
  position: absolute;
  top: 2.65rem;
  height: .4rem;
  width: 2.4rem;
  left: 50%;
  transform: translateX(-50%);
  background-color:rgba(255,255,255,0.5);  
}
.Participate .part .button{
  position: absolute;
  top: 2.65rem;
  height: .4rem;
  width: 2.4rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  background-image: url('../imgs/button2.png');
  border: none;
  font-size: .15rem;
  color: #fff;
  text-align: center;
  line-height: .4rem; 
  -webkit-appearance: none ;
}
.Participate .part .red{
  position: absolute;
  width: 100%;
  bottom: .5rem;
  color:#ff5a60;
  text-align: center;
  font-size: .14rem
}
.Participate .bottom-bar{
  height: 1.55rem;
  background-image: url('../imgs/bottomBar.png');
  background-size: 140%;
  margin-top: .17rem;
  background-position: -.78rem .05rem
}


.share .show,.personal .show,.rank .show{
  background-image: url('../imgs/shape.png');
  background-position: 0 2.6rem;

}
.share{
   background-color: #000034
}
.share .top{
  background-color: #fff;
  width: 3.4rem;
  margin: auto;
  padding-top: 1.35rem;
  border-radius: .03rem;
  font-size: .12rem;
  color:#777;
}
.share .invite{
  position: absolute;
  top: 0;
  z-index:3;
  left: 0;
  height: 1.35rem;
  width: 100%;
  background-image: url('../imgs/invite.png');
  background-position: 0 -2px ;
}
.share .top .top1 p,.personal .top .top1 p,.rank .top .top p{
  padding: 0 0.5rem;
  text-align: center;
  line-height: .18rem;
}
.share .top .location,.personal .top .location,.rank .top .location .rank{
  height: .2rem;
  margin: auto;
  display: flex;
  justify-content:center;
  align-items:center;
  font-size:  .18rem;
  color:#444;
  margin-top: .24rem;
}
.share .top .location div,.personal .top .location div,.rank .top .location div{
    background-image: url('../imgs/location.png');
    width: .14rem;
    height: .18rem;
    margin-right: .05rem;
}
.share .top .decora,.personal .top .decora ,.rank .top .location div{
  width:.04rem;
  height: .04rem;
  border:1px solid #b9b9b9;
  position: relative;
  margin: .14rem auto;
  border-radius:50%;
}
.share .top .decora:after,.personal .top .decora:after,.rank .top .decora:after{
  content:'';
  width: .4rem;
  height: 1px;
  position: absolute;
  top: 50%;
  left: -.55rem;
  background-color: #b9b9b9;
}
.share .top .decora:before,.personal .top .decora:before,.rank .top .decora:before{
  content:'';
  width: .4rem;
  height: 1px;
  position: absolute;
  top: 50%;
  right: -.55rem;
  background-color: #b9b9b9;
}
.share .top .pic,.personal .top .pic,.rank .top .pic{

  width: .6rem;
  height: .6rem;
  border-radius: 50%;
  margin: auto;
}
.share .top .name,.personal .top .name,.rank .top .name{
  text-align: center;;
  margin: auto;
  width: .6rem;
  height: .12rem;
  font-size: .12rem;
  margin-top: .05rem;
}
.share .top .ranking,.personal .top .ranking,.rank .top .ranking{
  font-size: .12rem;
  color: #444;
  display: flex;
  margin-top: .15rem;
  justify-content:center;
  align-items:center;
}
.share .top .ranking span,.personal .top .ranking span,.rank .top .ranking span{
  height: .18rem;
  font-size: .18rem;
  color: #ff5a60;
  position:relative;
  top:-5px;
  vertical-align:middle;
  display:block;
}
.share .top .thumb,.personal .top .thumb,.rank .top .thumb{
  height: .2rem;
  display: flex;
  align-items:center;
  justify-content:left;
  margin-top: .22rem;
}
.share .top .thumb .like,.personal .top .thumb .like,.rank .top .thumb .like{
  width: .2rem;
  height: .2rem;
  background-image: url('../imgs/like.png');
  background-size: 90%;
  margin-right: .02rem;
  margin-left: .3rem
}
.share .top .thumb .peo,.personal .top .thumb .peo,.rank .top .thumb .peo{
  height: .2rem;
  width: .2rem;
  border-radius: 50%;
  background-image: url('../imgs/like.png');
  margin-left: .06rem 
}
.share .top .thumb .ellipsis,.personal .top .thumb .ellipsis,.rank .top .thumb .ellipsis{
  height: .2rem;
  width: .2rem;
  border-radius: 50%;
  border: 1px solid #f0f0f0;
  line-height: .2rem;
  color: #f0f0f0;
  background-image: url('../imgs/dian.png');
  background-position: 50% 50%;
  background-size: 80%;
  margin-left: .06rem 
}
.share .top .btn,.personal .top .btn,.rank .top .btn{
  width: 2.9rem;
  height: .4rem;
  border-radius: .2rem;
  margin: auto;
  margin-top: .16rem;
  background-image: url('../imgs/button2.png');
  border: none;
  color: #fff;
  font-size: .15rem;
  position: relative;
  padding-left: 30px
}
.btn-wrap{
  width: 2.9rem;
  height: .8rem;
  margin: auto
}
.ib{
  display: inline-block;
  width: .2rem;
  height: .2rem;
  background-image: url('../imgs/like1.png');
  margin-right:5px;
  position: relative;
  top: 2px;
}
.share .title,.personal .title,.rank .title{
  text-align: center;
  font-size: .15rem;
  color: #ffffff;
  height: .57rem;
  line-height: .57rem;
  position: relative;
}
.share .title:after,.personal .title:after,.rank .title:after{
  content: '';
  position: absolute;
  width: .2rem;
  height: 1px;
  top: 50%;
  left: .88rem;
  background-color: #fff;
}
.share .title:before,.personal .title:before,.rank .title:before{
  content: '';
  position: absolute;
  width: .2rem;
  height: 1px;
  top: 50%;
  right: .88rem;
  background-color: #fff;
}
.share .ranking-list .item,.personal .ranking-list .item,.rank .ranking-list .item{
  font-size: .12rem;
  display: flex;
  padding-right: .14rem
}
.share .ranking-list .left,.personal .ranking-list .left,.rank .ranking-list .left{
  width: 1.2rem;
  display: flex;
  align-items:center;
}
.share .ranking-list .left .topNum,.personal .ranking-list .left .topNum,.rank .ranking-list .left .topNum{
  width: .47rem;
  height: .5rem;
  font-size: .15rem;
  line-height: .5rem;
  text-align: center;
  color :#777;
  background-size: 22px 32px;
  background-position: 50% 50%;
}
.numb1{
    background-image: url('../imgs/1.png');
}
.numb2{
    background-image: url('../imgs/2.png');
}
.numb3{
    background-image: url('../imgs/3.png');
}


.share .ranking-list .left .pic,.personal .ranking-list .left .pic,.rank .ranking-list .left .pic{
  margin: .18rem 0;
  width: .5rem;
  height: .5rem;
  border-radius: 50%;
}
.share .ranking-list .right .name,.personal .ranking-list .right .name,.rank .ranking-list .right .name{
  color: #777;
  position: relative;
  height: .22rem;
}
.share .ranking-list .right .name span,.personal .ranking-list .right .name span,.rank .ranking-list .right .name span{
  color: #fff
}
.share .ranking-list .right,.personal .ranking-list .right,.rank .ranking-list .right{
  width: 2.54rem;
  padding: .18rem 0 .14rem 0;

}
.normal{
   border-bottom: 1px dashed rgba(255,255,255,.3); 
}
.share .ranking-list .right .center{
  line-height: .52rem;
  height: 100%
}
.share .ranking-list .right .name .center_btn{
  top:.22rem;
}
.share .ranking-list .right .l,.personal .ranking-list .right .l,.rank .ranking-list .right .l{
  margin-right: .05rem;
}
.share .ranking-list .right .r,.personal .ranking-list .right .r,.rank .ranking-list .right .r{
  margin-left: .05rem;
}
.share .ranking-list .right .thumb,.personal .ranking-list .right .thumb,.rank .ranking-list .right .thumb{
  display: inline-block;
  width: .6rem;
  height: .22rem;
  border-radius: 4px;
  margin-left: .86rem;
  margin-top: -0.1rem;
  padding-left: .25rem;
  border:1px solid #777;
  background-image: url('../imgs/like1.png');
  background-size: .15rem .14rem;
  background-position: .05rem .03rem;
  font-size: .14rem;
  color: #777;
  line-height: .22rem;
  margin-bottom: .1rem;
  position: absolute;
  right: 0;
  top:.04rem;
}
.share .ranking-list .right .thumb.like,.personal .ranking-list .right .thumb.like,.rank .ranking-list .right .thumb.like {
    background-image: url('../imgs/like2.png');
}
.share .ranking-list .right .des,.personal .ranking-list .right .des,.rank .ranking-list .right .des{
  color: #777;
  font-size: .12rem;
  line-height: .15rem;
  position: relative;
}
.share .ranking-list .right .des:after,.personal .ranking-list .right .des:after,.rank .ranking-list .right .des:after{
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
}
.share .viewBtn,.personal .viewBtn,.rank .viewBtn{
  width: 3.45rem;
  height: .4rem;
  margin: auto;
  border: 1px solid #9999ae;
  border-radius: .2rem;
  font-size: .14rem;
  color: rgba(255,255,255,.6);
  text-align: center;
  line-height: .4rem;
  margin-top: .25rem;
}
.share .bottom-bar,.personal .bottom-bar,.rank .bottom-bar{
  margin-top: .25rem;
  height: 1.3rem;
  background-image: url(../imgs/bottomBar.png);
}


.not-concerned .bg1{
  height: 1.8rem;
  background-image: url('../imgs/bg1.png');
  background-size: 110%;
  background-position: 50% 50%;
  padding: 12px 12px
}
.not-concerned .bg1 .logo{
  height: .5rem;
  width: .88rem;
  background-size: 100%;
  color: rgba(255,255,255,255,.94);
  font-size: .14rem;
  background-image: url('../imgs/logo@2x.png');
}
.not-concerned .sign{
  height: 2.53rem;
  background-position: 0% 50%;
  background-image: url('../imgs/shape.png');
  font-size: .13rem;
  color: #b9b9be;
  padding-top: .4rem;
  background-size: 98%
}
.not-concerned .sign p{
  text-align: center;
  line-height: .25rem
}
.not-concerned .sign .big{
  font-size: .16rem;
}
.not-concerned .sign .fff{
  color: #fff
}
.not-concerned .sign .rules{
  margin: auto;
  width: 1.5rem;  
  margin-top: .12rem;
  position: relative;
}
.not-concerned .sign .rules:after{
  position: absolute;
  content:"";
  bottom: 0;
  left: 50%;
  transform:translateX(-50%);
  width: 1.33rem;
  height: 0.02rem;
  background-image: url('../imgs/underline.png');
}
.not-concerned .sign p span{
  margin-left: 4px;
}
.not-concerned .bottom-bar{
  height: 1.68rem;
  background-image: url('../imgs/bottomBar1.png');
  background-size: 100%;
  position: relative;
}
.not-concerned .bottom-bar .btn{
  width: 2.6rem;
  height: .4rem;
  font-size: .15rem;
  border-radius: .2rem;
  background-image: url('../imgs/button2.png');
  line-height: .4rem;
  text-align: center;
  color: #fff;
  position: absolute;
  left: 50%;
  top: .5rem;
  transform: translateX(-50%);
}
.not-concerned .bottom-bar .des{
  font-size: .14rem;
  color: #fff;
  text-align: center;
  position: absolute;
  bottom: .32rem;
  left: 50%;
  transform: translateX(-50%);  
}


.personal,.rank{
  background-color: #000034;
}

.personal .bg1,.rank .bg1{
  height: 1.8rem;
  background-image: url('../imgs/bg1.png');
  background-size: 110%;
  background-position: 50% 50%;
  padding: 12px 12px
}
.personal .bg1 .logo,.rank .bg1 .logo{
  height: .5rem;
  width: .88rem;
  background-size: 100%;
  color: rgba(255,255,255,255,.94);
  font-size: .14rem;
  background-image: url('../imgs/logo@2x.png');
}
.personal .sign,.rank .sign{
  height: 2.53rem;
  background-position: 0% 50%;
  background-image: url('../imgs/shape.png');
  font-size: .13rem;
  color: #b9b9be;
  padding-top: .4rem;
  background-size: 98%
}
.personal .sign p,.rank .sign p{
  text-align: center;
  line-height: .25rem
}
.personal .sign .big,.rank .sign .big{
  font-size: .16rem;
}
.personal .sign .fff,.rank .sign .fff{
  color: #fff
}
.personal .sign .rules,.rank .sign .rules{
  margin-top: .12rem;
  position: relative;
}
.personal .sign .rules:after,.rank .sign .rules:after{
  position: absolute;
  content:"";
  bottom: 0;
  left: 50%;
  transform:translateX(-50%);
  width: 1.33rem;
  height: 0.02rem;
  background-image: url('../imgs/underline.png');
}
.personal .sign p span,.rank .sign p span{
  margin-left: 4px;
}
.personal .bottom-bar,.rank .bottom-bar{
  height: 1.68rem;
  background-image: url('../imgs/bottomBar.png');
  background-size: 150%;
  background-position: 55% 10%;
  position: relative;
}
.personal .bottom-bar .btn,.rank .bottom-bar .btn{
  width: 2.6rem;
  height: .4rem;
  font-size: .15rem;
  border-radius: .2rem;
  background-image: url('../imgs/button2.png');
  line-height: .4rem;
  text-align: center;
  color: #fff;
  position: absolute;
  left: 50%;
  top: .5rem;
  transform: translateX(-50%);
}
.personal .bottom-bar .des,.rank .bottom-bar .des{
  font-size: .14rem;
  color: #fff;
  text-align: center;
  position: absolute;
  bottom: .32rem;
  left: 50%;
  transform: translateX(-50%);  
}
.personal .top,.rank .top{
  background-color: #fff;
  width: 3.4rem;
  margin: auto;
  border-radius: .03rem;
  font-size: .12rem;
  color:#777;
  padding-top: .23rem;
}
.personal .top .location,.rank .top .location{
  margin-top: 0;
}
.rank  div.viewBtn{
  width: 2.6rem;
  height: .4rem;
  font-size: .15rem;
  border-radius: .2rem;
  background-image: url('../imgs/button2.png');
  line-height: .4rem;
  text-align: center;
  color: #fff;
  border:none;
}




html, body, div, span, applet, object, iframe, h1, h2, h3,
h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address,
big, cite, code, del, dfn, em, font, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var, dl, dt, dd, ol, ul, li,
fieldset, form, label, legend, table, caption, tbody, tfoot,
thead, tr, th, td {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-weight: inherit;
    font-style: inherit;
    font-size: 100%;
    font-family: inherit;
    vertical-align: baseline;
}
*{
  background-size: 100%;
  background-repeat: no-repeat;
  box-sizing: border-box;
}
:focus {
    outline: 0;
}
table {
    border-collapse: separate;
    border-spacing: 0;
}
caption, th, td {
    text-align: left;
    font-weight: normal;
}
a img, iframe {
    border: none;
}
ol, ul {
    list-style: none;
}
input, textarea, select, button {
    font-size: 100%;
    font-family: inherit;
}
select {
    margin: inherit;
}
/* Fixes incorrect placement of numbers in ol’s in IE6/7 */
ol { margin-left:2em; }
html{
  font-size: 625%;
  font-family: 'Pingfang SC', Helvetica, Arial, sans-serif;
}
@media (max-width:320px){
  html{
    font-size: 500%
  }
}
.show .top{
  position:relative;
}
.show .top::before{
  position:absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;
  background:url(../imgs/youcuo.png) no-repeat 2.2rem 1.55rem;
  background-size: 1.03rem .57rem;
  content:"";
  display:block;
  z-index:1;
  border-radius: .03rem;
}
.personal .show .top::before{
  background-position:2.3rem 0.2rem;
}
.show .top .invite,.show .top .top1{
  position:relative;
  z-index:2;
}
.share .top .invite{
  position: absolute;
  left:0;
}
.show{
  padding:0 0.175rem;
}
.show .top{
  width:auto;
}
.personal .top .name, .rank .top .name, .share .top .name{
  width:2rem;
  white-space:nowrap;
}
.share .ranking-list .right .name a, .personal .ranking-list .right .name a, .rank .ranking-list .right .name a{
  display:inline-block;
  color:#777;
  text-decoration:none;
}
.share .ranking-list .left, .personal .ranking-list .left, .rank .ranking-list .left{
  align-items:flex-start;
}
.share .ranking-list .left .topNum, .personal .ranking-list .left .topNum, .rank .ranking-list .left .topNum{
  margin-top:0.18rem;
  font-size:0.16rem;
  color:#ccc;
}
.share .ranking-list .right .thumb, .personal .ranking-list .right .thumb, .rank .ranking-list .right .thumb{
  width:auto;
  padding:0 5px 0 28px;
}
.personal .top .ranking span, .rank .top .ranking span, .share .top .ranking span{
  left:5px;
}
.personal .bottom-bar, .rank .bottom-bar, .share .bottom-bar{
  background: url(../imgs/bottomBar.png) center 0;
  background-size: 145%;
}
</style>
