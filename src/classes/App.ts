import * as THREE from 'three';
import { MainWorld } from './worlds/MainWorld';
import { SecondWorld } from './worlds/SecondWorld';


export class App {
    static renderer = new THREE.WebGLRenderer({ canvas: <HTMLCanvasElement>document.getElementById('three-canvas') });
    static renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
    static renderSize = new THREE.Vector2(window.innerWidth, window.innerHeight)

    private _mainWorld: MainWorld;
    public get mainWorld(): MainWorld {
        return this._mainWorld;
    }
    public set mainWorld(value: MainWorld) {
        this._mainWorld = value;
    }
    private _secondWorld: SecondWorld;
    public get secondWorld(): SecondWorld {
        return this._secondWorld;
    }
    public set secondWorld(value: SecondWorld) {
        this._secondWorld = value;
    }

    private activeWorld = 0;

    constructor() {
        App.renderer.setSize(window.innerWidth, window.innerHeight);
        App.renderer.setPixelRatio(window.innerWidth / window.innerHeight);
    }

    public render() {
        this.secondWorld.camera.rotation.set(this.mainWorld.camera.rotation.x, this.mainWorld.camera.rotation.y, this.mainWorld.camera.rotation.z);

        if (this.activeWorld == 1) {
            App.renderer.render(this.secondWorld.scene, this.secondWorld.camera);

        } else {
            App.renderer.setRenderTarget(App.renderTarget);
            App.renderer.render(this.secondWorld.scene, this.secondWorld.camera);
            App.renderer.setRenderTarget(null);
            App.renderer.render(this.mainWorld.scene, this.mainWorld.camera);
        }
        requestAnimationFrame(this.render.bind(this));
    }

    public switchWorld() {
        this.activeWorld = (this.activeWorld + 1) % 2
    }

    public getRenderSize() {
        return
    }
}
