const corpus = document.getElementById('corpus'); //divul principal în care se află conținutul unei postări
const langButton = document.getElementById('langButton'); //butonul de schibmat limba

const sidechicks = document.getElementById('side'); //sidebad
let postName = "404"; //în cazul în care nu se primește, din ceva motiv, numele postării, dă fallback la 404

const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"]; //cifrele romane în ordine
const checkromans = ["VIII", "VII", "VI", "IV", "XII", "IX", "XI", "III", "II", "I", "V", "X"]; //cifrele romane în ordinea în care ar trebui verificate pentru a nu înlocui, de exemplu, VII cu 5II

let hatnote = {
    "tags":"",
    "date":"",
    "chapeau":""
}

//Transformă data din format 31XII26 în 31-12-2026
function getDate(datein)
{
    for(let i = 0; i <= 12; i++)
    {
        datein = datein.replace(checkromans[i], `-${romans.indexOf(checkromans[i])}-`)
    }
    return `${datein.slice(0, datein.length - 2)}20${datein.slice(datein.length - 2)}`
}

//nu mai am idee de unde am copiat cacatul ăsta, dar ceva trebuie să facă
function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
//obține postarea ca fișier text dintr-un repo de github. Durează 5 minute să se actualizeze o postare schimbată
window.onload = function() {
    postName = getParameterByName('p', window.location.href);
    //fetch(`https://raw.githubusercontent.com/diridam27/postari/refs/heads/main/${postName}.txt`)
    fetch("test.txt")
    .then(r=>r.text())
    .then(text => {
        randuri = text.split("\n");
        parse();

    })
};

//          **    *     ~~    `
let open = [true, true, true, true]
let randuri = ["gol"] // array-ul în care conținutul dintr-o postare va fi despărțită în rânduri
let ul = false; //buffer folosit pentru a face liste neordonate (bulleturi)

let romanian = ["gol"]; //randuri, dar doar româna
let english = ["empty"]; //randuri, dar doar engleza
let switched = false; //booleană în care verificăm dacă am trecut deja la cealaltă limbă. După parse, o refolosim ca să schimbăm între limbi din buton.

// ia toate tagurile definite într-un fișier json. Avem "en", "ro" și "color"
window.onload = function() {
    fetch("./tags.json")
    .then(r=>r.text())
    .then(tagsText => {
        tags = JSON.parse(tagsText);
        console.log(tags);
    })
};

//luăm cuprinsul dintr-un fișier care se generează automat când postez (stdout-ul unui „ls”)
fetch(`https://raw.githubusercontent.com/diridam27/postari/refs/heads/main/cuprins`)
.then(r=>r.text())
.then(text => {
    cuprins = text.replaceAll(".txt", "").split("\n");
    cuprinde();
})

// tagurile existente
let tag = ["{{sds}}","{{yt}}","{{test}}","{{tumblr}}","{{reddit}}","{{discord}}","{{pm}}","{{favs}}"]

//afișează cuprinsul în sidebar
function cuprinde()
{
    for(let i = 0; i <= cuprins.length - 1; i++)
    {
        sidechicks.innerHTML = sidechicks.innerHTML + `<a href="/blog?p=${cuprins[i]}">${cuprins[i]}</a><hr>`;
    }
}

