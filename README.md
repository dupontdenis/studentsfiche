# StudentsFiche

Ce projet est une petite application front-end qui affiche la liste des étudiants et montre leurs notes lorsqu'un étudiant est sélectionné.

## À quoi sert l'application

- Lit la liste des étudiants depuis `data.mjs`
- Crée dynamiquement les éléments de la liste avec JavaScript
- Colore chaque étudiant en rouge s'il a au moins une note inférieure à 5, sinon en bleu
- Affiche le nom et les notes de l'étudiant sélectionné dans le panneau de droite

## Structure du projet

- `index.html` : structure de la page et chargement de Bootstrap
- `data.mjs` : tableau d'étudiants exporté
- `app.mjs` : logique de rendu et interactions utilisateur

## Comment fonctionne le code

### `data.mjs`

Ce fichier exporte un tableau nommé `etudiants`. Chaque objet contient :

- `nom` : nom de l'étudiant
- `L2` : filière
- `notes` : liste des notes
- `img` : URL de l'image de profil

Exemple :

```js
export const etudiants = [
  {
    nom: "Alice",
    L2: "info",
    notes: [6, 8, 12],
    img: "https://randomuser.me/api/portraits/women/1.jpg",
  },
];
```

### `app.mjs`

Ce script importe la liste des étudiants et réalise trois actions principales :

1. Crée le titre et la liste des étudiants dans le conteneur `#app`
2. Détermine la couleur de chaque élément :
   - si une note est inférieure à 5 => rouge
   - sinon => bleu
3. Ajoute un gestionnaire de clic pour afficher les détails de l'étudiant sélectionné dans le bloc `#detail`

La partie importante est que le rendu n'utilise plus de chaînes HTML en template literal. À la place, on crée des éléments DOM avec `document.createElement()`. Cela rend le code plus lisible et plus robuste.

Exemple de rendu indépendant du template :

```js
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
```

Ensuite, l'élément est ajouté au DOM sans concaténer de chaînes HTML :

```js
const liste = document.createElement("ul");
liste.className = "list-group";

for (const etudiant of etudiants) {
  liste.appendChild(renderStudent(etudiant));
}
```

Cela permet d'éviter les dépendances fortes au "template" HTML et rend le code plus modulaire.

### `index.html`

La page HTML contient :

- le titre "Liste des étudiants"
- une colonne gauche (`#app`) pour la liste
- une colonne droite (`#detail`) pour les détails de l'étudiant sélectionné
- les fichiers CSS et JS Bootstrap
- un script de module qui charge `app.mjs`

## Lancer l'application

Comme le projet utilise des modules ES (`.mjs`), le plus simple est de servir le dossier avec un petit serveur local.

Depuis le dossier du projet, exécutez :

```bash
python -m http.server 8000
```

Puis ouvrez :

```text
http://localhost:8000/
```

## Remarques

Ce projet est un petit exercice de front-end conçu pour pratiquer :

- les modules JavaScript
- le rendu dans le DOM
- la délégation d'événements
- la mise à jour dynamique de l'interface
- le style Bootstrap
