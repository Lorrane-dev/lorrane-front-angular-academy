import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Diferencial {
  icone: string;
  titulo: string;
  descricao: string;
}

@Component({
  selector: 'app-secao-diferenciais',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './secao-diferenciais.html',
  styleUrl: './secao-diferenciais.scss',
})
export class SecaoDiferenciaisComponent implements OnInit {
  @ViewChild('secaoRef', { static: true }) secaoRef!: ElementRef;
  estaVisivel: boolean = false;
  private observador?: IntersectionObserver;

  diferenciais: Diferencial[] = [
    {
      icone: 'target',
      titulo: 'Foco 100% no seu resultado',
      descricao:
        'Não entrego apenas um site ou app. Entrego uma ferramenta para você conquistar mais clientes e vender mais.',
    },
    {
      icone: 'sparkles',
      titulo: 'Design que converte',
      descricao:
        'Visual moderno e profissional que transmite credibilidade e faz seu negócio se destacar da concorrência.',
    },
    {
      icone: 'building',
      titulo: 'Experiência comprovada',
      descricao:
        'Trabalho com grandes empresas, mas minha paixão é ajudar negócios de todos os tamanhos a crescerem.',
    },
    {
      icone: 'award',
      titulo: 'Qualidade que vale',
      descricao:
        'Investimento justo por um trabalho premium. Soluções feitas para durar e gerar retorno real.',
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
}
