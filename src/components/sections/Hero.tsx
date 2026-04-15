import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <section className="hero-bg relative flex min-h-[90vh] items-center justify-center px-6">
      <div className="grid w-full max-w-7xl items-center gap-12 md:grid-cols-2">
        {/* LEFT */}
        <div className="space-y-6">
          <h1 className="text-glow text-6xl leading-tight font-extrabold text-primary md:text-7xl">
            THE NOIR <br />
            ECLIPSE
          </h1>

          <p className="max-w-md text-lg text-muted-foreground">
            Enter a world of shadows, mystery, and cinematic brilliance.
            Experience the next generation of storytelling.
          </p>

          <Link to={"/booking"}>
            <button className="rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105">
              Book Now
            </button>
          </Link>
        </div>

        {/* RIGHT (Poster Card) */}
        <div className="relative flex justify-center">
          <div className="red-glow h-[400px] w-[300px] overflow-hidden rounded-2xl border border-border shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=800"
              alt="movie"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Glow background */}
          <div className="absolute -z-10 h-[350px] w-[350px] rounded-full bg-primary/20 blur-3xl" />
        </div>
      </div>
    </section>
  )
}

export default Hero
