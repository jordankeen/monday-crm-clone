import { BrowserRouter, Route, Routes } from "react-router-dom"
import './styles/App.scss'
import Nav from './components/Nav'
import Dashboard from './pages/Dashboard'
import TicketPage from './pages/TicketPage'
import CategoriesContext from './context'
import { useState } from "react"

const App = () => {
   const [categories, setCategories] = useState(null)
   const providerValues = { categories, setCategories }
   
  return (
    <div className="app">
      <CategoriesContext.Provider value={ providerValues }>
         <BrowserRouter>
            <Nav />
            <Routes>
               <Route path='/' element={<Dashboard />}/>
               <Route path='/ticket' element={<TicketPage />}/>
               <Route path='/ticket/:id' element={<TicketPage editMode={true} />}/>
            </Routes>
         </BrowserRouter>
      </CategoriesContext.Provider>
    </div>
  );
}

export default App
