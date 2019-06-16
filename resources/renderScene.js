var scene, renderer, camera, stats;

//Metal texture (material #1)
var diffuseMapMetal = new THREE.TextureLoader().load('./texture/Metal_Bare_se2abbvc_4K_surface_ms/se2abbvc_4K_Diffuse.jpg');
var roughnessMapMetal = new THREE.TextureLoader().load('./texture/Metal_Bare_se2abbvc_4K_surface_ms/se2abbvc_4K_Roughness.jpg');
var specularMapMetal = new THREE.TextureLoader().load('./texture/Metal_Bare_se2abbvc_4K_surface_ms/se2abbvc_4K_Specular.jpg');
var normalMapMetal = new THREE.TextureLoader().load('./texture/Metal_Bare_se2abbvc_4K_surface_ms/se2abbvc_4K_Normal.jpg');

var loader = new THREE.CubeTextureLoader();
	loader.setPath( 'images/Standard-Cube-Map/' );

// daylight cube map
var textureCube = loader.load( [
	'px.png', 'nx.png',
	'py.png', 'ny.png',
	'pz.png', 'nz.png'
] );

var loader = new THREE.CubeTextureLoader().setPath( 'images/Irradiance-Map/' );

var irradianceMap = loader.load( [
	'px.png', 'nx.png',
	'py.png', 'ny.png',
	'pz.png', 'nz.png'
] );

loader = new THREE.CubeTextureLoader().setPath( 'images/Moonlight-Cube-Map/');

// Moonlight cube map
var textureCube2 = loader.load( [
	'px.png', 'nx.png',
	'py.png', 'ny.png',
	'pz.png', 'nz.png'
] );


//Wood texture (material #2)
var diffuseMapWood = new THREE.TextureLoader().load('./texture/[4K]Wood16/Wood16_col.jpg');
var roughnessMapWood = new THREE.TextureLoader().load('./texture/[4K]Wood16/Wood16_rgh.jpg');
var specularMapWood = new THREE.TextureLoader().load('./texture/[4K]Wood16/Wood16_Specular.jpg');
var normalMapWood = new THREE.TextureLoader().load('./texture/[4K]Wood16/Wood16_nrm.jpg');

//Plastic texture (material #3)
var diffuseMapPlastic = new THREE.TextureLoader().load('./texture/_schbehmp_4K_surface_ms/schbehmp_4K_Diffuse.jpg');
var roughnessMapPlastic = new THREE.TextureLoader().load('./texture/_schbehmp_4K_surface_ms/schbehmp_4K_Roughness.jpg');
var specularMapPlastic = new THREE.TextureLoader().load('./texture/_schbehmp_4K_surface_ms/schbehmp_4K_Specular.jpg');
var normalMapPlastic = new THREE.TextureLoader().load('./texture/_schbehmp_4K_surface_ms/schbehmp_4K_Normal.jpg');

//Thing texture (material #4)
var diffuseMapThing = new THREE.TextureLoader().load('./texture/Creature_Skin_rmugyqp0_4K_surface_ms/rmugyqp_4K_Albedo.jpg');
var roughnessMapThing = new THREE.TextureLoader().load('./texture/Creature_Skin_rmugyqp0_4K_surface_ms/rmugyqp_4K_Roughness.jpg');
var specularMapThing = new THREE.TextureLoader().load('./texture/Creature_Skin_rmugyqp0_4K_surface_ms/rmugyqp_4K_Specular.jpg');
var normalMapThing = new THREE.TextureLoader().load('./texture/Creature_Skin_rmugyqp0_4K_surface_ms/rmugyqp_4K_Normal.jpg');
var aoMapThing = new THREE.TextureLoader().load('./texture/Creature_Skin_rmugyqp0_4K_surface_ms/rmugyqp_4K_AO.jpg');

