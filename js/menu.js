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

  // Элементы
  const depositInput = document.getElementById("depositInput");
  const customKeyboard = document.getElementById("customKeyboard");
  const keyboardCloseBtn = document.getElementById("keyboardCloseBtn");
  const playBtn = document.getElementById("playBtn");
  const profitBox = document.getElementById("profitBox");

  // ▶️ Кнопка PLAY
  playBtn.addEventListener("click", () => {
    const amt = parseFloat(depositInput.value);
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

  // 👀 Скрыть/показать блок профита при фокусе (оставляем как есть)
  if (profitBox && depositInput) {
    depositInput.addEventListener("focus", () => {
      profitBox.style.opacity = "0";
      profitBox.style.pointerEvents = "none";
      openKeyboard();
    });

    depositInput.addEventListener("blur", () => {
      setTimeout(() => {
        // Здесь не скрываем клавиатуру, т.к. она закрывается крестиком или Enter
        profitBox.style.opacity = "1";
        profitBox.style.pointerEvents = "auto";
      }, 100);
    });
  }

  // Открыть кастомную клавиатуру
  function openKeyboard() {
    if (customKeyboard.classList.contains("hidden")) {
      customKeyboard.classList.remove("hidden");
      customKeyboard.setAttribute("aria-hidden", "false");
    }
  }

  // Закрыть кастомную клавиатуру
  function closeKeyboard() {
    if (!customKeyboard.classList.contains("hidden")) {
      customKeyboard.classList.add("hidden");
      customKeyboard.setAttribute("aria-hidden", "true");
      depositInput.blur();
    }
  }

  // Обработка кликов по кнопкам клавиатуры
  let lastClickTime = 0;
  customKeyboard.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;

    const now = Date.now();
    if (now - lastClickTime < 150) {
      // Предотвращаем быстрые двойные нажатия
      e.preventDefault();
      return;
    }
    lastClickTime = now;

    const key = e.target.dataset.key;
    if (!key) return;

    if (key === "backspace") {
      // Удаляем последний символ
      depositInput.value = depositInput.value.slice(0, -1);
    } else if (key === "enter") {
      // Закрываем клавиатуру и триггерим нажатие playBtn
      closeKeyboard();
      playBtn.click();
    } else if (key === "close") {
      // Закрыть клавиатуру крестиком
      closeKeyboard();
    } else {
      // Добавляем цифру или точку

      // Логика:  
      // - Разрешаем только 1 точку
      // - Максимум 10 символов (примерно), можно расширить или убрать ограничение
      if (key === ".") {
        if (depositInput.value.includes(".")) return;
        if (depositInput.value.length === 0) {
          // Если ввод сразу с точки — добавляем 0.
          depositInput.value = "0.";
          return;
        }
      }
      // Максимальная длина — 10 символов (цифры + точка)
      if (depositInput.value.length >= 10) return;

      // Добавляем
      depositInput.value += key;
    }

    // Фокус на инпут, чтобы визуально всегда был активен
    depositInput.focus();
  });

  // Закрытие клавиатуры крестиком
  keyboardCloseBtn.addEventListener("click", () => {
    closeKeyboard();
  });

  // При клике по инпуту — открыть клавиатуру
  depositInput.addEventListener("click", () => {
    openKeyboard();
  });

  // Чтобы не выскакивала системная клавиатура, инпут readonly и кастомная клавиатура

});
