export default function FilterType_list({ list, listName, unitName="" }) {
  return (
    <select className="w-full p-2 border border-gray-300 rounded">
        <option value="">Select {listName}</option>
        {list.map((item, idx) => (
        <option key={idx} value={item}>
            {item}{unitName}
        </option>
        ))}
    </select>
  );
}