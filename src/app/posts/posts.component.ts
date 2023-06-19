import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  newPost: any = {};
  message!: string;

  constructor(private service: PostService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.service.getPosts().subscribe({
      next: (response: any) => {
        console.log(response);
        this.posts = response;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  createPost(idInput: HTMLInputElement, titleInput: HTMLInputElement, bodyInput: HTMLInputElement): void {
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

    idInput.value = '';
    titleInput.value = '';
    bodyInput.value = '';

    this.service.createPost(newPost).subscribe({
      next: (response: any) => {
        console.log(response);
        newPost.id = response.id;
        this.posts.unshift(newPost);
        this.clearForm();
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  updatePost(post: any, idInput: HTMLInputElement, titleInput: HTMLInputElement, bodyInput: HTMLInputElement): void {
    const id = Number(idInput.value);
    const title = titleInput.value;
    const body = bodyInput.value;

    post.id = id;
    post.title = title;
    post.body = body;

    this.service.updatePost(post).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  deletePost(post: any): void {
    this.service.deletePost(post).subscribe({
      next: (response: any) => {
        console.log(response);
        const index = this.posts.indexOf(post);
        if (index !== -1) {
          this.posts.splice(index, 1);
        }
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => {
        // Optional: Handle completion of the observable
      }
    });
  }

  clearForm() {
    this.newPost = {};
  }
}
