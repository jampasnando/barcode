import { Component, OnInit,Input } from '@angular/core';
import { GLOBAL } from '../service/global';
import { Router } from '@angular/router';
import { Camera, CameraOptions, DestinationType, EncodingType, MediaType } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ToastController, AlertController } from '@ionic/angular';
const STORAGE_KEY="misimagenes";
@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {

  constructor(private router:Router,private camera:Camera, private file:File,public storage:Storage,private webview:WebView,private alerta:AlertController) { }
  aux:any=GLOBAL;
  archivo:any;
  arr:[];
  linkimg:string;
  @Input() useURI = true;
  camopt:CameraOptions={
    quality:20,
    destinationType:this.useURI ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,
    encodingType:EncodingType.JPEG,
    mediaType:MediaType.PICTURE

  }
  ngOnInit() {
    
  }
  onViewEnter(){
    this.aux=GLOBAL;
  }
  async subir(){
    const miaviso=await this.alerta.create({
      header:"SE SUBIRÁ AL SERVER",
      message:"está seguro?",
      cssClass:"miclase",
      buttons:[
        {
          text:"Aceptar",

        },
        {
          text:"Cancelar",
          role:"cancel",
        }
      ]
      
    });
    miaviso.present();
    // if(confirm("Se subirá el registro de inventario actual")){
    //   alert("Subida exitosa");
    //   GLOBAL.length=0;
    //   this.aux.length=0;
    //   this.router.navigateByUrl("/inicio");

    // }
  }
  foto(item){
    console.log(item);
    this.camera.getPicture(this.camopt).then((imagen)=>{
      var nombreactual=imagen.substr(imagen.lastIndexOf('/')+1);
      var dirfoto=imagen.substr(0,imagen.lastIndexOf('/')+1);
      var d=new Date();
      var n=d.getTime();
      var nombrearch=n+".jpg";
      console.log("imagen: ",imagen);
      console.log("dirfoto: ",dirfoto," nombreactual: ",nombreactual," dataDirectory: ",this.file.dataDirectory," nombrearch: ",nombrearch);
      this.file.copyFile(dirfoto,nombreactual,this.file.dataDirectory,nombrearch).then(_ =>{
        alert("foto copiada");
        this.storage.get(STORAGE_KEY).then(images=>{
          let arr=JSON.parse(images);
          console.log("de la memoria: ",arr);
          if(!arr){
            let nuevaimg=[nombrearch];
            this.storage.set(STORAGE_KEY,JSON.stringify(nuevaimg));
          }
          else{
            arr.push(nombrearch);
            this.storage.set(STORAGE_KEY,JSON.stringify(arr));
          }
        });
        let dirlocalfoto=this.file.dataDirectory+nombrearch;
        let dirfotonormalizado=this.webview.convertFileSrc(dirlocalfoto);
        alert(dirfotonormalizado);
        this.linkimg=(window as any).Ionic.WebView.convertFileSrc(imagen);
        console.log("dirlocalfoto: ",dirlocalfoto," dirfotonormalizado: ",dirfotonormalizado);
      },
      error=>{
        alert("error copiando foto");
      }
      );
        // this.archivo = (window as any).Ionic.WebView.convertFileSrc(imagen);
      
    },
    (error)=>{
      alert("error camara");
    }
    );
  }
  
  
}
