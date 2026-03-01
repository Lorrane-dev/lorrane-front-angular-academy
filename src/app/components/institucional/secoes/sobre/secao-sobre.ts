import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-secao-sobre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './secao-sobre.html',
  styleUrl: './secao-sobre.scss',
})
export class SecaoSobreComponent implements OnInit {
  @ViewChild('secaoRef', { static: true }) secaoRef!: ElementRef;
  estaVisivel: boolean = false;
  private observador?: IntersectionObserver;

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
        threshold: isMobile ? 0.05 : 0.3,
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

    const hash = window.location.hash;
    if (hash === '#sobre') {
      this.estaVisivel = true;
      this.observador?.disconnect();
      this.observador = undefined;
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (this.estaVisivel) return;
        const elemento = this.secaoRef?.nativeElement as HTMLElement | undefined;
        if (!elemento) return;
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
      const elemento = this.secaoRef?.nativeElement as HTMLElement | undefined;
      if (!elemento) return;
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
}
