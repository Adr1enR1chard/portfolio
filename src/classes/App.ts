import * as THREE from 'three';
import { MainWorld } from './worlds/MainWorld';
import { SecondWorld } from './worlds/SecondWorld';


export class App {
    static #instance: App;

    public static get instance(): App {
        if (!App.#instance) {
            App.#instance = new App();
        }

        return App.#instance;
    }

    /*
        RENDER
    */
    private _renderer: THREE.WebGLRenderer;
    public get renderer(): THREE.WebGLRenderer {
        return this._renderer;
    }
    public set renderer(value: THREE.WebGLRenderer) {
        this._renderer = value;
    }

    private _renderTarget: THREE.WebGLRenderTarget<THREE.Texture>;
    public get renderTarget(): THREE.WebGLRenderTarget<THREE.Texture> {
        return this._renderTarget;
    }
    public set renderTarget(value: THREE.WebGLRenderTarget<THREE.Texture>) {
        this._renderTarget = value;
    }

    private _renderSize: THREE.Vector2;
    public get renderSize(): THREE.Vector2 {
        return this._renderSize;
    }
    public set renderSize(value: THREE.Vector2) {
        this._renderSize = value;
    }

    /*
        WORLDS
    */
    private _activeWorld: number;
    public get activeWorld(): number {
        return this._activeWorld;
    }
    public set activeWorld(value: number) {
        this._activeWorld = value;
    }

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

    /*
        ANIMATION
    */
    private _clock: THREE.Clock;
    public get clock(): THREE.Clock {
        return this._clock;
    }
    public set clock(value: THREE.Clock) {
        this._clock = value;
    }

    private _animationTime: number;
    public get animationTime(): number {
        return this._animationTime;
    }
    public set animationTime(value: number) {
        this._animationTime = value;
    }

    private _animationSmoothFactor: number;
    public get animationSmoothFactor(): number {
        return this._animationSmoothFactor;
    }
    public set animationSmoothFactor(value: number) {
        this._animationSmoothFactor = value;
    }

    private _animationSpeed: number;
    public get animationSpeed(): number {
        return this._animationSpeed;
    }
    public set animationSpeed(value: number) {
        this._animationSpeed = value;
    }

    /*
        INPUTS
    */
    private _wheelDelta: number;
    public get wheelDelta(): number {
        return this._wheelDelta;
    }
    public set wheelDelta(value: number) {
        this._wheelDelta = value;
    }

    private _previousWheelDelta: number;
    public get previousWheelDelta(): number {
        return this._previousWheelDelta;
    }
    public set previousWheelDelta(value: number) {
        this._previousWheelDelta = value;
    }


    private constructor() {
        // Main renderer of the app
        this.renderer = new THREE.WebGLRenderer({ canvas: <HTMLCanvasElement>document.getElementById('three-canvas') });
        // Setting the renderer to the window size
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // Setting the pixel ratio
        this.renderer.setPixelRatio(window.innerWidth / window.innerHeight);
        // Make render size accesible to app depencies 
        this.renderSize = new THREE.Vector2(window.innerWidth, window.innerHeight);

        // Render target used to render different scene
        this.renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);

        // The world the main renderer is currently rendering
        this.activeWorld = 0;

        // The app clock
        this.clock = new THREE.Clock(true);
        // Time used to define where the user is in the animation
        this.animationTime = 0;
        // Speed of the animation
        this.animationSpeed = 0.04;
        // Used to smooth the animation during lerping
        this.animationSmoothFactor = 0.99; // Between 1 and 0

        // Wheel delta updated every frame
        this.wheelDelta = 0;
        // Wheel delta from the previous frame
        this.previousWheelDelta = 0;
    }

    /** Main loop of the app */
    public loop() {
        // First compute the animation time
        this.computeAnimationTime();

        // Then check in wich world we are
        this.switchWorld();

        // And render
        this.render();
        requestAnimationFrame(this.loop.bind(this));
    }

    private computeAnimationTime() {

        // Smoothed wheel delta lerped between the current and the previous wheel delta
        const smoothedDelta = THREE.MathUtils.lerp(this.wheelDelta, this.previousWheelDelta, this.animationSmoothFactor);
        this.previousWheelDelta = smoothedDelta;
        this.wheelDelta = 0;

        // The animation time is greater or equal to 0
        this.animationTime = Math.max(this.animationTime - smoothedDelta * this.animationSpeed * this.clock.getDelta(), 0);
    }

    private render() {
        if (this.activeWorld == 1) {
            // In case we are in the secondary world
            this.renderer.setRenderTarget(null);
            this.renderer.render(this.secondWorld.scene, this.secondWorld.camera);

        } else {
            // In case we are still in the primary world
            // we render trough the target the second world
            this.renderer.setRenderTarget(this.renderTarget);
            this.renderer.render(this.secondWorld.scene, this.secondWorld.camera);

            // And we render the main world in front of it
            this.renderer.setRenderTarget(null);
            this.renderer.render(this.mainWorld.scene, this.mainWorld.camera);
        }
    }

    private switchWorld() {
        // The switch time seems to be here...
        if (this.animationTime >= 1.13) {
            this.activeWorld = 1;
        } else {
            this.activeWorld = 0;
        }
    }
}
