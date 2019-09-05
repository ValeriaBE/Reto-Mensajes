import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpService } from '../http.service'
import { UserInterface } from '../models/user-interface';
import { Router } from '@angular/router';
import { UserModel} from 'src/app/model/model.model'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private _http: HttpService, private router : Router) {}

user: UserModel = new UserModel()
  ngOnInit() {
  }

    onLogin(forma : NgForm) {
      if (forma.invalid){return;}
     Swal.fire({
       allowOutsideClick: false,
       type: "info",
       text: "Espere por favor..."
     });
     Swal.showLoading()
     this._http.login(this.user).subscribe(resp => {
       Swal.close()
       this.router.navigateByUrl('/home')
        console.log(resp) },
      (err )=>{
       console.log(err.error)
       let text="";
       if(err.error == "Cannot find user"){
         text="Usuario no existe 😔"
       } else {
         text = "Password incorrecto 🤔"
       }
       Swal.fire({
        allowOutsideClick: false,
        type: "error",
        text: text,
        confirmButtonColor:"#293092"
        });
      }
      )}
     

}
