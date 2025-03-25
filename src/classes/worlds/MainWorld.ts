import * as THREE from 'three';
import { World } from '../abstracts/World.ts'
import { App } from '../App.ts';
import { LoadedObject } from '../abstracts/LoadedObject.ts';
import { lerp } from 'three/src/math/MathUtils.js';
import { BackgroundShader } from '../../shaders/BackgroundShader.ts';
// import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';

export class MainWorld extends World {
    private _cameraOrigin: THREE.Vector3;
    public get cameraOrigin(): THREE.Vector3 {
        return this._cameraOrigin;
    }
    public set cameraOrigin(value: THREE.Vector3) {
        this._cameraOrigin = value;
    }
    private _computerPosition: THREE.Vector3;
    public get computerPosition(): THREE.Vector3 {
        return this._computerPosition;
    }
    public set computerPosition(value: THREE.Vector3) {
        this._computerPosition = value;
    }

    private backgroundCube: THREE.Mesh;

    private monitor: THREE.Mesh;

    protected override start() {
        super.start();
        this.cameraOrigin = new THREE.Vector3(15.6, 3.16, 1);
        this.camera.position.set(this.cameraOrigin.x, this.cameraOrigin.y, this.cameraOrigin.z);
        this.camera.rotation.set(-2.58, 0.74, 2.69);
        // Fond d'un orange pale
        this.scene.background = new THREE.Color(0x000000);

        // this.passes = [ssrPass, antialiasPass, new OutputPass()];
        // App.instance.composer.passes = this.passes;

        // Ambient base light
        const ambientLight = new THREE.AmbientLight(new THREE.Color('white'), 0.5);
        this.root.add(ambientLight);

        const spotLight = new THREE.SpotLight(new THREE.Color('white'), 1.0, 50, Math.PI / 5, 0.5, 0.5);
        spotLight.position.set(15, 8, 2.8);
        spotLight.target.position.set(5, -2, 5.5);
        spotLight.castShadow = true;
        spotLight.shadow.bias = -0.0005;
        spotLight.shadow.mapSize.width = 2048;
        spotLight.shadow.mapSize.height = 2048;
        this.scene.add(spotLight);
        this.scene.add(spotLight.target);

        // const gui = new GUI();

        const pointLight = new THREE.PointLight(new THREE.Color('green'), 1);
        pointLight.position.set(5.8, -2.1, 8.7);
        this.scene.add(pointLight);

        const headphonePointLight = new THREE.PointLight(new THREE.Color('green'), 1);
        headphonePointLight.position.set(3.1, -1.6, 0.1);
        this.scene.add(headphonePointLight);


        const headphonePointLightBis = new THREE.PointLight(new THREE.Color('green'), 1);
        headphonePointLightBis.position.set(2.9, -1.6, -1.4);
        this.scene.add(headphonePointLightBis);


        const desk = new LoadedObject('/portfolio/meshes/desk/desk.glb', () => {
            this.monitor = <THREE.Mesh>desk.getObjectByName("monitor")?.children[0];
            this.computerPosition = this.monitor.getWorldPosition(new THREE.Vector3());

            if (this.monitor) {
                this.monitor.material = new THREE.ShaderMaterial({
                    uniforms: BackgroundShader.uniforms,
                    vertexShader: BackgroundShader.vertexShader,
                    fragmentShader: BackgroundShader.fragmentShader,
                    side: THREE.DoubleSide
                });
            }
        });

        desk.translateY(-3.6);
        desk.translateZ(4);
        desk.translateX(8);
        desk.rotateY(Math.PI / 2)
        desk.scale.multiplyScalar(2.5);
        this.root.add(desk);

        // Ground plane
        const plane = new THREE.Mesh(
            new THREE.CircleGeometry(20, 30),
            new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide, flatShading: true })
        );
        plane.position.y = -8.5;
        plane.position.z = 10;
        plane.rotateX(Math.PI / 2);
        plane.receiveShadow = true;
        plane.castShadow = true;
        // this.root.add(plane);
    }

    public override animate() {
        // this.laptop.animate();
        if (this.computerPosition) {
            this.camera.position.lerpVectors(this.cameraOrigin, new THREE.Vector3(0, 2, 0).add(this.computerPosition), App.instance.animationTime / 1);
        }
        this.camera.rotation.y = lerp(0.74, Math.PI / 2, App.instance.animationTime / 1);

        if (App.instance.animationTime == 0) {
            this.camera.position.x += Math.cos(App.instance.clock.elapsedTime * 0.1) * 0.3;
            this.camera.position.y += Math.cos(App.instance.clock.elapsedTime * 0.3) * 0.3;
            this.camera.position.z += Math.cos(App.instance.clock.elapsedTime * 0.5) * 0.3;
        }

        if (this.monitor) {
            (this.monitor.material as THREE.ShaderMaterial).uniforms.time.value = App.instance.clock.getElapsedTime();
            (this.monitor.material as THREE.ShaderMaterial).uniforms.renderSize.value = App.instance.renderSize;
        }
        super.animate();
    }
}