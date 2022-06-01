import readCookie from "./readCookie"

const REST = "/open-suite-master/ws/rest/"

function Customheaders(cookie) {
  this.Accept = "application/json"
  this["Content-Type"] = "application/json"
  this["X-CSRF-Token"] = cookie
}
const convertFromJSON = (res) => {
  if (res.ok) return res.json()
  else throw new Error(`${res.status} ${res.statusText}`)
}

const retrieveData = (rawData) => {
  if (rawData.status === 0 && rawData.data !== undefined) return rawData.data
  else throw rawData.data
}

export const searchDB = (
  database,
  body = {
    fields: ["id", "name"],
    sortBy: ["id"],
  }
) => {
  return fetch(REST + database + "/search", {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Customheaders(readCookie("CSRF-TOKEN")),
  })
    .then(convertFromJSON)
    .then(retrieveData)
}

export const updateDB = (database, data, id = "") => {
  return fetch(REST + database + "/" + id, {
    method: "POST",
    body: JSON.stringify({ data }),
    headers: new Customheaders(readCookie("CSRF-TOKEN")),
  })
    .then(convertFromJSON)
    .then(retrieveData)
    .then((data) => data[0])
}

export const getRecord = (database, id = "1") => {
  return fetch(REST + database + "/" + id)
    .then(convertFromJSON)
    .then(retrieveData)
    .then((data) => data[0])
}

export const deleteRecord = (database, id) => {
  return fetch(REST + database + "/" + id, {
    method: "DELETE",
    headers: new Customheaders(readCookie("CSRF-TOKEN")),
  })
    .then(convertFromJSON)
    .then(retrieveData)
    .then((data) => data[0])
}
