function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
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
export function orderListPromise(list,func,end){
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

export default {
  formatNumber,
  formatTime,
  orderListPromise
}
