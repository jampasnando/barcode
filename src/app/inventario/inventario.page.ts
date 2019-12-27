import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../service/global';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {

  constructor(private router:Router) { }
  aux:any=GLOBAL;
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

}
