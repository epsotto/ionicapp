import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SaveLocationService {

  constructor(private storage: Storage) { }

  saveLocationOnCheckIn(location:string) {
    
  }
}
