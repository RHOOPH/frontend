import { useCallback, useState } from "react"
import { searchDB } from "../aopUtils"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
// import useDebugInformation from "../../../useDebugInformation"
import debounce from "../../../debounce"

const LIMIT = 10

//https://stackoverflow.com/a/36744732
const filterDuplicate = (arr) => {
  return arr.filter((v, i, self) => i === self.findIndex((t) => v.id === t.id))
}

export default function ManyToOne({ database, onSelect, name, value }) {
  const [options, setOptions] = useState([])
  const [totalOptions, setTotalOptions] = useState(Infinity)
  const [inputValue, setInputValue] = useState("")

  //for debugging
  //useDebugInformation(name, { value, options, inputValue })

  //hot fix for "user" database // anti pattern
  if (value) {
    if (!value.hasOwnProperty("name")) {
      if (value.hasOwnProperty("fullName")) value.name = value.fullName
    }
  }

  // external dependencies in the below function should be passed as args for
  //useCallback
  const getOptions = (query = "") => {
    if (
      options.length < totalOptions &&
      (query !== "" || options.length < LIMIT)
    ) {
      console.log(
        `calling getOptions for ${name.toUpperCase()} with query=${query}; options:${
          options.length
        }; totalOptions:${totalOptions};`
      )

      searchDB(database, {
        fields: ["id", "name"],
        sortBy: ["id"],
        data: {
          _domain: `LOWER(self.name) like LOWER('%${query}%') `,
        },
        limit: LIMIT,
      })
        .then((data) => {
          if (query === "") {
            setTotalOptions(data.total)
          }
          if (data.data) {
            setOptions((p) =>
              filterDuplicate([
                ...p,
                ...data.data.map((v) => {
                  const { name, id } = v
                  return { name, id }
                }),
              ])
            )
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  const debouncedGetOptions = useCallback(debounce(getOptions, 500), [
    options,
    totalOptions,
  ])

  const handleInputChange = (_, newValue) => {
    if (!options.find((option) => option.name === newValue)) {
      debouncedGetOptions(newValue)
    }
    setInputValue(newValue)
  }
  const handleChange = (_, newValue) => onSelect({ [name]: newValue })

  const handleOpen = () => getOptions()
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.name}
      value={value ?? null}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={handleChange}
      onOpen={handleOpen}
      openOnFocus
      inputValue={inputValue}
      sx={{ my: 2 }}
      onInputChange={handleInputChange}
      renderInput={(params) => <TextField {...params} label={name} />}
    />
  )
}
