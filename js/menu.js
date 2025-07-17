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

  // Фиксируем высоту .wrapper на размер окна для предотвращения "прыжков"
  function setWrapperHeight() {
    const wrapper = document.querySelector(".wrapper");
    wrapper.style.height = window.innerHeight + "px";
  }
  window.addEventListener("resize", setWrapperHeight);
  window.addEventListener("orientationchange", setWrapperHeight);
  setWrapperHeight();

  // Кнопка PLAY — проверка и переход на игру
  document.getElementById("playBtn").addEventListener("click", () => {
    const amount = parseFloat(document.getElementById("depositInput").value);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid TON amount.");
      return;
    }
    sessionStorage.setItem("depositAmount", amount);
    window.location.href = "game.html";
  });

  // Кнопки меню
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

  // Кнопка Share
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
});
