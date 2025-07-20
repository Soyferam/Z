// referral.js
window.addEventListener("DOMContentLoaded", () => {
  const referralLink = document.getElementById("referralLink");
  const copyReferralBtn = document.getElementById("copyReferralBtn");
  const referralsItems = document.getElementById("referralsItems");

  // Получение реферальной ссылки и списка рефералов (моковые данные, заменить на API)
  const fetchReferralData = async () => {
    try {
      // Placeholder for API request
      // const response = await fetch('https://your-api.com/referral', {
      //   method: 'GET',
      //   headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
      // });
      // const data = await response.json();
      // return data;

      // Mock data
      return {
        referralLink: `https://zmeifi.com/ref/${Math.random().toString(36).substr(2, 8)}`,
        referrals: [
          { avatar: "avatar1.png", name: "PlayerOne", profit: 50 },
          { avatar: "avatar2.png", name: "SnakeMaster", profit: 30 },
          { avatar: "avatar3.png", name: "ZmeiFiPro", profit: 20 },
          { avatar: "avatar4.png", name: "CryptoKing", profit: 15 },
          { avatar: "avatar5.png", name: "TokenLord", profit: 10 },
        ],
      };
    } catch (error) {
      console.error("[Referral] Error fetching referral data:", error);
      return { referralLink: "", referrals: [] };
    }
  };

  // Отрисовка списка рефералов
  const renderReferrals = (referrals) => {
    referralsItems.innerHTML = "";
    referrals.forEach((referral) => {
      const item = document.createElement("div");
      item.className = "referrals-item";
      item.innerHTML = `
        <div class="avatar-container">
          <img src="${referral.avatar}" alt="Avatar" class="avatar" />
        </div>
        <span class="name">${referral.name}</span>
        <span class="profit">+${referral.profit}</span>
      `;
      referralsItems.appendChild(item);
    });
  };

  // Обновление реферальной ссылки
  const updateReferralLink = (link) => {
    if (referralLink) {
      referralLink.value = link || "No referral link available";
    }
  };

  // Копирование ссылки и шаринг через Telegram
  copyReferralBtn.addEventListener("click", () => {
    const link = referralLink.value;
    if (link) {
      // Копирование в буфер обмена
      navigator.clipboard.writeText(link).then(() => {
        alert("Referral link copied!");
      }).catch((err) => {
        console.error("[Referral] Error copying link:", err);
        alert("Failed to copy link.");
      });

      // Шаринг через Telegram WebApp
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.shareUrl(link, "Join ZmeiFi and earn rewards!");
      }
    }
  });

  // Загрузка и отрисовка данных
  const loadReferralData = async () => {
    const data = await fetchReferralData();
    updateReferralLink(data.referralLink);
    renderReferrals(data.referrals);
  };

  // Начальная загрузка
  loadReferralData();
});