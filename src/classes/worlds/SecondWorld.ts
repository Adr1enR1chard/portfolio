import * as THREE from 'three';
import { World } from '../abstracts/World.ts'
import { SkyBox } from '../objects/Skybox.ts';
import { App } from '../App.ts';

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

        // Skybox
        const skybox = new SkyBox();
        this.scene.add(skybox);
    }

    protected override animate() {
        this.camera.rotation.y = Math.min(App.instance.animationTime - Math.PI / 4, 0);

        if (App.instance.activeWorld == 1) {
            this.camera.rotation.y = (App.instance.animationTime - 1.13) * 3;
        }

        super.animate();
    }
}