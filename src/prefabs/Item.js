class Item extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame) {
		let gridPoint = scene.grid.getPoint(x, y);
		super(scene, gridPoint[0], gridPoint[1], texture, frame);
		this.gridX = x;
		this.gridY = y;

        this.depth = 1;

		scene.add.existing(this);

        this.visible = false;
        this.visibleCheck();

        this.action();
	}

    action() {
        if (!this.visible && this.gridX == this.scene.player.gridX && this.gridY == this.scene.player.gridY) {
            this.visible = true;
            this.visibleCheck();
        }
    }

    visibleCheck() {
        if (this.visible) {
            this.alpha = 1;
        } else {
            this.alpha = 0;
        }
    }

	update() {

	}
}