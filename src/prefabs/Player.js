const playerMsg = new SpeechSynthesisUtterance();
playerMsg.volume = 1; // From 0 to 1
playerMsg.rate = 0.8; // From 0.1 to 10
playerMsg.pitch = 0.8; // From 0 to 2
playerMsg.text = "";
playerMsg.lang = 'en';

class Player extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame) {
		let gridPoint = scene.grid.getPoint(x, y);
		super(scene, gridPoint[0], gridPoint[1], texture, frame);
		this.scene = scene;
		this.gridX = x;
		this.gridY = y;
		this.moving = false;
        this.keyboard = Phaser.Input.Keyboard;
		this.keys = this.scene.input.keyboard.addKeys(
			"UP, DOWN, LEFT, RIGHT, SPACE"
		);

		// load chef animations
		this.anims.create({
			key: "chef_walk",
			frames: this.anims.generateFrameNumbers("chef_walk", {
				start: 0,
				end: 5,
				first: 0,
			}),
			frameRate: 10,
			repeat: -1,
		});

		this.anims.create({
			key: "chef_idle",
			frames: this.anims.generateFrameNumbers("chef_idle", {
				start: 0,
				end: 0,
				first: 0,
			}),
			frameRate: 10,
			repeat: -1,
		});

		this.play("chef_idle");

		scene.add.existing(this);

	}

	tweenToPoint(x, y) {
		this.scene.tweens.add({
			targets: this,
			x: x,
			y: y,
			duration: 175*5,
			ease: "Power1",
			onStart: () => {
				this.play("chef_walk");
			},
			onComplete: () => {
				this.moving = false;
				this.play("chef_idle");
			},
		});
	}

	moveCharacter(dX, dY) {
		if (dX < 0) this.flipX = true;
		else this.flipX = false;

		if (this.moving) {
			return;
		}
		if (!this.scene.grid.pointInBounds(this.gridX + dX, this.gridY + dY)) {
			return;
		}
		this.moving = true;
		let newPoint = this.scene.grid.getPoint(
			this.gridX + dX,
			this.gridY + dY
		);

		this.tweenToPoint(newPoint[0], newPoint[1]);
		this.gridY += dY;
		this.gridX += dX;

		this.scene.locationCheck();
	}

	update() {
		if (this.keyboard.JustDown(this.keys.UP)) {
			this.moveCharacter(0, -1);
		} else if (this.keyboard.JustDown(this.keys.DOWN)) {
            this.moveCharacter(0, 1);
        } else if (this.keyboard.JustDown(this.keys.LEFT)) {
            this.moveCharacter(-1, 0);
        } else if (this.keyboard.JustDown(this.keys.RIGHT)) {
            this.moveCharacter(1, 0);
        }
	}
}
