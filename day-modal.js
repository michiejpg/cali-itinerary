/**
 * Per-day question modal. Answers saved in localStorage (any non-empty submit dismisses).
 */
function dayModalInit(dayId, questionText) {
  const overlay = document.getElementById("day-modal");
  const questionEl = document.getElementById("modal-question");
  const input = document.getElementById("modal-answer");
  const form = document.getElementById("modal-form");
  const storageKey = `caliDayModal_${dayId}`;

  if (!overlay || !questionEl || !input || !form) return;

  questionEl.textContent = questionText;

  if (localStorage.getItem(storageKey)) {
    overlay.classList.add("hidden");
    return;
  }

  overlay.classList.remove("hidden");
  requestAnimationFrame(() => input.focus());

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const answer = (input.value || "").trim();
    if (!answer) {
      input.focus();
      return;
    }
    try {
      localStorage.setItem(storageKey, JSON.stringify({ answer, at: Date.now() }));
    } catch (_) {
      localStorage.setItem(storageKey, "1");
    }
    overlay.classList.add("hidden");
  });
}
