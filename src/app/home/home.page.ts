import { Component,ViewChild } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner/ngx";
import { IonSearchbar, AlertController, ModalController } from '@ionic/angular';
import { ProductosService } from '../service/productos.service';
import { DetallePage } from './detalle/detalle.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // @ViewChild("buscador",{static: true}) private buscador:IonSearchbar;
  opciones:BarcodeScannerOptions;
  mat:any;
  aux:any;
  public buscar:string="";
  constructor(private barcode:BarcodeScanner,private consultas:ProductosService,private alertCtrl:AlertController,private modalCtrl:ModalController) {}
  ngOnInit(){
    this.scanear();
    this.listaprods();
   
  }
  onViewEnter(){
    
  }
  scanear(){
    console.log("entra");
    this.barcode.scan().then(dato=>{
      alert(JSON.stringify(dato));
    }).catch(error=>{
      alert(error);
    });
  }
  listaprods(){
    this.consultas.obtieneproductos().subscribe((datos:any)=>{
      // this.mat=datos.materiales;
      var sortByProperty = function (property) {
        return function (x, y) {
            return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
        };
      };
      for(let reg of datos.materiales){
        reg.descripcion=reg.descripcion.trim();
      }
      this.mat=datos.materiales.sort(sortByProperty('ean13'));
      this.aux=this.mat;
      console.log("mat: ",this.mat);
    });
  }
  buscaprod(){
    console.log("desde searchbar: ",this.buscar);
    this.mat=this.filtrador(this.buscar);
    this.mostrardetalle(this.mat);
    console.log("filtrado: ",this.mat);
  }
  filtrador(semilla){
    return this.aux.filter(item=>{
      if(item.ean13!=null)
        return item.ean13.toLowerCase().indexOf(semilla.toLowerCase())==0;
    });
  }
  async mostrardetalle(item){
   const modal=await this.modalCtrl.create({
     component:DetallePage,
     componentProps:{
       item:item
     }
   });
   await modal.present();
  }
}
