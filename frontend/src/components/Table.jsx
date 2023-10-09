import 'moment/locale/pt-br'
import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaUserPlus, FaUsers, FaEdit, FaTrash } from "react-icons/fa";
import { Pagination } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import ErrorMessage from "./ErrorMessage";
import PersonModal from "./PersonModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";


const Table = () => {
  const [persons, setPersons] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [activeModalDelete, setActiveModalDelete] = useState(false);
  const [id, setId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageItems, setPageItems] = useState(null);
  
  
  const handleUpdate = async (id) => {
    setId(id);
    setActiveModal(true);
  };
  
  const handleDelete = async (id) => {
    setId(id);
    setActiveModalDelete(true);
  };

  const getPersons = async (page=1) => {
    const requestOptions = {
      method: "GET",
      mode: 'no-cors',
      headers: {
        "Content-Type": "application/json",
      },
    };
    let url = "/api/pessoas"
    if (page > 1){
      url = `/api/pessoas?page=${page}`
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
    getPersons(newPage)
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
    toast.success(
      'Excluido com sucesso',
      { autoClose: 2000 }
  )
  };

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
      <div className="card is-fullwidth mt-3 pt-3 mb-1 pb-1 pl-0 box is-shadowless 
          has-text-weight-semibold is-size-3 has-text-black-light is-flex is-align-items-center
          is-justify-content-space-between">
        <span>Lista de pessoas</span>
        <FaUsers className="has-background-primary is-size-1 has-text-white p-2 box"/>
      </div>
      <hr className="mt-1"/>
      <button
        className="button mb-5 is-info"
        onClick={() => setActiveModal(true)}
      >
        Cadastrar <FaUserPlus className="ml-2"/>
      </button>
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