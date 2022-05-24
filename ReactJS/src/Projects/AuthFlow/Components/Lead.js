import styled from "styled-components"

const GridItem = styled.div`
  padding: 0.5rem;
  background-color: white;
  font-size: 13px;
  text-overflow: ellipsis;
`

const status = ["New", "Assigned", "In process", "Converted", "Lost"]

function Lead({ data, fields, ...props }) {
  return fields.map(({ name }, index) => {
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

    return <GridItem key={index}>{value}</GridItem>
  })
}
export default Lead
