import * as THREE from 'three';
import { Pass } from 'three/examples/jsm/Addons.js';

export abstract class World {
    private isActive = false;

    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    root: THREE.Object3D;
    passes: Pass[];

    constructor(active: boolean, aspect: number | undefined) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, aspect);
        this.root = new THREE.Object3D();
        this.passes = new Array<Pass>();

        this.isActive = active;

        // Starting the scene
        this.start();
    }

    protected start() {
        this.scene.add(this.root);
    }

    /**
     * If overidden, MUST be call trough `super`
     * at THE END of the overidding function.
     */
    public animate() {

    }

    public setActive(active: boolean) {
        this.isActive = active;
    }
}