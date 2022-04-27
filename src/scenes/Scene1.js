class Scene1 extends Phaser.Scene {
    constructor() {
        super("Scene1");
    }

    preload() {
 
        // load image
        this.load.image('background', './assets/background.png');
        this.load.image('road', './assets/road.png');
        this.load.image('character', './assets/character.png');
        this.load.image('block', './assets/block.png');
        this.load.image('vblock1', './assets/verticalblock2.png');
        this.load.image('vblock2', './assets/verticalblock3.png');
        this.load.audio('jump', './assets/jump.wav');
        this.load.audio('dead', './assets/dead.wav');
        //this.load.spritesheet('character', './assets/texture_atlas.png', {frameWidth: 270, frameHeight: 270});
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    create() {
        this.level = 370; 
        this.gamespeed = 3;
        this.ACCELERATION = 1500;
        this.JUMP_VELOCITY = -900;
        this.MAX_JUMPS = 2;
        this.DRAG = 600;
        this.MAX_X_VEL = 500;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.physics.world.gravity.y = 2600;
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);
        this.ground = this.physics.add.sprite(0, game.config.height - 30, 'road').setOrigin(0,0);
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;
        this.character = this.physics.add.sprite(120, 600, 'character').setScale(0.4);
        this.character.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.character.setCollideWorldBounds(true);
        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.character, this.ground);

        // this.anims.create({
        //     key: 'run',
        //     frames: this.anims.generateFrameNames('character', {start: 1, end: 3})
        // });

        //score
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    } 
  

    update() {
        this.background.tilePositionX += this.gamespeed;
        this.ground.tilePositionX += this.gamespeed;
        this.gamespeed += 0.003;
        this.level += 0.2;
        this.score += 1;
        this.scoreText.setText('Score: ' + this.score);
        
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start('Scene1');
        }
        
        this.random = Phaser.Math.RND.integerInRange(1, 450);
        if(1 == this.random){
            this.block = this.physics.add.sprite(1500, 660, 'block').setScale(0.5);
            this.block.body.setVelocityX(- this.level);
            this.block.body.allowGravity = false
            this.block.body.immovable = true;
            this.physics.add.collider(this.character, this.block);
        }
        else if (2 == this.random){
            this.block2 = this.physics.add.sprite(1500, 620, 'vblock1').setScale(0.5);
            this.block2.body.setVelocityX(- this.level);
            this.block2.body.allowGravity = false
            this.block2.body.immovable = true;
            this.physics.add.collider(this.character, this.block2);
        }
        else if (3 == this.random){
            this.block3 = this.physics.add.sprite(1500, 585, 'vblock2').setScale(0.5);
            this.block3.body.setVelocityX(- this.level);
            this.block3.body.allowGravity = false
            this.block3.body.immovable = true;
            this.physics.add.collider(this.character, this.block3);
        }
        // check keyboard input 
        if(cursors.left.isDown) {
            this.character.body.setAccelerationX(-this.ACCELERATION);
            this.character.setFlip(true, false);
            //this.character.anims.play('run', true);
        } else if(cursors.right.isDown) {
            this.character.body.setAccelerationX(this.ACCELERATION);
            this.character.resetFlip();
            //this.character.anims.play('run', true);
        } else if(cursors.down.isDown) {
            this.physics.world.gravity.y = 20000; 
        } else {
            // set acceleration to 0 so DRAG will take over
            this.character.body.setAccelerationX(0);
            this.character.body.setDragX(this.DRAG);
            
        }
        // check if alien is grounded
	    this.character.isGrounded = this.character.body.touching.down;
	    // if so, we have jumps to spare
	    if(this.character.isGrounded) {
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
	    } 
        // allow steady velocity change up to a certain key down duration
	    if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 150)) {
	        this.character.body.velocity.y = this.JUMP_VELOCITY;
	        this.physics.world.gravity.y = 2600;
            this.jumping = true;
	    }

	    if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
	    	this.jumps--;
	    	this.jumping = false;
            this.sound.play('jump'); 
	    }

        if(this.character.body.touching.right || this.character.body.touching.left)
        {
        // player is dead
        this.sound.play('dead'); 
        this.scene.start('over');
        }
    }
}
