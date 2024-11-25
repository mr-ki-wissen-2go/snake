document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scale = 20;
    const rows = canvas.height / scale;
    const columns = canvas.width / scale;

    // Klassendefinitionen vor der Verwendung
    class Snake {
        constructor() {
            this.x = 0;
            this.y = 0;
            this.xSpeed = scale * 1;
            this.ySpeed = 0;
            this.total = 0;
            this.tail = [];
        }

        draw() {
            ctx.fillStyle = "#4CAF50";

            for (let i = 0; i < this.tail.length; i++) {
                ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
            }

            ctx.fillRect(this.x, this.y, scale, scale);
        }

        update() {
            for (let i = this.tail.length - 1; i > 0; i--) {
                this.tail[i] = this.tail[i - 1];
            }
            if (this.total >= 1) {
                this.tail[0] = { x: this.x, y: this.y };
            }

            this.x += this.xSpeed;
            this.y += this.ySpeed;

            // Randüberprüfung
            if (this.x >= canvas.width) {
                this.x = 0;
            }
            if (this.y >= canvas.height) {
                this.y = 0;
            }
            if (this.x < 0) {
                this.x = canvas.width - scale;
            }
            if (this.y < 0) {
                this.y = canvas.height - scale;
            }
        }

        changeDirection(direction) {
            switch (direction) {
                case 'Up':
                    if (this.ySpeed === 0) {
                        this.xSpeed = 0;
                        this.ySpeed = -scale * 1;
                    }
                    break;
                case 'Down':
                    if (this.ySpeed === 0) {
                        this.xSpeed = 0;
                        this.ySpeed = scale * 1;
                    }
                    break;
                case 'Left':
                    if (this.xSpeed === 0) {
                        this.xSpeed = -scale * 1;
                        this.ySpeed = 0;
                    }
                    break;
                case 'Right':
                    if (this.xSpeed === 0) {
                        this.xSpeed = scale * 1;
                        this.ySpeed = 0;
                    }
                    break;
            }
        }

        eat(fruit) {
            if (this.x === fruit.x && this.y === fruit.y) {
                this.total++;
                this.tail.push({});
                return true;
            }
            return false;
        }
    }

    class Fruit {
        constructor() {
            this.pickLocation();
        }

        pickLocation() {
            this.x = (Math.floor(Math.random() * columns)) * scale;
            this.y = (Math.floor(Math.random() * rows)) * scale;
        }

        draw() {
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(this.x, this.y, scale, scale);
        }
    }

    // Instanziierung nach den Klassendefinitionen
    const snake = new Snake();
    const fruit = new Fruit();

    window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();

        if (snake.eat(fruit)) {
            fruit.pickLocation();
        }

        document.querySelector('.score').innerText = snake.total;
    }, 250);

    window.addEventListener('keydown', (evt) => {
        const direction = evt.key.replace('Arrow', '');
        snake.changeDirection(direction);
    });
});


