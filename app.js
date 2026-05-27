const STORE_KEY = 'familienKommandozentrale.v4.accounts';

const defaultData = {
  family: [
    { id: crypto.randomUUID(), name: 'Papa', role: 'Eltern', color: '#37d6a0', emoji: '👨‍🦱', initial: 'P', photo: '', pin: '1234', permissions: ['admin','calendar','chores','shopping','meals'] },
    { id: crypto.randomUUID(), name: 'Mama', role: 'Eltern', color: '#f7a6c9', emoji: '👩', initial: 'M', photo: '', pin: '1234', permissions: ['admin','calendar','chores','shopping','meals'] },
    { id: crypto.randomUUID(), name: 'Kind 1', role: 'Kind', color: '#94c9ff', emoji: '👦', initial: 'N', photo: '', pin: '', permissions: ['chores','points','meals'] },
    { id: crypto.randomUUID(), name: 'Kind 2', role: 'Kind', color: '#f3c45b', emoji: '👧', initial: 'K', photo: '', permissions: ['chores','points','meals'] }
  ],
  events: [
    { id: crypto.randomUUID(), title: 'Geburtstag 🎉', time: '06:00', day: 1, row: 1, span: .5, person: 'Papa', color: '#9890e8', icon: '🎉' },
    { id: crypto.randomUUID(), title: 'Ballettunterricht', time: '06:30 - 09:00', day: 1, row: 2, span: 2, person: 'Kind 2', color: '#f8dfb8', icon: '🩰' },
    { id: crypto.randomUUID(), title: 'Zahnarzt 🦷', time: '10:30 - 12:15', day: 1, row: 5, span: 1.2, person: 'Kind 2', color: '#bfe8c7', icon: '🦷' },
    { id: crypto.randomUUID(), title: 'Schulaufgaben ✍️', time: '13:00 - 14:40', day: 1, row: 7, span: 1.25, person: 'Kind 1', color: '#a8dedc', icon: '✍️' },
    { id: crypto.randomUUID(), title: 'Yoga-Kurs', time: '07:00 - 11:00', day: 2, row: 3, span: 2.7, person: 'Mama', color: '#f6b5b2', icon: '🧘' }
  ],
  chores: [
    { id: crypto.randomUUID(), title: 'Zähne putzen', person: 'Kind 1', points: 1, done: false, icon: '🪥' },
    { id: crypto.randomUUID(), title: 'Zimmer aufräumen', person: 'Kind 2', points: 2, done: false, icon: '🧸' },
    { id: crypto.randomUUID(), title: 'Tisch decken', person: 'Kind 1', points: 1, done: false, icon: '🍽️' }
  ],
  points: {},
  meals: [
    { day: 'Montag', meal: 'Nudeln mit Tomatensoße', icon: '🍝' },
    { day: 'Dienstag', meal: 'Pfannkuchen', icon: '🥞' },
    { day: 'Mittwoch', meal: 'Gemüse & Reis', icon: '🍚' }
  ],
  shopping: [
    { id: crypto.randomUUID(), title: 'Milch', done: false },
    { id: crypto.randomUUID(), title: 'Äpfel', done: false },
    { id: crypto.randomUUID(), title: 'Brot', done: false }
  ],
  settings: {
    frameMinutes: 5,
    parentPin: '1234',
    familyName: 'Familie Becker',
    kioskMode: true,
    allowChildShoppingAdd: true,
    allowChildChoreDone: true
  }
};

let data = loadData();
let idleTimer;
let frameIndex = 0;

function loadData() {
  const raw = localStorage.getItem(STORE_KEY);
  if (!raw) return structuredClone(defaultData);
  try { return { ...structuredClone(defaultData), ...JSON.parse(raw) }; }
  catch { return structuredClone(defaultData); }
}

function saveData() {
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
  renderAvatars();
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}

function byPerson(name) {
  return data.family.find(f => f.name === name) || { color: '#e5e7eb', emoji: '👤', initial: '?' };
}

function options(selected='') {
  return data.family.map(p => `<option ${p.name===selected?'selected':''}>${escapeHtml(p.name)}</option>`).join('');
}

function setActiveNav(label) {
  document.querySelectorAll('.nav').forEach(b => b.classList.remove('active'));
  const map = { calendar:0, school:1, chores:2, points:3, meals:4, shopping:5, accounts:6, parents:7 };
  const idx = map[label];
  if (idx !== undefined) document.querySelectorAll('.nav')[idx].classList.add('active');
}

