import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../marca/logo/logo';

@Component({
  selector: 'app-rodape',
  standalone: true,
  imports: [CommonModule, LogoComponent],
  templateUrl: './rodape.html',
  styleUrl: './rodape.scss',
})
export class RodapeComponent {
  anoAtual: number = new Date().getFullYear();
}
