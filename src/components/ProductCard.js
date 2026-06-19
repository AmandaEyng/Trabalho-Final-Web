import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCart } from '../contexts/CartContext';
import { useNavigation } from '../contexts/NavigationContext';
import '../App.css';

const ProductCard = ({ game }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const { navigateTo } = useNavigation();
  const fav = isFavorite(game.id);

  const handleCardClick = () => {
    navigateTo('product', game.id);
  };

  return (
    <div className="product-card">
      <img src={game.imagem} alt={game.nome} onClick={handleCardClick} />
      <div className="product-info">
        <h3 onClick={handleCardClick}>{game.nome}</h3>
        <p className="price">R$ {game.preco.toFixed(2)}</p>
        <div className="actions">
          <button onClick={() => addToCart(game)}>🛒 Adicionar</button>
          <button onClick={() => toggleFavorite(game.id)} className={fav ? 'fav-active' : ''}>
            {fav ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;