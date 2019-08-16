let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let mouseX, mouseY;

let game, loader;

document.addEventListener('keydown', event => {
    game.getKeys(event.key, true);
}, false);

document.addEventListener('keyup', event => {
    game.getKeys(event.key, false);
}, false);

document.addEventListener('mousedown', event => {
    game.getMouse(event.button, true);
}, false);

document.addEventListener('mouseup', event => {
    game.getMouse(event.button, false);
}, false);

document.addEventListener('mousemove', event => {
    let rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
}, false);

window.onload = () => {
    loader = new Loader();
    game = new GameManager();
    game.sceneManager.loadScene('demo');
    game.dialogueManager.playDialogue('lilbro');

    loop();
}

let loop = () => {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (loader.loaded) {
        game.loop();
    } else {
        context.fillStyle = '#fff';
        context.font = '50px Arial';
        context.textAlign = 'center';
        context.fillText('Loading...', canvas.width / 2, canvas.height / 2);
    }

    requestAnimationFrame(loop);
}