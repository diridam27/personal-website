window.onload = function() {
    fetch("./iteme.json")
    .then(r=>r.text())
    .then(text => {
        iteme = JSON.parse(text);
        console.log(iteme);
    })
};

const pe = document.getElementById("pe");
const diva = document.getElementById("diva");

function show(ata)
{
    pe.innerHTML = "<b>" + iteme[ata].text.title + "</b><br>" + iteme[ata].text.desc;
    diva.style = `
        left: ${iteme[ata].coords.x1}px;
        top: ${iteme[ata].coords.y1}px;
        width: ${iteme[ata].coords.x2 - iteme[ata].coords.x1}px;
        height: ${iteme[ata].coords.y2 - iteme[ata].coords.y1}px;
        border: 3px solid #ec43e4; z-index: 10;
        position:absolute;
        border-radius:15px
    `
}