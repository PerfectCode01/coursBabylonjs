import { Engine, 
         FreeCamera, 
         HemisphericLight, 
         MeshBuilder, 
         Scene,
         UniversalCamera,
         ArcRotateCamera,
         Vector3,
         StandardMaterial,
         Texture,
         SceneLoader
        } from "@babylonjs/core";
        import "@babylonjs/loaders";

export class Experience2{
    engine : Engine;
    scene : Scene

    constructor (private canvas:HTMLCanvasElement){
        this.engine = new Engine(this.canvas);
        this.scene = this.CreateScene();
        this.createChair();
        this.createTable();

        this.engine.runRenderLoop(()=>{
            this.scene.render();
        })

    }

    CreateScene():Scene{
        const scene = new Scene(this.engine);
        // creattion de la camera 
        // const camera = new FreeCamera("camera", new Vector3(0,1,0), this.scene)
        const camera = new ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 10, Vector3.Zero(), scene);
        camera.attachControl(this.canvas, true);
        camera.position.z = -7


        // creation de la lumiere
        const light = new HemisphericLight("light", new Vector3(1,1,0), this.scene);
        light.intensity = 1 ;


        // creation du ground 
        this.createGround()

        this.createBox()


        return scene;
    }
    createGround(){
        const ground = MeshBuilder.CreateGround(
            "ground",
            {
                width : 5,
                height : 5
            },
            this.scene
        );
        ground.material = this.CreateGroundMateriel();

    }
    CreateGroundMateriel():StandardMaterial{
        const groundMat = new StandardMaterial("groundMat", this.scene);
        const uvscale = 4;
        const texArray: Texture[] = [];

        // diffuse
        const diffuseTex = new Texture("./textures/sol/pavement_diff.jpg", this.scene);
        groundMat.diffuseTexture = diffuseTex;
        texArray.push(diffuseTex);


        // normal
        const normalTex = new Texture("./textures/sol/pavement_nor.jpg", this.scene);
        groundMat.bumpTexture = normalTex;
        texArray.push(normalTex)


        // ao
        const aoTex = new Texture("./textures/sol/pavement_ao.jpg");
        groundMat.ambientTexture = aoTex;
        texArray.push(aoTex);





        return groundMat;
    }
    createBox(){
        const box = MeshBuilder.CreateBox("box",{
            size : 0.7
        })

        box.material = this.createBoxMaterial();
        box.position.y = 0.35
        box.position.x  = 2.09
        box.position.z = 0.4
    }
    createBoxMaterial():StandardMaterial{
        const boxMaterial = new StandardMaterial("box",this.scene)
        const diffuseTex = new Texture("./textures/cube/brick_diff.jpg")
        boxMaterial.diffuseTexture = diffuseTex;
        return boxMaterial;
    }

    async createChair():Promise<void>{
         const models = await SceneLoader.ImportMeshAsync(
            "",
            "./models/",
            "kiti.glb",
            this.scene
        )
        const chair = models.meshes[0];
        
        chair.scaling = new Vector3(2,2,2)
        chair.position.z = 1.4
        
        console.log(models)
    }
    async createTable ():Promise<void>{
        const models = await SceneLoader.ImportMeshAsync(
            "",
            "./models/",
            "mesa.glb"
        ) 
    }
}