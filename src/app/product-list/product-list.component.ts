import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../products.service';
import {Router} from '@angular/router';

import {FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  toggle: boolean = true;
  viewData=[];
  datta;
  constructor(private productDetails:ProductsService,private __router:Router,public fobj:FormBuilder) { 
    this.productDetails.viewProducts()
      .subscribe(
        data=>{
          this.viewData=data
        
          if (data) { 
            hideloader();
          }
        }
      );
      function hideloader() { 
        document.getElementById('spinner').style.display = 'none'; 
        document.getElementById('loadings').style.display = 'none'; 
      }
  }

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

  listToggle(data){
    this.viewData=data;
    this.toggle=!this.toggle; 
  }

  updateFormToggle(){
    this.toggle=!this.toggle; 
    window.location.reload();    
  }


  save(id:String){
      this.productDetails.updateProducts(id,this.userform.value)
      .subscribe(
        data=>console.log("Success",data),
        error=>console.log("Error !!",error)
      )
      alert("Product Updated")
      window.location.reload(); 
  }

  delete(id:String){
    this.productDetails.deleteProduct(id)
    .subscribe(
      data=>console.log("Success",data),
        error=>console.log("Error !!",error)
    )
    alert("Product Deleted")
    window.location.reload();    
  }
}

