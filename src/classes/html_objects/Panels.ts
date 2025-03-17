import { Panel } from "./Panel";
import { Image } from "./Image";

export const Panels = [
    new Panel(
        "Slade",
        "Android arcade game",
        [
            new Image("unity.png"),
            new Image("csharp.png", 1.5),
            new Image("playstore.png")
        ]),
    new Panel(
        "UE5 Combat System",
        "Unreal Engine 5 combat system",
        [
            new Image("ue5.png")
        ]),
    new Panel(
        "Footprint Trail",
        "Godot Plugin",
        [
            new Image("godot.png")
        ])

]