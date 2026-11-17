// Template d'un étudiant sous forme de <div>
export function studentDiv(etudiant, resultat) {
  return `<div class="list-group-item ${resultat}" data-nom="${etudiant.nom}">${etudiant.nom}</div>`;
}

// Template d'un étudiant sous forme de <li>
export function studentLi(etudiant, resultat) {
  return `<li class="list-group-item ${resultat}" data-nom="${etudiant.nom}">${etudiant.nom}</li>`;
}

// Template de la liste avec des <div>
export function studentsDiv(contenu) {
  return `<h2>Note Plancher (&lt;5/20)</h2><div class="list-group">${contenu}</div>`;
}

// Template de la liste avec des <ul> et <li>
export function studentsUl(contenu) {
  return `<h2>Note Plancher (&lt;5/20)</h2><ul class="list-group">${contenu}</ul>`;
}
