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
		this.gridX = x;
		this.gridY = y;
		this.moving = false;
        this.keyboard = Phaser.Input.Keyboard;
		this.keys = this.scene.input.keyboard.addKeys(
			"UP, DOWN, LEFT, RIGHT, SPACE"
		);
		scene.add.existing(this);

	}

	tweenToPoint(x, y) {
		this.scene.tweens.add({
			targets: this,
			x: x,
			y: y,
			duration: 175,
			ease: "Power1",
			onComplete: () => {
				this.moving = false;
			},
		});
	}

	moveCharacter(dX, dY) {
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

        console.log(this.gridX, this.gridY, dX, dY, newPoint);
		this.tweenToPoint(newPoint[0], newPoint[1]);
		this.gridY += dY;
		this.gridX += dX;
	}

	update() {
		if (this.keyboard.JustDown(this.keys.UP)) {
			this.moveCharacter(0, -1);
            playerMsg.text = "Up was pressed";
            speechSynthesis.speak(playerMsg);
		} else if (this.keyboard.JustDown(this.keys.DOWN)) {
            this.moveCharacter(0, 1);
            playerMsg.text = "Down was pressed";
            speechSynthesis.speak(playerMsg);
        } else if (this.keyboard.JustDown(this.keys.LEFT)) {
            this.moveCharacter(-1, 0);
            playerMsg.text = "Left was pressed";
            speechSynthesis.speak(playerMsg);
        } else if (this.keyboard.JustDown(this.keys.RIGHT)) {
            this.moveCharacter(1, 0);
            playerMsg.text = "Right was pressed";
            speechSynthesis.speak(playerMsg);
        }
	}
}
