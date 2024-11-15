interface PaginationItemProps {
  page: number;
  active: boolean;
  onPageSelected: (page: number) => void;
}

export default function PaginationItem({
  page,
  active,
  onPageSelected,
}: PaginationItemProps) {
  return (
    <div className="flex items-center justify-center">
      <button
        className={`border border-1 border-[#0A84FF] rounded-full hover:bg-[#0A84FF]/80 hover:text-white transition duration-300 leading-none px-2 aspect-square w-8 ${
          active
            ? "bg-[#0A84FF] text-white bg-opacity-80"
            : "bg-transparent text-[#0A84FF]"
        }`}
        onClick={() => onPageSelected(page)}
      >
        {page}
      </button>
    </div>
  );
}
