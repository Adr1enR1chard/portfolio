import * as THREE from 'three';

export abstract class World {
    private isActive = false;

    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    root: THREE.Object3D;

    constructor(active: boolean, aspect: number | undefined) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, aspect);
        this.root = new THREE.Object3D();

        this.isActive = active;

        // Starting the scene
        this.start();

        this.animate();
    }

    protected start() {
        this.scene.add(this.root);
    }

    /**
     * If overidden, MUST be call trough `super`
     * at THE END of the overidding function.
     */
    protected animate() {
        if (this.isActive) {
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    public setActive(active: boolean) {
        this.isActive = active;
    }
}