/**
 * Cinematic Application Logic - GTA VI Aesthetic
 * Instagram Redirect & Clipboard Copy
 */

document.addEventListener('DOMContentLoaded', () => {
  const IG_HANDLE = 'lista.archimedeforall';
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(message, duration = 2500) {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // Copia Handle Instagram negli appunti
  const copyBtn = document.getElementById('btn-copy-tag');
  const copyBtnLabel = document.getElementById('copy-btn-label');

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(`@${IG_HANDLE}`);
        showToast('TAG @LISTA.ARCHIMEDEFORALL COPIATO!');

        if (copyBtnLabel) {
          const original = copyBtnLabel.textContent;
          copyBtnLabel.textContent = 'COPIATO! ✓';
          setTimeout(() => {
            copyBtnLabel.textContent = original;
          }, 2000);
        }
      } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = `@${IG_HANDLE}`;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('TAG @LISTA.ARCHIMEDEFORALL COPIATO!');
      }
    });
  }

  console.log('GTA VI Style Coming Soon loaded with GTAARTDECO font.');
});
