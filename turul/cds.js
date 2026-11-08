export let tunes = [];

const titles = ["peachy","fugees","a7x","beachboys","lisastansfield","bazooka","americanidiotsingle","luckyyou","shaggy","pheonix","californication","californication2","minecraft","verve","screen","blablabla","ram","korn","korn2","gossip","2000s","mrvain","tdsotm","punjabimc","tfotl","fancythat","fallen","pinkerton","bytheway","gold","candygirl","galac02","whitepony","noneedtoargue","toxicity","metallica","hybridtheory","smash","tragickingdom","stadiumarcadium","inutero","issues","adrenaline","jestofunk","goanga","theopendoor","meteora","bizkit","five","brat","foal","wheatus","blur","tellme","ash","noangel","noangel2","happiness","fatboyslim","untouchables","weezer","blink","americanidiot","threecheers","gomez","jaggedlittlepill","dookie","feelssogood","lifeforrent","livethroughthis","scorpions","petricamitustoian","haven","thefame","matze","2f2py"]

import Webamp from "https://unpkg.com/webamp@^2";


const diva = document.getElementById('diva');
const vezica = document.getElementById('vezica'); //Se numește vezica de la „Vezi că”, nu de la organ

window.addEventListener("load", async () => {
    const tunes = await (await fetch("./cds.json")).json();

    const tracks = [];

    for (const [key, tune] of Object.entries(tunes)) {
        console.log(`${tune.artist} - ${tune.title}`);

        tracks.push({
            metaData: {
                artist: tune.artist,
                title: tune.title,
            },
            url: `https://cdn.jsdelivr.net/gh/diridam27/postari@main/webamp/${encodeURIComponent(tune.filename)}`
        });
    }

    const webamp = new Webamp({
        availableSkins: [
          {
            url: "/winamp/skin.wsz",
            name: "Diridamp",
          }
        ],
        initialSkin: 
          {
            url: "/winamp/skin.wsz"
          },
        initialTracks: tracks
    });

    webamp.renderWhenReady(document.getElementById("app"));
    webamp.setRepeat(true);

    window.plei = function(tune) {
      console.log(`${tune} - ${titles.indexOf(tune)}`)
      diva.style = `
          display:block;
          position: absolute;
          left: ${tunes[tune].coords.x1};
          top: ${tunes[tune].coords.y1};
          width: ${tunes[tune].coords.x2 - tunes[tune].coords.x1};
          height: ${tunes[tune].coords.y2 - tunes[tune].coords.y1};
          border: 3px solid #444;
          border-radius: 5px;
          background-color:#ff00ff;
          opacity:30%;
      `
      webamp.setCurrentTrack(titles.indexOf(tune));
      webamp.play();
      vezica.style = "display:none"
    }
});

