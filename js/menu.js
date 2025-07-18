window.addEventListener("DOMContentLoaded", () => {
  // Telegram WebApp Init
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();
    tg.requestFullscreen?.();
    document.body.style.overflow = "hidden";
  }

  // TonConnect UI Init
  new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: "https://z-ten-iota.vercel.app/tonconnect-manifest.json",
    buttonRootId: "ton-connect",
  });

  const depositInput = document.getElementById("depositInput");
  const customKeyboard = document.getElementById("customKeyboard");
  const profitBox = document.getElementById("profitBox");
  const delKey = document.getElementById("delKey");
  const closeKeyboardBtn = document.getElementById("closeKeyboardBtn");

  // Показываем клавиатуру при фокусе на input
  depositInput.addEventListener("focus", () => {
    customKeyboard.style.display = "block";
    if (profitBox) {
      profitBox.style.opacity = "0";
      profitBox.style.pointerEvents = "none";
    }
  });

  // Закрываем клавиатуру по кнопке
  closeKeyboardBtn.addEventListener("click", () => {
    customKeyboard.style.display = "none";
    depositInput.blur();
    if (profitBox) {
      profitBox.style.opacity = "1";
      profitBox.style.pointerEvents = "auto";
    }
  });

  // Удаление последнего символа
  delKey.addEventListener("click", () => {
    depositInput.value = depositInput.value.slice(0, -1);
  });

  // Обработчик нажатий на цифровые кнопки и точку
  customKeyboard.querySelectorAll("button.key").forEach((btn) => {
    if (btn.id === "delKey" || btn.id === "closeKeyboardBtn") return; // пропускаем удаление и закрытие

    btn.addEventListener("click", () => {
      const val = btn.textContent;
      const current = depositInput.value;

      if (val === ".") {
        // Вводим точку только один раз
        if (!current.includes(".")) {
          depositInput.value += val;
        }
      } else {
        depositInput.value += val;
      }
    });
  });

  // PLAY кнопка (пример проверки суммы)
  document.getElementById("playBtn").addEventListener("click", () => {
    const amt = parseFloat(depositInput.value);
    if (isNaN(amt) || amt <= 0) {
      alert("Please enter a valid TON amount.");
      return;
    }
    sessionStorage.setItem("depositAmount", amt);
    window.location.href = "game.html";
  });

  // Меню навигация
  const navMap = {
    btnGuide: "guide.html",
    btnLeaderboard: "stats.html",
    btnWithdraw: "withdraw.html",
  };
  for (const [id, url] of Object.entries(navMap)) {
    document.getElementById(id)?.addEventListener("click", () => {
      window.location.href = url;
    });
  }

  document.getElementById("btnRewards")?.addEventListener("click", () => {
    alert("Rewards not ready yet");
  });

  document.getElementById("btnReferral")?.addEventListener("click", () => {
    alert("Referral system coming soon");
  });

  // Share кнопка
  const shareBtn = document.getElementById("shareBtn");
  if (shareBtn && navigator.share) {
    shareBtn.addEventListener("click", () => {
      navigator.share({
        title: "ZmeiFi Game",
        text: "Check out ZmeiFi — awesome TON game!",
        url: location.href,
      }).catch(console.error);
    });
  }
});