/* ========================================
   EXERCICE : DEEZER API + DOM MANIPULATION
   ======================================== */

/* OBJECTIFS :
   1. Sélectionner des éléments du DOM
   2. Créer un eventListener sur le bouton
   3. Récupérer des données depuis l'API Deezer
   4. Créer dynamiquement des cartes pour chaque chanson
   5. Ajouter une interaction pour jouer un extrait audio
*/

/* CONSEILS :
   - Testez chaque étape avec console.log()
   - Regardez dans la console du navigateur pour voir les erreurs
   - L'API Deezer retourne toujours 25 résultats maximum
*/


//* ===== ÉTAPE 1 : SÉLECTIONNER LES ÉLÉMENTS DU DOM =====
// Bien regarder comment est construit le code HTML

// TODO: Sélectionner le bouton de recherche avec getElementById
let button = document.getElementById("search-btn");
// TODO: Sélectionner l'input de recherche
let input = document.getElementById("artist-input");
// TODO: Sélectionner le conteneur des résultats
let results = document.getElementById("results-container");
// TODO: Sélectionner l'élément audio pour jouer la musique
let audio = document.getElementById("audio-player");

//* ===== ÉTAPE 2 : CRÉER UN EVENT LISTENER =====
// Quand on clique sur le bouton, on appelle la fonction searchArtist()

// TODO: Ajouter un addEventListener "click" sur le bouton

button.addEventListener("click", function () {
    searchArtist();
});

// button.addEventListener("click", searchArtist); la correction dans la classe 

//* ===== ÉTAPE 3 : FONCTION POUR CHERCHER UN ARTISTE =====
function searchArtist() {
    // 1. Vider le conteneur avant d'afficher les nouveaux résultats
    results.innerHTML = "";

    // 2. Récupérer ce que l'utilisateur a tapé dans l'input
    // 3. Vérifier si artistName est vide
    //    - Si oui : afficher un message dans le conteneur
    //    - Puis faire "return;" pour arrêter la fonction
    let artistName = input.value;

    if (artistName === "") {
        results.innerHTML = "<p>Tapez votre recherche</p>";
        return;
    }

    // if (!artistName) {
    //     results.innerHTML = `<p>Tapez votre recherche</p>`;
    //     return;
    // }

    // 4. Construire l'URL de l'API avec le nom de l'artiste
    const API_URL = `https://corsproxy.io/?https://api.deezer.com/search?q=${artistName}`;


    //**! PAS TOUCHE!!! */
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            console.log('Données récupérées avec succès :', data);

            // data.data = tableau de morceaux (tracks)
            // TODO: Parcourir data.data avec forEach
            // Pour chaque track, appeler la fonction afficherTrack(track)
            data.data.forEach(track => {
                afficherTrack(track);
            });

        })
        .catch(error => console.error('Erreur lors de la récupération des données :', error));
    //**! FIN FETCH */
}
searchArtist();


//* ===== ÉTAPE 4 : CRÉER UNE CARTE POUR CHAQUE CHANSON =====
function afficherTrack(track) {
    // track = un objet qui représente une chanson
    // Exemple : track.title, track.artist.name, track.album.cover_medium, track.preview

    // 1. Vérifier que track.preview existe (certains morceaux n'ont pas de preview)
    //    Si pas de preview, on ne crée pas de carte.
    if (!track.preview) {
        return;
    }

    // 2. Créer un élément div pour la carte
    //    - lui ajouter la classe "track-card"

    let carte = document.createElement("div");
    carte.classList.add("track-card");
    // 3. Ajouter le HTML de la carte dans la div avec innerHTML :
    //    - une div.cover-container
    // carte.innerHTML = document.createElement("div");
    // dispatchEvent.carte.innerHTML =
    //    - une image avec la pochette
    //    - un overlay avec l’icône ▶️
    //    - un titre (h3) avec le nom de la chanson
    //    - un paragraphe (p) avec le nom de l’artiste

    carte.innerHTML =
        `<div class="cover-container">
          <img src= "${track.album.cover_medium}" class="cover-image">
          <div class="play-overlay">
             <span class="play-icon">▶️</span>
          </div>
       </div>
       <h3>${track.title} </h3>
       <p>${track.artist.name}</p>
     </div>`;


    // Exemple de structure HTML à reproduire :
    //
    // <div class="track-card">
    //   <div class="cover-container">
    //      <img src="URL_DE_L_IMAGE" class="cover-image">
    //      <div class="play-overlay">
    //         <span class="play-icon">▶️</span>
    //      </div>
    //   </div>
    //   <h3>Titre de la chanson</h3>
    //   <p>Nom de l’artiste</p>
    // </div>
    //


    // 4. Ajouter un événement "click" sur la carte
    //    Quand on clique :
    carte.addEventListener("click", function () {
        //      - changer la source de l'audio (audio.src = track.preview)
        audio.src = track.preview;
        //      - lancer la lecture (audio.play())
        audio.play();

    });


    // 5. Ajouter la carte dans le conteneur des résultats
    results.appendChild(carte);
}



//* ===== BONUS : AJOUTER DES AMÉLIORATIONS (OPTIONNEL) =====
// - Mettre en surbrillance (classe CSS) la carte en cours de lecture
// - Permettre de lancer une recherche en appuyant sur la touche "Entrée" dans l'input
// - POssibilté de mettre pause sur la preview de la musique.




// /* ========================================
//    EXERCICE : DEEZER API + DOM MANIPULATION
//    VERSION SIMPLE (fetch avec .then)
//    ======================================== */

// /* OBJECTIFS :
//    1. Sélectionner des éléments du DOM
//    2. Ajouter un eventListener sur le bouton
//    3. Récupérer des données depuis l'API Deezer
//    4. Créer dynamiquement des cartes pour chaque chanson
//    5. Pouvoir cliquer sur une carte pour jouer un extrait
// */

