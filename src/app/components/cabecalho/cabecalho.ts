import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LogoComponent } from '../marca/logo/logo';

interface LinkNavegacao {
  href: string;
  rotulo: string;
}

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [CommonModule, RouterModule, LogoComponent],
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.scss',
})
export class CabecalhoComponent implements OnInit {
  rolou: boolean = false;
  menuMobilAberto: boolean = false;

  constructor(private readonly router: Router) {}

  linksNavegacao: LinkNavegacao[] = [
    { href: '#formacoes', rotulo: 'Formações' },
    { href: '#tecnologias', rotulo: 'Tecnologias' },
    { href: '#ecossistema', rotulo: 'Ecossistema' },
    { href: '#valores', rotulo: 'Investimento' },
  ];

  @HostListener('window:scroll')
  aoRolar() {
    this.rolou = window.scrollY > 50;
    if (this.menuMobilAberto) {
      this.menuMobilAberto = false;
    }
  }

  @HostListener('window:wheel')
  aoRolarMouse() {
    if (this.menuMobilAberto) {
      this.menuMobilAberto = false;
    }
  }

  @HostListener('window:touchmove')
  aoMoverTouch() {
    if (this.menuMobilAberto) {
      this.menuMobilAberto = false;
    }
  }

  @HostListener('window:resize')
  aoRedimensionar() {
    if (this.menuMobilAberto) {
      this.menuMobilAberto = false;
    }
  }

  @HostListener('window:keydown.escape')
  aoPressionarEsc() {
    this.fecharMenuMobile();
  }

  alternarMenuMobile() {
    this.menuMobilAberto = !this.menuMobilAberto;
  }

  fecharMenuMobile() {
    this.menuMobilAberto = false;
  }

  navegarPara(href: string) {
    this.fecharMenuMobile();

    const fragment = href.startsWith('#') ? href.slice(1) : href;
    const elemento = document.getElementById(fragment);

    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Seção não está na página atual — navega para home com o fragmento
      this.router.navigate(['/'], { fragment }).then(() => {
        setTimeout(() => {
          const el = document.getElementById(fragment);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      });
    }
  }

  ngOnInit() {
    this.aoRolar();
  }
}
