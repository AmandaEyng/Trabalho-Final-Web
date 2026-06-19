import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import '../App.css';

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const [form, setForm] = useState({ nome: '', email: '', endereco: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome || !form.email || !form.endereco) {
      setError('Preencha todos os campos.');
      return;
    }
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="checkout-success">
        <h2>🎉 Compra realizada com sucesso!</h2>
        <p>Obrigado, {form.nome}. Seu pedido será processado.</p>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h2>📦 Finalizar Pedido</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome completo" value={form.nome} onChange={handleChange} />
        <input name="email" type="email" placeholder="E-mail" value={form.email} onChange={handleChange} />
        <input name="endereco" placeholder="Endereço de entrega" value={form.endereco} onChange={handleChange} />
        <div className="checkout-summary">
          <h3>Resumo do Pedido</h3>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.nome} (x{item.quantity}) - R$ {(item.preco * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <h4>Total: R$ {total}</h4>
        </div>
        <button type="submit" className="btn-finalizar">Finalizar Compra</button>
      </form>
    </div>
  );
};

export default Checkout;