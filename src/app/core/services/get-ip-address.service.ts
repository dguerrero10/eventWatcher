import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetIPAddressService {
  private IPAddress = new BehaviorSubject<string | null>('');
  public IPAddressListener = this.IPAddress.asObservable();

  constructor(private http: HttpClient) { }

  getIPAddress() {
    return this.http.get("http://api.ipify.org/?format=json");
  }

  shareIPAddress(ip: string) {
    this.IPAddress.next(ip);
  }

}
