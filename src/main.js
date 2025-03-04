import { MainWorld } from './classes/worlds/MainWorld.ts';
import { SecondWorld } from './classes/worlds/SecondWorld.ts';
import { Render } from './classes/Render.ts';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const render = new Render();

const mainWorld = new MainWorld(true, window.innerWidth / window.innerHeight);
render.addWorld(mainWorld);

const secondWorld = new SecondWorld(false, 512 * 1.3 / 512);
render.addWorld(secondWorld);

const orbit = new OrbitControls(mainWorld.camera, Render.renderer.domElement);
orbit.enableZoom = false;


render.render();

/************************** Event listeners *************************************/
document.addEventListener('wheel', function (ev) {
    mainWorld.setWheelDelta(ev.wheelDelta);
    secondWorld.setWheelDelta(ev.wheelDelta);
});
