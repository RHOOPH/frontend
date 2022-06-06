import { useEffect, useState } from "react"
import { searchDB } from "../aopUtils"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"

export default function ManyToOne({ database, onSelect, name, value }) {
  const [options, setOptions] = useState([])
  const [inputValue, setInputValue] = useState("")

  const getOptions = () => {
    if (options.length === 0) {
      searchDB(database)
        .then((data) => {
          setOptions(
            data.map((v) => {
              const { name, id } = v
              return { name, id }
            })
          )
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  useEffect(() => {
    if (value) {
      getOptions()
    }
    // eslint-disable-next-line
  }, [value])

  const controlledValue = (value) => {
    if (value == null) return null // return null for null & undefined
    const temp = options.find((option) => option.id === value.id)
    if (!temp) {
      console.log(
        `selected option ${JSON.stringify(
          value
        )} does not exist in available options`
      )
      return null
    }
    return temp
  }
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.name}
      value={controlledValue(value)}
      onChange={(_, newValue) => onSelect({ [name]: newValue })}
      onFocus={getOptions}
      inputValue={inputValue}
      onInputChange={(_, newValue) => setInputValue(newValue)}
      renderInput={(params) => <TextField {...params} label={name} />}
    />
  )
}
