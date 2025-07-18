window.addEventListener("DOMContentLoaded", () => {
  // ✅ Telegram WebApp
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();
    tg.requestFullscreen?.();
    document.body.style.overflow = "hidden";
  }

  // ✅ TonConnect UI
  new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: "https://z-ten-iota.vercel.app/tonconnect-manifest.json",
    buttonRootId: "ton-connect",
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

  // 📤 Share кнопка (если поддерживается)
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

  // 👀 Скрыть/показать блок профита при фокусе
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
      }, 100); // чуть задержим, чтобы клавиатура точно свернулась
    });

      // 🔍 Показывать заглушку, если TonConnect не загрузился
  if (!window.TON_CONNECT_UI) {
    const fallback = document.createElement("button");
    fallback.innerText = "Connect Wallet (Dev)";
    fallback.className = "dev-wallet-button";
    
    const tonConnectDiv = document.getElementById("ton-connect");
    if (tonConnectDiv && tonConnectDiv.children.length === 0) {
      tonConnectDiv.appendChild(fallback);
    }
  }
  }
});
