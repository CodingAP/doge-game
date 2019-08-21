class GameManager {
    constructor() {
        this.cutsceneManager = new CutsceneManager();
        this.sceneManager = new SceneManager();
        this.dialogueManager = new DialogueManager();
        this.inventoryManager = new InventoryManager();

        this.camera = new Camera();
    }

    loop() {
        context.save();

        if (this.cutsceneManager.playingCutscene) {
            this.camera.position = this.cutsceneManager.cameraPosition;
        } else {
            this.camera.follow(this.sceneManager.player.position);
        }
        this.camera.restrict(this.sceneManager.currentScene);

        context.translate(canvas.width / 2, canvas.height / 2);
        context.translate(-this.camera.position.x, -this.camera.position.y);

        this.sceneManager.loop(this);

        if (!this.cutsceneManager.playingCutscene) {
            if (!this.dialogueManager.dialogueActive) this.sceneManager.player.move();
            this.sceneManager.player.show();
        }

        context.restore();

        this.dialogueManager.loop(this);
        if (!this.cutsceneManager.playingCutscene) this.inventoryManager.loop();
        this.cutsceneManager.loop(this);
    }

    getKeys(key, state) {
        this.sceneManager.player.getKeys(key, state);
        if (state) {
            if (key == ' ') {
                this.dialogueManager.next = true;
            } else if (key == 'f') {
                this.sceneManager.currentScene.selectNPC = true;
            }
        } else {
            if (key == ' ') {
                this.dialogueManager.next = false;
            } else if (key == 'f') {
                this.sceneManager.currentScene.selectNPC = false;
            }
        }
    }

    getMouse(button, state) {
        if (state) {
            if (button == 0) {
                this.dialogueManager.chosen = true;
            }
        } else {
            if (button == 0) {
                this.dialogueManager.chosen = false;
            }
        }
    }
}

class Player {
    constructor() {
        this.position = new Vector2D();
        this.playerAnimations = [loader.loaded.player_idle, loader.loaded.npc_demodoge_talk];
        this.state = 0;
        this.moveSpeed = 5;
        this.keys = { a: 0, d: 0, w: 0, s: 0 };
    }

    move() {
        let direction = new Vector2D(this.keys.d - this.keys.a, this.keys.s - this.keys.w);
        if (direction.getMagnitude() != 0) direction.normalize();

        direction.multiply(this.moveSpeed);

        this.position.add(direction);
    }

    show() {
        let currentAnimation = this.playerAnimations[this.state];
        currentAnimation.animate(this.position.x - 75, this.position.y - 75);
    }

    getKeys(key, state) {
        if (this.keys[key] != null) {
            this.keys[key] = (state) ? 1 : 0;
        }
    }
}

class Sprite {
    constructor(image, options = {}) {
        this.image = image;
        this.spriteW = options.width || 1;
        this.spriteH = options.height || 1;
        this.count = options.count || 1;
        this.timePerFrame = options.timePerFrame || 0.5;
        this.index = options.startingFrame || 0;
        this.time = 0;
    }

    animate(x, y) {
        this.time++;

        if (this.time > this.timePerFrame * 60) {
            this.time = 0;
            this.index++;
        }

        if (this.index > this.count - 1) {
            this.index = 0;
        }

        context.drawImage(this.image, this.index * this.spriteW, 0, this.spriteW, this.spriteH, x, y, this.spriteW, this.spriteH);
    }
}

class Loader {
    constructor() {
        this.loaded = {};
        this.total = 11;
        this.loadAmount = 0;
        this.loadedAll = false;

        this.loadAll();
    }

    loadAll() {
        this.loadAnimation('player_idle', 'img/doge_body.png', { width: 150, height: 150 });

        this.loadAnimation('npc_demodoge', 'img/doge_body.png', { width: 150, height: 150 });
        this.loadAnimation('npc_lilbro', 'img/doge_lilbro.png', { width: 80, height: 133 });
        this.loadAnimation('npc_demodoge_talk', 'img/doge_talk.png', { width: 160, height: 160, count: 2, timePerFrame: 0.2 })
        this.loadAnimation('npc_lilbro_talk', 'img/lilbro_talk.png', { width: 80, height: 133, count: 2, timePerFrame: 0.2 })

        this.loadAnimation('item_cromchbar', 'img/cromchbar.png', { width: 100, height: 100 });
        this.loadAnimation('item_loafatron', 'img/doge_bread.png', { width: 100, height: 100 });

        this.loadAnimation('object_cromchbar', 'img/cromchbar.png', { width: 100, height: 100 });
        this.loadAnimation('object_loafatron', 'img/doge_bread.png', { width: 100, height: 100 });

        this.loadAnimation('background', 'img/office.jpg', { width: 1000, height: 800 });

        this.loadAnimation('chat', 'img/chat.png', { width: 150, height: 150 });
    }

