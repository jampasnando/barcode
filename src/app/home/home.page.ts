import { Component,ViewChild } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner/ngx";
import { IonSearchbar, AlertController, ModalController } from '@ionic/angular';
import { ProductosService } from '../service/productos.service';
import { DetallePage } from './detalle/detalle.page';
import { File } from '@ionic-native/file/ngx';
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
  lista:any;
  lista2:any;
  listax:any;
  detalle:string;
  public buscar:string="";
  constructor(private barcode:BarcodeScanner,private consultas:ProductosService,private alertCtrl:AlertController,private modalCtrl:ModalController,private file:File) {}
  ngOnInit(){
    
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

  buscaprod(texto){
    console.log("desde camara: ",texto);
    this.listax=this.filtrador(texto);
    if(this.listax.length==0){
      alert("No encontrado");
    }
    
  }
  filtrador(semilla){
    return this.lista2.filter(item=>{
      if(item.ean13!=null)
        return item.ean13.toLowerCase().indexOf(semilla.toLowerCase())==0;
    });
  }
 
}
