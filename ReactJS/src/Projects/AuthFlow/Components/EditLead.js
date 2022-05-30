import { useEffect, useState } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { protectedRoute, editRoute } from "../../../routes"
import { getRecord, searchDB, updateDB } from "../aop"
import { FUNCTION_DB, USER_DB, LEAD_DB, TEAM_DB } from "../../../databases"

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
`

export default function EditLead() {
  /* need to add validation such that an empty string in name can't be sent 
     to the server
  */
  const [formData, setFormData] = useState({})
  const [serverData, setServerData] = useState({})
  const [error, setError] = useState(false)

  const [options, setOptions] = useState({
    //should be in the format name+"Options"
    jobTitleFunctionOptions: [],
    userOptions: [],
    teamOptions: [],
  })

  const { userId } = useParams()
  const navigate = useNavigate()

  const GetOptions = (database, name) => {
    !options[name][0] &&
      searchDB(database)
        .then((data) => {
          setOptions((p) => ({
            ...p,
            [name]: data.map((v) => {
              const { name, id } = v
              return { name, id }
            }),
          }))
        })
        .catch((err) => {
          console.log(err)
        })
  }

  const formatValue = (name, value) => {
    let formattedValue
    switch (name) {
      case "emailAddress":
        formattedValue = { address: value }
        break
      case "jobTitleFunction":
      case "user":
      case "team":
        formattedValue = options[`${name}Options`].find(
          (v) => v.id === parseInt(value)
        )
        if (formattedValue === undefined) formattedValue = ""
        break

      default:
        formattedValue = value
        break
    }
    return formattedValue
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.currentTarget

    setFormData((prevFormData) => {
      const formattedValue = formatValue(name, value)
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : formattedValue,
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    updateDB(LEAD_DB, formData, isNaN(userId) ? undefined : userId)
      .then((data) => {
        setServerData(data)
        setFormData({
          version: data.version,
        })
        if (isNaN(userId)) {
          navigate(`${protectedRoute}/${editRoute}/${data.id}`, {
            replace: true,
          })
        }
      })
      .catch((err) => console.log(err))
  }

  const controlledValue = (propertyName, defaultValue) =>
    Object.keys(formData).includes(propertyName) &&
    formData[propertyName] !== ""
      ? formData[propertyName]
      : Object.keys(serverData).includes(propertyName) &&
        serverData[propertyName] !== null &&
        formData[propertyName] !== ""
      ? serverData[propertyName]
      : defaultValue

  useEffect(() => {
    //when userId changes clear any previous serverData & formData and fetch new one
    if (Object.keys(formData).length !== 0) setFormData({}) //checking length to make sure it's not already empty to avoid unnecessary re-renders
    if (Object.keys(serverData).length !== 0) setServerData({})
    setError(false)
    if (!isNaN(userId)) {
      console.log("fetched serverdata with id:", userId)

      getRecord(LEAD_DB, userId)
        .then((data) => {
          setServerData(data)
          setFormData((p) => ({
            ...p,
            version: data.version,
          }))
        })
        .catch((err) => {
          setError(true)
          if (err === undefined) console.error("No data for ID ", userId)
          else console.error(err)
        })

      GetOptions(FUNCTION_DB, "jobTitleFunctionOptions")
      GetOptions(USER_DB, "userOptions")
    }
  }, [userId])

  // console.log("UserId:", userId)

  // console.log(formData)
  return (
    <OuterContainer>
      {error ? (
        <h1>Some Error occured, please check the console </h1>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Last Name"
              name="name"
              onChange={handleChange}
              value={controlledValue("name", "")}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={controlledValue("firstName", "")}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Enterprise Name"
              name="enterpriseName"
              onChange={handleChange}
              value={controlledValue("enterpriseName", "")}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="emailAddress"
              onChange={handleChange}
              value={
                Object.keys(formData).includes("emailAddress")
                  ? formData.emailAddress.address
                  : Object.keys(serverData).includes("emailAddress") &&
                    serverData.emailAddress
                  ? serverData.emailAddress.name.replace(/[\[\]']+/g, "")
                  : ""
              } //server doesn't send address property but sends name property which has square brackets around the address.
            />
          </div>
          <div>
            <input
              type="checkbox"
              name="isDoNotCall"
              id="callRejection"
              onChange={handleChange}
              checked={controlledValue("isDoNotCall", false)}
            />
            <label htmlFor="callRejection">Rejection of calls</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="isDoNotSendEmail"
              id="emailRejection"
              onChange={handleChange}
              checked={controlledValue("isDoNotSendEmail", false)}
            />
            <label htmlFor="emailRejection">Rejection of Emails</label>
          </div>
          <div>
            <select
              name="jobTitleFunction"
              onChange={handleChange}
              value={controlledValue("jobTitleFunction", { id: "" }).id}
              onFocus={() => GetOptions(FUNCTION_DB, "jobTitleFunctionOptions")}
            >
              <option value="">Select JobTitle</option>
              {options.jobTitleFunctionOptions.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              name="user"
              onChange={handleChange}
              value={controlledValue("user", { id: "" }).id}
              onFocus={() => GetOptions(USER_DB, "userOptions")}
            >
              <option value="">Select User</option>
              {options.userOptions.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              name="team"
              onChange={handleChange}
              value={controlledValue("team", { id: "" }).id}
              onFocus={() => GetOptions(TEAM_DB, "teamOptions")}
            >
              <option value="">Select Team</option>
              {options.teamOptions.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" id="submit">
            {isNaN(userId) ? "Create Lead" : "Update Lead"}
          </button>
        </form>
      )}
    </OuterContainer>
  )
}