// parser de markdown
function parse()
{
    corpus.innerHTML = "Se procesează textul";
    for(let i = 0; i < randuri.length; i++)
    {
        //asks de tumblr
        randuri[i] = randuri[i].replace("<anon>", "<div style=\"background-color:#333; border-left: 5px solid white; border-radius:10wh\"><b style=\"font-family:serif\">Un utilizator anonim a întrebat:</b>");
        randuri[i] = randuri[i].replace("</anon>", "</div>")
        //bullet-uri
        if(randuri[i].startsWith("* "))
        {
            randuri[i] = "<li>" + randuri[i].slice(2) + "</li>";
            if(ul)
            {
                randuri.splice(i - 1, 0, "<ul>")
            }
        }
        if(!randuri[i].startsWith("* ") && ul)
        {
            ul = false;
            randuri.splice(i + 1, 0, "</ul>")
        }
        //bold
        console.log("bold");
        while(randuri[i].includes("**"))
        {
            randuri[i] = randuri[i].replace(
                "**", 
                open[0] ? "<b>" : "</b>"
            );
            open[0] = !open[0];
        }
        //italic
        console.log("italic");
        while(randuri[i].includes("*"))
        {
            randuri[i] = randuri[i].replace(
                "*", 
                open[1] ? "<i>" : "</i>"
            );
            open[1] = !open[1];
        }
        //strike
        console.log("strike");
        while(randuri[i].includes("~~"))
        {
            randuri[i] = randuri[i].replace(
                "~~",
                open[2] ? "<s>" : "</s>"
            );
            open[2] = !open[2];
        }
        //monospace
        console.log("backtick");
        while(randuri[i].includes("`"))
        {
            randuri[i] = randuri[i].replace(
                "`", 
                open[3] ? "<span style=\"font-family:monospace;background-color:#aaa;border-radius:2px\">" : "</span>"
            );
            open[3] = !open[3];
        }
        //header
        if(randuri[i].startsWith("# "))
        {
            randuri[i] = "<h1>" + randuri[i].slice(2) + "</h1>";
        }
        //tags
        for(let j = 0; j < tag.length; j++)
        {
            randuri[i] = randuri[i].replace(tag[j], `<div style="padding: 1vw; background-color:${tags[tag[j]].color}; border: 1px solid white"${tags[tag[j]].en}`);
        } 
        //hyperlink
        if(randuri[i].startsWith("![") && randuri[i].includes("](") && randuri[i][randuri[i].length - 1] == ")")
        {
            randuri[i] = "<a href=\"" + randuri[i].split("](")[1].split("]")[0].split(")")[0] + "\"><img style=\"width:20vw\" src=\"" + randuri[i].split("](")[1].split("]")[0].split(")")[0] + "\" alt=\"" + randuri[i].split("](")[0].split("![")[1] + "\"></a>";
        }
        while
        (
                                                                        // unu [doi](trei) patru
               randuri[i].split("[").length > 1                         // unu, doi](trei) patru (2 > 1)
            && randuri[i].split("[")[1].split(")") > 1                  // doi](trei, patru (2 > 1)
            && randuri[i].split("[")[1].split(")")[0].split("](") > 1   // doi, trei (2 > 1)
            && randuri[i].split("[")[1].split(")")[0].includes("](")    // doi](trei (are "](")
        )
        {
            randuri[i] = `${randuri[i].split("[")[0]} <a href=${randuri[i].split("[")[1].split(")")[0].split("](")[1]}>${randuri[i].split("[")[1].split(")")[0].split("](")[0]}</a> ${anduri[i].split("[")[1].split(")")[1]}`;
        }
    }
    //ro/en
    if(randuri.join("").replace("<ro>", "").includes("</ro><en>"))
    {
        for(let i = 0; i <= randuri.length; i++)
        {
            if(randuri[i] == "<ro>" || randuri[i] == "<en>")
            {
                switched = !switched;
            }
            switched ? romanian.push(randuri[i]) : english.push(randuri[i]);
        }
        romanian.splice(0, 0, `<button onclick="langg()" id="langButton">[EN]</button> <a href="https://raw.githubusercontent.com/diridam27/postari/refs/heads/main/${postName}.txt">[vezi sursă]</a>`);
        english.splice(0, 0, `<button onclick="langg()" id="langButton">[RO]</button> <a href="https://raw.githubusercontent.com/diridam27/postari/refs/heads/main/${postName}.txt">[see source]</a>`)
        corpus.innerHTML = romanian.join("<br>");
    }
    else
    {
        console.log("nu am găsit limbi în pizdă");
        langButton.innerHTML = "";
        corpus.innerHTML = randuri.join("<br>");
    }
}
//schimb limba afișată în corpus
function langg()
{
    if(randuri.join("").replace("<ro>", "").includes("</ro><en>"))
    {
        corpus.innerHTML = switched ? romanian.join("<br>") : english.join("<br>");
        switched = !switched;
    }
}