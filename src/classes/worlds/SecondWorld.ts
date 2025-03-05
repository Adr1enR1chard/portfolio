import * as THREE from 'three';
import { World } from '../abstracts/World.ts'

export class SecondWorld extends World {
    protected override start() {
        super.start();
        this.scene.background = new THREE.Color('lightblue');
        this.camera.position.z = 5;
        this.camera.position.y = 1;

        // Lights
        const ambientLight = new THREE.AmbientLight(new THREE.Color('white'), 5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(new THREE.Color('white'), 10);
        this.scene.add(directionalLight);

        // Meshes
        const sphere = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshStandardMaterial({ color: new THREE.Color('white') }));
        sphere.position.z = -5;
        this.scene.add(sphere);

        const helper = new THREE.GridHelper(100, 100);
        this.scene.add(helper);
    }

    protected override animate() {
        super.animate();
    }
}