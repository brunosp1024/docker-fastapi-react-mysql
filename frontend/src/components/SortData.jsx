import React from "react";
import { FaChevronDown, FaCheck } from "react-icons/fa";


const SortData = ({handleSort, sort}) => {

    return (
        <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                <span className="is-flex is-align-items-center">Ordenar por &nbsp; <FaChevronDown className="has-text-grey"/></span>
                <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu-sort" role="menu">
                <div className="dropdown-content">
                <a href="#" className="dropdown-item is-flex is-align-items-center is-justify-content-space-between px-4" onClick={() => handleSort('nome')}>
                    Nome {sort === 'nome' || sort === '' ? <FaCheck className="has-text-info" /> : ''}
                </a>
                <hr className="dropdown-divider" />
                <a href="#" className="dropdown-item is-flex is-align-items-center is-justify-content-space-between px-4" onClick={() => handleSort('data_admissao')}>
                    Data de admissão {sort === 'data_admissao' ? <FaCheck className="has-text-info" /> : ''}
                </a>
                </div>
            </div>
        </div>
    )
};

export default SortData;
