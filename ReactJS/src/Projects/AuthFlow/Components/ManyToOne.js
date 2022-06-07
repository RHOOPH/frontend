import { useCallback, useEffect, useState } from "react"
import { searchDB } from "../aopUtils"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import useDebugInformation from "../../../useDebugInformation"
import debounce from "../../../debounce"

//https://stackoverflow.com/a/36744732
const filterDuplicate = (arr) => {
  return arr.filter((v, i, self) => i === self.findIndex((t) => v.id === t.id))
}

export default function ManyToOne({ database, onSelect, name, value }) {
  const [options, setOptions] = useState([])
  const [totalOptions, setTotalOptions] = useState(Infinity)
  const [inputValue, setInputValue] = useState("")
  useDebugInformation(name, { value, options, inputValue })

  const getOptions = (query = "") => {
    if (totalOptions > options.length) {
      console.log("calling getOptions with ", query)

      searchDB(database, {
        fields: ["id", "name"],
        sortBy: ["id"],
        data: {
          _domain: `LOWER(self.name) like LOWER('%${query}%') `,
        },
        limit: 10,
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
  // this useEffect solves the problem of not having an option matching the value sent by the server on inital load. But this introuduces a bug when server data is not matching with the options data
  // useEffect(() => {
  //   if (value) {
  //     if (options.findIndex((option) => option.id === value.id) === -1) {
  //       setOptions((options) => [...options, value])
  //     }
  //   }
  //   // eslint-disable-next-line
  // }, [value])

  useEffect(() => {
    console.log("input value changed to", inputValue)
    debouncedGetOptions(inputValue)
  }, [inputValue])

  const debouncedGetOptions = useCallback(debounce(getOptions, 500), [])
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.name}
      value={value ?? null}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(_, newValue) => onSelect({ [name]: newValue })}
      onOpen={() => getOptions()}
      openOnFocus={false}
      inputValue={inputValue}
      sx={{ my: 2 }}
      onInputChange={(_, newValue) => {
        setInputValue(newValue)
      }}
      renderInput={(params) => <TextField {...params} label={name} />}
    />
  )
}
