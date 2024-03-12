# P7 Groupomania Tinard Pierre 

## Description:

Création d'un réseau social interne à l'entreprise pour l'entreprise Groupomania.

Le but étant de faciliter les échanges entre salariés.

Il permet à l'utilisateur après s'être connecté à un compte utilisateur qu'il a créé, de poster et le cas échéant de modifier ou supprimer un message.

Il peut être vu et liké ou disliké par cet utilisateur ou d'autres utilisateurs utilisant le réseau social.

Seul l'utilisateur, (et l'admin) peuvent modifier ou supprimer ses messages.

Idem pour supprimer le compte utilisateur.

Un administrateur (superUser) gère la modération de l'activité du réseau social:

Il peut donc supprimer un compte utilisateur, et modifier /  supprimer un message.

## Problématique: 

Gérer les échanges d'un réseau social avec une BDD (base de données) relationnelle `MySQL` .

## Environnement:

BACKEND: 

Copier le fichier `.env.example`, le renommer en  `.env` et attribuer une valeur à `TOKEN_KEY` et `DB_PASSWORD`.
La valeur `DB_PASSWORD` doit être la même que celle utilisée pour se connexter à `mysql 8.0 command line client`/ `Workbench`.

BDD (Base De Données) `MySQL`, `Sequelize` .

## P7 Accéder à la base de données: 

1. Accéder à la (BDD) base de données groupomania, et la lancer avec `Workbench`:

Installer sur PC/ ou Mac `MySQL Workbench` =>   
`https://www.mysql.com/fr/products/workbench/`

Ce qui installera également l'application `mysql 8.0 command line client` : 

(terminal de commandes MySQL).

Lancer MySQL Workbench:

- Cliquer sur le bouton: `Local instance MySQL80` et créer le Password / ou utiliser `DB_PASSWORD`.

On retrouve la `BDD groupomania` .

Cliquer sur Tables.

On y retrouve les tables : - `posthaslikes`
                           - `posts`
                           - `users`

2. ou accéder à la base de données (BDD) groupomania, et la lancer avec l'application  `mysql 8.0 command line client`:

Lancer l'application `mysql 8.0 command line client` depuis les applications locales sur PC/ ou Mac.

- Créer le Password / ou utiliser `DB_PASSWORD`.

Rentrer les commandes suivantes:

1) `create database groupomania;`  Création de la BDD groupomania.

2) `use groupomania;`   Sélectionner la BDD groupomania.

3) `update users set superUser:` Définir le rôle admin. 

Après avoir sur l'application créé plusieurs utilisateurs, avant la connexion sur les espaces utilisateurs:

- `select * from users;`  Pour sélectionner les différents utilisateurs.

- `update users set superUser where id = 1 where id = id utilisateur concerné `   Pour définir un rôle admin.

- Vérifier l'attribution du rôle admin: `select * from users;`


Autres commandes: 

- `select superUser from users;`  Pour sélectionner l'admin, et ses composants.

- `show tables;`  Pour voir toutes les tables, et leurs détails.

- `select * from posts;`  Pour voir tout les posts, et leurs détails.

- `drop database groupomania;`  Supprimer la (BDD) base de données groupomania.

## Sur un éditeur de code, lancer le Backend:


- Ouvrir l'éditeur de code, et le dossier `P7_Backend_Tinard_Pierre`.

- Supprimer le dossier node_modules pour éviter un conflit lors de l'installation de `nodemon`.

- Installer `Nodemon server` via le terminal avec la commande: `npm install -g nodemon`.

- le dossier node_modules sera ré-installé.

- Utiliser `Nodemon` pour lancer la base de données dans le terminal backend, avec la commande: `nodemon server`.

- Dans le terminal, le message suivant s'affiche: `DB connection OK`.

- Créer un dossier images (New Folder) pour avoir une destination des images choisies pour créer des posts.


## License

[MIT](https://choosealicense.com/licenses/mit) 
