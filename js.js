import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

gsap.ticker.lagSmoothing(0);

let container;
let camera;
let renderer;
let scene;
let logo;

let idleRotationSpeed = -0.007;
let isScrolling = false;
let scrollTimeout;
let accumulatedRotation = 0;

function init() {
  // Scene and renderer setup
  container = document.querySelector('.scene');
  scene = new THREE.Scene();
  
  const aspect = container.clientWidth / container.clientHeight;
  camera = new THREE.PerspectiveCamera(35, aspect, 0.1, 1000);
  camera.position.set(0, -1.5, 25);
  scene.add(camera);

  renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Set up lighting
  const light = new THREE.DirectionalLight(0xffffff, 10);
  scene.add(light);

  let cursorPosition = new THREE.Vector2();

  document.addEventListener('mousemove', (event) => {
    cursorPosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    cursorPosition.y = -(event.clientY / window.innerHeight) * 2 + 1;

    light.position.x = cursorPosition.x * 100;
    light.position.y = cursorPosition.y * 100;
    light.position.z = 50;
  });

  // Load Model
  let loader = new GLTFLoader();
  loader.load('./sentrialogo.gltf', function (gltf) {
    scene.add(gltf.scene);
    logo = gltf.scene.children[0];
    logo.scale.set(4, 4, 4);

    animate(); // Start the animation loop
  });
}

function animate() {
  requestAnimationFrame(animate);

  // Idle rotation for the logo
  if (!isScrolling && logo) {
    logo.rotation.z += idleRotationSpeed;
    accumulatedRotation += idleRotationSpeed;
  }

  // Render the scene
  renderer.render(scene, camera);
}

init();

function onWindowResize() {
  // Resize logic
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

// Handle window resizing
window.addEventListener('resize', onWindowResize);


 // Initialize Lenis
 const lenis = new Lenis();

 // Update Lenis on scroll
 gsap.ticker.add((time) => {
  lenis.raf(time * 600);
});