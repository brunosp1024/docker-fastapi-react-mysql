import React, { useEffect, useState } from "react";
import moment from "moment";

 
const PersonViewModal = ({ active, handleModal, id, setErrorMessage }) => {
  const [name, setName] = useState("");
  const [rg, setRg] = useState("");
  const [cpfPerson, setCpfPerson] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [funcao, setFuncao] = useState("");

  useEffect(() => {
    const getPerson = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(`/api/pessoas/${id}`, requestOptions);

      if (!response.ok) {
        setErrorMessage("Não foi possível encontrar o item");
      } else {
        const data = await response.json();
        setName(data.nome);
        setRg(data.rg);
        setCpfPerson(data.cpf);
        setBirthDate(moment(data.data_nascimento).format("DD/MM/Y"));
        setAdmissionDate(moment(data.data_admissao).format("DD/MM/Y"));
        setFuncao(data.funcao);
      }
    };

    if (id && active) {
      getPerson();
    }
  }, [id]);

  return (
    <div className={`modal ${active && "is-active"}`}>
      <div className="modal-background" onClick={handleModal}></div>
      <div className="modal-card">
        <header className="modal-card-head has-background-primary-light">
          <h1 className="modal-card-title">
            Registro selecionado
          </h1>
        </header>
        <section className="modal-card-body">
          <form>
            <div className="field">
              <label className="label">Nome</label>
              <div className="control">
                <p className="has-background-light py-2 px-2">{name}</p>
              </div>
            </div>
            <div className="field">
              <label className="label">RG</label>
              <div className="control">
                <p className="has-background-light py-2 px-2">{rg}</p>
              </div>
            </div>
            <div className="field">
              <label className="label">CPF</label>
              <div className="control">
                <p className="has-background-light py-2 px-2">{cpfPerson}</p>
              </div>
            </div>
            <div className="field">
              <label className="label">Data de nascimento</label>
              <div className="control">
                <p className="has-background-light py-2 px-2">{birthDate}</p>
              </div>
            </div>
            <div className="field">
              <label className="label">Data de admissão</label>
              <div className="control">
                <p className="has-background-light py-2 px-2">{admissionDate}</p>
              </div>
            </div>
            <div className="field">
              <label className="label">Função</label>
              <div className="control">
                <p className="has-background-light py-2 px-2" style={{'height': '40px'}}>{funcao}</p>
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot has-background-primary-light">
          <button className="button" onClick={handleModal}>
            Fechar
          </button>
        </footer>
      </div>
    </div>
  );
};

export default PersonViewModal;