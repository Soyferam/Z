// stats.js (без изменений)
window.addEventListener("DOMContentLoaded", () => {
  const leaderboardItems = document.getElementById("leaderboardItems");
  const userProfile = document.getElementById("userProfile");

  // Функция для получения данных лидерборда (пока моковые данные)
  const fetchLeaderboard = async () => {
    try {
      // Здесь будет API-запрос в будущем
      // const response = await fetch('https://your-api.com/leaderboard');
      // const data = await response.json();
      // return data;

      // Моковые данные
      return {
        topPlayers: [
          { rank: 1, avatar: "avatar1.png", name: "PlayerOne", profit: 5000, tokens: 10000 },
          { rank: 2, avatar: "avatar2.png", name: "SnakeMaster", profit: 4500, tokens: 9000 },
          { rank: 3, avatar: "avatar3.png", name: "ZmeiFiPro", profit: 4000, tokens: 8000 },
          { rank: 4, avatar: "avatar4.png", name: "CryptoKing", profit: 3500, tokens: 7000 },
          { rank: 5, avatar: "avatar5.png", name: "TokenLord", profit: 3000, tokens: 6500 },
          { rank: 6, avatar: "avatar6.png", name: "SerpentX", profit: 2800, tokens: 6000 },
          { rank: 7, avatar: "avatar7.png", name: "ProfitMan", profit: 2500, tokens: 5500 },
          { rank: 8, avatar: "avatar8.png", name: "ZmeiStar", profit: 2200, tokens: 5000 },
          { rank: 9, avatar: "avatar9.png", name: "GameFiAce", profit: 2000, tokens: 4500 },
          { rank: 10, avatar: "avatar10.png", name: "TopSnake", profit: 1800, tokens: 4000 },
        ],
        currentUser: { rank: 15, avatar: "user.png", name: "You", profit: 2000, tokens: 5000 },
      };
    } catch (error) {
      console.error("[Leaderboard] Error fetching leaderboard:", error);
      return { topPlayers: [], currentUser: null };
    }
  };

  // Отрисовка топ-игроков
  const renderTopPlayers = (players) => {
    leaderboardItems.innerHTML = "";
    players.forEach((player) => {
      const item = document.createElement("div");
      item.className = "leaderboard-item";
      item.innerHTML = `
        <span class="rank">#${player.rank}</span>
        <img src="${player.avatar}" alt="Avatar" class="avatar" />
        <span class="name">${player.name}</span>
        <span class="profit">${player.profit}$</span>
        <span class="tokens">${player.tokens} ⚡</span>
      `;
      leaderboardItems.appendChild(item);
    });
  };

  // Отрисовка профиля текущего пользователя
  const renderUserProfile = (user) => {
    if (user) {
      userProfile.innerHTML = `
        <div class="leaderboard-item user">
          <span class="rank">#${user.rank}</span>
          <img src="${user.avatar}" alt="Avatar" class="avatar" />
          <span class="name">${user.name}</span>
          <span class="profit">${user.profit}$</span>
          <span class="tokens">${user.tokens} ⚡</span>
        </div>
      `;
    } else {
      userProfile.innerHTML = "<p>Not ranked yet.</p>";
    }
  };

  // Загрузка и отрисовка лидерборда
  const loadLeaderboard = async () => {
    const data = await fetchLeaderboard();
    renderTopPlayers(data.topPlayers);
    renderUserProfile(data.currentUser);
  };

  // Начальная загрузка
  loadLeaderboard();
});