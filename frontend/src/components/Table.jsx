import 'moment/locale/pt-br'
import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaUserPlus, FaUsers, FaEdit, FaTrash, FaRegEye, FaSearch } from "react-icons/fa";
import { Pagination } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import ErrorMessage from "./ErrorMessage";
import PersonViewModal from "./PersonViewModal";
import PersonModal from "./PersonModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";


const Table = () => {
  const [persons, setPersons] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [activeModalDelete, setActiveModalDelete] = useState(false);
  const [activeModalView, setActiveModalView] = useState(false);
  const [id, setId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageItems, setPageItems] = useState(null);
  const [search, setSearch] = useState("");
  
  
  const handleUpdate = async (id) => {
    setId(id);
    setActiveModal(true);
  };
  
  const handleDelete = async (id) => {
    setId(id);
    setActiveModalDelete(true);
  };

  const handleView = async (id) => {
    setId(id);
    setActiveModalView(true);
  };

  const getPersons = async (page=1, search='') => {
    const requestOptions = {
      method: "GET",
      mode: 'no-cors',
      headers: {
        "Content-Type": "application/json",
      },
    };

    const baseApiUrl = "/api/pessoas";
    let url = `${baseApiUrl}?page=${page}`;

    if (search) {
      url += `&search=${search}`;
    }
  

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      setErrorMessage("Não foi possível carregar a lista de pessoas.");
    } else {
      const data = await response.json();
      setPersons(data.items);
      setLoaded(true);
      
      setCount(data.pages)
      setCurrentPage(page)
      setPageItems(data.items)
    }
  };

  const handleChangePage = (event, newPage) => {
    getPersons(newPage, search)
  };

  useEffect(() => {
    getPersons();
  }, []);

  const handleModal = () => {
    setActiveModal(!activeModal);
    getPersons(currentPage);
    setId(null);
  };

  const handleModalDelete = () => {
    setActiveModalDelete(!activeModalDelete);
    getPersons(currentPage);
    setId(null);
  };

  const handleModalView = () => {
    setActiveModalView(!activeModalView);
    setId(null);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter'){
      setSearch(e.target.value)
      getPersons(1, e.target.value);
    }

  }

  return (
    <>
      <ToastContainer />
      <PersonModal
        active={activeModal}
        handleModal={handleModal}
        setErrorMessage={setErrorMessage}
        id={id}
      />
      <ConfirmDeleteModal 
        active={activeModalDelete} 
        handleModal={handleModalDelete}
        setErrorMessage={setErrorMessage}
        id={id}
      />
      <PersonViewModal
        active={activeModalView} 
        handleModal={handleModalView}
        setErrorMessage={setErrorMessage}
        id={id}
      />
      <div className="card is-fullwidth mt-3 pt-3 mb-1 pb-1 pl-0 box is-shadowless 
          has-text-weight-semibold is-size-3 has-text-black-light is-flex is-align-items-center
          is-justify-content-space-between">
        <span>Lista de pessoas</span>
        <FaUsers className="has-background-primary is-size-1 has-text-white p-2 box"/>
      </div>
      <hr className="mt-1"/>
      <div className='is-flex is-flex is-align-items-center is-justify-content-space-between mb-3 columns mx-1'>
        <button
          className="button is-info"
          onClick={() => setActiveModal(true)}
        >
          Cadastrar <FaUserPlus className="ml-2"/>
        </button>
        <div className="panel-block column is-one-third" style={{'border': 0}}>
          <p className="control has-icons-left">
            <input className="input" type="text" placeholder="Pesquisar" onKeyDown={handleSearch}></input>
            <span className="icon is-left">
              <FaSearch />
            </span>
          </p>
        </div>
      </div>
      <ErrorMessage message={errorMessage} />
      {loaded && persons ? (
        <table className="table is-fullwidth p-0 m-0 box" style={{lineHeight: "45px", display: "table"}}>
          <thead>
            <tr className="has-background-primary has-text-white">
              <th className="has-text-white">Nome</th>
              <th className="has-text-white">RG</th>
              <th className="has-text-white">CPF</th>
              <th className="has-text-white">Data de nascimento</th>
              <th className="has-text-white">Data de admissão</th>
              <th className="has-text-white">Função</th>
              <th className="has-text-white">Ações</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((person) => (
              <tr key={person.id_pessoa}>
                <td>{person.nome}</td>
                <td>{person.rg}</td>
                <td>{person.cpf}</td>
                <td>{moment(person.data_nascimento).format("DD/MM/Y")}</td>
                <td>{moment(person.data_admissao).format("DD/MM/Y")}</td>
                <td>{person.funcao}</td>
                <td>
                  <Tooltip title="Ver mais" placement="top-start">
                    <button
                      className="button mr-2 is-success is-light"
                      onClick={() => handleView(person.id_pessoa)}
                    >
                        <FaRegEye />
                    </button>
                  </Tooltip>
                  <Tooltip title="Editar" placement="top-start">
                    <button
                      className="button mr-2 is-info is-light"
                      onClick={() => handleUpdate(person.id_pessoa)}
                    >
                        <FaEdit />
                    </button>
                  </Tooltip>
                  <Tooltip title="Excluir" placement="top-start">
                    <button
                      className="button mr-2 is-danger is-light tooltip='aqui'"
                      onClick={() => handleDelete(person.id_pessoa)}
                    >
                      <FaTrash />
                    </button>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Carregando</p>
      )}
      <hr className="has-text-centered"/>
      <div className='is-flex is-justify-content-center'>
        <Pagination color="info" count={count} page={currentPage} onChange={handleChangePage}/>
      </div>
    </>
  );
};

export default Table;