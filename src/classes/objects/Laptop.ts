import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/Addons.js';

export class Laptop extends THREE.Object3D {
    #active = false;

    animationsDuration: number;
    animationMixer: THREE.AnimationMixer;
    screen: THREE.Mesh;
    screenTexture: THREE.Texture;

    constructor(screenTexture: THREE.Texture) {
        super();
        this.animationMixer = new THREE.AnimationMixer(this);
        this.screenTexture = screenTexture;
        // this.screenTexture.rotation = Math.PI / 4;
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
        const screenObject = this.getObjectByName("Screen");
        if (screenObject != undefined && screenObject instanceof THREE.Mesh) {
            this.screen = <THREE.Mesh>screenObject;
            this.screen.material = new THREE.MeshBasicMaterial({ map: this.screenTexture, side: THREE.DoubleSide });
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

    public setScreenTexture(texture: THREE.Texture) {
        console.log(this.screen.material);
        if (!(this.screen.material instanceof THREE.MeshStandardMaterial)) {
            throw new Error('Screen material is not unique');
        }

        const material = <THREE.MeshStandardMaterial>this.screen.material;
        material.map = texture;
    }
}
