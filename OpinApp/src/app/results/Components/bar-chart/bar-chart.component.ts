import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { User } from 'firebase';
import { Label, SingleDataSet } from 'ng2-charts';
import { FirebaseUserDocument, Photos } from 'src/app/core/Models/Classes/photo';
import { BuildingAspect } from 'src/app/core/Models/Enums/building-aspect.enum';
import { DataBaseCollections } from 'src/app/core/Models/Enums/data-base-collections.enum';
import { StorageKeys } from 'src/app/core/Models/Enums/storage-keys.enum';
import { DatabaseService } from 'src/app/core/Services/database.service';
import { StorageService } from 'src/app/core/Services/storage.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {

  public chartLabels: Label[] = [];
  public votes: ChartDataSets[] = [{ data: [] }];
  private photos: Photos = [];
  public displaySkeleton = true;
  public chartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 1,
    maintainAspectRatio: false,
    onClick: (ev, ar) => this.clickHandler(ev, ar),
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: true,
          maxRotation: 90,
          minRotation: 90
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
    },
    layout: {
      padding: {
        bottom: 300
      },
    }
  };
  public colors = [{
    backgroundColor: ['rgba(75, 248, 254, 1)', 'rgba(246, 100, 102, 1)', 'rgba(255, 159, 70, 1)', 'rgba(81, 75, 254, 1)', 'rgba(254, 75, 248, 1)']
  }];
  constructor(private storage: StorageService, private data: DatabaseService, private nav: NavController) { }

  async ngOnInit() {
    const userName = (await this.storage.getStorage<User>(StorageKeys.USER)).email;
    const collection = await (await this.data.getCollection<Photos>(DataBaseCollections.opinApp_photos).get()).toPromise();
    for (const doc of collection.docs) {
      if ((doc.data() as FirebaseUserDocument).photos !== undefined) {
        const photos: Photos = (doc.data() as FirebaseUserDocument)
                                .photos.filter(photo => photo.buildingAspect === BuildingAspect.Negative);
        for (const photo of photos) {
          if (photo.votes > 0) {
            this.photos.push(photo);
            this.votes[0].data.push(photo.votes);
            this.chartLabels.push(photo.fileName);
          }
        }
      }
    }
    console.log(this.votes);
    this.displaySkeleton = false;
  }

  clickHandler(ev, ar) {
    this.nav.navigateRoot([`/preview`, this.photos[ar[0]._index].photoUrl, false, false], {animationDirection: 'forward'});
  }
}
