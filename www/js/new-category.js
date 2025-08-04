import { Api } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-category');
  const input = document.getElementById('name');
  const message = document.getElementById('message');

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
});
