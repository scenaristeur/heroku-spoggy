# heroku-spoggy

Spoggy est un outil de stockage de connaissances.
Si vous êtes expert d'un domaine et souhaitez partager vos connaissances, si vous foisonnez d'idées mais avez toujours du mal à vous faire comprendre par un public 'non initié', si vous devez travailler en équipe de manière 'collaborative', si le collègue que vous devez remplacer part à la retraite sans vous avoir donné toutes les clés de sa fonction, si vous voulez exprimer de manière simple une tension 'holocratique', Spoggy peut vous aider.

Spoggy facilite le stockage, la transmission, le partage des connaissances : 
## entre humains 

### mode solo

- j'ai une idee

## entre humains et machines
### Comment un 'robot', une voiture autonome, une machine ou encore un objet connecté pourraient-ils 'proteger les humains' s'il n'on pas un minimum de connaissances de ce qu'est un être humain ? 

- description d'un contexte, d'un lieu, 
- possiblite d'inférence sur des graphes RDF, déduction d'information non contenues dans un graphe en fonction de règles.

[DEMO](https://spoggy.herokuapp.com/)


[![Deploy](http://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

- [plus d'infos sur le wiki Spoggy](https://github.com/scenaristeur/heroku-spoggy/wiki)


# TODO : tous les modules sont implémentés : graphe, socket, chat, levelgraph, connection endpoint fuseki, inférence y'a plus qu'à les remettre en ordre ;-)

#Installation et Lancement de SPOGGY en local :
```
git clone https://github.com/scenaristeur/heroku-spoggy.git
cd heroku-spoggy
npm install && cd public && bower install
cd ..
node .

```
votre spoggy devrait alors être accessible à l'adresse http://127.0.0.1:3000

# commandes disponibles :
Import : commande /i

Export : commande /e



[exemples de fichiers exportés depuis spoggy](https://github.com/scenaristeur/smag0-connaissance/tree/master/meet-up_conf)

pour les consulter, vous pouvez utiliser passer la source en paramètre, comme dans l'exemple ci -dessous :
[https://spoggy.herokuapp.com/?source=https://raw.githubusercontent.com/scenaristeur/smag0-connaissance/master/meet-up_conf/de_OWL_a_Fameus_spoggy_nodes_edges_1511030598081.json](https://spoggy.herokuapp.com/?source=https://raw.githubusercontent.com/scenaristeur/smag0-connaissance/master/meet-up_conf/de_OWL_a_Fameus_spoggy_nodes_edges_1511030598081.json)




# spoggy en local : (en cours)
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
