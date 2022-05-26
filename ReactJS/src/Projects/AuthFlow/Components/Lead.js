import styled from "styled-components"

const Row = styled.tr`
  /* padding: 1rem; */
  /* background-color: white; */
  /* font-size: 13px; */
  /* text-overflow: ellipsis; */
`
const Data = styled.td`
  padding: 0.5rem;
  font-size: 1rem;
`

const status = ["New", "Assigned", "In process", "Converted", "Lost"]

function Lead({ data, fields, ...props }) {
  return (
    <Row>
      <td>Edit</td>
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
      <td>Actions</td>
    </Row>
  )
}
export default Lead
