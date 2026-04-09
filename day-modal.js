/**
 * Per-day question modal. Answers saved in localStorage (any non-empty submit dismisses).
 */
function dayModalInit(dayId, questionText, expectedAnswer) {
  const overlay = document.getElementById("day-modal");
  const questionEl = document.getElementById("modal-question");
  const input = document.getElementById("modal-answer");
  const form = document.getElementById("modal-form");
  const cancelBtn = document.getElementById("modal-cancel");
  const storageKey = `caliDayModal_${dayId}`;

  if (!overlay || !questionEl || !input || !form) return;

  questionEl.textContent = questionText;

  if (localStorage.getItem(storageKey)) {
    overlay.classList.add("hidden");
    return;
  }

  const dismiss = () => {
    overlay.classList.add("hidden");
  };
  const backToCalendar = () => {
    window.location.href = "index.html";
  };

  overlay.classList.remove("hidden");
  requestAnimationFrame(() => input.focus());

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const answer = (input.value || "").trim();
    if (!answer) {
      input.focus();
      return;
    }

    if (expectedAnswer) {
      const normalize = (text) => text.trim().toLowerCase().replace(/\s+/g, " ");
      if (normalize(answer) !== normalize(expectedAnswer)) {
        input.value = "";
        input.placeholder = "Not quite, try again...";
        input.focus();
        return;
      }
    }

    try {
      localStorage.setItem(storageKey, JSON.stringify({ answer, at: Date.now() }));
    } catch (_) {
      localStorage.setItem(storageKey, "1");
    }
    dismiss();
  });

  if (cancelBtn) {
    cancelBtn.addEventListener("click", backToCalendar);
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) backToCalendar();
  });

  document.addEventListener("keydown", (e) => {
    if (overlay.classList.contains("hidden")) return;

    // Don't steal Backspace from text editing.
    const ae = document.activeElement;
    const isEditing =
      ae &&
      (ae.tagName === "INPUT" ||
        ae.tagName === "TEXTAREA" ||
        ae.isContentEditable === true);

    if (e.key === "Backspace" && !isEditing) {
      e.preventDefault();
      backToCalendar();
    }
  });
}
