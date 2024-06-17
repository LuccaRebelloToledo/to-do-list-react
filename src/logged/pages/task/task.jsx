import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  requestHandleCreateTasks,
  requestHandleGetTasks,
  requestHandleUpdateTasks,
} from '../../services/logged.services';

import Error from '../../components/error/error';

import Button from '../../components/button/button';

const TaskPage = () => {
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');

    const taskId =
      pathParts[pathParts.length - 1] === 'task' ? null : pathParts.pop();

    if (taskId) {
      requestHandleGetTasks()
        .then((response) => {
          const task = response.data.find((task) => task.id === taskId);

          if (task) {
            setTask(task);
          } else {
            setError('Tarefa não encontrada!');
          }
        })
        .catch((error) => {
          console.error(error);

          setError('Não foi possível buscar as tarefas!');
        });
    }
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    const { title, description } = event.target;

    console.log(title.value, description.value);

    const payload = {
      title: title.value,
      description: description.value,
    };

    if (!task) {
      requestHandleCreateTasks({ ...payload, status: 'pending' })
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.error(error);

          setError('Não foi possível criar uma tarefa!');
        });
    } else {
      requestHandleUpdateTasks(task.id, { ...payload, status: task.status })
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.error(error);

          setError('Não foi possível atualizar a tarefa!');
        });
    }
  };

  return (
    <div className="p-4">
      <h1>{task ? 'Editar' : 'Nova'} Tarefa</h1>

      <Error>{error}</Error>
      <form onSubmit={onSubmit}>
        <div className="form-group p-2">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Colher trigo..."
            required
            defaultValue={task ? task.title : ''}
          />
        </div>
        <div className="form-group p-2">
          <label htmlFor="description">Descrição</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Colher trigo na aldeia mais próxima e guardar em meu estoque..."
            required
            defaultValue={task ? task.description : ''}
          ></textarea>
        </div>
        <div className="p-2 d-flex justify-content-center gap-2">
          <Button type="submit" variant="success">Salvar</Button>

          <Button variant="primary" action={() => navigate('/')}>Voltar</Button>
        </div>
      </form>
    </div>
  );
};

export default TaskPage;
