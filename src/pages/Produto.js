import React from 'react';
import { useGames } from '../contexts/GamesContext';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useNavigation } from '../contexts/NavigationContext';
import '../App.css';

const Produto = () => {
  const { games } = useGames();
  const { selectedProductId, navigateTo } = useNavigation();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const game = games.find(g => g.id === selectedProductId);

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
          <p className="price">R$ {game.preco.toFixed(2)}</p>
          <div className="produto-actions">
            <button className="btn-add-cart" onClick={() => addToCart(game)}>
              🛒 Adicionar ao Carrinho
            </button>
            <button
              className={`btn-fav ${isFavorite(game.id) ? 'fav-active' : ''}`}
              onClick={() => toggleFavorite(game.id)}
            >
              {isFavorite(game.id) ? '❤️ Remover dos Favoritos' : '🤍 Favoritar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produto;