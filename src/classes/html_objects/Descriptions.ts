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
                <p>Project: Paranoïa est un Proof of Concept d'un jeu d'horreur sur Unreal Engine 5, où le joueur incarne un patient amnésique d'un hôpital psychiatrique. Fortement inspiré des escape games, le joueur doit résoudre des énigmes complexes et immersives pour avancer dans le jeu et découvrir les secrets de son passé.</p>

<p>Dans ce projet, j'ai mis l'accent sur la création d'une atmosphère oppressante et angoissante, en utilisant les capacités avancées d'Unreal Engine 5 pour le rendu graphique et l'éclairage. Les environnements ont été soigneusement conçus pour refléter l'ambiance sinistre et dérangeante d'un hôpital psychiatrique, avec des détails réalistes et des effets sonores immersifs.</p>

<p>Les énigmes ont été pensées pour être à la fois stimulantes et intégrées de manière cohérente dans l'univers du jeu. Elles nécessitent observation et réflexion. J'ai également intégré des éléments narratifs sous forme de notes, de journaux et d'indices disséminés dans les niveaux, permettant au joueur de reconstituer progressivement son histoire.</p>

<p>Le gameplay repose sur l'exploration, la résolution d'énigmes et la gestion des ressources, avec des moments de tension et de surprise qui maintiennent le joueur en alerte. L'objectif est de créer une expérience captivante et mémorable, où chaque découverte et chaque progrès sont récompensés par une meilleure compréhension de l'intrigue et des mécanismes du jeu.</p>
                `,
        [
            'images/paranoia.png'
        ]),
    new Description(
        "UE5 Combat System",
        "Unreal Engine 5 combat system",
        `
            <p>Ce projet avait pour vocation de reproduire un système de combat fortement inspiré de Dark Souls sur Unreal Engine 5. Celui-ci m'a permis de me familiariser avec les Animations Blueprints et les Behaviour Trees, deux outils puissants pour créer des animations fluides et des comportements d'IA complexes.</p>

<p>En travaillant sur ce projet, j'ai pu approfondir mes compétences en animation en utilisant les Animations Blueprints pour créer des transitions fluides entre les différentes phases de combat, telles que les attaques et les esquives.</p>

<p>Les Behaviour Trees ont été utilisés pour développer des comportements d'IA pour les ennemis, leur permettant de réagir de manière réaliste aux actions du joueur. J'ai implémenté des arbres de décision qui permettent aux ennemis de choisir entre différentes actions en fonction de la situation, comme attaquer ou se déplacer pour se mettre en position avantageuse.</p>
            `,
        [
            'images/uecombat.png'
        ]),
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
        `<p>Vous pourrez retrouver le projet sur <a href="https://github.com/Adr1enR1chard/footprint-trail" target="_blank">mon GitHub</a></p>`),
    new Description(
        "Light and Darkness",
        "2D Platformer",
        `
            <p>Ce jeu 2D est un platformer innovant où le joueur a la possibilité de répandre sa lumière dans un monde plongé dans les ténèbres afin de découvrir des chemins alternatifs. J'ai eu l'opportunité de collaborer avec un graphiste 2D. De mon côté, je me suis occupé de l'intégralité du gameplay, en mettant en place des mécaniques uniques et engageantes.</p>

<p>L'une des caractéristiques les plus marquantes du jeu est la dualité du monde : les éléments interactifs ne sont pas toujours visibles ou accessibles. En répandant la lumière, le joueur peut révéler des plateformes cachées, des objets secrets et des passages dissimulés, créant ainsi une sorte de double monde. Cette mécanique ajoute une dimension stratégique et exploratoire au gameplay, incitant les joueurs à expérimenter et à découvrir les mystères cachés dans l'obscurité.</p>
                `,
        [
            'images/light.png'
        ])
]