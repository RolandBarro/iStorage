import { Component, OnInit } from '@angular/core';

import { Storage } from 'aws-amplify';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {

  image: any;

  constructor() { }

  ngOnInit(): void {
  }

  onFileChanged(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];

      const reader = new FileReader();
      reader.onload = async (e: ProgressEvent) => {
        this.image = await this.uploadToS3({ file, image: this.image });
      };

      reader.readAsDataURL(file);
    }
  }

  getImage(key: string, type: string) {
    return new Promise(
      (resolve, reject) => {
        Storage.get(key, { contentType: type })
          .then(res => resolve(res))
          .catch(err => reject(err));
      }
    );
  }

  async uploadToS3(data: any, userInfo:any = {}) {
    const { image, file } = data
    const { type, name } = file;
    const { id } = userInfo;
    const fileName = `images/${id || 'test'}/${name}`;

    return Storage.put(fileName, image, { contentType: type })
      .then (async (result: any) => {
        console.log('result: ', result);
        const imgFromS3 = await this.getImage(result.key, type);
        console.log('imgFromS3: ', imgFromS3);

        return imgFromS3;
      })
      .catch(err => err);
  }

}
