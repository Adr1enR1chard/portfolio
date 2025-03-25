import * as THREE from 'three';
import { Pass } from 'three/examples/jsm/Addons.js';

export abstract class World {
    private isActive = false;

    scene: THREE.Scene;
    cssScene: THREE.Scene;
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
    root: THREE.Object3D;
    passes: Pass[];

    constructor(active: boolean, aspect: number | undefined) {
        this.scene = new THREE.Scene();
        this.cssScene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, aspect, 0.1, 2000);
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

    public resize() {
        if (this.camera instanceof THREE.PerspectiveCamera) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        }
    }
}