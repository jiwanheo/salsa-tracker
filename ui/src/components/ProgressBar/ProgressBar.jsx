import "./ProgressBar.css"

const ProgressBar = ({ progress }) => {
    // Determine the number of progress bars to fill based on the progress value
  const totalBars = 3;

  return (
    <div className="progress-bar-container mb-2">
      {[...Array(totalBars)].map((_, index) => (
        <div
          key={index}
          className={`progress-bar-strip ${index < progress ? 'progress' : 'non-progress'}`}
        ></div>
      ))}
    </div>
  )
};

export default ProgressBar;
