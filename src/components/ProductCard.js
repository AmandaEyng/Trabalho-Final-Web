import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCart } from '../contexts/CartContext';
import { useNavigation } from '../contexts/NavigationContext';
import '../App.css';

const ProductCard = ({ game }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { cart, addToCart, removeFromCart } = useCart();
  const { navigateTo } = useNavigation();
  const fav = isFavorite(game.id);
  const inCart = cart.some(item => item.id === game.id);
  const discountPercent = game.promocao ? 20 : 0;
  const originalPrice = discountPercent ? (game.preco / (1 - discountPercent / 100)).toFixed(2) : null;

  const handleCardClick = () => {
    navigateTo('product', game.id);
  };

  return (
    <div className="product-card">
      {game.promocao && <span className="promo-badge">Promoção</span>}
      <img src={game.imagem} alt={game.nome} onClick={handleCardClick} />
      <div className="product-info">
        <h3 onClick={handleCardClick}>{game.nome}</h3>
        {game.promocao ? (
          <div className="price-block">
            <span className="original-price">R$ {originalPrice}</span>
            <span className="promo-price">R$ {game.preco.toFixed(2)}</span>
          </div>
        ) : (
          <p className="price">R$ {game.preco.toFixed(2)}</p>
        )}
        {game.promocao && <p className="discount-percentage">-{discountPercent}%</p>}
        <div className="actions">
          <button
            onClick={() => inCart ? removeFromCart(game.id) : addToCart(game)}
            className={`btn-add-cart ${inCart ? 'added' : ''}`}
          >
            🛒 {inCart ? 'Adicionado' : 'Adicionar'}
          </button>
          <button onClick={() => toggleFavorite(game.id)} className={`fav-icon ${fav ? 'fav-active' : ''}`}>
            {fav ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;