import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { requestHandleCreateTasks } from '../../services/logged.services';

import Error from '../../components/error/error';

const CreateTaskPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();

    const { title, description } = event.target;

    const payload = {
      title: title.value,
      description: description.value,
      status: 'pending',
    };

    requestHandleCreateTasks(payload)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error(error);

        setError('Não foi possível criar uma tarefa!');
      });
  };

  return (
    <div className="p-4">
      <h1>Nova Tarefa</h1>

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
          ></textarea>
        </div>
        <div className="p-2 d-flex justify-content-center gap-2">
          <button type="submit" className="btn btn-success">
            Salvar
          </button>

          <button className="btn btn-danger  " onClick={() => navigate('/')}>
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskPage;
