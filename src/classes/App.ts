import * as THREE from 'three';
import { MainWorld } from './worlds/MainWorld';
import { SecondWorld } from './worlds/SecondWorld';
import { CSS3DRenderer, EffectComposer } from 'three/examples/jsm/Addons.js';
import { TypeWriter } from './TypeWriter';
import { TypeMessage } from './TypeMessage';


export class App {
    static #instance: App;

    public static get instance(): App {
        if (!App.#instance) {
            App.#instance = new App();
        }

        return App.#instance;
    }

    private _loadingManager: THREE.LoadingManager;
    public get loadingManager(): THREE.LoadingManager {
        return this._loadingManager;
    }
    public set loadingManager(value: THREE.LoadingManager) {
        this._loadingManager = value;
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

    private _cssRenderer: CSS3DRenderer;
    public get cssRenderer(): CSS3DRenderer {
        return this._cssRenderer;
    }
    public set cssRenderer(value: CSS3DRenderer) {
        this._cssRenderer = value;
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

    private _composer: EffectComposer;
    public get composer(): EffectComposer {
        return this._composer;
    }
    public set composer(value: EffectComposer) {
        this._composer = value;
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

    private _pointer: THREE.Vector2;
    public get pointer(): THREE.Vector2 {
        if (!this._pointer) {
            this._pointer = new THREE.Vector2();
        }
        return this._pointer;
    }
    public set pointer(value: THREE.Vector2) {
        this._pointer = value;
    }

    private touchOrigin: number;

    private _mainElement: HTMLElement;
    public get mainElement(): HTMLElement {
        return this._mainElement;
    }
    public set mainElement(value: HTMLElement) {
        this._mainElement = value;
    }


    private constructor() {
        // Main renderer of the app
        this.renderer = new THREE.WebGLRenderer({ canvas: <HTMLElement>document.getElementById('three-canvas'), antialias: true, alpha: true });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        this.resize();
        // The main composer, useful to render effects passes.
        this.composer = new EffectComposer(this.renderer);

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

        this.mainElement = document.querySelector('.main-body') as HTMLElement;

        // Window resize event
        window.addEventListener('resize', () => {
            this.resize();
        });

        window.addEventListener('touchstart', this.onTouchStart.bind(this));
        window.addEventListener('touchmove', this.onTouchMove.bind(this));
        window.addEventListener('touchend', this.onTouchEnd.bind(this));
    }

    /** Main loop of the app */
    public loop() {
        // First compute the animation time
        this.computeAnimationTime();

        // Then check in wich world we are
        this.switchWorld();

        this.mainWorld.animate();

        this.secondWorld.animate();

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
            this.renderer.render(this.secondWorld.scene, this.secondWorld.camera);
        } else {
            this.renderer.render(this.mainWorld.scene, this.mainWorld.camera);
            // this.composer.render();
        }
    }

    private switchWorld() {
        // The switch time seems to be here...
        if (this.animationTime >= 0.85 && this.activeWorld != 1) {
            this.activeWorld = 1;
            // Write a message telling we enter the computer
            TypeWriter.instance.pushNewMessage(new TypeMessage("Computer entry...", 100, 20));
            TypeWriter.instance.pushNewMessage(new TypeMessage("Please select a project", 100, 20));

            this.secondWorld.currentView = 0;
            this.secondWorld.showPanels();
        } else if (this.animationTime < 0.85 && this.activeWorld != 0) {
            this.activeWorld = 0;
            TypeWriter.instance.pushNewMessage(new TypeMessage("Back to the real world...", 1000, 20));
            this.secondWorld.hidePanels();
            this.secondWorld.hideDescription();
        }
    }

    private resize() {
        this.renderSize = new THREE.Vector2(window.innerWidth, window.innerHeight);
        this.renderer.setSize(this.renderSize.x, this.renderSize.y);
        this.renderer.setPixelRatio(this.renderSize.x / this.renderSize.y);

        this.mainWorld?.resize();
        this.secondWorld?.resize();

    }

    private onTouchStart(event: TouchEvent) {
        this.touchOrigin = event.touches[0].clientY;
    }

    private onTouchMove(event: TouchEvent) {
        this.wheelDelta = (event.touches[0].clientY - this.touchOrigin) * 5.0;
        this.touchOrigin = event.touches[0].clientY;
    }

    private onTouchEnd() {
        this.touchOrigin = 0;
    }
}
