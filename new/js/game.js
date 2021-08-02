class MainState extends GameState {
    constructor() {
        super('MAIN_MENU');
        this.keys = {};
        this.events = {
            keydown: event => {
                this.keys[event.key] = true;
            },
            keyup: event => {
                delete this.keys[event.key];
            }
        }

        this.player = { position: { x: 0, y: 0 }, velocity: { x: 0, y: 0 }, speed: 250 };
    }

    update(deltaTime) {
        this.player.velocity.x = (this.keys.d ? 1 : 0 + this.keys.a ? -1 : 0) * this.player.speed;
        this.player.velocity.y = (this.keys.s ? 1 : 0 + this.keys.w ? -1 : 0) * this.player.speed;

        this.player.position.x += this.player.velocity.x * deltaTime;
        this.player.position.y += this.player.velocity.y * deltaTime;
    }

    render(context) {
        context.fillStyle = '#aaa';
        context.fillRect(0, 0, this.gameManager.canvas.width, this.gameManager.canvas.height);

        context.drawImage(this.gameManager.assets.background, 0, 0);
        context.drawImage(this.gameManager.assets.ok, this.player.position.x, this.player.position.y);
    }

    onEvent(event) {
        if (this.events[event.type]) this.events[event.type](event);
    }
}