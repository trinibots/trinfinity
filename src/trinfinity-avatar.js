/* ============================================================
   TRINFINITY — src/trinfinity-avatar.js
   Portrait injection layer
   Reads data-avatar-original from each .mes element
   Injects full portrait with stats overlay
   Watches for new messages via MutationObserver

   v0.3.1 — sidebar stack: shows current + 2 previous portraits
   ============================================================ */

const tf_enhanced = new WeakSet();
let tf_avatarObserver = null;

/* ── Build a single portrait div (no stats overlay on ghost copies) ── */
function tfMakePortrait(avatarUrl, w, h, isMain) {
  const portrait = document.createElement('div');
  portrait.className = isMain ? 'tf-portrait' : 'tf-portrait tf-portrait-ghost';

  const img = document.createElement('img');
  img.className   = 'tf-portrait-img';
  img.src         = avatarUrl;
  img.alt         = '';
  img.draggable   = false;
  img.style.minHeight = h + 'px';

  img.onerror = function() {
    portrait.style.display = 'none';
  };

  portrait.appendChild(img);
  return portrait;
}

function tfEnhanceMessage(mes, cfg) {
  if (tf_enhanced.has(mes)) return;

  const avatarUrl =
    mes.dataset.avatarOriginal ||
    mes.dataset.avatarThumb    ||
    mes.dataset.avatar         ||
    '';

  if (!avatarUrl) return;

  const wrapper = mes.querySelector('.mesAvatarWrapper');
  if (!wrapper) return;

  tf_enhanced.add(mes);

  /* Pull existing stat elements */
  const mesId    = wrapper.querySelector('.mesIDDisplay');
  const timer    = wrapper.querySelector('.mes_timer');
  const tokens   = wrapper.querySelector('.tokenCounterDisplay');
  const oldThumb = wrapper.querySelector('.avatar');

  const w = cfg.portraitW || 120;
  const h = cfg.portraitH || 160;

  /* ── Main portrait (current message) ── */
  const portrait = tfMakePortrait(avatarUrl, w, h, true);

  /* Stats overlay — only on main portrait */
  const stats = document.createElement('div');
  stats.className = 'tf-portrait-stats';

  if (mesId)  { mesId.className  += ' tf-stat'; stats.appendChild(mesId); }
  if (timer)  { timer.className  += ' tf-stat'; stats.appendChild(timer); }
  if (tokens) { tokens.className += ' tf-stat'; stats.appendChild(tokens); }

  portrait.appendChild(stats);

  /* Replace old thumbnail */
  if (oldThumb) oldThumb.remove();

  wrapper.classList.add('tf-avatar-wrapper');
  wrapper.innerHTML = '';  /* clear before inserting */
  wrapper.appendChild(portrait);

  /* ── Ghost portraits: find previous 2 messages with different avatar ── */
  const isUser = mes.getAttribute('is_user') === 'true';
  const allMes = Array.from(document.querySelectorAll('#chat .mes'));
  const idx = allMes.indexOf(mes);

  const ghosts = [];
  for (let i = idx - 1; i >= 0 && ghosts.length < 2; i--) {
    const prev = allMes[i];
    /* Only stack same side (char vs user) */
    const prevIsUser = prev.getAttribute('is_user') === 'true';
    if (prevIsUser !== isUser) continue;

    const prevUrl =
      prev.dataset.avatarOriginal ||
      prev.dataset.avatarThumb    ||
      prev.dataset.avatar         ||
      '';
    if (!prevUrl) continue;

    ghosts.push(prevUrl);
  }

  /* Append ghost portraits below the main one (older = further down) */
  ghosts.forEach(url => {
    const ghost = tfMakePortrait(url, w, h, false);
    wrapper.appendChild(ghost);
  });
}

function tfEnhanceAllMessages(cfg) {
  document.querySelectorAll('#chat .mes').forEach(mes => tfEnhanceMessage(mes, cfg));
}

function tfStartAvatarObserver(cfg) {
  const chat = document.getElementById('chat');
  if (!chat) {
    setTimeout(() => tfStartAvatarObserver(cfg), 500);
    return;
  }

  tfEnhanceAllMessages(cfg);

  if (tf_avatarObserver) tf_avatarObserver.disconnect();

  tf_avatarObserver = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        if (node.classList?.contains('mes')) {
          tfEnhanceMessage(node, cfg);
        } else {
          node.querySelectorAll?.('.mes').forEach(m => tfEnhanceMessage(m, cfg));
        }
      });
      if (
        mutation.type === 'attributes' &&
        mutation.target.classList?.contains('mes')
      ) {
        tf_enhanced.delete(mutation.target);
        tfEnhanceMessage(mutation.target, cfg);
      }
    });
  });

  tf_avatarObserver.observe(chat, {
    childList:       true,
    subtree:         true,
    attributes:      true,
    attributeFilter: ['data-avatar-original', 'data-avatar', 'data-avatar-thumb'],
  });
}

function tfRefreshPortraits(cfg) {
  document.querySelectorAll('.tf-portrait').forEach(p => {
    const wrapper = p.closest('.mesAvatarWrapper');
    if (!wrapper) return;
    const oldAvatar = document.createElement('div');
    oldAvatar.className = 'avatar';
    const img = document.createElement('img');
    const mes = wrapper.closest('.mes');
    img.src = mes?.dataset?.avatarThumb || mes?.dataset?.avatar || '';
    oldAvatar.appendChild(img);
    p.remove();
    wrapper.prepend(oldAvatar);
    if (mes) tf_enhanced.delete(mes);
  });
  tfEnhanceAllMessages(cfg);
}
