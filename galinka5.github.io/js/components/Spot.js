class Spot extends Phaser.GameObjects.Sprite{


    constructor(config) {
        super(config.scene, config.x, config.y, 'spotTile', config.key);
        config.scene.add.existing(this);
        this.selected = false;
        this.normalScale = config.size / this.width;
        this.setScale(this.normalScale, this.normalScale);
    }

    set Selected(value) {
        this.selected = value;
        if (this.selected) {
            this.setScale(this.normalScale * 1.15, this.normalScale * 1.15);
        } else {
            this.setScale(this.normalScale, this.normalScale);
        }
    }
    
    setPositionOnGrid(newRow, newCol) {
        this.row = newRow;
        this.col = newCol;
    }
}