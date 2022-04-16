export default function debounce(fn, delay) {
  let timer = null         //初始化一个timer
  return (...args) => {   
      //判断timer 如果有值，重新计时
      if(timer) clearTimeout(timer)
      timer = setTimeout(() => {
          fn.apply(this,args)
      },delay)
  }
}