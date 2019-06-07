# Reponses aux questions
## Modélisation des données
### Définir le schéma de la base en quelques phrases
Notre BDD possède une collection "posts" qui contient les documents suivants :
- title
- body
- author
- date
- comments (qui contient même "date" et "content")
En guise d'ID unique, nous utilisons le champ "_id" que possèdent par défaut les documents MongoDB.

### Exemple d'entrée au format JSON
```js
app.db.collection('posts').insertOne({
    title: req.body.title,
    body: req.body.body,
    author: req.body.author,
    date: new Date(),
    comments: [{
        content: req.body.comment.content,
        date: new Date(),
    }],
    }
```

### Écrire un script permettant de remplir la base avec des données générées aléatoirement
Nous avons créé un script _populateMongo.js_ disponible à la racine du projet, qui rempli la BDD avec du contenu généré aléatoirement, à l'aide du package _casual_.

## Afficher la liste des articles
### Quel verbe HTTP utiliser ?
On utilisele verbe GET, parce qu'on interroge la BDD pour y récupérer nos articles et les afficher.

## Entrer un article
### Quel verbe HTTP utiliser?
On utilise le verbe POST, puisque qu'on écrit dans la BDD.