function updateClock() {
  document.getElementById('clock').textContent = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  const familyTitle = document.getElementById('familyTitle');
  if (familyTitle) familyTitle.textContent = data.settings.familyName || 'Familie';
}

setInterval(updateClock, 1000);
updateClock();

function renderAvatars() {
  document.getElementById('familyAvatars').innerHTML =
    data.family.map(p => `<div class="avatar" style="--color:${p.color}" title="${escapeHtml(p.name)}">${p.photo ? `<img src="${p.photo}" alt="${escapeHtml(p.name)}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">` : p.emoji}</div>`).join('') +
    `<button class="gear" onclick="openModule('parents')">⚙️</button>`;
}

function renderDashboard() {
  setActiveNav('calendar');
  const days = ['Mo, 15.', 'Di, 16.', 'Mi, 17.', 'Do, 18.', 'Fr, 19.'];
  let html = `<section class="week"><div class="corner"></div>`;
  days.forEach((d, i) => html += `<div class="day-head ${i===0?'today':''}" style="grid-column:${i+2};grid-row:1"><span>${d.split(' ')[1]?.replace('.','') || ''}</span> ${d.split(',')[0]}, <span class="plus">＋</span></div>`);
  for (let r=0; r<12; r++) {
    html += `<div class="time" style="grid-column:1;grid-row:${r+2}">${r+6}</div>`;
    for (let c=0; c<5; c++) html += `<div class="cell" style="grid-column:${c+2};grid-row:${r+2}"></div>`;
  }
  html += `<div class="now-line"></div>`;
  data.events.forEach(e => {
    const left = `calc(70px + (100% - 70px) / 5 * ${e.day - 1} + 8px)`;
    const top = `calc(54px + 56px * ${e.row - 1} + 8px)`;
    const width = `calc((100% - 70px) / 5 - 16px)`;
    const height = `${Math.max(34, e.span * 56 - 12)}px`;
    const p = byPerson(e.person);
    html += `<div class="event" onclick="openModule('calendar')" style="left:${left};top:${top};width:${width};height:${height};background:${e.color};"><strong>${escapeHtml(e.title)}</strong><small>${escapeHtml(e.time)}</small><span class="tag">${escapeHtml(p.initial || '?')}</span></div>`;
  });
  html += `</section>`;
  document.getElementById('content').innerHTML = html;
}

function openModule(key) {
  const modules = {
    calendar: () => { setActiveNav('calendar'); renderCalendar(); },
    school: () => { setActiveNav('school'); renderSchool(); },
    chores: () => { setActiveNav('chores'); renderChores(); },
    points: () => { setActiveNav('points'); renderPoints(); },
    meals: () => { setActiveNav('meals'); renderMeals(); },
    shopping: () => { setActiveNav('shopping'); renderShopping(); },
    accounts: () => { setActiveNav('accounts'); renderAccounts(); },
    parents: () => { setActiveNav('parents'); renderParentLogin(); },
    quickAdd: renderQuickAdd
  };
  modules[key]();
}

function closeModule() { document.getElementById('moduleDialog').close(); }
function setDialog(title, html) {
  document.getElementById('dialogTitle').textContent = title;
  document.getElementById('dialogContent').innerHTML = html;
  document.getElementById('moduleDialog').showModal();
}

function renderCalendar() {
  setDialog('Kalender-Termin hinzufügen', `<div class="panel"><div class="form-row"><input id="eventTitle" placeholder="Termin" /><input id="eventTime" placeholder="Zeit" /><button class="action-btn" onclick="addEvent()">Speichern</button></div><div class="form-row"><select id="eventPerson">${options()}</select><select id="eventDay"><option value="1">Montag</option><option value="2">Dienstag</option><option value="3">Mittwoch</option><option value="4">Donnerstag</option><option value="5">Freitag</option></select><select id="eventColor"><option value="#f8dfb8">Creme</option><option value="#f6b5b2">Rosa</option><option value="#a8dedc">Türkis</option><option value="#9691e8">Violett</option></select></div></div>`);
}

function addEvent() {
  const title = document.getElementById('eventTitle').value.trim();
  if (!title) return;
  data.events.push({ id: crypto.randomUUID(), title, time: document.getElementById('eventTime').value, day: Number(document.getElementById('eventDay').value), row: 5, span: 1.5, person: document.getElementById('eventPerson').value, color: document.getElementById('eventColor').value, icon: '📌' });
  saveData(); renderDashboard(); closeModule();
}

