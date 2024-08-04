export function SlideButton({
  label,
  amount,
  increase,
  onClickCallback,
}: {
  label: string;
  amount: number;
  increase: boolean;
  onClickCallback: (index: number) => void;
  //setFunction:React.Dispatch<React.SetStateAction<number>>
}) {
  return (
    <button
      className="Button"
      onClick={() => {
        const value = !increase ? amount : -amount;
        onClickCallback(value);
      }}
    >
      {label}
    </button>
  );
}
