import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ImageCroppedEvent, ImageCropperModule, ImageCropperComponent } from 'ngx-image-cropper';
import { Observable } from 'rxjs';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-sync',
  templateUrl: './sync.page.html',
  styleUrls: ['./sync.page.scss'],
})
export class SyncPage implements AfterViewInit {
  myImage=null;
  croppedImage=null;
  xx1=0;
  yy1=0;
  xx2=0;
  yy2=0;
  anchoOriginal=0;
  altoOriginal=0;
  areaOriginal=0;
  metrosancho=0;
  metrosalto=0;
  metrosarea=0;
  areafoto=0;
  bandera=0;
  razonx=0;
  razony=0;
  public porcx:string;
  porc:any;
  acumulador=0;
  acumuladorm=0;
  total="Tot: 0%";
  totmetros="area: 0m";
  @ViewChild(ImageCropperComponent,{static:false}) angularCropper:ImageCropperComponent;
  @ViewChild('imageCanvas',{static:false}) canvas:ElementRef;
  ctx:CanvasRenderingContext2D;
  canvasElement:any;
  
    constructor(private camera:Camera,private plt:Platform ) {}
    ngAfterViewInit(){
      this.canvasElement=this.canvas.nativeElement;
      // this.canvasElement.height=300;
      this.canvasElement.width=this.plt.width();
      // this.accion();
    }
    calculaarea(){
      this.metrosarea=this.metrosalto*this.metrosancho;
    }
    captureImage(){
      this.convertFileToDataURLviaFileReader('assets/foto2.jpg').subscribe(base64=>{
        this.myImage=base64;
        this.metrosancho=0;
        this.metrosalto=0;
        this.metrosarea=0;
        this.areafoto=0;
        this.bandera=0;
        this.acumulador=0;
        this.acumuladorm=0;
        this.total="Tot: 0%";
        this.totmetros="area: 0m";
        // console.log("mi imagen: ",this.myImage);
      });
      // const options:CameraOptions={
      //   quality:100,
      //   destinationType:this.camera.DestinationType.DATA_URL,
      //   encodingType:this.camera.EncodingType.JPEG,
      //   mediaType:this.camera.MediaType.PICTURE,
      //   sourceType:this.camera.PictureSourceType.CAMERA
      // }
      // this.camera.getPicture(options).then((imagen)=>{
      //   this.myImage='data:image/jpeg;base64,' + imagen;
      // });
    }
    convertFileToDataURLviaFileReader(url:string){
      console.log("url: ",url);
      return Observable.create(observer=>{
        console.log("observer: ",observer);
        let xhr:XMLHttpRequest=new XMLHttpRequest();
        xhr.onload=function(){
          console.log("dentro xhr.onlad");
          let reader:FileReader=new FileReader();
          reader.onloadend=function(){
            console.log("dentro reade.onloadend");
            observer.next(reader.result);
            observer.complete();
          };
          reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET',url);
        xhr.responseType='blob';
        xhr.send();
      });
    }
  
    clear(){
      this.angularCropper.imageBase64=null;
      this.myImage=null;
      this.croppedImage=null;
    }
    save(){
      this.angularCropper.crop();
    }
    imageCropped(event:ImageCroppedEvent){
      this.croppedImage=event.base64;
      this.xx1=this.angularCropper.cropper.x1;
      this.yy1=this.angularCropper.cropper.y1;
      this.xx2=this.angularCropper.cropper.x2;
      this.yy2=this.angularCropper.cropper.y2;
      console.log("(x1,y1): ",this.xx1,",",this.yy1);
      console.log("(x2,y2): ",this.xx2,",",this.yy2);
      this.bandera++;
      console.log("bandera: ",this.bandera);
      if(this.bandera==1){
        // alert(this.bandera);
        this.accion();
        this.metrosancho=2.5;
        this.metrosalto=2;
        this.metrosarea=this.metrosalto*this.metrosancho;
        
      }
      this.calcula();
  
    }
    rotateLeft(){
      this.angularCropper.rotateLeft();
    }
    rotateRight(){
      this.angularCropper.rotateRight();
    }
    flipHorizontal(){
      this.angularCropper.flipHorizontal();
    }
    flipVertical(){
      this.angularCropper.flipVertical();
    }
    move(x,y){
      this.angularCropper.cropper.x1 +=x;
      this.angularCropper.cropper.x2 +=x;
      this.angularCropper.cropper.y1 +=y;
      this.angularCropper.cropper.y2 +=y;
  
    }
    moved(ev){
      console.log("mover: ",ev);
    }
    accion(){
      this.canvasElement.height=this.yy2;
      let background=new Image();
      background.src='assets/foto2.jpg';
      
      this.ctx=this.canvasElement.getContext('2d');
      
      background.onload=()=>{
        this.anchoOriginal=background.naturalWidth;
        this.altoOriginal=background.naturalHeight;
        this.areaOriginal=this.anchoOriginal*this.altoOriginal;
        this.areafoto=this.xx2*this.yy2;
        console.log("dimensiones reales: ",this.anchoOriginal,this.altoOriginal,this.areaOriginal);
        this.ctx.drawImage(background,0,0,this.xx2,this.yy2);
        this.razonx=this.anchoOriginal/this.xx2;
        this.razony=this.altoOriginal/this.yy2;
        console.log("razones: ",this.razonx,this.razony);
      };
  
    }
    ponerect(){
      console.log("rectangulo: ",this.xx1,this.yy1,this.xx2,this.yy2);
      let ancho=this.xx2-this.xx1;
      let alto=this.yy2-this.yy1;
      // let arearectangulo=ancho*alto;
      // let porcentaje=arearectangulo*100/this.areafoto;
      // console.log("porcentaje rect: ",porcentaje," %");
      // this.porc=porcentaje + "%";
      this.ctx.rect(this.xx1,this.yy1,ancho,alto);
      this.ctx.lineWidth=3;
      this.ctx.strokeStyle='blue';
      this.ctx.stroke();
      this.ctx.font = 'bold 15px serif';
      this.ctx.fillStyle="white";
      this.ctx.fillText(Math.round(this.porc*100)/100 +"%",this.xx1+2,this.yy1+15,200);
      console.log("dentrorectangulo: ",Math.round(this.porc*100)/100+"%");
      this.acumulador=this.acumulador+(Math.round(this.porc*100)/100);
      this.total="%Tot: "+this.acumulador+"%"
      this.acumuladorm=this.acumuladorm+(Math.round(this.porc*100)/100)*this.metrosarea/100;
      this.totmetros="area: "+this.acumuladorm +"m.";
    }
    calcula(){
      let ancho=this.xx2-this.xx1;
      let alto=this.yy2-this.yy1;
      let arearectangulo=ancho*alto;
      let porcentaje=arearectangulo*100/this.areafoto;
      console.log("porcentaje rect: ",porcentaje," %");
      this.porc=porcentaje;
      this.porcx=(Math.round(this.porc*100)/100) + "%";
      
    }
  }