    checkLoad() {
        this.loadAmount++;
        if (this.loadAmount >= this.total) {
            this.loadedAll = true;
        }
    }

    loadImage(id, path) {
        let image = new Image();
        image.onload = this.checkLoad.bind(this);
        image.src = path;

        this.loaded[id] = image;
    }

    loadAnimation(id, path, options) {
        let image = new Image();
        image.onload = this.checkLoad.bind(this);
        image.src = path;

        this.loaded[id] = new Sprite(image, options);
    }
}

class SceneManager {
    constructor() {
        this.allScenes = [];
        this.currentScene = null;

        this.allNPCS = [];
        this.allObjects = [];

        this.player = null;

        Object.keys(allNPCS).forEach(key => {
            let npc = new NPC(key);
            for (let i = 0; i < allNPCS[key].animations.length; i++) {
                npc.npcAnimations.push(loader.loaded[allNPCS[key].animations[i]]);
            }
            npc.collision = allNPCS[key].collision;
            npc.name = allNPCS[key].name;
            this.allNPCS.push(npc);
        });

        Object.keys(allObjects).forEach(key => {
            let object = new GameObject(key);
            object.animation = loader.loaded[allObjects[key].animation];
            object.collision = allObjects[key].collision;
            this.allObjects.push(object);
        });
    }

    loadScene(id) {
        let sceneExist = false;

        for (let i = 0; i < this.allScenes.length; i++) {
            if (this.allScenes[i].id == id) {
                this.currentScene = this.allScenes[i];
                sceneExist = true;
            }
        }

        if (!sceneExist) this.currentScene = this.createScene(id);

        this.player = new Player();
        this.player.position = new Vector2D(this.currentScene.playerPosition.x, this.currentScene.playerPosition.y);
    }

    createScene(id) {
        let newScene = new Scene(id);

        let sceneObject = allScenes[id];
        newScene.playerPosition = sceneObject.playerPosition;
        newScene.npcs = sceneObject.npcs;
        newScene.objects = sceneObject.objects;
        newScene.background = sceneObject.background;
        newScene.bounds = sceneObject.bounds;

        this.allScenes.push(newScene);
        return newScene;
    }

    getNPC(id) {
        for (let i = 0; i < this.allNPCS.length; i++) {
            if (this.allNPCS[i].id == id) {
                return this.allNPCS[i];
            }
        }
        return null;
    }

    getObject(id) {
        for (let i = 0; i < this.allObjects.length; i++) {
            if (this.allObjects[i].id == id) {
                return this.allObjects[i];
            }
        }
        return null;
    }

    loop(gameManager) {
        this.currentScene.loop(gameManager);
    }
}

class Scene {
    constructor(id) {
        this.id = id;
        this.npcs = [];
        this.objects = [];
        this.playerPosition = { x: 0, y: 0 };
        this.background = null;
        this.bounds = { x: 0, y: 0, width: 800, height: 600 };
        this.inCutscene = false;
        this.cutscenePositions = [];
        this.chat = loader.loaded.chat;
        this.cutsceneNPC = null;
    }

