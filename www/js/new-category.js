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
    } catch (e) {
      console.error(e);
      paintMessage('No se pudieron cargar las categorías', 'danger');
    }
  };

  const deleteCategory = async (id) => {
    try {
      await Api.deleteCategory(id);
      paintMessage('Categoría eliminada', 'success');
      loadCategories();
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      paintMessage('Error al eliminar la categoría', 'danger');
    }
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = input.value.trim();

    if (!name) {
      message.textContent = 'Debes introducir un nombre.';
      message.style.color = 'red';
      return;
    }

    try {
      await Api.createCategory(name);
      message.textContent = 'Categoría añadida.';
      message.style.color = 'green';
      form.reset();
    } catch (error) {
      console.error('Error al añadir categoría:', error);
      message.textContent = 'Error al guardar la categoría';
      message.style.color = 'red';
    }
  });

  loadCategories();
});
