import { MainWorld } from './classes/worlds/MainWorld.ts';

const mainWorld = new MainWorld(true);

/************************** Event listeners *************************************/
document.addEventListener('wheel', function (ev) {
    mainWorld.setWheelDelta(ev.wheelDelta);
});
