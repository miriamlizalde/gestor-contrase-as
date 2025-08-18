export class Api {
    static URL = 'http://localhost:3000';
    static async getCategories() {
      const response = await fetch(`${this.URL}/categories`);
      
      if (!response.ok) {
        throw new Error('No se han podido recuperar las categorías');
      }
  
      return await response.json();
    }
    static async createCategory(name) {
      const response = await fetch(`${this.URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name })
      });
  
      if (!response.ok) {
        throw new Error('No se ha podido crear la categoría');
      }
  
      return await response.json();
    }

    static async createSite(categoryId, siteData) {
        const response = await fetch(`${this.URL}/categories/${categoryId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(siteData),
        });
      
        if (!response.ok) {
          throw new Error('Failed to create site');
        }
      
        return await response.json();
      }
      
  }
  