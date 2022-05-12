const apps = document.getElementById("apps")
apps.style.fontSize = "2rem"

const options = [
  {
    label: "Netflix",
    img: "./Assets/netflix.png",
  },
  {
    label: "Amazon Prime",
    img: "./Assets/primevideo.png",
  },
  {
    label: "Hotstar",
    img: "./Assets/hotstar.ico",
  },
]

const createList = (option) => {
  const li = document.createElement("li")
  const span = document.createElement("span")
  span.innerHTML = option.label

  const img = document.createElement("img")
  img.src = option.img
  img.height = 25
  img.width = 25
  img.style.marginRight = "10px"

  li.append(img, span)

  return li
}

apps.append(...options.map(createList))
