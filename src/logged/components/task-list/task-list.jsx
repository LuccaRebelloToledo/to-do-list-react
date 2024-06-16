import PropTypes from 'prop-types';

import Task from '../task/task';

const TaskList = ({ tasks, title, color, onTaskListClick }) => {
  return (
    <div className="col-md-4">
      <h2 className="text-center my-3 p-3" style={{
        fontSize: '24px',
        color: color,
        textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
      }} onClick={onTaskListClick}>{title}</h2>
      {tasks.map((task) => (
        <Task key={task.id} title={task.title} description={task.description} />
      ))}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })).isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onTaskListClick: PropTypes.func
}

export default TaskList;