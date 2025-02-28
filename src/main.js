import * as THREE from 'three';
import { Laptop } from './classes/Laptop.js';

/***********************************Base******************************************/
/**
 * Base renderer for the three.js app.
 */
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas') });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

/**
 * Main scene
 */
const scene = new THREE.Scene();
scene.background = new THREE.Color('lightblue');

/**
 * Main camera
 */
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight);
camera.position.z = 5;
camera.position.y = 1;

/***********************************Lights******************************************/

const ambientLight = new THREE.AmbientLight(new THREE.Color('white'), 5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(new THREE.Color('white'), 10);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(new THREE.Color('white'), 1);
pointLight.position.y = 1;
scene.add(pointLight);

/************************************3D Objects***************************************/

const laptop = new Laptop();
scene.add(laptop);

/************************************Main animation***************************************/

let animationTime = 0;
let wheelDelta = 0;
let previousWheelDelta = 0;
const animationSpeed = 0.03;
const smoothFactor = 0.9; // Between 1 and 0

const clock = new THREE.Clock(true);

function animate() {
    wheelDelta = THREE.MathUtils.lerp(wheelDelta, previousWheelDelta, smoothFactor);
    animationTime = Math.max(animationTime - wheelDelta * animationSpeed * clock.getDelta(), 0);
    previousWheelDelta = wheelDelta;
    wheelDelta = 0;

    laptop.animate(clock.getDelta(), animationTime);
    renderer.render(scene, camera);
}

/************************************Event listeners*************************************/

document.addEventListener('wheel', function (ev) {
    wheelDelta = ev.wheelDelta;
});
