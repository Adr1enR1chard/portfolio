// Interactive 3D Hero Background using Three.js

let scene, camera, renderer, particles, mouseX = 0, mouseY = 0;
let targetRotationX = 0, targetRotationY = 0;
const particleCount = 3000;
let wireframeMesh;

function initHero3D() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const heroSection = document.getElementById('home');
    const width = heroSection.offsetWidth;
    const height = heroSection.offsetHeight;

    // Scene setup
    scene = new THREE.Scene();

    // Add subtle fog for depth
    scene.fog = new THREE.FogExp2(0x667eea, 0.0003);

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, width / height, 1, 2000);
    camera.position.z = 500;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit for performance

    // Create particle system with artistic colors
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0xffffff);  // White
    const color2 = new THREE.Color(0xa78bfa);  // Light purple
    const color3 = new THREE.Color(0xc4b5fd);  // Lighter purple

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Position with artistic distribution
        const radius = 1000 + Math.random() * 500;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;

        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);

        positions[i3 + 2] = radius * Math.cos(phi);

        // Color variation with artistic palette
        const mixFactor = Math.random();
        const color = mixFactor < 0.4
            ? color1
            : mixFactor < 0.7
                ? color2
                : color3;

        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle material with artistic glow
    const material = new THREE.PointsMaterial({
        size: 3.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Add artistic wireframe geometry
    const wireframeGeometry = new THREE.IcosahedronGeometry(200, 2);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframeMesh);

    // Add second smaller wireframe for depth
    const wireframeGeometry2 = new THREE.OctahedronGeometry(100, 1);
    const wireframeMaterial2 = new THREE.MeshBasicMaterial({
        color: 0xa78bfa,
        wireframe: true,
        transparent: true,
        opacity: 0.25
    });
    const wireframeMesh2 = new THREE.Mesh(wireframeGeometry2, wireframeMaterial2);
    scene.add(wireframeMesh2);

    scene.add(wireframeMesh2);

    // Mouse move event with smooth artistic response
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - window.innerWidth / 2) * 0.0008;
        mouseY = (event.clientY - window.innerHeight / 2) * 0.0008;
    });

    // Handle resize
    window.addEventListener('resize', () => {
        const newWidth = heroSection.offsetWidth;
        const newHeight = heroSection.offsetHeight;

        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });

    // Start animation
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Smooth camera rotation based on mouse position with artistic easing
    targetRotationX += (mouseX - targetRotationX) * 0.03;
    targetRotationY += (mouseY - targetRotationY) * 0.03;

    camera.position.x += (targetRotationX * 400 - camera.position.x) * 0.03;
    camera.position.y += (-targetRotationY * 400 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);

    // Rotate particle system with artistic flow
    particles.rotation.x += 0.0003;
    particles.rotation.y += 0.0005;

    // Rotate wireframes with different speeds for depth
    if (scene.children[1]) {
        scene.children[1].rotation.x += 0.002;
        scene.children[1].rotation.y += 0.003;
    }

    if (scene.children[2]) {
        scene.children[2].rotation.x -= 0.0015;
        scene.children[2].rotation.y -= 0.002;
    }

    // Artistic particle animation - subtle wave motion
    const positions = particles.geometry.attributes.position.array;
    const time = Date.now() * 0.00005;

    for (let i = 0; i < positions.length; i += 3) {
        const i3 = i / 3;
        positions[i + 1] += Math.sin(time + i3 * 0.05) * 0.5;

        // Add subtle pulsing effect to some particles
        if (i3 % 5 === 0) {
            positions[i] += Math.cos(time + i3 * 0.1) * 0.3;
        }
    }

    particles.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHero3D);
} else {
    initHero3D();
}
