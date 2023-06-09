import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  posts: any[] = [];
  newPost: any = {};
  private apiUrl: any = 'https://jsonplaceholder.typicode.com/posts';
  message: any;

  constructor(private http: HttpClient) {
    this.getPosts();
  }

  getPosts() {
    this.http.get<any[]>(this.apiUrl)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.posts = response;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  createPost(idInput: HTMLInputElement, titleInput: HTMLInputElement, bodyInput: HTMLInputElement): void | string  {
    if (!idInput.value || !titleInput.value || !bodyInput.value) {
      // One or more input fields are empty, do not proceed with the submission
      this.message = 'One or more input fields are empty. Please fill all fields.';
      return;
    }
    
    let newPost = {

      id: idInput.value,
      title: titleInput.value,
      body: bodyInput.value
    };

    idInput.value ='';
    titleInput.value ='';
    bodyInput.value ='';

    this.http.post<any[]>(this.apiUrl, newPost)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          newPost.id = newPost.id;
          newPost.title = response.title;
          newPost.body = response.body;
          this.posts.splice(0, 0, newPost);
          this.clearForm();
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  clearForm() {
    this.newPost = {};
  }
}
