import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Servico {
  icone: string;
  titulo: string;
  beneficios: string[];
  destaque: string;
  iconeDestaque: string;
}

@Component({
  selector: 'app-secao-servicos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './secao-servicos.html',
  styleUrl: './secao-servicos.scss',
})
export class SecaoServicosComponent implements OnInit {
  @ViewChild('secaoRef', { static: true }) secaoRef!: ElementRef;
  estaVisivel: boolean = false;
  private observador?: IntersectionObserver;

  servicos: Servico[] = [
    {
      icone: 'globe',
      titulo: 'Sites institucionais & One Page',
      beneficios: [
        'Apareça no Google e seja encontrado',
        'Transmita credibilidade 24h por dia',
        'Conquiste clientes enquanto dorme',
      ],
      destaque: 'Aumente suas vendas',
      iconeDestaque: 'trending-up',
    },
    {
      icone: 'map-pin',
      titulo: 'Gestão Google Meu Negócio',
      beneficios: [
        'Destaque-se nas buscas locais',
        'Receba avaliações e construa reputação',
        'Clientes encontram você no Maps',
      ],
      destaque: 'Domine sua região',
      iconeDestaque: 'users',
    },
    {
      icone: 'code',
      titulo: 'Aplicações Web',
      beneficios: [
        'Automatize processos e ganhe tempo',
        'Gerencie seu negócio de qualquer lugar',
        'Dados organizados para decisões certeiras',
      ],
      destaque: 'Escale sua operação',
      iconeDestaque: 'zap',
    },
    {
      icone: 'smartphone',
      titulo: 'Aplicativos móveis',
      beneficios: [
        'Esteja no bolso do seu cliente',
        'Fidelização através de notificações',
        'Experiência premium na palma da mão',
      ],
      destaque: 'Fidelize clientes',
      iconeDestaque: 'users',
    },
    {
      icone: 'palette',
      titulo: 'Redesign de marcas & IDV',
      beneficios: [
        'Transmita profissionalismo instantâneo',
        'Destaque-se da concorrência',
        'Marca que comunica seu valor',
      ],
      destaque: 'Eleve sua imagem',
      iconeDestaque: 'trending-up',
    },
    {
      icone: 'image',
      titulo: 'Conteúdo para redes sociais',
      beneficios: [
        'Posts que engajam e convertem',
        'Presença profissional nas redes',
        'Mais seguidores, mais vendas',
      ],
      destaque: 'Cresça nas redes',
      iconeDestaque: 'trending-up',
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

    const hash = window.location.hash;
    if (hash === '#servicos') {
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

  navegarParaContato() {
    const elemento = document.querySelector('#contato');
    if (elemento) {
      elemento.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
}
