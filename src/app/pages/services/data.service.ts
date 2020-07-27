import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data: any[];

  constructor() { }

  // todo SUPPRIMER

  setData(data){
    this.data = data ;
  }

  getData(){
    return this.data;
  }

  


}
