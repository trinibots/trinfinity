/* ============================================================
   TRINFINITY — src/trinfinity-avatar.js
   Portrait injection layer
   Reads data-avatar-original from each .mes element
   Injects full portrait with stats overlay
   Watches for new messages via MutationObserver
   ============================================================ */

const tf_enhanced = new WeakSet();
let tf_avatarObserver = null;

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
  const mesId  = wrapper.querySelector('.mesIDDisplay');
  const timer  = wrapper.querySelector('.mes_timer');
  const tokens = wrapper.querySelector('.tokenCounterDisplay');
  const oldThumb = wrapper.querySelector('.avatar');

  const w = cfg.portraitW || 120;
  const h = cfg.portraitH || 160;

  /* Portrait container */
  const portrait = document.createElement('div');
  portrait.className = 'tf-portrait';

  /* Portrait image */
  const img = document.createElement('img');
  img.className   = 'tf-portrait-img';
  img.src         = avatarUrl;
  img.alt         = '';
  img.draggable   = false;
  img.style.minHeight = h + 'px';

  /* Error fallback — use thumbnail if original fails */
  img.onerror = function() {
    const fallback = mes.dataset.avatarThumb || mes.dataset.avatar || '';
    if (fallback && fallback !== avatarUrl) {
      img.src = fallback;
    }
  };

  /* Stats overlay */
  const stats = document.createElement('div');
  stats.className = 'tf-portrait-stats';

  if (mesId)  { mesId.className  += ' tf-stat'; stats.appendChild(mesId); }
  if (timer)  { timer.className  += ' tf-stat'; stats.appendChild(timer); }
  if (tokens) { tokens.className += ' tf-stat'; stats.appendChild(tokens); }

  portrait.appendChild(img);
  portrait.appendChild(stats);

  /* Replace old thumbnail */
  if (oldThumb) oldThumb.remove();

  wrapper.classList.add('tf-avatar-wrapper');
  wrapper.prepend(portrait);
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

  /* Enhance existing */
  tfEnhanceAllMessages(cfg);

  /* Stop any existing observer */
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
      /* Re-enhance if avatar URL changes */
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

/* Re-run enhancement when portrait size changes */
function tfRefreshPortraits(cfg) {
  /* Remove all existing portraits and re-inject */
  document.querySelectorAll('.tf-portrait').forEach(p => {
    const wrapper = p.closest('.mesAvatarWrapper');
    if (!wrapper) return;
    /* Restore old avatar div */
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
