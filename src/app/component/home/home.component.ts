import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public isReadMore: boolean = true;
  text = `Located within 322 m of Central Park and Columbus
        Circle metro station, this boutique hotel features
        an interior lobby garden with trees and ivy walls.
   `;

  constructor() {}

  ngOnInit(): void {}
}
