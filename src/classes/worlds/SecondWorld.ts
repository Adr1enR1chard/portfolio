import * as THREE from 'three';
import { World } from '../abstracts/World.ts'
import { OrbitControls, OutlinePass, OutputPass, RenderPass } from 'three/examples/jsm/Addons.js';
import { Panel } from '../html_objects/Panel.ts';
import { App } from '../App.ts';
import { PanelArray } from '../html_objects/PanelArray.ts';
import { Description } from '../html_objects/Description.ts';
import { TypeWriter } from '../TypeWriter.ts';
import { TypeMessage } from '../TypeMessage.ts';
import { Panels } from '../html_objects/Panels.ts';
import { Descriptions } from '../html_objects/Descriptions.ts';
import { BackgroundShader } from '../../shaders/BackgroundShader.ts';

export class SecondWorld extends World {
    private circleRadius = 5;
    private raycaster = new THREE.Raycaster();
    private outlinePass: OutlinePass;

    private panelArray: PanelArray;
    private panel: Panel;
    orbitControls: OrbitControls;
    description: Description;
    public currentView = 0;

    private backgroundCube: THREE.Mesh;

    protected override start() {
        super.start();
        this.scene.background = null;
        this.camera.position.z = 800;

        const renderPass = new RenderPass(this.scene, this.camera);
        this.passes = [renderPass, new OutputPass()];

        this.backgroundCube = new THREE.Mesh(
            new THREE.BoxGeometry(1000, 1000, 1000),
            new THREE.ShaderMaterial({
                uniforms: BackgroundShader.uniforms,
                vertexShader: BackgroundShader.vertexShader,
                fragmentShader: BackgroundShader.fragmentShader,
                side: THREE.BackSide
            }));
        this.scene.add(this.backgroundCube);


        this.panelArray = new PanelArray(Panels);
        this.panelArray.scale.setScalar(0);
        this.cssScene.add(this.panelArray);

        // this.orbitControls = new OrbitControls(this.camera, App.instance.cssRenderer.domElement);
        // this.orbitControls.enableZoom = false;
        // this.orbitControls.enablePan = false;
        // this.orbitControls.maxAzimuthAngle = Math.PI / 4;
        // this.orbitControls.minAzimuthAngle = -Math.PI / 4;
        // this.orbitControls.maxPolarAngle = 3 * Math.PI / 4;
        // this.orbitControls.minPolarAngle = Math.PI / 4;


        this.description = Descriptions[0];
        this.cssScene.add(this.description);
    }

    public override animate() {

        App.instance.animationTime = Math.min(App.instance.animationTime, 1);

        const scale = Math.max(0, 0 + (App.instance.animationTime - 0.85) / 0.15)
        if (this.currentView == 0) {
            this.panelArray.scale.setScalar(scale);
            this.description.scale.setScalar(0);

        } else {
            this.panelArray.scale.setScalar(0);
            this.description.scale.setScalar(scale);
        }

        // this.orbitControls.target.set(0, 0, 0);
        this.camera.position.lerp(new THREE.Vector3(0, 0, 800), 0.01);

        // this.orbitControls.update(App.instance.clock.getDelta());

        (this.backgroundCube.material as THREE.ShaderMaterial).uniforms.time.value = App.instance.clock.getElapsedTime();

        super.animate();
    }

    public switchView(id: number) {
        this.currentView = (this.currentView + 1) % 2;
        if (this.currentView == 0) {
            TypeWriter.instance.pushNewMessage(new TypeMessage("Please select a project", 100, 20));
        } else {
            this.description.scale.setScalar(0);
            this.cssScene.remove(this.description);
            this.description = Descriptions[id];
            this.cssScene.add(this.description);
            TypeWriter.instance.pushNewMessage(new TypeMessage("Opening " + this.description.title + "...", 100, 20));
        }
    }

    public nextSlide() {
        this.description.nextSlide();
    }

    public prevSlide() {
        this.description.prevSlide();
    }
}