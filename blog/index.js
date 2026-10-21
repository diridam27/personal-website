const corpus = document.getElementById('corpus');
const langButton = document.getElementById('langButton');

const sidechicks = document.getElementById('side');
let postName = "404";

function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
window.onload = function() {
    postName = getParameterByName('p');
};

//          **    *     ~~    `
let open = [true, true, true, true]
let randuri = ["gol"]
let ul = false;

let romanian = ["gol"];
let english = ["empty"];
let switched = false; //booleană în care verificăm dacă am trecut deja la cealaltă limbă. După parse, o refolosim ca să schimbăm între limbi din buton.

fetch(`https://raw.githubusercontent.com/diridam27/postari/refs/heads/main/${postName}.txt`)
.then(r=>r.text())
.then(text => {
    randuri = text.split("\n");
    parse();
})

fetch(`https://raw.githubusercontent.com/diridam27/postari/refs/heads/main/cuprins`)
.then(r=>r.text())
.then(text => {
    cuprins = text.replaceAll(".txt", "").split("\n");
    cuprinde();
})

let tag = ["{{sds}}","{{yt}}","{{test}}","{{tumblr}}","{{reddit}}","{{discord}}","{{pm}}","{{favs}}"]
let tags =
{
    "{{sds}}": "shit diridam says<br>",
    "{{yt}}": "youtube video<br>",
    "{{test}}": "acesta este un test pentru a testa funcționalitatea site-ului<br>",
    "{{tumblr}}": "aceasta este o postare preluată de pe tumblr<br>",
    "{{reddit}}": "aceasta este o postare preluată de pe reddit<br>",
    "{{discord}}": "acesta este o postare preluată dintr-un mesaj de pe discord<br>",
    "{{pm}}": "aceasta este o postare preluată dintr-un mesaj privat<br>",
    "{{favs}}": "aceasta este una dintre postările mele preferate<br>"
}

function cuprinde()
{
    for(let i = 0; i <= cuprins.length - 1; i++)
    {
        sidechicks.innerHTML = sidechicks.innerHTML + `<a href="/blog?p=${cuprins[i]}">${cuprins[i]}</a><hr>`;
    }
}

function parse()
{
    corpus.innerHTML = "Se procesează textul";
    for(let i = 0; i < randuri.length; i++)
    {
        randuri[i] = randuri[i].replace("<anon>", "<div style=\"background-color:#333; border-left: 5px solid white; border-radius:10wh\"><b style=\"font-family:serif\">Un utilizator anonim a întrebat:</b>");
        randuri[i] = randuri[i].replace("</anon>", "</div>")
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

        console.log("bold");
        while(randuri[i].includes("**"))
        {
            randuri[i] = randuri[i].replace(
                "**", 
                open[0] ? "<b>" : "</b>"
            );
            open[0] = !open[0];
        }

        console.log("italic");
        while(randuri[i].includes("*"))
        {
            randuri[i] = randuri[i].replace(
                "*", 
                open[1] ? "<i>" : "</i>"
            );
            open[1] = !open[1];
        }

        console.log("strike");
        while(randuri[i].includes("~~"))
        {
            randuri[i] = randuri[i].replace(
                "~~",
                open[2] ? "<s>" : "</s>"
            );
            open[2] = !open[2];
        }

        console.log("backtick");
        while(randuri[i].includes("`"))
        {
            randuri[i] = randuri[i].replace(
                "`", 
                open[3] ? "<span style=\"font-family:monospace;background-color:#aaa;border-radius:2px\">" : "</span>"
            );
            open[3] = !open[3];
        }

        console.log("ultima suta de metri");
        if(randuri[i].startsWith("# "))
        {
            randuri[i] = "<h1>" + randuri[i].slice(2) + "</h1>";
        }
        
        for(let j = 0; j < tag.length; j++)
        {
            randuri[i] = randuri[i].replace(tag[j], tags[tag[j]]);
        } 
        
        if(randuri[i].startsWith("![") && randuri[i].includes("](") && randuri[i][randuri[i].length - 1] == ")")
        {
            randuri[i] = "<a href=\"" + randuri[i].split("](")[1].split("]")[0].split(")")[0] + "\"><img style=\"width:20vw\" src=\"" + randuri[i].split("](")[1].split("]")[0].split(")")[0] + "\" alt=\"" + randuri[i].split("](")[0].split("![")[1] + "\">";
        }
    }
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
    }
    else
    {
        console.log("nu am găsit limbi în pizdă");
        langButton.innerHTML = "";
    }
    corpus.innerHTML = romanian.join("<br>");
}

function langg()
{
    corpus.innerHTML = switched ? romanian.join("<br>") : english.join("<br>");
    switched = !switched;
}