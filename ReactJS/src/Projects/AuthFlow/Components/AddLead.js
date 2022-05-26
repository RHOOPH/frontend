import { useState } from "react"
import readCookie from "../readCookie"
import styled from "styled-components"

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
`

function AddLead() {
  const [formData, setFormData] = useState({})

  const [jobTitleFunctionOptions, setJobTitleFunctionOptions] = useState([])
  const GetJobTitleFunction = () => {
    !jobTitleFunctionOptions[0] &&
      fetch(
        "/open-suite-master/ws/rest/com.axelor.apps.base.db.Function/search",
        {
          method: "POST",
          body: JSON.stringify({ fields: ["id", "name"], sortBy: ["id"] }),
          headers: {
            "X-CSRF-Token": readCookie("CSRF-TOKEN"),
          },
        }
      )
        .then((res) => {
          if (res.ok) return res.json()
          else throw new Error(`${res.status} ${res.statusText}`)
        })
        .then((data) => {
          if (data.status === 0) {
            setJobTitleFunctionOptions(
              data.data.map((v) => {
                const { name, id } = v
                return { name, id }
              })
            )
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
        formattedValue = jobTitleFunctionOptions.find(
          (v) => v.id === parseInt(value)
        )

        //passing { id:parseInt(value)} will also work.
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
    fetch("/open-suite-master/ws/rest/com.axelor.apps.crm.db.Lead", {
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
          setFormData((p) => ({ ...p, version: data?.data[0]?.version }))
        } else throw data.data
      })
      .catch((err) => console.log(err))
  }

  return (
    <OuterContainer>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Last Name"
            name="name"
            onChange={handleChange}
            value={formData.name || ""}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName || ""}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enterprise Name"
            name="enterpriseName"
            onChange={handleChange}
            value={formData.enterpriseName || ""}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            name="emailAddress"
            onChange={handleChange}
            value={formData.emailAddress?.address || ""}
          />
        </div>
        <div>
          <input
            type="checkbox"
            name="isDoNotCall"
            id="callRejection"
            onChange={handleChange}
            checked={formData.isDoNotCall || false} //or with false to keep the input controlled
          />
          <label htmlFor="callRejection">Rejection of calls</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="isDoNotSendMail"
            id="emailRejection"
            onChange={handleChange}
            checked={formData.isDoNotSendMail || false} //or with false to keep the input controlled
          />
          <label htmlFor="emailRejection">Rejection of Emails</label>
        </div>
        <div>
          <select
            name="jobTitleFunction"
            onChange={handleChange}
            value={formData.jobTitleFunction?.id || ""}
            onFocus={GetJobTitleFunction}
          >
            <option value="">Select JobTitle</option>
            {jobTitleFunctionOptions.map((v) => (
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
export default AddLead
