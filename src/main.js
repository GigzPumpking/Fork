let config = {
    type: Phaser.WEBGL,
    width: 1200,
    height: 675,
    pixelArt: true,
    scale: {
        //mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            fps: 60
        }
    },
    scene: [ Load, Title, Play ]
}

if ('speechSynthesis' in window) {
    // Speech Synthesis supported 🎉
    console.log("Your browser supports speech synthesis");
} else {
    // Speech Synthesis Not Supported 😣
    alert("Sorry, your browser doesn't support text to speech!");
}

let game = new Phaser.Game(config);

let w = game.config.width;
let h = game.config.height;