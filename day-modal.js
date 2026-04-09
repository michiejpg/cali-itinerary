/**
 * Per-day question modal. Shown on every page load; correct answer dismisses until next visit.
 */
function dayModalInit(dayId, questionText, expectedAnswer) {
  const overlay = document.getElementById("day-modal");
  const questionEl = document.getElementById("modal-question");
  const input = document.getElementById("modal-answer");
  const form = document.getElementById("modal-form");
  const cancelBtn = document.getElementById("modal-cancel");

  if (!overlay || !questionEl || !input || !form) return;

  questionEl.textContent = questionText;

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
      const normalizedAnswer = normalize(answer);
      const valid =
        Array.isArray(expectedAnswer)
          ? expectedAnswer.some((ea) => normalize(ea) === normalizedAnswer)
          : normalizedAnswer === normalize(expectedAnswer);
      if (!valid) {
        input.value = "";
        input.placeholder = "Not quite, try again...";
        input.focus();
        return;
      }
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
