import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import swal from 'sweetalert';

import api from '../../services/api';

import './styles.css'

import LogoImg from '../../assets/logo.svg';
import HeroesImg from '../../assets/heroes.png';

export default function Logon()
{
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e)
    {
        e.preventDefault();

        try
        {
            const response = await api.post('sessions', { id });
            
            localStorage.setItem('ongID', id);
            localStorage.setItem('ongName', response.data.name);

            swal({
                title: "Logon feito!",
                text: `Você está logado! Bem vindo(a)! ${response.data.name}`,
                icon: "success",
            });

            history.push('/profile');

        } catch(err)
            {   
                swal({
                    Title: "Oops!",
                    text: "Erro no logon, ID incorreta.",
                    icon: "error",
                });
        }

    }


    return (
        <div className="logon-container">
            <section className="form">
            <img src={LogoImg} alt="Be The Heroe" />

            <form onSubmit={handleLogin}>

                <h1>Faça seu logon</h1>

                <input 
                    placeholder="Sua ID"
                    value={id}
                    onChange={e => setId(e.target.value)}    
                />
                <button className="button" type="submit">Entrar</button>

                <Link className="back-link" to="/register">
                <FiLogIn size={16} color="#E02041" /> Não tenho cadastro</Link>
            </form>


            </section>

            <img src={HeroesImg} alt="Heroes" />
        </div>

    );
}