function renderSchool() {
  document.getElementById('content').innerHTML = `<div class="panel-grid"><div class="panel"><h2>🎓 Schule</h2><div class="item">📚 Hausaufgaben lesen</div><div class="item">✍️ Mathe üben</div><div class="item">🎒 Ranzen packen</div></div><div class="panel"><h2>Heute wichtig</h2><p class="pill">Sportzeug</p><p class="pill">Unterschrift</p><p class="pill">Brotdose</p></div></div>`;
}

function renderChores() {
  document.getElementById('content').innerHTML = `<div class="panel-grid"><div class="panel"><h2>✅ Aufgaben</h2>${data.chores.map(c => { const p = byPerson(c.person); return `<div class="item ${c.done?'done':''}"><div class="item-left"><span class="dot" style="background:${p.color}"></span><button class="big-check" onclick="toggleChore('${c.id}')">${c.done?'✓':'○'}</button>${c.icon} ${escapeHtml(c.title)} <span class="pill">${escapeHtml(c.person)}</span><span class="pill">⭐ ${c.points}</span></div></div>`; }).join('')}</div><div class="panel"><h2>Neue Aufgabe</h2><div class="form-row"><input id="choreTitle" placeholder="Aufgabe" /><select id="chorePerson">${options()}</select><button class="action-btn" onclick="addChore()">Speichern</button></div></div></div>`;
}

function addChore() {
  const title = document.getElementById('choreTitle').value.trim();
  if (!title) return;
  data.chores.push({ id: crypto.randomUUID(), title, person: document.getElementById('chorePerson').value, points: 1, done: false, icon: '✅' });
  saveData(); renderChores();
}

function toggleChore(id) {
  const c = data.chores.find(x => x.id === id);
  if (!c) return;
  c.done = !c.done;
  if (c.done) data.points[c.person] = (data.points[c.person] || 0) + c.points;
  saveData(); renderChores();
}

function renderPoints() {
  document.getElementById('content').innerHTML = `<div class="panel-grid">${data.family.map(p => `<div class="panel"><h2><span class="dot" style="background:${p.color};display:inline-block;vertical-align:middle"></span> ${p.emoji} ${escapeHtml(p.name)}</h2><p style="font-size:4rem;font-weight:900;margin:0">⭐ ${data.points[p.name] || 0}</p><button class="action-btn" onclick="addPoint('${escapeHtml(p.name)}')">+1 Stern</button></div>`).join('')}</div>`;
}
function addPoint(name) { data.points[name] = (data.points[name] || 0) + 1; saveData(); renderPoints(); }

function renderMeals() {
  document.getElementById('content').innerHTML = `<div class="panel-grid"><div class="panel"><h2>🍽️ Essensplan</h2>${data.meals.map(m => `<div class="item"><div>${m.icon} <strong>${escapeHtml(m.day)}</strong>: ${escapeHtml(m.meal)}</div></div>`).join('')}</div></div>`;
}

function renderShopping() {
  document.getElementById('content').innerHTML = `<div class="panel-grid"><div class="panel"><h2>🛒 Einkaufsliste</h2>${data.shopping.map(s => `<div class="item ${s.done?'done':''}"><div class="item-left"><button class="big-check" onclick="toggleShop('${s.id}')">${s.done?'✓':'○'}</button>${escapeHtml(s.title)}</div></div>`).join('')}</div><div class="panel"><h2>Artikel hinzufügen</h2><div class="form-row single"><input id="shopTitle" placeholder="z. B. Bananen" /><button class="action-btn" onclick="addShop()">Speichern</button></div></div></div>`;
}
function addShop() { const title = document.getElementById('shopTitle').value.trim(); if (!title) return; data.shopping.push({ id: crypto.randomUUID(), title, done: false }); saveData(); renderShopping(); }
function toggleShop(id) { const s = data.shopping.find(x => x.id === id); if (s) s.done = !s.done; saveData(); renderShopping(); }

