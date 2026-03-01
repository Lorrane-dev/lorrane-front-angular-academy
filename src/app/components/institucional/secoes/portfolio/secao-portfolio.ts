import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ItemPortfolio {
  titulo: string;
  categoria: string;
  imagem: string;
}

@Component({
  selector: 'app-secao-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './secao-portfolio.html',
  styleUrl: './secao-portfolio.scss',
})
export class SecaoPortfolioComponent implements OnInit {
  @ViewChild('secaoRef', { static: true }) secaoRef!: ElementRef;
  estaVisivel: boolean = false;
  indiceHover: number | null = null;
  private observador?: IntersectionObserver;

  itensPortfolio: ItemPortfolio[] = [
    {
      titulo: 'E-commerce premium',
      categoria: 'Site institucional',
      imagem: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    },
    {
      titulo: 'App fintech',
      categoria: 'Aplicativo móvel',
      imagem: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    },
    {
      titulo: 'Identidade visual',
      categoria: 'Redesign de marca',
      imagem: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop',
    },
    {
      titulo: 'Dashboard analytics',
      categoria: 'Aplicação web',
      imagem: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    },
    {
      titulo: 'Landing page',
      categoria: 'One page',
      imagem: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    },
    {
      titulo: 'Social media kit',
      categoria: 'Redes sociais',
      imagem: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=600&fit=crop',
    },
  ];

  ngOnInit() {
    this.configurarObservadorIntersecao();
    this.marcarVisivelSeNecessario();
  }

  private configurarObservadorIntersecao() {
    if (!('IntersectionObserver' in window)) {
      this.estaVisivel = true;
      return;
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    this.observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            this.estaVisivel = true;
            this.observador?.disconnect();
            this.observador = undefined;
            break;
          }
        }
      },
      {
        threshold: isMobile ? 0.05 : 0.2,
        rootMargin: isMobile ? '0px' : '-100px',
      },
    );

    if (this.secaoRef?.nativeElement) {
      this.observador.observe(this.secaoRef.nativeElement);
    }
  }

  @HostListener('window:hashchange')
  aoMudarHash() {
    this.marcarVisivelSeNecessario();
  }

  private marcarVisivelSeNecessario() {
    if (this.estaVisivel) return;

    const elemento = this.secaoRef?.nativeElement as HTMLElement | undefined;
    if (!elemento) return;

    const hash = window.location.hash;
    if (hash && hash === `#${elemento.id}`) {
      this.estaVisivel = true;
      this.observador?.disconnect();
      this.observador = undefined;
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (this.estaVisivel) return;
        const rect = elemento.getBoundingClientRect();
        const alturaViewport = window.innerHeight || document.documentElement.clientHeight;
        const estaNaTela = rect.top < alturaViewport && rect.bottom > 0;
        if (estaNaTela) {
          this.estaVisivel = true;
          this.observador?.disconnect();
          this.observador = undefined;
        }
      });
    });

    setTimeout(() => {
      if (this.estaVisivel) return;
      const rect = elemento.getBoundingClientRect();
      const alturaViewport = window.innerHeight || document.documentElement.clientHeight;
      const estaNaTela = rect.top < alturaViewport && rect.bottom > 0;
      if (estaNaTela) {
        this.estaVisivel = true;
        this.observador?.disconnect();
        this.observador = undefined;
      }
    }, 250);
  }

  aoPassarMouse(indice: number) {
    this.indiceHover = indice;
  }

  aoSairMouse() {
    this.indiceHover = null;
  }
}
