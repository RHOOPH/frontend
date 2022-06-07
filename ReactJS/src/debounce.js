export default function debounce(fn, d) {
  let timer
  return (...args) => {
    console.log("timer:", timer)
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      console.log(`calling debounced ${fn.name} after ${d}ms`)
      fn(...args)
    }, d)
  }
}
