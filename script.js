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

//* ===== ÉTAPE 3 : FONCTION POUR CHERCHER UN ARTISTE =====
function searchArtist() {
    // 1. Vider le conteneur avant d'afficher les nouveaux résultats
    results.innerHTML = "";
    // 2. Récupérer ce que l'utilisateur a tapé dans l'input
    let artistName = input.value;
    // 3. Vérifier si artistName est vide
    //    - Si oui : afficher un message dans le conteneur
    //    - Puis faire "return;" pour arrêter la fonction

    if (!artistName === "") {
        results.innerHTML = `<p>message</p>`;
        return;
    }

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
    //
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
        audio.src = track.preview;
        audio.play();
        
    });
    //      - changer la source de l'audio (audio.src = track.preview)
    //      - lancer la lecture (audio.play())
    //


    // 5. Ajouter la carte dans le conteneur des résultats
    results.appendChild(carte);
}



//* ===== BONUS : AJOUTER DES AMÉLIORATIONS (OPTIONNEL) =====
// - Mettre en surbrillance (classe CSS) la carte en cours de lecture
// - Permettre de lancer une recherche en appuyant sur la touche "Entrée" dans l'input
// - POssibilté de mettre pause sur la preview de la musique.