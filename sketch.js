var boy, idleBoy, runningBoy, idleBoyLeft, boyjumps, runningBoyLeft
var fireBall, fireballImg, fire,fireBallGroup,fireBallSound
var enemy, enemyWalk, enemyAttack, enemyDies, enemyHurt, Idle_enemy, Enemy, enemy_killed = 0, enemyGroup
var groundImg,ground,ground2
var count = 0
var mp = 100
//hp = health points
var hp = 100
var enemy_hp = 100
var wave = 1

var hp_potion

var gameState = 'play'

function preload()
{
    groundImg=loadImage('Images/Ground/Ground.png')

    idleBoy=loadAnimation("images/Playing Character/Standing1.png","images/Playing Character/Standing2.png"
    ,"images/Playing Character/Standing3.png","images/Playing Character/Standing4.png")

    runningBoy=loadAnimation("images/Playing Character/Running1.png","images/Playing Character/Running2.png"
    ,"images/Playing Character/Running3.png","images/Playing Character/Running5.png","images/Playing Character/Running4.png"
    ,"images/Playing Character/Running6.png")

    idleBoyLeft = loadAnimation("images/Playing Character/Playing Character Left/Standing1 (2).png"
    ,"images/Playing Character/Playing Character Left/Standing2 (2).png"
    ,"images/Playing Character/Playing Character Left/Standing3 (2).png"
    ,"images/Playing Character/Playing Character Left/Standing4 (2).png")

    runningBoyLeft = loadAnimation("images/Playing Character/Playing Character Left/Running1 (2).png"
    ,"images/Playing Character/Playing Character Left/Running2 (2).png"
    ,"images/Playing Character/Playing Character Left/Running3 (2).png"
    ,"images/Playing Character/Playing Character Left/Running4 (2).png"
    ,"images/Playing Character/Playing Character Left/Running5 (2).png"
    ,"images/Playing Character/Playing Character Left/Running6 (2).png")

    boyjumps = loadAnimation("images/Playing Character/Jump1.png","images/Playing Character/Jump2.png",
    "images/Playing Character/Jump3.png")

    fireballImg = loadAnimation("images/Attack Type/Fireball/Fireball1.png","images/Attack Type/Fireball/Fireball2.png"
    ,"images/Attack Type/Fireball/Fireball3.png","images/Attack Type/Fireball/Fireball4.png"
    ,"images/Attack Type/Fireball/Fireball5.png")

    enemyWalk = loadAnimation("images/Enemy/Enemy2/Enemy Walk/Enemy 2 (5).png",
    "images/Enemy/Enemy2/Enemy Walk/Enemy 2 (6).png","images/Enemy/Enemy2/Enemy Walk/Enemy 2 (7).png",
    "images/Enemy/Enemy2/Enemy Walk/Enemy 2 (8).png","images/Enemy/Enemy2/Enemy Walk/Enemy 2 (9).png",
    "images/Enemy/Enemy2/Enemy Walk/Enemy 2 (10).png")

    enemyHurt = loadAnimation("images/Enemy/Enemy2/Enemy hurt/Enemy 2 (15).png",
    "images/Enemy/Enemy2/Enemy hurt/Enemy 2 (16).png","images/Enemy/Enemy2/Enemy hurt/Enemy 2 (17).png",
    "images/Enemy/Enemy2/Enemy hurt/Enemy 2 (18).png",)
    
    fireBallSound = loadSound("Sounds/Fireball Sound.mp3")

    firev = loadAnimation("images/Attack Type/Fireball/Firev.png")
}

function setup()
{

    createCanvas(displayWidth-20,displayHeight-30)

    boy = createSprite(displayWidth/2,displayHeight/3,10,10)
    boy.shapeColor = 'red'
    boy.addAnimation("standing",idleBoy)

    boy.addAnimation("jumping",boyjumps)

    boy.addAnimation("left",idleBoyLeft)

    boy.addAnimation("running",runningBoy)

    boy.addAnimation("runningLeft",runningBoyLeft)

    fireBallGroup = createGroup();
    enemyGroup = createGroup();

    camera.x = boy.x
    camera.y = boy.y

    ground = createSprite(displayWidth/2.2,displayHeight/1.1,100,10)
    ground.shapeColor = 'brown'
    ground.addImage(groundImg,"Ground")
    ground.scale = 5
    groundImg.height = groundImg.height/3

    Killed()
    
}

