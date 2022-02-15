import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/shared/model/posts.model';
import { DatastorageService } from 'src/app/datastorage.service';
import { TimeService } from 'src/app/time.service';
import { FileuploadService } from 'src/app/fileupload.service';
import { defaultIfEmpty } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  postId!: number;

  posts$!:any[];  // fetch of all the posts by one specific daycare
  postImages$: any[] = []
  curDaycare!: any; // daycare id a stored in the sessionStorage
  imageToShow!: any;
  files!: any;
  formdata = new FormData();

  PostId!: number

  editThisMsg!:string;  // the message we want to edit which we will send to childcomponent EditPostFormComponent
  editId!: number; // the id of the post which we want to edit which we will send to childcomponent EditPostFormComponent

  msgId!: number; // for showing ONLY comments of this id
  msgToggle: boolean = false; // FALSE IS NOT SHOWING COMMENTS , TRUE IS SHOWING COMMENTS

  constructor(private dataStorage: DatastorageService, private timeService: TimeService, private uploadfile: FileuploadService) { }

  ngOnInit(): void {
    this.postImages$ = [];
    this.curDaycare = sessionStorage.getItem('daycare_id');
    this.dataStorage.getPostsByDayCare(this.curDaycare).subscribe( 
      posts => {
        this.posts$ = posts;

        // this.posts$.forEach((post) => {
        //   this.dataStorage.getImagesByPostId(post.id).subscribe(data => {
        //     console.log("GET IMAGES BY POST ID")
        //     console.log(data)
        //     this.postImages$.push(data)
        //     console.log("PUSHED IMAGES IN POSTIMAGES ARRAY")
        //     console.log(this.postImages$)
        //   })
        // }
        
        // )

      })

      this.dataStorage.getAllImages().subscribe(
        data => {
          console.log("ALL IMAGES")
          this.postImages$ = data;
          const emptyVessel = this.postImages$;
          console.log('vessel: '+JSON.stringify(emptyVessel));
        }
      )
     
  }

// METHOD WHICH SENDS A TIMESTAMP TO OUR TimeService

  calculateTimeSince(timeStamp: string) {
    const timestamp = new Date(timeStamp);
    timestamp.setHours( timestamp.getHours() + 1 );
    timestamp.setMinutes( timestamp.getMinutes() + 7);
    return this.timeService.timeSince(timestamp);
  }

  // ADD POST

  onAddPost(posts: any) {

    this.dataStorage.addPost(posts).subscribe(
      (data) => {

        this.PostId = data; // PUT ID IN PostId variable
        console.log("POSTID")
        console.log(this.PostId)
        
      })

console.log(this.files)

  // UPLOADS EACH FILE
  console.log("POSTIMAGES BEFORE LOOP")
  console.log(this.postImages$);

  
  if(!this.postImages$) {
    for (let index = 0; index < this.files.length; index++) {
      const element = this.files[index];
      
      const imageObj = {
        "id": null,
        "imagepath": element.name,
        "post_id": this.PostId
      }
      // STORE FILENAME IN IMAGES FOLDER
      this.dataStorage.postImageName(imageObj).subscribe(
        (data) => {
          console.log("POSTIMAGENAME")
          console.log(data)    
          // const pivotObj = {
          //   "id": null,
          //   "post_id": this.pivotPostId,
          //   "image_id": data
          // }
          // console.log(pivotObj)
          // this.dataStorage.postImagePivotTable(pivotObj).subscribe()
      });    
  
      this.formdata.append('files', element);

      this.uploadfile.uploadMultiple(this.formdata).subscribe(
        (d) => {
          console.log(d);
          this.ngOnInit();
        },
        (error) => {
          console.log(error)
        })
      }
     
    }

  } 
 

  

  // EDIT POST , this posts argument comes from the child via EventEmitter!!

  onEditPost(posts: any) {

    this.dataStorage.updatePost(posts, posts.id).subscribe(
      () => this.ngOnInit()
    )
  }

  // DELETE POST

  deletePost(postId: number) {
   this.dataStorage.deletePost(postId).subscribe(
     () => this.ngOnInit()
   );   
  }


  // WHEN EDITING WE NEED TO SEND current message and the ID of the post TO OUR CHILD COMPONENT EditPostFormComponent 

  onEdit(sendMsg:string, id: number){
    this.editThisMsg = sendMsg;
    this.editId = id; 
    console.log(this.editThisMsg);
  }


  // 

  messageId(id: number) {
    if (id == this.msgId) { // When we already opened the comments of this posts (when msgID is already known) it will close again
      this.msgToggle = false;
      this.msgId = 0;
    } else { // else comments will be shown
      this.msgId = id;
      this.msgToggle = true;
    }
   
  }

  addFiles(files: any) {
    this.files = files;   
  }

}
