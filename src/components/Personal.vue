<template>
    <div class="personal" >
      <div class="music" :class="{white:!scr,stop:!musicPlay}" @click="toggleMusic">
        <audio src="music.mp3" autoplay loop id="audio"></audio>
      </div>
      
      <div class="bg1">
          <div class="logo">
            
          </div>         
      </div>

       <div style="text-align:center;font-size:0">
         <div v-on:click="popup2=true" style="font-size:14px;color:white;text-align:center;margin:18px 0;border-bottom:1px dotted rgba(255,255,255,0.4);display:inline-block;padding-bottom:4px;">活动规则及大奖设置<span>></span></div> 
       </div>

      <div class="show">
        <div class="top">

          <div class="invite">
            <div></div>
          </div>
          <div class="top1">
            <div class="location">
              <div></div>
              {{title}}
            </div>
            <div class="decora">
              
            </div>
            <p>{{content}}</p>
            <div class="decora">
              
            </div> 
            <div class="pic" v-bind:style="{backgroundImage: 'url('+headUrl+')'}"></div>           
            <div class="name">{{target_name}}</div>
            <div class="ranking">排名 <span>{{(rank>999?'999+':rank)}}</span></div>
            <div class="thumb">
              <div class="like"></div>
              <div>{{like_count}}</div>
              <div class="peo" v-for="item in target_likes" v-bind:style="{backgroundImage: 'url('+item.headimgurl+')'}" v-if="target_likes"></div>
              <div class="ellipsis" v-if="target_likes.length>8"></div>
            </div>
            <div class="btn-wrap">
              <div class="btn" v-on:click="like_self" style="border-radius:0;background-size:100% 100%;line-height:.4rem;text-align: center;padding-left:0;">
                <div class="ib"></div>{{target_islike?'已经赞过了':'狠狠赞一个'}}
              </div>

              <div class="mask" v-if="target_islike"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="qrcode-wrap">
        <div class="col pdv">
          <img src="./imgs/pdv-code.png" alt="" width="114">
          <p>扫码领取熊猫签证<br>￥20优惠券</p>
        </div>
        <div class="col yijia">
          <img src="./imgs/yijia-code.png" alt="" width="114">
          <p style="line-height:0.36rem">关注“一家民宿”公众号</p>
        </div>
      </div>

      <div class="title">集赞排行榜Top10</div>
      <div class="ranking-list">
        <div class="item" v-for="(item,index) in rank_list">
          <div class="left">
            <div :class="[ 'numb'+(index+1),'topNum']">
              {{index>2?index+1:''}}
            </div>
            <div class="pic" v-bind:style="{backgroundImage: 'url('+item.headimgurl+')'}"></div>
          </div>
          <div class="right normal" >
            <div :class="[index>2?'center':'','name']">
              <router-link :to="{path:'/personal',query:{postid:item.postid,openid:openid}}"><span class="l">{{item.nickname}}</span>想去<span class="r">{{item.title}}</span></router-link>

              <div :class="[index>2?'center_btn':'',item.islike==1?'like':'','thumb']" v-on:click="liking(index)" >{{item.like_count}}</div>
            </div>
            <div class="des" v-if="index<3">
              {{item.content}}
            </div>
          </div>
        </div>       
      </div>
      <router-link :to="{path:'/rank',query:{openid:openid}}" class="link_dec"><div class="viewBtn">查看完整排名</div></router-link>  

      <div class="bottom-bar">
        <div class="btn-wrap"  style="position:fixed;bottom:0;left:0;right:0;height:50px;z-index:10;background-color:rgba(0,0,52,0.9);width:100%">
          <router-link class="btn" :to="{path:'/',query:{openid:openid}}" style="top:4px;text-decoration:none;backgroundImage:url(imgs/button3.png)">
            我也要参加
          </router-link>
        </div>
      </div>

      <div class="popup" id="popup" v-if="popup2" v-on:click="popup2=false">
        <div class="content" @click.stop="cancel">
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
          <p class="bottom-bar" style="background:none;height:0.2rem">本活动最终解释权归熊猫签证所有</p>      
        </div>

        <img class="close" src="./imgs/btn-close.png"></img>
      </div>       
    </div> 	
