import React from 'react';
import { FiChevronRight } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

import { Title, Form, Repositories } from './styles'

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explore" />
      <Title>Explore repositórios no GitHub</Title>

      <Form>
        <input type="text" placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img
            src="https://avatars3.githubusercontent.com/u/45520505?s=460&u=d5ea36f4e225da80a83f996ebd7473acb69fda0e&v=4"
            alt="avatar" />
          <div>
            <strong>chrmartins/meusite</strong>
            <p>Site pessoal / Currículo usando React</p>
          </div>
          <FiChevronRight size={20} />
        </a>

        <a href="teste">
          <img
            src="https://avatars3.githubusercontent.com/u/45520505?s=460&u=d5ea36f4e225da80a83f996ebd7473acb69fda0e&v=4"
            alt="avatar" />
          <div>
            <strong>chrmartins/meusite</strong>
            <p>Site pessoal / Currículo usando React</p>
          </div>
          <FiChevronRight size={20} />
        </a>

        <a href="teste">
          <img
            src="https://avatars3.githubusercontent.com/u/45520505?s=460&u=d5ea36f4e225da80a83f996ebd7473acb69fda0e&v=4"
            alt="avatar" />
          <div>
            <strong>chrmartins/meusite</strong>
            <p>Site pessoal / Currículo usando React</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  )
};

export default Dashboard;
