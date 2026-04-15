import { useState, useEffect } from "react";
import Seat from "./Seat";
import { api } from "@/api";
import { useToast } from "@/components/ui/ToastProvider.tsx";

interface SeatData {
  id: number;
  name: string | null;
  isbooked: number;
  user_id?: number | null;
  seat_number: string;
}

const getRowFromSeat = (seatNumber: string) => seatNumber.match(/^[A-Z]+/)?.[0] ?? "";
const getSeatIndex = (seatNumber: string) => parseInt(seatNumber.match(/\d+/)?.[0] ?? "0", 10);

const SeatGrid = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [seats, setSeats] = useState<SeatData[]>([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await api.fetchSeats();
        setSeats(response.data.seats);
      } catch (error) {
        console.error("Failed to fetch seats:", error);
        toast.showToast("Unable to load seats. Please refresh.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [toast]);

  const seatRows = (() => {
    const uniqueRows = Array.from(
      new Set(seats.map((seat) => getRowFromSeat(seat.seat_number)))
    ).filter(Boolean) as string[];

    return uniqueRows
      .sort((a, b) => a.localeCompare(b))
      .map((row) => ({
        row,
        seats: seats
          .filter((seat) => getRowFromSeat(seat.seat_number) === row)
          .sort((a, b) => getSeatIndex(a.seat_number) - getSeatIndex(b.seat_number)),
      }));
  })();

  const toggleSeat = (seatId: string) => {
    if (selected === seatId) {
      setSelected(null);
    } else {
      setSelected(seatId);
    }
  };

  const handleBooking = async () => {
    if (!selected) return;

    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user?.name) {
      toast.showToast("Session expired. Please log in again.", "warning");
      return;
    }

    const selectedSeat = seats.find(seat => seat.seat_number === selected);
    if (!selectedSeat) {
      toast.showToast("Selected seat not found.", "warning");
      return;
    }

    toast.showToast("Booking seat...", "loading", 2500);
    setBooking(true);
    try {
      const response = await api.bookSeat(selectedSeat.id, user.name);
      const bookedSeat = response.data.bookedSeat;
      setSeats(prev => prev.map(seat => 
        seat.id === bookedSeat.id
          ? { ...seat, ...bookedSeat }
          : seat
      ));
      setSelected(null);
      toast.showToast("Seat booked successfully!", "success");
    } catch (error) {
      console.error("Booking failed:", error);
      toast.showToast("Booking failed. Please try again.", "error");
    } finally {
      setBooking(false);
    }
  };

  const totalPrice = selected ? 12 : 0;

  if (loading) {
    return <div className="text-center py-8">Loading seats...</div>;
  }

  return (
    <div className="space-y-6">
      
      {/* Grid */}
      <div className="space-y-3 max-h-[55vh] overflow-y-auto overflow-x-auto hide-scrollbar rounded-3xl p-3 border border-border bg-card/80">
        {seatRows.map(({ row, seats: rowSeats }) => (
          <div key={row} className="flex items-center gap-3">
            <div className="w-6 text-sm font-semibold text-muted-foreground">{row}</div>
            <div className="grid flex-1 grid-flow-col gap-3" style={{ gridAutoColumns: "minmax(2rem, auto)" }}>
              {rowSeats.map((seatData) => {
                const seatId = seatData.seat_number;
                const isBooked = seatData.isbooked === 1;
                const isSelected = selected === seatId;

                return (
                  <Seat
                    key={seatId}
                    id={seatId}
                    selected={isSelected}
                    booked={isBooked}
                    bookerName={seatData?.name}
                    onClick={() => !isBooked && toggleSeat(seatId)}
                  />
                );
              })}
            </div>
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
          <div className="w-4 h-4 bg-green-500 rounded-sm" />
          Booked
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
            {selected ? "1 seat" : "0 seats"} <br />
            {selected || "None"}
          </div>
        </div>

        <button 
          onClick={handleBooking}
          disabled={!selected || booking}
          className="w-full py-3 rounded-xl bg-primary text-white mt-4 hover:scale-105 transition disabled:opacity-50"
        >
          {booking ? "Booking..." : "CONFIRM BOOKING"}
        </button>
      </div>

      <div className="border-t border-border pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Your booked tickets</p>
          </div>
        </div>

        <div className="mt-4 max-h-56 overflow-y-auto hide-scrollbar rounded-xl border border-red-500/30 p-4">
          {(() => {
            const user = JSON.parse(localStorage.getItem("user") || "null");
            const bookedSeats = seats.filter(
              seat => seat.isbooked === 1 && user?.name && seat.name === user.name
            );

            if (bookedSeats.length === 0) {
              return (
                <div className="rounded-xl border border-dashed border-red-500/40 bg-red-500/5 p-6 text-center text-sm text-muted-foreground">
                  No booked tickets yet.
                </div>
              );
            }

            return (
              <div className="flex flex-wrap gap-2">
                {bookedSeats.map((seat) => (
                  <span
                    key={seat.id}
                    className="inline-flex items-center justify-center rounded-full border border-red-400 bg-red-500/15 px-3 py-2 text-sm font-semibold text-white"
                  >
                    {seat.seat_number}
                  </span>
                ))}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default SeatGrid;