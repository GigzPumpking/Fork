class Item extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame) {
		let gridPoint = scene.grid.getPoint(x, y);
		super(scene, gridPoint[0], gridPoint[1], texture, frame);
		this.gridX = x;
		this.gridY = y;

        this.depth = 3;
        this.pickedUp = false;

		scene.add.existing(this);
        scene.items.push(this);

        this.visible = false;
        this.visibleCheck();

        this.action();
	}

    action() {
        if (!this.visible && this.gridX == this.scene.player.gridX && this.gridY == this.scene.player.gridY && !this.pickedUp) {
            this.visible = true;
            this.visibleCheck();
        }
    }

    pickup() {
        if (this.visible && this.gridX == this.scene.player.gridX && this.gridY == this.scene.player.gridY && !this.pickedUp) {
            this.visible = false;
            this.visibleCheck();
            this.pickedUp = true;
            return true;
        }

        return false;
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