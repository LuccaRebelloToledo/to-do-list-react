import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { requestHandleGetTasks } from '../../services/logged.services';

import { DragDropContext } from 'react-beautiful-dnd';

import TaskList from '../../components/task-list/task-list';
import Error from '../../components/error/error';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

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
    if (!result.destination) return;

    const { source, destination } = result;

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(source.index, 1);
    movedTask.status = destination.droppableId;
    updatedTasks.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);
  };

  return (
    <div className="container-fluid">
      <div>
        
        
        <Link to="/create-task">
          <button className="btn btn-success mt-3">Nova Tarefa</button>
        </Link>
      </div>
      <Error>{error}</Error>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="row">
          {isLoading ? (
            <p>Carregando tarefas...</p>
          ) : (
            <>
              <TaskList 
                tasks={tasks.filter(task => task.status === 'pending')} 
                title={'A Fazer'} 
                color={'#007BFF'}
                droppableId="pending" 
              />
              <TaskList 
                tasks={tasks.filter(task => task.status === 'doing')} 
                title={'Fazendo'} 
                color={'#FFC107'}
                droppableId="doing" 
              />
              <TaskList 
                tasks={tasks.filter(task => task.status === 'done')} 
                title={'Finalizado'} 
                color={'#28A745'}
                droppableId="done" 
              />
            </>
          )}
        </div>
      </DragDropContext>
    </div>
  );
};

export default HomePage;
