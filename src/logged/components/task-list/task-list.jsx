import { Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import Task from '../task/task';
import TaskListStyles from './task-list.module.css';

const TaskList = ({ tasks, title, color, droppableId }) => {
  return (
    <div className="col-md-4">
      <div className={TaskListStyles.taskListBox}>
        <h2
          className="text-center my-3 p-3"
          style={{
            fontSize: '24px',
            color: color,
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          {title}
        </h2>

        <Droppable droppableId={droppableId}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={TaskListStyles.taskList}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={TaskListStyles.taskItem}
                    >
                      <div className="overflow-visible">
                        <div className={TaskListStyles.box}>
                          {tasks.map((task) => (
                            <Task
                              key={task.id}
                              title={task.title}
                              description={task.description}
                            />
                          ))}
                        </div>
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
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  droppableId: PropTypes.string.isRequired,
};

export default TaskList;
