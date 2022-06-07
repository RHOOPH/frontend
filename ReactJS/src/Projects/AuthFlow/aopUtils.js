import readCookie from "./readCookie"

const REST = "/open-suite-master/ws/rest/"
const META = "/open-suite-master/ws/meta/fields/"
const headers = (cookie) => ({
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-CSRF-Token": cookie,
})
const convertFromJSON = (res) => {
  if (res.ok) return res.json()
  else throw new Error(`${res.status} ${res.statusText}`)
}

export const retrieveData = (rawData) => {
  if (rawData.status === 0 && rawData.data !== undefined) return rawData.data
  else throw rawData.data
}

const request = (url, options) => {
  return fetch(url, {
    headers: headers(readCookie("CSRF-TOKEN")),
    ...options,
  }).then(convertFromJSON)
}

const GET = (url) => {
  return request(url, { method: "GET" })
}

const POST = (url, data) => {
  return request(url, { method: "POST", body: JSON.stringify(data) })
}

const DELETE = (url) => {
  return request(url, {
    method: "DELETE",
  })
}

export const searchDB = (
  database,
  data = {
    fields: ["id", "name"],
    sortBy: ["id"],
  }
) => {
  return POST(REST + database + "/search", data)
}

export const updateDB = (database, data, id = "") => {
  return POST(REST + database + "/" + id, { data })
    .then(retrieveData)
    .then((data) => data[0])
}

export const getRecord = (database, id = "1") => {
  return GET(REST + database + "/" + id)
    .then(retrieveData)
    .then((data) => data[0])
}

export const deleteRecord = (database, id) => {
  return DELETE(REST + database + "/" + id)
    .then(retrieveData)
    .then((data) => data[0])
}
export const getMeta = (database) => {
  return GET(META + database)
    .then(retrieveData)
    .then((data) => data.fields)
}
