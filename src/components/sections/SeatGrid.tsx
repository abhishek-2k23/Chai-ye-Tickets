import { useState } from "react";
import Seat from "./Seat";

const rows = ["A", "B", "C", "D", "E"];
const cols = 8;

const SeatGrid = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSeat = (seatId: string) => {
    setSelected((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const totalPrice = selected.length * 12;

  return (
    <div className="space-y-6">
      
      {/* Grid */}
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row} className="flex gap-3 justify-center">
            {Array.from({ length: cols }).map((_, i) => {
              const seatId = `${row}${i + 1}`;
              return (
                <Seat
                  key={seatId}
                  id={seatId}
                  selected={selected.includes(seatId)}
                  onClick={() => toggleSeat(seatId)}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-muted rounded-sm" />
          Available
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-black rounded-sm" />
          Reserved
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded-sm" />
          Selected
        </div>
      </div>

      {/* Price */}
      <div className="border-t border-border pt-4 space-y-2">
        <p className="text-muted-foreground text-sm">TOTAL PRICE</p>

        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">${totalPrice}.00</h3>

          <div className="text-sm text-muted-foreground">
            {selected.length} seats <br />
            {selected.join(", ")}
          </div>
        </div>

        <button className="w-full py-3 rounded-xl bg-primary text-white mt-4 hover:scale-105 transition">
          CONFIRM BOOKING
        </button>
      </div>
    </div>
  );
};

export default SeatGrid;