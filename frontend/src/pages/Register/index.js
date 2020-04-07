import React, { useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiArrowLeft} from 'react-icons/fi';

import swal from 'sweetalert';

import api from '../../services/api';

import './styles.css';

import LogoImg from '../../assets/logo.svg';



export default function Register()
{

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e)
        {
            e.preventDefault();

            const data = { name, email, whatsapp, city, uf };

        try
        {
            const response = await api.post('ongs', data);
        
            swal({
                title: "Tudo certo!",
                text: `Seu ID de Logon ${response.data.id}`,
                icon: "success",
            });

            history.push('/');

        } catch(err)
            {   
                swal({
                    Title: "Oops!",
                    text: "Erro no cadastro, tente novamente mais tarde!",
                    icon: "error",
                });
        }

    }


    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={ LogoImg } alt="Be The Hero"/>

                    <h1>Cadastrar-se</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                    <FiArrowLeft size={16} color="#E02041" /> Já tenho cadastro</Link>
                </section>

                <form onSubmit={handleRegister} >
                  <input 
                    placeholder="Nome da ONG"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    />
                  
                  <input 
                    type="email"
                    placeholder="E-mail da ONG"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    />
                  
                  <input 
                    placeholder="Whatsapp da ONG"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    required
                  /> 

                  <div className="input-group" >
                  <input 
                    placeholder="Cidade"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    required
                  />

                  <input 
                    placeholder="UF" 
                    style={{ width: 80 }}
                    value={uf}
                    onChange={e => setUf(e.target.value)}
                    required
                  />
                  </div>

                  <button type="submit" className="button">Registrar</button>

                </form>


            </div>
        </div>
        
    );
}