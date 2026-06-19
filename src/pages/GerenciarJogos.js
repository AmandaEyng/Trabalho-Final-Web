import React, { useState } from 'react';
import { useGames } from '../contexts/GamesContext';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';

const GerenciarJogos = () => {
  const { games, updateGame, removeGame } = useGames();
  const { isAdmin } = useAuth();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ nome: '', descricao: '', preco: '', categoria: '', plataforma: '', imagem: '' });

  if (!isAdmin) return <p>Acesso negado.</p>;

  const startEdit = (game) => {
    setEditingId(game.id);
    setEditForm({ nome: game.nome, descricao: game.descricao, preco: game.preco.toString(), categoria: game.categoria, plataforma: game.plataforma, imagem: game.imagem });
  };

  const cancelEdit = () => setEditingId(null);

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    const precoNum = parseFloat(editForm.preco);
    if (!editForm.nome || isNaN(precoNum)) return;
    updateGame({
      id: editingId,
      ...games.find(g => g.id === editingId), // mantém campos como destaque, promocao etc.
      nome: editForm.nome,
      descricao: editForm.descricao,
      preco: precoNum,
      categoria: editForm.categoria,
      plataforma: editForm.plataforma,
      imagem: editForm.imagem
    });
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este jogo?')) {
      removeGame(id);
    }
  };

  return (
    <div className="manage-games">
      <h2>⚙️ Gerenciar Jogos</h2>
      <table className="games-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {games.map(game => (
            <tr key={game.id}>
              <td>{game.id}</td>
              <td><img src={game.imagem} alt={game.nome} className="table-img" /></td>
              <td>{game.nome}</td>
              <td>R$ {game.preco.toFixed(2)}</td>
              <td>{game.categoria}</td>
              <td className="action-cell">
                <button onClick={() => startEdit(game)}>Editar</button>
                <button onClick={() => handleDelete(game.id)} className="delete-btn">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingId && (
        <div className="edit-modal">
          <h3>Editando Jogo #{editingId}</h3>
          <input name="nome" placeholder="Nome" value={editForm.nome} onChange={handleEditChange} />
          <textarea name="descricao" placeholder="Descrição" value={editForm.descricao} onChange={handleEditChange} />
          <input name="preco" type="number" step="0.01" placeholder="Preço" value={editForm.preco} onChange={handleEditChange} />
          <input name="categoria" placeholder="Categoria" value={editForm.categoria} onChange={handleEditChange} />
          <input name="plataforma" placeholder="Plataforma" value={editForm.plataforma} onChange={handleEditChange} />
          <input name="imagem" placeholder="URL da imagem" value={editForm.imagem} onChange={handleEditChange} />
          <div className="edit-buttons">
            <button onClick={saveEdit}>Salvar</button>
            <button onClick={cancelEdit}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GerenciarJogos;