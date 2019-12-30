import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../service/global';
import { Router } from '@angular/router';
import { Camera, CameraOptions, DestinationType, EncodingType, MediaType } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {

  constructor(private router:Router,camera:Camera) { }
  aux:any=GLOBAL;
  camopt:CameraOptions={
    quality:20,
    destinationType:DestinationType.DATA_URL,
    encodingType:EncodingType.JPEG,
    mediaType:MediaType.PICTURE

  }
  ngOnInit() {
    
  }
  onViewEnter(){
    this.aux=GLOBAL;
  }
  subir(){
    if(confirm("Se subirá el registro de inventario actual")){
      alert("Subida exitosa");
      GLOBAL.length=0;
      this.aux.length=0;
      this.router.navigateByUrl("/inicio");

    }
  }
  foto(item){
    console.log(item);
  }
}
