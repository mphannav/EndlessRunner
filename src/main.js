//game title: The Great Wall Runner
//collaborator names: Daniel Zhong, Tingyuan Lu, Tszho Mak
//date completed: 7/10/2021

//creative tilt justification: 
//1. We have great music and theme(Chinese style theme(the great wall)). We got jumping and dead sound effect and chinese temple style background music. 
//2. The game will get faster and faster to increase difficulty. (in Scene1.js update())
//3. The character can step on the blocks but can't touch the left and right part of the blocks, this will let player surive longer(in Scene1.js).
//4. Our score system counts score automatically as the game go on(in Scene1.js)
let cursors;
const SCALE = 0.5;


let config = {
    type: Phaser.WEBGL,
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    
    scene: [menu, Scene1, over]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keySPACE, keyR, keyM, keyP;
