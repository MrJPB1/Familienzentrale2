function enableCalendarInteractions() {
  let draggedEventId = null;

  document.querySelectorAll('.event').forEach(eventEl => {
    eventEl.setAttribute('draggable', 'true');

    eventEl.addEventListener('dragstart', event => {
      draggedEventId = eventEl.dataset.eventId;
      eventEl.classList.add('dragging');
      event.dataTransfer.setData('text/plain', draggedEventId);
    });

    eventEl.addEventListener('dragend', () => {
      eventEl.classList.remove('dragging');
      document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('drop-target'));
    });
  });

  document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('dragover', event => {
      event.preventDefault();
      cell.classList.add('drop-target');
    });

    cell.addEventListener('dragleave', () => {
      cell.classList.remove('drop-target');
    });

    cell.addEventListener('drop', event => {
      event.preventDefault();
      cell.classList.remove('drop-target');

      const id = event.dataTransfer.getData('text/plain') || draggedEventId;
      const day = Number(cell.dataset.day);
      const row = Number(cell.dataset.row);

      moveCalendarEvent(id, day, row);
    });
  });
}

function moveCalendarEvent(id, day, row) {
  const calendarEvent = data.events.find(event => event.id === id);
  if (!calendarEvent) return;

  calendarEvent.day = day;
  calendarEvent.row = row;

  saveData();
  renderDashboard();
}

function editCalendarEvent(id) {
  const calendarEvent = data.events.find(event => event.id === id);
  if (!calendarEvent) return;

  setDialog('Termin bearbeiten', `
    <div class="panel">
      <div class="form-row">
        <input id="editEventTitle" value="${escapeHtml(calendarEvent.title)}" />
        <input id="editEventTime" value="${escapeHtml(calendarEvent.time)}" />
        <button class="action-btn" onclick="saveCalendarEvent('${calendarEvent.id}')">Speichern</button>
      </div>
      <div class="form-row">
        <select id="editEventPerson">${options(calendarEvent.person)}</select>
        <select id="editEventDay">
          <option value="1" ${calendarEvent.day === 1 ? 'selected' : ''}>Montag</option>
          <option value="2" ${calendarEvent.day === 2 ? 'selected' : ''}>Dienstag</option>
          <option value="3" ${calendarEvent.day === 3 ? 'selected' : ''}>Mittwoch</option>
          <option value="4" ${calendarEvent.day === 4 ? 'selected' : ''}>Donnerstag</option>
          <option value="5" ${calendarEvent.day === 5 ? 'selected' : ''}>Freitag</option>
        </select>
        <select id="editEventColor">
          <option value="#f8dfb8" ${calendarEvent.color === '#f8dfb8' ? 'selected' : ''}>Creme</option>
          <option value="#f6b5b2" ${calendarEvent.color === '#f6b5b2' ? 'selected' : ''}>Rosa</option>
          <option value="#a8dedc" ${calendarEvent.color === '#a8dedc' ? 'selected' : ''}>Türkis</option>
          <option value="#9691e8" ${calendarEvent.color === '#9691e8' ? 'selected' : ''}>Violett</option>
          <option value="#bfe8c7" ${calendarEvent.color === '#bfe8c7' ? 'selected' : ''}>Grün</option>
        </select>
      </div>
      <div class="form-row">
        <input id="editEventRow" type="number" min="1" max="12" value="${calendarEvent.row}" />
        <input id="editEventSpan" type="number" min="0.5" max="8" step="0.5" value="${calendarEvent.span}" />
        <button class="danger-btn" onclick="deleteCalendarEvent('${calendarEvent.id}')">Löschen</button>
      </div>
    </div>
  `);
}

function saveCalendarEvent(id) {
  const calendarEvent = data.events.find(event => event.id === id);
  if (!calendarEvent) return;

  calendarEvent.title = document.getElementById('editEventTitle').value.trim() || calendarEvent.title;
  calendarEvent.time = document.getElementById('editEventTime').value.trim();
  calendarEvent.person = document.getElementById('editEventPerson').value;
  calendarEvent.day = Number(document.getElementById('editEventDay').value);
  calendarEvent.color = document.getElementById('editEventColor').value;
  calendarEvent.row = Number(document.getElementById('editEventRow').value);
  calendarEvent.span = Number(document.getElementById('editEventSpan').value);

  saveData();
  closeModule();
  renderDashboard();
}

function deleteCalendarEvent(id) {
  if (!confirm('Termin wirklich löschen?')) return;
  data.events = data.events.filter(event => event.id !== id);
  saveData();
  closeModule();
  renderDashboard();
}
