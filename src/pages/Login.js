import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '../contexts/NavigationContext';
import '../App.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { navigateTo } = useNavigation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Preencha usuário e senha.');
      return;
    }
    const success = login(username, password);
    if (success) {
      navigateTo('home');
    } else {
      setError('Credenciais inválidas.');
    }
  };

  return (
    <div className="login">
      <h2>🔑 Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-msg">{error}</p>}
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
      <p className="login-hint">
        Admin: admin / admin123<br/>
        Cliente: qualquer outro usuário/senha
      </p>
    </div>
  );
};

export default Login;