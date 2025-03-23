import { Panel } from "./Panel";
import { Image } from "./Image";

export const Panels = [
    new Panel(
        "Slade",
        "Android arcade game",
        [
            new Image("unity.webp"),
            new Image("csharp.webp", 1.5),
            new Image("playstore.webp")
        ],
        new Image("slade.webp")),
    new Panel(
        "Project: Paranoïa",
        "Horror game concept",
        [
            new Image("ue5.webp", 1.2),
            new Image("fab.jpg", 1.2),

        ],
        new Image("paranoia.webp")
    ),
    new Panel(
        "Light and Darkness",
        "2D Platformer",
        [
            new Image("unity.webp", 1.2),
            new Image("csharp.webp", 1.2),
        ],
        new Image("light.gif")),
    new Panel(
        "UE5 Combat System",
        "Unreal Engine 5 combat system",
        [
            new Image("ue5.webp", 1.2),
            new Image("fab.jpg", 1.2),
        ],
        new Image("uecombat.webp")),
    new Panel(
        "Footprint Trail",
        "Godot Plugin",
        [
            new Image("godot.webp", 1.2)
        ],
        new Image("footprint.webp")),


]