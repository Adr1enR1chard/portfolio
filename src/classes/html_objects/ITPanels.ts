import { Panel } from "./Panel";
import { Image } from "./Image";
import { GameDevPanels } from "./GameDevPanels";

export const ITPanels = [
    new Panel(
        GameDevPanels.length,
        "MyGreenGrenoble",
        "Green itinerary in Grenoble",
        [
            new Image("html.png", 1.1),
            new Image("css.png", 1),
            new Image("js.png", 1)
        ],
        new Image("mygreengrenoble.png")),

]