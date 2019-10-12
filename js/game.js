/**
 * Main class for game Spots
 *
 * @author Halyna Kyryliuk
 * */
const gameState = {
   score_p: 0,
	 score_o: 0
 };

 //window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio

 const config = {
   type: Phaser.CANVAS,
   width: window.innerWidth * window.devicePixelRatio,
   height: window.innerHeight * window.devicePixelRatio,
   backgroundColor: "b9eaff",
	 physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        parent: "game_container",
        autoCenter: Phaser.Scale.CENTER_BOTH,
        ratio: window.devicePixelRatio / 3,
        size: Math.min(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio)
    },
    autoRound: false,
     scene: [SelectScreen, GameScreen]
 }

 const game = new Phaser.Game(config);
