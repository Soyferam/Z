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
    manifestUrl: "https://zmeifi.com/tonconnect-manifest.json",
  }).onStatusChange((wallet) => {
    const tonConnectDiv = document.getElementById("ton-connect");
    if (wallet) {
      tonConnectDiv.textContent = `Connected: ${wallet.account}`;
    } else {
      tonConnectDiv.textContent = "Connect Wallet";
    }
  });

  const playBtn = document.getElementById("playBtn");
  const depositInput = document.getElementById("depositInput");

  // Клавиатура
  const keyboard = document.getElementById("customKeyboard");
  const keyboardCloseBtn = document.getElementById("keyboardCloseBtn");

  // Показать клавиатуру при фокусе
  depositInput.addEventListener("focus", () => {
    openKeyboard();
  });

  // Обработчик нажатий на кнопки клавиатуры
  keyboard.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const key = btn.dataset.key;

    if (!key) return;

    if (key === "backspace") {
      depositInput.value = depositInput.value.slice(0, -1);
    } else if (key === "close") {
      closeKeyboard();
    } else if (key === "enter") {
      // Просто закрываем клавиатуру, не вызываем playBtn.click()
      closeKeyboard();
    } else {
      // Добавляем символ, если это цифра или точка
      if ((/[\d.]/).test(key)) {
        // Проверка на одну точку
        if (key === "." && depositInput.value.includes(".")) {
          return;
        }
        depositInput.value += key;
      }
    }
  });

  keyboardCloseBtn.addEventListener("click", () => {
    closeKeyboard();
  });

  function openKeyboard() {
    keyboard.classList.remove("hidden");
    keyboard.setAttribute("aria-hidden", "false");
  }

  function closeKeyboard() {
    keyboard.classList.add("hidden");
    keyboard.setAttribute("aria-hidden", "true");
    depositInput.blur();
  }
});
