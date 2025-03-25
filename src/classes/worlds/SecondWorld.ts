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


        const main = document.querySelector('.main-body');

        this.panelArray = new PanelArray(Panels);
        main?.appendChild(this.panelArray.element);
        this.hidePanels();


        this.description = Descriptions[0];
    }

    public override animate() {
        App.instance.animationTime = Math.min(App.instance.animationTime, 1);

        (this.backgroundCube.material as THREE.ShaderMaterial).uniforms.time.value = App.instance.clock.getElapsedTime();
        (this.backgroundCube.material as THREE.ShaderMaterial).uniforms.renderSize.value = App.instance.renderSize;

        super.animate();
    }

    public switchView(id: number) {
        this.currentView = (this.currentView + 1) % 2;
        if (this.currentView == 0) {
            this.showPanels();
            this.hideDescription(true);
            TypeWriter.instance.pushNewMessage(new TypeMessage("Please select a project", 100, 20));
        } else {
            this.hidePanels();

            this.description = Descriptions[id];
            this.showDescription();

            TypeWriter.instance.pushNewMessage(new TypeMessage("Opening " + this.description.title + "...", 100, 20));

        }
    }

    public nextSlide() {
        this.description.nextSlide();
    }

    public prevSlide() {
        this.description.prevSlide();
    }

    public showPanels() {
        this.panelArray.element.style.visibility = "visible";
        this.panelArray.element.style.opacity = "1";
    }

    public hidePanels() {
        this.panelArray.element.style.visibility = "hidden";
        this.panelArray.element.style.opacity = "0";
    }

    public showDescription() {
        this.description.element.style.visibility = "visible";
        this.description.element.style.opacity = "1";
        App.instance.mainElement.appendChild(this.description.element);
    }

    public hideDescription(remove: boolean = false) {
        this.description.element.style.visibility = "hidden";
        this.description.element.style.opacity = "0";
        if (remove && App.instance.mainElement.contains(this.description.element))
            App.instance.mainElement.removeChild(this.description.element);
    }
}