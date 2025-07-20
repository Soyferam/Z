// common.js
window.addEventListener("DOMContentLoaded", () => {
  // ✅ Telegram WebApp
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();
    tg.requestFullscreen?.();
    document.body.style.overflow = "hidden";
    console.log("[Common] Telegram WebApp initialized");
  }

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

  // 👀 Скрыть/показать блок профита при фокусе на любом input
  const profitBox = document.getElementById("profitBox");
  const inputs = document.querySelectorAll("input");

  if (profitBox && inputs.length > 0) {
    inputs.forEach(input => {
      input.addEventListener("focus", () => {
        profitBox.style.opacity = "0";
        profitBox.style.pointerEvents = "none";
      });

      input.addEventListener("blur", () => {
        setTimeout(() => {
          profitBox.style.opacity = "1";
          profitBox.style.pointerEvents = "auto";
        }, 100); // Задержка для сворачивания клавиатуры
      });
    });
  }

  // 🔙 Кнопка Back
  const backBtn = document.getElementById("backBtn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "menu.html";
    });
  }
});