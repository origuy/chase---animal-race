const goGrabber = document.querySelectorAll(".btn")[0];
const startGrabber = document.querySelectorAll(".btn")[1];
const againGrabber = document.querySelectorAll(".btn")[2];
const dog = document.querySelector(".dog");
const bird = document.querySelector(".bird");
const duck = document.querySelector(".duck");
const chick = document.querySelector(".chick");
const winnerP = document.querySelector("#winnerName");
const dialog = document.querySelector("#dialogElement");
const bgAudio = new Audio("/assets/music/0139. Picnic - AShamaluevMusic.mp3")
const birdAudio = new Audio("/assets/music/mixkit-toy-whistler-bird-sound-18.wav")
const chickAudio = new Audio("/assets/music/mixkit-chickens-clucking-short-1772.wav")
const dogAudio = new Audio("/assets/music/mixkit-dog-barking-twice-1.wav")
const duckAudio = new Audio("/assets/music/mixkit-chicken-hens-clucking-1768.wav")
const birdFinish = false;
const chickFinish = false;
const dogFinish = false;
const duckFinish = false;


//given OBJ
let runners = {
        dog: {
            "name": "dog",
            "id": dog,
            "voice": dogAudio,
            "img": "/assets/gif/dog.gif",
            "step":230,
            "position": 0,
            "finised": false
        },
        bird: {
            "name": "bird",
            "id": bird,
            "voice": birdAudio,
            "img": "/assets/gif/bird.gif",
            "step": 280,
            "position": 0,
            "finised": false
        },
        duck: {
            "name": "duck",
            "id": duck,
            "voice": duckAudio,
            "img": "/assets/music/mixkit-chicken-hens-clucking-1768.wav",
            "step": 180,
            "position": 0,
            "finised": false
        },
        chick: {
            "name": "chick",
            "id": chick,
            "voice": chickAudio,
            "img": "/assets/gif/chick.gif",
            "step": 150,
            "position": 0,
            "finised": false
        }
}

let move = () => {
    let animalPick = randomUser();
    let animalGrabber = animalPick.id;
    animalPick.position = animalPick.position +  animalPick.step;
    animalGrabber.style.border = "5px dashed #000000";
    if(animalPick.position < 1740){
        setTimeout(() => {
            animalGrabber.style.left = `${animalPick.position}px`;
        }, 1000);
    }else{
        animalGrabber.style.left = `1740px`;
    }
    setTimeout(() => {
        animalGrabber.style.border = "none"
    }, 3000);
    fairPlay(animalPick)
    isWin(animalPick)
};
let startGame = () => {
    bird.style.left = `0px`
    duck.style.left = `0px`
    dog.style.left = `0px`
    chick.style.left = `0px`
    bird.position = 0
    duck.position = 0
    dog.position = 0
    chick.position = 0
    // dialog.hasAttribute("open") ?  dialog.toggleAttribute("open") : ''
    goGrabber.removeAttribute("disabled")
    goGrabber.style.backgroundColor = "#6788AF"
    goGrabber.style.opacity = "1"

};
let playAgain = () => {
   startGame()
};
let randomUser = () => {
    let ran = Math.floor(Math.random() * 4 );
    let animal;
    switch (ran) {
        case 0:
            runners.bird.finised === true ? randomUser() :  animal = runners.bird
            break;
        case 1:
            runners.chick.finised === true ? randomUser() :  animal = runners.chick 
           break;
        case 2:
            runners.dog.finised === true ? randomUser() :  animal = runners.dog
            break;
        case 3:
            runners.duck.finised === true ? randomUser() :  animal = runners.duck
            break;
    
        default:
            break;
    }
    return animal

};
let isWin = (animal) => {
    if(animal.position >= 1770){
        console.log(`${animal.name} WIN !!`)
        goGrabber.removeAttribute("disabled")
        animal.finised = true;
        animal.voice.play();
        if(runners.bird.finised === true || runners.chick.finised === true || runners.duck.finised === true || runners.dog.finised === true){
            winnerP.innerHTML = animal.name;
            dialog.toggleAttribute("open")
            goGrabber.setAttribute("disabled")
            setTimeout(() => {
                dialog.toggleAttribute("open")
                playAgain()
            }, 5000);
        }

    }
}
let fairPlay = (animal) => {
    switch (animal.name) {
        case "bird":
            if(animal.position > 600 && animal.step >= 50 ){
                animal.step = (animal.step - (animal.step * 0.30)) 
               
            }else if(animal.step <= 50){
                 animal.step = 50;
            }

            console.log(`${animal.name}   ${animal.step}`)
            break;
        case "chick":
            if(animal.position > 1200 && animal.step >= 50 ){
                animal.step = (animal.step - (animal.step * 0.05)) 
            }else if(animal.step <= 50){
                animal.step = 50;
            }
            break;
        case "dog":
            if(animal.position > 600 && animal.step >= 50 ){
                animal.step = (animal.step - (animal.step * 0.3)) 
            }else if(animal.step <= 50){
                animal.step = 50;
            }
            console.log(`${animal.name}   ${animal.step}`)
            break;
        case "duck":
            if(animal.position > 1200 && animal.step >= 50 ){
                animal.step = (animal.step - (animal.step * 0.05)) 
            }else if(animal.step <= 50){
                animal.step = 50;
            }
            console.log(`${animal.name}   ${animal.step}`)
            break;
    
        default:
            break;
    }
}

goGrabber.addEventListener('click', move);
startGrabber.addEventListener('click', startGame);
againGrabber.addEventListener('click', playAgain);


function render () {
    bird.style.left = `1500px`
    duck.style.left = `800px`
    dog.style.left = `400px`
    chick.style.left = `1200px`
    dialog.removeAttribute("open")
    bgAudio.play();
}
render()
