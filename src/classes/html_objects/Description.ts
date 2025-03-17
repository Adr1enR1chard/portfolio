import { CSS3DObject } from 'three/examples/jsm/Addons.js';
export class Description extends CSS3DObject {

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
    private images: string[];

    constructor(titleContent: string, subtitleContent: string, leftPannelHTML: string = "", images: string[] = [], rightPannelHTML: string = "") {
        const element = document.createElement('div');
        element.className = "description"

        const leftPanel = document.createElement('div');
        leftPanel.className = "description-left"

        const rightPanel = document.createElement('div');
        rightPanel.className = "description-right"

        const header = document.createElement('div');
        header.className = "description-header";
        const projectHeader = document.createElement('div');
        projectHeader.className = "project-header";

        const title = document.createElement('h1');
        title.innerText = titleContent;
        projectHeader.appendChild(title);

        const subtitle = document.createElement('h2');
        subtitle.innerText = subtitleContent;
        projectHeader.appendChild(subtitle);

        const backButton = document.createElement('button');
        backButton.className = 'back-button';
        backButton.innerText = 'Back';
        backButton.setAttribute("onpointerdown", "module.switchProjectView()");
        element.addEventListener('wheel', (e) => {
            if (element.scrollTop != 0 && e.deltaY < 0) {
                e.stopPropagation();
            }
        });

        header.appendChild(projectHeader);
        header.appendChild(backButton);
        leftPanel.appendChild(header);

        leftPanel.innerHTML += leftPannelHTML;


        if (images.length !== 0) {
            // Create carousel container and navigation
            const carouselContainer = document.createElement('div');
            carouselContainer.className = 'image-carousel';

            const carouselSlider = document.createElement('div');
            carouselSlider.className = 'carousel-slider';

            // Add images to the carousel
            images.forEach((src, index) => {
                const imgElement = document.createElement('img');
                imgElement.src = src;
                imgElement.alt = `Slade ${index + 1}`;
                imgElement.className = "carousel-image";
                if (index === 0) {
                    imgElement.classList.add('active');
                }
                carouselSlider.appendChild(imgElement);
            });

            // Create navigation buttons
            const navPrev = document.createElement('button');
            navPrev.className = 'carousel-nav prev';
            navPrev.innerHTML = '&#10094;';

            const navNext = document.createElement('button');
            navNext.className = 'carousel-nav next';
            navNext.innerHTML = '&#10095;';

            // Add event listeners for navigation
            navPrev.setAttribute('onpointerdown', 'module.prevSlide()');
            navNext.setAttribute('onpointerdown', 'module.nextSlide()');

            // Assemble carousel
            carouselContainer.appendChild(navPrev);
            carouselContainer.appendChild(carouselSlider);
            carouselContainer.appendChild(navNext);

            rightPanel.appendChild(carouselContainer);
        }

        element.appendChild(leftPanel);
        rightPanel.innerHTML += rightPannelHTML;
        element.appendChild(rightPanel);
        super(element);
        this.element.style.position = "relative";
        this.title = titleContent;
        this.subtitle = subtitleContent;
    }
    public nextSlide() {
        const slides = this.element.querySelectorAll('.carousel-image');
        const currentSlide = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
        slides[currentSlide].classList.remove('active');
        slides[(currentSlide + 1) % slides.length].classList.add('active');
    }

    public prevSlide() {
        const slides = this.element.querySelectorAll('.carousel-image');
        const currentSlide = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
        slides[currentSlide].classList.remove('active');
        slides[(currentSlide - 1 + slides.length) % slides.length].classList.add('active');
    }
}