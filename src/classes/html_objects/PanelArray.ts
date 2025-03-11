import { CSS3DObject } from 'three/examples/jsm/Addons.js';
import { Panel } from './Panel';
export class PanelArray extends CSS3DObject {

    private panels: Panel[]

    constructor(panels: Panel[]) {
        const element = document.createElement('div');
        element.className = "panel_array";
        panels.forEach(panel => {
            element.innerHTML += panel.element.outerHTML;
        });

        super(element);
        this.panels = panels;
    }
}