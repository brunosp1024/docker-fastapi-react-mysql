import React from "react";
import { toast } from "react-toastify";

const ConfirmDeleteModal = ({ active, id, handleModal, setErrorMessage }) => {

    const handleDelete = async () => {
        const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        };
        const response = await fetch(`/api/pessoas/${id}`, requestOptions);
        if (!response.ok) {
            setErrorMessage("Falha ao deletar o item");
        } else {
            handleModal()
            toast.success(
              'Excluido com sucesso',
              { autoClose: 2000 }
            )
        }
    }

  return (
    <div className={`is-justify-content-start pt-5 modal ${active && "is-active"}`}>
      <div className="modal-background" onClick={handleModal}></div>
      <div className="modal-card modal-top">
        <header className="modal-card-head has-background-danger-light">
          <h1 className="modal-card-title">
            Confirmar exclusão
          </h1>
        </header>
        <section className="modal-card-body">
          <p>Tem certeza que deseja excluir este item?</p>
          <hr className="mb-0"/>
          <small className="is-size-7 is-link">*Ação irreversível.</small>
        </section>  
        <footer className="modal-card-foot has-background-danger-light">
            <button className="button is-danger" onClick={handleDelete}>
                Confirmar
            </button>
            <button className="button" onClick={handleModal}>
                Cancelar
            </button>
        </footer>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;