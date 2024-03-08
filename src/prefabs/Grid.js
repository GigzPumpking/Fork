class Grid extends Phaser.GameObjects.Grid {
	constructor(scene, x, y, width, height, cellWidth, cellHeight) {
		super(
			scene,
			x,
			y,
			width,
			height,
			cellWidth,
			cellHeight,
			0xFF7F7F,
			0.1,
			0xFF7F7F,
			0.5
		);
		// grid is 11 x 5
		this.dimensions = { width: 11, height: 5 };

		scene.add.existing(this);
	}

	getPoint(x, y) {
		let leftMostX =
			this.x -
			this.cellWidth * Math.floor(this.dimensions.width / 2) +
			((this.dimensions.width % 2 == 0) * this.cellWidth) / 2;
		let topMostY =
			this.y -
			this.cellHeight * Math.floor(this.dimensions.height / 2) +
			((this.dimensions.height % 2 == 0) * this.cellHeight) / 2;
		return [leftMostX + x * this.cellWidth + this.cellWidth/12, topMostY + y * this.cellHeight - this.cellHeight/4];
	}

	pointInBounds(x, y) {
		return x >= 0 && x < this.dimensions.width && y >= 0 && y < this.dimensions.height;
	}

}