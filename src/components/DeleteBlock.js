import axios from "axios"

const DeleteBlock = ({ documentId }) => {

   const deleteTicket = async () => {
      const response = await axios.delete(`http://localhost:8000/tickets/${documentId}`)
      const success = response.status === 200
      if (success) window.location.reload()
   }

   return (
      <div className="delete">
         <button className="delete__button" onClick={deleteTicket}>×</button>
      </div>
   )
}

export default DeleteBlock