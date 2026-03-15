import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

import DietPlan from "./components/DietPlan";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="text-red-500">
        <DietPlan />
      </div>
    </>
  )
}

export default App
