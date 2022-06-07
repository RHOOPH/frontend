import { useEffect, useState, useReducer } from "react"
import styled from "styled-components"
import Lead from "./Components/Lead"
import { Link } from "react-router-dom"
import { editRoute } from "../../routes"
import { deleteRecord, searchDB, retrieveData } from "./aopUtils"
import { LEAD_DB } from "../../databases"

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

const body = {
  fields: fields.map((field) => field.name),
  sortBy: ["-createdOn"],
}

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
  const [leads, setLeads] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refresh, forceUpdate] = useReducer((count) => count + 1, 0)

  const deleteLead = (id) => {
    deleteRecord(LEAD_DB, id)
      .then((data) => {
        data.id === id &&
          setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id))
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    setLoading(true)

    searchDB(LEAD_DB, body)
      .then(retrieveData)
      .then((data) => {
        setLeads(data)
        setError(null)
      })
      .catch((err) => {
        setError(err)
        setLeads([])
      })
      .finally(() => {
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
            <button onClick={() => forceUpdate()}>🔄</button>
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
              {leads.map((lead) => (
                <Lead
                  data={lead}
                  fields={fields}
                  key={lead.id}
                  onDelete={deleteLead}
                />
              ))}
            </tbody>
          </table>
        </>
      )}
    </Container>
  )
}
export default Leads