function profilePhotoHtml(p) { return p.photo ? `<img class="profile-photo" style="--profile-color:${p.color}" src="${p.photo}" alt="${escapeHtml(p.name)}">` : `<div class="profile-photo" style="--profile-color:${p.color}">${p.emoji || '😊'}</div>`; }
function renderAccounts() { document.getElementById('content').innerHTML = `<div class="panel-grid"><div class="panel"><h2>👤 Familien-Accounts</h2>${data.family.map(p => `<div class="profile-card" style="--profile-color:${p.color}">${profilePhotoHtml(p)}<div class="profile-meta"><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.role || 'Kind')}</p></div><button class="action-btn" onclick="editProfile('${p.id}')">Bearbeiten</button></div>`).join('')}</div></div>`; }
function editProfile(id) { const p = data.family.find(x => x.id === id); if (!p) return; setDialog(`Profil bearbeiten: ${p.name}`, `<div class="panel"><div class="profile-card">${profilePhotoHtml(p)}<div class="profile-meta"><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.role || 'Kind')}</p></div></div><div class="form-row"><input id="editName" value="${escapeHtml(p.name)}" /><input id="editColor" type="color" value="${p.color}" /><button class="action-btn" onclick="saveProfile('${p.id}')">Speichern</button></div><div class="parent-box"><h3>Profilfoto</h3><input id="editPhoto" type="file" accept="image/*" onchange="previewPhoto('${p.id}', this)" /></div></div>`); }
function previewPhoto(id, input) { const file = input.files && input.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { const p = data.family.find(x => x.id === id); if (!p) return; p.photo = reader.result; saveData(); editProfile(id); }; reader.readAsDataURL(file); }
function saveProfile(id) { const p = data.family.find(x => x.id === id); if (!p) return; p.name = document.getElementById('editName').value.trim() || p.name; p.color = document.getElementById('editColor').value; p.initial = p.name[0].toUpperCase(); saveData(); closeModule(); renderAccounts(); }

function renderParentLogin() { setDialog('🔐 Elternmenü', `<div class="panel"><h3>PIN eingeben</h3><div class="form-row single"><input id="parentPinInput" type="password" inputmode="numeric" placeholder="Eltern-PIN" /><button class="action-btn" onclick="checkParentPin()">Öffnen</button></div><p class="small-note">Demo-PIN: 1234</p></div>`); }
function checkParentPin() { const pin = document.getElementById('parentPinInput').value; if (pin !== data.settings.parentPin) { alert('PIN stimmt nicht.'); return; } renderParents(); }
function renderParents() { setDialog('🔐 Elternmenü & Konfiguration', `<div class="panel-grid" style="padding:0"><div class="panel"><h3>Familie</h3><div class="form-row single"><input id="familyNameInput" value="${escapeHtml(data.settings.familyName || '')}" /><button class="action-btn" onclick="saveSettings()">Speichern</button></div></div><div class="panel"><h3>Daten</h3><button class="action-btn" onclick="exportData()">Daten exportieren</button><button class="danger-btn" onclick="resetData()">Demo-Daten zurücksetzen</button></div></div>`); }
function saveSettings() { const fam = document.getElementById('familyNameInput'); if (fam) data.settings.familyName = fam.value.trim() || 'Familie'; saveData(); updateClock(); alert('Einstellungen gespeichert.'); }
function exportData() { const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'}); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'familien-zentrale-konfiguration.json'; a.click(); }
function resetData() { if (!confirm('Wirklich alle lokalen Daten zurücksetzen?')) return; localStorage.removeItem(STORE_KEY); data = loadData(); saveData(); closeModule(); renderDashboard(); }
function renderQuickAdd() { setDialog('Schnell hinzufügen', `<div class="panel-grid" style="padding:0"><button class="panel" onclick="closeModule();openModule('calendar')"><h2>📅 Termin</h2></button><button class="panel" onclick="closeModule();openModule('chores')"><h2>✅ Aufgabe</h2></button><button class="panel" onclick="closeModule();openModule('shopping')"><h2>🛒 Einkauf</h2></button><button class="panel" onclick="startFrameMode()"><h2>🖼️ Bilderrahmen</h2></button></div>`); }
function startFrameMode() { closeModule(); const slides = [['🌈','Familienzeit'],['⭐','Du bist großartig!'],['🍝','Heute wird lecker'],['🏡','Willkommen zuhause']]; const s = slides[frameIndex++ % slides.length]; document.getElementById('frameEmoji').textContent = s[0]; document.getElementById('frameText').textContent = s[1]; document.getElementById('frameMode').classList.remove('hidden'); }
function stopFrameMode() { document.getElementById('frameMode').classList.add('hidden'); }
function resetIdleTimer() { clearTimeout(idleTimer); idleTimer = setTimeout(startFrameMode, (data.settings.frameMinutes || 5) * 60 * 1000); }
['click','touchstart','mousemove','keydown'].forEach(evt => window.addEventListener(evt, resetIdleTimer));
renderAvatars();
renderDashboard();
resetIdleTimer();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js').catch(() => {});
