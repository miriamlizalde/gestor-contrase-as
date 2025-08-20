import { Api } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('site-form');
  const categorySelect = document.getElementById('category');
  const message = document.getElementById('message');
<<<<<<< HEAD
||||||| parent of c824f42 (Funcionalidades añadidas: eliminar categoría y añadir site a una categoría)
  const password = document.getElementById('password');
  const generateBtn = document.getElementById('generatePass');
  const copyBtn = document.getElementById('copyPass');
=======
  const password = document.getElementById('password');
  const generateBtn = document.getElementById('generatePass');
  const copyBtn = document.getElementById('copyPass');
  const siteList = document.getElementById('site-list');
>>>>>>> c824f42 (Funcionalidades añadidas: eliminar categoría y añadir site a una categoría)

<<<<<<< HEAD
  // Cargar categorías en el <select>
  try {
    const categories = await Api.getCategories();

    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.id;
      option.textContent = cat.name;
      categorySelect.appendChild(option);
||||||| parent of c824f42 (Funcionalidades añadidas: eliminar categoría y añadir site a una categoría)
  try {
    const categories = await Api.getCategories();
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.id;
      option.textContent = cat.name;
      categorySelect.appendChild(option);
=======
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
      li.innerHTML = `
        <span>
          <strong>${site.name}</strong>
          <small class="text-muted">(${site.url || 'sin url'})</small>
          — Usuario: ${site.user || '-'}
        </span>
      `;
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Eliminar';
      deleteBtn.className = 'btn btn-danger btn-sm';
      deleteBtn.addEventListener('click', async () => {
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
>>>>>>> c824f42 (Funcionalidades añadidas: eliminar categoría y añadir site a una categoría)
    });
<<<<<<< HEAD
  } catch (error) {
    console.error('Error loading categories:', error);
    message.textContent = 'Failed to load categories';
    message.style.color = 'red';
  }
||||||| parent of c824f42 (Funcionalidades añadidas: eliminar categoría y añadir site a una categoría)
  } catch (error) {
    console.error('Error al cargar las categorías:', error);
    message.textContent = 'Error al cargar categorías';
    message.style.color = 'red';
  }
=======
  };    

  const loadSites = async () => {
    try {
      const sites = await Api.getSites();
      renderSites(sites);
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
>>>>>>> c824f42 (Funcionalidades añadidas: eliminar categoría y añadir site a una categoría)

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
<<<<<<< HEAD

    if (!categoryId) {
      message.textContent = 'Please select a category';
      message.style.color = 'red';
      return;
    }
||||||| parent of c824f42 (Funcionalidades añadidas: eliminar categoría y añadir site a una categoría)
    if (!categoryId) {
      message.textContent = 'Por favor, seleccione una categoría:';
      message.style.color = 'red';
      return;
    }
=======
    if (!categoryId) return paintMessage('Por favor, seleccione una categoría.', 'danger');
>>>>>>> c824f42 (Funcionalidades añadidas: eliminar categoría y añadir site a una categoría)

    try {
      await Api.createSite(categoryId, site);
<<<<<<< HEAD
      message.textContent = 'Site created successfully!';
      message.style.color = 'green';
||||||| parent of c824f42 (Funcionalidades añadidas: eliminar categoría y añadir site a una categoría)
      message.textContent = 'Se ha creado correctamente';
      message.style.color = 'green';
=======
      paintMessage('Se ha creado correctamente', 'success');
>>>>>>> c824f42 (Funcionalidades añadidas: eliminar categoría y añadir site a una categoría)
      form.reset();
<<<<<<< HEAD
    } catch (err) {
      console.error('Error creating site:', err);
      message.textContent = 'Error creating site';
      message.style.color = 'red';
||||||| parent of c824f42 (Funcionalidades añadidas: eliminar categoría y añadir site a una categoría)
    } catch (error) {
      console.error('Error al crear el sitio:', error);
      message.textContent = 'Error';
      message.style.color = 'red';
=======
      await loadSites();
    } catch (error) {
      console.error('Error al crear el sitio:', error);
      paintMessage('Error al crear el sitio', 'danger');
>>>>>>> c824f42 (Funcionalidades añadidas: eliminar categoría y añadir site a una categoría)
    }
  });
<<<<<<< HEAD
||||||| parent of c824f42 (Funcionalidades añadidas: eliminar categoría y añadir site a una categoría)

  //Generación de contraseña
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "@#$%^&*()_+~|}{[]></-=";
  const allChars = upperCase + lowerCase + numbers + symbols;

  function passGenerate(length = 8) {
    let password = '';
    for (let i = 0; i <= length; i++) {
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
      message.textContent = 'Contraseña copiada';
      message.style.color = 'blue';
    })
    .catch(error => {
      console.error('Error al copiar la contraseña:', error);
      message.textContent = 'No se pudo copiar la contraseña';
      message.style.color = 'red';
    });
  });

  // Validación con blur
  password.addEventListener('blur', () => {
    if (password.value.length < 8) {
      password.style.border = '2px solid red';
      message.textContent = 'La contraseña debe de tener al menos 8 caracteres.';
      message.style.color = 'red';
    } else {
      password.style.border = '';
      message.textContent = '';
    }
  });
=======

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
      message.textContent = '';
      message.className = 'mt-3 alert alert-success';
    }
  });

  await loadCategories();
  await loadSites();
>>>>>>> c824f42 (Funcionalidades añadidas: eliminar categoría y añadir site a una categoría)
});
