export default function throttle(fn,delay) {
    console.log(fn,delay);
    let timer = null
    return (...args) => {
        if(!timer){
            timer = setTimeout(() => {
                fn.apply(this, args)
            }, delay)
        }
    }
}

