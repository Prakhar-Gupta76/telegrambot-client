import React, { useState } from 'react';
import './App.css'

const ApiKeysForm = () => {
  const [weatherApiKey, setWeatherApiKey] = useState('');
  const [telegramApiKey, setTelegramApiKey] = useState('');
  const [adminChatId, setAdminChatId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      WEATHER_API_KEY: weatherApiKey,
      TELEGRAM_API_KEY: telegramApiKey,
      ADMIN_CHAT_ID: adminChatId,
    };
    console.log(data)

    try {
      const response = await fetch('https://telegrambot-sand.vercel.app/?vercelToolbarCode=dw7nGUy0b3UG24a/api/update-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        mode: "cors"
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('API keys updated successfully!');
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Update API Keys</h1>
      <form onSubmit={handleSubmit}>
        <div className='fields'>
          <label htmlFor="weatherApiKey">Weather API Key:</label>
          <input
            type="text"
            id="weatherApiKey"
            value={weatherApiKey}
            onChange={(e) => setWeatherApiKey(e.target.value)}
            required
          />
        </div>
        <div className='fields'>
          <label htmlFor="telegramApiKey">Telegram API Key:</label>
          <input
            type="text"
            id="telegramApiKey"
            value={telegramApiKey}
            onChange={(e) => setTelegramApiKey(e.target.value)}
            required
          />
        </div>
        <div className='fields'>
          <label htmlFor="adminChatId">Admin Chat ID:</label>
          <input
            type="text"
            id="adminChatId"
            value={adminChatId}
            onChange={(e) => setAdminChatId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Keys</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ApiKeysForm;
