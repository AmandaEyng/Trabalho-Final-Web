import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { GamesProvider } from './contexts/GamesContext';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Produto from './pages/Produto';
import Carrinho from './pages/Carrinho';
import Favoritos from './pages/Favoritos';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import AdicionarJogo from './pages/AdicionarJogo';
import GerenciarJogos from './pages/GerenciarJogos';
import './App.css';

const PageRenderer = () => {
  const { page } = useNavigation();
  switch (page) {
    case 'home': return <Home />;
    case 'catalog': return <Catalogo />;
    case 'product': return <Produto />;
    case 'cart': return <Carrinho />;
    case 'favorites': return <Favoritos />;
    case 'checkout': return <Checkout />;
    case 'login': return <Login />;
    case 'add-game': return <AdicionarJogo />;
    case 'manage-games': return <GerenciarJogos />;
    default: return <Home />;
  }
};

function App() {
  return (
    <AuthProvider>
      <GamesProvider>
        <CartProvider>
          <FavoritesProvider>
            <NavigationProvider>
              <div className="app">
                <Header />
                <main className="main-content">
                  <PageRenderer />
                </main>
                <Footer />
              </div>
            </NavigationProvider>
          </FavoritesProvider>
        </CartProvider>
      </GamesProvider>
    </AuthProvider>
  );
}

export default App;