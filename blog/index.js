const corpus = document.getElementById('corpus');
//          **    *     ~~    `
let open = [true, true, true, true]
let randuri = ["gol"]
let ul = false;

fetch("test.txt")
.then(r=>r.text())
.then(text => {
    randuri = text.split("\n");
    parse();
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

function parse()
{
    for(let i = 0; i < randuri.length; i++)
    {
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
    }

    corpus.innerHTML = randuri.join("<br>");
}