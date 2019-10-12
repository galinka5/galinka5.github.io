class SelectScreen extends Phaser.Scene {

	constructor() {
		super({ key: 'SelectScreen' });
	}

	preload(){
			this.load.spritesheet('spotTile' , 'assets/spots1.png', { frameWidth: 60, frameHeight: 60 });
			this.load.image('btn', 'assets/ButtonArrowUpSprite.png');
	}

  create() {
      this.screenControls = {};
      console.log(config.scale.ratio);
		this.screenControls.caption = this.add.text(config.width/2, config.height/6, 'Click to Start!', {fontFamily: 'Verdana',fill: '#000000', fontSize: '40px'})
        this.screenControls.caption.x = (config.width - this.screenControls.caption.width) / 2;
        this.screenControls.caption.setScale(config.scaleRatio);
        this.screenControls.startBtn = this.createButton('btn', config.width / 2, config.height / 2);
        this.screenControls.startBtn.setScale(config.scale.ratio);
		this.screenControls.startBtn.on('pointerup', ()=> {
					this.scene.stop('SelectScreen')
					this.scene.start('GameScreen')
		});
  }

	createButton(id, pos_x, pos_y){
		let res = this.add.sprite(pos_x, pos_y, id);
		res.setInteractive();
		return res;
	}
}
