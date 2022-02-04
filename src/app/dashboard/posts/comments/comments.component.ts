import { Component, OnInit, Input } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { Comments } from 'src/app/shared/model/comments.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() postId!: number;
  comments$!: Comments[]
  textareaHeight: string = '58px'
  constructor(private dataStorageService: DatastorageService) { }

  ngOnInit() {
    this.dataStorageService.getCommentsbyPostId(this.postId).subscribe(comments => this.comments$ = comments);
  }

onAddComment(comment: string) {
  const newComment = {
    'id': null,
    'comment': comment,
    'post_id': this.postId,
    'parent_id': null,
    'daycare_id': 1
  }
  this.dataStorageService.addComment(newComment).subscribe(
    () => {
      this.ngOnInit();
    }
  )
}

autogrow(el: HTMLElement) {
  el.style.height = el.scrollHeight + 'px';
}

triggerFunction(e: any, comment: string, el: HTMLElement) {
  if(e.key === 'Enter') {
    this.onAddComment(comment)
  } else {
    this.autogrow(el)
  }
}

}
