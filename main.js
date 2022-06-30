import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const initCameraPos = 40;
camera.position.setZ(initCameraPos);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

const loader = new GLTFLoader();

 let david = new THREE.Group;

loader.load(
  'david/david.gltf',
  function (gltf) {
    david = gltf.scene;
    scene.add(gltf.scene);
  }
);

const pointLight = new THREE.PointLight(0xffffff);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01 + initCameraPos;
  david.position.y = t * -0.05;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  david.rotateY(0.01);

  renderer.render(scene, camera);

}

animate();