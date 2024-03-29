class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // set base path for assets
        this.load.path = './assets/';
        // load menu background
        this.load.image('menuBackground', 'menuBackground.png');

        // load game background
        this.load.image('gameBackground', 'Fork_Kitchen.png');
        this.load.image('gameBackground2', 'Fork_KitchenMove.png');

        // load items
        this.load.image('fork', 'fork.png');
        this.load.image('shortcake', 'Fork_Shortcake.png');
        this.load.image('strawberry', 'ForkStrawberry.png');
        this.load.image('egg', 'ForkEgg.png');
        this.load.image('oil', 'ForkOil.png');
        this.load.image('sugar', 'ForkSugar.png');
        this.load.image('whipped_cream', 'ForkWhippedCream.png');
        
        // load player
        this.load.image('chef', 'chef_spritesheet.png');

        // load chef animations
        this.load.spritesheet('chef_walk', 'chef_spritesheet.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 5});
        this.load.spritesheet('chef_idle', 'chef_spritesheet.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 0});

        // loading bar
        // See: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });
    }

    create() {
        this.scene.start('titleScene');
    }
}
