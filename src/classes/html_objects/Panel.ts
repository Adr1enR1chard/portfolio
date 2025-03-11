import * as THREE from 'three';
import { CSS3DObject } from 'three/examples/jsm/Addons.js';
import { Image } from './Image';
export class Panel extends CSS3DObject {

    private _title: string;
    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }
    private _subtitle: string;
    public get subtitle(): string {
        return this._subtitle;
    }
    public set subtitle(value: string) {
        this._subtitle = value;
    }
    private images: Image[];

    constructor(title: string, subtitle: string, images: Image[] = []) {
        const element = document.createElement('div');
        element.onclick = function () {
            console.log("ok");
        };
        element.className = "panel";
        element.innerHTML += "<h1>" + title + "</h1>";
        element.innerHTML += "<h2>" + subtitle + "</h2>";

        const imageContainer = document.createElement('div');
        imageContainer.className = "image_container";

        images.forEach(image => {
            imageContainer.appendChild(image.element);
        })

        element.appendChild(imageContainer);

        super(element);
        this.title = title;
        this.subtitle = subtitle;
        this.images = images;
        this.element.style.position = "relative";
    }
}