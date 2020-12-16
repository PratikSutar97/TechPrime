import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http'; 
import {ProductDetails} from './product-details';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _addRequestsUrl = "http://localhost:3000/api/addProduct";
  private _viewProductUrl="http://localhost:3000/api/viewProducts";
  private _updateProductUrl="http://localhost:3000/api/updateProduct";
  private _deleteProductUrl="http://localhost:3000/api/deleteProduct";
  constructor(
    private http:HttpClient

  ) { }

  addProduct(productDetails:ProductDetails){
    return this.http.post<ProductDetails>(this._addRequestsUrl,productDetails);
  }
  viewProducts(){
    return this.http.get<any>(this._viewProductUrl)
  }

  updateProducts(id:String,productDetails:ProductDetails){
    return this.http.put<ProductDetails>(this._updateProductUrl+`/${id}`,productDetails);
  }
  deleteProduct(id:String){
    return this.http.delete(this._deleteProductUrl+`/${id}`)
  }
}
