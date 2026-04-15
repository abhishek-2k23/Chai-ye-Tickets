type Props = {
  id: string;
  selected: boolean;
  booked?: boolean;
  bookerName?: string | null;
  onClick: () => void;
};

const Seat = ({ selected, booked = false, bookerName, onClick }: Props) => {
  return (
    <div
      onClick={booked ? undefined : onClick}
      className={`
        w-8 h-8 rounded-md transition-all relative group
        ${booked ? "bg-green-500 cursor-not-allowed" : selected ? "bg-primary cursor-pointer" : "bg-muted hover:bg-muted/70 cursor-pointer"}
      `}
    >
      {booked && bookerName && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
          {bookerName}
        </div>
      )}
    </div>
  );
};

export default Seat;