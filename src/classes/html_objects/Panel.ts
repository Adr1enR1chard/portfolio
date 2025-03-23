import { CSS3DObject } from 'three/examples/jsm/Addons.js';
import { Image } from './Image';
export class Panel extends CSS3DObject {

    private static panelCount = 0;

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
    private logos: Image[];

    private image: Image | undefined;

    constructor(title: string, subtitle: string, logos: Image[] = [], image?: Image) {
        const element = document.createElement('div');
        element.className = "panel";

        const header = document.createElement('div');
        header.className = 'panel-header';
        header.innerHTML += "<h1>" + title + "</h1>";
        header.innerHTML += "<h2>" + subtitle + "</h2>";

        const logosContainer = document.createElement('div');
        logosContainer.className = "logos-container";

        logos.forEach(image => {
            image.element.className = "panel-img";
            logosContainer.appendChild(image.element);
        })
        header.appendChild(logosContainer);
        element.appendChild(header);

        if (image) {
            const imageContainer = document.createElement('div');
            imageContainer.className = "image-container";
            imageContainer.appendChild(image.element);

            element.appendChild(imageContainer);
        }

        super(element);
        this.title = title;
        this.subtitle = subtitle;
        this.logos = logos;
        this.element.style.position = "relative";
        this.element.setAttribute("onpointerdown", `window.switchProjectView(${Panel.panelCount})`);
        this.image = image;

        Panel.panelCount++;
    }
}