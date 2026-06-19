import React, { createContext, useState, useContext, useEffect } from 'react';
import jogosIniciais from '../data/jogosIniciais';

const GamesContext = createContext();

export const useGames = () => useContext(GamesContext);

export const GamesProvider = ({ children }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('games');
    if (stored) {
      setGames(JSON.parse(stored));
    } else {
      localStorage.setItem('games', JSON.stringify(jogosIniciais));
      setGames(jogosIniciais);
    }
  }, []);

  const saveAndSet = (newGames) => {
    localStorage.setItem('games', JSON.stringify(newGames));
    setGames(newGames);
  };

  const addGame = (game) => {
    const newId = games.length > 0 ? Math.max(...games.map(g => g.id)) + 1 : 1;
    const newGame = { ...game, id: newId };
    saveAndSet([...games, newGame]);
  };

  const updateGame = (updatedGame) => {
    saveAndSet(games.map(g => g.id === updatedGame.id ? updatedGame : g));
  };

  const removeGame = (id) => {
    saveAndSet(games.filter(g => g.id !== id));
  };

  return (
    <GamesContext.Provider value={{ games, addGame, updateGame, removeGame }}>
      {children}
    </GamesContext.Provider>
  );
};