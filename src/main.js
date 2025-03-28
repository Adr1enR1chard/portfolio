import { MainWorld } from './classes/worlds/MainWorld.ts';
import { SecondWorld } from './classes/worlds/SecondWorld.ts';
import { App } from './classes/App.ts';
import { TypeWriter } from './classes/TypeWriter.ts';
import { LoadingManager } from 'three';

// Loading manager
const manager = new LoadingManager();
manager.onStart = function () {
    TypeWriter.instance.startTyping();
    TypeWriter.instance.onLoad();
};

manager.onLoad = function () {
    TypeWriter.instance.onLoadComplete();
};

// App instance
App.instance.loadingManager = manager;

const mainWorld = new MainWorld(true, window.innerWidth / window.innerHeight);
App.instance.mainWorld = mainWorld;

const secondWorld = new SecondWorld(true, window.innerWidth / window.innerHeight);
App.instance.secondWorld = secondWorld;

App.instance.loop();

// TypeWriter.instance.startTyping();


/************************** Event listeners *************************************/
document.addEventListener('wheel', function (ev) {
    App.instance.wheelDelta = ev.wheelDelta;
});

export function switchProjectView(id) {
    App.instance.secondWorld.switchView(id);
}

export function prevSlide() {
    App.instance.secondWorld.prevSlide();
}

export function nextSlide() {
    App.instance.secondWorld.nextSlide();
}
