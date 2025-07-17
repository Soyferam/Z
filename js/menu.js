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
  new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: "https://z-ten-iota.vercel.app/tonconnect-manifest.json",
    buttonRootId: "ton-connect",
  });

  // PLAY
  document.getElementById("playBtn").addEventListener("click", () => {
    const amt = parseFloat(document.getElementById("depositInput").value);
    if (isNaN(amt) || amt <= 0) {
      alert("Please enter a valid TON amount.");
      return;
    }
    sessionStorage.setItem("depositAmount", amt);
    window.location.href = "game.html";
  });

  // Меню
  document.getElementById("btnGuide").onclick = () => window.location.href = "guide.html";
  document.getElementById("btnRewards").onclick = () => alert("Rewards not ready");
  document.getElementById("btnLeaderboard").onclick = () => window.location.href = "stats.html";
  document.getElementById("btnWithdraw").onclick = () => window.location.href = "withdraw.html";
  document.getElementById("btnReferral").onclick = () => alert("Referral not ready");

  // Share
  document.getElementById("shareBtn").addEventListener("click", () => {
    if (navigator.share) {
      navigator.share({
        title: "ZmeiFi Game",
        text: "Check out ZmeiFi — awesome TON game!",
        url: location.href,
      }).catch(console.error);
    } else {
      alert("Share API not supported");
    }
  });

  // Подстройка плашки под клавиатуру
  const profitBox = document.getElementById("profitBox");
  function adjust() {
    if (window.visualViewport) {
      const vh = window.visualViewport.height;
      const total = window.innerHeight;
      const offset = total - (vh + window.visualViewport.offsetTop);
      profitBox.style.bottom = `${offset > 20 ? offset : 20}px`;
    } else {
      profitBox.style.bottom = "20px";
    }
  }
  adjust();
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", adjust);
    window.visualViewport.addEventListener("scroll", adjust);
  } else {
    window.addEventListener("resize", adjust);
  }
});
