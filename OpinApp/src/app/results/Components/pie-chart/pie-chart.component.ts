import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../core/Services/storage.service';
import { DatabaseService } from '../../../core/Services/database.service';
import { DataBaseCollections } from '../../../core/Models/Enums/data-base-collections.enum';
import { FirebaseUserDocument, Photos, Photo } from '../../../core/Models/Classes/photo';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Colors, Color } from 'ng2-charts';
import { User } from 'firebase';
import { StorageKeys } from 'src/app/core/Models/Enums/storage-keys.enum';
import { BuildingAspect } from 'src/app/core/Models/Enums/building-aspect.enum';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {


  public chartLabels: Label[] = [];
  public votes: SingleDataSet = [];
  private photos: Photos = [];
  public chartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 1,
    maintainAspectRatio: true,
    onClick: (ev, ar) => this.clickHandler(ar[0]),
    legend: {
      align: 'center',
      display: true,
      position: 'bottom',
      fullWidth: true
    }
  };
  public colors = [{
    backgroundColor: ['rgba(75, 248, 254, 1)', 'rgba(246, 100, 102, 1)', 'rgba(255, 159, 70, 1)', 'rgba(81, 75, 254, 1)', 'rgba(254, 75, 248, 1)']
  }];
  public displaySkeleton = true;
  constructor(private storage: StorageService, private data: DatabaseService, private nav: NavController) { }

  async ngOnInit() {
    const userName = (await this.storage.getStorage<User>(StorageKeys.USER)).email;
    const collection = await (await this.data.getCollection<Photos>(DataBaseCollections.opinApp_photos).get()).toPromise();
    for (const doc of collection.docs) {
      if ((doc.data() as FirebaseUserDocument).photos !== undefined) {
        const photos: Photos = (doc.data() as FirebaseUserDocument)
                                .photos.filter(photo => photo.buildingAspect === BuildingAspect.Positive);
        for (const photo of photos) {
          if (photo.votes > 0) {
            this.photos.push(photo);
            this.votes.push(photo.votes);
            this.chartLabels.push(photo.fileName);
          }
        }
      }
    }
    this.displaySkeleton = false;
  }

  clickHandler(ar) {
    this.nav.navigateRoot([`/preview`, this.photos[ar._index].photoUrl, false, false], {animationDirection: 'forward'});
  }
}
