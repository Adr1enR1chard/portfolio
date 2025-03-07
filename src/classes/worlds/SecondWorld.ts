import * as THREE from 'three';
import { World } from '../abstracts/World.ts'
import { App } from '../App.ts';
import { OutlinePass, OutputPass, RenderPass } from 'three/examples/jsm/Addons.js';
import { Logo } from '../objects/Logo.ts';

export class SecondWorld extends World {
    private logos: Logo[];
    private circleRadius = 5;
    private raycaster = new THREE.Raycaster();
    private outlinePass: OutlinePass;

    protected override start() {
        super.start();
        this.scene.background = new THREE.Color('lightblue');
        this.camera.position.z = 5;
        this.camera.position.y = 2;
        this.outlinePass = new OutlinePass(App.instance.renderSize, this.scene, this.camera);
        this.outlinePass.edgeStrength = 5;
        this.outlinePass.edgeGlow = 5;
        const renderPass = new RenderPass(this.scene, this.camera);
        this.passes = [renderPass, this.outlinePass, new OutputPass()];

        // Lights
        const ambientLight = new THREE.AmbientLight(new THREE.Color('white'), 5);
        this.root.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(new THREE.Color('white'), 10);
        this.root.add(directionalLight);
        this.logos = [];

        let github = new Logo('./meshes/logos/github/github.gltf', 'https://github.com/Adr1enR1chard');
        github.rotateX(Math.PI / 2);
        github.scale.multiplyScalar(0.2);
        this.root.add(github);
        this.logos.push(github);

        github = new Logo('./meshes/logos/github/github.gltf', 'https://github.com/Adr1enR1chard');
        github.rotateX(Math.PI / 2);
        github.scale.multiplyScalar(0.2);
        this.root.add(github);
        this.logos.push(github);

        github = new Logo('./meshes/logos/github/github.gltf', 'https://github.com/Adr1enR1chard');
        github.rotateX(Math.PI / 2);
        github.scale.multiplyScalar(0.2);
        this.root.add(github);
        this.logos.push(github);

    }

    public override animate() {
        const mainWorldCameraPos = App.instance.mainWorld.camera.position;

        if (App.instance.activeWorld == 1) {
            this.camera.position.set(0, 2, 5);
        } else {
            this.camera.position.set(0, 2, -mainWorldCameraPos.z * 2 + 5);
        }

        let i = 0;
        this.logos.forEach(logo => {
            const angle = App.instance.clock.elapsedTime * 0.5 + i * (2 * Math.PI) / this.logos.length;
            logo.position.x = Math.cos(angle) * this.circleRadius;
            logo.position.z = Math.sin(angle) * this.circleRadius;
            i++;
        });

        this.mouseRaycast();

        super.animate();
    }

    public mouseRaycast() {
        this.raycaster.setFromCamera(App.instance.pointer, this.camera);

        const intersects = this.raycaster.intersectObjects(this.scene.children);

        this.outlinePass.selectedObjects = [];
        intersects.forEach((intersect) => {
            // Trying to reach the Logo instance
            let obj: THREE.Object3D | null = intersect.object;
            while (obj && !(obj instanceof Logo)) {
                obj = obj.parent;
            }

            if (obj) {
                this.outlinePass.selectedObjects.push(obj);
            }
        });
    }

    public onMouseClick() {
        this.outlinePass.selectedObjects.forEach(object => {
            if (object instanceof Logo) {
                object.onMouseClick();
            }
        });
    }
}