function initGameSkeleton(config) {
  const status = document.querySelector('[data-status]');
  const log = document.querySelector('[data-log]');
  const checklistKey = `fd-game-${config.slug}-checks`;
  const checks = JSON.parse(localStorage.getItem(checklistKey) || '{}');

  const writeLog = (text) => {
    if (!log) return;
    const item = document.createElement('li');
    const time = new Date().toLocaleTimeString();
    item.textContent = `[${time}] ${text}`;
    log.prepend(item);
  };

  const persist = () => {
    localStorage.setItem(checklistKey, JSON.stringify(checks));
  };

  document.querySelectorAll('[data-check]').forEach((box) => {
    const key = box.getAttribute('data-check');
    if (checks[key]) box.checked = true;
    box.addEventListener('change', () => {
      checks[key] = box.checked;
      persist();
    });
  });

  const setStatus = (text) => {
    if (status) status.textContent = text;
    writeLog(text);
  };

  const start = document.querySelector('[data-action="start"]');
  const reset = document.querySelector('[data-action="reset"]');
  const note = document.querySelector('[data-note]');

  if (start) {
    start.addEventListener('click', () => {
      setStatus(`${config.title} session started. Add your prototype hooks here.`);
    });
  }

  if (reset) {
    reset.addEventListener('click', () => {
      setStatus('Reset state cleared. Ready for another run.');
    });
  }

  if (note) {
    note.value = localStorage.getItem(`fd-game-${config.slug}-note`) || '';
    note.addEventListener('input', () => {
      localStorage.setItem(`fd-game-${config.slug}-note`, note.value);
    });
  }

  setStatus(config.defaultStatus || 'Ready to prototype.');
  writeLog('Opened skeleton page.');
}
