import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '../common/common.module';

@Component({
  selector: 'hcf-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  destination: any;
  router: any;
  constructor(destination: ActivatedRoute, router: Router) {
    this.destination = destination.snapshot;
    this.router = router;
  }

  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  ngOnInit(): void {

    // if (localStorage.getItem("isAuthorised") !== "true" && this.router.url !== "/app/notauthorised"){
    //   this.authenticationService.authenticateUser().subscribe(result => {
    //     if (result && result['isAuthenticated']) {
    //         localStorage.setItem("isAuthorised", "true");
    //         window.location.href = "/app/casepaydefinition";
    //     }
    //   }, error => {
    //     window.location.href = "/app/notauthorised";
    //   });
    // }
  }

}
