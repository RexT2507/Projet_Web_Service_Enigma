# Projet Web Service Enigma 

Vous pouvez accéder au [code source](https://github.com/RexT2507/Projet_Web_Service_Enigma) du projet.

#

#### Membres du groupe
* MARMIER Baptiste


## Objectifs du projet

Le finalité du projet est de tenter de bruteforcer des messages chiffrés dont on ne connait pas la clé privée (elle est privée et donc connue seulement par les gens qui y ont droit, à savoir toute l'armée Allemande durant la guerre et notez d'ailleurs pour votre information que ces clés changeaient tous les jours, connues à l'avance par qui de droit, notées sur un petit post-it)

* une application serveur qui fournit des tokens d'authentification (lorsqu'on lui fournit des paires login/pass valides) on parle d'une autorité de certification (CA donc ou AS souvent Authorization Serveur).

* une autre application serveur, potentiellement dans un autre langage, qui va vérifier que les requêtes qu'il reçoit sont bien signées via ce token avant de fournir des éléments pour le brute force. On parle ici de notre application serveur. Ce serveur va servir à orchestrer le travai de brute force et il ne va pas lui même tenter de décrypter (ou déchiffrer par un moyen inpropre) quoi que ce soit mais simplement charger chaque client qui s'y connectera de faire une partie du travail.

* une application client qui va permettre de :
s'authentifier auprès du premier serveur (et stocker le token en mémoire)
demander au serveur de lui fournir un morceau de code qu'il pourra exécuter pour tenter de bruteforcer les messages
demander au serveur un batch à tenter, composée de : un message chiffré, une clé à partir de laquelle on doit tenter de déchiffrer, une clé à laquelle on doit arrêter. On parlera de batch pour identifier ce trinome, c'est plus simple à comprendre
le client tente ensuite de casser le code avec l'algorithme que le serveur lui a fourni et pour un batch donné, puis :
si cela a fonctionné, il en informe le serveur avec la combinaison qui a fonctionné et le message envoyé en clair
si cela a échoué, il en informe le serveur qui va pouvoir rayer ce batch de la liste des tests à effectuer