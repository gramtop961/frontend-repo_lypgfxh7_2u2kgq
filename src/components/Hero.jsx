import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="backdrop-blur-sm/0">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-sm">
            Reserve top website designers on-demand
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl">
            A curated roster of frontend, backend, and full‑stack freelancers. Browse portfolios,
            check availability, and book the perfect specialist for your project.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#freelancers" className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors">
              Explore roster
            </a>
            <a href="#advertise" className="px-5 py-3 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors">
              Advertise now
            </a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/30 to-slate-950" />
    </section>
  )
}

export default Hero
