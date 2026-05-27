async function syncFromServer() {
  if (!window.API) return false;

  try {
    const response = await fetch('/api/sync');

    if (!response.ok) {
      throw new Error('Synchronisierung fehlgeschlagen');
    }

    const serverData = await response.json();

    window.familySyncData = serverData;

    console.log('Synchronisierung erfolgreich');

    return true;
  } catch (error) {
    console.warn('Server nicht erreichbar, Offline-Modus aktiv');
    return false;
  }
}

async function periodicSync() {
  await syncFromServer();

  setInterval(async () => {
    await syncFromServer();
  }, 30000);
}

window.syncFromServer = syncFromServer;
window.periodicSync = periodicSync;
