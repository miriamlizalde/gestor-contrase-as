import { Api } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-category');
  const input = document.getElementById('name');
  const message = document.getElementById('message');
  const list = document.getElementById('category-list');

  const paintMessage = (text, type = 'success') => {
    message.textContent = text;
    message.className = `mt-3 alert alert-${type}`;
  };  

  const renderCategories = (categories) => {
    list.innerHTML = '';
    if (!categories.length) {
      const li = document.createElement('li');
      li.className = 'list-group-item text-muted';
      li.textContent = 'No hay categorías';
      list.appendChild(li);
      return;
    }

    categories.forEach(cat => {
      const li = document.createElement('li');
      li.textContent = cat.name;
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Eliminar';
      deleteBtn.className = 'btn btn-danger btn-sm';
      deleteBtn.addEventListener('click', () => deleteCategory(cat.id));
      
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  };

  const loadCategories = async () => {
    try {
      const cats = await Api.getCategories();
      renderCategories(cats);
    } catch (error) {
      console.log('Error al cargar categorías',error);
      paintMessage('No se pudieron cargar las categorías', 'danger');
    }
  };

  const deleteCategory = async (id) => {
    try {
      await Api.deleteCategory(id);
      paintMessage('Categoría eliminada', 'success');
      await loadCategories();
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      paintMessage('Error al eliminar la categoría', 'danger');
    }
  };
  
  // Crear categoría
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = input.value.trim();

    if (!name) {
      paintMessage('Debes introducir un nombre','danger');
      return;
    }

    try {
      await Api.createCategory(name);
      paintMessage('Categoría añadida', 'success');
      form.reset();
      await loadCategories();
    } catch (error) {
      console.log('Error al añadir categoría:', error);
      paintMessage('Error al guardar la categoría', 'danger');
    }
  });

  loadCategories();
});
