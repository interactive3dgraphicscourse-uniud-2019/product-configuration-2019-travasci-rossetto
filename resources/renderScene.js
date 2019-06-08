var scene, renderer, camera, stats;

//Metal texture (material #1)
var diffuseMapMetal = new THREE.TextureLoader().load('./texture/Metal_Bare_se2abbvc_4K_surface_ms/se2abbvc_4K_Diffuse.jpg');
var roughnessMapMetal = new THREE.TextureLoader().load('./texture/Metal_Bare_se2abbvc_4K_surface_ms/se2abbvc_4K_Roughness.jpg');
var specularMapMetal = new THREE.TextureLoader().load('./texture/Metal_Bare_se2abbvc_4K_surface_ms/se2abbvc_4K_Specular.jpg');
var normalMapMetal = new THREE.TextureLoader().load('./texture/Metal_Bare_se2abbvc_4K_surface_ms/se2abbvc_4K_Normal.jpg');
var displacementMapMetal = new THREE.TextureLoader().load('./texture/Metal_Bare_se2abbvc_4K_surface_ms/se2abbvc_4K_Displacement.jpg');

//Wood texture (material #2)
var diffuseMapWood = new THREE.TextureLoader().load('./texture/[4K]Wood16/Wood16_col.jpg');
var roughnessMapWood = new THREE.TextureLoader().load('./texture/[4K]Wood16/Wood16_rgh.jpg');
var specularMapWood = new THREE.TextureLoader().load('./texture/[4K]Wood16/Wood16_Specular.jpg');
var normalMapWood = new THREE.TextureLoader().load('./texture/[4K]Wood16/Wood16_nrm.jpg');
var displacementMapWood = new THREE.TextureLoader().load('./texture/[4K]Wood16/Wood16_disp.jpg');

//Plastic texture (material #3)
var diffuseMapPlastic = new THREE.TextureLoader().load('./texture/_schbehmp_4K_surface_ms/schbehmp_4K_Diffuse.jpg');
var roughnessMapPlastic = new THREE.TextureLoader().load('./texture/_schbehmp_4K_surface_ms/schbehmp_4K_Roughness.jpg');
var specularMapPlastic = new THREE.TextureLoader().load('./texture/_schbehmp_4K_surface_ms/schbehmp_4K_Specular.jpg');
var normalMapPlastic = new THREE.TextureLoader().load('./texture/_schbehmp_4K_surface_ms/schbehmp_4K_Normal.jpg');
var displacementMapPlastic = new THREE.TextureLoader().load('./texture/_schbehmp_4K_surface_ms/schbehmp_4K_Displacement.jpg');

//Chicken texture (material #1)
var diffuseMapChicken = new THREE.TextureLoader().load('./texture/Creature_Skin_rmugyqp0_4K_surface_ms/rmugyqp_4K_Albedo.jpg');
var roughnessMapChicken = new THREE.TextureLoader().load('./texture/Creature_Skin_rmugyqp0_4K_surface_ms/rmugyqp_4K_Roughness.jpg');
var specularMapChicken = new THREE.TextureLoader().load('./texture/Creature_Skin_rmugyqp0_4K_surface_ms/rmugyqp_4K_Specular.jpg');
var normalMapChicken = new THREE.TextureLoader().load('./texture/Creature_Skin_rmugyqp0_4K_surface_ms/rmugyqp_4K_Normal.jpg');
var displacementMapChicken = new THREE.TextureLoader().load('./texture/Creature_Skin_rmugyqp0_4K_surface_ms/rmugyqp_4K_Displacement.jpg');
var aoMapChicken = new THREE.TextureLoader().load('./texture/Creature_Skin_rmugyqp0_4K_surface_ms/rmugyqp_4K_AO.jpg');

var uniforms_metal = {
	pointLightPosition:	{ type: "v3", value: new THREE.Vector3() },
	clight:	{ type: "v3", value: new THREE.Vector3( 1.0, 1.0, 1.0 ) },
	roughnessMap: { type: "t", value: roughnessMapMetal },
	diffuseMap: { type: "t", value: diffuseMapMetal },
	specularMap: { type: "t", value: specularMapMetal },
	displacementMap: { type: "t", value: displacementMapMetal },
	normalMap: { type: "t", value: normalMapMetal },
};

var uniforms_wood = {
	pointLightPosition:	{ type: "v3", value: new THREE.Vector3( 0.0, 0.0, 0.0 ) },
	clight:	{ type: "v3", value: new THREE.Vector3( 1.0, 1.0, 1.0 ) },
	roughnessMap: { type: "t", value: roughnessMapWood },
	diffuseMap: { type: "t", value: diffuseMapWood },
	specularMap: { type: "t", value: specularMapWood },
	displacementMap: { type: "t", value: displacementMapWood },
	normalMap: { type: "t", value: normalMapWood },
};

var uniforms_plastic = {
	pointLightPosition:	{ type: "v3", value: new THREE.Vector3( 0.0, 0.0, 0.0 ) },
	clight:	{ type: "v3", value: new THREE.Vector3( 1.0, 1.0, 1.0 ) },
	roughnessMap: { type: "t", value: roughnessMapPlastic },
	diffuseMap: { type: "t", value: diffuseMapPlastic },
	specularMap: { type: "t", value: specularMapPlastic },
	displacementMap: { type: "t", value: displacementMapPlastic },
	normalMap: { type: "t", value: normalMapPlastic },
};

