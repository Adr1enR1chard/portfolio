import * as THREE from 'three'


export class SkyBox extends THREE.Object3D {
    constructor() {
        super();
        const textureLoader = new THREE.TextureLoader();
        const text_bk = textureLoader.load('./skybox/kurt/space_bk.png');
        const text_dn = textureLoader.load('./skybox/kurt/space_dn.png');
        const text_ft = textureLoader.load('./skybox/kurt/space_ft.png');
        const text_lf = textureLoader.load('./skybox/kurt/space_lf.png');
        const text_rt = textureLoader.load('./skybox/kurt/space_rt.png');
        const text_up = textureLoader.load('./skybox/kurt/space_up.png');

        const materialArray = new Array<THREE.Material>();
        materialArray.push(new THREE.MeshBasicMaterial({ map: text_ft, side: THREE.BackSide }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: text_bk, side: THREE.BackSide }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: text_up, side: THREE.BackSide }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: text_dn, side: THREE.BackSide }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: text_rt, side: THREE.BackSide }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: text_lf, side: THREE.BackSide }));

        const geometry = new THREE.BoxGeometry(1000, 1000, 1000);

        const mesh = new THREE.Mesh(geometry);
        mesh.material = materialArray;

        this.add(mesh);
    }


}