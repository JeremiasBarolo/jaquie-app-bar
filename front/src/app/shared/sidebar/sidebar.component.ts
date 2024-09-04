import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isAdmin: any;


  constructor( 
    private router: Router,
    private authService: AuthService
  
  ) { }


  ngOnInit(): void {
    this.isAdmin = this.authService.isAllowed();
  }



  redirectTo(route:string){ {
    this.router.navigate([route]);
  }
}
}
