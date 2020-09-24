import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-skeleton',
  templateUrl: './list-skeleton.component.html',
  styleUrls: ['./list-skeleton.component.scss'],
})
export class ListSkeletonComponent implements OnInit {

  public dummyArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  constructor() { }

  ngOnInit() {}

}
