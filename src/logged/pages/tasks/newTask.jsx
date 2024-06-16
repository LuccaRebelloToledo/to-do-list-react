import React from 'react'
import { useNavigate } from 'react-router-dom'

const newTask = () => {
    const navigate = useNavigate()
    const handleSubmited = (event) => {
        event.preventDefault()
        navigate('/')
    }

    return (

        <div  className='p-4'>
 
            <h1>Nova Tarefa</h1>

            <form onSubmit={handleSubmited}>

                <div className="form-group p-2">
                    <label htmlFor="title">Título</label>
                    <input type="text" className="form-control" id="title" placeholder='Colher trigo...' required />
                </div>
                <div className="form-group p-2">
                    <label htmlFor="description">Descrição</label>
                    <textarea className="form-control" id="description" rows="3" placeholder='Colher trigo na aldeia mais próxima e guardar em meu estoque...' required></textarea>
                </div>
                <div className='p-2 d-flex justify-content-center gap-2'>
                    <button type="submit" className="btn btn-success">Salvar</button>

                    <button className="btn btn-danger  " onClick={() => navigate('/')}>Voltar</button>
                </div>

            </form>
        </div>
    )
}

export default newTask