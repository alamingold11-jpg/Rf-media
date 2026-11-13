import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

(function initAdmin3DBackground() {
  const mount = document.getElementById('admin-3d-bg');
  if (!mount) return;

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Detect software WebGL (SwiftShader / llvmpipe / WARP) cleanly
  const isSoftwareGl = (() => {
    try {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param) || '');
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    } catch (e) {
      return true;
    }
  })();

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: false,
      powerPreference: 'high-performance'
    });
  } catch (err) {
    return;
  }

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = false;

  const domEl = renderer.domElement;
  domEl.style.width = '100%';
  domEl.style.height = '100%';
  domEl.style.display = 'block';
  mount.appendChild(domEl);

  // Scene & executive pearl-slate atmospheric background
  const scene = new THREE.Scene();
  const bgHex = 0xe8eef6;
  scene.background = new THREE.Color(bgHex);
  scene.fog = new THREE.FogExp2(bgHex, 0.036);

  const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / Math.max(1, window.innerHeight),
    0.1,
    100
  );
  camera.position.set(0, 1.2, 13.5);
  camera.lookAt(0, 0, 0);

  // Studio environment reflections (RoomEnvironment via PMREMGenerator)
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const envTex = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  pmremGenerator.dispose();

  // Warm / Cool balanced 3-point studio lighting
  const hemiLight = new THREE.HemisphereLight(0xf8fbff, 0xcbd5e1, 0.85);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xfff5e8, 1.45);
  keyLight.position.set(7, 10, 8);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x93c5fd, 1.15);
  rimLight.position.set(-8, -4, -6);
  scene.add(rimLight);

  const fillLight = new THREE.DirectionalLight(0xe0e7ff, 0.6);
  fillLight.position.set(-5, 6, 6);
  scene.add(fillLight);

  // ---------------------------------------------------------------------------
  // COMPOSITE 3D ARCHITECTURAL SCULPTURE (8+ distinct parts across 3 scales)
  // ---------------------------------------------------------------------------
  const sculptureGroup = new THREE.Group();
  sculptureGroup.position.set(0, 0, 0);
  scene.add(sculptureGroup);

  const disposables = [];
  const trackGeo = (g) => { disposables.push(g); return g; };
  const trackMat = (m) => { disposables.push(m); return m; };

  // Materials with calibrated roughness & metalness contrast (>= 0.25 delta)
  const matAnodizedSlate = trackMat(new THREE.MeshPhysicalMaterial({
    color: 0x334155,
    metalness: 0.86,
    roughness: 0.28,
    clearcoat: 0.45,
    clearcoatRoughness: 0.2
  }));

  const matBrushedPlatinum = trackMat(new THREE.MeshPhysicalMaterial({
    color: 0xdbe4ef,
    metalness: 0.92,
    roughness: 0.16,
    clearcoat: 0.6,
    clearcoatRoughness: 0.12
  }));

  const matMatteCeramic = trackMat(new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    metalness: 0.08,
    roughness: 0.62
  }));

  const matSapphireAccent = trackMat(new THREE.MeshPhysicalMaterial({
    color: 0x3b82f6,
    metalness: 0.15,
    roughness: 0.08,
    transmission: isSoftwareGl ? 0 : 0.82,
    transparent: true,
    opacity: isSoftwareGl ? 0.55 : 1.0,
    ior: 1.54,
    thickness: 1.2,
    attenuationColor: new THREE.Color(0x93c5fd),
    attenuationDistance: 2.0,
    clearcoat: 1.0
  }));

  const matChampagneTrim = trackMat(new THREE.MeshPhysicalMaterial({
    color: 0xb89b6a,
    metalness: 0.9,
    roughness: 0.22,
    clearcoat: 0.5
  }));

  // Part 1 (Primary Silhouette): Beveled Hexagonal Architectural Prism Core
  const hexShape = new THREE.Shape();
  const hexR = 1.45;
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const x = Math.cos(a) * hexR;
    const y = Math.sin(a) * hexR;
    if (i === 0) hexShape.moveTo(x, y);
    else hexShape.lineTo(x, y);
  }
  hexShape.closePath();

  const hexHole = new THREE.Path();
  const holeR = 0.82;
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const x = Math.cos(a) * holeR;
    const y = Math.sin(a) * holeR;
    if (i === 0) hexHole.moveTo(x, y);
    else hexHole.lineTo(x, y);
  }
  hexHole.closePath();
  hexShape.holes.push(hexHole);

  const coreFrameGeo = trackGeo(new THREE.ExtrudeGeometry(hexShape, {
    depth: 0.36,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.07,
    bevelSegments: 3
  }));
  coreFrameGeo.center();
  const coreFrameMesh = new THREE.Mesh(coreFrameGeo, matAnodizedSlate);
  sculptureGroup.add(coreFrameMesh);

  // Part 2 (Primary/Interior Core): Faceted Sapphire Optical Jewel
  const jewelGeo = trackGeo(new THREE.IcosahedronGeometry(0.68, 0));
  const jewelMesh = new THREE.Mesh(jewelGeo, matSapphireAccent);
  sculptureGroup.add(jewelMesh);

  // Part 3 (Interior Accent): Precision Champagne Calibration Collar around Jewel
  const collarGeo = trackGeo(new THREE.TorusGeometry(0.92, 0.032, 16, 64));
  const collarMesh = new THREE.Mesh(collarGeo, matChampagneTrim);
  collarMesh.rotation.x = Math.PI / 2;
  sculptureGroup.add(collarMesh);

  // Part 4, 5, 6 (Secondary Silhouettes): Three Interlocking Gimbal / Architectural Rings
  const ringOuterGeo = trackGeo(new THREE.TorusGeometry(2.65, 0.065, 20, 96));
  const ringOuter = new THREE.Mesh(ringOuterGeo, matBrushedPlatinum);
  ringOuter.rotation.set(0.55, 0.35, 0.1);
  sculptureGroup.add(ringOuter);

  const ringMidGeo = trackGeo(new THREE.TorusGeometry(2.15, 0.085, 20, 88));
  const ringMid = new THREE.Mesh(ringMidGeo, matMatteCeramic);
  ringMid.rotation.set(-0.62, 0.45, 0.25);
  sculptureGroup.add(ringMid);

  const ringInnerGeo = trackGeo(new THREE.TorusGeometry(3.2, 0.028, 16, 108));
  const ringInner = new THREE.Mesh(ringInnerGeo, matAnodizedSlate);
  ringInner.rotation.set(1.1, -0.4, 0.5);
  sculptureGroup.add(ringInner);

  // Part 7 (Accent Architectural Blades): 4 Floating Precision Fin Struts
  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(-0.12, -0.55);
  bladeShape.lineTo(0.12, -0.55);
  bladeShape.lineTo(0.06, 0.55);
  bladeShape.lineTo(-0.06, 0.55);
  bladeShape.closePath();

  const bladeGeo = trackGeo(new THREE.ExtrudeGeometry(bladeShape, {
    depth: 0.08,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 2
  }));
  bladeGeo.center();

  const bladeGroup = new THREE.Group();
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const blade = new THREE.Mesh(bladeGeo, i % 2 === 0 ? matMatteCeramic : matBrushedPlatinum);
    blade.position.set(Math.cos(angle) * 2.15, Math.sin(angle) * 2.15, 0);
    blade.rotation.z = angle + Math.PI / 2;
    bladeGroup.add(blade);
  }
  sculptureGroup.add(bladeGroup);

  // Part 8 (Instanced Atmospheric Nodes): Subtle Architectural Spatial Constellation
  const nodeCount = 36;
  const nodeGeo = trackGeo(new THREE.OctahedronGeometry(0.075, 0));
  const nodeMat = trackMat(new THREE.MeshStandardMaterial({
    color: 0x64748b,
    metalness: 0.6,
    roughness: 0.35
  }));
  const instancedNodes = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);
  const nodeMeta = [];
  const dummyObj = new THREE.Object3D();
  const paletteTints = [
    new THREE.Color(0x94a3b8),
    new THREE.Color(0x64748b),
    new THREE.Color(0x3b82f6),
    new THREE.Color(0xcbd5e1)
  ];

  for (let i = 0; i < nodeCount; i++) {
    const radius = 3.8 + (i % 5) * 1.15;
    const theta = (i / nodeCount) * Math.PI * 2 * 2.3;
    const yOffset = ((i % 7) - 3) * 0.72;
    const scale = 0.7 + ((i * 17) % 10) * 0.06;
    nodeMeta.push({ radius, theta, yOffset, scale, speed: 0.06 + (i % 4) * 0.02 });

    dummyObj.position.set(Math.cos(theta) * radius, yOffset, Math.sin(theta) * radius * 0.65 - 1.5);
    dummyObj.scale.setScalar(scale);
    dummyObj.updateMatrix();
    instancedNodes.setMatrixAt(i, dummyObj.matrix);
    instancedNodes.setColorAt(i, paletteTints[i % paletteTints.length]);
  }
  instancedNodes.instanceMatrix.needsUpdate = true;
  if (instancedNodes.instanceColor) instancedNodes.instanceColor.needsUpdate = true;
  instancedNodes.computeBoundingSphere();
  scene.add(instancedNodes);

  // Subtle architectural studio horizon ring on floor plane
  const floorRingGeo = trackGeo(new THREE.RingGeometry(4.2, 4.24, 96));
  const floorRingMat = trackMat(new THREE.MeshBasicMaterial({
    color: 0xcbd5e1,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.55
  }));
  const floorRing = new THREE.Mesh(floorRingGeo, floorRingMat);
  floorRing.rotation.x = Math.PI / 2;
  floorRing.position.y = -3.4;
  scene.add(floorRing);

  // Pre-warm shaders on GPU
  if (!isSoftwareGl) {
    try { renderer.compile(scene, camera); } catch (e) {}
  }

  // Smooth pointer parallax targets (Zero GC pre-allocated)
  let pointerX = 0;
  let pointerY = 0;
  let currentCamX = 0;
  let currentCamY = 1.2;

  function onPointerMove(e) {
    if (prefersReducedMotion) return;
    const nx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
    const ny = (e.clientY / Math.max(1, window.innerHeight)) * 2 - 1;
    pointerX = nx * 0.75;
    pointerY = -ny * 0.45;
  }
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  // Resize handler
  function onResize() {
    const w = window.innerWidth;
    const h = Math.max(1, window.innerHeight);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
  }
  window.addEventListener('resize', onResize);

  // Context loss resilience
  let contextLost = false;
  domEl.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    contextLost = true;
  });
  domEl.addEventListener('webglcontextrestored', () => {
    contextLost = false;
  });

  // Render loop with software-WebGL afterDraw pacing
  const clock = new THREE.Clock();
  let frameId = 0;
  let disposed = false;

  function afterDraw(cb) {
    try {
      const gl = renderer.getContext();
      if (gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (disposed) return;
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 5);
        return;
      }
    } catch (e) {}
    frameId = window.setTimeout(cb, 80);
  }

  function tick() {
    if (disposed) return;
    const dt = Math.min(clock.getDelta(), 0.1);
    const t = clock.getElapsedTime();

    if (!prefersReducedMotion) {
      // Silky exponential camera damping toward cursor offset
      currentCamX = THREE.MathUtils.damp(currentCamX, pointerX, 3.2, dt);
      currentCamY = THREE.MathUtils.damp(currentCamY, 1.2 + pointerY, 3.2, dt);
      camera.position.x = currentCamX;
      camera.position.y = currentCamY;
      camera.lookAt(0, 0, 0);

      // Gentle kinetic motion of composite model parts
      sculptureGroup.position.y = Math.sin(t * 0.55) * 0.16;
      coreFrameMesh.rotation.y = t * 0.14;
      coreFrameMesh.rotation.x = Math.sin(t * 0.3) * 0.12;

      jewelMesh.rotation.y = -t * 0.32;
      jewelMesh.rotation.z = t * 0.18;
      collarMesh.rotation.z = t * 0.25;

      ringOuter.rotation.z += dt * 0.12;
      ringOuter.rotation.x = 0.55 + Math.sin(t * 0.25) * 0.08;
      ringMid.rotation.y -= dt * 0.16;
      ringInner.rotation.x += dt * 0.09;
      bladeGroup.rotation.z = -t * 0.1;

      // Update instanced orbital nodes without allocating
      for (let i = 0; i < nodeCount; i++) {
        const meta = nodeMeta[i];
        const a = meta.theta + t * meta.speed;
        dummyObj.position.set(
          Math.cos(a) * meta.radius,
          meta.yOffset + Math.sin(t * 0.7 + i) * 0.14,
          Math.sin(a) * meta.radius * 0.65 - 1.5
        );
        dummyObj.rotation.set(t * 0.4 + i, t * 0.3, 0);
        dummyObj.scale.setScalar(meta.scale);
        dummyObj.updateMatrix();
        instancedNodes.setMatrixAt(i, dummyObj.matrix);
      }
      instancedNodes.instanceMatrix.needsUpdate = true;
    }

    if (!contextLost) {
      renderer.render(scene, camera);
    }

    if (prefersReducedMotion) return; // Render one crisp frame cleanly
    if (isSoftwareGl) {
      afterDraw(tick);
    } else {
      frameId = window.requestAnimationFrame(tick);
    }
  }

  tick();

  window.addEventListener('beforeunload', () => {
    disposed = true;
    window.cancelAnimationFrame(frameId);
    window.clearTimeout(frameId);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('resize', onResize);
    disposables.forEach((d) => { try { d.dispose(); } catch (e) {} });
    try { envTex.dispose(); } catch (e) {}
    try { renderer.dispose(); } catch (e) {}
  });
})();
