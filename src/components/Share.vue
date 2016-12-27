<template>
    <div class="share" v-if="1">
     
      <div class="show">
        <div class="invite">
          <div></div>
        </div>

        <div class="top">          
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
            <div class="name">{{tar_name}}</div>
            <div class="ranking">排名 <span>{{(rank>999?'999+':rank)}}</span></div>
            <div class="thumb">
              <div class="like"></div>
              <div>{{like_count}}</div>
              <div class="peo" v-for="item in target_likes" v-bind:style="{backgroundImage: 'url('+item.headimgurl+')'}"></div>
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
      <router-link :to="{path:'/rank',query:{openid:this.openid}}" class="link_dec"><div class="viewBtn">查看完整排名</div></router-link>
      <div class="bottom-bar">
        
      </div>
    </div>  
</template>
<script>
export default {
  data(){
    return{
      rank_list:[1,1,1,1,1,1,1,1,1,1],
      is_like:1,
      rank:'',
      content:'',
      title:'',
      like_count:'',
      headUrl: '',
      tar_postid:'',
      target_islike:0,
      target_likes:[],
      tar_openid:'',
      tar_name:'',
      openid:this.$route.query.openid || localStorage.openid,
      postid:this.$route.query.uid
    }
  },
  methods:{
    like_self(){      
      this.$http.post("https://api.11visa.com/wxs/addlike",{'openid':this.openid,'postid':Number(this.postid),'nickname':this.tar_name,'headimgurl':this.headUrl})
       .then(
         (response)=>{if(response.body.ret==0){
           this.target_islike=1;       
           this.getData();  
           //this.rank=this.rank+1
         }else{           
           alert("您已经点过了");
         }}
      )     
    },

    liking(i){
      this.$http.post("https://api.11visa.com/wxs/addlike",{'openid':this.openid,'postid':this.rank_list[i].postid,'nickname':this.rank_list[i].nickname,'headimgurl':this.rank_list[i].headimgurl})
      .then(        
        (response)=>{
        if(response.body.ret==0){
          this.$set(this.rank_list[i],'islike',1);          
          this.$set(this.rank_list[i],'like_count',this.rank_list[i].like_count+1);
          this.getData();  
        }else{          
          alert("您已经点过了");
        }}
      )
    },  

    getData(){
      this.$http.post("https://api.11visa.com/wxs/getuser",{'postid':parseInt(this.postid),openid:this.openid})
      .then(
        (response)=>response.body.body
      ).then(
         (data)=> {
          if(!data){
            return location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe8fe87fd2044c871&redirect_uri=https%3A%2F%2Fapi.11visa.com%2Fwxs%2Fwxs_userinfo_query&response_type=code&scope=snsapi_userinfo&state=/newyear/index.htm%23/?#wechat_redirect";
          }
          var post = data.post[0];
          if(!post.top){
            return location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe8fe87fd2044c871&redirect_uri=https%3A%2F%2Fapi.11visa.com%2Fwxs%2Fwxs_userinfo_query&response_type=code&scope=snsapi_userinfo&state=/newyear/index.htm%23/?#wechat_redirect";
          }
          this.headUrl= post.headimgurl;
          this.rank = post.top;
          this.target_islike=post.islike;
          this.content=post.content;
          this.title = post.title;
          this.like_count=post.like_count;
          this.target_likes=(post.likeusers instanceof Array)?post.likeusers.splice(0,9):[];
          this.rank_list = data.top;
          this.tar_name = post.nickname;

          var _this=this;
          wx.ready(function(){
            _this.shareBuild(_this.title,_this.postid);
            wx.showOptionMenu();
            wx.showAllNonBaseMenuItem();
          });
        },
        ()=>{
          return location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe8fe87fd2044c871&redirect_uri=https%3A%2F%2Fapi.11visa.com%2Fwxs%2Fwxs_userinfo_query&response_type=code&scope=snsapi_userinfo&state=/newyear/index.htm%23/?#wechat_redirect";
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
  watch:{
    $route:function(){
      location.reload();
    }
  },
  created(){
    if(!startup){
      return this.$router.replace({path:'/personal',query:{postid:this.postid}});
    }

    if(!this.openid || this.openid=="undefined"){
      return location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe8fe87fd2044c871&redirect_uri=https%3A%2F%2Fapi.11visa.com%2Fwxs%2Fwxs_userinfo_query&response_type=code&scope=snsapi_userinfo&state=/newyear/index.htm%23/?#wechat_redirect";
    }

    this.wxconfig();
    this.getData();
  },
  mounted(){
    window.scrollTo(0,0);
  }
}
</script>
<style scoped>
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
.link_dec{
  outline: none;
  border: none;
  text-decoration: none;
}
</style>