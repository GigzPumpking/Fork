class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        // add keys for space and arrow keys

        this.keys = this.input.keyboard.addKeys('SPACE, UP, DOWN, LEFT, RIGHT, C, P');

        this.keyList = Object.keys(this.keys);

        // Create a red background
        this.background = this.add.rectangle(0, 0, w, h, 0xBC544B).setOrigin(0, 0);

        let dimensions = (w + h) / 2.2;

        // Create a black background behind the grid
        this.gridBackground = this.add.rectangle(w / 2, h / 2, dimensions, dimensions, 0x000000).setOrigin(0.5, 0.5);

        this.grid = new Grid(this, w/2, h/2, dimensions, dimensions, 10);

        this.player = new Player(this, 5, 5, 'chef').setScale(3);
    }

    update() {
        this.player.update();

        if (Phaser.Input.Keyboard.JustDown(this.keys.SPACE)) {
            msg.text = "Space was pressed";
            speechSynthesis.speak(msg);
        }

        if (Phaser.Input.Keyboard.JustDown(this.keys.C)) {
            msg.text = "Arrow keys to move, C to read controls, P for position, SPACE to start";
            speechSynthesis.speak(msg);
        }

        if (Phaser.Input.Keyboard.JustDown(this.keys.P)) {
            msg.text = this.player.gridX + " " + this.player.gridY;
            speechSynthesis.speak(msg);
        }

    }
}
