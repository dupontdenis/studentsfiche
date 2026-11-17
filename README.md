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

1. Détermine si l'étudiant a une note basse
2. Génère le rendu HTML correspondant à cet étudiant
3. Affiche la liste dans le conteneur `#app` et ajoute le clic pour voir les détails

L'idée du code indépendant du template est de séparer :

- la logique métier (calcul de l'état de l'étudiant)
- le choix du rendu HTML (balise `<div>` ou `<li>`)
- le conteneur global de la liste (`<div>` ou `<ul>`)

On peut donc définir des fonctions de template qui ne dépendent pas de la logique de calcul.

#### Template d'un étudiant sous forme de `<div>`

```js
export function studentDiv(etudiant, resultat) {
  return `<div class="list-group-item ${resultat}" data-nom="${etudiant.nom}">${etudiant.nom}</div>`;
}
```

#### Template d'un étudiant sous forme de `<li>`

```js
export function studentLi(etudiant, resultat) {
  return `<li class="list-group-item ${resultat}" data-nom="${etudiant.nom}">${etudiant.nom}</li>`;
}
```

#### Template de la liste avec des `<div>`

```js
export function studentsDiv(contenu) {
  return `<h2>Note Plancher (&lt;5/20)</h2><div class="list-group">${contenu}</div>`;
}
```

#### Template de la liste avec des `<ul>` et `<li>`

```js
export function studentsUl(contenu) {
  return `<h2>Note Plancher (&lt;5/20)</h2><ul class="list-group">${contenu}</ul>`;
}
```

Cela permet de garder le code plus modulable : si on décide plus tard de remplacer un `<div>` par un `<li>`, il suffit de changer le template sans réécrire la logique qui determine l'état de l'étudiant.

En pratique, la logique de calcul du résultat est indépendante du format final du rendu :

```js
const resultat = etudiant.notes.some((note) => note < 5)
  ? "list-group-item-danger"
  : "list-group-item-primary";
```

Ensuite, on choisit simplement le bon template selon le HTML souhaité :

```js
const html = studentLi(etudiant, resultat);
```

ou

```js
const html = studentDiv(etudiant, resultat);
```

C'est ce qu'on appelle un rendu indépendant du template : la logique est la même, mais le rendu final peut changer sans modifier le cœur du code.

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
