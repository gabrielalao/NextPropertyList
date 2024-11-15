interface NumberPerPageProps {
  options?: number[];
  perPage: number;
  onChanged: (numberPerPage: number) => void;
}

export default function NumberPerPage({
  perPage,
  options,
  onChanged,
}: NumberPerPageProps) {
  if (!options) {
    options = [6, 9, 12];
  }

  return (
    <div className="flex gap-2 items-center">
      <select
        onChange={(e) => onChanged(Number(e.target.value))}
        value={perPage}
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#0A84FF] focus:border-[#0A84FF] block p-2.5 focus:ring-blue-500 focus:ring-1 focus:outline-none focus:border[#0A84FF] focus:ring-1 focus:ring-[#0A84FF] transition duration-300"
      >
        {options.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
      <p className="text-[#0A84FF] text-lg">/ page</p>
    </div>
  );
}