function draw()
{


    background('blue')
    Enemy()
    boy.velocityY = boy.velocityY+0.3

    camera.x = boy.x
    camera.y = displayHeight-300

    textSize(32)
    fill('black')
    text("MP : "+mp, camera.x - 400, camera.y + 100)

    textSize(32)
    fill('black')
    text("HP : "+hp, camera.x - 400, camera.y + 70)

    textSize(32)
    fill('black')
    text("WAVE : "+wave, camera.x - 400, camera.y+140)

    textSize(32)
    fill('black')
    text("ENEMY KILLED : "+enemy_killed, camera.x - 400, camera.y+40)
    

    if(boy.isTouching(ground))
    {
        boy.velocityY = 0
        count = 0
        boy.changeAnimation("standing",idleBoy)
    }

        if(keyDown(RIGHT_ARROW))
    {
        if(hp > 0)
        {
        boy.x = boy.x + 5
        boy.changeAnimation("running",runningBoy)
      }  
    }
        if(keyWentUp(RIGHT_ARROW))
        {
            boy.changeAnimation("standing",idleBoy)
        }

    if(keyDown(LEFT_ARROW))
    {
        if(hp > 0)
        {
        boy.x = boy.x - 5
        boy.changeAnimation("runningLeft",runningBoyLeft)
        }
    }
    if(keyWentUp(LEFT_ARROW))
    {
        if(boy.isTouching(ground))
        {
            boy.velocityY = 0
            count = 0
            boy.changeAnimation("left",idleBoyLeft)
        }
    }

    if (keyWentDown(UP_ARROW))
    {
        boy.velocityY = -7
        count = count + 1
        boy.changeAnimation("jumping",boyjumps)
    }

    if(enemyGroup.isTouching(ground))
    {
        enemy.velocityY = 0
    }

    if(enemyGroup.isTouching(fireBallGroup))
    {
        fireBall.remove()
        enemy.changeAnimation("e_hurt",enemyHurt)
        enemy_hp = enemy_hp - 30
        if(enemy_hp <= 0)
        {
            enemyGroup.destroyEach()
            enemy_killed =enemy_killed +1
            enemy_hp = 100
        }
        
    }

    if(enemyGroup.isTouching(boy))
    {
        hp = hp -30
        enemy.bounceOff(boy)
    }

    /*if(enemy_hp <= 0)
    {
        enemyGroup.destroyEach()
        enemy_killed =enemy_killed +1
    }*/
    
    //if(enemy_hp < 0)

    if(hp <= 0 )
    {
        boy.velocityY = 0
        textSize(40)
        text("Game Over",displayWidth/2,displayHeight/2)
        enemy.velocityX =0
        
    }
    
    if(enemy_killed >= 20)
    {
        wave = wave + 1
        hp = 100
        mp = 100
        enemy_killed = 0
    }

    drawSprites()

    



    
}

function keyPressed()
{
    //for mp(mp = Magic points through which players can use their specific elements to attck)
    //mp increases when any arrow keys are pressed
    
    if(keyCode === 88)
    {
        mp = mp-13
        FireBall();
    } 
    
    if(mp <= 0)
    {
        if(hp>0)
        {
        mp = 0
        fireBall.changeAnimation('aaa',firev)
        }
    }

    if(mp < 100)
    {
        mp = mp + 2
    }


    if(mp > 100)
    {
        mp  = 100
    }

    if(count >= 3)
    {
       boy.velocityY = 0
    }



    console.log(count)

}

function FireBall()
{
    fireBall = createSprite(boy.x,boy.y,30,30);
    fireBall.shapeColor = 'red'
    fireBall.addAnimation("Fireball",fireballImg)
    fireBall.scale =0.5
    fireBall.velocityX = -7
    fireBallSound.play();
    console.log(fireBallSound)
    fireBall.addAnimation("aaa",firev)
    fireBallGroup.add(fireBall)
}


function Enemy()
{
    if(frameCount%190 === 0)
    {
        enemy = createSprite(displayWidth/2.2,displayHeight/1.3)
        enemy.x = Math.round(random(ground.x))
        enemy.velocityY = enemy.velocityY + 7
        enemy.shapeColor = 'yellow'
        enemy.addAnimation("enemyWalk",enemyWalk)
        enemy.scale = 0.7
        enemy.velocityX = random(-07,07)
        enemy.addAnimation("e_hurt",enemyHurt)
        enemyGroup.add(enemy)



    }
}

function Killed()
{
    if(enemy_hp <= 0)
    {
        enemy.remove()
        enemy_killed = enemy_killed +1
    } 
}

