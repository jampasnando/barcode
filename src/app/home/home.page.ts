import { Component,ViewChild } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner/ngx";
import { IonSearchbar, AlertController, ModalController } from '@ionic/angular';
import { ProductosService } from '../service/productos.service';
import { DetallePage } from './detalle/detalle.page';
import { File } from '@ionic-native/file/ngx';
import { GLOBAL } from '../service/global';
import { Router } from '@angular/router';
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
  lista:any=[];
  lista2:any;
  listax:any=[];
  detalle:string;
  public buscar:string="";
  constructor(private barcode:BarcodeScanner,private consultas:ProductosService,private alertCtrl:AlertController,private modalCtrl:ModalController,private file:File,private router:Router) {}
  ngOnInit(){
    
    
   
  }
ionViewDidEnter(){
  this.listaprods();
}
  scanear(){
    console.log("entra");
    this.barcode.scan().then(dato=>{
      // alert(JSON.stringify(dato));
      this.buscaprod(dato.text);
    }).catch(error=>{
      alert(error);
    });
  }

generafile(lista){
  this.file.writeFile(this.file.dataDirectory, 'lista.txt', lista, {replace: true}).then(_ => console.log('creado')).catch(err => console.log('no creado'));
}
leefile(){
  this.file.readAsText(this.file.dataDirectory, 'lista.txt').then(datos=>{
    this.lista=JSON.parse(datos);
    this.lista2=this.lista;
    console.log("lista de arch: ",this.lista);
  }).catch(error=>{
    console.log("error en leer");
  });
}

listaprods(){
 if(!(this.lista.length>0)){
  this.consultas.obtieneproductos().subscribe((datax:any)=>{
    for(let uno of datax.materiales){
      uno.descripcion=uno.descripcion.trim();
    }
    var data=datax.materiales;
    console.log("datoslista : ",data);
    var sortByProperty = function (property) {
      return function (x, y) {
          return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
      };
    };
    
    this.lista=data.sort(sortByProperty('descripcion'));
    this.lista2=this.lista;
    this.generafile(this.lista);
    this.scanear();
    
  },
  (err)=>{
    this.leefile();
    alert("trabajará sin conexión");
    this.scanear();
    
  }
  );
 }
}

  buscaprod(texto){
    console.log("desde camara: ",texto);
    this.listax=this.filtrador(texto);
    if(this.listax.length==0){
      alert("No encontrado");
      this.scanear();
    }
    else{
      this.vecheck(this.listax[0]);
    }
    
  }
  filtrador(semilla){
    return this.lista2.filter(item=>{
      if(item.ean13!=null)
        return item.ean13.toLowerCase().indexOf(semilla.toLowerCase())==0;
    });
  }
  vecheck(unitem){
    var bandera="noexiste";
    var obj;
    for(let aux of GLOBAL){
      if(aux.ean13==unitem.ean13){
        bandera="siexiste";
        obj=aux;
      }
    }
    if(bandera=="siexiste"){
      obj.cant++;
    }
    else{
      const nuevo={id: unitem.id, codigoSap: unitem.codigoSap, descripcion: unitem.descripcion, ean13: unitem.ean13, dun14: unitem.dun14,cant:1};
      GLOBAL.push(nuevo);
    }
    this.router.navigateByUrl("/inventario");
  }
}
