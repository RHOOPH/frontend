import { useEffect, useState } from "react"
import readCookie from "./readCookie"
import styled from "styled-components"
import Lead from "./Components/Lead"

const fields = [
  { name: "firstName", label: "First Name" },
  { name: "emailAddress.address", label: "Address" },
  { name: "contactDate", label: "Contact Date" },
  { name: "name", label: "Last Name" },
  { name: "fixedPhone", label: "Fixed Phone" },
  { name: "enterpriseName", label: "Enterprice" },
  { name: "user", label: "Assigned to" },
  { name: "statusSelect", label: "status" },
]
const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Grid = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(${fields.length}, auto);
  text-align: center;
  gap: 1px;
  border: 1px solid black;
  background-color: black;
  margin: 2rem;
`

const GridLabel = styled.div`
  font-weight: 600;
  resize: horizontal;
  overflow: hidden;
  background-color: white;
  padding: 1rem;
  text-overflow: ellipsis;
`
function Protected() {
  const [data, setData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch("/open-suite-master/ws/rest/com.axelor.apps.crm.db.Lead/search", {
      method: "POST",
      body: JSON.stringify({ fields: fields.map((field) => field.name) }),
      headers: {
        "X-CSRF-Token": readCookie("CSRF-TOKEN"),
      },
    })
      .then((res) => {
        if (res.ok) return res.json()
        else throw new Error(`${res.status} ${res.statusText}`)
      })
      .then((data) => {
        setData(data)
        setError(null)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setData({})
        setLoading(false)
      })
  }, [])
  return (
    <Container>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>{error.message}</h1>
      ) : (
        <table>
          <thead>
            {fields.map(({ name, label }) => (
              <th key={name}>{label}</th>
            ))}
          </thead>
          <tbody>
            {data?.data?.map((lead) => (
              <Lead data={lead} fields={fields} key={lead.id} />
            ))}
          </tbody>
        </table>
      )}
    </Container>
  )
}
export default Protected
