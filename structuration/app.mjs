import { etudiants } from "../data.mjs";
import { studentDiv, studentsDiv } from "./templates.mjs";

// Transforme un étudiant en HTML.
function renderStudent(etudiant) {
  const resultat = etudiant.notes.some((note) => note < 5)
    ? "list-group-item-danger"
    : "list-group-item-primary";

  return studentDiv(etudiant, resultat);
}

// Affiche la liste des étudiants.
const contenu = etudiants.map(renderStudent).join("");
document.getElementById("app").innerHTML = studentsDiv(contenu);

// Gère les clics sur les éléments qui possèdent data-nom.
document.getElementById("app").addEventListener("click", (event) => {
  const elementHTML = event.target.closest("[data-nom]");

  if (elementHTML) {
    const nomDansHTML = elementHTML.dataset.nom;

    const etudiantData = etudiants.find(
      (etudiant) => etudiant.nom === nomDansHTML,
    );

    console.log("Étudiant sélectionné :", etudiantData);

    document.getElementById("detail").innerHTML =
      `<p><strong>${nomDansHTML}</strong> - Notes : ${etudiantData.notes.join(", ")}</p>`;
  }
});
