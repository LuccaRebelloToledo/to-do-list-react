import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  requestHandleGetTasks,
  requestHandleUpdateStatus,
} from '../../services/logged.services';

import TaskList from '../../components/task-list/task-list';
import Error from '../../components/error/error';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskStatus, setTaskStatus] = useState(null);

  useEffect(() => {
    setTaskStatus([
      {
        id: 'pending',
        title: 'A Fazer',
        color: '#007BFF',
      },
      {
        id: 'doing',
        title: 'Fazendo',
        color: '#FFC107',
      },
      {
        id: 'done',
        title: 'Finalizado',
        color: '#28A745',
      },
    ]);
  }, []);

  useEffect(() => {
    if (isLoading) {
      requestHandleGetTasks()
        .then((response) => {
          setTasks(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);

          setError('Não foi possível buscar as tarefas!');
        });
    }
  }, [isLoading]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const movedTask = tasks.find((task) => task.id === result.draggableId);

    const newStatus = destination.droppableId;

    movedTask.status = newStatus;

    requestHandleUpdateStatus(movedTask.id, { status: newStatus })
      .then(() => {
        setIsLoading(true);
      })
      .catch((error) => {
        console.error(error);
        setError('Não foi possível atualizar a tarefa!');
      });
  };

  return (
    <div className="container-fluid">
      <Error>{error}</Error>
      <div>
        <Link to="/create-task">
          <button className="btn btn-success mt-3">Nova Tarefa</button>
        </Link>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
          {taskStatus &&
            taskStatus.map((status) => (
              <Droppable key={status.id} droppableId={status.id}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <TaskList
                      key={status.id}
                      title={status.title}
                      color={status.color}
                      tasks={tasks.filter((task) => task.status === status.id)}
                    />

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
      </DragDropContext>
    </div>
  );
};

export default HomePage;
