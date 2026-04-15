type Props = {
  id: string;
  selected: boolean;
  onClick: () => void;
};

const Seat = ({ selected, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`
        w-8 h-8 rounded-md cursor-pointer transition-all
        ${selected ? "bg-primary" : "bg-muted hover:bg-muted/70"}
      `}
    />
  );
};

export default Seat;