import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useGames } from '../contexts/GamesContext';
import ProductCard from '../components/ProductCard';
import '../App.css';

const Favoritos = () => {
  const { favorites } = useFavorites();
  const { games } = useGames();
  const favoritedGames = games.filter(g => favorites.includes(g.id));

  return (
    <div className="favorites">
      <h2>❤️ Seus Favoritos</h2>
      {favoritedGames.length === 0 ? (
        <p>Nenhum jogo favoritado ainda.</p>
      ) : (
        <div className="games-grid">
          {favoritedGames.map(game => <ProductCard key={game.id} game={game} />)}
        </div>
      )}
    </div>
  );
};

export default Favoritos;