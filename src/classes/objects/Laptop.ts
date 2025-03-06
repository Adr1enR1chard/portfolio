import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/Addons.js';
import { App } from '../App.ts';
import { LoadedObject } from '../abstracts/LoadedObject.ts';

export class Laptop extends LoadedObject {
    private screen: THREE.Mesh;
    constructor() {
        super('/meshes/laptop/laptop.gltf');
    }
    protected initiate(gltf: GLTF) {
        super.initiate(gltf);
        // Screen texture assigning
        const screenObject = this.getObjectByName("Screen");
        if (screenObject != undefined && screenObject instanceof THREE.Mesh) {
            this.screen = <THREE.Mesh>screenObject;
            this.screen.material = new THREE.ShaderMaterial({
                uniforms: {
                    uTexture: { value: App.instance.renderTarget.texture },
                    winResolution: { value: new THREE.Vector2(App.instance.renderSize.x, App.instance.renderSize.y).multiplyScalar(App.instance.renderer.getPixelRatio()) },
                },
                vertexShader: `
                            void main() {
                                gl_Position = projectionMatrix * viewMatrix* modelMatrix * vec4(position, 1.0);;
                            }
                        `,
                fragmentShader: `
                            uniform vec2 winResolution;
                            uniform sampler2D uTexture;
                            void main() {
                            vec2 uv = gl_FragCoord.xy / winResolution.xy;
                            vec4 color = texture2D(uTexture, uv);
            
                            gl_FragColor = color;
                            #include <tonemapping_fragment>
                            #include <colorspace_fragment>
                            }
            
                        `
            });
        } else {
            throw new Error('Screen mesh undefined');
        }
    }

    public animate() {
        if (this.isActive) {
            const animationTime = App.instance.animationTime;
            this.animationMixer.setTime(Math.min(animationTime, this.animationsDuration - 0.1));
            this.animationMixer.update(1 / 60);
        }
    }

    public setScreenTexture(texture: THREE.Texture) {
        console.log(this.screen.material);
        if (!(this.screen.material instanceof THREE.MeshStandardMaterial)) {
            throw new Error('Screen material is not unique');
        }

        const material = <THREE.MeshStandardMaterial>this.screen.material;
        material.map = texture;
    }

    public getScreenPosition() {
        return this.screen.position;
    }

    public getScreeRotation() {
        return this.screen.rotation;
    }
}
