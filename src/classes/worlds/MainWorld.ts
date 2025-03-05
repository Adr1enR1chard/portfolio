import * as THREE from 'three';
import { World } from '../abstracts/World.ts'
import { Laptop } from '../objects/Laptop.ts';
import { App } from '../App.ts';

export class MainWorld extends World {
    private laptop: Laptop;

    protected override start() {
        super.start();
        this.camera.position.z = 5;
        this.camera.position.y = 1;
        this.scene.background = new THREE.Color(0x02011d);

        // Lights
        const ambientLight = new THREE.AmbientLight(new THREE.Color('white'), 0.1);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(new THREE.Color('white'), 1);
        this.scene.add(directionalLight);

        const pointLight = new THREE.PointLight(new THREE.Color('white'), 5, 0, 1);
        pointLight.position.z = 2;
        pointLight.position.y = 3;
        pointLight.position.x = -1;
        this.scene.add(pointLight);

        this.laptop = new Laptop(App.renderTarget.texture);
        this.scene.add(this.laptop);
    }

    protected override animate() {
        super.animate();
        this.laptop.animate(this.animationTime);
        // this.camera.position.y = 2 - this.animationTime;
    }

    public getLaptop() {
        return this.laptop;
    }
}