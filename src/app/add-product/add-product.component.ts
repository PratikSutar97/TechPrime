import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ProductsService} from '../products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  
  isError=false;
  error=[];
  toggle: boolean = true;

  constructor(
    private __router:Router,
    public fobj:FormBuilder,
    private productDetails:ProductsService
  ) { }

  ngOnInit(): void {
  }
  userform = this.fobj.group(
    {
      name:['',[Validators.required,Validators.pattern(('[a-zA-Z ]*'))]],
      category:['',[Validators.required,Validators.pattern(('[a-zA-Z ]*'))]],
      tag:['',[Validators.required,Validators.pattern(('[a-zA-Z ]*'))]],
      price:['',[Validators.required,Validators.pattern(('[a-zA-Z0-9 ]*'))]],
      quantity:['',[Validators.required,Validators.pattern(('[0-9 ]*'))]]
    }
  );
  save(){
    if(this.userform.value.name==""){
      this.isError=true;
      this.error[0]="Name Cannot be empty ";
    }
    else{
      this.isError=false;
      this.error[0]="";
    }
     if(this.userform.value.category==""){
      this.isError=true;
      this.error[1]="Category Cannot be empty";
      /* alert("Please Enter All Details") */
    }
    else{
      this.isError=false;
      this.error[1]="";
    }
     if(this.userform.value.price==""){
      this.isError=true;
      this.error[3]="Price Cannot be empty";
    }
    else{
      this.isError=false;
      this.error[3]="";
    }
     if(this.userform.value.tag==""){
      this.isError=true;
      this.error[2]="Tag Cannot be empty";
    }
    else{
      this.isError=false;
      this.error[2]="";
    }
     if(this.userform.value.quantity==""){
      this.isError=true;
      this.error[4]="Quantity Cannot be empty";
    }
    else{
      this.isError=false;
      this.error[4]="";
    }
    if(!isNumber(this.userform.value.quantity)){
      this.isError=true;
      this.error[5]=" Only Integers Please";
    }
    else{
      this.isError=false;
      this.error[4]="";
    }
    if(!isNumber(this.userform.value.price)){
      this.isError=true;
      this.error[5]=" Only Integers Please";
    }
    else{
      this.isError=false;
      this.error[3]="";
    }
    if(!this.isError){
      this.isError=false;
      this.toggle=!this.toggle;
      this.productDetails.addProduct(this.userform.value)
      .subscribe(
        data=>console.log("Success",data),
        error=>console.log("Error !!",error)
      )
      alert("Product Added")
      this.__router.navigate(['/'])    
    }
    
  function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }
}
back(){
  this.toggle=!this.toggle;
  window.location.reload();
}
}
