import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  formulario:FormGroup;
  id:string;
  codigosap:string;
  descripcion:string;
  ean13:string;
  dun14:string;
  unidades:string;
  fechacreacion:string;
  item:any;
  constructor(private navParams:NavParams) { }

  ngOnInit() {
    this.item=this.navParams.get("item");
    
    console.log("item: ",this.item);
  }

}
