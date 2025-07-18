window.addEventListener("DOMContentLoaded", () => {
  // ✅ Эмуляция Telegram WebApp в обычном браузере
  if (!window.Telegram) {
    window.Telegram = {
      WebApp: {
        ready: () => console.log("Telegram WebApp: ready (mocked)"),
        expand: () => console.log("Telegram WebApp: expand (mocked)"),
        requestFullscreen: () => console.log("Telegram WebApp: fullscreen (mocked)")
      }
    };
  }

  // ✅ Telegram WebApp
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
  tg.requestFullscreen?.();
  document.body.style.overflow = "hidden";

  // ✅ Инициализация TonConnect UI
  new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: "https://z-ten-iota.vercel.app/tonconnect-manifest.json",
    buttonRootId: "ton-connect",
    uiPreferences: {
      language: "en",
      borderRadius: "20px",
      colorsSet: "dark",
      theme: "dark"
    }
  });

  // ▶️ Кнопка PLAY
  document.getElementById("playBtn").addEventListener("click", () => {
    const amt = parseFloat(document.getElementById("depositInput").value);
    if (isNaN(amt) || amt <= 0) {
      alert("Please enter a valid TON amount.");
      return;
    }
    sessionStorage.setItem("depositAmount", amt);
    window.location.href = "game.html";
  });

  // 🧭 Навигация по меню
  document.getElementById("btnGuide").onclick       = () => window.location.href = "guide.html";
  document.getElementById("btnRewards").onclick     = () => alert("Rewards not ready yet");
  document.getElementById("btnLeaderboard").onclick = () => window.location.href = "stats.html";
  document.getElementById("btnWithdraw").onclick    = () => window.location.href = "withdraw.html";
  document.getElementById("btnReferral").onclick    = () => alert("Referral system coming soon");

  // 📤 Share кнопка
  const shareBtn = document.getElementById("shareBtn");
  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      if (navigator.share) {
        navigator.share({
          title: "ZmeiFi Game",
          text: "Check out ZmeiFi — awesome TON game!",
          url: location.href,
        }).catch(console.error);
      } else {
        alert("Sharing not supported on this device");
      }
    });
  }

  // 👀 Скрытие блока профита при фокусе на input
  const profitBox = document.getElementById("profitBox");
  const depositInput = document.getElementById("depositInput");

  if (profitBox && depositInput) {
    depositInput.addEventListener("focus", () => {
      profitBox.style.opacity = "0";
      profitBox.style.pointerEvents = "none";
    });

    depositInput.addEventListener("blur", () => {
      setTimeout(() => {
        profitBox.style.opacity = "1";
        profitBox.style.pointerEvents = "auto";
      }, 100);
    });
  }
});
