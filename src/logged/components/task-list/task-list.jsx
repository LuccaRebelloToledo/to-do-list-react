import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import Task from '../task/task';
import TaskListStyles from './task-list.module.css';

import { Draggable } from '@hello-pangea/dnd';

const TaskList = forwardRef(function taskList(props, ref) {
  const { droppableProps, placeholder, title, color, tasks } = props;

  return (
    <div className="col-md-4" ref={ref} {...droppableProps}>
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
      <div className="overflow-visible">
        <div className={TaskListStyles.box}>
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Task
                    key={task.id}
                    title={task.title}
                    description={task.description}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {placeholder}
        </div>
      </div>
    </div>
  );
});

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
  droppableProps: PropTypes.any.isRequired,
  placeholder: PropTypes.any.isRequired,
};

export default TaskList;
