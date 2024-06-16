import PropTypes from 'prop-types';


const Task = ({ title, description }) => {
  return (
    
      <div className="card">
        <div className="card-body">
          <h5 className="card-title" style={{ textDecoration: 'underline' }}>{title}</h5>
          <p className="card-text pt-2">{description}</p>
        </div>
      </div>
    
  );
};

Task.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Task;
