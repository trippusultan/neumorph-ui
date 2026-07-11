/* NEUMORPH UI — interactivity for the demo + storefront */
(function () {
  // Live theme playground
  const vars = {
    bg: document.getElementById('c-bg'),
    surface: document.getElementById('c-surface'),
    accent: document.getElementById('c-accent'),
    radius: document.getElementById('c-radius'),
    dist: document.getElementById('c-dist'),
    blur: document.getElementById('c-blur'),
  };
  const root = document.documentElement;
  const codeOut = document.getElementById('code-out');

  function sync() {
    if (!vars.bg) return;
    root.style.setProperty('--bg', vars.bg.value);
    root.style.setProperty('--surface', vars.surface.value);
    root.style.setProperty('--accent', vars.accent.value);
    root.style.setProperty('--radius', vars.radius.value + 'px');
    root.style.setProperty('--dist', vars.dist.value + 'px');
    root.style.setProperty('--blur-amount', vars.blur.value + 'px');
    document.getElementById('v-radius').textContent = vars.radius.value + 'px';
    document.getElementById('v-dist').textContent = vars.dist.value + 'px';
    document.getElementById('v-blur').textContent = vars.blur.value + 'px';
    codeOut.value =
`:root{
  --bg: ${vars.bg.value};
  --surface: ${vars.surface.value};
  --accent: ${vars.accent.value};
  --radius: ${vars.radius.value}px;
  --dist: ${vars.dist.value}px;
  --blur-amount: ${vars.blur.value}px;
}`;
  }
  Object.values(vars).forEach(el => el && el.addEventListener('input', sync));

  // Copy helpers
  function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 1800);
  }
  document.querySelectorAll('[data-copy]').forEach(b => {
    b.addEventListener('click', () => {
      const txt = document.getElementById(b.dataset.copy).value;
      navigator.clipboard.writeText(txt).then(() => toast('Copied to clipboard ✓'));
    });
  });

  // Toggles
  document.querySelectorAll('.toggle').forEach(t => {
    t.addEventListener('click', () => t.classList.toggle('on'));
  });

  // Chips
  document.querySelectorAll('.chip-group').forEach(g => {
    g.addEventListener('click', e => {
      if (!e.target.classList.contains('chip')) return;
      g.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
    });
  });

  // Checkboxes
  document.querySelectorAll('.check-row, .check').forEach(c => {
    c.addEventListener('click', e => {
      e.stopPropagation();
      (c.classList.contains('check') ? c : c.querySelector('.check')).classList.toggle('on');
    });
  });

  // Radios (single-select within a group)
  document.querySelectorAll('.radio-row').forEach(r => {
    r.addEventListener('click', () => {
      const group = r.parentElement.querySelectorAll('.radio-row');
      group.forEach(x => x.querySelector('.radio').classList.remove('on'));
      r.querySelector('.radio').classList.add('on');
    });
  });

  // Segmented controls (single-select within a control)
  document.querySelectorAll('.segmented').forEach(seg => {
    seg.addEventListener('click', e => {
      if (e.target.tagName !== 'BUTTON') return;
      seg.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
    });
  });

  // Star rating
  document.querySelectorAll('.stars').forEach(st => {
    const stars = [...st.children];
    st.addEventListener('click', e => {
      const idx = stars.indexOf(e.target);
      if (idx < 0) return;
      stars.forEach((s, i) => s.classList.toggle('on', i <= idx));
    });
  });

  // Accordion (free version)
  document.querySelectorAll('.acc-free .acc-item').forEach(it => {
    it.addEventListener('click', () => it.classList.toggle('open'));
  });

  // UPI intent deep-link
  const upiId = 'trippusultan@razorpay';
  const upiBtn = document.getElementById('upi-pay');
  if (upiBtn) {
    upiBtn.addEventListener('click', () => {
      const amount = upiBtn.dataset.amount;
      const note = encodeURIComponent('Neumorph UI Pro pack');
      const url = `upi://pay?pa=${upiId}&pn=Trippu%20Sultan&am=${amount}&cu=INR&tn=${note}`;
      window.location.href = url;
      toast('Opening your UPI app… if nothing happened, scan the QR');
    });
  }

  sync();
})();
