import * as THREE from "three";
import spline from "./spline.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import getStarfield from "./getStarfield.js";

/**
 * GençCoin Wormhole Blaster Oyunu
 * React/Next.js component'lerinde kullanım için modüler yapı
 * 
 * @param {HTMLElement} containerElement - Oyunun render edileceği DOM container
 * @returns {Function} cleanup - Oyunu temizlemek için çağrılacak fonksiyon
 */
export function initGame(containerElement) {
  console.log('🎮 Oyun başlatılıyor...');

  // ==================== THREE.JS SAHNE KURULUMU ====================
  // Container boyutlarını al - fallback değerlerle
  let w = containerElement.clientWidth || 800;
  let h = containerElement.clientHeight || 500;
  
  console.log('📐 Container boyutları:', { w, h });

  // Sahne oluştur
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.3);

  // Kamera oluştur
  const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
  camera.position.z = 5;
  scene.add(camera);

  // Renderer oluştur
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  
  // Canvas'a stil ekle
  renderer.domElement.style.cssText = `
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  `;
  
  // Canvas'ı container'a ekle
  containerElement.appendChild(renderer.domElement);
  
  console.log('✅ Canvas oluşturuldu ve eklendi');

  // Post-processing
  const renderScene = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 1.5, 0.4, 100);
  bloomPass.threshold = 0.002;
  bloomPass.strength = 3.5;
  bloomPass.radius = 0;
  const composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);

  // Yıldız alanı
  const stars = getStarfield();
  scene.add(stars);

  // ==================== TÜNEL VE HEDEFLER ====================
  // Tünel geometrisi
  const tubeGeo = new THREE.TubeGeometry(spline, 222, 0.65, 16, true);

  // Tünel çizgileri
  const tubeColor = 0x00ccff;
  const tubeEdges = new THREE.EdgesGeometry(tubeGeo, 0.2);
  const tubeLineMat = new THREE.LineBasicMaterial({ color: tubeColor });
  const tubeLines = new THREE.LineSegments(tubeEdges, tubeLineMat);
  scene.add(tubeLines);

  // Tünel hit area
  const hitMat = new THREE.MeshBasicMaterial({
    color: tubeColor,
    transparent: true,
    opacity: 0.0,
    side: THREE.BackSide
  });
  const tubeHitArea = new THREE.Mesh(tubeGeo, hitMat);
  scene.add(tubeHitArea);

  // Kutu grubu (hedefler)
  const boxGroup = new THREE.Group();
  scene.add(boxGroup);

  // Kutular için materyal ve geometry array'leri (cleanup için)
  const boxMaterials = [];
  const boxGeometries = [];
  const boxLineSegments = [];

  const numBoxes = 55;
  const size = 0.075;
  const boxGeo = new THREE.BoxGeometry(size, size, size);
  boxGeometries.push(boxGeo);

  for (let i = 0; i < numBoxes; i += 1) {
    const p = (i / numBoxes + Math.random() * 0.1) % 1;
    const pos = tubeGeo.parameters.path.getPointAt(p);
    const color = new THREE.Color().setHSL(0.7 + p, 1, 0.5);
    
    const boxMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.0
    });
    boxMaterials.push(boxMat);
    
    const hitBox = new THREE.Mesh(boxGeo, boxMat);
    hitBox.name = 'box';

    pos.x += Math.random() - 0.4;
    pos.z += Math.random() - 0.4;
    hitBox.position.copy(pos);
    
    const rote = new THREE.Vector3(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    hitBox.rotation.set(rote.x, rote.y, rote.z);
    
    const edges = new THREE.EdgesGeometry(boxGeo, 0.2);
    boxGeometries.push(edges);
    
    const lineMat = new THREE.LineBasicMaterial({ color });
    boxMaterials.push(lineMat);
    
    const boxLines = new THREE.LineSegments(edges, lineMat);
    boxLines.position.copy(pos);
    boxLines.rotation.set(rote.x, rote.y, rote.z);
    hitBox.userData.box = boxLines;
    
    boxGroup.add(hitBox);
    scene.add(boxLines);
    boxLineSegments.push(boxLines);
  }

  // ==================== CROSSHAIRS ====================
  let mousePos = new THREE.Vector2();
  const crosshairs = new THREE.Group();
  crosshairs.position.z = -1;
  camera.add(crosshairs);
  
  const crossMat = new THREE.LineBasicMaterial({ color: 0xffffff });
  boxMaterials.push(crossMat);
  
  const lineGeo = new THREE.BufferGeometry();
  const lineVerts = [0, 0.05, 0, 0, 0.02, 0];
  lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(lineVerts, 3));
  boxGeometries.push(lineGeo);

  for (let i = 0; i < 4; i += 1) {
    const line = new THREE.Line(lineGeo, crossMat);
    line.rotation.z = i * 0.5 * Math.PI;
    crosshairs.add(line);
  }

  // ==================== RAYCASTER & LASER SİSTEMİ ====================
  const raycaster = new THREE.Raycaster();
  const direction = new THREE.Vector3();
  const impactPos = new THREE.Vector3();
  const impactColor = new THREE.Color();
  let impactBox = null;

  let lasers = [];
  const laserGeo = new THREE.IcosahedronGeometry(0.05, 2);
  boxGeometries.push(laserGeo);

  // ==================== OYUN DURUMU ====================
  let isGameOver = false;
  let animationFrameId = null;
  let gencCoins = 0;
  const gameTime = 30;
  let startTime = Date.now();
  const coinValue = 1;

  // ==================== UI SİSTEMİ ====================
  let uiContainer = null;

  function createGameUI() {
    console.log('📊 UI oluşturuluyor...');
    
    uiContainer = document.createElement('div');
    uiContainer.id = 'gameUI';
    uiContainer.style.cssText = `
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 20px;
      color: white;
      font-family: 'Arial', sans-serif;
      font-size: 18px;
      font-weight: bold;
      z-index: 1000;
      text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
      pointer-events: none;
    `;
    
    uiContainer.innerHTML = `
      <div id="scoreDisplay" style="background: rgba(0, 204, 255, 0.3); padding: 8px 16px; border-radius: 8px; border: 2px solid #00ccff; font-size: 16px;">
        💰 GençCoin: <span id="scoreValue">0</span>
      </div>
      <div id="timerDisplay" style="background: rgba(255, 204, 0, 0.3); padding: 8px 16px; border-radius: 8px; border: 2px solid #ffcc00; font-size: 16px;">
        ⏱️ Süre: <span id="timerValue">30</span>s
      </div>
    `;
    
    containerElement.appendChild(uiContainer);
    console.log('✅ UI eklendi!');
  }

  function updateScore() {
    const scoreElement = document.getElementById('scoreValue');
    if (scoreElement) {
      scoreElement.textContent = gencCoins;
    }
  }

  function updateTimer() {
    const elapsed = (Date.now() - startTime) / 1000;
    const remaining = Math.max(0, Math.ceil(gameTime - elapsed));
    
    const timerElement = document.getElementById('timerValue');
    if (timerElement) {
      timerElement.textContent = remaining;
      
      const timerDisplay = document.getElementById('timerDisplay');
      if (remaining <= 10 && timerDisplay) {
        timerDisplay.style.background = 'rgba(255, 0, 68, 0.3)';
        timerDisplay.style.borderColor = '#ff0044';
      }
    }
    
    if (remaining <= 0) {
      console.log('⏰ SÜRE BİTTİ! Toplam GençCoin:', gencCoins);
      return true;
    }
    
    return false;
  }

  // ==================== GAME OVER ====================
  let gameOverDiv = null;

  function showGameOverScreen() {
    const totalCoins = gencCoins * coinValue;
    
    gameOverDiv = document.createElement('div');
    gameOverDiv.id = 'gameOverScreen';
    gameOverDiv.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(0, 50, 100, 0.9));
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      font-family: Arial, sans-serif;
      z-index: 1000;
      animation: fadeIn 0.3s ease-in;
    `;
    
    gameOverDiv.innerHTML = `
      <style>
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes coinPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .coin-display {
          animation: coinPulse 2s ease-in-out infinite;
        }
      </style>
      <h1 style="font-size: 72px; margin: 0; color: #00ccff; text-shadow: 0 0 20px #00ccff; margin-bottom: 20px;">
        🎮 OYUN BİTTİ!
      </h1>
      <div class="coin-display" style="
        background: linear-gradient(135deg, #FFD700, #FFA500);
        padding: 30px 60px;
        border-radius: 20px;
        margin: 30px 0;
        box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
        border: 3px solid #FFD700;
      ">
        <p style="font-size: 48px; margin: 0; color: #000; font-weight: bold; text-align: center;">
          💰 ${totalCoins} GençCoin
        </p>
        <p style="font-size: 20px; margin: 10px 0 0 0; color: #333; text-align: center;">
          Kazandınız! 🎉
        </p>
      </div>
      <p style="font-size: 24px; margin: 10px 0; color: #aaa;">
        30 saniyede ${gencCoins} kutu vurdunuz
      </p>
      <p style="font-size: 18px; margin: 20px 0; color: #ffcc00; font-style: italic;">
        ⚠️ Bu oyunu günde sadece 1 kez oynayabilirsiniz
      </p>
    `;
    
    containerElement.appendChild(gameOverDiv);
  }

  function triggerGameOver() {
    if (isGameOver) return;
    
    isGameOver = true;
    
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    
    showGameOverScreen();
    
    // React callback
    if (window.onGameOver && typeof window.onGameOver === 'function') {
      window.onGameOver({ 
        gencCoins: gencCoins,
        totalCoins: gencCoins * coinValue,
        timeLimit: gameTime 
      });
    }
  }

  // ==================== LASER SİSTEMİ ====================
  function getLaserBolt() {
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0xFFCC00,
      transparent: true,
      fog: false
    });
    boxMaterials.push(laserMat);
    
    const laserBolt = new THREE.Mesh(laserGeo, laserMat);
    laserBolt.position.copy(camera.position);

    let active = true;
    const speed = 0.5;

    const goalPos = camera.position.clone()
      .setFromMatrixPosition(crosshairs.matrixWorld);

    const laserDirection = new THREE.Vector3(0, 0, 0);
    laserDirection.subVectors(laserBolt.position, goalPos)
      .normalize()
      .multiplyScalar(speed);

    direction.subVectors(goalPos, camera.position);
    raycaster.set(camera.position, direction);
    const intersects = raycaster.intersectObjects([...boxGroup.children, tubeHitArea], true);

    if (intersects.length > 0) {
      impactPos.copy(intersects[0].point);
      impactColor.copy(intersects[0].object.material.color);
      if (intersects[0].object.name === 'box') {
        impactBox = intersects[0].object.userData.box;
        boxGroup.remove(intersects[0].object);
        
        // GençCoin kazan!
        gencCoins++;
        updateScore();
        console.log(`💰 HIT! ${gencCoins} GençCoin`);
      }
    }

    let scale = 1.0;
    let opacity = 1.0;
    let isExploding = false;

    function update() {
      if (active === true) {
        if (isExploding === false) {
          laserBolt.position.sub(laserDirection);

          if (laserBolt.position.distanceTo(impactPos) < 0.5) {
            laserBolt.position.copy(impactPos);
            laserBolt.material.color.set(impactColor);
            isExploding = true;
            impactBox?.scale.setScalar(0.0);
          }
        } else {
          if (opacity > 0.01) {
            scale += 0.2;
            opacity *= 0.85;
          } else {
            opacity = 0.0;
            scale = 0.01;
            active = false;
          }
          laserBolt.scale.setScalar(scale);
          laserBolt.material.opacity = opacity;
          laserBolt.userData.active = active;
        }
      }
    }
    
    laserBolt.userData = { update, active };
    return laserBolt;
  }

  function fireLaser() {
    if (isGameOver) return;
    
    const laser = getLaserBolt();
    lasers.push(laser);
    scene.add(laser);

    // Cleanup inactive lasers
    const inactiveLasers = lasers.filter((l) => l.userData.active === false);
    scene.remove(...inactiveLasers);
    lasers = lasers.filter((l) => l.userData.active === true);
  }

  // ==================== KAMERA VE ANİMASYON ====================
  function updateCamera(t) {
    const time = t * 0.1;
    const looptime = 10 * 1000;
    const p = (time % looptime) / looptime;
    const pos = tubeGeo.parameters.path.getPointAt(p);
    const lookAt = tubeGeo.parameters.path.getPointAt((p + 0.03) % 1);
    camera.position.copy(pos);
    camera.lookAt(lookAt);
  }

  function animate(t = 0) {
    if (isGameOver) return;
    
    animationFrameId = requestAnimationFrame(animate);
    updateCamera(t);
    
    if (updateTimer()) {
      console.log('🛑 Süre doldu, oyunu durduruyor...');
      triggerGameOver();
      return;
    }
    
    crosshairs.position.set(mousePos.x, mousePos.y, -1);
    lasers.forEach(l => l.userData.update());
    composer.render(scene, camera);
  }

  // ==================== INPUT HANDLERs ====================
  function onPointerDown(evt) {
    evt.preventDefault();
    fireLaser();
  }

  function onPointerMove(evt) {
    const rect = containerElement.getBoundingClientRect();
    
    const x = ((evt.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((evt.clientY - rect.top) / rect.height) * 2 + 1;
    
    w = containerElement.clientWidth;
    h = containerElement.clientHeight;
    const aspect = w / h;
    const fudge = { x: aspect * 0.75, y: 0.75 };
    mousePos.x = x * fudge.x;
    mousePos.y = y * fudge.y;
  }

  function handleResize() {
    w = containerElement.clientWidth;
    h = containerElement.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    composer.setSize(w, h);
  }

  // Event listener'ları ekle
  containerElement.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove, false);
  window.addEventListener('resize', handleResize, false);

  // ==================== OYUNU BAŞLAT ====================
  createGameUI();
  animate();
  console.log('✅ Oyun başlatıldı!');

  // ==================== CLEANUP FONKSİYONU ====================
  /**
   * Oyunu tamamen temizler ve kaynakları serbest bırakır
   * Component unmount edildiğinde çağrılmalıdır
   */
  return function cleanup() {
    console.log('🧹 Oyun temizleniyor...');

    // Animasyon döngüsünü durdur
    isGameOver = true;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    // Event listener'ları kaldır
    containerElement.removeEventListener('pointerdown', onPointerDown);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('resize', handleResize);

    // UI elementlerini kaldır
    if (uiContainer && uiContainer.parentNode) {
      uiContainer.parentNode.removeChild(uiContainer);
    }
    if (gameOverDiv && gameOverDiv.parentNode) {
      gameOverDiv.parentNode.removeChild(gameOverDiv);
    }

    // Laser'ları temizle
    lasers.forEach(laser => {
      scene.remove(laser);
      if (laser.geometry) laser.geometry.dispose();
      if (laser.material) laser.material.dispose();
    });
    lasers = [];

    // Box line segments'leri temizle
    boxLineSegments.forEach(lineSegment => {
      scene.remove(lineSegment);
    });

    // Scene'deki tüm objeleri temizle
    scene.remove(tubeLines);
    scene.remove(tubeHitArea);
    scene.remove(boxGroup);
    scene.remove(stars);

    // Geometrileri dispose et
    boxGeometries.forEach(geo => {
      if (geo && geo.dispose) {
        geo.dispose();
      }
    });

    // Materyalleri dispose et
    boxMaterials.forEach(mat => {
      if (mat && mat.dispose) {
        mat.dispose();
      }
    });

    // Ana geometrileri dispose et
    if (tubeGeo) tubeGeo.dispose();
    if (tubeEdges) tubeEdges.dispose();
    if (hitMat) hitMat.dispose();
    if (tubeLineMat) tubeLineMat.dispose();

    // Stars geometry ve material temizle
    if (stars.geometry) stars.geometry.dispose();
    if (stars.material) stars.material.dispose();

    // Composer'ı temizle
    composer.dispose();

    // Renderer'ı temizle
    renderer.dispose();
    
    // Canvas'ı DOM'dan kaldır
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }

    console.log('✅ Oyun temizlendi!');
  };
}

export default initGame;

