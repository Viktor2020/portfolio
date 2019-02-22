// import dat from "dat.gui";
// import Stats from "stats-js";
import { Vector2, Color, WebGLRenderer, PointsMaterial, PerspectiveCamera, Vector3, Scene, Group, BufferGeometry, BufferAttribute, AdditiveBlending, VertexColors, Points, LineBasicMaterial, LineSegments} from "three";

export default function () {

    if (this.inited3d) return;
    this.inited3d = true;
    var group;
    var container, stats;
    var particlesData = [];
    var camera, scene, renderer;
    var positions, colors, colorsPoint;
    var particles;
    var pointCloud;
    var particlePositions;
    var linesMesh;
    var maxParticleCount = 1000;
    var particleCount = 500;//500
    var r = 800;
    var rHalf = r / 2;
    var effectController = {
        showDots: true,
        showLines: true,
        minDistance: 120,
        limitConnections: false,
        maxConnections: 20,
        particleCount: 500
    };
    var vMouse = new Vector2();
    var center = new Vector3();
    var vec = new Vector3();
    var vectorScreen = new Vector2();

    init();
    animate();
    function initGUI() {
        var gui = new dat.GUI();
        gui.add(effectController, "showDots").onChange(function (value) {
            pointCloud.visible = value;
        });
        gui.add(effectController, "showLines").onChange(function (value) {
            linesMesh.visible = value;
        });
        gui.add(effectController, "minDistance", 10, 300);
        gui.add(effectController, "limitConnections");
        gui.add(effectController, "maxConnections", 0, 30, 1);
        gui
            .add(effectController, "particleCount", 0, maxParticleCount, 1)
            .onChange(function (value) {
                particleCount = parseInt(value);
                particles.setDrawRange(0, particleCount);
            });

    }
    function init() {
        container = document.getElementById("container");
        // initGUI();
        camera = new PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1,
            4000
        );
        camera.position.z = r * 0.99;
        scene = new Scene();
        scene.background = new Color("#5055DF")
        group = new Group();
        scene.add(group);

        var segments = maxParticleCount * maxParticleCount;
        positions = new Float32Array(segments * 3);
        colors = new Float32Array(segments * 3);
        var pMaterial = new PointsMaterial({
            vertexColors: VertexColors,
            // color: 0xffffff,
            size: 3,
            blending: AdditiveBlending,
            transparent: true,
            sizeAttenuation: false
        });
        particles = new BufferGeometry();
        particlePositions = new Float32Array(maxParticleCount * 3);

        colorsPoint = new Float32Array(maxParticleCount * 3);
        colorsPoint.fill(1);

        for (var i = 0; i < maxParticleCount; i++) {
            var x = Math.random() * r - r / 2;
            var y = Math.random() * r - r / 2;
            var z = Math.random() * r - r / 2;
            particlePositions[i * 3] = x;
            particlePositions[i * 3 + 1] = y;
            particlePositions[i * 3 + 2] = z;
            // add it to the geometry
            particlesData.push({
                velocity: new Vector3(
                    -1 + Math.random() * 2,
                    -1 + Math.random() * 2,
                    -1 + Math.random() * 2
                ).multiplyScalar(0.5),
                numConnections: 0,
                screen: new Vector2()
            });
        }
        particles.setDrawRange(0, particleCount);
        particles.addAttribute("position",new BufferAttribute(particlePositions, 3).setDynamic(true));
        particles.addAttribute("color", new BufferAttribute(colorsPoint, 3).setDynamic(true));
        // create the particle system
        pointCloud = new Points(particles, pMaterial);
        group.add(pointCloud);
        var geometry = new BufferGeometry();
        geometry.addAttribute("position",new BufferAttribute(positions, 3).setDynamic(true));
        geometry.addAttribute("color",new BufferAttribute(colors, 3).setDynamic(true));
        geometry.computeBoundingSphere();
        geometry.setDrawRange(0, 0);
        var material = new LineBasicMaterial({
            vertexColors: VertexColors,
            blending: AdditiveBlending,
            transparent: true,
            opacity: 0.5
        });
        linesMesh = new LineSegments(geometry, material);
        group.add(linesMesh);
        //
        renderer = new WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        container.appendChild(renderer.domElement);
        //
        window.addEventListener("resize", onWindowResize, false);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('touchstart', onDocumentMouseMove, false);
        document.addEventListener('touchmove', onDocumentMouseMove, false);
        
        // stats = new Stats();
        // container.appendChild(stats.dom);
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onDocumentMouseMove (e) {
        if ((e.clientX) && (e.clientY)) {
            vMouse.set(e.clientX, e.clientY)
        } else if (e.targetTouches) {
            vMouse.set(e.targetTouches[0].clientX, e.targetTouches[0].clientY)
        }
    }

    function getAlpha(pScreen, p, r, r1) {
        var d = pScreen.distanceTo(p);
        return Math.min(Math.max(((d - r) / (r1 - r)), 0.01), 1);
    }

    function animate() {
        var vertexpos = 0;
        var colorpos = 0;
        var numConnected = 0;
        var alphaPoint = {
            x: window.innerWidth * 0.2,
            y: window.innerHeight * 0.35,
            r: 130,
            r1: 300
        }
        var alphaPoint2 = {
            x: window.innerWidth / 2,
            y: window.innerHeight - 30,
            r: 50,
            r1: 150
        }
        for (var i = 0; i < particleCount; i++) {
            particlesData[i].numConnections = 0;
            var particleData = particlesData[i];
            particlePositions[i * 3] += particleData.velocity.x;
            particlePositions[i * 3 + 1] += particleData.velocity.y;
            particlePositions[i * 3 + 2] += particleData.velocity.z;

            particleData.screen.copy(toScreenXY(group.localToWorld(vec.set(particlePositions[i * 3], particlePositions[i * 3 + 1], particlePositions[i * 3 + 2]))));
            
            var alpha = Math.min(getAlpha(particleData.screen, alphaPoint, alphaPoint.r, alphaPoint.r1), 
                getAlpha(particleData.screen, alphaPoint2, alphaPoint2.r, alphaPoint2.r1));

            colorsPoint[i * 3] = alpha;
            colorsPoint[i * 3 + 1] = alpha;
            colorsPoint[i * 3 + 2] = alpha;
        }
        for (var i = 0; i < particleCount; i++) {
            // get the particle
            var particleData = particlesData[i];

            if (particlePositions[i * 3] < -rHalf || particlePositions[i * 3] > rHalf) particleData.velocity.x = -particleData.velocity.x;
            if (particlePositions[i * 3 + 1] < -rHalf || particlePositions[i * 3 + 1] > rHalf) particleData.velocity.y = -particleData.velocity.y;
            if (particlePositions[i * 3 + 2] < -rHalf || particlePositions[i * 3 + 2] > rHalf) particleData.velocity.z = -particleData.velocity.z;

            if (effectController.limitConnections && particleData.numConnections >= effectController.maxConnections) continue;
            // Check collision
            for (var j = i + 1; j < particleCount; j++) {
                var particleDataB = particlesData[j];
                if (effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections) continue;
                var dx = particlePositions[i * 3] - particlePositions[j * 3];
                var dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
                var dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
                var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (dist < effectController.minDistance) {
                    particleData.numConnections++;
                    particleDataB.numConnections++;
                    var alpha = (1.0 - dist / effectController.minDistance) * (colorsPoint[i * 3] * colorsPoint[j * 3]);
                    positions[vertexpos++] = particlePositions[i * 3];
                    positions[vertexpos++] = particlePositions[i * 3 + 1];
                    positions[vertexpos++] = particlePositions[i * 3 + 2];
                    positions[vertexpos++] = particlePositions[j * 3];
                    positions[vertexpos++] = particlePositions[j * 3 + 1];
                    positions[vertexpos++] = particlePositions[j * 3 + 2];
                    colors[colorpos++] = alpha;
                    colors[colorpos++] = alpha;
                    colors[colorpos++] = alpha;
                    colors[colorpos++] = alpha;
                    colors[colorpos++] = alpha;
                    colors[colorpos++] = alpha;
                    numConnected++;
                }
            }
        }
        
        linesMesh.geometry.setDrawRange(0, numConnected * 2);
        linesMesh.geometry.attributes.position.needsUpdate = true;
        linesMesh.geometry.attributes.color.needsUpdate = true;

        pointCloud.geometry.attributes.position.needsUpdate = true;
        pointCloud.geometry.attributes.color.needsUpdate = true;
        
        if (stats) stats.update();
        render();
        requestAnimationFrame(animate);
    }

    function toScreenXY (vector3) { //
        vector3.project(camera);
        vectorScreen.x = Math.round((vector3.x + 1) * window.innerWidth / 2);
        vectorScreen.y = Math.round((-vector3.y + 1) * window.innerHeight / 2);
        return vectorScreen;
    };

    function render() {
        var time = Date.now() * 0.001;
        group.rotation.y = time * 0.1;
        group.rotation.y = time * 0.1;
        group.rotation.z = time * 0.1;
        camera.position.y = vMouse.y / window.innerWidth*50-50/2;
        camera.position.x = vMouse.x / window.innerHeight*50-50/2;
        camera.lookAt(center);
        renderer.render(scene, camera);
    }

}
