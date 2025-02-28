import * as THREE from 'three';
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';

/**
 * Base renderer for the three.js app.
 */
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas') });
// renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

const scene = new THREE.Scene();
scene.background = new THREE.Color('lightblue');

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight);
camera.position.z = 5;
camera.position.y = 5;

new OrbitControls(camera, renderer.domElement);

// Loaders
const gltfLoader = new GLTFLoader();

// Laptop
let laptop;
const animationMixer = new THREE.AnimationMixer();
gltfLoader.load('/meshes/laptop/laptop.gltf', function (data) {
    laptop = data.scene;
    laptop.rotateY(-Math.PI / 2)

    animationMixer.clipAction(data.animations[0], laptop).play();
    scene.add(laptop);
});

scene.add(new THREE.AmbientLight(new THREE.Color('white'), 5))
scene.add(new THREE.DirectionalLight(new THREE.Color('white'), 10))
scene.add(new THREE.PointLight(new THREE.Color('white'), 1))

// Helpers
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

function animate() {

    animationMixer.update(1 / 60);
    renderer.render(scene, camera);
}
