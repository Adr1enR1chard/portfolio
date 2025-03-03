import * as THREE from 'three';

export abstract class AbstractWorld {
    static rendererSize = [window.innerWidth, window.innerHeight]
    static activeRenderer: AbstractWorld;

    private wheelDelta = 0;
    private previousWheelDelta = 0;

    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    clock: THREE.Clock;

    animationTime: number;
    animationSpeed: number;
    animationSmoothFactor: number;

    constructor(active: boolean) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, AbstractWorld.rendererSize[0] / AbstractWorld.rendererSize[1]);
        this.renderer = new THREE.WebGLRenderer({ canvas: <HTMLCanvasElement>document.getElementById('three-canvas') });

        // Renderer settings
        this.renderer.setSize(AbstractWorld.rendererSize[0], AbstractWorld.rendererSize[1]);
        this.renderer.setAnimationLoop(this.animate.bind(this));
        this.renderer.setPixelRatio(window.devicePixelRatio);

        if (active) {
            AbstractWorld.activeRenderer = this;
        }

        // World relatives
        this.clock = new THREE.Clock(true);
        this.animationTime = 0;
        this.animationSpeed = 0.03;
        this.animationSmoothFactor = 0.9; // Between 1 and 0

        // Starting the scene
        this.start();
    }

    protected start() {

    }

    protected animate() {
        this.computeAnimationTime();
        this.render();
    }

    protected render() {
        if (AbstractWorld.activeRenderer == this) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    private computeAnimationTime() {
        this.wheelDelta = THREE.MathUtils.lerp(this.wheelDelta, this.previousWheelDelta, this.animationSmoothFactor);
        this.animationTime = Math.max(this.animationTime - this.wheelDelta * this.animationSpeed * this.clock.getDelta(), 0);
        this.previousWheelDelta = this.wheelDelta;
        this.wheelDelta = 0;
    }

    private setWheelDelta(wheelDetal: number) {
        this.wheelDelta = wheelDetal;
    }
}