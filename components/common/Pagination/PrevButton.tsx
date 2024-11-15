interface PrevButtonProps {
  disabled: boolean;
  onPrev: () => void;
}

export default function PrevButton({ disabled, onPrev }: PrevButtonProps) {
  return (
    <button
      className="rounded-md border-primary border-1 text-primary bg-transparent hover:bg-primary/50 p-2 text-[#0A84FF]"
      disabled={disabled}
      onClick={() => onPrev()}
    >
      Prev
    </button>
  );
}
