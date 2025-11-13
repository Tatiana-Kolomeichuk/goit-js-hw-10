const STORAGE_KEY = "feedback-form-state";

const form = document.querySelector(".feedback-form");
let formData = { email: "", message: "" };

document.addEventListener("DOMContentLoaded", () => {
  if (!form) return;

  const data = loadFromLS(STORAGE_KEY);
  if (data) {
    formData.email = (data.email || "").trim();
    formData.message = (data.message || "").trim();
  }

  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
});


form.addEventListener("input", () => {
  formData.email = form.elements.email.value.trim();
  formData.message = form.elements.message.value.trim();

  saveToLS(STORAGE_KEY, formData);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  formData.email = form.elements.email.value.trim();
  formData.message = form.elements.message.value.trim();

  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  console.log({ ...formData });

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: "", message: "" };
  form.reset();
});

function saveToLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLS(key) {
  const raw = localStorage.getItem(key);
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
