class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        // add keys for space and arrow keys

        this.keys = this.input.keyboard.addKeys('SPACE, UP, DOWN, LEFT, RIGHT, C, P');

        // Create a red background
        this.background = this.add.rectangle(0, 0, w, h, 0xBC544B).setOrigin(0, 0);

        // Create game background
        this.background = this.add.image(w/2, h/2, 'gameBackground');

        // width = 1200, height = 675
        // horizontal border = 25 to 1120
        // vertical border 157 to 675

        let dimensions = { width: 1120 - 25, height: h - 157}
        let square = (dimensions.width + dimensions.height) / 2;
        let cell = { width: square/8, height: square/8 };

        this.grid = new Grid(this, w/2 - 25, h/2 + cell.height, dimensions.width, dimensions.height, cell.width, cell.height).setDepth(0);

        this.player = new Player(this, 0, 0, 'chef').setScale(6).setDepth(2);

        // create items array
        this.items = [];
        this.fork = new Item(this, 3, 3, 'fork').setScale(0.2);
        this.shortcake = new Item(this, 2, 2, 'shortcake').setScale(3);
        this.strawberry = new Item(this, 4, 4, 'strawberry').setScale(3);
        this.egg = new Item(this, 1, 1, 'egg').setScale(3);

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
