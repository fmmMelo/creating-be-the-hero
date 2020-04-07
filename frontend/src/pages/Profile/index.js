import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.svg'
import swal from 'sweetalert';


export default function Profile()
{
    const [incidents, setIncident] = useState([]);

    
    const history = useHistory();

    const ongId = localStorage.getItem('ongID');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {

            api.get('profile', {
                headers: 
                {
                    Authorization: ongId,
                }
                }).then(response => {
                    setIncident(response.data);
                })          
}, [ongId]);


async function handleDeleteIncident(id)
{
    try{

        await api.delete(`incidents/${id}`, {
            headers: 
            {
                Authorization: ongId,
            }
        });

        setIncident(incidents.filter(incident => incident.id !== id));
    
    }catch(err)
        {
            swal({
                title: "Oops!",
                text: "Erro ao fazer o delete",
                icon: "error",
            })
        }
}

 function handleLogout()
 {
    localStorage.clear();

    history.push('/');
 }

    
    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vindo(a), { ongName }</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <p style={{margin: 8}}>{ incidents.length } caso(s) registrado(s)</p>

            <p id="message-incidents"></p>
            

            <ul>
            {incidents.map(incident => {
                return(
                    <li key={incident.id}>
                        <strong>Caso</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição</strong>
                        <p>{incident.description}</p>

                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
             )})}
            </ul>
        </div>
    );
}