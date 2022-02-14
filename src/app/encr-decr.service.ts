import { Injectable, ɵdefaultKeyValueDiffers } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncrDecrService {

  constructor() { }
  //the big enryption key
  keys: string = "FOx7Q41eESKMfJA7%db#}dUvEPfSh7Eez!@fxmfxVMnm2)l/5y4^]RYfG^Ny]o&wYY(SIUON!L/zJmh72&7EeOYVyS1u5%1yr@{B";

  //set function for when we make a new parent/daycare
  set(value:any){
    //here we set the key based on the main keys
    var key = CryptoJS.enc.Utf8.parse(this.keys);
    //here we set the iv based on the main keys
    var iv = CryptoJS.enc.Utf8.parse(this.keys);
    //here we encrypt the send in data
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()),key,{
      keySize: 128/8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    //return the encrypted data
    return encrypted.toString();
  }
    get(value:any){
      //here we set the key based on the main keys
      var key=CryptoJS.enc.Utf8.parse(this.keys);
      //here we set the iv based on the main keys
      var iv=CryptoJS.enc.Utf8.parse(this.keys);
      //here we decrypt the send in data
      var decrypted = CryptoJS.AES.decrypt(value,key,{
        keySize: 128/8,
        iv:iv,
        mode:CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      //send back the decrypted data
      return decrypted.toString(CryptoJS.enc.Utf8);
    }

}
