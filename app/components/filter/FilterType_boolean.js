export default function FilterType_boolean({ valueA, valueB, boolName }) {
  return (
    <select className="w-full p-2 border border-gray-300 rounded">
        <option value="">Select {boolName}</option>
        <option value={valueA}>{valueA}</option>
        <option value={valueB}>{valueB}</option>
    </select>
  );
}