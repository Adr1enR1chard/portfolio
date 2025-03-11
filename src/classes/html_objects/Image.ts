import { CSS3DObject } from 'three/examples/jsm/Addons.js';
export class Image extends CSS3DObject {

    private path: string;

    constructor(path: string, scale: number = 1) {
        const element = document.createElement('img');
        element.className = "panel-img";
        element.src = "/images/" + path;
        element.width = 50 * scale;
        element.height = 50 * scale;

        super(element);
        this.path = path;
        this.element.style.position = "relative";
    }
}