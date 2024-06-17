import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Library Management System';
  pageTitle: string = '';
  showBackButton: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updatePageTitle();
      });
  }

  private updatePageTitle() {
    const pageTitle = this.getPageTitle(this.activatedRoute.root);
    this.titleService.setTitle(`${pageTitle} | ${this.title}`);
    this.pageTitle = pageTitle;

    // Update showBackButton based on the current route
    this.showBackButton = this.router.url !== '/dashboard';
  }

  private getPageTitle(route: ActivatedRoute): string {
    const data = [];
    while (route.firstChild) {
      route = route.firstChild;
      if (route.snapshot.data && route.snapshot.data.title) {
        data.push(route.snapshot.data.title);
      }
    }

    return data.reverse().join(' - ');
  }

  logout() {
    // Implement your logout logic here
    this.authService.logout();
  }
}
