import { EventEmitter, Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { User } from '../models/user';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private afs:AngularFirestore,private storage: AngularFireStorage) { }

  _showLoader: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  _showProfileUpdate: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  showLoader(value:boolean){
    setTimeout(()=>{
      this._showLoader.emit(value);

    },0);
  }
  showUpdate(value:boolean){
    this._showProfileUpdate.emit(value);
  }
getEmail(){
  return JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('todo'))));
}
  addCard(user : User) {
    user.id = this.afs.createId();
    return this.afs.collection('Tasks').add(user);
  }

  getCardDeatils(email:string) {
    // return this.afs.doc('User/'+email).get();
    return this.afs.collection('Tasks',ref => ref.where('email', '==', email)).snapshotChanges();
  }

  deleteUser(id:string) {
    return this.afs.collection('Tasks').doc(id).delete();
  }

  updateDetails(user:User,id:string) {
    if(!user || !id) {
      return;
    }
    this.deleteUser(id);
    this.addCard(user);
  }

  uploadImage(file:any){
    const filePath = `images/${Date.now()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file).snapshotChanges();
    return { task, filePath };
  }

  getImageUrl(filePath: string) {
    const fileRef = this.storage.ref(filePath);
    return fileRef.getDownloadURL();
  }
}
