import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import TaskList from '../../components/task-list/task-list';



const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if(isLoading) {
      setTasks([
        {
          id: '1',
          title: 'Tarefa 1',
          description: 'Descrição da tarefa 1',
          status: 'pending'
        },
        {
          id: '2',
          title: 'Tarefa 2',
          description: 'Descrição da tarefa 2',
          status: 'doing'
        },
        {
          id: '3',
          title: 'Tarefa 3',
          description: 'Descrição da tarefa 3',
          status: 'done'
        }
      ])

      setIsLoading(false);
    }
  }, [isLoading])


  const openRegistrationScreen = () => {
    console.log('openRegistrationScreen');
  }

  return (
      <div className="container-fluid">
        <div>
          <Link to="/newTask">
          <button className="btn btn-success mt-3" onClick={() => setIsLoading(true)}>Nova Tarefa</button>
          </Link>
          </div>
        <div className="row">

          <TaskList tasks={tasks.filter((task) => task.status === 'pending')} title={'A Fazer'} color={'#007BFF'}  onTaskListClick={openRegistrationScreen} />

          <TaskList tasks={tasks.filter((task) => task.status === 'doing')} title={'Fazendo'} color={'#FFC107'} />

          <TaskList tasks={tasks.filter((task) => task.status === 'done')} title={'Finalizado'} color={'#28A745'} />
        </div>
      </div>
  );
}

export default HomePage;