    loop(gameManager) {
        loader.loaded[this.background].animate(this.bounds.x, this.bounds.y);

        for (let i = 0; i < this.npcs.length; i++) {
            let npc = gameManager.sceneManager.getNPC(this.npcs[i].npc);
            let animation = npc.npcAnimations[npc.state];
            if (this.inCutscene) {
                for (let j = 0; j < gameManager.cutsceneManager.loaded.length; j++) {
                    if (gameManager.cutsceneManager.loaded[j] == this.npcs[i].npc) {
                        animation.animate(this.cutscenePositions[i].position.x - animation.spriteW / 2, this.cutscenePositions[i].position.y - animation.spriteH / 2);
                    }
                }
            } else {
                animation.animate(this.npcs[i].position.x - animation.spriteW / 2, this.npcs[i].position.y - animation.spriteH / 2);
                let d = Math.sqrt(Math.pow(gameManager.sceneManager.player.position.x - this.npcs[i].position.x, 2) + Math.pow(gameManager.sceneManager.player.position.y - this.npcs[i].position.y, 2));
                if (d < 125) {
                    if (!gameManager.dialogueManager.currentDialogue) {
                        this.chat.animate(this.npcs[i].position.x - 75, this.npcs[i].position.y - 200);
                        if (this.selectNPC) {
                            gameManager.dialogueManager.playDialogue(this.npcs[i].npc);
                        }
                    }
                }
            }

            for (let i = 0; i < this.objects.length; i++) {
                let object = gameManager.sceneManager.getObject(this.objects[i].object);
                object.animation.animate(this.objects[i].position.x - object.animation.spriteW / 2, this.objects[i].position.y - object.animation.spriteH / 2);

                let d = Math.sqrt(Math.pow(gameManager.sceneManager.player.position.x - this.objects[i].position.x, 2) + Math.pow(gameManager.sceneManager.player.position.y - this.objects[i].position.y, 2));
                if (d < 100) {
                    if (!gameManager.dialogueManager.currentDialogue) {
                        this.chat.animate(this.objects[i].position.x - 75, this.objects[i].position.y - 200);
                        if (this.selectNPC) {
                            gameManager.dialogueManager.playPlayerDialogue(this.objects[i].object);
                        }
                    }
                }
            }
        }
    }
}

class NPC {
    constructor(id) {
        this.npcAnimations = [];
        this.state = 0;
        this.id = id;
        this.collision = null;
        this.name = '';
    }
}

class GameObject {
    constructor(id) {
        this.animation = null;
        this.id = id;
        this.collision = null;
    }
}

class InventoryManager {
    constructor() {
        this.inventory = [];
        this.allItems = [];
        this.numberOfSlots = 3;
        for (let i = 0; i < this.numberOfSlots; i++) {
            this.inventory.push(null);
        }

        Object.keys(allItems).forEach(key => {
            let item = new Item(key);
            item.animation = loader.loaded[allItems[key].animation];
            this.allItems.push(item);
        });
    }

    loop() {
        context.lineWidth = 3;
        for (let i = 0; i < this.numberOfSlots; i++) {
            context.strokeStyle = '#fff';
            context.strokeRect(10 + i * 75, 515, 75, 75);
            context.stroke();

            if (this.inventory[i]) this.inventory[i].animation.animate(10 + i * 75, 515);
        }
    }

    getItem(id) {
        for (let i = 0; i < this.allItems.length; i++) {
            if (this.allItems[i].id == id) {
                return this.allItems[i];
            }
        }
        return null;
    }

    give(id) {
        for (let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i] == null) {
                this.inventory[i] = this.getItem(id);
                return true;
            }
        }
        return false;
    }

    take(id) {
        for (let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i] && this.inventory[i].id == id) {
                this.inventory[i] = null;
                return true;
            }
        }
        return false;
    }
}

class Item {
    constructor(id) {
        this.animation = null;
        this.id = id;
    }
}

class Camera {
    constructor() {
        this.position = new Vector2D();
        this.followAmount = 0.15;
    }

    follow(vector) {
        this.position.lerp(vector, this.followAmount);
    }

    restrict(scene) {
        this.position.clamp(scene.bounds.x + canvas.width / 2, scene.bounds.x + scene.bounds.width - canvas.width / 2, scene.bounds.y + canvas.height / 2, scene.bounds.y + scene.bounds.height - canvas.height / 2)
    }
}

class DialogueManager {
    constructor() {
        this.allDialogue = [];
        this.currentDialogue = null;
        this.line = '';
        this.next = false;
        this.dialogueActive = false;
        this.options = null;
        this.cutscene = false;
        this.chosen = false;
        this.previous = null;

        Object.keys(allDialogue).forEach(key => {
            this.createDialogue(key);
        })
    }

    playDialogue(id) {
        let dialogueExist = false;

        for (let i = 0; i < this.allDialogue.length; i++) {
            if (this.allDialogue[i].id == id) {
                this.currentDialogue = this.allDialogue[i];
                dialogueExist = true;
            }
        }

        if (!dialogueExist) this.currentDialogue = this.createDialogue(id);
    }

