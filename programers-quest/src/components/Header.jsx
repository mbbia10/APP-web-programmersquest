import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  function close() { setOpen(false); }

  const MenuItem = ({ to, label, icon }) => (
    <Link
      to={to}
      onClick={close}
      className={'menu-item' + (location.pathname === to ? ' active' : '')}
    >
      <span className="menu-icon" aria-hidden>{icon}</span>
      <span>{label}</span>
    </Link>
  );

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="logo-container">
          <div className="logo-icon">🚀</div>
          <div>
            <h1 className="brand">Programers Quest</h1>
            <p className="tagline">Aprenda programação jogando</p>
          </div>
        </div>

        <div className="menu">
          <button
            className="button-gradient menu-button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-haspopup="menu"
          >
            Menu
          </button>

          {open && (
            <nav className="menu-dropdown" role="menu">
              <MenuItem to="/" label="Início" icon="🏠" />
              <MenuItem to="/logica" label="Lógica" icon="🧩" />
              <MenuItem to="/missoes" label="Missões" icon="⚡" />
              <MenuItem to="/progresso" label="Progressão" icon="🪐" />
              <MenuItem to="/leaderboard" label="Classificação" icon="🏆" />
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}