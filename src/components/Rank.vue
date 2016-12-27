<template>
    <div class="rank" v-if="1">
      <div class="bg1">
          <div class="logo">
            
          </div>
      </div>
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
              <router-link :to="{path:'/personal',query:{postid:item.postid}}"><span class="l">{{item.nickname}}</span>想去<span class="r">{{item.title}}</span></router-link>

              <div :class="[index>2?'center_btn':'',item.islike==1?'like':'','thumb']" v-on:click="liking(index)" >{{item.like_count}}</div>
            </div>
            <div class="des" v-if="index<3">
              {{item.content}}
            </div>
          </div>
        </div>       
      </div>
      <router-link :to="{path:'/',query:{openid:openid}}" class="link_dec"><div class="viewBtn">立即参加拿大奖</div></router-link>     
      <div class="bottom-bar">
        
      </div>    
    </div> 	
</template>
<script>
export default {
  data(){
    return{
      rank_list:[1,1,1,1,1,1,1,1,1,1],
      tar_postid:'',
      tar_openid:'',
      openid:this.$route.query.openid || localStorage.openid
    }
  },
  watch:{
    $route:function(){
      location.reload();
    }
  },
  methods:{
    like_self(){
      this.target_islike=1
    },
    liking(i){
      if(!this.openid || this.openid=="undefined"){
        return location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe8fe87fd2044c871&redirect_uri=https%3A%2F%2Fapi.11visa.com%2Fwxs%2Fwxs_userinfo_query&response_type=code&scope=snsapi_userinfo&state=/newyear/index.htm%23/rank?#wechat_redirect";
      } 

     this.$http.post("https://api.11visa.com/wxs/addlike",{'openid':this.openid,'postid':this.rank_list[i].postid,nickname:this.rank_list[i].nickname,'headimgurl':this.rank_list[i].headimgurl})
      .then(
        (response)=>{if(response.body.ret==0){
          this.$set(this.rank_list[i],'like_count',this.rank_list[i].like_count+1)
        }else{
          alert("您已经点过了");
        }}
      )   
      this.$set(this.rank_list[i],'islike',1);

    },
    getData(){
      this.$http.post("https://api.11visa.com/wxs/getposttop",{'openid':this.openid,'next_top':0})
      .then(
        (response)=>response.body.body
      ).then(
         (data)=> {
           this.rank_list = data.data
        }
      )
    }
  },
  created(){
    function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
    }
    // if(getCookie('openId')==""||getCookie('openId')==undefine){
    //  location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe8fe87fd2044c871&redirect_uri=https%3A%2F%2Ftestapi.11visa.com%2Fwxs%2Fwx_server&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
    // }
    var open_id = location.href.split('openid=')[1]&&location.href.split('openid=')[1].split('&')[0];
    var post_id = location.href.split('uid=')[1]&&location.href.split('uid=')[1].split('&')[0];
    this.tar_postid=post_id;
    this.tar_openid=open_id;
  },
  mounted(){
    this.getData();
  }
}
</script>
<style scoped>
.link_dec{
  outline: none;
  border: none;
  text-decoration: none;
}

.rank .title,.personal .title,.rank .title{
  text-align: center;
  font-size: .15rem;
  color: #ffffff;
  height: .57rem;
  line-height: .57rem;
  position: relative;
}
.rank .title:after,.personal .title:after,.rank .title:after{
  content: '';
  position: absolute;
  width: .2rem;
  height: 1px;
  top: 50%;
  left: .88rem;
  background-color: #fff;
}
.rank .title:before,.personal .title:before,.rank .title:before{
  content: '';
  position: absolute;
  width: .2rem;
  height: 1px;
  top: 50%;
  right: .88rem;
  background-color: #fff;
}
.rank .ranking-list .item,.personal .ranking-list .item,.rank .ranking-list .item{
  font-size: .12rem;
  display: flex;
  padding-right: .14rem
}
.rank .ranking-list .left,.personal .ranking-list .left,.rank .ranking-list .left{
  width: 1.2rem;
  display: flex;
  align-items:center;
}
.rank .ranking-list .left .topNum,.personal .ranking-list .left .topNum,.rank .ranking-list .left .topNum{
  width: .47rem;
  height: .5rem;
  font-size: .15rem;
  line-height: .5rem;
  text-align: center;
  color :#777;
  background-size: 22px 32px;
  background-position: 50% 50%;
}
.rank .ranking-list .right .center{
  line-height: .52rem;
  height: 100%
}
.rank .ranking-list .right .name .center_btn{
  top:.22rem;
}
</style>