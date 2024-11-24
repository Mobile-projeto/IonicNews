import { Injectable } from '@angular/core';
import { Http } from '@capacitor-community/http';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  constructor() { }


   doGet = () => {
    const options = {
      url: 'https://newsapi.org/v2/everything?q=ukraine&sortBy=publishedAt&apiKey=9f5d4ef1ea5b44c9bf855efbe62b9fdb',
      //headers: { 'X-Fake-Header': 'Max was here' },
      //params: { size: 'XL' },
    };

    return from(Http.get(options))
  };
}
