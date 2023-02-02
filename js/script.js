//Chargement de la page et initialisation des variables globales
window.onload = init;
let i = 0;

//fonction principale
function init() {
    //Chargement des données
    console.log("init");
    let monPortrait = document.getElementById("portrait");
    data.forEach(element => newItem(element));

    //traitement des données
    function newItem(monItem) {
        //conteneur des cases
        let wrapper = document.createElement("div");
        wrapper.className = "item-wrapper";

        //Nouvelle case
        let item = document.createElement("div");
        item.className = "item";

        //face avant de la case
        let front = document.createElement("div");
        front.className = "item-front";

        //Remplissage de la face avant
        let intro = document.createElement("h1");
        intro.innerHTML = "Si j'étais...";
        front.appendChild(intro);

        let contLogo = document.createElement("div");
        contLogo.className = "contLogo";
        let Logo = document.createElement("i");
        Logo.className = monItem.illustration;
        Logo.id = "monLogo";
        contLogo.appendChild(Logo);
        front.appendChild(contLogo);

        let analogie = document.createElement("div");
        analogie.className = "analogie"
        analogie.innerHTML = "<h1>..." + monItem.analogie + "</h1>";
        front.appendChild(analogie);

         //Remplissage de la face arrière
        let back = document.createElement("div");
        back.className = "item-back";
        let valeurAnalogie = document.createElement("h2");
        valeurAnalogie.innerHTML = monItem.valeurAnalgie;
        back.appendChild(valeurAnalogie);

        let explication = document.createElement("div");
        explication.className = "explication";
        explication.innerHTML = monItem.explicationAnalogie;
        back.appendChild(explication);

        item.appendChild(front);
        item.appendChild(back);
        wrapper.appendChild(item);
        monPortrait.appendChild(wrapper);
    }

    //Ecriture en temps réel dans un nouvel item depuis le formulaire 
    document.querySelector("#analogie").addEventListener('keyup', function(e) {
        document.querySelector("#analogieSuggeree").innerHTML = "<h1>..." + document.querySelector("#analogie").value + "</h1>";
    })
    document.querySelector("#valeurAnalogie").addEventListener('keyup', function(element) {
        document.querySelector("#valeurAnalogieSuggeree").innerHTML = document.querySelector("#valeurAnalogie").value;
    })
    document.querySelector("#explication").addEventListener('keyup', function(element) {
        document.querySelector("#explicationSuggeree").innerHTML = document.querySelector("#explication").value;
    })
}
//Ouverture du formulaire à l'aide du bouton
function openFormulaire() {
    //Apparition du formulaire
    document.getElementById("popup").style.top = "20px";

    //Création d'une nouvelle case avec des Id permettant l'appel du remplissage en temps réel
    let monPortrait = document.getElementById("portrait");
    let wrapper = document.createElement("div");
    wrapper.className = "item-wrapper";

    let item = document.createElement("div");
    item.className = "item";

    let front = document.createElement("div");
    front.className = "item-front";

    let intro = document.createElement("h1");
    intro.innerHTML = "Si j'étais...";
    front.appendChild(intro);

    let contLogo = document.createElement("div");
    contLogo.className = "contLogo";
    let Logo = document.createElement("i");
    Logo.className = "fa-solid fa-image";
    Logo.id = "monLogo";
    contLogo.appendChild(Logo);
    front.appendChild(contLogo);

    let analogie = document.createElement("div");
    analogie.id = "analogieSuggeree";
    analogie.className = "analogie";
    analogie.innerHTML = "<h1>...rien</h1>";
    front.appendChild(analogie);

    let back = document.createElement("div");
    back.className = "item-back";
    let valeurAnalogie = document.createElement("h2");
    valeurAnalogie.id = "valeurAnalogieSuggeree";
    valeurAnalogie.innerHTML = "toujour rien";
    back.appendChild(valeurAnalogie);

    let explication = document.createElement("div");
    explication.className = "explication";
    explication.id = "explicationSuggeree";
    explication.innerHTML = document.getElementById("explication").value;
    back.appendChild(explication);

    item.appendChild(front);
    item.appendChild(back);
    wrapper.appendChild(item);
    monPortrait.appendChild(wrapper);
}

//fermeture du formulaire à l'aide du bouton croix
function closeFormulaire() {
    //Disparition du formulaire
    document.getElementById("popup").style.top = "-800px";

    //suppression de la nouvelle case non finie
    let monPortrait = document.getElementById("portrait");
    monPortrait.lastChild.remove();
}

//Fonction clear aprés envoie du formulaire
function clear() {
    i = i + 1;

    //disparition du formulaire
    document.getElementById("popup").style.top = "-800px";

    //Libération de la saisie en temps réel depuis le formulaire sur la nouvelle case
    let analogieChange = document.querySelector("#analogieSuggeree");
    analogieChange.id = "analogieSuggeree" + i;
    let valeurAnalogieSuggereeChange = document.querySelector("#valeurAnalogieSuggeree");
    valeurAnalogieSuggereeChange.id = "valeurAnalogieSuggeree" + i;
    let explicationSuggereeChange = document.querySelector("#explicationSuggeree");
    explicationSuggereeChange.id = "explicationSuggeree" + i;

    //Nettoyage des champs de saisie du formulaire
    document.querySelector("#analogie").value = "";
    document.querySelector("#valeurAnalogie").value = "";
    document.querySelector("#explication").value = "";
}



//envoi du fomulaire à L'API depuis le bouton envoi
function envoi(event) {

    //Construction de l'url à partir des champs saisis dans le formulaire
    let url = "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=solene.jeannin&courriel=" + document.querySelector("#monmail").value + "&message=Si j'étais..." + document.querySelector("#analogie").value + " je serais..." + document.querySelector("#valeurAnalogie").value + " parce que " + document.querySelector("#explication").value

    //Envoi des données
    fetch(url).then(function(response) {

        //Affichage de la réponse
        response.json().then(function(data) {
            console.log(data)

        })
    })

    //Confirmation de réussite
    window.alert("Nouvelle section créée")

    //Blocage du rechargement de la page activé par l'envoi du formulaire
    event.preventDefault()

    //Appel de la fonction clear
    clear();

}