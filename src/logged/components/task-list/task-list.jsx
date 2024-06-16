import { Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import Task from '../task/task';
import taskListStyles from './task-list.module.css';

const TaskList = ({ tasks, title, color, droppableId, onTaskListClick }) => {
  return (
    <div className="col-md-4">
      <div className={taskListStyles.taskListBox}>
        <h2 className="text-center my-3 p-3" style={{
          fontSize: '24px',
          color: color,
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
        }} onClick={onTaskListClick}>{title}</h2>
        
        <Droppable droppableId={droppableId}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className={taskListStyles.taskList}>
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={taskListStyles.taskItem}
                    >
                      <div className={taskListStyles.box}>
                        <Task title={task.title} description={task.description} />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        </div>
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
  droppableId: PropTypes.string.isRequired,
  onTaskListClick: PropTypes.func
};

export default TaskList;
