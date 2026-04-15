const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center hero-bg px-6">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT */}
        <div className="space-y-6">
          
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight text-primary text-glow">
            THE NOIR <br />
            ECLIPSE
          </h1>

          <p className="text-muted-foreground text-lg max-w-md">
            Enter a world of shadows, mystery, and cinematic brilliance.
            Experience the next generation of storytelling.
          </p>

          <button className="px-6 py-3 bg-primary text-white rounded-xl font-semibold shadow-lg hover:scale-105 transition-all">
            Book Now
          </button>
        </div>

        {/* RIGHT (Poster Card) */}
        <div className="relative flex justify-center">
          
          <div className="w-[300px] h-[400px] rounded-2xl overflow-hidden border border-border shadow-2xl red-glow">
            <img
              src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=800"
              alt="movie"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Glow background */}
          <div className="absolute w-[350px] h-[350px] bg-primary/20 blur-3xl rounded-full -z-10" />
        </div>
      </div>
    </section>
  );
};

export default Hero;