const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDatabase } = require('./database');

const familyRoutes = require('./routes/family');
const eventRoutes = require('./routes/events');
const choreRoutes = require('./routes/chores');
const shoppingRoutes = require('./routes/shopping');
const mealRoutes = require('./routes/meals');
const settingsRoutes = require('./routes/settings');
const syncRoutes = require('./routes/sync');
const displayRoutes = require('./routes/display');

const app = express();
const PORT = process.env.PORT || 3000;
const frontendDir = path.join(__dirname, '..');

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '0.4',
    service: 'familienzentrale-backend',
    mode: 'wall-display'
  });
});

app.use('/api/family', familyRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/chores', choreRoutes);
app.use('/api/shopping', shoppingRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/sync', syncRoutes);
app.use('/api/display', displayRoutes);

app.use('/', express.static(frontendDir));

app.use((req, res) => {
  res.status(404).json({ error: 'Nicht gefunden' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Interner Serverfehler' });
});

initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Familienzentrale v0.4 läuft auf Port ${PORT}`);
      console.log(`Zentrales Display: http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Datenbank konnte nicht initialisiert werden:', error);
    process.exit(1);
  });