var uniforms_metal_day = {
	pointLightPosition:	{ type: "v3", value: new THREE.Vector3() },
	clight:	{ type: "v3", value: new THREE.Vector3( 0.945, 0.855, 0.643 ) },
	roughnessMap: { type: "t", value: roughnessMapMetal },
	diffuseMap: { type: "t", value: diffuseMapMetal },
	specularMap: { type: "t", value: specularMapMetal },
	normalMap: { type: "t", value: normalMapMetal },
	irradianceMap: { type: "t", value: irradianceMap },
	alight: { type: "v3", value: new THREE.Vector3( 0.0, 0.0, 0.0 ) }
};

var uniforms_wood_day = {
	pointLightPosition:	{ type: "v3", value: new THREE.Vector3( 0.0, 0.0, 0.0 ) },
	clight:	{ type: "v3", value: new THREE.Vector3( 0.945, 0.855, 0.643 ) },
	roughnessMap: { type: "t", value: roughnessMapWood },
	diffuseMap: { type: "t", value: diffuseMapWood },
	specularMap: { type: "t", value: specularMapWood },
	normalMap: { type: "t", value: normalMapWood },
	irradianceMap: { type: "t", value: irradianceMap },
	alight: { type: "v3", value: new THREE.Vector3( 0.01, 0.01, 0.01 ) }
};

var uniforms_plastic_day = {
	pointLightPosition:	{ type: "v3", value: new THREE.Vector3( 0.0, 0.0, 0.0 ) },
	clight:	{ type: "v3", value: new THREE.Vector3( 0.945, 0.855, 0.643 ) },
	roughnessMap: { type: "t", value: roughnessMapPlastic },
	diffuseMap: { type: "t", value: diffuseMapPlastic },
	specularMap: { type: "t", value: specularMapPlastic },
	normalMap: { type: "t", value: normalMapPlastic },
	irradianceMap: { type: "t", value: irradianceMap },
	alight: { type: "v3", value: new THREE.Vector3( 0.02, 0.02, 0.02 ) }
};

var uniforms_thing_day = {
	pointLightPosition:	{ type: "v3", value: new THREE.Vector3( 0.98,0.98,0.98 ) },
	clight:	{ type: "v3", value: new THREE.Vector3( 0.945, 0.855, 0.643 ) },
	roughnessMap: { type: "t", value: roughnessMapThing },
	diffuseMap: { type: "t", value: diffuseMapThing },
	specularMap: { type: "t", value: specularMapThing },
	normalMap: { type: "t", value: normalMapThing },
	irradianceMap: { type: "t", value: irradianceMap },
	alight: { type: "v3", value: new THREE.Vector3( 0.02, 0.02, 0.02 ) }
};

var uniforms_metal_night = {
	pointLightPosition:	{ type: "v3", value: new THREE.Vector3() },
	clight:	{ type: "v3", value: new THREE.Vector3( 0.7,0.7,0.7 ) },
	roughnessMap: { type: "t", value: roughnessMapMetal },
	diffuseMap: { type: "t", value: diffuseMapMetal },
	specularMap: { type: "t", value: specularMapMetal },
	normalMap: { type: "t", value: normalMapMetal },
	irradianceMap: { type: "t", value: irradianceMap },
	alight: { type: "v3", value: new THREE.Vector3( 0.0, 0.0, 0.0 ) }
};

var uniforms_wood_night = {
	pointLightPosition:	{ type: "v3", value: new THREE.Vector3( 0.0, 0.0, 0.0 ) },
	clight:	{ type: "v3", value: new THREE.Vector3( 0.695,0.695,0.695 ) },
	roughnessMap: { type: "t", value: roughnessMapWood },
	diffuseMap: { type: "t", value: diffuseMapWood },
	specularMap: { type: "t", value: specularMapWood },
	normalMap: { type: "t", value: normalMapWood },
	irradianceMap: { type: "t", value: irradianceMap },
	alight: { type: "v3", value: new THREE.Vector3( 0.002, 0.002, 0.002 ) }
};

