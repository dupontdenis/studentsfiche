# StudentsFiche

This project is a small front-end app that displays a list of students and shows their notes when a student is selected.

## What the app does

- Reads a list of students from `data.mjs`
- Renders each student as a Bootstrap list item in `index.html`
- Colors each item in red if at least one note is below 5, otherwise in blue
- Shows the selected student's name and grades in the right-hand panel

## Project structure

- `index.html` : page structure and Bootstrap CSS/JS loading
- `data.mjs` : exported student data array
- `app.mjs` : rendering logic and interaction behavior

## How the code works

### `data.mjs`

This file exports an array named `etudiants`. Each object contains:

- `nom` : student name
- `L2` : study field
- `notes` : list of grades
- `img` : profile image URL

Example:

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

This script imports the student list and does three main things:

1. Renders the list of students into the `#app` container
2. Uses a condition to decide the color of each list item:
   - if one grade is lower than 5 => red
   - otherwise => blue
3. Adds a click handler to the list to display the selected student details in the `#detail` block

The rendering function is:

```js
function renderStudent(etudiant) {
  const resultat = etudiant.notes.some((note) => note < 5)
    ? "list-group-item-danger"
    : "list-group-item-primary";

  return `<li class="list-group-item ${resultat}" data-nom="${etudiant.nom}">${etudiant.nom}</li>`;
}
```

This creates an HTML `<li>` element whose `data-nom` attribute stores the student's name. When the user clicks one of these items, the app finds the matching student in the array and shows their notes.

### `index.html`

The HTML page contains:

- the title "Liste des étudiants"
- a left column (`#app`) for the student list
- a right column (`#detail`) for the selected student's information
- Bootstrap CSS and JS for styling
- a module script that loads `app.mjs`

## Running the app

Because the project uses ES modules (`.mjs`), it is best to serve the folder with a small local web server.

From the project root, run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Notes

This is a simple front-end exercise designed to practice:

- JavaScript modules
- DOM rendering
- event delegation
- data-driven UI updates
- Bootstrap styling
