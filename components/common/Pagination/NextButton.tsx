interface NextButtonProps {
  disabled: boolean;
  onNext: () => void;
}

export default function NextButton({ disabled, onNext }: NextButtonProps) {
  return (
    <button
      className="rounded-md border-primary border-1 text-primary hover:bg-primary/50 aspect-sqaure p-2 text-[#0A84FF]s"
      disabled={disabled}
      onClick={() => onNext()}
    >
      Next
    </button>
  );
}
