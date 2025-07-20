// withdraw.js
window.addEventListener("DOMContentLoaded", () => {
  const availableBalance = document.getElementById("availableBalance");
  const withdrawAmount = document.getElementById("withdrawAmount");
  const withdrawBtn = document.getElementById("withdrawBtn");
  const allBtn = document.getElementById("allBtn");
  const gameStatsItems = document.getElementById("gameStatsItems");

  // Получение баланса (моковые данные, заменить на API)
  const fetchBalance = async () => {
    try {
      // Placeholder for API request
      // const response = await fetch('https://your-api.com/balance', {
      //   method: 'GET',
      //   headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
      // });
      // const data = await response.json();
      // return data.balance;

      // Mock balance
      return 2937;
    } catch (error) {
      console.error("[Withdraw] Error fetching balance:", error);
      return 0;
    }
  };

  // Получение статистики игр (моковые данные, заменить на API)
  const fetchGameStats = async () => {
    try {
      // Placeholder for API request
      // const response = await fetch('https://your-api.com/game-stats', {
      //   method: 'GET',
      //   headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
      // });
      // const stats = await response.json();

      // Mock data
      return [
        { gameId: 1, result: "Win", profit: 100 },
        { gameId: 2, result: "Loss", profit: -50 },
        { gameId: 3, result: "Win", profit: 200 },
        { gameId: 4, result: "Loss", profit: -30 },
        { gameId: 5, result: "Win", profit: 150 },
        { gameId: 6, result: "Win", profit: 80 },
        { gameId: 7, result: "Loss", profit: -20 },
        { gameId: 8, result: "Win", profit: 300 },
      ];
    } catch (error) {
      console.error("[Withdraw] Error fetching game stats:", error);
      return [];
    }
  };

  // Обновление отображения баланса
  const updateBalance = async () => {
    const balance = await fetchBalance();
    if (availableBalance) {
      availableBalance.textContent = `${balance}`;
    }
    return balance;
  };

  // Отрисовка статистики игр
  const renderGameStats = (stats) => {
    gameStatsItems.innerHTML = "";
    stats.forEach((game) => {
      const item = document.createElement("div");
      item.className = "game-stats-item";
      item.innerHTML = `
        <span class="game-id">${game.gameId}</span>
        <span class="result ${game.result.toLowerCase()}">${game.result}</span>
        <span class="profit ${game.profit >= 0 ? 'positive' : 'negative'}">${
          game.profit >= 0 ? `+${game.profit}` : game.profit
        }</span>
      `;
      gameStatsItems.appendChild(item);
    });
  };

  // Обработка кнопки "All"
  allBtn.addEventListener("click", async () => {
    const balance = await fetchBalance();
    withdrawAmount.value = balance.toFixed(2);
  });

  // Обработка вывода
  withdrawBtn.addEventListener("click", async () => {
    const amount = parseFloat(withdrawAmount.value);
    const balance = await fetchBalance();

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid TON amount.");
      return;
    }
    if (amount > balance) {
      alert("Insufficient balance.");
      return;
    }

    try {
      // Placeholder for API request
      // const response = await fetch('https://your-api.com/withdraw', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ amount })
      // });
      // const result = await response.json();

      // Mock response
      const result = { success: true };
      if (result.success) {
        alert(`Successfully withdrew ${amount} TON`);
        withdrawAmount.value = "";
        updateBalance();
      } else {
        alert("Failed to withdraw. Please try again.");
      }
    } catch (error) {
      console.error("[Withdraw] Error processing withdrawal:", error);
      alert("Failed to withdraw. Please try again.");
    }
  });

  // Загрузка и отрисовка данных
  const loadData = async () => {
    const stats = await fetchGameStats();
    renderGameStats(stats);
    updateBalance();
  };

  // Начальная загрузка
  loadData();
});