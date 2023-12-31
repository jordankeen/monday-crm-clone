import { useContext, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import CategoriesContext from '../context'

const TicketPage = ({ editMode }) => {
   const [formData, setFormData] = useState({
      status: 'not started',
      progress: 0,
      timestamp: new Date().toISOString()
   })

   const { categories } = useContext(CategoriesContext)

   const navigate = useNavigate()

   const handleSubmit = async (e) => {
      e.preventDefault()
      console.log(formData)
      if (!editMode) {
         const response = await axios.post('http://localhost:8000/tickets', {
            formData
         })
         const success = response.status === 200
         if (success) {
            navigate('/')
         }
      }
   }

   const handleChange = (e) => {
      let value = e.target.value
      const name = e.target.name

      if (name === 'priority') {
         value = parseInt(value)
      }
      
      setFormData((prevState) => ({
         ...prevState,
         [name]: value
      }))
   }


   console.log(categories)

   return (
      <div className="ticket">
         <h1>{editMode ? 'Update your Ticket' : 'Create a Ticket'}</h1>
         <div className="ticket__container">
            <form onSubmit={handleSubmit}>
               <section>
                  <label htmlFor="title">Title</label>
                  <input id="title" name="title" type="text" onChange={handleChange} required={true} value={formData.title}/>

                  <label htmlFor="description">Description</label>
                  <input id="description" name="description" type="text" onChange={handleChange} required={true} value={formData.description}/>

                  <label htmlFor="">Category</label>
                  <select name="category" value={formData.category} onChange={handleChange}>
                     {categories?.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                     ))}
                  </select>

                  <label htmlFor="new-category">New Category</label>
                  <input id="new-category" name="category" type="text" onChange={handleChange} value={formData.category}/>

                  <label htmlFor="">Priority</label>
                  <div className="multiple-input-container">
                     <input id="priority-1" name="priority" type="radio" onChange={handleChange} value={1} checked={formData.priority ===1}/>
                     <label htmlFor="priority-1">1</label>
                     <input id="priority-2" name="priority" type="radio" onChange={handleChange} value={2} checked={formData.priority ===2}/>
                     <label htmlFor="priority-2">2</label>
                     <input id="priority-3" name="priority" type="radio" onChange={handleChange} value={3} checked={formData.priority ===3}/>
                     <label htmlFor="priority-3">3</label>
                     <input id="priority-4" name="priority" type="radio" onChange={handleChange} value={4} checked={formData.priority ===4}/>
                     <label htmlFor="priority-4">4</label>
                     <input id="priority-5" name="priority" type="radio" onChange={handleChange} value={5} checked={formData.priority ===5}/>
                     <label htmlFor="priority-5">5</label>
                  </div>

                  {editMode &&
                  <>
                     <input type="range" id="progress" name="progress" value={formData.progress} min="0" max="100" onChange={handleChange}/>
                     <label htmlFor="progress">Progress</label>

                     <label htmlFor="status">Status</label>
                     <select name="status" value={formData.status} onChange={handleChange}>
                           <option selected={formData.status === 'Complete'} value="Completed">Complete</option>
                           <option selected={formData.status === 'In Progress'} value="In Progress">In Progress</option>
                           <option selected={formData.status === 'Blocked'} value="Blocked">Blocked</option>
                           <option selected={formData.status === 'Not Started'} value="Not Started">Not Started</option>
                     </select>
                  </>
                  }

                  <input type="submit"/>
               </section>

               <section>
                  <label htmlFor="owner">Owner</label>
                  <input id="owner" name="owner" type="text" onChange={handleChange} required={true} value={formData.owner}/>

                  <label htmlFor="avatar">Avatar</label>
                  <input id="avatar" name="avatar" type="url" onChange={handleChange} required={true} value={formData.avatar}/>
                  <div className="ticket__avatar">
                     {formData.avatar && (
                        <img src={formData.avatar} alt="avatar preview" />
                     )}
                  </div>
               </section>
            </form>
         </div>
      </div>
   )
}

export default TicketPage