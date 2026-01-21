export default function FilterType_range() {
  return (
    <div className="flex items-center gap-4">
        <input
        type="number"
        placeholder="Min"
        className="w-1/2 p-2 border border-gray-300 rounded"
        />
        <input
        type="number"
        placeholder="Max"
        className="w-1/2 p-2 border border-gray-300 rounded"
        />
    </div>
  );
}