import { MainWorld } from './classes/worlds/MainWorld.ts';
import { SecondWorld } from './classes/worlds/SecondWorld.ts';
import { App } from './classes/App.ts';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const app = new App();

const mainWorld = new MainWorld(true, window.innerWidth / window.innerHeight);
app.mainWorld = mainWorld;

const secondWorld = new SecondWorld(false, window.innerWidth / window.innerHeight);
app.secondWorld = secondWorld;

const orbit = new OrbitControls(mainWorld.camera, App.renderer.domElement);
orbit.enableZoom = false;


app.render();

/************************** Event listeners *************************************/
document.addEventListener('wheel', function (ev) {
    mainWorld.setWheelDelta(ev.wheelDelta);
    secondWorld.setWheelDelta(ev.wheelDelta);
});

document.addEventListener('keypress', function (ev) {
    if (ev.key == " ") {
        app.switchWorld();
    }
});
