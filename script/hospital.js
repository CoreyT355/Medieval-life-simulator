class Hospital
{
    constructor(x, y)
    {
        this.posX = x;
        this.posY = y;
        this.maxPatients = 5;
        this.patientsCounter = 0;
    }

    addPatient()
    {
        if (this.patientsCounter < this.maxPatients)
        {
            this.patientsCounter++;
            return true;
        }

        return false;
    }

    healPatient(patient)
    {
        if (patient.health < 100)
        {
            patient.health += 0.1;
            patient.displayText = `HEALING (${Math.round(patient.health)})`;
        }
    }

    releasePatient()
    {
        this.patientsCounter--;
    }

    draw()
    {
        noStroke();
        fill(244, 65, 80);
        ellipse(this.posX, this.posY, 20, 20);
        fill(255);
        textAlign(CENTER);
        text('HOSPITAL', this.posX, this.posY - 12);
    }
}