var glassBody=[];

var loader = new THREE.CubeTextureLoader();
	loader.setPath( 'images/Standard-Cube-Map/' );

var textureCube = loader.load( [
	'px.png', 'nx.png',
	'py.png', 'ny.png',
	'pz.png', 'nz.png'
] );

var mirrorNormalMap = new THREE.TextureLoader().load('./texture/Metal_Bare_se2abbvc_4K_surface_ms/se2abbvc_4K_Normal.jpg');

var uniformsMirror = {
	cspec:	{ type: "v3", value: new THREE.Vector3(0.6,0.6,0.6) },
	envMap:	{ type: "t", value: textureCube},
	normalMap:	{ type: "t", value: mirrorNormalMap},
};

var uniformsGlass = {
	cspec:	{ type: "v3", value: new THREE.Vector3(0.6,0.6,0.6) },
	envMap:	{ type: "t", value: textureCube},
	normalMap:	{ type: "t", value: mirrorNormalMap},
}

function Start() {

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, 915 / 500, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true} );
	renderer.physicallyCorrectLights = true;
	var controls = new THREE.OrbitControls( camera, document.getElementById("canvas") );

	renderer.setSize( 915, 500 );
	renderer.setClearColor( 0xf0f0f0 );
	camera.position.set( 0, 2, 12 );
				
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
	
	vsMirror = document.getElementById("vertexMirror").textContent;
	fsMirror = document.getElementById("fragmentMirror").textContent;

	vsGlass = document.getElementById("vertexGlass").textContent;
	fsGlass = document.getElementById("fragmentGlass").textContent;

	loadObj();
	var lightMesh = new THREE.Mesh( new THREE.SphereGeometry(1, 16, 16), new THREE.MeshBasicMaterial ({color: 0xffff00, wireframe:true}));
	lightMesh.position.set( -30.0, 31.0, 5 );
	
	uniforms_metal.pointLightPosition.value = new THREE.Vector3(lightMesh.position.x,
		lightMesh.position.y,
		lightMesh.position.z);
		
	uniforms_wood.pointLightPosition.value = new THREE.Vector3(lightMesh.position.x,
		lightMesh.position.y,
		lightMesh.position.z);
		
	uniforms_plastic.pointLightPosition.value = new THREE.Vector3(lightMesh.position.x,
		lightMesh.position.y,
		lightMesh.position.z);

	//scene.add(lightMesh);

	/*stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	document.body.appendChild( stats.domElement );*/

	}

// GLTF LOADER
function loadObj() {
	var loader = new THREE.GLTFLoader();
	loader.load(
		"../models/glasses.gltf",

		function( object ) {
			//console.log( object.scene );
				glasses = new THREE.Object3D();
				for( i=0; i<object.scene.children.length; ++i) {
					geometry = object.scene.children[i].geometry;
				
					if( i == 3 ) {
						var glassMaterial = new THREE.ShaderMaterial({ uniforms: uniformsGlass, vertexShader: vsGlass, fragmentShader: fsGlass });
						glassMaterial.vertexTangents = true;
						glassMaterial.needsUpdate = true;
						//console.log(glassMaterial);
						mesh = new THREE.Mesh( geometry, glassMaterial );
						glasses.add(mesh);
					} else {
						var frameMaterial = new THREE.ShaderMaterial({ uniforms: uniforms_metal, vertexShader: vs, fragmentShader: fs });
						frameMaterial.vertexTangents = true;
						frameMaterial.needsUpdate = true;
						//console.log(frameMaterial);
						mesh = new THREE.Mesh( geometry, frameMaterial );
						glasses.add(mesh)
						glassBody.push(mesh);
					}
			}

			//glasses.scale.multiplyScalar( 2 );
			glasses.rotation.x += 90 * Math.PI/180;
			glasses.rotation.z += 125 * Math.PI/180;
			glasses.position.z=1;
			glasses.scale.multiplyScalar(2);
			scene.add( glasses );
		}
	);
}
	
var cameraRotation=true;
function Update() {
	if(cameraRotation){
		var t=Date.now();
		t%=10000;
		t=(t/10000)*2*Math.PI;
		camera.position.x=Math.sin(t)*14;
		camera.position.z=Math.cos(t)*14-2;
		camera.position.y=Math.sin(t)*2+2;
		camera.up = new THREE.Vector3(0,1,0);
		camera.lookAt(new THREE.Vector3(0,0,0));
	}
	requestAnimationFrame(Update);
	//stats.update();
	renderer.render(scene, camera);
}

function changeGlassesMaterial(n){
	var uniform;
	if(n == 1){
		uniform = uniforms_metal;
	}else if(n==2){
		uniform = uniforms_wood;
	}else{
		uniform = uniforms_plastic;
	}
	for( i=0; i<glassBody.length; i++){
		glassBody[i].material=new THREE.ShaderMaterial({ uniforms: uniform, vertexShader: vs, fragmentShader: fs });
		glassBody[i].geometry.vertexTangents = true;
		glassBody[i].geometry.needsUpdate = true;
	}
}