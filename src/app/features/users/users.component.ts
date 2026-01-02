import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true
})
export class UsersComponent implements OnInit {
  title: string = 'Users';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      if (urlSegments.length > 1) {
        // Get the last segment of the route
        const lastSegment = urlSegments[urlSegments.length - 1].path;
        // Convert kebab-case or snake_case to Title Case
        this.title = lastSegment
          .split(/[-_]/)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
    });
  }

}
