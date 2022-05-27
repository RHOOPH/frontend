import { useEffect, useState } from "react"
import readCookie from "../readCookie"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { protectedRoute, editRoute } from "../../../routes"

const functionURL =
  "/open-suite-master/ws/rest/com.axelor.apps.base.db.Function"
const LeadURL = "/open-suite-master/ws/rest/com.axelor.apps.crm.db.Lead"
const userURL = "/open-suite-master/ws/rest/com.axelor.auth.db.User"

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
`

function EditLead() {
  const [formData, setFormData] = useState({})
  const [serverData, setServerData] = useState({})

  const [options, setOptions] = useState({
    jobTitleFunctionOptions: [],
    userOptions: [],
  })

  const { userId } = useParams()
  const navigate = useNavigate()

  const GetOptions = (
    name,
    url,
    body = { fields: ["id", "name"], sortBy: ["id"] }
  ) => {
    !options[name][0] &&
      fetch(url + "/search", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "X-CSRF-Token": readCookie("CSRF-TOKEN"),
        },
      })
        .then((res) => {
          if (res.ok) return res.json()
          else throw new Error(`${res.status} ${res.statusText}`)
        })
        .then((data) => {
          if (data.status === 0) {
            setOptions((p) => ({
              ...p,
              [name]: data.data.map((v) => {
                const { name, id } = v
                return { name, id }
              }),
            }))
          } else throw data.data
        })
        .catch((err) => console.log(err))
  }

  const formatValue = (name, value) => {
    let formattedValue
    switch (name) {
      case "emailAddress":
        formattedValue = { address: value }
        break
      case "jobTitleFunction":
        formattedValue = options.jobTitleFunctionOptions.find(
          (v) => v.id === parseInt(value)
        )
        break
      case "user":
        formattedValue = options.userOptions.find(
          (v) => v.id === parseInt(value)
        )
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
    fetch(isNaN(userId) ? LeadURL : `${LeadURL}/${userId}`, {
      method: "POST",
      body: JSON.stringify({ data: formData }),
      headers: {
        "X-CSRF-Token": readCookie("CSRF-TOKEN"),
      },
    })
      .then((res) => {
        if (res.ok) return res.json()
        else throw new Error(`${res.status} ${res.statusText}`)
      })
      .then((data) => {
        if (data.status === 0) {
          setServerData(data.data[0])
          setFormData({ version: data.data[0]?.version })
          if (isNaN(userId)) {
            console.log("navigating to ", `./${data?.data[0]?.id}`)
            navigate(`${protectedRoute}/${editRoute}/${data?.data[0]?.id}`, {
              replace: true,
            })
          }
        } else throw data.data
      })
      .catch((err) => console.log(err))
  }

  const controlledValue = (propertyName, defaultValue) =>
    Object.keys(formData).includes(propertyName)
      ? formData[propertyName]
      : Object.keys(serverData).includes(propertyName) &&
        serverData[propertyName] !== null
      ? serverData[propertyName]
      : defaultValue

  useEffect(() => {
    if (!isNaN(userId) && serverData.id === undefined) {
      fetch(LeadURL + "/" + userId)
        .then((res) => {
          if (res.ok) return res.json()
          else throw new Error(`${res.status} ${res.statusText}`)
        })
        .then((data) => {
          if (data.status === 0) {
            setServerData(data.data[0])
            setFormData((p) => ({ ...p, version: data.data[0]?.version }))
          } else throw data.data
        })
        .catch((err) => console.log(err))
    }
    if (!isNaN(userId)) {
      GetOptions("jobTitleFunctionOptions", functionURL)
      GetOptions("userOptions", userURL)
    }
  }, [userId, serverData.id])

  console.log(formData)
  return (
    <OuterContainer>
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
            onFocus={GetOptions("jobTitleFunctionOptions", functionURL)}
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
            onFocus={GetOptions("userOptions", userURL)}
          >
            <option value="">Select User</option>
            {options.userOptions.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" id="submit">
          Submit
        </button>
      </form>
    </OuterContainer>
  )
}
export default EditLead
