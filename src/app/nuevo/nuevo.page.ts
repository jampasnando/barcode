import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.page.html',
  styleUrls: ['./nuevo.page.scss'],
})
export class NuevoPage implements OnInit {
  formulario:FormGroup;
  constructor(private formBuilder:FormBuilder,private router:Router) {
    this.formulario=this.formBuilder.group({
      nombre:new FormControl(null,Validators.compose([
        Validators.required
      ])),
      lugar:new FormControl(null,Validators.compose([
        Validators.required
      ])),
      descripcion:new FormControl(null,Validators.compose([
        Validators.required
      ])),
      ean13:new FormControl(null,Validators.compose([
        Validators.required
      ])),
      dun14:new FormControl(null,Validators.compose([
        Validators.required
      ])),
      // fecha:new FormControl(null,Validators.compose([
      //   Validators.required
      // ])),
      // horainicio:new FormControl(null,Validators.compose([
      //   Validators.required
      // ])),
      // duracion: new FormControl('indefinida',Validators.compose([
      //   Validators.required
      // ])),
      // tiqueos:new FormControl('1',Validators.compose([
      //   Validators.required
      // ])),
      // instrucciones:new FormControl(''),
      // docs: new FormControl(''),
      estado: new FormControl('Por realizarse', Validators.compose([
        Validators.required
      ]))
    });
   }

  ngOnInit() {
  }
  enviaForm(){
    alert("Enviando registro");
    this.formulario.reset();
    // this.router.navigateByUrl("/inicio");
  }
}
