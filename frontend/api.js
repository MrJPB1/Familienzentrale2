const API = {
  async request(path, options = {}) {
    try {
      const response = await fetch(`/api${path}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(`API Fehler ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API nicht erreichbar, Fallback aktiv:', error.message);
      return null;
    }
  },

  async getFamily() {
    return this.request('/family');
  },

  async addFamily(member) {
    return this.request('/family', {
      method: 'POST',
      body: JSON.stringify(member)
    });
  },

  async getEvents() {
    return this.request('/events');
  },

  async addEvent(event) {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify(event)
    });
  },

  async getChores() {
    return this.request('/chores');
  },

  async addChore(chore) {
    return this.request('/chores', {
      method: 'POST',
      body: JSON.stringify(chore)
    });
  },

  async getShopping() {
    return this.request('/shopping');
  },

  async addShopping(item) {
    return this.request('/shopping', {
      method: 'POST',
      body: JSON.stringify(item)
    });
  },

  async getMeals() {
    return this.request('/meals');
  },

  async addMeal(meal) {
    return this.request('/meals', {
      method: 'POST',
      body: JSON.stringify(meal)
    });
  },

  async getSettings() {
    return this.request('/settings');
  },

  async saveSetting(key, value) {
    return this.request(`/settings/${key}`, {
      method: 'PUT',
      body: JSON.stringify({ value })
    });
  }
};

window.API = API;
