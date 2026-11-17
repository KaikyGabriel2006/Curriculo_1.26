async function carregarCurriculo() {
    try {
      const resposta = await fetch('cv.json');
      const dados = await resposta.json();
      const cv = dados.cv;
  
      document.getElementById('full-name').textContent = cv.personalInformation.fullName;
      document.getElementById('prof-title').textContent = cv.personalInformation.professionalTitle;
      
      const photoElement = document.getElementById('profile-photo');
      if (photoElement && cv.personalInformation.profilePhoto) {
        photoElement.src = cv.personalInformation.profilePhoto;
      }
  
      const contactList = document.getElementById('contact-info');
      const { city, state, country } = cv.personalInformation.location;
      contactList.innerHTML = `
-         <li>${city}, ${state}
${country === 'Brazil' ? 'Brasil' : country}</li>
        <li>Tel / WhatsApp: ${cv.personalInformation.phone}</li>
        <li><a href="mailto:${cv.personalInformation.email}">${cv.personalInformation.email}</a></li>
        ${cv.personalInformation.github ? `<li><a href="${cv.personalInformation.github}" target="_blank">GitHub</a></li>` : ''}
        ${cv.personalInformation.linkedin ? `<li><a href="${cv.personalInformation.linkedin}" target="_blank">LinkedIn</a></li>` : ''}
      `;
  
      document.getElementById('career-objective').textContent = cv.professionalSummary.careerObjective;
      document.getElementById('prof-summary').textContent = cv.professionalSummary.description;
  
      if (cv.professionalExperience && cv.professionalExperience.length > 0) {
        document.getElementById('experience-section').style.display = 'block';
        const expContainer = document.getElementById('experience-list');
        expContainer.innerHTML = cv.professionalExperience.map(exp => `
          <div class="item">
            <div class="item-header">
              <span class="item-title">${exp.position}</span>
              <span class="item-date">${exp.startDate} – ${exp.current ? 'Atual' : exp.endDate}</span>
            </div>
-             <div class="item-subtitle">${exp.company}
${exp.location}</div>
            <p>${exp.description}</p>
          </div>
        `).join('');
      }
  
      const eduContainer = document.getElementById('education-list');
      eduContainer.innerHTML = cv.education.map(edu => `
        <div class="item">
          <div class="item-header">
            <span class="item-title">${edu.degree} em ${edu.fieldOfStudy}</span>
            <span class="item-date">${edu.startDate} – ${edu.current ? 'Cursando' : edu.endDate}</span>
          </div>
          <div class="item-subtitle">${edu.institution}</div>
          <p>${edu.description}</p>
        </div>
      `).join('');

      const projContainer = document.getElementById('projects-list');
      projContainer.innerHTML = cv.projects.map(proj => `
        <div class="item">
          <div class="item-header">
            <span class="item-title">${proj.name}</span>
            <span class="item-date">${proj.startDate}</span>
          </div>
          <div class="item-subtitle">
            ${proj.role} ${proj.url ? `• <a href="${proj.url}" target="_blank">Ver código no GitHub</a>` : ''}
          </div>
          <p>${proj.description}</p>
          <div class="tags">
            ${proj.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
          </div>
        </div>
      `).join('');
  
      const skillsContainer = document.getElementById('skills-list');
      const techTags = cv.skills.technical.map(s => `<span class="tag">${s.name} (${s.level})</span>`);
      const toolTags = cv.skills.tools.map(t => `<span class="tag">${t}</span>`);
      const softTags = cv.skills.behavioral.map(b => `<span class="tag">${b}</span>`);
      skillsContainer.innerHTML = [...techTags, ...toolTags, ...softTags].join('');
    
      const langContainer = document.getElementById('languages-list');
      langContainer.innerHTML = cv.languages.map(lang => `
        <p><strong>${lang.name}:</strong> ${lang.proficiency}</p>
      `).join('');
  
      const infoContainer = document.getElementById('additional-info');
      infoContainer.innerHTML = `
        <p><strong>Disponibilidade:</strong> ${cv.additionalInformation.availability}</p>
        <p><strong>Modelo de trabalho:</strong> ${cv.additionalInformation.workModel}</p>
        <p><strong>Região:</strong> ${cv.preferences.preferredLocations.join(', ')}</p>
      `;
  
    } catch (erro) {
      console.error('Erro ao carregar o JSON:', erro);
    }
  }
  
  document.addEventListener('DOMContentLoaded', carregarCurriculo);