    createDialogue(id) {
        let dialogue = allDialogue[id];
        let npcDialogue = [];
        Object.keys(dialogue).forEach(key => {
            let line = allDialogue[id][key];
            let options = {
                content: line.content,
                lead: line.lead,
                reaction: line.reaction,
                back: line.back,
                takes: line.takes,
                gives: line.gives,
                choices: line.options,
                triggeredNPC: line.triggeredNPC,
                triggeredLine: line.triggeredLine,
                playerLine: line.playerLine
            };
            npcDialogue.push(new DialogueText(key, line.type, options))
        });
        let dialogueObject = new Dialogue(id, npcDialogue);
        this.allDialogue.push(dialogueObject);
        return dialogueObject;
    }

    loop(gameManager) {
        if (this.currentDialogue) {
            let currentNPC = null;
            if (this.currentDialogue.id != 'player') {
                currentNPC = gameManager.sceneManager.getNPC(this.currentDialogue.id);
            } else {
                currentNPC = gameManager.sceneManager.player;
            }
            this.dialogueActive = true;
            let currentLine = this.currentDialogue.findDialogue(this.currentDialogue.currentLine);
            if (!currentLine.text) {
                if (currentLine.options.content) {
                    let words = currentLine.options.content.split(' ');
                    for (let i = 0; i < words.length; i++) {
                        if (words[i].charAt(0) == '$') {
                            let newWord = words[i].slice(2);
                            words[i] = playerName + newWord;
                        }
                    }
                    let name = playerName;
                    if (this.currentDialogue.id != 'player') {
                        name = currentNPC.name;
                    }
                    words.unshift(name + ':');
                    currentLine.text = words.join(' ');
                } else {
                    currentLine.text = '';
                }
            }
            this.line = currentLine.text;
            if (currentLine.options.reaction) {
                currentNPC.state = currentLine.options.reaction;
            } else {
                currentNPC.state = 0;
            }
            switch (currentLine.type) {
                case 'text-player':
                    this.currentDialogue.currentLine = currentLine.options.lead;
                    this.playPlayerDialogue(currentLine.options.playerLine, true);
                    break;
                case 'text-take':
                    let takesObject = currentLine.options.takes;
                    if (currentLine.done) {
                        this.currentDialogue.currentLine = takesObject.already;
                    } else {
                        if (gameManager.inventoryManager.take(takesObject.item)) {
                            this.currentDialogue.currentLine = takesObject.success;
                            currentLine.done = true;
                        } else {
                            this.currentDialogue.currentLine = takesObject.failure;
                        }
                    }
                    break;
                case 'text-give':
                    let givesObject = currentLine.options.gives;
                    if (currentLine.done) {
                        this.currentDialogue.currentLine = givesObject.already;
                    } else {
                        if (gameManager.inventoryManager.give(givesObject.item)) {
                            this.currentDialogue.currentLine = givesObject.success;
                            currentLine.done = true;
                        } else {
                            this.currentDialogue.currentLine = givesObject.failure;
                        }
                    }
                    break;
                case 'text-trigger':
                    this.currentDialogue.currentLine = currentLine.options.lead;
                    for (let i = 0; i < this.allDialogue.length; i++) {
                        if (this.allDialogue[i].id == currentLine.options.triggeredNPC) this.allDialogue[i].currentLine = currentLine.options.triggeredLine;
                    }
                    break;
                case 'choice':
                    if (!this.options) {
                        this.options = [];
                        for (let i = 0; i < currentLine.options.choices.length; i++) {
                            let option = new Option(currentLine.options.choices[i].content, currentLine.options.choices[i].response);
                            option.position = { x: 590, y: 170 + (i * 50) };
                            this.options.push(option);
                        }
                    }
                    break;
            }
            if (this.next) {
                switch (currentLine.type) {
                    case 'text':
                        this.currentDialogue = null;
                        break;
                    case 'text-part':
                        this.currentDialogue.currentLine = currentLine.options.lead;
                        break;
                    case 'text-end':
                        if (currentLine.options.back) {
                            this.currentDialogue.currentLine = currentLine.options.back;
                        } else {
                            this.currentDialogue.currentLine = 'intro';
                        }
                        currentNPC.state = 0;
                        let currentID = this.currentDialogue.id;
                        this.currentDialogue = null;
                        if (currentID == 'player' && this.previous) this.playDialogue(this.previous);
                        break;
                }
                if (this.currentDialogue) {
                    let newLine = this.currentDialogue.findDialogue(this.currentDialogue.currentLine);
                    if (newLine.type == 'choice') {
                        this.options = [];
                        for (let i = 0; i < newLine.options.choices.length; i++) {
                            let option = new Option(newLine.options.choices[i].content, newLine.options.choices[i].response);
                            option.position = { x: 590, y: 170 + (i * 50) };
                            this.options.push(option);
                        }
                    }
                }
                this.next = false;
            }
            if (this.options) {
                for (let i = 0; i < this.options.length; i++) {
                    this.options[i].update();
                    if (this.chosen && this.options[i].hovered) {
                        this.currentDialogue.currentLine = this.options[i].response;
                        this.chosen = false;
                        this.options = null;
                        break;
                    }
                }
            }
        } else {
            this.dialogueActive = false;
        }

        if (this.dialogueActive) {
            context.strokeStyle = '#fff';
            context.lineWidth = 5;
            context.fillStyle = '#000';
            context.fillRect(10, 10, 780, 130);
            context.strokeRect(10, 10, 780, 130);
            context.stroke();
            context.textAlign = 'left';
            context.fillStyle = '#fff';
            context.font = '25px Arial';
            context.textBaseline = 'middle'
            this.wrapText(this.line, 20, 40, 770);

            context.textBaseline = 'top'
            if (!this.options && !this.cutscene) context.fillText('Press Space...', 625, 150);

            if (this.options) {
                for (let i = 0; i < this.options.length; i++) {
                    this.options[i].show(context);
                }
            }
        }
    }

