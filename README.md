
## Dump

Dump & Restore base de donnée MongoDB (sous Windows 10)
**(Le nom de notre base MongoDB est "blog" avec une collection "articles")**
  
Lancez le cmd en administrateur.
Aller dans le dossier bin de MongoDB.

Lancer la commande : mongodump --db [nom de la base]

Dans l'explorateur de fichiers, allez dans le dossier de bin de MongoDB.

Un dossier dump à été créé contenant un dossier nommé comme la base de donnée.

C'est ce dossier qui va permettre de restaurer la base.

## Restore

Dans l'explorateur de fichiers, allez dans le dossier de bin de MongoDB.

Copiez le dossier créé lors du dump de la base dans le dossier dump (s'il n'existe pas, le créer).

Lancez le cmd en administrateur.

Aller dans le dossier bin de MongoDB.

Lancer la commande : mongorestore -d [nom de la base] dump/[nom de la base]/

La base de données a été restaurée.

