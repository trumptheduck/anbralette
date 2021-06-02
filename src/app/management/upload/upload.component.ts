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
  isUploading:boolean = false;
  progressInf:string = "";
  progressPerc:number = 0;
   myForm = new FormGroup({
    name: new FormControl(),
    file: new FormControl()
  });
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  } 
  onFileChange(event) {
        this.myFiles.length = 0;
        for (var i = 0; i < event.target.files.length; i++) { 
            this.myFiles.push(event.target.files[i]);
        }
  }

  submit(){
      var total = this.myFiles.length;
      var progress = 0;
      this.isUploading = true;
    for (var i = 0; i < this.myFiles.length; i++) { 
      const formData = new FormData();
      formData.append("multi-files", this.myFiles[i]);
      this.http.post(this.back+'/apis/files', formData)
      .subscribe((res) => {
        progress++
        this.progressInf = `${Math.ceil(progress/total*100)}%(${progress}/${total})`
        this.progressPerc = Math.ceil(progress/total*100);
        if (this.progressPerc === 100) {
          setTimeout(()=>{          
          alert("Tải lên thành công: "+total+" files");
          this.isUploading = false;},200)
        }
      })
    }
  }
}