    playLine(id, line) {
        if (this.currentDialogue) this.stop();
        this.playDialogue(id);
        this.currentDialogue.currentLine = line;
    }

    playPlayerDialogue(object, previous) {
        if (previous) {
            this.previous = this.currentDialogue.id;
        } else {
            this.previous = null;
        }
        if (this.currentDialogue && !previous) this.stop();
        this.playDialogue('player');
        this.currentDialogue.currentLine = object;
    }

    stop() {
        this.currentDialogue.currentLine = 'intro';
        this.cutscene = false;
        this.currentDialogue = null;
    }

    wrapText(text, x, y, maxWidth) {
        var words = text.split(' ');
        var lines = [];
        var currentLine = words[0];

        for (var i = 1; i < words.length; i++) {
            var word = words[i];
            var width = context.measureText(currentLine + " " + word).width;
            if (width < maxWidth) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);

        for (let i = 0; i < lines.length; i++) {
            context.fillText(lines[i], x, y);
            y += parseInt(context.font.slice(0, 2));
        }
    }
}

class Dialogue {
    constructor(id, dialogue) {
        this.id = id;
        this.dialogue = dialogue;
        this.currentLine = 'intro';
    }

    findDialogue(id) {
        for (let i = 0; i < this.dialogue.length; i++) {
            if (this.dialogue[i].id == id) {
                return this.dialogue[i];
            }
        }
        return false;
    }
}

class DialogueText {
    constructor(id, type, options) {
        this.id = id;
        this.type = type;
        this.options = options;
        this.text = null;
        this.done = false;
    }
}

class Option {
    constructor(content, response) {
        this.position = { x: 0, y: 0 };
        this.hovered = false;
        this.content = content;
        this.response = response;
        this.width = 200;
        this.height = 50;
    }

    show(context) {
        context.strokeStyle = '#fff';
        context.strokeRect(this.position.x, this.position.y, this.width, this.height);
        context.stroke();

        context.fillStyle = this.hovered ? '#333' : '#000';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);

        context.fillStyle = '#fff';
        context.font = '30px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(this.content, this.position.x + this.width / 2, this.position.y + this.height / 2);
    }

    update() {
        this.hovered = (mouseX > this.position.x && mouseX < this.position.x + this.width && mouseY > this.position.y && mouseY < this.position.y + this.height);
    }
}

class CutsceneManager {
    constructor() {
        this.cutscenes = [];
        this.playingCutscene = null;
        this.currentDuration = 0;
        this.cameraPosition = new Vector2D();
        this.loaded = [];
        this.moveSpeeds = [];
        this.angles = [];
    }

