function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

  function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
/**
 * 按照list，顺序执行promise，每个func 传入list 的item和调用下个promise的resolve
 * @param {*} list 
 * @param {*} func 
 * 全部执行完 之后最后执行的函数
 * @param {*} end 
 */
  function orderListPromise(list,func,end){
  var funList =[],next ;
  
  for(var i =0;i<list.length;i++){
    (date=>{
      funList.push(function() {
        return new Promise(function(resolve, reject) {
          func(date,resolve);
        })
      })
    })(list[i])
  }
  for (var i = 0; i < funList.length; i++) {
    if (i == 0) {
      next = funList[i]()
    } else {
      next = next.then(funList[i])
    }
  }
  next.then(()=>{
    end();
  })
}

function hasLogin(){
  var login  =mpvue.getStorageSync('login');
  var result =false;
  if(login!=null  && login.nickName !=null){
    result =true;
  }
  if(!result){
    mpvue.showToast({
      title: '当前没有用户信息，请先登陆',
      icon: 'none',
      duration: 2000
    })
    setTimeout(()=>{
      mpvue.redirectTo({ url:'/pages/pinfo/main' }) 
    },2000)
  }
  return result;
}
const animaEvent=[
  {inClass:'pt-page-rotatePullRight',name:"往左展开"},
  {inClass:'pt-page-rotatePullLeft',name:"往右展开"},
  {inClass:'pt-page-rotatePullBottom',name:"往上展开"},
  {inClass:'pt-page-rotatePullTop',name:"往下展开"},
  {inClass:'pt-page-rotateCarouselBottomIn',name:"往上移入放大"},
  {inClass:'pt-page-rotateCarouselTopIn',name:"往下移入放大"},
  {inClass:'pt-page-rotateCarouselRightIn',name:"往左移入放大"},
  {inClass:'pt-page-rotateCarouselLeftIn',name:"往右移入放大"},
  {inClass:'animated rubberBand',name:"橡皮圈"},
  {inClass:'animated swing',name:"秋千摆动"},
  {inClass:'animated leftswing',name:"秋千摆动"},
  {inClass:'animated heartBeat',name:"心脏跳动"},
  {inClass:'animated flipInX',name:"X翻转"},
  {inClass:'animated flipInY',name:"Y翻转"},
  {inClass:'animated zoomIn',name:"从中间放大"},
  {inClass:'animated zoomInDown',name:"从上面放大"},
  {inClass:'animated jackInTheBox',name:"玩偶匣"},
  {inClass:'animated rollIn',name:"转入"}

];
export   {
  formatNumber,
  formatTime,
  hasLogin,
  orderListPromise,
  animaEvent
}
