window.addEventListener("DOMContentLoaded", () => {
  // ✅ Telegram WebApp
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();
    tg.requestFullscreen?.();
    document.body.style.overflow = "hidden";
  }

  // ✅ TonConnect UI инициализация
  if (window.TON_CONNECT_UI) {
    new TON_CONNECT_UI.TonConnectUI({
      manifestUrl: "https://z-ten-iota.vercel.app/tonconnect-manifest.json",
      buttonRootId: "ton-connect",
    });
  }

  // ▶️ Кнопка PLAY
  const playBtn = document.getElementById("playBtn");
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      const amt = parseFloat(document.getElementById("depositInput").value);
      if (isNaN(amt) || amt <= 0) {
        alert("Please enter a valid TON amount.");
        return;
      }
      sessionStorage.setItem("depositAmount", amt);
      window.location.href = "game.html";
    });
  }

  // 🧭 Навигация по меню
  const menuMap = {
    btnGuide: () => (window.location.href = "guide.html"),
    btnRewards: () => alert("Rewards not ready yet"),
    btnLeaderboard: () => (window.location.href = "stats.html"),
    btnWithdraw: () => (window.location.href = "withdraw.html"),
    btnReferral: () => alert("Referral system coming soon"),
  };
  for (const [id, handler] of Object.entries(menuMap)) {
    const el = document.getElementById(id);
    if (el) el.onclick = handler;
  }

  // 📤 Кнопка Share (если поддерживается)
  const shareBtn = document.getElementById("shareBtn");
  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      if (navigator.share) {
        navigator
          .share({
            title: "ZmeiFi Game",
            text: "Check out ZmeiFi — awesome TON game!",
            url: location.href,
          })
          .catch(console.error);
      } else {
        alert("Sharing not supported on this device");
      }
    });
  }

  // 👀 Скрывать/показывать блок профита при фокусе input
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
      }, 100); // задержка для скрытия клавиатуры
    });
  }

  // 🔍 Заглушка кнопки, если TonConnect не загрузился
  if (!window.TON_CONNECT_UI) {
    const fallback = document.createElement("button");
    fallback.innerText = "Connect Wallet (Dev)";
    fallback.className = "dev-wallet-button";

    const tonConnectDiv = document.getElementById("ton-connect");
    if (tonConnectDiv && tonConnectDiv.children.length === 0) {
      tonConnectDiv.appendChild(fallback);
    }
  }
});
