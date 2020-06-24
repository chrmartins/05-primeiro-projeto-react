import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom'
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    //quando iniciar a aplicacao vai verificar se existe info no localstorage
    const storageRepositories = localStorage.getItem(
      '@GithubExplore:repositories',
    );

    if (storageRepositories) {
      return JSON.parse(storageRepositories)
    }

    return []
  });

  // salvar no localstorage sempre que houver alteracao na variavel repositories
  useEffect(() => {
    localStorage.setItem(
      '@GithubExplore:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    // se nao tiver nada preenchido no input, envia mensagem de erro
    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório!');
    } else {
      try {
        const response = await api.get<Repository>(`repos/${newRepo}`);

        // recebe os dados do repositorio
        const repository = response.data;

        // atualiza o repositorio
        setRepositories([...repositories, repository]);

        //limpa o input
        setNewRepo('');

        // retira o a mensagem de erro da tela
        setInputError('');

        // se acontecer algum problema para buscar o repositorio, envia mensagem
        // de erro
      } catch (err) {
        setInputError('Erro na busca por esse repositório!');
      }
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explore" />
      <Title>Explore repositórios no GitHub</Title>

      {/* hasError = verifica se tem erro e estiliza de forma diferente */}
      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          type="text"
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {/* se existir, redenrizar o componente de erro */}
      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((repository) => (
          <Link to={`/repository/${repository.full_name}`}
            key={repository.full_name}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
