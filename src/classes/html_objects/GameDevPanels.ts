import { Panel } from "./Panel";
import { Image } from "./Image";

export const GameDevPanels = [
    new Panel(
        0,
        "Slade",
        "Android arcade game",
        [
            new Image("unity.webp", 1),
            new Image("csharp.webp", 1.2),
            new Image("playstore.webp", 1)
        ],
        new Image("slade.webp")),
    new Panel(
        1,
        "Project: Paranoïa",
        "Horror game concept",
        [
            new Image("ue5.webp", 1),
            new Image("fab.webp", 1),

        ],
        new Image("paranoia.gif")
    ),
    new Panel(
        2,
        "Light and Darkness",
        "2D Platformer",
        [
            new Image("unity.webp", 1),
            new Image("csharp.webp", 1.2),
        ],
        new Image("light.gif")),
    new Panel(
        3,
        "UE5 Combat System",
        "Unreal Engine 5 combat system",
        [
            new Image("ue5.webp", 1),
            new Image("fab.webp", 1),
        ],
        new Image("uecombat.gif")),
    new Panel(
        4,
        "Footprint Trail",
        "Godot Plugin",
        [
            new Image("godot.webp", 1)
        ],
        new Image("footprint.webp")),


]