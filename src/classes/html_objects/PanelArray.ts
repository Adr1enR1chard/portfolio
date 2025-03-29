import { CSS3DObject } from 'three/examples/jsm/Addons.js';
import { Panel } from './Panel';
import { App } from '../App';
export class PanelArray extends CSS3DObject {

    private panels: Panel[]


    constructor(panels: Panel[], panelName: string) {
        const element = document.createElement('div');
        element.className = "panel-array-container";

        const header = document.createElement('div');
        header.className = 'panels-header';

        const category = document.createElement('h2');
        category.className = "panel-category";
        category.innerText = panelName;

        // Create navigation buttons
        const navPrev = document.createElement('button');
        navPrev.className = 'panels-nav prev';
        navPrev.innerHTML = '&#10094;';

        const navNext = document.createElement('button');
        navNext.className = 'panels-nav next';
        navNext.innerHTML = '&#10095;';
        header.appendChild(navPrev);
        header.appendChild(category);
        header.appendChild(navNext);

        element.appendChild(header)

        // Add event listeners for navigation
        navPrev.onclick = () => App.instance.secondWorld.prevPanelArray();
        navNext.onclick = () => App.instance.secondWorld.nextPanelArray();

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