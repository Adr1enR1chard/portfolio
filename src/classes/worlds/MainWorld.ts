import * as THREE from 'three';
import { AbstractWorld } from '../abstracts/World.ts'
import { Laptop } from '../objects/Laptop.ts';

export class MainWorld extends AbstractWorld {
    private laptop: Laptop;

    constructor(active: boolean) {
        super(active);
        this.scene.background = new THREE.Color('lightblue');
    }

    protected override start() {
        super.start();
        this.camera.position.z = 5;
        this.camera.position.y = 1;

        // Lights
        const ambientLight = new THREE.AmbientLight(new THREE.Color('white'), 5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(new THREE.Color('white'), 10);
        this.scene.add(directionalLight);

        // Laptop 
        this.laptop = new Laptop();
        this.scene.add(this.laptop);

        console.log('everything started');
    }

    protected override animate() {
        super.animate();
        this.laptop.animate(this.animationTime);
    }
}