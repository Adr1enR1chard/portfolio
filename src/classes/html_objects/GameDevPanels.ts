import { Panel } from "./Panel";
import { Image } from "./Image";

export const GameDevPanels = [
    new Panel(
        0,
        "Mutiny",
        "Rogue-lite card game - In Progress",
        [
            new Image("godot.webp", 1),
            new Image("csharp.webp", 1.2),
        ],
        new Image("mutiny.gif")),
    new Panel(
        1,
        "Slade",
        "Android arcade game - 2020",
        [
            new Image("unity.webp", 1),
            new Image("csharp.webp", 1.2),
            new Image("playstore.webp", 1)
        ],
        new Image("slade.webp")),
    new Panel(
        2,
        "Project: Paranoïa",
        "Horror game concept - 2024",
        [
            new Image("ue5.webp", 1),
            new Image("fab.webp", 1),

        ],
        new Image("paranoia.gif")
    ),
    new Panel(
        3,
        "Light and Darkness",
        "2D Platformer - 2021",
        [
            new Image("unity.webp", 1),
            new Image("csharp.webp", 1.2),
        ],
        new Image("light.gif")),
    new Panel(
        4,
        "UE5 Combat System",
        "Unreal Engine 5 combat system - 2025",
        [
            new Image("ue5.webp", 1),
            new Image("fab.webp", 1),
        ],
        new Image("uecombat.gif")),
    new Panel(
        5,
        "Footprint Trail",
        "Godot Plugin - 2023",
        [
            new Image("godot.webp", 1)
        ],
        new Image("footprint.webp")),
]
