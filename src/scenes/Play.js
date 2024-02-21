class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        // add keys for space and arrow keys

        this.keys = this.input.keyboard.addKeys('SPACE, UP, DOWN, LEFT, RIGHT');

        this.keyList = Object.keys(this.keys);

        this.grid = new Grid(this, w/2, h/2, w, h, 10);

        this.player = new Player(this, 5, 5, 'player');
    }

    update() {
        this.player.update();

        if (Phaser.Input.Keyboard.JustDown(this.keys.SPACE)) {
            msg.text = "Space was pressed";
            speechSynthesis.speak(msg);
        }

    }
}
