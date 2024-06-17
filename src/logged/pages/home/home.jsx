import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import {
  requestHandleDeleteTask,
  requestHandleGetTasks,
  requestHandleUpdateStatus,
} from '../../services/logged.services';

import TaskList from '../../components/task-list/task-list';
import Error from '../../components/error/error';
import Button from '../../components/button/button';

import { DragDropContext, Droppable } from '@hello-pangea/dnd';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

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

    if (destination.droppableId === 'trash') {
      requestHandleDeleteTask(movedTask.id)
        .then(() => {
          setIsLoading(true);
        })
        .catch(() => {
          console.error(error);
          setError('Não foi possível deletar a tarefa!');
        });
    } else if (destination.droppableId === 'edit') {
      navigate(`/task/${movedTask.id}`);
    } else {
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
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container-fluid overflow-hidden">
        <Error>{error}</Error>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <Link to="/task">
              <Button variant="success">Nova Tarefa</Button>
            </Link>
            <Droppable droppableId="edit">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Button variant="primary" className="ms-3" style={{ cursor: 'default' }}>Editar Tarefa</Button>
                </div>
              )}
            </Droppable>
          </div>

          <div className="d-flex justify-content-end">
            <Droppable droppableId="trash">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Button variant="danger" style={{ cursor: 'default' }}>Excluir Tarefa</Button>
                </div>
              )}
            </Droppable>
          </div>
        </div>

        <div className="row mt-4">
          <Droppable droppableId={'pending'}>
            {(provided) => (
              <TaskList
                ref={provided.innerRef}
                droppableProps={provided.droppableProps}
                placeholder={provided.placeholder}
                title="A Fazer"
                color="#007BFF"
                tasks={tasks.filter((task) => task.status === 'pending')}
              />
            )}
          </Droppable>
          <Droppable droppableId="doing">
            {(provided) => (
              <TaskList
                ref={provided.innerRef}
                droppableProps={provided.droppableProps}
                placeholder={provided.placeholder}
                title="Fazendo"
                color="#FFC107"
                tasks={tasks.filter((task) => task.status === 'doing')}
              />
            )}
          </Droppable>
          <Droppable droppableId="done">
            {(provided) => (
              <TaskList
                ref={provided.innerRef}
                droppableProps={provided.droppableProps}
                placeholder={provided.placeholder}
                title="Feito"
                color="#28A745"
                tasks={tasks.filter((task) => task.status === 'done')}
              />
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default HomePage;
