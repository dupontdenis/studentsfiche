import { etudiants } from "../data.mjs";

// Fonction qui génère le HTML d'un étudiant à partir de ses données.
// Une note inférieure à 5 entraîne la classe rouge ; sinon, la classe bleue.
function renderStudent(etudiant) {
  // some() renvoie true si au moins une note est inférieure à 5.
  const resultat = etudiant.notes.some((note) => note < 5)
    ? "list-group-item-danger"
    : "list-group-item-primary";

  // La template string construit un élément <li>.
  // data-nom permet de retrouver le nom lors d'un clic sur cet élément.
  return `<li class="list-group-item ${resultat}" data-nom="${etudiant.nom}">${etudiant.nom}</li>`;
}

// Affiche la liste des étudiants dans l'élément HTML d'identifiant "app".
document.getElementById("app").innerHTML = `
  <h2>Note Plancher (&lt; 5/20)</h2>
  <ul class="list-group">
    ${etudiants.map(renderStudent).join("")}
  </ul>
`;

// Écoute les clics sur l'élément "app".
// La délégation d'événement permet de gérer les clics sur les <li>
// créés dynamiquement, sans ajouter un écouteur à chaque étudiant.
document.getElementById("app").addEventListener("click", (event) => {
  // Recherche le <li> correspondant à la cible du clic
  // ou à l'un de ses éléments parents.
  const elementListe = event.target.closest("li.list-group-item");

  // Vérifie que le clic concerne bien un élément de la liste.
  if (elementListe) {
    // Récupère le nom stocké dans l'attribut HTML data-nom.
    const nomDansElementHTML = elementListe.dataset.nom;

    // Recherche dans les données JavaScript l'objet étudiant correspondant.
    const etudiantData = etudiants.find(
      (etudiantData) => etudiantData.nom === nomDansElementHTML,
    );

    // Affiche l'objet étudiant dans la console pour faciliter le débogage.
    console.log("Étudiant sélectionné :", etudiantData);

    // Affiche le nom et les notes de l'étudiant dans l'élément "detail".
    document.getElementById("detail").innerHTML =
      `<p><strong>${nomDansElementHTML}</strong> - notes : ${etudiantData.notes.join(", ")}</p>`;
  }
});
