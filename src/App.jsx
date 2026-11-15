import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import DashboardPage from './components/DashboardPage'
import GuestsPage from './components/GuestsPage'
import TasksPage from './components/TasksPage'
import BudgetPage from './components/BudgetPage'
import VendorsPage from './components/VendorsPage'
import SchedulePage from './components/SchedulePage'
import VenuePage from './components/VenuePage'
import Footer from './components/Footer'
import UserNameModal from './components/UserNameModal'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-midnight">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <>
    <UserNameModal />
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Hero />
            <DashboardPage />
          </Layout>
        }
      />
      <Route path="/guests"   element={<Layout><GuestsPage /></Layout>} />
      <Route path="/tasks"    element={<Layout><TasksPage /></Layout>} />
      <Route path="/budget"   element={<Layout><BudgetPage /></Layout>} />
      <Route path="/vendors"  element={<Layout><VendorsPage /></Layout>} />
      <Route path="/schedule" element={<Layout><SchedulePage /></Layout>} />
      <Route path="/venue"    element={<Layout><VenuePage /></Layout>} />
    </Routes>
    </>
  )
}
