const DeleteBlock = () => {

   const deleteTicket = () => {
      console.log('delete');
   }
   return (
      <div className="delete">
         <button className="delete__button" onClick={deleteTicket}>×</button>
      </div>
   )
}

export default DeleteBlock