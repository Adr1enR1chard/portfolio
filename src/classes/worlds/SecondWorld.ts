import * as THREE from 'three';
import { World } from '../abstracts/World.ts'
import { Laptop } from '../objects/Laptop.ts';

export class SecondWorld extends World {
    protected override start() {
        super.start();
        this.scene.background = new THREE.Color('lightblue');

        // Lights
        const ambientLight = new THREE.AmbientLight(new THREE.Color('white'), 5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(new THREE.Color('white'), 10);
        this.scene.add(directionalLight);

        // Meshes
        const sphere = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshStandardMaterial({ color: new THREE.Color('white') }));
        sphere.position.z = -5;
        this.scene.add(sphere);
    }

    protected override animate() {
        super.animate();

        // if (this.clock.getElapsedTime() > 2) {
        //     World.setActive(this);
        // }
    }
}