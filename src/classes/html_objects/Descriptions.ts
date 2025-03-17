import { Description } from "./Description";

export const Descriptions = [
    new Description(
        "Slade",
        "Android arcade game",
        `
            <p>Slade est un jeu d'arcade captivant qui met à l'épreuve votre concentration et vos réflexes. Le but est d'éviter tous les projectiles et les ennemis pour obtenir le meilleur score possible et débloquer des skins uniques. Vous devez vous déplacer dans un espace restreint en glissant votre doigt sur l'écran, utiliser votre énergie pour ralentir le temps et ainsi maximiser vos chances de survie. Ce jeu combine fun et défi, vous garantissant des heures de divertissement . </p>
            <p>Développé avec Unity en C#, Slade est le premier projet que j'ai pu distribuer au grand public sur le Google Play Store. Ce projet réalisé en 2020 alors que j'étais encore au lycée à été pour moi un projet très enrichissant. Cependant, par manque de temps suit à mes études, j'ai laissé Slade à l'abandon. Il s'est donc vu être retiré du Google Play Store</p>
        `,
        [
            'images/slade.webp',
            'images/slade2.webp',
            'images/slade3.webp'
        ],
        `<a href="https://apkpure.com/fr/slade/com.AjGames.Slade" class="description-link" target="_blank">Voir sur APK Pure</a>`),
    new Description(
        "Project: Paranoïa",
        "Horror game concept",
        `
                
                `),
    new Description(
        "UE5 Combat System",
        "Unreal Engine 5 combat system",
        `
            <p>Slade est un jeu d'arcade captivant qui met à l'épreuve votre concentration et vos réflexes. Le but est d'éviter tous les projectiles et les ennemis pour obtenir le meilleur score possible et débloquer des skins uniques. Vous devez vous déplacer dans un espace restreint en glissant votre doigt sur l'écran, utiliser votre énergie pour ralentir le temps et ainsi maximiser vos chances de survie. Ce jeu combine fun et défi, vous garantissant des heures de divertissement . </p>
            <p>Développé avec Unity en C#, Slade est le premier projet que j'ai pu voir distribuer au grand public. Ce projet réalisé en 2020 alors que j'étais encore au lycée à été pour moi un projet très enrichissant.</p>
            `),
    new Description(
        "Footprint Trail",
        "Godot Plugin",
        `
            <p><strong>footprint-trail</strong> est un plugin pour le moteur de jeu Godot qui permet d'ajouter une traînée d'empreintes de pas à un personnage de type CharacterBody3D. Ce plugin est idéal pour ajouter des effets visuels réalistes et immersifs dans vos jeux, en simulant les traces laissées par les pieds d'un personnage sur le sol.</p>

            <h2>Comment l'utiliser ?</h2>
            <ol>
                <li><strong>Ajouter le plugin à votre projet :</strong>
                    <ul>
                        <li>Placez le répertoire "footprint-tail" dans le dossier "res://addons" de votre projet Godot.</li>
                    </ul>
                </li>
                <li><strong>Ajouter une traînée d'empreintes :</strong>
                    <ul>
                        <li>Ajoutez un nœud "FootprintTrail" à n'importe quel nœud CharacterBody3D.</li>
                        <li>Positionnez-le au niveau des pieds de votre personnage.</li>
                    </ul>
                </li>
            </ol>

            <h2>Paramètres</h2>
            <ul>
                <li><strong>Material :</strong> Le matériau de l'empreinte (par exemple, une texture simple d'une seule empreinte).</li>
                <li><strong>Footprint scale :</strong> L'échelle de l'empreinte sur le sol.</li>
                <li><strong>Distance entre les empreintes :</strong> La distance entre deux empreintes consécutives.</li>
                <li><strong>Time to live :</strong> Le temps avant que l'empreinte ne disparaisse (elle s'estompera progressivement).</li>
                <li><strong>Right left alternance :</strong> Simule deux pieds (droit et gauche) en miroitant la texture de l'empreinte.</li>
                <li><strong>Footprints visible :</strong> Rend les empreintes visibles ou non (fonctionne en temps réel).</li>
            </ul>

            `,
        [
            'images/footprint.png'
        ],
        `<p>Vous pourrez retrouver le projet sur <a href="https://github.com/Adr1enR1chard/footprint-trail" target="_blank">mon GitHub</a></p>`)
]