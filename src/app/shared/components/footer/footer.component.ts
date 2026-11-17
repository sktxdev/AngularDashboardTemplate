import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { AppConfigService } from '../../../config/app.config.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [MatDividerModule]
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();

  constructor(public configService: AppConfigService) { }

  ngOnInit(): void {
  }

}
