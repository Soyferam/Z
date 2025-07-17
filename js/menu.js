window.addEventListener("DOMContentLoaded", () => {
  // Telegram WebApp
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();
    tg.requestFullscreen?.();
    document.body.style.overflow = "hidden";
  }

  // TonConnect UI
  const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: "https://z-ten-iota.vercel.app/tonconnect-manifest.json",
    buttonRootId: "ton-connect",
  });

  // Поддержка кнопки PLAY
  document.getElementById("playBtn").addEventListener("click", () => {
    const amount = parseFloat(document.getElementById("depositInput").value);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid TON amount.");
      return;
    }
    sessionStorage.setItem("depositAmount", amount);
    window.location.href = "game.html";
  });

  // Меню кнопки
  document.getElementById("btnGuide").addEventListener("click", () => {
    window.location.href = "guide.html";
  });
  document.getElementById("btnRewards").addEventListener("click", () => {
    alert("Rewards page not implemented yet.");
  });
  document.getElementById("btnLeaderboard").addEventListener("click", () => {
    window.location.href = "stats.html";
  });
  document.getElementById("btnWithdraw").addEventListener("click", () => {
    window.location.href = "withdraw.html";
  });
  document.getElementById("btnReferral").addEventListener("click", () => {
    alert("Referral page not implemented yet.");
  });

  // Share button
  document.getElementById("shareBtn").addEventListener("click", () => {
    if (navigator.share) {
      navigator
        .share({
          title: "ZmeiFi Game",
          text: "Check out ZmeiFi — awesome TON game!",
          url: window.location.href,
        })
        .catch((err) => console.error("Share failed:", err));
    } else {
      alert("Your browser does not support the Share API.");
    }
  });

  // Подстройка плашки профита при изменении размера окна (клавиатура)
  const profitBox = document.querySelector(".profit-box");
  window.initialInnerHeight = window.innerHeight;

  window.addEventListener("resize", () => {
    if (!profitBox) return;

    // Можно сделать здесь логику, если хочешь отличать открытие клавиатуры
    if (window.innerHeight < window.initialInnerHeight) {
      profitBox.style.bottom = "20px"; // Можно подкорректировать, если нужно
    } else {
      profitBox.style.bottom = "20px";
    }
  });
});
