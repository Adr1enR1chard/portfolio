import { MainWorld } from './classes/worlds/MainWorld.ts';
import { SecondWorld } from './classes/worlds/SecondWorld.ts';
import { App } from './classes/App.ts';
import { TypeWriter } from './classes/TypeWriter.ts';

const mainWorld = new MainWorld(true, window.innerWidth / window.innerHeight);
App.instance.mainWorld = mainWorld;

const secondWorld = new SecondWorld(true, window.innerWidth / window.innerHeight);
App.instance.secondWorld = secondWorld;

App.instance.loop();

TypeWriter.instance.startTyping();


/************************** Event listeners *************************************/
document.addEventListener('wheel', function (ev) {
    App.instance.wheelDelta = ev.wheelDelta;
});

document.addEventListener('mousemove', App.instance.onMouseMove.bind(App.instance), false);

document.addEventListener('click', App.instance.onMouseClick.bind(App.instance), false);

export function switchProjectView(id) {
    App.instance.secondWorld.switchView(id);
}

export function prevSlide() {
    App.instance.secondWorld.prevSlide();
}

export function nextSlide() {
    App.instance.secondWorld.nextSlide();
}
