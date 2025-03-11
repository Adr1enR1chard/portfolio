import { CSS3DObject } from 'three/examples/jsm/Addons.js';
import { Panel } from './Panel';
export class Description extends CSS3DObject {

    private panel: Panel;

    constructor(panel: Panel) {
        const element = document.createElement('div');
        element.className = "description"

        const leftPanel = document.createElement('div');
        leftPanel.className = "description-left"

        const rightPanel = document.createElement('div');
        rightPanel.className = "description-right"

        const title = document.createElement('h1');
        title.innerText = panel.title;
        leftPanel.appendChild(title);

        const subtitle = document.createElement('h2');
        subtitle.innerText = panel.subtitle;
        leftPanel.appendChild(subtitle);

        const paragraph = document.createElement('p');
        paragraph.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce orci tortor, varius eu mollis et, aliquam eget odio. Donec laoreet velit gravida libero luctus varius. Etiam id orci quis elit rhoncus pulvinar. Praesent vitae est vitae metus blandit semper. Integer faucibus lobortis nibh, et luctus augue hendrerit non. Proin elit ligula, dignissim vitae dictum eget, dictum sed turpis. Quisque at odio sagittis ante interdum eleifend sed et tellus. Vivamus sapien mi, dapibus ut odio a, finibus pharetra massa. Sed venenatis quis ipsum eu faucibus. Sed semper aliquet mi. Quisque bibendum dui a sodales vestibulum. Ut iaculis malesuada mauris, ac eleifend nulla feugiat eu.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce orci tortor, varius eu mollis et, aliquam eget odio. Donec laoreet velit gravida libero luctus varius. Etiam id orci quis elit rhoncus pulvinar. Praesent vitae est vitae metus blandit semper. Integer faucibus lobortis nibh, et luctus augue hendrerit non. Proin elit ligula, dignissim vitae dictum eget, dictum sed turpis. Quisque at odio sagittis ante interdum eleifend sed et tellus. Vivamus sapien mi, dapibus ut odio a, finibus pharetra massa. Sed venenatis quis ipsum eu faucibus. Sed semper aliquet mi. Quisque bibendum dui a sodales vestibulum. Ut iaculis malesuada mauris, ac eleifend nulla feugiat eu.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce orci tortor, varius eu mollis et, aliquam eget odio. Donec laoreet velit gravida libero luctus varius. Etiam id orci quis elit rhoncus pulvinar. Praesent vitae est vitae metus blandit semper. Integer faucibus lobortis nibh, et luctus augue hendrerit non. Proin elit ligula, dignissim vitae dictum eget, dictum sed turpis. Quisque at odio sagittis ante interdum eleifend sed et tellus. Vivamus sapien mi, dapibus ut odio a, finibus pharetra massa. Sed venenatis quis ipsum eu faucibus. Sed semper aliquet mi. Quisque bibendum dui a sodales vestibulum. Ut iaculis malesuada mauris, ac eleifend nulla feugiat eu.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce orci tortor, varius eu mollis et, aliquam eget odio. Donec laoreet velit gravida libero luctus varius. Etiam id orci quis elit rhoncus pulvinar. Praesent vitae est vitae metus blandit semper. Integer faucibus lobortis nibh, et luctus augue hendrerit non. Proin elit ligula, dignissim vitae dictum eget, dictum sed turpis. Quisque at odio sagittis ante interdum eleifend sed et tellus. Vivamus sapien mi, dapibus ut odio a, finibus pharetra massa. Sed venenatis quis ipsum eu faucibus. Sed semper aliquet mi. Quisque bibendum dui a sodales vestibulum. Ut iaculis malesuada mauris, ac eleifend nulla feugiat eu.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce orci tortor, varius eu mollis et, aliquam eget odio. Donec laoreet velit gravida libero luctus varius. Etiam id orci quis elit rhoncus pulvinar. Praesent vitae est vitae metus blandit semper. Integer faucibus lobortis nibh, et luctus augue hendrerit non. Proin elit ligula, dignissim vitae dictum eget, dictum sed turpis. Quisque at odio sagittis ante interdum eleifend sed et tellus. Vivamus sapien mi, dapibus ut odio a, finibus pharetra massa. Sed venenatis quis ipsum eu faucibus. Sed semper aliquet mi. Quisque bibendum dui a sodales vestibulum. Ut iaculis malesuada mauris, ac eleifend nulla feugiat eu."
        leftPanel.appendChild(paragraph);
        rightPanel.innerHTML = paragraph.innerHTML;

        element.appendChild(leftPanel);
        element.appendChild(rightPanel);

        super(element);
        this.element.style.position = "relative";
    }
}