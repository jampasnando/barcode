import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductosService } from '../service/productos.service';
import { AlertController,IonSearchbar } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { File, FileReader } from '@ionic-native/file/ngx';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  @ViewChild("buscador",{static: true}) private buscador:IonSearchbar;
  // idreunion:string;
  lista:any;
  lista2:any;
  tiempo:Date;
  // marca:string;
  // nrotiq:string;
  // nroxaenviar=0;
  public searchTerm: string = "";
  public items: any;
  // listamarcas:Listamarcas[]=[];
  pordesc="primary";
  porsap="medium";
  porean="medium";
  pordun="medium";
  activo="descripcion";
  // tiqueador=GLOBAL.usuarionombre;
  constructor(private consultas: ProductosService, private alertCtrl:AlertController, private activatedRoute:ActivatedRoute,private router:Router,private file:File) {
    
   }

  ngOnInit() {
    // this.file.writeFile(this.file.dataDirectory, 'lista.txt', 'hello world', {replace: true}).then((entry:any) => {console.log('creado')}).catch(err => console.log('no creado'));


    this.listaprods();
    
  }
  generafile(lista){
    this.file.writeFile(this.file.dataDirectory, 'lista.txt', lista, {replace: true}).then(_ => console.log('creado')).catch(err => console.log('no creado'));
  }
  leefile(){
    this.file.readAsText(this.file.dataDirectory, 'lista.txt').then(datos=>{
      // console.log("tamano: ",datos.length);
      console.log("leido: ",datos);
      this.lista=JSON.parse(datos);
      this.lista2=this.lista;
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
      
    },
    (err)=>{
      alert("trabajará sin conexión");
      this.leefile();
    }
    );
  }
  onViewCanLeave(){
    console.log("onviecanleave");
  }
  // vecheck(item,unemp){
  //   console.log(item.srcElement);
  //   console.log("tiempo: ",unemp.marcador);
  //   if(unemp.marcador==""){
  //     this.tiempo=new Date();
  //     let horas=this.tiempo.getHours()<10?"0"+this.tiempo.getHours().toString():this.tiempo.getHours().toString();
  //     let mins=this.tiempo.getMinutes()<10?"0"+this.tiempo.getMinutes().toString():this.tiempo.getMinutes().toString();
  //     unemp.marcador=horas.concat(":").concat(mins);
  //     // this.searchTerm="";
  //     // this.buscador.setFocus();
  //     this.nroxaenviar++;
      
  //   }
  //   else{
  //     this.confirmaBorrar(unemp);
      
  //   }
  // }
  public clickbuscador(evento):void{
    evento.srcElement.select();
  }
  async confirmaBorrar(aux){
    const alerta=await this.alertCtrl.create({
      header:"Está seguro de Borrar la asistencia de:",
      subHeader:aux.nombre.concat("???"),
      message:"Aprete Cancelar si no está seguro",
      buttons:[
        {
          text:"Cancelar",
          role:"cancel",
          cssClass:"primary",
          
        },
        {
          text:"Borrar",
          cssClass:"peligro",
          handler:(blah)=>{
            aux.marcador="";
            this.buscador.setFocus();
            // this.nroxaenviar--;
          }
        }
      ]
    });
    alerta.present();
  }
  setFilteredItems() {
    
    this.lista = this.filterItems(this.searchTerm);
  }
  filterItems(searchTerm) {
    // console.log("activo: ",this.activo," buscar: ",searchTerm);
    if(searchTerm!=""){
      return this.lista2.filter(item => {
       if(this.activo=="descripcion" && item.descripcion!=null){
        return item.descripcion.toLowerCase().indexOf(searchTerm.toLowerCase()) >=0;
       }
       if(this.activo=="codigoSap" && item.codigoSap!=null){
        return item.codigoSap.toLowerCase().indexOf(searchTerm.toLowerCase()) ==0;
       }
       if(this.activo=="ean13" && item.ean13!=null){
        return item.ean13.toLowerCase().indexOf(searchTerm.toLowerCase()) ==0;
       }
       if(this.activo=="dun14" && item.dun14!=null){
        return item.dun14.toLowerCase().indexOf(searchTerm.toLowerCase()) ==0;
       }
      });
    }
    else {
      return this.lista2;
    }
  }
  // async guardatiqueos(){
  //   const alertax=await this.alertCtrl.create({
  //     header:"Enviando...",
  //   });
  //   alertax.present();
    
  //   for(let yy of this.lista){
  //     if(yy.marcador!=""){
  //       for(let zz in yy.hora_registro){
  //         var indice="t".concat(this.nrotiq);
  //         if(zz==indice){
  //           yy.hora_registro[zz]=yy.marcador;
  //           this.listamarcas.push({ci:yy.ci,nuevamarca:yy.hora_registro,indicex:this.lista.indexOf(yy)});
  //         }
  //         // console.log(yy.marcador, " ciclo for zz: ", yy.hora_registro);
  //       }
        
  //     }
  //   }
  //   this.consultas.envialistamarcas(this.listamarcas,this.idreunion,this.tiqueador,this.nrotiq).subscribe((data:any)=>{
  //     this.consultaConvocados();
  //     this.nroxaenviar=0;
  //     this.alertCtrl.dismiss();
  //   });
  // }
  criterio(campo){
    // console.log("campo: ",campo);
    if(campo=="descripcion"){
      this.pordesc="primary";
      this.porsap="medium";
      this.porean="medium";
      this.pordun="medium";
      this.activo="descripcion";
    }
    if(campo=="codigoSap"){
      this.pordesc="medium";
      this.porsap="primary";
      this.porean="medium";
      this.pordun="medium";
      this.activo="codigoSap";
    }
    if(campo=="ean13"){
      this.pordesc="medium";
      this.porsap="medium";
      this.porean="primary";
      this.pordun="medium";
      this.activo="ean13";
    }
    if(campo=="dun14"){
      this.pordesc="medium";
      this.porsap="medium";
      this.porean="medium";
      this.pordun="primary";
      this.activo="dun14";
    }
    this.searchTerm="";
    this.buscador.setFocus();

  }
}
interface Listamarcas{
  ci:string;
  nuevamarca:string;
  indicex:number;
}