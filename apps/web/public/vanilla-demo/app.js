const form = document.getElementById("newsForm");
const titleEl = document.getElementById("title");
const descEl = document.getElementById("description");
const coverEl = document.getElementById("cover");
const countEl = document.getElementById("count");
const msgEl = document.getElementById("msg");
const draftsEl = document.getElementById("drafts");
const errTitle = document.getElementById("errTitle");
const errCover = document.getElementById("errCover");

const KEY = "films.vanillaDrafts.v1";

function loadDrafts() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
}
function saveDrafts(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}
function renderDrafts() {
  const list = loadDrafts();
  draftsEl.innerHTML = "";
  if (!list.length) {
    const li = document.createElement("li");
    li.textContent = "Поки немає чернеток.";
    draftsEl.appendChild(li);
    return;
  }
  list.forEach((d) => {
    const li = document.createElement("li");
    const t = document.createElement("strong");
    t.textContent = d.title + " ";
    const s = document.createElement("span");
    s.textContent = "— " + new Date(d.ts).toLocaleString("uk-UA");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Видалити";
    btn.style.marginTop = "8px";
    btn.addEventListener("click", () => {
      const next = loadDrafts().filter(x => x.id !== d.id);
      saveDrafts(next);
      renderDrafts();
    });

    li.appendChild(t);
    li.appendChild(s);
    li.appendChild(document.createElement("br"));
    if (d.description) {
      const p = document.createElement("div");
      p.textContent = d.description;
      li.appendChild(p);
    }
    li.appendChild(btn);
    draftsEl.appendChild(li);
  });
}

function setMsg(text) { msgEl.textContent = text; }

descEl.addEventListener("input", () => {
  countEl.textContent = String(descEl.value.length);
});

function validate() {
  errTitle.textContent = "";
  errCover.textContent = "";
  let ok = true;

  const title = titleEl.value.trim();
  if (title.length < 3) {
    errTitle.textContent = "Заголовок має містити щонайменше 3 символи.";
    ok = false;
  }

  const file = coverEl.files && coverEl.files[0];
  if (file) {
    const okType = ["image/jpeg", "image/png"].includes(file.type);
    if (!okType) { errCover.textContent = "Дозволено лише JPG/PNG."; ok = false; }
    const max = 2 * 1024 * 1024;
    if (file.size > max) { errCover.textContent = "Файл завеликий (макс. 2MB)."; ok = false; }
  }

  return ok;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  setMsg("");

  if (!validate()) {
    setMsg("Будь ласка, виправ помилки у формі.");
    return;
  }

  const list = loadDrafts();
  list.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    ts: Date.now(),
    title: titleEl.value.trim(),
    description: descEl.value.trim()
  });
  saveDrafts(list.slice(0, 20));

  form.reset();
  countEl.textContent = "0";
  setMsg("Чернетку збережено локально (localStorage).");
  renderDrafts();
});

renderDrafts();