    createCutscene(id) {
        let cutsceneFrames = [];
        for (let i = 0; i < allCutscenes[id].frames.length; i++) {
            let npcs = [];
            let positions = [];
            let dialogue = [];
            for (let j = 0; j < allCutscenes[id].frames[i].npcs.length; j++) {
                npcs.push(allCutscenes[id].frames[i].npcs[j].npc);
                if (allCutscenes[id].frames[i].npcs[j].moveTo) {
                    positions.push(allCutscenes[id].frames[i].npcs[j].moveTo);
                } else {
                    positions.push(null);
                }
                if (allCutscenes[id].frames[i].npcs[j].dialogue) {
                    dialogue.push({ dialogueLine: allCutscenes[id].frames[i].npcs[j].dialogue, npc: allCutscenes[id].frames[i].npcs[j].npc });
                } else {
                    dialogue.push(null);
                }
            }
            cutsceneFrames.push(new Frame(npcs, positions, dialogue, allCutscenes[id].frames[i].duration));
        }
        let newCutscene = new Cutscene(id, cutsceneFrames, allCutscenes[id].options);
        this.cutscenes.push(newCutscene);
        return newCutscene;
    }

    playCutscene(id) {
        let cutsceneExist = false;
        for (let i = 0; i < this.cutscenes.length; i++) {
            if (this.cutscenes[i].id == id) {
                this.playingCutscene = this.cutscenes[i];
                cutsceneExist = true;
            }
        }

        if (!cutsceneExist) this.playingCutscene = this.createCutscene(id);
    }

    loop(gameManager) {
        if (this.playingCutscene) {
            if (!this.playingCutscene.processed) {
                let frame = this.playingCutscene.frames[this.playingCutscene.currentFrame];
                this.currentDuration = frame.duration;

                for (let i = 0; i < this.playingCutscene.options.startingPositions.length; i++) {
                    let current = this.playingCutscene.options.startingPositions[i];
                    if (this.playingCutscene.options.cameraPosition) this.cameraPosition = new Vector2D(this.playingCutscene.options.cameraPosition.x, this.playingCutscene.options.cameraPosition.y);
                    gameManager.sceneManager.currentScene.inCutscene = true;
                    gameManager.sceneManager.currentScene.cutscenePositions[i] = current;
                    this.loaded.push(current.npc);

                    if (this.playingCutscene.options.moving) {
                        if (frame.positions[i]) {
                            let distance = Math.sqrt(Math.pow(frame.positions[i].x - current.position.x, 2) + Math.pow(frame.positions[i].y - current.position.y, 2));

                            this.moveSpeeds.push(distance / this.currentDuration);

                            this.angles.push(Math.atan2(frame.positions[i].y - current.position.y, frame.positions[i].x - current.position.x));
                        } else {
                            this.moveSpeeds.push(0);
                            this.angles.push(0);
                        }
                        if (frame.dialogue[i]) {
                            gameManager.dialogueManager.playLine(current.npc, frame.dialogue[i]);
                            gameManager.dialogueManager.cutscene = true;
                        } else {
                            gameManager.sceneManager.getNPC(current.npc).state = 0;
                            gameManager.dialogueManager.cutscene = false;
                        }
                    }
                }
                this.playingCutscene.processed = true;
            } else {
                this.currentDuration--;
                let frame = this.playingCutscene.frames[this.playingCutscene.currentFrame];
                if (this.currentDuration <= 0) {
                    this.playingCutscene.currentFrame++;
                    if (this.playingCutscene.currentFrame >= this.playingCutscene.frames.length) {
                        gameManager.sceneManager.currentScene.inCutscene = false;
                        gameManager.dialogueManager.stop();
                        this.playingCutscene = null;
                        gameManager.sceneManager.cutsceneNPC = null;
                    } else {
                        this.moveSpeeds = [];
                        this.angles = [];
                        frame = this.playingCutscene.frames[this.playingCutscene.currentFrame];
                        this.currentDuration = frame.duration;
                        if (this.playingCutscene.options.moving) {
                            for (let i = 0; i < frame.npcs.length; i++) {
                                let previousPosition = null;
                                for (let j = 0; j < gameManager.sceneManager.currentScene.cutscenePositions.length; j++) {
                                    if (gameManager.sceneManager.currentScene.cutscenePositions[j].npc == frame.npcs[i]) {
                                        previousPosition = gameManager.sceneManager.currentScene.cutscenePositions[j]
                                    }
                                }
                                if (frame.positions[i]) {
                                    let distance = Math.sqrt(Math.pow(frame.positions[i].x - previousPosition.position.x, 2) + Math.pow(frame.positions[i].y - previousPosition.position.y, 2));

                                    this.moveSpeeds.push(distance / this.currentDuration);

                                    this.angles.push(Math.atan2(frame.positions[i].y - previousPosition.position.y, frame.positions[i].x - previousPosition.position.x));
                                } else {
                                    this.moveSpeeds.push(0);
                                    this.angles.push(0);
                                }
                                if (frame.dialogue[i] && frame.dialogue[i].npc == frame.npcs[i]) {
                                    gameManager.dialogueManager.playLine(frame.npcs[i], frame.dialogue[i].dialogueLine);
                                    gameManager.dialogueManager.cutscene = true;
                                } else {
                                    gameManager.dialogueManager.stop();
                                }
                            }
                        }
                    }
                } else {
                    for (let i = 0; i < frame.npcs.length; i++) {
                        if (this.playingCutscene.options.moving) {
                            if (this.moveSpeeds.length == 0) {
                                this.moveSpeeds[i] = 0;
                                this.angles[i] = 0;
                            }

                            let index = -1;
                            let previousPosition = null;
                            for (let j = 0; j < gameManager.sceneManager.currentScene.cutscenePositions.length; j++) {
                                if (gameManager.sceneManager.currentScene.cutscenePositions[j].npc == frame.npcs[i]) {
                                    previousPosition = gameManager.sceneManager.currentScene.cutscenePositions[j];
                                    index = j;
                                }
                            }

                            let newPosition = { x: previousPosition.position.x + (Math.cos(this.angles[i]) * this.moveSpeeds[i]), y: previousPosition.position.y + (Math.sin(this.angles[i]) * this.moveSpeeds[i]) }

                            gameManager.sceneManager.currentScene.cutscenePositions[index] = { npc: frame.npcs[i], position: newPosition };
                        }
                    }
                }
            }
        }
    }
}

