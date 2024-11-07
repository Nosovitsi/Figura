import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PasswordManage.css';
import Modal from './Modal';

interface User {
  name: string;
  deals: string[];
}

const PasswordManage: React.FC = () => {
  const [password, setPassword] = useState<string>('Effective_420');
  const [error, setError] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDealsModal, setShowDealsModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const sendManageRequest = (savedPassword?: string) => {
    const passwordData = {
      action: 'LOG_MANAGE',
      password: savedPassword || password,
    };

    if (window.ws) {
      if (window.ws.readyState === WebSocket.OPEN) {
        window.ws.send(JSON.stringify(passwordData));
        setError('');
      } else if (window.ws.readyState === WebSocket.CLOSED) {
        window.ws = new WebSocket('ws://localhost:8000');
        window.ws.onopen = () => {
          window.ws.send(JSON.stringify(passwordData));
          setError('');
        };
      }
    } else {
      setError('Ошибка соединения с сервером');
      setUsers([]);
    }
  };

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('isAuthenticated');
    const savedPassword = sessionStorage.getItem('managePassword');

    if (savedAuth === 'true' && savedPassword) {
      setIsAuthenticated(true);
      const handleOpen = () => {
        sendManageRequest(savedPassword);
      };

      if (window.ws) {
        if (window.ws.readyState === WebSocket.CLOSED) {
          window.ws = new WebSocket('ws://localhost:8000');
          window.ws.addEventListener('open', handleOpen);
        } else {
          window.ws.addEventListener('open', handleOpen);
          if (window.ws.readyState === WebSocket.OPEN) {
            sendManageRequest(savedPassword);
          }
        }
      }

      return () => {
        if (window.ws) {
          window.ws.removeEventListener('open', handleOpen);
        }
      };
    }
  }, []);

  useEffect(() => {
    const handleServerResponse = (event: MessageEvent) => {
      const serverResponse = event.data;

      if (serverResponse === '404') {
        setError('Пароль неверный');
        setUsers([]);
        setIsAuthenticated(false);
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('managePassword');
      } else {
        try {
          const formattedResponse = serverResponse.replace(/'/g, '"');
          const jsonResponse = JSON.parse(formattedResponse);

          if (jsonResponse.action === 'SHOW_DEALS') {
            const userDeals = jsonResponse.deals || [];
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user.name === jsonResponse.user_name
                  ? { ...user, deals: userDeals }
                  : user
              )
            );
            const updatedUser = users.find(user => user.name === jsonResponse.user_name);
            if (updatedUser) {
              setSelectedUser({ ...updatedUser, deals: userDeals });
            }
          } else {
            const userNames = jsonResponse.map((userName: string) => ({
              name: userName,
              deals: [],
            }));
            setUsers(userNames);
            setError('');
            setIsAuthenticated(true);
            sessionStorage.setItem('isAuthenticated', 'true');
            sessionStorage.setItem('managePassword', password);
          }
        } catch (e) {
          console.error('Ошибка обработки данных:', e);
          setError('Ошибка обработки данных');
        }
      }
    };

    if (window.ws) {
      window.ws.addEventListener('message', handleServerResponse);
    }

    return () => {
      if (window.ws) {
        window.ws.removeEventListener('message', handleServerResponse);
      }
    };
  }, [password, users]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password) {
      setError('Пожалуйста, введите пароль');
      setUsers([]);
      return;
    }
    sendManageRequest();
  };

  const handleUserClick = (userName: string) => {
    const requestData = {
      action: 'SHOW_DEALS',
      user_name: userName,
    };

    if (window.ws && window.ws.readyState === WebSocket.OPEN) {
      window.ws.send(JSON.stringify(requestData));
      const user = users.find(u => u.name === userName);
      if (user) {
        setSelectedUser(user);
        setShowDealsModal(true);
      }
    } else {
      setError('Ошибка соединения с сервером');
    }
  };

  const handleAddDeal = (userName: string) => {
    const newDealName = 'newDeal';
    const requestData = {
      action: 'ADD_DEAL',
      user_name: userName,
      deal_name: newDealName,
    };

    if (window.ws && window.ws.readyState === WebSocket.OPEN) {
      window.ws.send(JSON.stringify(requestData));
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.name === userName
            ? { ...user, deals: [...user.deals, newDealName] }
            : user
        )
      );
      if (selectedUser && selectedUser.name === userName) {
        setSelectedUser(prev => prev ? { ...prev, deals: [...prev.deals, newDealName] } : null);
      }
    } else {
      setError('Ошибка соединения с сервером');
    }
  };

  const handleDeleteDeal = (userName: string, dealName: string) => {
    const requestData = {
      action: 'DELETE_DEAL',
      user_name: userName,
      deal_name: dealName,
    };

    if (window.ws && window.ws.readyState === WebSocket.OPEN) {
      window.ws.send(JSON.stringify(requestData));
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.name === userName
            ? { ...user, deals: user.deals.filter((deal) => deal !== dealName) }
            : user
        )
      );
      if (selectedUser && selectedUser.name === userName) {
        setSelectedUser(prev => 
          prev ? { ...prev, deals: prev.deals.filter(deal => deal !== dealName) } : null
        );
      }
    } else {
      setError('Ошибка соединения с сервером');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsers([]);
    setPassword('Effective_420');
    setSelectedUser(null);
    setShowDealsModal(false);
    setError('');

    sessionStorage.clear();

    if (window.ws && window.ws.readyState === WebSocket.OPEN) {
      const logoutData = {
        action: 'LOGOUT_MANAGE'
      };
      window.ws.send(JSON.stringify(logoutData));
    }
  };

  const handleCloseDealsModal = () => {
    setShowDealsModal(false);
    setSelectedUser(null);
  };

  const DealsModal = () => {
    if (!selectedUser) return null;

    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Список договоров - {selectedUser.name}</h2>
            <button onClick={handleCloseDealsModal} className="close-button">×</button>
          </div>
          <div className="modal-body">
            {selectedUser.deals.length > 0 ? (
              <ul className="deals-list">
                {selectedUser.deals.map((deal, index) => (
                  <li key={index} className="deal-item">
                    <span>{deal}</span>
                    <button 
                      onClick={() => handleDeleteDeal(selectedUser.name, deal)}
                      className="delete-button"
                    >
                      Удалить
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Нет договоров</p>
            )}
          </div>
          <div className="modal-footer">
            <button onClick={() => handleAddDeal(selectedUser.name)}>
              Добавить договор
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="manage-container">
      <div className="password-form-wrapper">
        <h2>Панель управления</h2>
        {!isAuthenticated ? (
          <form onSubmit={handleSubmit} className="password-form">
            <div className="form-group">
              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="password-input"
                placeholder="Введите пароль"
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="submit-button">
              Войти
            </button>
          </form>
        ) : (
          <>
            <button onClick={handleLogout} className="logout-button">
              Выйти
            </button>
            {error && <div className="error-message">{error}</div>}
            {users.length > 0 && (
              <div className="user-list">
                <h3>Имена пользователей:</h3>
                <ul>
                  {users.map((user, index) => (
                    <li key={index} className="user-item">
                      <span>{user.name}</span>
                      {user.deals.length === 0 ? (
                        <button onClick={() => handleUserClick(user.name)}>
                          Получить договоры
                        </button>
                      ) : (
                        <button 
                          className="view-deals-button"
                          onClick={() => {
                            setSelectedUser(user);
                            setShowDealsModal(true);
                          }}
                        >
                          Просмотр договоров ({user.deals.length})
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
      {showDealsModal && <DealsModal />}
    </div>
  );
};

export default PasswordManage;