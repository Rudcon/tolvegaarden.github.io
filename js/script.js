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
  { id: 2, name: 'Kontor 2', sqm: 10, available: false, tenant: 'Fred Ingolf Strømland' },
  { id: 3, name: 'Kontor 3', sqm: 10, available: true, tenant: null },
  { id: 4, name: 'Kontor 4', sqm: 12, available: false, tenant: 'StartUp Inc' },
  { id: 5, name: 'Kontor 5', sqm: 10, available: true, tenant: null },
  { id: 6, name: 'Kontor 6', sqm: 15, available: false, tenant: 'Konsult Ltd' },
  { id: 7, name: 'Kontor 7', sqm: 10, available: true, tenant: null },
  { id: 8, name: 'Kontor 8', sqm: 10, available: false, tenant: 'Design Studio' },
  { id: 9, name: 'Kontor 9', sqm: 10, available: true, tenant: null },
  { id: 10, name: 'Kontor 10', sqm: 20, available: false, tenant: 'Big Corp' },
  { id: 11, name: 'Kontor 11', sqm: 10, available: true, tenant: null },
  { id: 12, name: 'Kontor 12', sqm: 10, available: false, tenant: 'Tech Solutions' },
  { id: 13, name: 'Kontor 13', sqm: 10, available: true, tenant: null },
  { id: 14, name: 'Kontor 14', sqm: 12, available: false, tenant: 'Marketing Pro' },
  { id: 15, name: 'Kontor 15', sqm: 10, available: true, tenant: null },
  { id: 16, name: 'Kontor 16', sqm: 10, available: false, tenant: 'Finance Group' },
  { id: 17, name: 'Kontor 17', sqm: 10, available: true, tenant: null },
  { id: 18, name: 'Kontor 18', sqm: 15, available: false, tenant: 'Legal Associates' },
  { id: 19, name: 'Kontor 19', sqm: 10, available: true, tenant: null }
];

// Render offices list
function renderOffices() {
  const officesList = document.getElementById('officesList');
  officesList.innerHTML = '';
  
  offices.forEach(office => {
    const officeCard = document.createElement('div');
    officeCard.className = 'office-card';
    officeCard.onclick = () => openOfficeModal(office);
    
    const statusClass = office.available ? 'status-available' : 'status-occupied';
    const statusText = office.available ? 'Ledig' : 'Opptatt';
    const tenantInfo = office.tenant ? `<p><strong>Leietaker:</strong> ${office.tenant}</p>` : '';
    
    officeCard.innerHTML = `
      <h3>${office.name}</h3>
      <div class="office-info">
        <p><strong>Kvadrat:</strong> ${office.sqm} kvm</p>
        ${tenantInfo}
        <div class="office-status ${statusClass}">${statusText}</div>
      </div>
    `;
    
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
  const statusClass = office.available ? 'status-available' : 'status-occupied';
  const statusText = office.available ? 'Ledig' : 'Opptatt';
  const tenantInfo = office.tenant ? `<p><strong>Leietaker:</strong> ${office.tenant}</p>` : '<p><strong>Status:</strong> Ledig for leie</p>';
  
  detailsDiv.innerHTML = `
    <p><strong>Størrelse:</strong> ${office.sqm} kvm</p>
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
