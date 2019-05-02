import { Injectable } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService implements Resolve<any> {

  constructor(private dataStorage: DataStorageService) { }

  resolve(route: ActivatedRouteSnapshot) {
    let id = route.paramMap.get("OppId");
    return this.dataStorage.getData(id);
  }
}
