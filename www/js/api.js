export class Api {
    static URL = 'http://localhost:3000';
   
    // CATEGORÍAS
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

    static async deleteCategory(id) {
        const response = await fetch(`${this.URL}/categories/${id}`, {
          method: 'DELETE',
        });
      
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Error al eliminar la categoría.');
        }
      
        return true;
      }
    
    // SITIOS
    static async getSites() {
        const response = await fetch(`${this.URL}/sites`);
      
        if (!response.ok) {
          throw new Error('Error al recuperar los sitios.');
        }
      
        return await response.json();
      }
   
      static async getSitesByCategory(categoryId) {
        const response = await fetch(`${this.URL}/categories/${categoryId}/sites`);
      
        if (!response.ok) {
          throw new Error('Error al recuperar los sitios de la categoría.');
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
          const errorText = await response.text().catch(() => '');
          throw new Error(errorText || 'Error al crear el sitio.');
        }
      
        return await response.json();
      }

    static async deleteSite(categoryId, siteId) {
        const response = await fetch(`${this.URL}/categories/${categoryId}/sites/${siteId}`, {
          method: 'DELETE',
        });
      
        if (!response.ok) {
          const errorText = await response.text().catch(() => '');
          throw new Error(errorText || 'Error al eliminar el sitio.');
        }
      
        return true;
      }
      
  }
  