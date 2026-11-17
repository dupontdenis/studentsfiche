import { etudiants } from "../data.mjs";


//Écrire une fonction renderStudent(student) qui renvoie une chaîne HTML avec une template string. 
// <li class="list-group-item list-group-item-danger| primary data-nom="">...</li> avec le nom de l’étudiant et la classe list-group-item-danger si une note est < 5 sinon list-group-item-primary 
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


//Écrire un écouteur d’événement sur list-group-item qui affiche dans un id=detail avec le nom de l’étudiant et ses notes
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

