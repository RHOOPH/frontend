import { useEffect, useState, useCallback } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { protectedRoute, editRoute } from "../../../routes"
import { getRecord, updateDB } from "../aopUtils"
import {
  FUNCTION_DB,
  USER_DB,
  LEAD_DB,
  TEAM_DB,
  SOURCE_DB,
  CITY_DB,
  COUNTRY_DB,
  REGION_DB,
} from "../../../databases"
import ManyToOne from "./ManyToOne"
import OneToOne from "./OneToOne"

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
`
const manyToOneFields = [
  {
    database: FUNCTION_DB,
    name: "jobTitleFunction",
  },
  {
    database: USER_DB,
    name: "user",
  },
  {
    database: TEAM_DB,
    name: "team",
  },
  {
    database: SOURCE_DB,
    name: "source",
  },
  {
    database: COUNTRY_DB,
    name: "primaryCountry",
  },
  {
    database: REGION_DB,
    name: "primaryState",
  },
  {
    database: CITY_DB,
    name: "primaryCity",
  },
]
const oneToOneFields = [
  {
    type: "text",
    title: "Last Name",
    name: "name",
  },
  {
    type: "text",
    title: "First Name",
    name: "firstName",
  },
  {
    type: "text",
    title: "Enterprise Name",
    name: "enterpriseName",
  },
  {
    type: "email",
    title: "Email",
    name: "emailAddress",
  },
  {
    type: "checkbox",
    title: "Rejection of calls",
    name: "isDoNotCall",
  },
  {
    type: "checkbox",
    title: "Rejection of Emails",
    name: "isDoNotSendEmail",
  },
]

export default function EditLead() {
  const [formData, setFormData] = useState({})
  const [serverData, setServerData] = useState({})
  const [error, setError] = useState(false)

  const { userId } = useParams()
  const navigate = useNavigate()

  const handleChange = useCallback((formDataObj) => {
    setFormData((p) => ({ ...p, ...formDataObj }))
  }, [])

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
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    setError(false)
    if (!isNaN(userId)) {
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

      return () => {
        setFormData({})
        setServerData({})
      }
    }
    // eslint-disable-next-line
  }, [userId])

  const canDisableSubmit = () => {
    if (isNaN(userId)) return !formData.name
    if (formData.name === "") return true
    return false
    // oneliner
    // isNaN(userId)?!formData.name:formData.name===""?true:false
  }

  return (
    <OuterContainer>
      {error ? (
        <h1>Some Error occured, please check the console </h1>
      ) : (
        <form onSubmit={handleSubmit}>
          {oneToOneFields.map((field) => {
            return (
              <OneToOne
                key={field.name}
                name={field.name}
                type={field.type}
                title={field.title}
                onChange={handleChange}
                value={
                  field.name !== "emailAddress"
                    ? formData[field.name] ?? serverData[field.name]
                    : formData.emailAddress?.address ??
                      serverData.emailAddress?.name?.replace(/[\[\]']+/g, "")
                  //for email server doesn't send address property but sends name property which has square brackets around the address.
                }
              />
            )
          })}
          {manyToOneFields.map((field) => {
            return (
              <ManyToOne
                key={field.name}
                database={field.database}
                name={field.name}
                onSelect={handleChange}
                value={
                  formData.hasOwnProperty(field.name)
                    ? formData[field.name]
                    : serverData[field.name]
                }
              />
            )
          })}
          <button type="submit" id="submit" disabled={canDisableSubmit()}>
            {isNaN(userId) ? "Create Lead" : "Update Lead"}
          </button>
        </form>
      )}
    </OuterContainer>
  )
}
