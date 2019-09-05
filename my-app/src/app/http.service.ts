import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { UserInterface} from './models/user-interface'
import { map } from 'rxjs/operators'
import { comments } from './models/comentarios'
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  Usertoken: string;
  userEmail:string;

  constructor(private http: HttpClient) { this.readToken() }
  headers: HttpHeaders= new HttpHeaders ({
    "Content-Type": "application/json"
  })

  login(user: UserInterface) {
    const userData ={
      email: user.email,
      password: user.password
    }
    return this.http.post('https://ti.ucic.pe/api/login', userData).pipe(map(resp => {     
      this.saveToken(resp['token'], user.email)  
      return resp;
    }))
  }
  saveToken(Token: string, email:string) {
    this.Usertoken = Token
    this.userEmail= email
    localStorage.setItem('token', Token);
    localStorage.setItem('email',email)
  }
  readToken() {
    if (localStorage.getItem('token')) {
      this.Usertoken = localStorage.getItem('token');
    } else {
      this.Usertoken = '';
    }
    console.log( this.Usertoken);
    return this.Usertoken;
  }
  getIdUsers (){   
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.Usertoken
    });
    return this.http.get('https://ti.ucic.pe/api/get/user', {headers: headers})
      .pipe(map(response => response)
      )
  }
  getComments() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.Usertoken
    });
    return this.http.get<comments[]>("https://ti.ucic.pe/api/get/comments", { headers: headers })
      .pipe(map(response => response)
      )
  }
  setComments(comment: comments) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.Usertoken
    });
    const commentData ={
      body: comment.body
    }
    return this.http.post('https://ti.ucic.pe/api/set/comment', commentData, { headers: headers }).pipe(map(resp => {
      return resp;
    }))
  }
}
