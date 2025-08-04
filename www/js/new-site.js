import { Api } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('site-form');
  const categorySelect = document.getElementById('category');
  const message = document.getElementById('message');

  // Cargar categorías en el <select>
  try {
    const categories = await Api.getCategories();

    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.id;
      option.textContent = cat.name;
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error loading categories:', error);
    message.textContent = 'Failed to load categories';
    message.style.color = 'red';
  }

  // Envío del formulario
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const site = {
      name: document.getElementById('name').value.trim(),
      url: document.getElementById('url').value.trim(),
      user: document.getElementById('user').value.trim(),
      password: document.getElementById('password').value.trim(),
      description: document.getElementById('description').value.trim(),
    };

    const categoryId = categorySelect.value;

    if (!categoryId) {
      message.textContent = 'Please select a category';
      message.style.color = 'red';
      return;
    }

    try {
      await Api.createSite(categoryId, site);
      message.textContent = 'Site created successfully!';
      message.style.color = 'green';
      form.reset();
    } catch (err) {
      console.error('Error creating site:', err);
      message.textContent = 'Error creating site';
      message.style.color = 'red';
    }
  });
});
