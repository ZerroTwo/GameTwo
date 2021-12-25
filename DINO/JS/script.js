
const Application = PIXI.Application;
const app = new Application();




let playerSheet = {},
   dir = 'walk',
   jumpPressed = false,
   jumpCount = 17,
   jumpHeight = 120,
   jumpUp = true,
   jumpDown = false;



let spriteCould = [];





let speedGround = 2;







let score = 0,
   statusGame = true;












app.renderer.backgroundColor = 0x808080;
app.renderer.resize(900, 500);


document.querySelector('.playground').appendChild(app.view);



app.loader.add('dino', './IMG/sprite.png');

app.loader.load(doneLoading);



function doneLoading() {
   document.addEventListener('keydown', keyDown);
   document.addEventListener('keyup', keyUp);



   createPlayerSheet();
   createPlayer();

   // createEnemySheet();
   // createEnemy();

   createCloud();

};











function createPlayerSheet() {
   const sheet = new PIXI.BaseTexture.from(app.loader.resources['dino'].url);

   let widthRunDino = 88,
      heightRunDino = 96;

   let widthDownDino = 118,
      heightDownDino = 60;


   playerSheet['standEast'] = [
      new PIXI.Texture(sheet, new PIXI.Rectangle(1338, 0, widthRunDino, heightRunDino)),
   ];



   playerSheet['walkEast'] = [
      new PIXI.Texture(sheet, new PIXI.Rectangle(1514, 0, widthRunDino, heightRunDino)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(1602, 0, widthRunDino, heightRunDino)),
   ];


   playerSheet['walkDownEast'] = [
      new PIXI.Texture(sheet, new PIXI.Rectangle(1866, 36, widthDownDino, heightDownDino)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(1984, 36, widthDownDino, heightDownDino)),
   ];



};

function createPlayer() {
   dino = new PIXI.AnimatedSprite(playerSheet.standEast);
   dino.anchor.set(1);
   dino.animationSpeed = 0.2;

   dino.x = 200;
   dino.y = app.view.height - 100;

   dino.loop = false;
   app.stage.addChild(dino);
   dino.play();


};


function createCloud() {

   let randomNum = Math.random();

   let random = randomNum > 0.3 ? randomNum : 0.3;



   const texturSprite = PIXI.Sprite.from('IMG/cloud.png');


   texturSprite.x = app.view.width + 100;
   texturSprite.y = random * 100;

   texturSprite.scale.set(random * 0.4);

   texturSprite.speed = random * 4;

   spriteCould.unshift(texturSprite);

   app.stage.addChild(texturSprite);
};



function keyDown(e) {
   if (e.keyCode == 38) {
      dir = 'up';
   };
   if (e.keyCode == 40) {
      dir = 'down';
   };
   statusGame = false;
};
function keyUp(e) {
   dir = 'walk';
};







function gameLoop() {
   if (statusGame) return;

   //Движение Динозавра
   {
      if (dir == 'walk') {
         if (!dino.playing) {
            dino.textures = playerSheet.walkEast;
            dino.play();
         }
      };
      if (dir == 'down') {
         if (!dino.playing) {
            dino.textures = playerSheet.walkDownEast;
            dino.play();
         }
      };
      if (dir == 'up') {
         dir = '';

         if (jumpPressed) return;
         jumpPressed = true;

      };

      if (jumpPressed) {


         if (jumpUp) {
            if (jumpCount > 0) {
               jumpCount--;
               dino.y -= jumpCount;
            } else {
               jumpUp = false;
               jumpDown = true;
            }
         };



         if (jumpDown) {
            if (jumpCount <= 15) {
               jumpCount++;
               dino.y += jumpCount;
            } else {
               jumpCount = 17;
               jumpPressed = false;
               jumpDown = false;
               jumpUp = true;
            };
         };
      };
   }
   //--------------------------------------------------------------------------------------























   // Could -------------------------------------------------------------------------------


   if (Math.random() > 0.98) {
      if (spriteCould.length < 5) {
         createCloud();
      }
   };

   for (let i = 0; i < spriteCould.length; i++) {

      spriteCould[i].x -= spriteCould[i].speed;

      if (spriteCould[i].x < -200) {
         app.stage.removeChild(spriteCould[i]);
         spriteCould.splice(i, 1);
         console.log(spriteCould);
      };
   };


}
app.ticker.add(gameLoop);