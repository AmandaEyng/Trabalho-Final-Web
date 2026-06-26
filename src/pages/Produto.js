import React from 'react';
import { useGames } from '../contexts/GamesContext';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useNavigation } from '../contexts/NavigationContext';
import '../App.css';

const Produto = () => {
  const { games } = useGames();
  const { selectedProductId, navigateTo } = useNavigation();
  const { cart, addToCart, removeFromCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const game = games.find(g => g.id === selectedProductId);
  const inCart = game ? cart.some(item => item.id === game.id) : false;

  if (!game) {
    return (
      <div className="produto-not-found">
        <h2>Produto não encontrado.</h2>
        <button onClick={() => navigateTo('catalog')}>Voltar ao catálogo</button>
      </div>
    );
  }

  return (
    <div className="produto-detail">
      <button className="back-btn" onClick={() => navigateTo('catalog')}>← Voltar</button>
      <div className="produto-content">
        <img src={game.imagem} alt={game.nome} />
        <div className="produto-info">
          <h2>{game.nome}</h2>
          <p className="descricao">{game.descricao}</p>
          <p><strong>Categoria:</strong> {game.categoria}</p>
          <p><strong>Plataforma:</strong> {game.plataforma}</p>
          {game.promocao ? (
            <div className="price-block">
              <span className="original-price">R$ {(game.preco / 0.8).toFixed(2)}</span>
              <span className="promo-price">R$ {game.preco.toFixed(2)}</span>
            </div>
          ) : (
            <p className="price">R$ {game.preco.toFixed(2)}</p>
          )}
          {game.promocao && <p className="discount-percentage">Economize 20%</p>}
          <div className="produto-actions">
            <button
              className={`btn-add-cart ${inCart ? 'added' : ''}`}
              onClick={() => inCart ? removeFromCart(game.id) : addToCart(game)}
            >
              🛒 {inCart ? 'Adicionado' : 'Adicionar ao Carrinho'}
            </button>
            <button
              onClick={() => toggleFavorite(game.id)}
              className={`fav-icon ${isFavorite(game.id) ? 'fav-active' : ''}`}
              aria-label={isFavorite(game.id) ? 'Remover dos Favoritos' : 'Favoritar'}
            >
              {isFavorite(game.id) ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produto;