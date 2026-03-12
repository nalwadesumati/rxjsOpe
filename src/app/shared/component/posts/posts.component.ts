import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../service/posts.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];

  searchControl = new FormControl('');

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.loadPost();
    this.onSearchPosts();
  }

  trackByPostId(index: number, post: any) {
    return post.id;
  }

  loadPost() {
    this.postService.getAllPost().subscribe((res: any) => {
      this.posts = res.posts;
      this.filteredPosts = res.posts;
    });
  }

  onSearchPosts() {
    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        const val = (value || '').toLowerCase();

        this.filteredPosts = this.posts.filter(
          (post) =>
            post.title.toLowerCase().includes(val) ||
            post.body.toLowerCase().includes(val),
        );
      });
  }
}