var uniforms_plastic_night = {
	pointLightPosition:	{ type: "v3", value: new THREE.Vector3( 0.0, 0.0, 0.0 ) },
	clight:	{ type: "v3", value: new THREE.Vector3( 0.695,0.695,0.695 ) },
	roughnessMap: { type: "t", value: roughnessMapPlastic },
	diffuseMap: { type: "t", value: diffuseMapPlastic },
	specularMap: { type: "t", value: specularMapPlastic },
	normalMap: { type: "t", value: normalMapPlastic },
	irradianceMap: { type: "t", value: irradianceMap },
	alight: { type: "v3", value: new THREE.Vector3( 0.002, 0.002, 0.002 ) }
};

var uniforms_thing_night = {
	pointLightPosition:	{ type: "v3", value: new THREE.Vector3( 0.0, 0.0, 0.0 ) },
	clight:	{ type: "v3", value: new THREE.Vector3( 0.695,0.695,0.695 ) },
	roughnessMap: { type: "t", value: roughnessMapThing },
	diffuseMap: { type: "t", value: diffuseMapThing },
	specularMap: { type: "t", value: specularMapThing },
	normalMap: { type: "t", value: normalMapThing },
	irradianceMap: { type: "t", value: irradianceMap },
	alight: { type: "v3", value: new THREE.Vector3( 0.005, 0.005, 0.005 ) }
};

var uniforms_metal=uniforms_metal_day;
var uniforms_wood=uniforms_wood_day;
var uniforms_plastic=uniforms_plastic_day;
var uniforms_thing=uniforms_thing_day;

var glassBody = [];
var glassLenses = [];

var mirrorNormalMap = new THREE.TextureLoader().load('./texture/glassNormal.jpg');

var uniformsMirrorDay = {
	cspec:	{ type: "v3", value: new THREE.Vector3(0.6,0.6,0.6) },
	envMap:	{ type: "t", value: textureCube},
	normalMap:	{ type: "t", value: mirrorNormalMap},
};

var uniformsGlassDay = {
	cspec:	{ type: "v3", value: new THREE.Vector3(12.0/255.0,12.0/255.0,12.0/255.0) },
	envMap:	{ type: "t", value: textureCube},
	normalMap:	{ type: "t", value: mirrorNormalMap},
}

var uniformsMirrorNight = {
	cspec:	{ type: "v3", value: new THREE.Vector3(0.6,0.6,0.6) },
	envMap:	{ type: "t", value: textureCube2},
	normalMap:	{ type: "t", value: mirrorNormalMap},
};

var uniformsGlassNight = {
	cspec:	{ type: "v3", value: new THREE.Vector3(12.0/255.0,12.0/255.0,12.0/255.0) },
	envMap:	{ type: "t", value: textureCube2},
	normalMap:	{ type: "t", value: mirrorNormalMap},
}

var uniformsGlass=uniformsGlassDay;

