import { CSS3DObject } from 'three/examples/jsm/Addons.js';
import { Panel } from './Panel';
export class PanelArray extends CSS3DObject {

    private panels: Panel[]

    constructor(panels: Panel[]) {
        const element = document.createElement('div');
        element.className = "panel-array-container";

        const category = document.createElement('h2');
        category.className = "panel-category";
        category.innerText = "Game Development";
        element.appendChild(category);

        const array = document.createElement('div');
        array.className = "panel-array";
        panels.forEach(panel => {
            array.innerHTML += panel.element.outerHTML;
        });
        array.addEventListener('wheel', (e) => {
            if (array.scrollTop != 0 && e.deltaY < 0) {
                e.stopPropagation();
            }
        });
        element.appendChild(array);

        super(element);
        this.panels = panels;
    }
}