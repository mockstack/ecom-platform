import { Component, OnInit } from '@angular/core';
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-top-info-bar',
  templateUrl: './top-info-bar.component.html',
  styleUrls: ['./top-info-bar.component.scss']
})
export class TopInfoBarComponent implements OnInit {

  public facebookIcon = faFacebook;
  public instagramIcon = faInstagram;
  public emailIcon = faEnvelopeOpen;

  constructor() { }

  ngOnInit(): void {
  }

}