var uniformsMirror=uniformsMirrorDay;

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

	scene.background = textureCube;				// needs to be intechangeable

	vs = document.getElementById("vertex").textContent;
	fs = document.getElementById("fragment").textContent;
	
	vsMirror = document.getElementById("vertexMirror").textContent;
	fsMirror = document.getElementById("fragmentMirror").textContent;

	vsGlass = document.getElementById("vertexGlass").textContent;
	fsGlass = document.getElementById("fragmentGlass").textContent;

	loadObj();
	var dayLightMesh = new THREE.Mesh( new THREE.SphereGeometry(1, 16, 16), new THREE.MeshBasicMaterial ({color: 0xffff00, wireframe:true}));
	dayLightMesh.position.set( -30.0, 31.0, 5 );
	
	var moonLightMesh = new THREE.Mesh( new THREE.SphereGeometry(1, 16, 16), new THREE.MeshBasicMaterial ({color: 0xffff00, wireframe:true}));
	moonLightMesh.position.set( -12, 33.0, 35 );
	
	uniforms_metal_day.pointLightPosition.value = new THREE.Vector3(dayLightMesh.position.x,
		dayLightMesh.position.y,
		dayLightMesh.position.z);
		
	uniforms_wood_day.pointLightPosition.value = new THREE.Vector3(dayLightMesh.position.x,
		dayLightMesh.position.y,
		dayLightMesh.position.z);
		
	uniforms_plastic_day.pointLightPosition.value = new THREE.Vector3(dayLightMesh.position.x,
		dayLightMesh.position.y,
		dayLightMesh.position.z);
		
	uniforms_thing_day.pointLightPosition.value = new THREE.Vector3(dayLightMesh.position.x,
		dayLightMesh.position.y,
		dayLightMesh.position.z);
		
	uniforms_metal_night.pointLightPosition.value = new THREE.Vector3(moonLightMesh.position.x,
		moonLightMesh.position.y,
		moonLightMesh.position.z);
		
	uniforms_wood_night.pointLightPosition.value = new THREE.Vector3(moonLightMesh.position.x,
		moonLightMesh.position.y,
		moonLightMesh.position.z);
		
	uniforms_plastic_night.pointLightPosition.value = new THREE.Vector3(moonLightMesh.position.x,
		moonLightMesh.position.y,
		moonLightMesh.position.z);
		
	uniforms_thing_night.pointLightPosition.value = new THREE.Vector3(moonLightMesh.position.x,
		moonLightMesh.position.y,
		moonLightMesh.position.z);

	//scene.add(dayLightMesh);
	
	//scene.add(moonLightMesh);

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
						var glassMaterial = new THREE.ShaderMaterial({ uniforms: uniformsMirror, vertexShader: vsMirror, fragmentShader: fsMirror });
						glassMaterial.vertexTangents = true;
						glassMaterial.needsUpdate = true;
						//console.log(glassMaterial);
						mesh = new THREE.Mesh( geometry, glassMaterial );
						glasses.add(mesh);
						glassLenses.push(mesh);
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
	}else if(n==3){
		uniform = uniforms_plastic;
	}else{
		uniform=uniforms_thing;
	}
	for( i=0; i<glassBody.length; i++){
		glassBody[i].material=new THREE.ShaderMaterial({ uniforms: uniform, vertexShader: vs, fragmentShader: fs });
		glassBody[i].geometry.vertexTangents = true;
		glassBody[i].geometry.needsUpdate = true;
	}
}

function switchLenses(reflective){
	var uniform;
	var vsLenses;
	var fsLenses;
	if(reflective){
		uniform=uniformsMirror;
		vsLenses=vsMirror;
		fsLenses=fsMirror;
	}else{
		uniform=uniformsGlass;
		vsLenses=vsGlass;
		fsLenses=fsGlass;
	}
	for( i=0; i<glassLenses.length; i++){
		glassLenses[i].material=new THREE.ShaderMaterial({ uniforms: uniform, vertexShader: vsLenses, fragmentShader: fsLenses });
		glassLenses[i].geometry.vertexTangents = true;
		glassLenses[i].geometry.needsUpdate = true;
	}
}

function switchBackground(n){
	if(n==0){
		scene.background=textureCube;
		uniformsGlass=uniformsGlassDay;
		uniformsMirror=uniformsMirrorDay;
		uniforms_metal=uniforms_metal_day;
		uniforms_wood=uniforms_wood_day;
		uniforms_plastic=uniforms_plastic_day;
		uniforms_thing=uniforms_thing_day;
	}else{
		scene.background=textureCube2;
		uniformsGlass=uniformsGlassNight;
		uniformsMirror=uniformsMirrorNight;
		uniforms_metal=uniforms_metal_night;
		uniforms_wood=uniforms_wood_night;
		uniforms_plastic=uniforms_plastic_night;
		uniforms_thing=uniforms_thing_night;
	}
}