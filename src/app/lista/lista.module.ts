import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPageRoutingModule } from './lista-routing.module';

import { ListaPage } from './lista.page';
import { HttpClientModule } from '@angular/common/http';
import { ProductosService } from '../service/productos.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ListaPageRoutingModule
  ],
  declarations: [ListaPage],
  providers:[ProductosService]
})
export class ListaPageModule {}
