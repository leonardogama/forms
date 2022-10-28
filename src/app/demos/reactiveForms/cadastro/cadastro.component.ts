import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from './models/usuario';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-cadastro',
  //template: '<input type="text" [cpf]>',
  templateUrl: './cadastro.component.html'

  
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup;
  usuario: Usuario;
  formResult: string = '';
  //public MASKS = MASKS;
  MASKS = utilsBr.MASKS;

  //injetando form builder
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    //validando senha e senhaConfirmacao
    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15])]);
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15]), CustomValidators.equalTo(senha)]);
    

    //melhorando a criação do formGroup
    /*this.cadastroForm = new FormGroup({
      nome: new FormControl(''),
      cpf: new FormControl(''),
      email: new FormControl(''),
      senha: new FormControl(''),
      senhaConfirmacao: new FormControl('')

    }); */

    this.cadastroForm = this.fb.group({ 

      nome: ['' ,Validators.required, Validators.minLength(2), Validators.maxLength(150)],
      cpf: ['', [Validators.required,NgBrazilValidators.cpf]],
      email: ['', [Validators.required,Validators.email]],
      senha: senha,
      senhaConfirmacao: senhaConfirm
    });  

  }

  adicionarUsuario(){
    //validar antes de processar
    if(this.cadastroForm.dirty && this.cadastroForm.valid){
        //let x = this.cadastroForm.value;//
        //mapeamento objeto 
        this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
        this.formResult = JSON.stringify(this.cadastroForm.value);
    }
    else{
      this.formResult = "Não foi enviado! Preencha os campos obrigatorios"
    }
    
  }

}
