class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        // add keys for space and arrow keys

        this.keys = this.input.keyboard.addKeys('SPACE, UP, DOWN, LEFT, RIGHT, C, P');

        // Create a red background
        this.background = this.add.rectangle(0, 0, w, h, 0xBC544B).setOrigin(0, 0);

        let dimensions = (w + h) / 2.2;

        // Create a black background behind the grid
        this.gridBackground = this.add.rectangle(w / 2, h / 2, dimensions, dimensions, 0x000000).setOrigin(0.5, 0.5);

        this.grid = new Grid(this, w/2, h/2 + dimensions/10, dimensions, dimensions, 10).setDepth(0);

        this.player = new Player(this, 5, 5, 'chef').setScale(3).setDepth(2);

        // create items array
        this.items = [];
        // create a fork item at 6, 6
        this.fork = new Item(this, 6, 6, 'fork').setScale(0.2);

        // add fork to items array
        this.items.push(this.fork);

        // add subtitle text object at the bottom of the screen
        this.style = { fontFamily: 'Courier', fontSize: '24px', color: '#FFFFFF', align: 'center' };
        this.subtitle = this.add.text(w/2, h - 50, 'Press SPACE to start', this.style).setOrigin(0.5, 0.5);

    }

    actionCheck() {
        this.items.forEach((item) => {
            item.action();
        });
    }

    locationCheck() {
        this.subtitle.text = this.player.gridX + " " + this.player.gridY;
        msg.text = this.player.gridX + " " + this.player.gridY;
        speechSynthesis.speak(msg);
    }

    update() {
        this.input.keyboard.on('keydown', (event) => {
            this.actionCheck();
        });

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
