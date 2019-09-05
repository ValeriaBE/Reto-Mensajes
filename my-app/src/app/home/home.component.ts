import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { CommentModel } from '../model/comment.model'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: Object;
  comments: Object;
  comment: CommentModel = new CommentModel()
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.getIdUsers().subscribe(data=>{console.log(this.users); return data; })
    this.http.getComments().subscribe(data=>{console.log(this.comments); return data; })
  }
  onSubmit(){
    this.http.setComments(this.comment).subscribe(data=>{console.log(data); return data; })
  }
}
