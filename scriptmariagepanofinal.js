/* --- FONCTION : openCurtains ---
   Sert à lancer l’expérience utilisateur. 
   Elle ouvre les rideaux, lance la musique et affiche la première page.
*/
function openCurtains() {
    /* On récupère l’élément HTML des rideaux pour lui ajouter la classe ‘opened’ (qui gère l’animation en CSS) */
    const curtains = document.getElementById('curtains');
    curtains.classList.add('opened');

    /* ‘setTimeout’ permet de retarder une action. 
       Ici, on attend 1000ms (1 seconde) pour que le rideau soit assez ouvert 
       avant de rendre le conteneur ‘invisible’ aux clics (pointerEvents=’none’). 
       Cela permet de cliquer sur les boutons qui sont derrière. */
    setTimeout (() => {
        curtains.style.pointerEvents='none';
    }, 1000);

    /* On récupère la balise audio et on lance la lecture.
       ‘.catch’ est une sécurité : si le navigateur bloque le son, cela évite une erreur critique. */
    const audio = document.getElementById("weddingMusic");
    audio.play().catch(error => console.log("L'audio attend une interaction utilisateur."));

    /* On attend 500ms puis on affiche l’étape 1 (la couverture) */
    setTimeout (() => {
        document.getElementById('step1').classList.add('active');
    }, 500);
}

/* --- FONCTION : nextStep ---
   C’est le système de navigation de ton invitation.
   Elle prend en paramètre ‘num’ (le numéro ou nom de l’étape).
*/
function nextStep(num) {
    /* On commence par cacher TOUTES les étapes en retirant la classe ‘active’ */
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });

    /* On construit l’identifiant (ex: ‘step’ + 2 = ‘step2’) pour cibler la bonne section.
       Si elle existe, on lui ajoute la classe ‘active’ pour l’afficher. */
    const next = document.getElementById('step' + num);
    if (next) {
        next.classList.add('active');
    }
}

/* --- FONCTION : toggleMute ---
   Sert à couper ou remettre le son.
*/
function toggleMute() {
    var audio = document.getElementById("weddingMusic");
    /* On inverse l’état actuel : si c’est vrai, ça devient faux, et vice versa */
    audio.muted = !audio.muted;
    
    /* On change l’icône du bouton selon si le son est coupé ou non */
    document.getElementById('muteBtn').innerHTML = audio.muted ? "🔇" : "🔈";
}

/* --- FONCTION : sendWhatsApp ---
   Crée un lien vers ton numéro WhatsApp avec un message personnalisé.
*/
function sendWhatsApp() {
    let message = "";
    /* On vérifie si le bouton radio ‘choiceMarie’ est coché (true ou false) */
    const isMarie = document.getElementById('choiceMarie').checked;
    
    /* Choix du texte en fonction du bouton sélectionné */
    if (isMarie) {
        message = "Bonjour, je suis un invité du marié. Je confirme ma présence à votre célébration.";
    } else {
        message = "Bonjour, je suis un invité de la mariée. Je confirme ma présence à votre célébration.";
    }
    
    /* On génère l’URL finale. ‘encodeURIComponent’ transforme les espaces et accents 
       pour qu’ils soient lisibles dans un lien internet. */
    const url = "https://wa.me/22664210883?text=" + encodeURIComponent(message);
    
    /* Ouvre l’application WhatsApp dans un nouvel onglet */
    window.open(url, '_blank');
}

/* --- FONCTION : updateTimer ---
   Calcule le temps restant jusqu’à l’heure du mariage.
*/
function updateTimer() {
    /* Date du mariage convertie en millisecondes */
    const targetDate = new Date("June 12, 2026 10:30:00").getTime();
    /* Date actuelle en millisecondes */
    const now = new Date().getTime();
    const diff = targetDate - now;

    /* Si la différence est positive, le mariage est dans le futur */
    if (diff > 0) {
        /* On convertit les millisecondes en jours */
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById("timer").innerHTML = days + "j";
    } else {
        /* Si la date est passée ou égale */
        document.getElementById("timer").innerHTML = "Jour J";
    }
}

/* --- EXÉCUTION --- */
/* On demande au navigateur de répéter la fonction ‘updateTimer’ toutes les 1000ms (1 seconde) */
setInterval(updateTimer, 1000);

/* On appelle la fonction une première fois immédiatement pour éviter d’attendre 
   la première seconde du setInterval. */
updateTimer();
