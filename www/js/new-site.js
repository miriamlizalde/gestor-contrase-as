import { Api } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('site-form');
  const categorySelect = document.getElementById('category');
  const message = document.getElementById('message');
  const password = document.getElementById('password');
  const generateBtn = document.getElementById('generatePass');
  const copyBtn = document.getElementById('copyPass');
  const siteList = document.getElementById('site-list');
  const categoryById = {}

  const paintMessage = (text, type='success') => {
    message.className = `mt-3 alert alert-${type}`;
    message.textContent = text;
  };

  const renderSites = (sites = []) => {
    siteList.innerHTML = '';
    if (!sites.length) {
      const li = document.createElement('li');
      li.className = 'list-group-item text-muted';
      li.textContent = 'No hay sitios';
      siteList.appendChild(li);
      return;
    }

    sites.forEach(site => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      const catName = categoryById[site.categoryId] || 'Sin categoría';
      li.innerHTML = `
        <span>
          <strong>${site.name}</strong>
          <small class="text-muted">(${site.url || 'sin url'})</small>
          — Usuario: ${site.user || '-'}
          - <em>Categoría: ${catName}</em>
        </span>
          <button type="button" class="btn btn-danger delete-site btn-sm" data-id="${site.id}">Eliminar</button>
      `;

      li.querySelector('.delete-site').addEventListener('click', async () => {
        try {
          await Api.deleteSite(site.id);
          paintMessage('Sitio eliminado correctamente', 'success');
          await loadSites();
        } catch (error) {
          console.error('Error al eliminar el sitio:', error);
          paintMessage('Error al eliminar el sitio', 'danger');
        }
      });

      siteList.appendChild(li);
    });
  };    

  const loadSites = async () => {
    try {
      if (categorySelect.value) {
      const sites = await Api.getSitesByCategory(categorySelect.value);
      renderSites(sites);
      } else {
        const sites = await Api.getSites();
        renderSites(sites);
      }
    } catch (error) {
      console.error('Error al cargar los sitios:', error);
      paintMessage('Error al cargar sitios', 'danger');
    }
  };

  const loadCategories = async () => {
    try {
      const categories = await Api.getCategories();
      categorySelect.innerHTML = '<option value="">Elige una categoría</option>';
      categories.forEach(cat => {
        categoryById[cat.id] = cat.name; 
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
        categorySelect.appendChild(option);
      });
    } catch (error) {
      console.error('Error al cargar las categorías:', error);
      paintMessage('Error al cargar categorías', 'danger');
    }
  };

  // Creación de sitios
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const site = {
      name: document.getElementById('name').value.trim(),
      url: document.getElementById('url').value.trim(),
      user: document.getElementById('user').value.trim(),
      password: password.value.trim(),
      description: document.getElementById('description').value.trim(),
    };
    const categoryId = categorySelect.value;
    if (!categoryId) return paintMessage('Por favor, elija una categoría.', 'danger');
   
    try {
      await Api.createSite(categoryId, site);
      paintMessage('Se ha creado correctamente', 'success');
      form.reset();
      await loadSites();
    } catch (error) {
      console.log('Error al crear el sitio:', error);
      paintMessage('Error al crear el sitio', 'danger');
    }
  });

  //Generación de contraseña
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "@#$%^&*()_+~|}{[]></-=";
  const allChars = upperCase + lowerCase + numbers + symbols;

  function passGenerate(length = 8) {
    let password = '';
    for (let i = 0; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    return password;
  }

  generateBtn?.addEventListener('click', () => {
    password.value = passGenerate(8);
    password.style.border = '';
  });

  copyBtn?.addEventListener('click', () => {
    navigator.clipboard.writeText(password.value)
      .then(() => { 
      paintMessage('Contraseña copiada', 'primary');
    })
    .catch(error => {
      console.error('Error al copiar la contraseña:', error);
      paintMessage('No se pudo copiar la contraseña', 'danger');
    });
  });

  // Validación de contraseña con blur
  password.addEventListener('blur', () => {
    if (password.value.length < 8) {
      password.style.border = '2px solid red';
      paintMessage('La contraseña debe de tener al menos 8 caracteres.', 'danger');
    } else {
      password.style.border = '';
      paintMessage('Contraseña válida', 'success');
    }
  });

  await loadCategories();
  await loadSites();
});
