import React from "react";


const Header = ({ title }) => {

  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item has-background-white m-1 box" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
        </a>

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item">
            Início
          </a>

          <a className="navbar-item">
            Documentation
          </a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              Mais
            </a>

            <div className="navbar-dropdown">
              <a className="navbar-item">
                Sobre
              </a>
              <a className="navbar-item">
                Atividades
              </a>
              <a className="navbar-item">
                Contato
              </a>
              <hr className="navbar-divider" />
              <a className="navbar-item">
                Reporte um problema
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;