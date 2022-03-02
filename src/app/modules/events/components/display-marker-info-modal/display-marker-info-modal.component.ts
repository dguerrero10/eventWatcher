import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Marker } from 'src/app/core/shared/models/marker.model';

@Component({
  selector: 'app-display-marker-info-modal',
  templateUrl: './display-marker-info-modal.component.html',
  styleUrls: ['./display-marker-info-modal.component.scss']
})
export class DisplayMarkerInfoModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { marker: Marker }) { }

  ngOnInit(): void {
  }

}
