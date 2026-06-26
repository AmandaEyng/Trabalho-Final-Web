import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigation } from '../contexts/NavigationContext';
import '../App.css';

const Carrinho = () => {
  const { cart, removeFromCart, total } = useCart();
  const { navigateTo } = useNavigation();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Seu carrinho está vazio.</h2>
        <button className="btn-add-cart" onClick={() => navigateTo('catalog')}>Ir às compras</button>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>🛒 Seu Carrinho</h2>
      <ul className="cart-items">
        {cart.map(item => (
          <li key={item.id} className="cart-item">
            <img src={item.imagem} alt={item.nome} className="cart-item-img" />
            <div className="cart-item-info">
              <h4>{item.nome}</h4>
              <p>R$ {item.preco.toFixed(2)}</p>
            </div>
            <p className="subtotal">R$ {(item.preco * item.quantity).toFixed(2)}</p>
            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
          </li>
        ))}
      </ul>
      <div className="cart-count">
        Quantidade: {cart.length}
      </div>
      <div className="cart-total">
        <h3>Total: R$ {total}</h3>
        <button className="checkout-btn" onClick={() => navigateTo('checkout')}>
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default Carrinho;