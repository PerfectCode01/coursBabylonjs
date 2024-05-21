import { Engine, 
         FreeCamera, 
         HemisphericLight, 
         MeshBuilder, 
         Scene, 
         SceneLoader, 
         UniversalCamera,
         GamepadManager, 
         Vector3
        } from "@babylonjs/core";
import "@babylonjs/loaders";

export class Experience1 {
    engine : Engine;    
    scene : Scene;
    constructor(private canvas:HTMLCanvasElement){
        this.engine = new Engine(this.canvas, true);
        this.scene = this.createScene();

        // importer un laboratoire
        this.ImportLaboratory();

        this.engine.runRenderLoop(()=>{
            this.scene.render();
        })
    }


    createScene():Scene{
        const scene = new Scene(this.engine);
        // creation de la camera 
        const camera = new UniversalCamera("Camera", new Vector3(0,1,-5), this.scene);
        camera.attachControl(this.canvas, true);
        // camera.setTarget(Vector3.Zero());

        // creation de la lumiere
        const light = new HemisphericLight('light', new Vector3(0,1,0), this.scene);
        light.intensity = 0.5;

        // creation d'une surface
        // const ground = MeshBuilder.CreateGround(
        //     'ground', {
        //         width: 10,
        //         height:10
        //     },this.scene
        // )

        // creation d'une ball

        // const ball = MeshBuilder.CreateSphere(
        //     'ball',{
        //         diameter : 1
        //     },this.scene
        // )

        // ball.position = new Vector3(0,1,0)


        
        return scene
    }
    async ImportLaboratory():Promise<void>{
        const models = await SceneLoader.ImportMeshAsync(
            "",
            "/models/",
            "laboratoire.glb"
        )
    }
    // manage(){
        
    // }
}