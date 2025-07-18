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
  document.getElementById("btnRewards").onclick = () => alert("Rewards not ready yet");
  document.getElementById("btnLeaderboard").onclick = () => window.location.href = "stats.html";
  document.getElementById("btnWithdraw").onclick = () => window.location.href = "withdraw.html";
  document.getElementById("btnReferral").onclick = () => alert("Referral system coming soon");

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
      }, 100); // Задержка для сворачивания клавиатуры
    });
  }

  // 🧭 Guide functionality
  const guideModal = document.getElementById('guideModal');
  const guideClose = document.getElementById('guideClose');
  const guideSlides = document.querySelectorAll('.guide-slide');
  const guideDots = document.querySelectorAll('.dot');
  let currentSlide = 0;

  function showSlide(index) {
    guideSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      const backBtn = slide.querySelector('.guide-back');
      const nextBtn = slide.querySelector('.guide-next');
      if (backBtn) {
        backBtn.style.display = index === 0 ? 'none' : 'block';
        backBtn.textContent = 'Back'; // Гарантируем наличие текста
      }
      if (nextBtn) {
        nextBtn.style.display = index === guideSlides.length - 1 ? 'none' : 'block';
        nextBtn.textContent = 'Next'; // Гарантируем наличие текста
      }
    });

    guideDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  // Open guide
  document.getElementById('btnGuide').addEventListener('click', () => {
    guideModal.style.display = 'block';
    currentSlide = 0;
    showSlide(currentSlide);
  });

  // Close guide
  guideClose.addEventListener('click', () => {
    guideModal.style.display = 'none';
  });

  // Navigation buttons
  guideSlides.forEach(slide => {
    const nextBtn = slide.querySelector('.guide-next');
    const backBtn = slide.querySelector('.guide-back');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentSlide < guideSlides.length - 1) {
          currentSlide++;
          showSlide(currentSlide);
        }
      });
    }

    if (backBtn) {
      backBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
          currentSlide--;
          showSlide(currentSlide);
        }
      });
    }
  });

  // Dots
  guideDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
});