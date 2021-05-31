import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  back:string = environment.api_url
  myFiles:string [] = [];

   myForm = new FormGroup({
    name: new FormControl(),
    file: new FormControl()
  });
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  } 
  onFileChange(event) {

        for (var i = 0; i < event.target.files.length; i++) { 
            this.myFiles.push(event.target.files[i]);
        }
  }

  submit(){
    const formData = new FormData();

    for (var i = 0; i < this.myFiles.length; i++) { 
      formData.append("multi-files", this.myFiles[i]);
    }

    this.http.post(this.back+'/apis/files', formData)
      .subscribe((res) => {
        console.log(res);
        alert(res["msg"]);
      })
  }
}

