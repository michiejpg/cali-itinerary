/**
 * Trip gate: set TRIP_PASSWORD to your secret before sharing the site.
 * Unlock is stored in sessionStorage for the tab (survives index ↔ day navigation;
 * clears when the tab/window is closed).
 * Note: client-side protection is for casual privacy only, not security.
 */
const TRIP_PASSWORD = "bananacream";
const STORAGE_KEY = "caliTripUnlocked";

function isUnlocked() {
  return sessionStorage.getItem(STORAGE_KEY) === "1";
}

function setUnlocked() {
  sessionStorage.setItem(STORAGE_KEY, "1");
}

function requireAuth() {
  if (!isUnlocked()) {
    window.location.href = "index.html";
  }
}

function initIndexGate() {
  const lock = document.getElementById("lock-screen");
  const main = document.getElementById("main-content");
  const form = document.getElementById("unlock-form");
  const input = document.getElementById("trip-password");
  const err = document.getElementById("lock-error");

  if (!lock || !main || !form) return;

  if (isUnlocked()) {
    lock.classList.add("hidden");
    main.classList.remove("main-hidden");
    main.classList.add("main-visible");
    return;
  }

  main.classList.add("main-hidden");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    err.textContent = "";
    const val = (input.value || "").trim();
    if (val === TRIP_PASSWORD) {
      setUnlocked();
      lock.classList.add("hidden");
      main.classList.remove("main-hidden");
      main.classList.add("main-visible");
      input.value = "";
    } else {
      err.textContent = "Oops! That’s not quite right — try again ✨";
    }
  });
}
