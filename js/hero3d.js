// Interactive 3D Hero Background using Three.js

let scene, camera, renderer, particles, mouseX = 0, mouseY = 0;
let targetRotationX = 0, targetRotationY = 0;
const particleCount = 3000;

function initHero3D() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const heroSection = document.getElementById('home');
    const width = heroSection.offsetWidth;
    const height = heroSection.offsetHeight;

    // Scene setup
    scene = new THREE.Scene();
    // No fog to keep background gradient visible

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
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create particle system
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0xffffff);
    const color2 = new THREE.Color(0xf0f0f0);
    const color3 = new THREE.Color(0xe0e0ff);

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Position
        positions[i3] = (Math.random() - 0.5) * 2000;
        positions[i3 + 1] = (Math.random() - 0.5) * 2000;
        positions[i3 + 2] = (Math.random() - 0.5) * 2000;

        // Color variation
        const mixFactor = Math.random();
        const color = mixFactor < 0.33
            ? color1
            : mixFactor < 0.66
                ? color2
                : color3;

        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle material
    const material = new THREE.PointsMaterial({
        size: 3,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Add geometric wireframe
    const wireframeGeometry = new THREE.IcosahedronGeometry(200, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframeMesh);

    // Mouse move event
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - window.innerWidth / 2) * 0.0005;
        mouseY = (event.clientY - window.innerHeight / 2) * 0.0005;
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

    // Smooth camera rotation based on mouse position
    targetRotationX += (mouseX - targetRotationX) * 0.05;
    targetRotationY += (mouseY - targetRotationY) * 0.05;

    camera.position.x += (targetRotationX * 300 - camera.position.x) * 0.05;
    camera.position.y += (-targetRotationY * 300 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Rotate particle system
    particles.rotation.x += 0.0002;
    particles.rotation.y += 0.0003;

    // Rotate wireframe
    if (scene.children[1]) {
        scene.children[1].rotation.x += 0.001;
        scene.children[1].rotation.y += 0.002;
    }

    // Animate particles
    const positions = particles.geometry.attributes.position.array;
    const time = Date.now() * 0.00005;

    for (let i = 0; i < positions.length; i += 3) {
        const i3 = i / 3;
        positions[i + 1] += Math.sin(time + i3 * 0.1) * 0.3;
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
