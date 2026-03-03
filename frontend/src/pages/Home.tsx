import { useState } from 'react'

const Home = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="card">
      <h1>Home</h1>
      <p>Welcome to the frontend</p>
      <button type="button" onClick={() => setCount((count) => count + 1)}>
        Counter: {count}
      </button>
    </div>
  )
}

export default Home