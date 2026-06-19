import React from 'react';
import { useGames } from '../contexts/GamesContext';
import ProductCard from '../components/ProductCard';
import '../App.css';

const Home = () => {
  const { games } = useGames();
  const destaques = games.filter(g => g.destaque);
  const promocoes = games.filter(g => g.promocao);
  const maisVendidos = games.filter(g => g.maisVendido);

  return (
    <div className="home">
      <section>
        <h2>🎯 Jogos em Destaque</h2>
        <div className="games-grid">
          {destaques.map(game => <ProductCard key={game.id} game={game} />)}
        </div>
      </section>

      <section>
        <h2>💰 Promoções</h2>
        <div className="games-grid">
          {promocoes.map(game => <ProductCard key={game.id} game={game} />)}
        </div>
      </section>

      <section>
        <h2>📈 Mais Vendidos</h2>
        <div className="games-grid">
          {maisVendidos.map(game => <ProductCard key={game.id} game={game} />)}
        </div>
      </section>

      <section>
        <h2>🏷️ Categorias</h2>
        <div className="categories-list">
          {[...new Set(games.map(g => g.categoria))].map(cat => (
            <span key={cat} className="category-badge">{cat}</span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;