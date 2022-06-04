export default function OneToOne({ name, type, title, onChange, value }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.currentTarget
    onChange({
      [name]:
        type === "checkbox"
          ? checked
          : name === "emailAddress"
          ? { address: value }
          : value,
    })
  }

  return (
    <div>
      {type === "checkbox" ? (
        <>
          <input
            type={type}
            name={name}
            id={name}
            onChange={handleChange}
            checked={value ?? false}
          />
          <label htmlFor={name}>{title}</label>
        </>
      ) : (
        <input
          type={type}
          placeholder={title}
          id={name}
          name={name}
          onChange={handleChange}
          value={value ?? ""}
        />
      )}
    </div>
  )
}
