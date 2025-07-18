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

  // 🎮 Кнопка PLAY
  document.getElementById("playBtn")?.addEventListener("click", () => {
    const amt = parseFloat(document.getElementById("depositInput").value);
    if (isNaN(amt) || amt <= 0) {
      alert("Please enter a valid TON amount.");
      return;
    }
    sessionStorage.setItem("depositAmount", amt);
    window.location.href = "game.html";
  });

  // 🧭 Навигация по меню
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

  // 📤 Share кнопка
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

  // 🔢 Кастомная клавиатура
  const depositInput = document.getElementById("depositInput");
  const customKeyboard = document.getElementById("customKeyboard");
  const profitBox = document.getElementById("profitBox");
  const enterKey = document.getElementById("enterKey");
  const delKey = document.getElementById("delKey");

  if (depositInput && customKeyboard) {
    depositInput.addEventListener("focus", () => {
      customKeyboard.style.display = "block";
      if (profitBox) {
        profitBox.style.opacity = "0";
        profitBox.style.pointerEvents = "none";
      }
    });

    enterKey?.addEventListener("click", () => {
      customKeyboard.style.display = "none";
      depositInput.blur();
      if (profitBox) {
        profitBox.style.opacity = "1";
        profitBox.style.pointerEvents = "auto";
      }
    });

    delKey?.addEventListener("click", () => {
      depositInput.value = depositInput.value.slice(0, -1);
    });

    customKeyboard.querySelectorAll("button").forEach((btn) => {
      const val = btn.textContent;
      if (!["←", "OK"].includes(val)) {
        btn.addEventListener("click", () => {
          depositInput.value += val;
        });
      }
    });
  }
});