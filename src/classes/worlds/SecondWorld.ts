import * as THREE from 'three';
import { World } from '../abstracts/World.ts'
import { OrbitControls, OutlinePass, OutputPass, RenderPass } from 'three/examples/jsm/Addons.js';
import { Panel } from '../html_objects/Panel.ts';
import { App } from '../App.ts';
import { PanelArray } from '../html_objects/PanelArray.ts';
import { Image } from '../html_objects/Image.ts';
import { Description } from '../html_objects/Description.ts';

export class SecondWorld extends World {
    private circleRadius = 5;
    private raycaster = new THREE.Raycaster();
    private outlinePass: OutlinePass;

    private panelArray: PanelArray;
    private panel: Panel;
    orbitControls: OrbitControls;
    description: Description;

    private currentView = 0;

    protected override start() {
        super.start();
        this.scene.background = new THREE.Color('black');
        this.camera.position.z = 800;

        const renderPass = new RenderPass(this.scene, this.camera);
        this.passes = [renderPass, new OutputPass()];

        const panel = new Panel(
            "Slade",
            "Android arcade game",
            [
                new Image("unity.png"),
                new Image("csharp.png", 1.5),
                new Image("playstore.png")
            ]);

        this.panelArray = new PanelArray([panel]);
        this.panelArray.scale.setScalar(0);
        this.cssScene.add(this.panelArray);

        this.orbitControls = new OrbitControls(this.camera, App.instance.cssRenderer.domElement);
        this.orbitControls.enableZoom = false;
        this.orbitControls.enablePan = false;
        this.orbitControls.maxAzimuthAngle = Math.PI / 4;
        this.orbitControls.minAzimuthAngle = -Math.PI / 4;
        this.orbitControls.maxPolarAngle = 3 * Math.PI / 4;
        this.orbitControls.minPolarAngle = Math.PI / 4;

        this.description = new Description(panel);
        this.description.scale.setScalar(0);
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

        this.orbitControls.target.set(0, 0, 0);
        this.camera.position.lerp(new THREE.Vector3(0, 0, 800), 0.01);

        this.orbitControls.update(App.instance.clock.getDelta());

        super.animate();
    }

    public switchView() {
        this.currentView = (this.currentView + 1) % 2;
    }
}