const pins = [
  { title: "Sunlit rooms", category: "interiors", text: "Quiet interiors, warm light and spaces that feel lived in.", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85" },
  { title: "Ochre study", category: "art", text: "A little color theory for an ordinary afternoon.", image: "https://images.unsplash.com/photo-1577083552431-6e5fd01988f5?auto=format&fit=crop&w=900&q=85" },
  { title: "After the rain", category: "nature", text: "Moss, stone and a walk with nowhere to be.", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=85" },
  { title: "Soft tailoring", category: "fashion", text: "Simple shapes and colors that don't ask for attention.", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85" },
  { title: "Sunday table", category: "food", text: "Good bread, good coffee and an unnecessarily pretty plate.", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85" },
  { title: "Blue hour", category: "nature", text: "The few minutes when everything turns a little quieter.", image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=85" },
  { title: "Collected objects", category: "interiors", text: "Small things with stories attached to them.", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=85" },
  { title: "Still life no. 4", category: "art", text: "Shapes, shadows and a study in restraint.", image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=85" },
  { title: "The red dress", category: "fashion", text: "One color can carry an entire composition.", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85" },
  { title: "Morning market", category: "food", text: "Fresh produce and the best kind of visual clutter.", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85" },
  { title: "Garden notes", category: "nature", text: "Green on green on green.", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=85" },
  { title: "A place to read", category: "interiors", text: "The exact sort of corner where a book becomes an afternoon.", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=85" }
];

const feed = document.getElementById("feed");
const empty = document.getElementById("empty");
const searchToggle = document.getElementById("searchToggle");
const searchWrap = document.getElementById("searchWrap");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const toast = document.getElementById("toast");
let currentPin = null;

function render(list = pins) {
  feed.innerHTML = "";
  empty.style.display = list.length ? "none" : "block";

  list.forEach((pin, index) => {
    const article = document.createElement("article");
    article.className = "pin";
    article.innerHTML = `
      <img src="${pin.image}" alt="${pin.title}" loading="${index < 4 ? "eager" : "lazy"}">
      <button class="save-mini" type="button">Save</button>
      <div class="pin-overlay">
        <small>${pin.category}</small>
        <strong>${pin.title}</strong>
      </div>
    `;

    article.addEventListener("click", (e) => {
      if (e.target.closest(".save-mini")) {
        e.stopPropagation();
        showToast("Saved to your collection");
        return;
      }
      openModal(pin);
    });
    feed.appendChild(article);
  });
}

function openModal(pin) {
  currentPin = pin;
  modalImage.src = pin.image;
  modalImage.alt = pin.title;
  modalCategory.textContent = pin.category;
  modalTitle.textContent = pin.title;
  modalText.textContent = pin.text;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800);
}

function filter() {
  const query = searchInput.value.trim().toLowerCase();
  const selected = document.querySelector(".chip.selected")?.dataset.category || "all";
  const result = pins.filter(pin => {
    const categoryMatch = selected === "all" || pin.category === selected;
    const textMatch = !query || `${pin.title} ${pin.category} ${pin.text}`.toLowerCase().includes(query);
    return categoryMatch && textMatch;
  });
  render(result);
}

searchToggle.addEventListener("click", () => {
  searchWrap.classList.toggle("open");
  if (searchWrap.classList.contains("open")) searchInput.focus();
});

document.getElementById("chips").addEventListener("click", e => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("selected"));
  chip.classList.add("selected");
  filter();
});

searchInput.addEventListener("input", filter);

document.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

document.getElementById("saveBtn").addEventListener("click", () => {
  showToast(`Saved "${currentPin.title}"`);
});

document.getElementById("profileBtn").addEventListener("click", () => {
  showToast("Profile features are coming in the next version");
});

render();
