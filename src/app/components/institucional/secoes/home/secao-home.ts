import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-secao-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './secao-home.html',
  styleUrl: './secao-home.scss',
})
export class SecaoHomeComponent {
  navegarPara(href: string) {
    const elemento = document.querySelector(href);
    if (elemento) {
      elemento.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
}
