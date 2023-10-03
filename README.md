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

Back-end: 

Copier le fichier `.env.example`, le renommer en  `.env` et attribuer une valeur à `TOKEN_KEY` et `DB_PASSWORD`.

BDD (Base De Données) `MySQL`, `Sequelize` .

## P7 Accéder à la base de données: 

1. Accéder à la BDD (base de données) Groupomania, et la lancer avec Workbench:

Installer sur PC/ ou Mac MySQL Workbench =>   
`https://www.mysql.com/fr/products/workbench/`

Ce qui installera également l'application `mysql 8.0 command line client` : 

(terminal de commandes).

Lancer MySQL Workbench:

- Cliquer sur le bouton: `Local instance MySQL80` et créer le Password.

On retrouve la `BDD Groupomania` .

Cliquer sur Tables.

On y retrouve les tables : - `posthaslikes`
                           - `posts`
                           - `users`

2. ou accéder à la base de données (BDD) Groupomania, et la lancer avec l'application  `mysql 8.0 command line client`:

Lancer l'application `mysql 8.0 command line client` depuis les applications locales sur PC/ ou Mac.

- Créer le Password.

Rentrer les commandes suivantes:

- `use Groupomania;`   Pour sélectionner la BDD Groupomania.

- `show tables;`  Pour voir toutes les tables, et leurs détails.

- `select * from users;`  Pour sélectionner les différents utilisateurs, et leurs composants.

- `select superUser from users;`  Pour sélectionner l'admin, et ses composants.

## Sur un éditeur de code, lancer le Backend:

1. Le Backend:

- Ouvrir l'éditeur de code, et le dossier `P7_Backend_Tinard_Pierre`.

- Télécharger `Nodemon server` sur le PC/ ou Mac.

- Installer `Nodemon server` via le terminal avec la commande: `nodemon install`.

- Utiliser `Nodemon` pour lancer la base de données dans le terminal backend, avec la commande: `nodemon server`.

Dans le terminal, le message suivant s'affiche: `DB connection OK`.

## License

[MIT](https://choosealicense.com/licenses/mit/) 