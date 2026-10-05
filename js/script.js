// Navigation functionality
const navButtons = document.querySelectorAll('.nav-button');
const pages = document.querySelectorAll('.page');

navButtons.forEach(button => {
  button.addEventListener('click', () => {
    const pageId = button.getAttribute('data-page');
    
    // Remove active class from all buttons and pages
    navButtons.forEach(btn => btn.classList.remove('active'));
    pages.forEach(page => page.classList.remove('active'));
    
    // Add active class to clicked button and corresponding page
    button.classList.add('active');
    document.getElementById(pageId).classList.add('active');
  });
});

// Offices data - 19 kontorer
const offices = [
  { id: 1, name: 'Kontor 1', sqm: 10, available: false, tenant: 'RUDCON AS' },
  { id: 2, name: 'Kontor 2', sqm: 8, available: false, tenant: 'E-boiler Invent AS' },
  { id: 3, name: 'Kontor 3', sqm: 8, available: true, tenant: null },
  { id: 4, name: 'Kontor 4', sqm: 9, available: false, tenant: 'Konsmo Fabrikker AS' },
  { id: 5, name: 'Kontor 5', sqm: 8, available: false, tenant: 'Lister Advokatene AS' },
  { id: 6, name: 'Kontor 6', sqm: 9, available: false, tenant: 'Utleid privat' },
  { id: 7, name: 'Kontor 7', sqm: 9, available: true, tenant: null },
  { id: 8, name: 'Kontor 8', sqm: 7, available: true, tenant: null },
  { id: 9, name: 'Kontor 9', sqm: 8, available: true, tenant: null },
  { id: 10, name: 'Kontor 10', sqm: 11, available: true, tenant: null },
  { id: 11, name: 'Kontor 11', sqm: 7, available: true, tenant: null },
  { id: 12, name: 'Kontor 12', sqm: 10, available: true, tenant: null },
  { id: 13, name: 'Kontor 13', sqm: 5, available: true, tenant: null },
  { id: 14, name: 'Kontor 14', sqm: 7, available: true, tenant: null },
  { id: 15, name: 'Kontor 15', sqm: 13, available: false, tenant: 'Flekkefjord Begravelsesbyrå' },
  { id: 16, name: 'Kontor 16', sqm: 10, available: false, tenant: 'Flekkefjord Begravelsesbyrå' },
  { id: 17, name: 'Kontor 17', sqm: 12, available: false, tenant: 'Flekkefjord Begravelsesbyrå' },
  { id: 18, name: 'Kontor M1', sqm: null, available: null, tenant: null },
  { id: 19, name: 'Kontor M2', sqm: 7, available: false, tenant: 'Lister Advokatene AS' },
  { id: 20, name: 'Kontor M3', sqm: 7, available: true, tenant: null },
  { id: 21, name: 'Kontor M4', sqm: null, available: null, tenant: null }
];

function getOfficeImage(office) {
  const imageName = office.name.startsWith('Kontor M')
    ? `${office.name.slice(-2)}.jpg`
    : `K${office.id}.jpg`;
  return `images/${imageName}`;
}

// Render offices list
function renderOffices() {
  const officesList = document.getElementById('officesList');
  officesList.innerHTML = '';
  
  offices.forEach(office => {
    const officeCard = document.createElement('div');
    officeCard.className = 'office-card';
    officeCard.onclick = () => openOfficeModal(office);
    
    const statusClass = office.available === null
      ? 'status-unknown'
      : office.available ? 'status-available' : 'status-occupied';
    const statusText = office.available === null
      ? 'Ta kontakt'
      : office.available ? 'Ledig' : 'Opptatt';
    const tenantInfo = office.tenant ? `<p><strong>Leietaker:</strong> ${office.tenant}</p>` : '';
    const sizeText = office.sqm === null ? 'Ikke oppgitt' : `${office.sqm} kvm`;
    
    officeCard.innerHTML = `
      <h3>${office.name}</h3>
      <div class="office-info">
        <p><strong>Kvadrat:</strong> ${sizeText}</p>
        ${tenantInfo}
        <div class="office-status ${statusClass}">${statusText}</div>
      </div>
    `;

    const officeImage = document.createElement('img');
    officeImage.className = 'office-card-image';
    officeImage.src = getOfficeImage(office);
    officeImage.alt = `Bilde av ${office.name}`;
    officeImage.loading = 'lazy';
    officeImage.addEventListener('error', () => {
      const placeholder = document.createElement('div');
      placeholder.className = 'office-card-image office-image-missing';
      placeholder.textContent = 'Kontorbilde mangler';
      officeImage.replaceWith(placeholder);
    }, { once: true });
    officeCard.prepend(officeImage);
    
    officesList.appendChild(officeCard);
  });
}

// Modal functionality
const modal = document.getElementById('officeModal');
const closeBtn = document.querySelector('.close');

closeBtn.addEventListener('click', closeOfficeModal);

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeOfficeModal();
  }
});

function openOfficeModal(office) {
  document.getElementById('officeTitle').textContent = office.name;
  
  const detailsDiv = document.getElementById('officeDetails');
  const statusClass = office.available === null
    ? 'status-unknown'
    : office.available ? 'status-available' : 'status-occupied';
  const statusText = office.available === null
    ? 'Ta kontakt'
    : office.available ? 'Ledig' : 'Opptatt';
  const tenantInfo = office.tenant
    ? `<p><strong>Leietaker:</strong> ${office.tenant}</p>`
    : office.available === null
      ? '<p><strong>Tilgjengelighet:</strong> Ta kontakt</p>'
      : '<p><strong>Status:</strong> Ledig for leie</p>';
  const sizeText = office.sqm === null ? 'Ikke oppgitt' : `${office.sqm} kvm`;

  const imageContainer = document.getElementById('officeDetailImage');
  imageContainer.textContent = '';
  const officeImage = document.createElement('img');
  officeImage.className = 'office-detail-image';
  officeImage.src = getOfficeImage(office);
  officeImage.alt = `Bilde av ${office.name}`;
  officeImage.addEventListener('error', () => {
    imageContainer.textContent = 'Kontorbilde mangler';
  }, { once: true });
  imageContainer.appendChild(officeImage);
  
  detailsDiv.innerHTML = `
    <p><strong>Størrelse:</strong> ${sizeText}</p>
    ${tenantInfo}
    <div class="office-status ${statusClass}">${statusText}</div>
    <p><em>Alle kontorer inkluderer: hev/senk pult, kontorstol, internett, strøm og rengjøring</em></p>
  `;
  
  modal.classList.add('show');
}

function closeOfficeModal() {
  modal.classList.remove('show');
}

// Map initialization for Google Maps API
function initMap() {
  const tolvegaarden = { lat: 58.297, lng: 6.649 };
  const map = new google.maps.Map(document.getElementById('map'), {
    center: tolvegaarden,
    zoom: 15,
    mapTypeId: 'roadmap'
  });

  new google.maps.Marker({
    position: tolvegaarden,
    map,
    title: 'Tolvegården kontorfellesskap'
  });
}

// Initialize offices list when page loads
document.addEventListener('DOMContentLoaded', renderOffices);
