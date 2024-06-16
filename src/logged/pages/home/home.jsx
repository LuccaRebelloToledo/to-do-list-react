import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  requestHandleGetTasks,
} from '../../services/logged.services';

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

  return (
    <div className="container-fluid">
      <Error>{error}</Error>
      <div>
        <Link to="/create-task">
          <button className="btn btn-success mt-3">Nova Tarefa</button>
        </Link>
      </div>

      <div className="row">
        <TaskList
          tasks={tasks.filter((task) => task.status === 'pending')}
          title={'A Fazer'}
          color={'#007BFF'}
        />

        <TaskList
          tasks={tasks.filter((task) => task.status === 'doing')}
          title={'Fazendo'}
          color={'#FFC107'}
        />

        <TaskList
          tasks={tasks.filter((task) => task.status === 'done')}
          title={'Finalizado'}
          color={'#28A745'}
        />
      </div>
    </div>
  );
};

export default HomePage;
