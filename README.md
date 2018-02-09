# heroku-spoggy

[DEMO](https://spoggy.herokuapp.com/)


[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

# spoggy en local :
télécharger et décompresser apache-jena-fuseki-3.6.0

lancement :
création d'un dossier data/DEFAUT,
puis
fuseki-server --update --loc=data/DEFAUT /ds
--> update = maj possible,
--> --loc = persistant
--> serveur accessible sur http://127.0.0.1:3030

FAQ :
si pb space object map ,
java -Xmx1024M -jar fuseki-server.jar %*
@java -Xmx1200M -jar fuseki-server.jar %*

doc :
http://jena.apache.org/documentation/fuseki2/


#Lancement de SPOGGY en local :
cd heroku-spoggy
node .