// /* CONSEILS :
//    - Teste chaque étape avec console.log()
//    - Regarde la console du navigateur pour voir les erreurs
//    - L'API Deezer retourne toujours AU MAX 25 résultats
// */


// //* ===== ÉTAPE 1 : SÉLECTIONNER LES ÉLÉMENTS DU DOM =====
// // PSEUDO-CODE :
// // 1. Récupérer le bouton "Rechercher"
// // 2. Récupérer l'input où on tape le nom de l'artiste
// // 3. Récupérer la div où on va afficher les résultats
// // 4. Récupérer le lecteur audio

// const searchBtn = document.getElementById("search-btn");
// const searchInput = document.getElementById("artist-input");
// const container = document.getElementById("results-container");
// const audio = document.getElementById("audio-player");

// // BONUS 4 
// // On garde une variable pour savoir quelle carte est en cours de lecture
// let currentPlayingCard = null;

// //* ===== ÉTAPE 2 : AJOUTER L'ÉVÉNEMENT SUR LE BOUTON =====
// // PSEUDO-CODE :
// // Quand on clique sur le bouton :
// //    -> appeler la fonction searchArtist()

// searchBtn.addEventListener("click", searchArtist);

// // BONUS 1 : Lancer la recherche avec la touche Entrée
// searchInput.addEventListener("keydown", function (event) {
//    if (event.key === "Enter") {
//       searchArtist();
//    }
// });

// //* ===== ÉTAPE 3 : FONCTION PRINCIPALE DE RECHERCHE =====
// // PSEUDO-CODE :
// // 1. Effacer les anciens résultats (vider le container)
// // 2. Récupérer le texte écrit dans l'input
// // 3. Si l'input est vide : afficher un message et arrêter la fonction
// // 4. Construire l'URL de l'API avec le nom de l'artiste
// // 5. Utiliser fetch(apiUrl)
// // 6. Transformer la réponse en JSON
// // 7. Pour chaque morceau dans les données reçues :
// //       -> appeler afficherTrack(track)
// // 8. Gérer les erreurs avec .catch()

// function searchArtist() {
//    // 1. Vider les anciens résultats
//    container.innerHTML = "";

//    // 2. Récupérer le contenu de l'input
//    const artistName = searchInput.value;

//    // 3. Vérifier si c'est vide
//    if (artistName === "") {
//       container.innerHTML = "<p>Écris un nom d’artiste</p>";
//       return; // on arrête la fonction ici
//    }

//    // 4. Construire l'URL de l'API Deezer + proxy CORS
//    const apiUrl = `https://corsproxy.io/?https://api.deezer.com/search?q=${artistName}`;

//    // 5–8. Utiliser fetch avec la syntaxe en .then()
//    fetch(apiUrl)
//       .then(function(response) {
//          // Transforme la réponse en JSON
//          return response.json();
//       })
//       .then(function(data) {
//          console.log("Données récupérées avec succès :", data);
//       console.log(data);
      

//          // data.data contient le tableau de morceaux
//          data.data.forEach(function(track) {
//             afficherTrack(track);
//          });
//       })
//       .catch(function(error) {
//          console.error("Erreur lors de la récupération des données :", error);
//          container.innerHTML = "<p>Oups, erreur lors de la recherche. Réessaie plus tard.</p>";
//       });
// }


// //* ===== ÉTAPE 4 : AFFICHER UN MORCEAU =====
// // PSEUDO-CODE :
// // 1. Si le morceau n'a PAS de preview audio -> ne rien afficher (return)
// // 2. Créer une div pour la carte (class "track-card")
// // 3. Ajouter à la carte :
// //       - la pochette de l'album
// //       - un overlay avec une icône Play
// //       - le titre du morceau
// //       - le nom de l'artiste
// // 4. Ajouter un eventListener "click" sur la carte :
// //       - changer la source de l'audio (audio.src = track.preview)
// //       - lancer la lecture (audio.play())
// // 5. Ajouter la carte dans le container

// function afficherTrack(track) {
//    // 1. Certains morceaux n'ont pas d'extrait (preview)
//    if (!track.preview) return;

//    // 2. Créer la carte
//    const div = document.createElement("div");
//    div.className = "track-card";

//    // 3. Remplir la carte avec le HTML
//    div.innerHTML = `
//       <div class="cover-container">
//          <img src="${track.album.cover_medium}" class="cover-image" alt="Pochette de l'album">
//          <div class="play-overlay">
//             <span class="play-icon">▶️</span>
//          </div>
//       </div>
//       <h3>${track.title}</h3>
//       <p>${track.artist.name}</p>
//    `;

//    // 4. Ajouter le click pour jouer la musique
//    div.addEventListener("click", function () {
//       // BONUS 4 : si on reclique sur la même carte et que ça joue, on met en pause
//       if (currentPlayingCard === div && !audio.paused) {
//          audio.pause();
//          div.classList.remove("playing", "jaune");
//          currentPlayingCard = null;

//          // BONUS 4 : Permet de mettre la musique en pause en recliquant sur la carte
//          return;
//       }
//       audio.src = track.preview;
//       audio.play();

      

//             // BONUS 3 : mettre en surbrillance la carte en cours de lecture
//       if (currentPlayingCard) {
//          currentPlayingCard.classList.remove("playing", "jaune");
//       }

//       div.classList.add("playing", "jaune");
//       currentPlayingCard = div;
//       // BONUS 3 : Utilise les classes .playing et .jaune pour styliser la carte active
//    // });
//    });

//    // 5. Ajouter la carte dans le container
//    container.appendChild(div);
// }