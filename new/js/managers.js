class GameManager {
    constructor() {
        this.onEvents = {
            initialize: () => {}
        };

        this.assets = {};
        AssetManager.loadAssets('./assets/assets.json', assets => {
            if (assets == null) console.error(`ERROR: Couldn't find asset information file! No assets will be loaded...`);
            else {
                this.assets = assets;
                this._initialize();
            }
        });
    }

    _initialize() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        document.body.style = 'margin: auto; overflow: hidden;';

        this._resize();
        window.addEventListener('resize', event => {
            this._resize();
            this._onEvent(event);
        });

        ['keydown', 'keyup', 'mouseup', 'mousemove', 'mousedown'].forEach(element => {
            window.addEventListener(element, event => {
                this._onEvent(event);
            });
        });

        this.currentState = '';
        this.states = {};
        this.globalStates = [];
        this.time = new Date().getTime();

        this.onEvents.initialize();

        window.requestAnimationFrame(this._loop.bind(this));
    }

    _loop() {
        this._update();
        this._render();

        window.requestAnimationFrame(this._loop.bind(this));
    }

    _resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    _update() {
        let nextTime = new Date().getTime();
        let deltaTime = (nextTime - this.time) / 1000;
        this.time = nextTime;

        if (this.currentState != '') this.states[this.currentState].update(deltaTime);
        this.globalStates.forEach(element => {
            element.update(deltaTime);
        });
    }

    _render() {
        if (this.currentState != '') this.states[this.currentState].render(this.context);
        this.globalStates.forEach(element => {
            element.render(this.context);
        });
    }

    _onEvent(event) {
        if (this.currentState != '') this.states[this.currentState].onEvent(event);
        this.globalStates.forEach(element => {
            element.onEvent(event);
        });
    }

    on(event, callback) {
        this.onEvents[event] = callback;
    }

    addState(state, global = false) {
        if (global) this.globalStates.push(state);
        else this.states[state.id] = state;

        state.gameManager = this;
    }

    setState(id) {
        this.currentState = id;
    }
}

class GameState {
    constructor(id) {
        this.id = id;
    }

    update(deltaTime) { }
    render(context) { }
    onEvent(event) { }
}

class AssetManager {
    static loadAssets(file, callback) {
        this.fileType = {
            'image/png': blob => {
                let image = new Image();
                image.src = URL.createObjectURL(blob);
                return image;
            }
        }

        this.assetType = {
            animation: (data, options) => {
                return { data, options };
            },
            image: data => {
                return data;
            }
        }

        fetch(file)
            .then(response => response.json())
            .then(data => {
                let assets = {};
                let assetNames = Object.keys(data);
                let count = 0;

                assetNames.forEach(name => {
                    fetch(data[name].url)
                        .then(assetResponse => assetResponse.blob())
                        .then(assetBlob => {
                            let assetData = this.fileType[assetBlob.type](assetBlob);
                            assets[name] = this.assetType[data[name].type](assetData, data[name].options);
                            
                            count++;
                            if (count == assetNames.length) callback(assets);
                        })
                        .catch(error => {
                            console.warn(`WARNING: Couldn't load ${name} (${data[name].url}), asset will not be available...`);
                            assets[name] = null;
                            
                            count++;
                            if (count == assetNames.length) callback(assets);
                        });
                });
            })
            .catch(error => {
                callback(null);
            });
    }
}