export class Api {
    static URL = 'http://localhost:3000';
   
    // CATEGORÍAS
    static async getCategories() {
      const response = await fetch(`${this.URL}/categories`);
      
      if (!response.ok) {
        throw new Error('The categories could not be recovered');
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
        throw new Error('The category could not be created');
      }
  
      return await response.json();
    }

    static async deleteCategory(id) {
        const response = await fetch(`${this.URL}/categories/${id}`, {
          method: 'DELETE',
        });
      
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Error deleting category.');
        }
      
        return true;
      }
    
    // SITIOS
    static async getSites() {
        const response = await fetch(`${this.URL}/sites`);
      
        if (!response.ok) {
          throw new Error('Error retrieving sites.');
        }
      
        return await response.json();
      }
   
      static async getSitesByCategory(categoryId) {
        const response = await fetch(`${this.URL}/sites?categoryId=${categoryId}`);
      
        if (!response.ok) {
          throw new Error('Error retrieving sites for the category.');
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
          throw new Error(errorText || 'Error creating site.');
        }
      
        return await response.json();
      }

    static async deleteSite(siteId) {
        const response = await fetch(`${this.URL}/sites/${siteId}`, {
          method: 'DELETE',
        });
      
        if (!response.ok) {
          const errorText = await response.text().catch(() => '');
          throw new Error(errorText || 'Error deleting site.');
        }
      
        return true;
      }
      
  }
  