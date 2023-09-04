const ProgressDisplay = ({ progress }) => {
   return (
      <div className="progress-display">
         <div className="progress-display__bar">
            <div style={{ width: progress + '%'}} className="progress-display__indicator"></div>
         </div>
      </div>
   )
}

export default ProgressDisplay