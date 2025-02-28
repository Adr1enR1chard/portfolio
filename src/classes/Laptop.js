import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

export class Laptop extends THREE.Object3D {
    #active = false;

    animation;
    animationMixer;

    constructor() {
        super();
        this.animationMixer = new THREE.AnimationMixer();
        this.loadModel();
    }

    loadModel() {
        const gltfLoader = new GLTFLoader();
        gltfLoader.load('/meshes/laptop/laptop.gltf', (gltf) => this.initiate(gltf));
    }

    initiate(gltf) {
        this.add(gltf.scene);
        this.animation = gltf.animations[0];
        this.animationMixer.clipAction(this.animation, this).play();

        this.#active = true;
    }

    animate(delta, animationTime) {
        if (this.#active) {
            this.animationMixer.setTime(Math.min(animationTime, this.animation.duration - 0.1));
            this.animationMixer.update(1 / 60);

            this.rotation.y = animationTime * (Math.PI / 2) / this.animation.duration - Math.PI;
            this.position.y = animationTime - 1;
        }
    }
}
