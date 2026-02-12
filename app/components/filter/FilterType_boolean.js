export default function FilterType_boolean({ valueA, valueB, boolName, onChange }) {
  const handleChange = (event) => {
    const selectedValue = event.target.value; // Get the selected value
    onChange(selectedValue); // Pass the selected value to the parent component
  };

  return (
    <select
      className="w-full p-2 border border-gray-300 rounded text-gray-200 dark:text-black"
      onChange={handleChange} // Trigger handleChange on selection
    >
      <option value="">Select {boolName}</option>
      <option value={valueA}>{valueA}</option>
      <option value={valueB}>{valueB}</option>
    </select>
  );
}