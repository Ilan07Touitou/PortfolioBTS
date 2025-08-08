import * as THREE from "./libs/three/build/three.module.js";

// ==============================
// 📦 Initialisation de la scène
// ==============================

// Création de la scène 3D
const scene = new THREE.Scene();

// Chargement des textures
const textureLoader = new THREE.TextureLoader();

// Appliquer une texture d'étoiles comme fond de la scène
const starTexture = textureLoader.load("./img/Texture/stars_background.jpg");
scene.background = starTexture;

// ==============================
// 🎥 Initialisation de la caméra
// ==============================

// Caméra perspective (vue réaliste)
/* PerspectiveCamera(FOV, Ratio hauteur/largeur, Plan proche, Plan lointain) */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


// ==============================
// 🔧 Chargement des textures Lune
// ==============================

// Texture de la surface de la Lune
const moonTexture = textureLoader.load("./img/Texture/Moon_Texture2.jpg");

// Relief de la Lune via une bump map
const moonBump = textureLoader.load("./img/Texture/moon_bump.jpg");

// ==============================
// 🌕 Création de la sphère Lune
// ==============================


const moonRadius = window.innerWidth < 768 ? 2.5 : 5; // 📱 plus petit rayon sur mobile

// Géométrie de la Lune : sphère
// Sphere Geometry
// 		arg1 = Rayon
// 		arg2 = Segments horizontaux (+ = plus lisse)
const moonGeometry = new THREE.SphereGeometry(
	moonRadius,
	64,
	64
);

// Matériau avec texture + bumpMap pour le relief
const moonMaterial = new THREE.MeshStandardMaterial({
	map: moonTexture, // Texture diffuse (visuelle)
	bumpMap: moonBump, // Relief
	bumpScale: 0.1, // Intensité du relief (à ajuster selon ton goût)
});

// Création du mesh (forme + matière)
const moon = new THREE.Mesh(moonGeometry, moonMaterial);

// Ajout de la Lune à la scène
scene.add(moon);

// ==============================
// 💡 Ajout des lumières
// ==============================

// Lumière directionnelle (comme un soleil)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(-2, 2, 4);
scene.add(directionalLight);

// Lumière ambiante (éclaire uniformément la scène)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// ==============================
// 🖥️ Initialisation du moteur de rendu WebGL
// ==============================

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ==============================
// 🔁 Boucle d'animation
// ==============================

function animate() {
	requestAnimationFrame(animate);

	// Rotation continue de la lune
	moon.rotation.y += 0.002;

	// 🪄 Effet de profondeur au scroll
	const scrollY = window.scrollY || window.pageYOffset;
	camera.position.z = 10 + scrollY * 0.005; // Plus tu scrolles, plus on recule

	// Rendu de la scène avec la caméra
	renderer.render(scene, camera);
}

// ==============================
// 📱 Gestion du redimensionnement de la fenêtre
// ==============================

window.addEventListener("resize", () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio); 

});

window.addEventListener('scroll', () => {

})


animate();