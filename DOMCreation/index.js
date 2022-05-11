const createElements = (type, count) => {
  let arr = []
  for (let i = 0; i < count; i++) {
    arr.push(document.createElement(type))
  }
  return arr
}

const el = document.getElementById("apps")
const list = createElements("li", 3)
const span = createElements("span", 3)
const img = createElements("img", 3)
const options = ["Netflix", "Amazon Prime", "Hotstar"]
const imgUrls = [
  "./Assets/netflix.png",
  "./Assets/primevideo.png",
  "./Assets/hotstar.ico",
]

span.forEach((v, i) => {
  v.innerHTML = options[i]
  v.style.fontSize = "25px"
  v.style.marginLeft = "1rem"
})
img.forEach((v, i) => {
  v.src = imgUrls[i]
  v.height = 25
  v.width = 25
})

list.forEach((v, i) => {
  v.append(img[i], span[i])
  v.style.marginBottom = "1rem"
})
el.append(list[0], list[1], list[2])
