var scene, renderer, camera, stats;

var colorMap = new THREE.TextureLoader().load('./texture/[2K]Metal10/Metal10_col.jpg');
var roughnessMap = new THREE.TextureLoader().load('./texture/[2K]Metal10/Metal10_rgh.jpg');
var metalnessMap = new THREE.TextureLoader().load('./texture/[2K]Metal10/Metal10_met.jpg');
var blackMap = new THREE.TextureLoader().load('./texture/met_BLACK.jpg');

var uniforms_plastic = {
	cspec:	{ type: "v3", value: new THREE.Vector3( 0.78, 0.0, 0.0 ) },
	roughness: {type: "f", value: 0.2},
	pointLightPosition:	{ type: "v3", value: new THREE.Vector3( 0.0, 0.0, 0.0 ) },
	clight:	{ type: "v3", value: new THREE.Vector3( 1.0, 1.0, 1.0 ) },
};

var uniforms_metal = {
	pointLightPosition:	{ type: "v3", value: new THREE.Vector3() },
	clight:	{ type: "v3", value: new THREE.Vector3( 1.0, 1.0, 1.0 ) },
	roughnessMap: { type: "t", value: roughnessMap },
	colorMap: { type: "t", value: colorMap },
	metalnessMap: { type: "t", value: blackMap },
};

function Start() {

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, 915 / 500, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true} );
	var controls = new THREE.OrbitControls( camera, document.getElementById("canvas") );
	var glasses = new THREE.Mesh();

	renderer.setSize( 915, 500 );
	renderer.setClearColor( 0xf0f0f0 );
	camera.position.set( 0, 1, 30 );
				
	var loader = new THREE.CubeTextureLoader();
	loader.setPath( 'images/Standard-Cube-Map/' );

	var textureCube = loader.load( [
		'px.png', 'nx.png',
		'py.png', 'ny.png',
		'pz.png', 'nz.png'
	] );

	scene.background = textureCube;

	vs = document.getElementById("vertex").textContent;
	fs = document.getElementById("fragment").textContent;

	// instantiate a loader
	var loader = new THREE.OBJLoader();
	loader.load(
		"../models/glasses/Glasses_v2.22.obj", 
		function( object ) {
						
		//console.log(object);  // debug

			glasses = object;

			for( i=0; i<3; ++i ) {
				if(i==0) {
					glasses.children[i].material = new THREE.ShaderMaterial({
						uniforms: uniforms_metal, 
						vertexShader: vs, 
						fragmentShader: fs
					});
				} else {
					glasses.children[i].material = new THREE.ShaderMaterial({
						uniforms: uniforms_plastic, 
						vertexShader: vs, 
						fragmentShader: fs
					});
				}

				glasses.children[i].geometry.computeVertexNormals();
			}
			glasses.position.set(0, 10, 10);
			glasses.scale.multiplyScalar(10);			
			scene.rotation.y -= 45 * Math.PI/180;
			scene.add(glasses);
			renderer.render( scene, camera );
		});

	var lightMesh = new THREE.Mesh( new THREE.SphereGeometry(1, 16, 16), new THREE.MeshBasicMaterial ({color: 0xffff00, wireframe:true}));
	lightMesh.position.set( -30.0, 30.0, 50.0 );
	uniforms_plastic.pointLightPosition.value = new THREE.Vector3(lightMesh.position.x,
		lightMesh.position.y,
		lightMesh.position.z);

	uniforms_metal.pointLightPosition.value = new THREE.Vector3(lightMesh.position.x,
		lightMesh.position.y,
		lightMesh.position.z);

	scene.add(lightMesh);

				/*stats = new Stats();
				stats.domElement.style.position = 'absolute';
				stats.domElement.style.top = '0px';
				document.body.appendChild( stats.domElement );*/

	}

	function Update() {
		requestAnimationFrame(Update);
		//stats.update();
		renderer.render(scene, camera);
	}