/* global Phaser */
$(document).ready(function () {
    'use strict';
    window.opspark = window.opspark || {};
    let 
        opspark = window.opspark,
        game = opspark.createGame(create, update),
        lives = 250;
        
    function create() {
        game.opspark.init();
        
        opspark.platform.factory(game);
        opspark.platform.init(game);
        
        opspark.collectable.factory(game);
        opspark.collectable.init(game);
        
        opspark.cannon.factory(game);
        opspark.cannon.init(game);
        
        opspark.player.init(game);
        
        const textOpts = { fontSize: '100px', fill: '#000' };
        game.score = game.add.text(16, 16, 'SCORE: 0', textOpts);
        game.lives = game.add.text(16, 150, 'LIVES: ' + lives, textOpts);
    }


    function update() {
        const asset = game.player.asset,
              playerManager = game.playerManager,
              collectable = game.collectable;
        
        game.physics.arcade.collide(asset, game.platforms);
        game.physics.arcade.collide(asset, game.projectile);
        game.physics.arcade.collide(collectable, game.platforms);
        game.physics.arcade.overlap(asset, collectable, collectDb, null, this);
        game.physics.arcade.overlap(asset, game.projectile, onProjectileOverlap, null, this);
        
        playerManager.update();
    }

    function onProjectileOverlap() {
        console.log('Halle hit!');
        game.player.die();
        decrementLives();
        if(lives > 0){
            opspark.player.init(game);
        } 
    }
    function decrementLives(){
        if(lives !== 0){
            lives--;
            game.lives.text = 'LIVES ' + lives;            
        } else {
            setTimeout(() => game.lives.text = "you lose lol", 500);
        } 
    }

    function collectDb(player, collectable) {
        game.score.text = 'SCORE: ' + (parseInt(/\s+(\S*)$/.exec(game.score.text)[1], 10) + collectable.type.points);
        collectable.kill();
    }

});
