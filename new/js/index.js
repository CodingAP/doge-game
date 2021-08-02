let gameManager = new GameManager();

gameManager.on('initialize', () => {
    gameManager.addState(new MainState());
    gameManager.setState('MAIN_MENU');
});