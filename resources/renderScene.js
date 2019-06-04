var scene, renderer, camera, stats;

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

	var uniforms = {
		cdiff:	{ type: "v3", value: new THREE.Vector3( 0.7, 0.0, 0.0 ) },
		pointLightPosition:	{ type: "v3", value: new THREE.Vector3() },
		clight:	{ type: "v3", value: new THREE.Vector3( 1.0, 1.0, 1.0 ) },
		cspec:	{ type: "v3", value: new THREE.Vector3( 0.04, 0.04, 0.3 ) },
		roughness:	{ type: "f", value: 0.5 },
	};

	// instantiate a loader
	var loader = new THREE.OBJLoader();
	loader.load(
		"../models/glasses/Glasses_v2.2.obj", 
		function( object ) {
						
		//console.log(object);  // debug

		glasses = object;
		glasses.traverse( function (child) {
			if( child instanceof THREE.Mesh ) {
				child.geometry.computeVertexNormals();
				// apply this material to all the meshes in the OBJ
					child.material = new THREE.ShaderMaterial({uniforms: uniforms, vertexShader: vs, fragmentShader: fs});
				};
			});
			glasses.position.set(0, 1, 10);
			glasses.scale.multiplyScalar(10);			// They're very little(?)
			scene.rotation.y-=45*Math.PI/180;
			scene.add(glasses);
			renderer.render( scene, camera );
		}
	);

	var lightMesh = new THREE.Mesh( new THREE.SphereGeometry(1, 16, 16), new THREE.MeshBasicMaterial ({color: 0xffff00, wireframe:true}));
	lightMesh.position.set( -30.0, 30.0, 25.0 );
	uniforms.pointLightPosition.value = new THREE.Vector3(lightMesh.position.x,
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