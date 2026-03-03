import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home.tsx';
import NotFound from "./pages/NotFound.tsx";

function App() {
  return (
    <BrowserRouter>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ margin: '0 10px' }}>Home</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App