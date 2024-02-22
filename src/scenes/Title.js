const msg = new SpeechSynthesisUtterance();
msg.volume = 1; // From 0 to 1
msg.rate = 0.8; // From 0.1 to 10
msg.pitch = 0.8; // From 0 to 2
msg.text = "Fork";
msg.lang = 'en';

class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {
        // background
        this.background = this.add.tileSprite(
            0,
            0,
            w,
            h,
            'menuBackground'
        ).setOrigin(0, 0);
        
        // title
        this.title = this.add.text(
            w / 2,
            h / 2 - 200,
            'Fork',
            {
                fontFamily: 'Courier',
                fontSize: '48px',
                fontStyle: 'bold',
                color: '#ffffff',
                align: 'center'
            }
        ).setOrigin(0.5);

        // add keys for space and arrow keys

        this.keys = this.input.keyboard.addKeys('SPACE, UP, DOWN, LEFT, RIGHT');

        this.keyList = Object.keys(this.keys);

        speechSynthesis.speak(msg);

        msg.text = "Press SPACE to start";

        speechSynthesis.speak(msg);
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(this.keys.SPACE)) {
            msg.text = "Space was pressed";
            speechSynthesis.speak(msg);
            this.scene.start('playScene');
        }

    }
}
