# simple-blog


## Prérequis
Avoir Node et NPM installés ainsi que MongoDB

## Dump de la base de données
Lors du dump, le résultat du dump se trouve dans le réperoire racine de MongoDB
`mongodump --db simpleBlog`

## Restorer la base de données
Se placer dans le racine de mongodb et copier le répertorie dump du projet dans le répertoire dump de mongodb (le créer si il existe pas !).
Copier dans ce réperoire le dump/simpleBlog du projet
et après faire un 
`mongorestore -d simpleBlog dump/simpleBlog/`

La base est restaurée

## Déployer le projet 
Cloner le projet avec un `git clone https://github.com/LucasM69/simple-blog.git`.
Une fois le projet cloné, il faut aller chercher le dans l'arboresence `simple-blog/dist/SimpleBlog` et le copier dans un serveur web classique du type apache ou Microsoft IIS.
Ensuite, avec un terminal en ligne de commande, il faut se placer dans le répertoire `API/` et lancer l' API avec un `node server.js`.

## Technologies utilisées
* Angular : Frontend
Le Framework Angular développé par Google permet la création de composants réutilisables.

* MongoDB : base de données NoSQL
* NodeJS avec Express pour la création de l'API


## TESTS
`npm test`

Aucun test ne fonctionne, je n'ai pas réussi à les mettre en oeuvre.
