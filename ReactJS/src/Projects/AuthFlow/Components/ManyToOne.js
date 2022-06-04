import { useEffect, useState } from "react"
import { searchDB } from "../aopUtils"

export default function ManyToOne({ database, onSelect, name, value }) {
  const [options, setOptions] = useState([])

  const getOptions = (e) => {
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

  const handleChange = (e) => {
    const { name, value } = e.currentTarget
    onSelect({
      [name]: options.find((option) => option.id === parseInt(value)) ?? "",
    })
  }
  useEffect(() => {
    if (value) {
      getOptions()
    }
    // eslint-disable-next-line
  }, [value])

  return (
    <div>
      <select
        name={name}
        onChange={handleChange}
        value={value?.id ?? ""}
        onFocus={getOptions}
      >
        <option value="">Select {name}</option>
        {options.map((v) => (
          <option key={v.id} value={v.id}>
            {v.name}
          </option>
        ))}
      </select>
    </div>
  )
}
