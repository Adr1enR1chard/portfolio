import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/Addons.js';

export class Laptop extends THREE.Object3D {
    #active = false;

    animationsDuration: number;
    animationMixer: THREE.AnimationMixer;

    constructor() {
        super();
        this.animationMixer = new THREE.AnimationMixer(this);
        this.loadModel();
    }

    private loadModel() {
        const gltfLoader = new GLTFLoader();
        gltfLoader.load('/meshes/laptop/laptop.gltf', (gltf) => this.initiate(gltf));
    }

    private initiate(gltf: GLTF) {
        // Adding the laptop as child
        this.add(gltf.scene);

        // Animation loading
        this.animations = gltf.animations;
        this.animationsDuration = this.animations[0].duration;
        this.animations.forEach(animation => {
            this.animationMixer.clipAction(animation, this).play();
        });

        // Screen texture assigning
        const screen = this.getObjectByName("Screen");
        if (screen != undefined && screen instanceof THREE.Mesh) {
            screen.material.color = new THREE.Color('white');
            screen.material.map = null;
        } else {
            throw new Error('Screen mesh undefined');
        }

        this.#active = true;
    }

    public animate(animationTime: number) {
        if (this.#active) {
            this.animationMixer.setTime(Math.min(animationTime, this.animationsDuration - 0.1));
            this.animationMixer.update(1 / 60);

            const rotation = animationTime * (Math.PI / 2) / this.animationsDuration - Math.PI
            this.rotation.y = Math.min(rotation, -Math.PI / 2);
            this.position.y = Math.min(animationTime, this.animationsDuration) - 1;
        }
    }
}
