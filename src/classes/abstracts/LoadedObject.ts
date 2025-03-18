import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/Addons.js';

export class LoadedObject extends THREE.Object3D {
    private _isActive = false;
    public get isActive() {
        return this._isActive;
    }
    public set isActive(value) {
        this._isActive = value;
    }

    private _animationsDuration: number;
    public get animationsDuration(): number {
        if (this.animations.length == 0) {
            return 0;
        }
        return this._animationsDuration;
    }
    public set animationsDuration(value: number) {
        this._animationsDuration = value;
    }

    private _animationMixer: THREE.AnimationMixer;
    public get animationMixer(): THREE.AnimationMixer {
        return this._animationMixer;
    }
    public set animationMixer(value: THREE.AnimationMixer) {
        this._animationMixer = value;
    }

    private path: string;
    private onLoad: (() => void) | undefined;

    constructor(path: string, onLoad?: () => void) {
        super();
        this.animationMixer = new THREE.AnimationMixer(this);
        this.path = path
        this.onLoad = onLoad;
        this.loadModel();
    }

    private loadModel() {
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(this.path, (gltf) => this.initiate(gltf));
    }

    protected initiate(gltf: GLTF) {
        // Adding the laptop as child
        this.add(gltf.scene);

        // this.enableShadows(this);

        // Animation loading
        this.animations = gltf.animations;
        if (this.animations.length > 0) {
            this.animationsDuration = this.animations[0].duration;
            this.animations.forEach(animation => {
                this.animationMixer.clipAction(animation, this).play();
            });
        }
        this.isActive = true;

        if (this.onLoad) {
            this.onLoad();
        }
    }

    public animate() {

    }

    private enableShadows(object: THREE.Object3D) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.children.forEach(object => {
            this.enableShadows(object);
        });
    }

}
