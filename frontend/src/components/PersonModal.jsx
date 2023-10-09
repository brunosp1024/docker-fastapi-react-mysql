import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { cpf } from 'cpf-cnpj-validator';

 
const PersonModal = ({ active, handleModal, id, setErrorMessage }) => {
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
        setBirthDate(data.data_nascimento);
        setAdmissionDate(data.data_admissao);
        setFuncao(data.funcao);
      }
    };

    cleanFormData();

    if (id) {
      getPerson();
    }
  }, [id]);

  const cleanFormData = () => {
    setName("");
    setRg("");
    setCpfPerson("");
    setBirthDate("");
    setAdmissionDate("");
    setFuncao("");
    
  };

  const handleCreatePerson = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: name,
        rg: rg,
        cpf: cpfPerson,
        data_nascimento: birthDate,
        data_admissao: admissionDate,
        funcao: funcao,
      }),
    };

    if (!cpf.isValid(cpfPerson)){
      toast.error('Número de CPF inválido.')
      return
    }

    const response = await fetch("/api/pessoas", requestOptions);
    if (!response.ok) {
      setErrorMessage("Falha ao criar um novo item");
    } else {
      handleModal();
      toast.success(
        'Criado com sucesso',
        { autoClose: 2000 }
      ) 
    }
  };

  const handleUpdatePerson = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: name,
        rg: rg,
        cpf: cpfPerson,
        data_nascimento: birthDate,
        data_admissao: admissionDate,
        funcao: funcao,
      }),
    };

    if (!cpf.isValid(cpfPerson)){
      toast.error('Número de CPF inválido.')
      return
    }

    const response = await fetch(`/api/pessoas/${id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Falha ao atualizar item");
    } else {
      cleanFormData();
      handleModal();
      toast.success(
        'Atualizado com sucesso',
        { autoClose: 2000 }
      )
    }
  };

  return (
    <div className={`modal ${active && "is-active"}`}>
      <div className="modal-background" onClick={handleModal}></div>
      <div className="modal-card">
        <header className="modal-card-head has-background-primary-light">
          <h1 className="modal-card-title">
            {id ? "Atualizar pessoa" : "Cadastrar nova pessoa"}
          </h1>
        </header>
        <section className="modal-card-body">
          <form>
            <div className="field">
              <label className="label">Nome</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Digite um nome"
                  maxLength={100}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">RG</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Gigite o número do documento"
                  maxLength={20}
                  value={rg}
                  onChange={(e) => setRg(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">CPF</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Digite o CPF"
                  maxLength={14}
                  value={cpfPerson}
                  onChange={(e) => setCpfPerson(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Data de nascimento</label>
              <div className="control">
                <input
                  type="date"
                  placeholder="Digite a data de nascimento"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Data de admissão</label>
              <div className="control">
                <input
                  type="date"
                  placeholder="Digite a data de admissão"
                  value={admissionDate}
                  onChange={(e) => setAdmissionDate(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Função</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Informe uma função"
                  maxLength={50}
                  value={funcao}
                  onChange={(e) => setFuncao(e.target.value)}
                  className="input"
                />
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot has-background-primary-light">
          {id ? (
            <button className="button is-info" onClick={handleUpdatePerson}>
              Atualizar
            </button>
          ) : (
            <button className="button is-info" onClick={handleCreatePerson}>
              Cadastrar
            </button>
          )}
          <button className="button" onClick={handleModal}>
            Cancelar
          </button>
        </footer>
      </div>
    </div>
  );
};

export default PersonModal;