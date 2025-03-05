import * as THREE from 'three';

export abstract class World {
    static activeRenderer: World;

    private wheelDelta = 0;
    private previousWheelDelta = 0;

    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    clock: THREE.Clock;

    animationTime: number;
    animationSpeed: number;
    animationSmoothFactor: number;

    static setActive(world: World) {
        World.activeRenderer = world;
    }

    constructor(active: boolean, aspect: number | undefined) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, aspect);

        if (active) {
            World.setActive(this);
        }

        // World relatives
        this.clock = new THREE.Clock(true);
        this.animationTime = 0;
        this.animationSpeed = 0.03;
        this.animationSmoothFactor = 0.9; // Between 1 and 0

        // Starting the scene
        this.start();

        this.animate();
    }

    protected start() {

    }

    protected animate() {
        this.computeAnimationTime();
        requestAnimationFrame(this.animate.bind(this));
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