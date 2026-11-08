const terminal = document.getElementById("terminal");
const inputField = document.getElementById("input");
const editor = document.getElementById("editor");

var culori = ["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgrey","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","grey","green","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgrey","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"]

var rendered = false;
var editorOn = false;
var terminat = document.getElementById("terminal");
var UltimaComanda = "";

const app = document.getElementById("webamp-app")
const webamp = new Webamp();

var PWD = "stracur";

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

function doThisWithTheInput(input) {
    UltimaComanda = input;
    if(input.split(" ")[0] == "help" || input.split(" ")[0] == "ajutor")
    {
        return "Aici ai lista cu comenzi:\nhelp - afiseaza aceasta lista\najutor - afiseaza aceasta lista";
    }
    else if(input.split(" ")[0] == "cowsay")
    {
        return(cowsay(input));
    }
    else if(input.split(" ")[0] == "clear")
    {
        var cateLinii = terminal.innerHTML.split("<div>").length + terminal.innerHTML.split("\n").length - 4;
        terminal.innerHTML = ""
        return input.split(" ").includes("-v") ? `Au fost șterse ${cateLinii} linii` : "";
    }
    else if(input.split(" ")[0] == "detalii" || input.split(" ")[0] == "neofetch")
    {
        return `${input.split(" ")[0] == "neofetch" ? `! Această comandă nu este chiar neofetch, comanda pentru ea este „detalii” dar merge și „neofetch” pentru familiaritate \n\n` : ``}          ====              Ora - ${new Date().toLocaleString()}\n          ====              Platformă - ${navigator.appName} <- probabil greșit\n    ===========             RAM dispoinbil - ${navigator.deviceMemory}\n ====   =======             Nuclee - ${navigator.hardwareConcurrency}\n=====    ======= ========   Culori - ${window.screen.colorDepth }\n=========================   Rezoluție - ${window.screen.width} x ${window.screen.height}\n=================           Browser - ${navigator.appVersion}\n ================           Limbă - ${navigator.language}\n   ============             E pe telefon? - ${mobileCheck() ? "da":"nu"}`
    }
    else if(input.split(" ")[0] == "webamp")
    {
        if(input.split(" ").length != 1 && !input.split(" ").includes("-v"))
        {
            var dictwebamp =
            {
                "pause":"Am dat pauză",
                "prev":"Se redă melodia anterioară",
                "play":"Se redă",
                "next":"Se redă următoarea melodie",
                "stop":"S-a pus stop",
                "close":"S-a închis Webamp"
            }
            if(input.split(" ").includes("pause"))
                webamp.pause();
            if(input.split(" ").includes("prev") || input.split(" ").includes("previous"))
                webamp.previousTrack();
            if(input.split(" ").includes("play"))
                webamp.play();
            if(input.split(" ").includes("next"))
                webamp.nextTrack();
            if(input.split(" ").includes("stop"))
                webamp.stop();
            if(input.split(" ").includes("close"))
                webamp.close();
            return input.split(" ").includes("-v") ? dictwebamp.input.split(" ")[0] : ``;
        }else{
            if(rendered)
                {
                    webamp.reopen();
                }else{
                    webamp.renderWhenReady(app);
                    rendered = true;
                }
                return input.split(" ").includes("-v") ? `S-a deschis Webamp` : ``;
        }
    }
    else if(input.split(" ")[0] == "color" || input.split(" ")[0] == "col")
    {
        if(input.split(" ").length != 3)
        {
            return `Număr invalid de argumente - ${input.split(" ").length}. ${input.split(" ")[0]} necesită 3 argumente. Pentru mai multe detalii scrie „help ${input.split(" ")[0]}”.`
        }
        else
        {
        
            terminat.style.backgroundColor = `${culori.includes(input.split[1]) ? `` : `#`}${input.split(" ")[1].replace("#", "")}`;
            terminat.style.color = `${culori.includes(input.split[2]) ? `` : `#`}${input.split(" ")[2].replace("#", "")}`;
            terminat.style.borderColor = `${culori.includes(input.split[2]) ? `` : `#`}${input.split(" ")[2].replace("#", "")}`;
        }
    }
    else if(input.split(" ")[0] == "editor")
    {
        editorOn ? editor.style.display = "none" : editor.style.display = "inline";
        editorOn = !editorOn;
    }
    else if(input.split(" ")[0] == "echo")
    {
        return schimba(input).split(" ").slice(0, 0).concat(schimba(input).split(" ").slice(1)).join(" ");
    }
    else if(input.split(" ")[0] == "literemari")
    {
        return schimba(input).split(" ").slice(0, 0).concat(schimba(input).split(" ").slice(1)).join(" ").toUpperCase();
    }
    else if(input.split(" ")[0] == "literemici")
    {
        return schimba(input).split(" ").slice(0, 0).concat(schimba(input).split(" ").slice(1)).join(" ").toLowerCase();
    }
    else if(input.split(" ")[0] == "tradu")
    {
        return input.includes(" in ") ? tradu(schimba(input).split(" ").slice(0, 0).concat(schimba(input).split(" ").slice(1)).join(" ").split(" in ")[0], schimba(input).split(" ").slice(0, 0).concat(schimba(input).split(" ").slice(1)).join(" ").split(" in ")[1]) : "Sintaxă greșită. Pentru detalii rulează „ajutor tradu”.";
    }
    else if(input.split(" ")[0] == "antante" || "alabala")
    {
        return schimba(input).split(" ").slice(0, 0).concat(schimba(input).split(" ").slice(1)).join(" ").split(" ")[Math.floor(Math.random() * schimba(input).split(" ").slice(0, 0).concat(schimba(input).split(" ").slice(1)).join(" ").split(" ").length)];
    }
    else
    {
        return `Comandă necunoscută - ${input.split(" ")[0]}`;
    }
}

function output(text) {
    const line = document.createElement("div");
    line.textContent = text;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;

}

function schimba(text) {
    while (text.includes("$(")) {
        text = text.replace(/\$\((.*?)\)/g, (_, match) => doThisWithTheInput(match));
    }
    return text;
}


async function tradu(text, targetLang) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data[0].map(item => item[0]).join(""); // Extract translated text
    } catch (error) {
        console.error("Translation error:", error);
        return "Nu a vrut - " + error;
    }
}

inputField.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const input = inputField.value;
        output(`d- ${input}`);
        const response = doThisWithTheInput(input);
        output(response);
        inputField.value = "";
    }
    else if(event.key === "ArrowUp")
    {
        inputField.value = UltimaComanda;
        console.log("sagsus")
    }
});
