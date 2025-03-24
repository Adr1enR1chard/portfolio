import { CSS3DObject } from 'three/examples/jsm/Addons.js';
export class Image extends CSS3DObject {

    private path: string;

    constructor(path: string, scale?: number) {
        const element = document.createElement('img');
        element.src = "/portfolio/images/" + path;
        if (scale)
            element.style.width = 2.6 * scale + "vw";

        super(element);
        this.path = path;
        this.element.style.position = "relative";
    }
}