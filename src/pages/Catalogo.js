import React, { useState, useMemo } from 'react';
import { useGames } from '../contexts/GamesContext';
import ProductCard from '../components/ProductCard';
import '../App.css';

const Catalogo = () => {
  const { games } = useGames();
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [platform, setPlatform] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('');

  const filtered = useMemo(() => {
    let filteredGames = [...games];

    if (search.trim() !== '') {
      const term = search.toLowerCase();
      filteredGames = filteredGames.filter(g => g.nome.toLowerCase().includes(term));
    }
    if (genre) filteredGames = filteredGames.filter(g => g.categoria === genre);
    if (platform) filteredGames = filteredGames.filter(g => g.plataforma === platform);
    if (priceRange) {
      if (priceRange === 'baixo') filteredGames = filteredGames.filter(g => g.preco <= 100);
      else if (priceRange === 'medio') filteredGames = filteredGames.filter(g => g.preco > 100 && g.preco <= 200);
      else if (priceRange === 'alto') filteredGames = filteredGames.filter(g => g.preco > 200);
    }

    if (sortBy === 'menor-preco') filteredGames.sort((a, b) => a.preco - b.preco);
    else if (sortBy === 'maior-preco') filteredGames.sort((a, b) => b.preco - a.preco);
    else if (sortBy === 'az') filteredGames.sort((a, b) => a.nome.localeCompare(b.nome));

    return filteredGames;
  }, [games, search, genre, platform, priceRange, sortBy]);

  return (
    <div className="catalogo">
      <h2>📚 Catálogo de Jogos</h2>
      <div className="filters-bar">
        <input
          type="text"
          placeholder="Buscar jogos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
        <select value={genre} onChange={e => setGenre(e.target.value)}>
          <option value="">Todos os gêneros</option>
          {[...new Set(games.map(g => g.categoria))].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select value={platform} onChange={e => setPlatform(e.target.value)}>
          <option value="">Todas as plataformas</option>
          {[...new Set(games.map(g => g.plataforma))].map(plat => (
            <option key={plat} value={plat}>{plat}</option>
          ))}
        </select>
        <select value={priceRange} onChange={e => setPriceRange(e.target.value)}>
          <option value="">Todas as faixas de preço</option>
          <option value="baixo">Até R$ 100</option>
          <option value="medio">R$ 100 - R$ 200</option>
          <option value="alto">Acima de R$ 200</option>
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="">Ordenar por</option>
          <option value="menor-preco">Menor preço</option>
          <option value="maior-preco">Maior preço</option>
          <option value="az">Ordem alfabética</option>
        </select>
      </div>
      <div className="games-grid">
        {filtered.map(game => <ProductCard key={game.id} game={game} />)}
      </div>
    </div>
  );
};

export default Catalogo;