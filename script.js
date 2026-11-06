document.addEventListener('DOMContentLoaded', function() {
  /* ==========================================================================
     1. CONFIRMAÇÃO DE PRESENÇA
     ========================================================================== */
  const modal = document.getElementById('rsvpModal');
  const openBtn = document.getElementById('rsvpBtn');
  const closeBtn = document.getElementById('closeRsvpBtn');
  const rsvpForm = document.getElementById('rsvpForm');

  // Garante que o modal inicia oculto ao carregar
  if (modal) {
    modal.style.display = 'none';
  }

  // Abrir o modal ao clicar em "Confirmar Presença"
  if (openBtn) {
    openBtn.addEventListener('click', function() {
      if (modal) modal.style.display = 'flex';
    });
  }

  // Fechar o modal ao clicar em "Fechar"
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      if (modal) modal.style.display = 'none';
    });
  }

  // Fechar o modal se clicar fora da caixa branca
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

 // Envio do formulário via WhatsApp
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const numeroWhatsapp = "5511976259461"; 

      const nome = document.getElementById('nome').value;
      const recepcao = document.getElementById('presencaRecepcao').value;
      const acompanhantes = document.getElementById('acompanhantes').value;

      let mensagem = `*Confirmação de Presença - Casamento Amanda & Paulo*\n\n`;
      mensagem += `👤 *Nome:* ${nome}\n`;
      mensagem += `🥂 *Recepção:* ${recepcao}\n`;
      mensagem += `👥 *Acompanhantes:* ${acompanhantes || 'Nenhum'}`; // Se deixar vazio, avisa que não tem

      const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;
      window.open(urlWhatsapp, '_blank');
    });
  }

/* ==========================================================================
     2. CONTROLE DA MÚSICA DE FUNDO
     ========================================================================== */
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');

if (bgMusic && musicBtn) {
  const musicIcon = musicBtn.querySelector('i');

  function toggleMusic() {
    if (bgMusic.paused) {
      bgMusic.play().then(() => {
        musicBtn.classList.add('playing');
        musicIcon.className = 'fa-solid fa-pause';
      }).catch((error) => {
        console.error("Erro ao tocar áudio:", error);
      });
    } else {
      bgMusic.pause();
      musicBtn.classList.remove('playing');
      musicIcon.className = 'fa-solid fa-music';
    }
  }

  musicBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMusic();
  });

  const startAudioOnInteraction = () => {
    if (bgMusic.paused) {
      bgMusic.play().then(() => {
        musicBtn.classList.add('playing');
        musicIcon.className = 'fa-solid fa-pause';
      }).catch(() => {});
    }
    document.removeEventListener('click', startAudioOnInteraction);
    document.removeEventListener('touchstart', startAudioOnInteraction);
  };

  document.addEventListener('click', startAudioOnInteraction);
  document.addEventListener('touchstart', startAudioOnInteraction);
}

/* ==========================================================================
     3. CONTAGEM REGRESSIVA
     ========================================================================== */
const targetDate = new Date("January 09, 2027 00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl) daysEl.innerText = days < 10 ? "0" + days : days;
    if (hoursEl) hoursEl.innerText = hours < 10 ? "0" + hours : hours;
    if (minutesEl) minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
    if (secondsEl) secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
  } else {
    const countdownEl = document.getElementById("countdown");
    if (countdownEl) {
      countdownEl.innerHTML = "<span style='color: var(--primary-color); font-size: 1rem;'>É HOJE O GRANDE DIA!</span>";
    }
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();
