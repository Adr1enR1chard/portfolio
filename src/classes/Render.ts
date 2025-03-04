import * as THREE from 'three';
import { World } from './abstracts/World';


export class Render {
    static renderer = new THREE.WebGLRenderer({ canvas: <HTMLCanvasElement>document.getElementById('three-canvas') });
    static renderTarget = new THREE.WebGLRenderTarget(512, 512);

    worlds: World[];

    constructor() {
        Render.renderer.setPixelRatio(World.rendererSize[0] / World.rendererSize[1]);
        Render.renderer.setSize(World.rendererSize[0], World.rendererSize[1]);

        this.worlds = new Array<World>();
    }

    public addWorld(world: World) {
        this.worlds.push(world);
    }

    public render() {
        this.worlds[1].camera.rotation.set(this.worlds[0].camera.rotation.x, this.worlds[0].camera.rotation.y, this.worlds[0].camera.rotation.z);

        Render.renderer.setRenderTarget(Render.renderTarget);
        Render.renderer.render(this.worlds[1].scene, this.worlds[1].camera);
        Render.renderer.setRenderTarget(null);
        Render.renderer.render(this.worlds[0].scene, this.worlds[0].camera);
        requestAnimationFrame(this.render.bind(this));
    }

}
