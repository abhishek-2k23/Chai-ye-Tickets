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

const rows = ["A", "B", "C", "D", "E"];
const cols = 8;

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
      await api.bookSeat(selectedSeat.id, user.name);
      setSeats(prev => prev.map(seat => 
        seat.id === selectedSeat.id
          ? { ...seat, isbooked: 1, name: user.name }
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
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row} className="flex gap-3 justify-center">
            {Array.from({ length: cols }).map((_, i) => {
              const seatId = `${row}${i + 1}`;
              const seatNumber = (row.charCodeAt(0) - 65) * cols + i + 1;
              const seatData = seats.find(s => s.id === seatNumber);
              const isBooked = seatData?.isbooked === 1;
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
    </div>
  );
};

export default SeatGrid;