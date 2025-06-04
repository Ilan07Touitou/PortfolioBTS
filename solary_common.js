// solary_common.js

import * as THREE from "./libs/three/build/three.module.js";
// import { OrbitControls } from './OrbitControls.js'; // optionnel si tu veux tester

// Config globale
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Fond étoilé (sphère inversée)
const starTexture = new THREE.TextureLoader().load('./img/Texture/stars_background.jpg');
const starGeometry = new THREE.SphereGeometry(500, 64, 64);
const starMaterial = new THREE.MeshBasicMaterial({ map: starTexture, side: THREE.BackSide });
const starSphere = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starSphere);

// Lumière solaire au centre
const sunlight = new THREE.PointLight(0xffffff, 2, 0);
sunlight.position.set(0, 0, 0);
scene.add(sunlight);

// Soleil
const sunTexture = new THREE.TextureLoader().load('./img/Texture/Sun_Texture.jpg');
const sun = new THREE.Mesh(
    new THREE.SphereGeometry(5, 64, 64),
    new THREE.MeshBasicMaterial({ map: sunTexture })
);
sun.position.set(0, 0, 0);
scene.add(sun);

// Configuration des planètes
const planetData = [
    { name: 'mercury', size: 0.6, distance: 8, texture: './img/Texture/Mercury_Texture.jpg', speed: 0.015 },
    { name: 'venus',   size: 1,   distance: 11, texture: './img/Texture/Venus_Texture.jpg',   speed: 0.012 },
    { name: 'earth',   size: 1.2, distance: 14, texture: './img/Texture/Earth_Texture.jpg',   speed: 0.01 },
    { name: 'mars',    size: 0.9, distance: 17, texture: './img/Texture/Mars_Texture.jpg',    speed: 0.008 },
    { name: 'jupiter', size: 2.5, distance: 22, texture: './img/Texture/Jupiter_Texture.jpg', speed: 0.006 },
    { name: 'saturn',  size: 2,   distance: 28, texture: './img/Texture/Saturn_Texture.jpg',  speed: 0.005 },
    { name: 'uranus',  size: 1.5, distance: 34, texture: './img/Texture/Uranus_Texture.jpg',  speed: 0.004 },
    { name: 'neptune', size: 1.5, distance: 40, texture: './img/Texture/Neptune_Texture.jpg', speed: 0.003 }
];

const planets = {};
const planetGroups = {}; // pour faire orbiter autour du soleil
const loader = new THREE.TextureLoader();

planetData.forEach(data => {
    const texture = loader.load(data.texture);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const geometry = new THREE.SphereGeometry(data.size, 64, 64);
    const mesh = new THREE.Mesh(geometry, material);

    const group = new THREE.Group();
    group.add(mesh);
    mesh.position.set(data.distance, 0, 0);

    planets[data.name] = mesh;
    planetGroups[data.name] = group;

    scene.add(group);
});

// Lune autour de la Terre (si index.html)
let moonGroup;
if (window.currentPlanet === 'earth') {
    const moonTexture = loader.load('./img/Texture/Moon_Texture.jpg');
    const moon = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 32, 32),
        new THREE.MeshStandardMaterial({ map: moonTexture })
    );
    moon.position.set(2, 0, 0); // distance à la Terre

    moonGroup = new THREE.Group();
    moonGroup.add(moon);
    planets['earth'].add(moonGroup);
}

// Position caméra : regarde toujours le Soleil
function updateCamera(targetPlanetName) {
    const planet = planets[targetPlanetName];
    if (!planet) return;
    camera.position.copy(planet.getWorldPosition(new THREE.Vector3()).clone().add(new THREE.Vector3(0, 5, 10)));
    camera.lookAt(0, 0, 0);
}

// Boucle d'animation
function animate() {
    requestAnimationFrame(animate);

    planetData.forEach(data => {
        planetGroups[data.name].rotation.y += data.speed;
        planets[data.name].rotation.y += 0.002;
    });

    if (window.currentPlanet === 'earth' && moonGroup) {
        moonGroup.rotation.y += 0.01;
    }

    updateCamera(window.currentPlanet);
    renderer.render(scene, camera);
}

animate();


    