class Frame {
    constructor(npcs, positions, dialogue, duration) {
        this.npcs = npcs;
        this.positions = positions;
        this.dialogue = dialogue;
        this.duration = duration * 60;
    }
}

class Cutscene {
    constructor(id, frames, options) {
        this.id = id;
        this.frames = frames;
        this.options = options;
        this.processed = false;
        this.currentFrame = 0;
    }
}

class UserInput {
    constructor() {
        this.position = { x: 210, y: 350 };
        this.input = '';
        this.pointerSpeed = 30;
        this.currentFrame = 0;
        this.currentPosition = 0;
        this.pointer = false;
        this.fontSize = 50;
        this.characterLimit = 13;
    }

    loop() {
        context.fillStyle = '#fff';
        context.font = this.fontSize + 'px Arial';
        context.textAlign = 'left';
        let x = this.position.x;
        let pointer = (this.pointer) ? '|' : ' ';
        for (let i = 0; i < this.input.length; i++) {
            if (this.currentPosition == i) context.fillText(pointer, x - 5, this.position.y);
            context.fillText(this.input[i], x, this.position.y);
            x += context.measureText(this.input[i]).width;
        }
        if (this.currentPosition == this.input.length) {
            context.fillText(pointer, x, this.position.y);
        }

        this.currentFrame++;
        if (this.currentFrame >= this.pointerSpeed) {
            this.pointer = !this.pointer;
            this.currentFrame = 0;
        }
    }

    takeInput(key) {
        if (key.length == 1 && this.input.length < this.characterLimit) {
            this.input = this.input.slice(0, this.currentPosition) + key + this.input.slice(this.currentPosition);;
            this.currentPosition++;
        } else if (key == 'Backspace' && this.currentPosition > 0) {
            this.input = this.input.slice(0, this.currentPosition - 1) + this.input.slice(this.currentPosition);
            this.currentPosition--;
        } else if (key == 'ArrowLeft') {
            this.currentPosition--;
        } else if (key == 'ArrowRight') {
            this.currentPosition++;
        }
        if (this.currentPosition < 0) {
            this.currentPosition = 0;
        } else if (this.currentPosition > this.input.length) {
            this.currentPosition = this.input.length;
        }
    }

    giveInput() {
        return this.input;
    }
}