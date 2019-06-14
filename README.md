
## Dump

Dump & Restore base de donnée MongoDB (sous Windows 10)
**(Le nom de notre base MongoDB est "blog" avec une collection "articles")**
  
Lancer le cmd en administrateur.
Aller dans le dossier bin de MongoDB.

lancer la commande : mongodump --db [nom de la base]

Dans l'explorateur de fichier, aller dans le dossier de bin de MongoDB, 
un dossier dump à été créer contenant un dossier nommer comme la base de donnée.
c'est ce dossier qui va permettre de restorer la base.

## Restore

Dans l'explorateur de fichier, aller dans le dossier de bin de MongoDB,
copier le dossier créer lors de du dump de la base dans le dossier dump (si il n'existe pas, le créer).

Lancer le cmd en administrateur.
Aller dans le dossier bin de MongoDB.

Lancer la commande : $ mongorestore -d [nom de la base] dump/[nom de la base]/

La base de donnée a été restoré.

