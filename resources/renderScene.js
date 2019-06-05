var scene, renderer, camera, stats;

// ANISOTROPIC FILTERS LACKING
var diffuseMap = new THREE.TextureLoader().load('./texture/[2K]Metal10/Metal10_col.jpg');
var roughnessMap = new THREE.TextureLoader().load('./texture/[2K]Metal10/Metal10_rgh.jpg');
var specularMap = new THREE.TextureLoader().load('./texture/[2K]Metal10/Metal10_met.jpg');
var normalMap = new THREE.TextureLoader().load('./texture/[2K]Metal10/Metal10_nrm.jpg');
var displacementMap = new THREE.TextureLoader().load('./texture/[2K]Metal10/Metal10_disp.jpg');

var uniforms_plastic = {
	pointLightPosition:	{ type: "v3", value: new THREE.Vector3( 0.0, 0.0, 0.0 ) },
	clight:	{ type: "v3", value: new THREE.Vector3( 1.0, 1.0, 1.0 ) },
	roughnessMap: { type: "t", value: roughnessMap },
	diffuseMap: { type: "t", value: diffuseMap },
	specularMap: { type: "t", value: specularMap },
	displacementMap: { type: "t", value: displacementMap },
	normalMap: { type: "t", value: normalMap },
	metalness:	{ type: "f", value: 0.0 },
};

var uniforms_metal = {
	pointLightPosition:	{ type: "v3", value: new THREE.Vector3() },
	clight:	{ type: "v3", value: new THREE.Vector3( 1.0, 1.0, 1.0 ) },
	roughnessMap: { type: "t", value: roughnessMap },
	diffuseMap: { type: "t", value: diffuseMap },
	specularMap: { type: "t", value: specularMap },
	displacementMap: { type: "t", value: displacementMap },
	normalMap: { type: "t", value: normalMap },
	metalness:	{ type: "f", value: 1.0 },
};

function Start() {

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, 915 / 500, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true} );
	var controls = new THREE.OrbitControls( camera, document.getElementById("canvas") );

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

	loadObj();

	var lightMesh = new THREE.Mesh( new THREE.SphereGeometry(1, 16, 16), new THREE.MeshBasicMaterial ({color: 0xffff00, wireframe:true}));
	lightMesh.position.set( -30.0, 60.0, 50.0 );
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

	function loadObj() {
		var loader = new THREE.OBJLoader();
		loader.useIndices = true;
		loader.load(
			"../models/glasses.obj",

			function( object ) {

				glasses = new THREE.Object3D();
				object.traverse( function(child) {
					if( child instanceof THREE.Mesh ) {
						geometry = child.geometry;
						if( geometry == object.children[2].geometry ) {
							// The glasses
							// --- NOTICE: The material isn't final yet ---
							var glassMaterial = new THREE.ShaderMaterial({ uniforms: uniforms_plastic, vertexShader: vs, fragmentShader: fs });
							glassMaterial.vertexTangents = true;
							glassMaterial.needsUpdate = true;
							//console.log(glassMaterial);
							mesh = new THREE.Mesh( geometry, glassMaterial );
							glasses.add(mesh);
						} else if( geometry != object.children[0].geometry ){
							var frameMaterial = new THREE.ShaderMaterial({ uniforms: uniforms_metal, vertexShader: vs, fragmentShader: fs });
							frameMaterial.vertexTangents = true;
							frameMaterial.needsUpdate = true;
							//console.log(frameMaterial);
							mesh = new THREE.Mesh( geometry, frameMaterial );
							glasses.add(mesh);
						}
					}
				});

				glasses.scale.multiplyScalar( 2 );
				glasses.rotation.y -= 65 * Math.PI/180;
				scene.add( glasses );
			}
		);
	}

	function Update() {
		requestAnimationFrame(Update);
		//stats.update();
		renderer.render(scene, camera);
	}