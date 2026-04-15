import SeatGrid from "./SeatGrid";

const BookingLayout = () => {
  return (
    <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">
      
      {/* LEFT SIDE */}
      <div className="space-y-6">
        
        <img
          src="https://images.unsplash.com/photo-1509395176047-4a66953fd231"
          className="rounded-xl w-[320px] h-[420px] object-cover"
        />

        <div className="space-y-4">
          <h1 className="text-5xl font-bold">
            THE LAST <br /> ARCHITECT
          </h1>

          <div className="flex gap-6 text-sm text-muted-foreground">
            <span>142 MIN</span>
            <span>2024</span>
            <span>ENGLISH</span>
          </div>

          <p className="text-muted-foreground max-w-md">
            In a decaying megalopolis where reality is constructed by neural
            algorithms, a master structuralist discovers a blueprint for a
            world that was never meant to exist.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-6">
        
        <div>
          <h2 className="text-2xl font-semibold">Select Seats</h2>
          <p className="text-muted-foreground text-sm">
            Screen this way
          </p>
        </div>

        <SeatGrid />

      </div>
    </div>
  );
};

export default BookingLayout;