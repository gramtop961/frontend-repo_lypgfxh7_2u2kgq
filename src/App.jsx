import Hero from './components/Hero'
import Roster from './components/Roster'
import Advertise from './components/Advertise'
import Forum from './components/Forum'

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />
      <Roster />
      <Advertise />
      <Forum />
    </div>
  )
}

export default App