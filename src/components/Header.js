import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '../contexts/NavigationContext';
import '../App.css';

const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  const { navigateTo } = useNavigation();

  return (
    <header className="header">
      <div className="logo" onClick={() => navigateTo('home')}>
        <h1>🎮 GameStore</h1>
      </div>
      <nav className="nav">
        <button onClick={() => navigateTo('home')}>Home</button>
        <button onClick={() => navigateTo('catalog')}>Catálogo</button>
        <button onClick={() => navigateTo('favorites')}>Favoritos</button>
        <button onClick={() => navigateTo('cart')}>🛒 Carrinho</button>
        {user ? (
          <>
            {isAdmin && (
              <>
                <button onClick={() => navigateTo('add-game')}>Adicionar Jogo</button>
                <button onClick={() => navigateTo('manage-games')}>Gerenciar Jogos</button>
              </>
            )}
            <button onClick={() => navigateTo('checkout')}>Finalizar Compra</button>
            <button onClick={() => { logout(); navigateTo('home'); }} className="logout-btn">
              Sair ({user.username})
            </button>
          </>
        ) : (
          <button onClick={() => navigateTo('login')}>Login</button>
        )}
      </nav>
    </header>
  );
};

export default Header;