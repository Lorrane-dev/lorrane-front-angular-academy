import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatsappLeadModalService } from '../../../whatsapp-lead-modal/whatsapp-lead-modal.service';

@Component({
  selector: 'app-secao-contato',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './secao-contato.html',
  styleUrl: './secao-contato.scss',
})
export class SecaoContatoComponent implements OnInit {
  @ViewChild('secaoRef', { static: true }) secaoRef!: ElementRef;
  estaVisivel: boolean = false;
  numeroWhatsapp: string = '5511989595100';
  mensagemWhatsapp: string = 'Olá! Quero crescer meu negócio com soluções digitais.';
  private observador?: IntersectionObserver;
  private readonly whatsappLeadModal = inject(WhatsappLeadModalService);

  get urlWhatsapp(): string {
    return `/contato-whats?phone=${this.numeroWhatsapp}&text=${encodeURIComponent(this.mensagemWhatsapp)}`;
  }

  ngOnInit() {
    this.configurarObservadorIntersecao();
    this.marcarVisivelSeNecessario();
  }

  aoClicarWhatsapp(evento: MouseEvent) {
    if (evento.button !== 0 || evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey)
      return;
    evento.preventDefault();
    this.whatsappLeadModal.abrir({
      origem: 'contato',
      mensagemBase: this.mensagemWhatsapp,
    });
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
}
