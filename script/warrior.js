class Warrior extends Villager
{
	constructor(x, y, barracks, health = 100, defense = 75)
	{
		super(x, y);
		this.posX = x;
		this.posY = y;
		this.defense = defense;
		this.speed = 5;
		this.direction = [random(width), random(height)];
		this.barracks = barracks;
		this.state = 0;
		this.displayText = `WARRIOR (${this.health})`;
	}

	action()
	{
		/*
			WARRIOR STATES:
			0 - patrol
			1 - find hospital
			2 - heal
		*/
		if (this.health <= 0)
        {
            this.displayText = "DEAD WARRIOR";
            return;
		}
		
		if (this.health < 100 && this.state != 2)
        {
            this.state = 1;
		}
		
		if (this.state == 0) 
		{
			if (distanceTo(this.posX, this.posY, this.direction[0], this.direction[1]) < 10)
			{
				this.direction = [random(width), random(height)];
			}

			var point = getNextPoint(this.posX, this.posY, this.direction[0], this.direction[1], this.speed);
			this.posX = point[0];
			this.posY = point[1];
			this.animate();
		}

		if(this.state == 1)
		{
			if (distanceTo(this.posX, this.posY, hospitals[0].posX, hospitals[0].posY) < 15)
            {
                if(hospitals[0].addPatient())
                {
                    this.state = 2;
                }
            }

            let nextPoint = getNextPoint(this.posX, this.posY, hospitals[0].posX, hospitals[0].posY, this.speed * 0.75);

            this.direction = nextPoint[0] < this.posX ? 0 : 1;
            this.posX = nextPoint[0];
			this.posY = nextPoint[1];
			this.animate();
		}

		if (this.state == 2) {
			hospitals[0].healPatient(this);
			if (this.health >= 100)
			{
				this.health = 100;
				hospitals[0].releasePatient();
				this.state = 0;
			}
		}
	}

	displayHealth() {
        push()
            let healthLength = constrain(this.health/100*30, 0, 30)
            strokeWeight(0)
            fill(color("green"))
            rect(this.posX - 15, this.posY - 25, healthLength ,5)
            fill(color("red"))
            rect(this.posX - 15 + healthLength, this.posY - 25, 30 - healthLength ,5)
        pop()
    }

	checkForEnemies()
	{
		enemies.forEach(enemy =>
		{
			var dist = distanceTo(this.posX, this.posY, enemy.posX, enemy.posY);
			if (dist < 15)
			{
				enemy.health -= 10;
				enemy.displayText = "OUCH!";
				setTimeout(() => enemy.displayText = `ENEMY (${enemy.health})`, 1500);
			}
		});
	}

	die()
	{
		this.barracks.warriorDied();
	}

	draw()
	{
		noStroke();
		fill(214, 66, 126);
		ellipse(this.posX, this.posY, 20, 20);
		fill(255);
		textAlign(CENTER);
		text(this.displayText, this.posX, this.posY - 28);
		this.displayHealth();
	}

	animate()
    {
        this.index += this.speed;
    }
}