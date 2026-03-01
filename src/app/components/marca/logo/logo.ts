import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
})
export class LogoComponent {
  @Input() tamanhoIcone: string = '50px';
  @Input() tamanhoTexto: string = '1.5rem';
  @Input() comLink: boolean = true;
}