</template>
<script>
import AlloyFinger from '../libs/alloy_finger.js'
import toast from '../libs/toast.js'

export default {
  data(){
    return{
      rank_list:[],
      is_like:1,
      rank:'',
      content:'',
      title:'',
      like_count:0,
      tar_postid:'',
      tar_openid:'',
      openid:this.$route.query.openid || localStorage.openid,
      postid:this.$route.query.postid,
      target_islike:0,
      target_likes:[],
      target_name:'',
      musicPlay:true,
      headUrl:'',
      popup2:false,
      startMusic:false
    }
  },
  watch:{
    $route:function(){
      location.reload();
    }
  },
  methods:{
    like_self(){
      if(!this.openid || this.openid=="undefined"){
        return location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe8fe87fd2044c871&redirect_uri=https%3A%2F%2Fapi.11visa.com%2Fwxs%2Fwxs_userinfo_query&response_type=code&scope=snsapi_userinfo&state=/newyear/index.htm%23/personal?postid="+this.postid+"#wechat_redirect";
      } 

      this.$http.post("https://api.11visa.com/wxs/addlike",{'openid':this.openid,'postid':parseInt(this.postid),'nickname':this.target_name,'headimgurl':this.headUrl})
      .then(
        (response)=>{if(response.body.ret==0){
          this.target_islike=1;
          this.getData();

          toast.show('投票成功，赶紧领取￥20熊猫签证优惠券');
          setTimeout(function(){
            location.href="https://oss.11visa.com/web/newyear.html?code=XMNY2017"; 
          },1000);        
          //this.rank = this.rank+1
        }else{
          alert("您已经点过了");
        }}
      )      
    },
    liking(i){
      if(!this.openid || this.openid=="undefined"){
        return location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe8fe87fd2044c871&redirect_uri=https%3A%2F%2Fapi.11visa.com%2Fwxs%2Fwxs_userinfo_query&response_type=code&scope=snsapi_userinfo&state=/newyear/index.htm%23/personal?postid="+this.postid+"#wechat_redirect";
      } 

      this.$http.post("https://api.11visa.com/wxs/addlike",{'openid':this.openid,'postid':this.rank_list[i].postid,'nickname':this.rank_list[i].nickname,'headimgurl':this.rank_list[i].headimgurl})
      .then(
        (response)=>{if(response.body.ret==0){
          this.$set(this.rank_list[i],'islike',1);          
          this.$set(this.rank_list[i],'like_count',this.rank_list[i].like_count+1);
          this.getData();

          toast.show('投票成功，赶紧领取￥20熊猫签证优惠券');
          setTimeout(function(){
            location.href="https://oss.11visa.com/web/newyear.html?code=XMNY2017";
          },1000);
        }else{
          alert("您已经点过了");
        }}
      )
    },
    hideThis(type){
      var el=document.querySelector('.'+type);
      el.style.opacity=0;
    },
    showThis(type){
      var el=document.querySelector('.'+type);
      el.style.opacity=1;
    },
    cancel(){

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
    getData(){
      this.$http.post("https://api.11visa.com/wxs/getuser",{'postid':parseInt(this.postid),openid:this.openid || undefined})
      .then(
        (response)=>response.body.body
      ).then(
         (data)=> {
          if(!data){
            return alert("该分享不存在");
          }
          var post = data.post[0];
          if(!post.top){
            return alert("该用户已取消关注");
          }
          this.headUrl= post.headimgurl;
          this.rank = post.top;
          this.target_islike=post.islike;
          this.content=post.content;
          this.title = post.title;
          this.like_count=post.like_count;
          this.target_likes=(post.likeusers instanceof Array)?post.likeusers.splice(0,9):[];
          this.rank_list = data.top;
          this.target_name = post.nickname;
          var _this=this;
          wx.ready(function(){
            _this.shareBuild(_this.title,_this.postid);
            wx.showOptionMenu();
            wx.showAllNonBaseMenuItem();
          });
        }
      )
    },

    wxconfig(){
      var xhr=new XMLHttpRequest();
      xhr.open('post',"https://api.11visa.com/wxs/get_config");
      xhr.onload=function(){
        var res;
        try{
          res=JSON.parse(xhr.response);
        }catch (err){
          return;
        }

        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.appId, // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.noncestr, // 必填，生成签名的随机串
          signature:res.signature ,// 必填，签名，见附录1
          jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','showOptionMenu','hideOptionMenu','hideAllNonBaseMenuItem','showAllNonBaseMenuItem']
        });
      };

      xhr.send(JSON.stringify({
        url:location.href.split('#')[0]
      }));
    },

    shareBuild(title,postid){
      wx.onMenuShareTimeline({
        title: '2017最想去'+title+'！快来加入我，一起实现免费旅行梦想！', // 分享标题
        link: 'https://h5.11visa.com/newyear/index.htm#/personal?postid='+postid, // 分享链接
        imgUrl: 'http://visa.oss-cn-shenzhen.aliyuncs.com/web/imgs/share.png', // 分享图标
        success: function () {

        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });

      wx.onMenuShareAppMessage({
        title: '我获得了免费旅行的机会，你要一起去吗？', // 分享标题
        desc: '2017最想去'+title+'！快来加入我，一起实现免费旅行梦想！',
        link: 'https://h5.11visa.com/newyear/index.htm#/personal?postid='+postid, // 分享链接
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
    }
  },
  created(){
    if(this.openid && this.openid!='undefined'){
      localStorage.openid=this.openid;
    }else{
      this.openid=undefined;
    }

    if(!this.postid){
      return this.$router.push({path:'/',query:{openid:this.openid}}); 
    }

    this.wxconfig();
    this.getData();
  },
  mounted(){
    var _this=this;

    document.documentElement.ontouchstart=function(){
      if(!_this.startMusic){
        document.getElementById("audio").play();
      }
    };

    var pdv=document.querySelector('.pdv');
    var yijia=document.querySelector('.yijia');

    new AlloyFinger(pdv,{
      longTap:function(){
        yijia.style.opacity=0;

        setTimeout(function(){
          yijia.style.opacity=1;
        },1000);
      }
    });

    new AlloyFinger(yijia,{
      longTap:function(){
        pdv.style.opacity=0;

        setTimeout(function(){
          pdv.style.opacity=1;
        },1000);
      }
    });
  }
}
</script>
<style scoped>
.link_dec{
  outline: none;
  border: none;
  text-decoration: none;
}
.btn-wrap {
 position: relative;

}
.btn-wrap .mask{
width: 100%;
height: 100%;
position: absolute;
left: 0;
top: 0;
background-color: rgba(255,255,255,0.5);
}
.qrcode-wrap{
  font-size:0;
  width:3.4rem;
  margin: 15px auto 20px auto;
  border-radius:5px;
  border:1px dashed rgba(255,255,255,0.5);
  padding: 0.2rem 0.1rem;
  overflow:hidden;
}
.qrcode-wrap .col{
  width:50%;
  float:left;
  text-align:center;
  transition:all 20ms;
}
.qrcode-wrap img{

}
.qrcode-wrap p{
  font-size:0.13rem;
  color:white;
  margin-top:8px;
  line-height:0.18rem;  
}

.personal .bottom-bar .btn, .rank .bottom-bar .btn{
  width:342px;
  height:41px;
  top:4px;
}

.personal .ranking-list .right .center{
  line-height: .52rem;
  height: 100%
}
.personal .ranking-list .right .name .center_btn{
  top:.22rem;
}

</style>