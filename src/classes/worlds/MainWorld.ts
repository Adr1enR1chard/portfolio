import * as THREE from 'three';
import { World } from '../abstracts/World.ts'
import { Laptop } from '../objects/Laptop.ts';
import { App } from '../App.ts';
import { LoadedObject } from '../abstracts/LoadedObject.ts';
import { lerp } from 'three/src/math/MathUtils.js';
import { SkyBox } from '../objects/Skybox.ts';

export class MainWorld extends World {
    private laptop: Laptop;

    private cameraOrigin: THREE.Vector3;

    protected override start() {
        super.start();
        this.cameraOrigin = new THREE.Vector3(19.6, 7.16, -5.89);
        this.camera.position.set(this.cameraOrigin.x, this.cameraOrigin.y, this.cameraOrigin.z);
        this.camera.rotation.set(-2.52, 0.74, 2.69);
        this.scene.background = new THREE.Color(new THREE.Color('black'));

        // const orbitControls = new OrbitControls(this.camera, App.instance.renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(new THREE.Color('white'), 0.2);
        this.root.add(ambientLight);

        const spotLight = new THREE.SpotLight(new THREE.Color(0xfff5b6), 100, 0, Math.PI / 4, 1, 1.5);
        spotLight.castShadow = true;
        spotLight.shadow.bias = -0.0002;
        spotLight.shadow.mapSize = new THREE.Vector2(2048, 2048);
        spotLight.position.z = 5;
        spotLight.position.y = 20;
        spotLight.position.x = 8;
        spotLight.rotation.z = Math.PI;
        spotLight.rotation.x = Math.PI;
        spotLight.target.position.z = 5;
        spotLight.target.position.y = 0;
        spotLight.target.position.x = 8;
        this.scene.add(spotLight);
        this.scene.add(spotLight.target);

        const pointLight = new THREE.PointLight(new THREE.Color('white'), 0.1, 0, 0.1);
        pointLight.position.z = 14;
        pointLight.position.y = 2;
        pointLight.position.x = 8;
        this.root.add(pointLight);


        this.laptop = new Laptop();
        this.laptop.position.y = 0.1;
        this.root.add(this.laptop);

        const bedroom = new LoadedObject('./meshes/bedroom/bedroom.gltf');
        bedroom.translateY(-3.6);
        bedroom.translateZ(4);
        bedroom.translateX(8);
        bedroom.scale.multiplyScalar(2.5);
        this.root.add(bedroom);

        this.root.add(new SkyBox());
    }

    protected override animate() {
        this.laptop.animate();
        this.camera.position.lerpVectors(this.cameraOrigin, new THREE.Vector3(0, 1, 0).add(this.laptop.position), App.instance.animationTime / this.laptop.animationsDuration);
        this.camera.rotation.y = lerp(0.74, Math.PI / 2, App.instance.animationTime / this.laptop.animationsDuration);

        if (App.instance.animationTime == 0) {
            this.camera.position.x += Math.cos(App.instance.clock.elapsedTime) * 0.1;
            this.camera.position.y += Math.cos(App.instance.clock.elapsedTime) * 0.1;
            this.camera.position.z += Math.cos(App.instance.clock.elapsedTime) * 0.1;
        }

        super.animate();
    }

    public getLaptop() {
        return this.laptop;
    }
}