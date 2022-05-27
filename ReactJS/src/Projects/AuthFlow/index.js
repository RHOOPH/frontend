import { useEffect, useState } from "react"
import readCookie from "./readCookie"
import styled from "styled-components"
import Lead from "./Components/Lead"
import { Link } from "react-router-dom"
import { editRoute } from "../../routes"

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
  flex-direction: column;
`
const StyledLink = styled(Link)`
  margin: 1rem;
`
function Leads() {
  const [data, setData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    setLoading(true)
    fetch("/open-suite-master/ws/rest/com.axelor.apps.crm.db.Lead/search", {
      method: "POST",
      body: JSON.stringify({
        fields: fields.map((field) => field.name),
        sortBy: ["-createdOn"],
      }),
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
  }, [refresh])
  return (
    <Container>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>{error.message}</h1>
      ) : (
        <>
          <div>
            <StyledLink to={editRoute + "/new"}>Add New</StyledLink>
            <button onClick={() => setRefresh((p) => p + 1)}>🔄</button>
          </div>
          <table>
            <thead>
              <tr>
                <th></th>
                {fields.map(({ name, label }) => (
                  <th key={name}>{label}</th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((lead) => (
                <Lead data={lead} fields={fields} key={lead.id} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </Container>
  )
}
export default Leads
