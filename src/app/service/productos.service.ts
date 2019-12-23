import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  url='http://demo.sistemasunilever.com/notasDevoluciones/servicioWeb/materiales';
  constructor(private httpClient:HttpClient) { }
  obtieneproductos(){
    return this.httpClient.get(this.url);
  }

}
