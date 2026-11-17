import { etudiants } from "./data.mjs";

function renderStudent(etudiant) {
  const element = document.createElement("li");
  const isLowGrade = etudiant.notes.some((note) => note < 5);

  element.className = isLowGrade
    ? "list-group-item list-group-item-danger"
    : "list-group-item list-group-item-primary";
  element.dataset.nom = etudiant.nom;
  element.textContent = etudiant.nom;

  return element;
}

const app = document.getElementById("app");
const titre = document.createElement("h2");
titre.textContent = "Note Plancher (< 5/20)";

const liste = document.createElement("ul");
liste.className = "list-group";

for (const etudiant of etudiants) {
  liste.appendChild(renderStudent(etudiant));
}

app.appendChild(titre);
app.appendChild(liste);

app.addEventListener("click", (event) => {
  const elementListe = event.target.closest("li.list-group-item");

  if (!elementListe) {
    return;
  }

  const nomDansElementHTML = elementListe.dataset.nom;
  const etudiantData = etudiants.find(
    (etudiantData) => etudiantData.nom === nomDansElementHTML,
  );

  console.log("Étudiant sélectionné :", etudiantData);

  const detail = document.getElementById("detail");
  detail.textContent = "";

  const paragraphe = document.createElement("p");
  const nom = document.createElement("strong");
  nom.textContent = nomDansElementHTML;

  paragraphe.appendChild(nom);
  paragraphe.appendChild(document.createTextNode(` - notes : ${etudiantData.notes.join(", ")}`));
  detail.appendChild(paragraphe);
});
