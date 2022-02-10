import { Injectable, ɵdefaultKeyValueDiffers } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncrDecrService {

  constructor() { }

  keys: string = "FOx7Q41eESKMfJA7%db#}dUvEPfSh7Eez!@fxmfxVMnm2)l/5y4^]RYfG^Ny]o&wYY(SIUON!L/zJmh72&7EeOYVyS1u5%1yr@{B";

  set(value:any){
    var key = CryptoJS.enc.Utf8.parse(this.keys);
    var iv = CryptoJS.enc.Utf8.parse(this.keys);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()),key,{
      keySize: 128/8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }
    get(value:any){
      var key=CryptoJS.enc.Utf8.parse(this.keys);
      var iv=CryptoJS.enc.Utf8.parse(this.keys);
      var decrypted = CryptoJS.AES.decrypt(value,key,{
        keySize: 128/8,
        iv:iv,
        mode:CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      return decrypted.toString(CryptoJS.enc.Utf8);
    }

}
