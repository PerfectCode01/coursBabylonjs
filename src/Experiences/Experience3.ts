import { 
    Engine, 
    Scene,
    ArcRotateCamera,
    Vector3,
    SceneLoader,
    HemisphericLight,
    StandardMaterial,
    Texture
} from "@babylonjs/core";
import "@babylonjs/loaders";

export class Experience3 {
    engine : Engine;
    scene : Scene;

    constructor (private canvas:HTMLCanvasElement){
        this.engine = new Engine(this.canvas);
        this.scene = this.createScene();
        this.createSalon();
        
        this.engine.runRenderLoop(()=>{
            this.scene.render();
        })

    }
    createScene():Scene{
        const scene = new Scene(this.engine);

        // creation de la camera
        const camera = new ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 10, Vector3.Zero(), scene);
        camera.attachControl(this.canvas, true);
        camera.position.z = -7

        // la lumiere
        const light = new HemisphericLight('light', new Vector3(1,0,0), this.scene);
        light.intensity = 0.5;

        
        
        return scene;
    }
    async createSalon():Promise<void>{
        const models = await SceneLoader.ImportMeshAsync(
            "",
            "./models/",
            "salon.glb"
        )
        const cube = models.meshes[18];
        
        // cube.material = this.createMurMaterial()
    }

    createMurMaterial ():StandardMaterial{
        const murMaterial = new StandardMaterial(
            "solMaterial",
            this.scene
        );

        const murTexture = new Texture(
            "./textures/cube/brick_diff.jpg"
        ) ;
        murTexture.uScale = 4;
        murTexture.vScale = 4;

        murMaterial.diffuseTexture = murTexture

        return murMaterial;
    }
}