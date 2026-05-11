import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/sidebar'
// import Dashboard from './pages/Dashboard'
import CodingLabs from './pages/codingLabs.tsx'
import LearnPage from './pages/LearnPage.tsx'
import LabPage from './pages/LabPage.tsx'
// import Activities from './pages/Activities'

function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Navbar
      />
      <main style={{ flex: 1, height: "100vh", overflowY: "auto" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/coding-labs" element={<CodingLabs />} />
          <Route path='/coding-labs/learn' element={<LearnPage />} />
          <Route path='/coding-labs/lab' element={<LabPage />} />
          {/* <Route path="/activities" element={<Activities />} /> */}
        </Routes>
      </main>
    </div>
  )
}

export default App