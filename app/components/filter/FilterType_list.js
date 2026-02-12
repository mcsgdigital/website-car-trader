export default function FilterType_list({ list, listName, onChange, unitName = "" }) {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    onChange(selectedValue); // Pass the selected value to the parent component
  };

  return (
    <select
      className="w-full p-2 border border-gray-300 rounded text-gray-200 dark:text-black"
      onChange={handleChange} // Trigger handleChange on selection
    >
      <option value="" className="text-gray-200 dark:text-black">Select {listName}</option>
      {list.map((item, idx) => (
        <option key={idx} value={item} className="text-gray-200 dark:text-black">
          {item}
          {unitName}
        </option>
      ))}
    </select>
  );
}