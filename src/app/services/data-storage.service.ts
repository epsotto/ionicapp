import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const token = "auth-token";

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {
  private data = [];

  constructor(private storage: Storage) { }

  setData(id, data){
    this.data[id] = data;
  }

  getData(id) {
    return this.data[id];
  }

  removeData(id){
    this.data.slice(this.data.indexOf(this.data[id]), 1);
    return this.data;
  }

  retrieveCachedData(){
    return this.storage.get(token);
  }

  saveCheckedInLocation(key:string, data:any){
    return this.storage.set(key, data);
  }

  getCheckedInLocation(key){
    return this.storage.get(key);
  }

  removeCheckedInLocation(key){
    return this.storage.remove(key);
  }
}
