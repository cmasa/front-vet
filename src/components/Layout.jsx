import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div>
      <header className="bg-primary text-white">
        <h1 className="text-center">Sistema Veterinario</h1>
      </header>

      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <Link className="navbar-brand" to="/">Fichero</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/familias">Familias</Link>
        </div>
      </nav>

      <main className="container my-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
