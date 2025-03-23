import * as THREE from 'three';
import { World } from '../abstracts/World.ts'
import { Laptop } from '../objects/Laptop.ts';
import { App } from '../App.ts';
import { LoadedObject } from '../abstracts/LoadedObject.ts';
import { lerp } from 'three/src/math/MathUtils.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { BackgroundShader } from '../../shaders/BackgroundShader.ts';

export class MainWorld extends World {
    private laptop: Laptop;

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

    protected override start() {
        super.start();
        this.cameraOrigin = new THREE.Vector3(15.6, 3.16, 1);
        this.camera.position.set(this.cameraOrigin.x, this.cameraOrigin.y, this.cameraOrigin.z);
        this.camera.rotation.set(-2.58, 0.74, 2.69);
        this.scene.background = null; // Supprimer le fond noir
        // this.scene.add(backgroundSphere);

        const outlinePass = new OutlinePass(App.instance.renderSize, this.scene, this.camera);
        outlinePass.renderToScreen = true;
        this.passes = [new RenderPass(this.scene, this.camera)];
        App.instance.composer.passes = this.passes;

        // Ambient base light
        const ambientLight = new THREE.AmbientLight(new THREE.Color('white'), 0.5);
        this.root.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(new THREE.Color('white'), 0.5);
        directionalLight.position.set(5, 2, 0);
        this.root.add(directionalLight);

        // RGB accent lights with increased intensity and range
        // Create and add light helpers
        // const createLightWithHelper = (color: string, intensity: number, distance: number, position: THREE.Vector3) => {
        //     const light = new THREE.PointLight(new THREE.Color(color), intensity, distance);
        //     light.position.copy(position);
        //     this.root.add(light);

        //     // const helper = new THREE.PointLightHelper(light);
        //     // this.root.add(helper);

        //     return light;
        // };

        // Adjusted positions closer to the desk
        // createLightWithHelper('#0066ff', 2, 30, new THREE.Vector3(3, 1, 8));
        // createLightWithHelper('#ff0066', 2, 30, new THREE.Vector3(3, 1, 6));
        // createLightWithHelper('#9933ff', 1.5, 25, new THREE.Vector3(3, 1, 4));
        // createLightWithHelper('#00ffff', 1, 20, new THREE.Vector3(3, 1, 2));
        // createLightWithHelper('#ff00ff', 1, 20, new THREE.Vector3(3, 1, 0));
        // createLightWithHelper("#ffffff", 2, 30, new THREE.Vector3(3, 2, -2));


        const bedroom = new LoadedObject('/portfolio/meshes/desk/desk.glb', () => {
            const monitorObj = <THREE.Mesh>bedroom.getObjectByName("monitor")?.children[0];
            console.log(monitorObj);
            this.computerPosition = monitorObj.getWorldPosition(new THREE.Vector3());

            if (monitorObj) {
                monitorObj.material = new THREE.ShaderMaterial({
                    uniforms: BackgroundShader.uniforms,
                    vertexShader: BackgroundShader.vertexShader,
                    fragmentShader: BackgroundShader.fragmentShader,
                    side: THREE.DoubleSide
                });
            }
        });
        bedroom.translateY(-3.6);
        bedroom.translateZ(4);
        bedroom.translateX(8);
        bedroom.rotateY(Math.PI / 2)
        bedroom.scale.multiplyScalar(2.5);
        this.root.add(bedroom);


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

        super.animate();
    }

    public getLaptop() {
        return this.laptop;
    }
}