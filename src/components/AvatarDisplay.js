import blankAvatar from '../images/blank-user-icon.png'

const AvatarDisplay = ({ ticket }) => {
   return (
      <div className="avatar">
         <div className="avatar__image-container">
            <img src={ticket.avatar ? ticket.avatar : blankAvatar} alt={`${ticket.owner} profile display`} className="avatar__image"/>
         </div>
      </div>
   )
}

export default AvatarDisplay