import { etudiants } from "../data.mjs";


//Écrire une fonction renderStudent(student) qui renvoie une chaîne HTML avec une template string. <li class="list-group-item list-group-item-danger| primary data-nom="">...</li> avec le nom de l’étudiant et la classe list-group-item-danger si la moyenne est < 10 ou list-group-item-primary si la moyenne est >= 10.
function renderStudent(etudiant) {
  const resultat =
    etudiant.notes.some( (note)=> note<5)
      ? "list-group-item-danger"
      : "list-group-item-primary";
  return `<li class="list-group-item ${resultat}" data-nom="${etudiant.nom}">${etudiant.nom}</li>`;
}



document.getElementById("app").innerHTML = `
  <h2>Note Plancher  (<6/20)</h2>
  <ul class="list-group">
    ${etudiants
      .map(renderStudent)
      .join("")}
  </ul>
`;


//Écrire un écouteur d’événement sur list-group-item qui affiche dans un id=detail avec le nom de l’étudiant et sa moyenne par delegation
document.getElementById("app").addEventListener("click", (event) => {
  const elementListe = event.target.closest("li.list-group-item");

  if (elementListe) {
    const nomDansElementHTML = elementListe.dataset.nom;

    function trouverEtudiantParNom(etudiantData) {
      return etudiantData.nom === nomDansElementHTML;
    }

    const etudiantData = etudiants.find(trouverEtudiantParNom);

    console.log("Étudiant sélectionné :", etudiantData);

    document.getElementById("detail").innerHTML =
      `<p><strong>${nomDansElementHTML}</strong> - notes: ${etudiantData.notes.join(", ")}</p>`;
  }
});

