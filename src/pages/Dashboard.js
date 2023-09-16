import TicketCard from '../components/TicketCard'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import CategoriesContext from '../context'

const Dashboard = () => {
   // tickets state, categories state
   const [tickets, setTickets] = useState(null)
   const { categories, setCategories } = useContext(CategoriesContext)

   // get tickets from DB, format new array of objects with ID added
   useEffect(() => {
      console.log('useEffect 1')
      const loadTickets = async () => {
         const response = await axios.get('http://localhost:8000/tickets')
         const dataObject = response.data.data
   
         const arrayOfKeys = Object.keys(dataObject)
         const arrayOfData = Object.keys(dataObject).map((key) => dataObject[key])
         const formattedArray = []
         arrayOfKeys.forEach((key, index) => {
            const formattedData = { ...arrayOfData[index]}
            formattedData['documentId'] = key
            formattedArray.push(formattedData)
         })
         setTickets(formattedArray);
         console.log('load tickets done')
      }

      loadTickets()
   }, [])

   // set unique categories state
   useEffect(() => {
      console.log('useEffect 2')
      const categoriesArray = [
         ...new Set(tickets?.map(({ category }) => category))
      ]
      setCategories(categoriesArray)
   }, [tickets])


   // Array of colors for Categories
   const colors = [
      'rgb(255,179,186)',
      'rgb(255,223,186)',
      'rgb(255,255,186)',
      'rgb(186,255,201)',
      'rgb(186,255,255)'
   ]

   // Find unique categories, to group tickets witht he same category
   const uniqueCategories = [
      ...new Set(tickets?.map(({ category }) => category))
   ]


   return (
      <div className="dashboard">
         <h1>My Projects</h1>
         <div className="ticket-container">
            {tickets && uniqueCategories?.map((uniqueCategory, categoryIndex) => (
               <div key={categoryIndex}>
                  <h3>{uniqueCategory}</h3>
                  {tickets.filter(ticket => ticket.category === uniqueCategory)
                     .map((filteredTicket, ticketIndex) => (
                        <TicketCard
                           id={ticketIndex}
                           key={ticketIndex}
                           color={colors[categoryIndex] || colors[0]}
                           ticket={filteredTicket}
                        />
                     ))
                  }
               </div>
            ))}
         </div>
      </div>
   )
}

export default Dashboard