export default function FilterType_list({ list, listName, onChange, unitName = "" }) {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    onChange(selectedValue); // Pass the selected value to the parent component
  };

  return (
    <select
      className="w-full p-2 border border-gray-300 rounded"
      onChange={handleChange} // Trigger handleChange on selection
    >
      <option value="">Select {listName}</option>
      {list.map((item, idx) => (
        <option key={idx} value={item}>
          {item}
          {unitName}
        </option>
      ))}
    </select>
  );
}