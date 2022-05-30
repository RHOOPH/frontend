import readCookie from "./readCookie"

const REST = "/open-suite-master/ws/rest/"
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-CSRF-Token": readCookie("CSRF-TOKEN"),
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
    headers,
  })
    .then(convertFromJSON)
    .then(retrieveData)
}

export const updateDB = (database, data, id = "") => {
  return fetch(REST + database + "/" + id, {
    method: "POST",
    body: JSON.stringify({ data }),
    headers,
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
    headers,
  })
    .then(convertFromJSON)
    .then(retrieveData)
    .then((data) => data[0])
}
