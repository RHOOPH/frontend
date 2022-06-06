import styled from "styled-components"
import { Link } from "react-router-dom"
import { editRoute } from "../../../routes"

const Data = styled.td`
  padding: 0.5rem;
  font-size: 1rem;
`

const status = ["New", "Assigned", "In process", "Converted", "Lost"]

function Lead({ data, fields, onDelete }) {
  return (
    <tr>
      <td>
        <Link to={editRoute + "/" + data.id}>Edit</Link>
      </td>
      {fields.map(({ name }, index) => {
        const item = data[name]
        let value

        switch (name) {
          case "user":
            value = item?.fullName
            break
          case "statusSelect":
            value = status[parseInt(item) - 1]
            break
          default:
            value = item
            break
        }

        return <Data key={index}>{value}</Data>
      })}
      <td>
        <button
          onClick={() => {
            onDelete(data.id)
          }}
        >
          ❌
        </button>
      </td>
    </tr>
  )
}
export default Lead
