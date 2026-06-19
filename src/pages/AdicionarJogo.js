import React, { useState } from 'react';
import { useGames } from '../contexts/GamesContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '../contexts/NavigationContext';
import '../App.css';

const AdicionarJogo = () => {
  const { addGame } = useGames();
  const { isAdmin } = useAuth();
  const { navigateTo } = useNavigation();
  const [form, setForm] = useState({
    nome: '', descricao: '', preco: '', categoria: 'Ação', plataforma: 'PC', imagem: ''
  });
  const [msg, setMsg] = useState('');

  if (!isAdmin) {
    return <p>Acesso negado.</p>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const precoNum = parseFloat(form.preco);
    if (!form.nome || !form.descricao || isNaN(precoNum) || !form.imagem) {
      setMsg('Preencha todos os campos corretamente.');
      return;
    }
    addGame({
      nome: form.nome,
      descricao: form.descricao,
      preco: precoNum,
      categoria: form.categoria,
      plataforma: form.plataforma,
      imagem: form.imagem,
      destaque: false,
      promocao: false,
      maisVendido: false
    });
    setMsg('Jogo adicionado com sucesso!');
    setForm({ nome: '', descricao: '', preco: '', categoria: 'Ação', plataforma: 'PC', imagem: '' });
  };

  return (
    <div className="add-game">
      <h2>🎮 Adicionar Novo Jogo</h2>
      <form onSubmit={handleSubmit}>
        {msg && <p className="msg">{msg}</p>}
        <input name="nome" placeholder="Nome do jogo" value={form.nome} onChange={handleChange} />
        <textarea name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} />
        <input name="preco" type="number" step="0.01" placeholder="Preço" value={form.preco} onChange={handleChange} />
        <select name="categoria" value={form.categoria} onChange={handleChange}>
          <option>Ação</option>
          <option>Aventura</option>
          <option>RPG</option>
          <option>Esporte</option>
          <option>Corrida</option>
          <option>Luta</option>
          <option>Simulação</option>
        </select>
        <select name="plataforma" value={form.plataforma} onChange={handleChange}>
          <option>PC</option>
          <option>PS5</option>
          <option>Xbox</option>
          <option>Switch</option>
        </select>
        <input name="imagem" placeholder="URL da imagem" value={form.imagem} onChange={handleChange} />
        <button type="submit">Adicionar Jogo</button>
      </form>
      <button onClick={() => navigateTo('manage-games')}>Ir para Gerenciamento</button>
    </div>
  );
};

export default AdicionarJogo;