var toast=(function(){
  document.head.insertAdjacentHTML('beforeend','<style>'
    +'.toast{position:fixed;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:rgba(0,0,0,0.9);color:white;padding:0 15px;text-align:center;border-radius:4px;font-size:0.13rem;z-index:10000;pointer-events:none}.toast .toast-txt{height:0.4rem;line-height:0.4rem;white-space:nowrap}'
    +'</style>');

  function show(msg,time){
    document.body.insertAdjacentHTML('beforeend','' +
      '<div class="toast">' +
        '<div class="toast-txt">'+msg+'</div>' +
      '</div>');

    setTimeout(function(){
      hide();
    },time || 3000);
  }

  function hide(){
    if(document.querySelector('.toast')){
      document.querySelector('.toast').parentNode.removeChild(document.querySelector('.toast'));
    }
  }

  return {
    show:show,
    hide:hide
  }; 
})();

if (typeof module !== 'undefined' && typeof exports === 'object') {
  module.exports = toast;
}else {
  window.toast = toast;
}