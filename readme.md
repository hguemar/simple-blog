# REAMDE

## Lancer le projet

Se placer dans le répertoire mongo.
* `systemctl enable mongod` pour démarrer le service
* `mongo` pour démarrer la base de données sur `mongodb://localhost:27017`

Se placer dans le répertoire et taper: `node server.js`

Dans le navigateur : `http://localhost:8000`

## Initialiser la base de données

Dans le navigateur, visiter les pages :
* `http://localhost:8000/empty`
* `http://localhost:8000/populate`

## Limitations relatives à l'énoncé

### IT

En cours, j'avais réussi à faire fonctionner les tests unitaires. Je n'ai pas réussi à la maison, faute de temps.

La commande refusait de se lancer avant que je downgrade la version de node à 7.10.0 et que je réinstalle mocha.

Maintenant, les tests unitaire qui marchaient sous fedora ne marchent plus.

### GIT

J'ai pas assez lu le cahier des charges avant de me lancer dans l'aventure. Comme je n'étais pas en groupe et que mon espace de travail n'avait pas accès au dépôt, git n'était pas un réflexe pour moi. Je n'ai pas fait beaucoup de commit après cette espèce de monstre appelé "project done", mais j'espère que les rares commits que j'ai réalisés après illustrent ce que j'aurais pu faire.
