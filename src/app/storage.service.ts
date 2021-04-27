import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'

export interface Item {
  key: string,
  value: any
}

const IKEY = 'items'; 

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  addItem(item: Item): Promise<any>{
    return this.storage.get(IKEY).then((items: Item[]) => {
      if (items){
        items.push(item);
        return this.storage.set(IKEY, items);
      } else {
        return this.storage.set(IKEY, [item]);
      }
    });
  }

  getItems(): Promise<Item[]>{
    return this.storage.get(IKEY);
  }

  updateItem(item: Item): Promise<any>{
    return this.storage.get(IKEY).then((items: Item[]) => {
      if (!items || items.length === 0){
        return null;
      }
      let newItems: Item[] = [];
      for(let i of items){
        if (i.key === item.key){
          newItems.push(item);
        }else{
          newItems.push(i);
        }
      }
      return this.storage.set(IKEY, newItems);
    });
  }

  deleteItem(key: string): Promise<any>{
    return this.storage.get(IKEY).then((items: Item[]) => {
      if (!items || items.length === 0){
        return null;
      }
      let toKeep: Item[] = [];

      for (let i of items) {
        if (i.key !== key){
          toKeep.push(i);
        }
      }
      return this.storage.set(IKEY, toKeep);
    });
  }
}
