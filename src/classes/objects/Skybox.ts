import * as THREE from 'three'


export class SkyBox extends THREE.Object3D {
    constructor() {
        super();
        const textureLoader = new THREE.TextureLoader();

        // let materialArray = []
        const texture = textureLoader.load('./skybox/SkySkybox.png');

        if (texture == null) {
            throw new Error('Error while load skybox texture');
        }
        // materialArray.push
        const geometry = new THREE.SphereGeometry(1000);
        const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });

        this.add(new THREE.Mesh(geometry, material));
        this.rotateX(Math.PI);
    }


}