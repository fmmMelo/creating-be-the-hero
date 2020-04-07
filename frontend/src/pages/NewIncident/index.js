import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import swal from 'sweetalert';

import './style.css';

import LogoImg from '../../assets/logo.svg';


export default function NewIncident()
{

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const ongId = localStorage.getItem('ongID');

    const history = useHistory();

    async function handleNewIncident(e)
    {
        e.preventDefault();

        const data = 
        {
            title,
            description,
        };

        try
        {
            await api.post('incidents', data, 
            {
                headers: 
                {
                    Authorization: ongId,
                }
            })

            swal({
                title: "Feito!",
                text: "O caso foi registrado!",
                icon: "success",
            })

            history.push('/profile');
        }
        catch(err)
        {
            swal({
                title: "Oops!",
                text: "Erro ao fazer o registro. Tente novamente mais tarde.",
                icon: "error",
            })
        }
    }


    return(

        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={ LogoImg } alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041" />Voltar para Home</Link>
                </section>

                <form onSubmit={handleNewIncident}>
                  <input 
                    placeholder="Título do caso"
                    value = {title}
                    onChange = {e => setTitle(e.target.value)}
                    required               
                />

                 <textarea 
                    placeholder="Descrição do caso"
                    value = {description}
                    onChange = {e => setDescription(e.target.value)}
                    required
                />

                  <button type="submit" className="button">Enviar caso</button>

                </form>


            </div>
        </div>


    );
}