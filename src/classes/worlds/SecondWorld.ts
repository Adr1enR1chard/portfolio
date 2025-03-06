import * as THREE from 'three';
import { World } from '../abstracts/World.ts'
import { App } from '../App.ts';
import { LoadedObject } from '../abstracts/LoadedObject.ts';

export class SecondWorld extends World {
    private logos: THREE.Object3D[];
    private circleRadius = 5;

    protected override start() {
        super.start();
        this.scene.background = new THREE.Color('lightblue');
        this.camera.position.z = 5;
        this.camera.position.y = 2;

        // Lights
        const ambientLight = new THREE.AmbientLight(new THREE.Color('white'), 5);
        this.root.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(new THREE.Color('white'), 10);
        this.root.add(directionalLight);
        this.logos = [];

        let github = new LoadedObject('./meshes/logos/github/github.gltf');
        github.rotateX(Math.PI / 2);
        github.scale.multiplyScalar(0.2);
        this.root.add(github);
        this.logos.push(github);

        github = new LoadedObject('./meshes/logos/github/github.gltf');
        github.rotateX(Math.PI / 2);
        github.scale.multiplyScalar(0.2);
        this.root.add(github);
        this.logos.push(github);

        github = new LoadedObject('./meshes/logos/github/github.gltf');
        github.rotateX(Math.PI / 2);
        github.scale.multiplyScalar(0.2);
        this.root.add(github);
        this.logos.push(github);

    }

    protected override animate() {
        const mainWorldCameraPos = App.instance.mainWorld.camera.position;
        // const mainWorldCameraRot = App.instance.mainWorld.camera.rotation;
        // this.camera.rotation.set(mainWorldCameraRot.x, mainWorldCameraRot.y, mainWorldCameraRot.z);

        if (App.instance.activeWorld == 1) {
            // this.camera.rotation.y = (App.instance.animationTime - 1.13) * 3;
            this.camera.position.set(0, 2, 5);
        } else {
            this.camera.position.set(0, 2, -mainWorldCameraPos.z * 2 + 5);
        }

        let i = 0;
        this.logos.forEach(logo => {
            const angle = App.instance.clock.elapsedTime + i * (2 * Math.PI) / this.logos.length;
            logo.position.x = Math.cos(angle) * this.circleRadius;
            logo.position.z = Math.sin(angle) * this.circleRadius;
            i++;
        });

        super.animate();
    }
}