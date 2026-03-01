import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho';
import { RodapeComponent } from '../../components/rodape/rodape';
import { BotaoWhatsappComponent } from '../../components/botao-whatsapp/botao-whatsapp';
import { WhatsappLeadModalComponent } from '../../components/whatsapp-lead-modal/whatsapp-lead-modal';
import { WhatsappLeadPopupComponent } from '../../components/whatsapp-lead-popup/whatsapp-lead-popup';

interface Modulo {
  titulo: string;
  objetivo: string;
  aulas: string[];
  projeto: string;
  aberto: boolean;
}

interface Plano {
  titulo: string;
  descricao: string;
  totalModulos: number;
  cargaHoraria: string;
  nivel: string;
  destaque: boolean;
  modulos: Modulo[];
  resultadoFinal: string;
}

interface PerfilPublico {
  icone: string;
  titulo: string;
  descricao: string;
}

interface OpcaoPrecificacao {
  tipo: string;
  preco: number;
  descricao: string;
  badge?: string;
  destaque?: boolean;
  itens: string[];
}

@Component({
  selector: 'app-aulas',
  standalone: true,
  imports: [
    CommonModule,
    CabecalhoComponent,
    RodapeComponent,
    BotaoWhatsappComponent,
    WhatsappLeadModalComponent,
    WhatsappLeadPopupComponent,
  ],
  templateUrl: './aulas.html',
  styleUrl: './aulas.scss',
})
export class AulasComponent implements OnInit, OnDestroy {
  @ViewChild('heroRef', { static: true }) heroRef!: ElementRef;
  @ViewChild('metodologiaRef', { static: true }) metodologiaRef!: ElementRef;
  @ViewChild('publicoRef', { static: true }) publicoRef!: ElementRef;
  @ViewChild('formacoesRef', { static: true }) formacoesRef!: ElementRef;
  @ViewChild('tecnologiasRef', { static: true }) tecnologiasRef!: ElementRef;
  @ViewChild('valoresRef', { static: true }) valoresRef!: ElementRef;
  @ViewChild('ctaRef', { static: true }) ctaRef!: ElementRef;

  constructor(
    private readonly zone: NgZone,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  heroVisivel = false;
  metodologiaVisivel = false;
  publicoVisivel = false;
  formacoesVisivel = false;
  tecnologiasVisivel = false;
  valoresVisivel = false;
  ctaVisivel = false;

  private observadores: IntersectionObserver[] = [];

  publicoAlvo: PerfilPublico[] = [
    {
      icone: 'user-plus',
      titulo: 'Quem está começando do zero',
      descricao:
        'Sem experiência prévia com programação. Você aprende desde o pensamento lógico até construir aplicações completas, no seu ritmo.',
    },
    {
      icone: 'refresh-cw',
      titulo: 'Quem quer mudar de área',
      descricao:
        'Profissional de outra área buscando transição para tecnologia. O método estruturado acelera a curva de aprendizado e prepara para entrevistas reais.',
    },
    {
      icone: 'trending-up',
      titulo: 'Quem já programa e quer evoluir',
      descricao:
        'Desenvolvedor júnior ou pleno querendo aprofundar conhecimentos, aprender boas práticas de mercado e alcançar senioridade.',
    },
    {
      icone: 'briefcase',
      titulo: 'Quem quer abrir o próprio negócio',
      descricao:
        'Empreendedor ou freelancer que deseja desenvolver suas próprias soluções digitais com independência técnica e autonomia profissional.',
    },
  ];

  planos: Plano[] = [
    {
      titulo: 'Front-end Essencial',
      descricao:
        'Domine a construção de interfaces modernas, responsivas e acessíveis. Do HTML semântico ao React e Angular com TypeScript, você sai pronto para criar experiências visuais de alto nível.',
      totalModulos: 5,
      cargaHoraria: '~60 horas',
      nivel: 'Iniciante ao intermediário',
      destaque: false,
      resultadoFinal:
        'Portfólio com 3 projetos front-end completos, dominando HTML, CSS, JavaScript, TypeScript, React e Angular. Pronto para vagas de front-end júnior e pleno.',
      modulos: [
        {
          titulo: 'Fundamentos da Web',
          objetivo:
            'Compreender como a web funciona e construir páginas semânticas com HTML e CSS.',
          aulas: [
            'Como a internet funciona: cliente, servidor e protocolos',
            'HTML semântico e estrutura de documentos',
            'CSS: seletores, box model, flexbox e grid',
            'Responsividade e media queries',
            'Acessibilidade e boas práticas de marcação',
          ],
          projeto: 'Landing page responsiva e acessível para um produto fictício.',
          aberto: false,
        },
        {
          titulo: 'JavaScript Moderno',
          objetivo:
            'Dominar JavaScript do básico ao avançado, com foco em lógica de programação, manipulação do DOM e consumo de APIs.',
          aulas: [
            'Variáveis, tipos, operadores e estruturas de controle',
            'Funções, escopo, closures e arrow functions',
            'Arrays, objetos e desestruturação (ES6+)',
            'Manipulação del DOM: eventos, formulários e animações',
            'Promises, async/await e consumo de APIs REST',
          ],
          projeto: 'Dashboard interativo consumindo API pública (ex.: GitHub ou clima).',
          aberto: false,
        },
        {
          titulo: 'TypeScript & Tipagem Avançada',
          objetivo:
            'Trabalhar com TypeScript de forma fluente, garantindo código robusto, escalável e com menos erros em produção.',
          aulas: [
            'Tipos primitivos, interfaces e type aliases',
            'Generics, enums e union types',
            'Classes, herança e modificadores de acesso',
            'TypeScript com módulos e configuração do tsconfig',
            'Integração TypeScript em projetos existentes',
          ],
          projeto: 'Refatoração do projeto anterior para TypeScript completo.',
          aberto: false,
        },
        {
          titulo: 'React: Interfaces Reativas',
          objetivo:
            'Criar aplicações SPA com React, gerenciando estado, efeitos e navegação com as melhores práticas do ecossistema.',
          aulas: [
            'JSX, componentes funcionais e props',
            'Estado com useState e ciclo de vida com useEffect',
            'Gerenciamento global com Context API e useReducer',
            'React Router: navegação e rotas dinâmicas',
            'Consumo de APIs, loading states e tratamento de erros',
          ],
          projeto: 'Aplicação de e-commerce simples com catálogo, carrinho e autenticação mock.',
          aberto: false,
        },
        {
          titulo: 'Angular: Arquitetura Corporativa',
          objetivo:
            'Dominar o Angular para projetos enterprise: componentes, módulos, serviços, roteamento e formulários reativos.',
          aulas: [
            'Arquitetura Angular: módulos, componentes e serviços',
            'Data binding, diretivas e pipes',
            'Injeção de dependência e HTTPClient',
            'Formulários reativos e validações',
            'Roteamento avançado: guards, lazy loading e resolvers',
          ],
          projeto: 'Sistema de gestão (CRUD) com Angular, consumindo uma API REST.',
          aberto: false,
        },
      ],
    },
    {
      titulo: 'Back-end & APIs Profissional',
      descricao:
        'Aprenda a construir o coração das aplicações: APIs robustas, seguras e escaláveis. Domine Java, Node.js, bancos de dados e os padrões utilizados em grandes empresas.',
      totalModulos: 5,
      cargaHoraria: '~70 horas',
      nivel: 'Iniciante ao intermediário',
      destaque: false,
      resultadoFinal:
        'Portfólio com APIs REST completas em Java e Node.js, documentadas com Swagger, integradas a bancos relacionais e não relacionais. Perfil pronto para back-end júnior e pleno.',
      modulos: [
        {
          titulo: 'Lógica de Programação e Fundamentos',
          objetivo:
            'Construir base sólida em lógica de programação antes de mergulhar em linguagens específicas.',
          aulas: [
            'Pensamento computacional e algoritmos',
            'Estruturas de dados fundamentais: arrays, listas, filas e pilhas',
            'Recursão e complexidade algorítmica (Big O)',
            'Git e versionamento profissional',
            'Terminal Linux e ambientes virtuais',
          ],
          projeto: 'Implementação de algoritmos clássicos com testes unitários.',
          aberto: false,
        },
        {
          titulo: 'Java: Fundamentos e POO',
          objetivo:
            'Dominar Java com foco em orientação a objetos, os padrões mais cobrados em entrevistas e o ecossistema corporativo.',
          aulas: [
            'Tipos, operadores, controle de fluxo em Java',
            'POO: classes, objetos, herança, polimorfismo e encapsulamento',
            'Interfaces, classes abstratas e SOLID',
            'Collections Framework: List, Map, Set',
            'Tratamento de exceções e boas práticas',
          ],
          projeto: 'Sistema bancário em console com operações CRUD e regras de negócio.',
          aberto: false,
        },
        {
          titulo: 'Spring Boot: APIs em Produção',
          objetivo:
            'Criar APIs REST completas com Spring Boot, autenticação, documentação e testes — do jeito que o mercado exige.',
          aulas: [
            'Spring Boot: estrutura, configuração e camadas MVC',
            'JPA, Hibernate e relacionamentos entre entidades',
            'API RESTful: endpoints, verbos HTTP, status codes',
            'Segurança com Spring Security e JWT',
            'Documentação com Swagger e testes com JUnit',
          ],
          projeto: 'API REST completa de sistema de agendamentos com autenticação e documentação.',
          aberto: false,
        },
        {
          titulo: 'Node.js e JavaScript no Servidor',
          objetivo:
            'Construir backends modernos com Node.js, Express e TypeScript, aproveitando o ecossistema npm em projetos reais.',
          aulas: [
            'Node.js: event loop, módulos e npm',
            'Express.js: rotas, middlewares e tratamento de erros',
            'TypeScript no back-end e configuração profissional',
            'Autenticação com JWT e bcrypt',
            'Deploy no ambiente cloud (AWS Lambda ou Railway)',
          ],
          projeto: 'API de gerenciamento de tarefas (To-Do API) com autenticação e deploy.',
          aberto: false,
        },
        {
          titulo: 'Bancos de Dados: SQL e NoSQL',
          objetivo:
            'Modelar, criar e otimizar bancos de dados relacionais e não relacionais com segurança e performance.',
          aulas: [
            'Modelagem de dados: entidade-relacionamento e normalização',
            'SQL avançado: joins, subqueries, índices e transações',
            'PostgreSQL em produção: tuning e boas práticas',
            'MongoDB: documentos, collections e queries',
            'Migrations, seeds e gerenciamento de esquemas',
          ],
          projeto: 'Modelagem e implementação completa do banco de dados da API anterior.',
          aberto: false,
        },
      ],
    },
    {
      titulo: 'Mobile Development',
      descricao:
        'Crie aplicativos nativos e multiplataforma para iOS e Android com React Native e Flutter. Da lógica à publicação nas lojas, você aprende o ciclo completo de desenvolvimento mobile.',
      totalModulos: 4,
      cargaHoraria: '~50 horas',
      nivel: 'Intermediário',
      destaque: false,
      resultadoFinal:
        'Dois aplicativos mobile publicáveis: um em React Native e um em Flutter. Portfólio completo para vagas de mobile developer.',
      modulos: [
        {
          titulo: 'Fundamentos do Desenvolvimento Mobile',
          objetivo:
            'Entender as diferenças entre nativo, híbrido e multiplataforma, e configurar os ambientes de desenvolvimento.',
          aulas: [
            'Ecossistema mobile: iOS, Android, PWA e multiplataforma',
            'Configuração de ambiente: Android Studio e Xcode',
            'Expo vs. React Native CLI: quando usar cada um',
            'Componentes nativos vs. web: diferenças fundamentais',
            'Debugging e DevTools em ambiente mobile',
          ],
          projeto: 'App simples do zero com navegação e consumo de API.',
          aberto: false,
        },
        {
          titulo: 'React Native: Apps com JavaScript',
          objetivo:
            'Criar aplicativos React Native completos, com navegação nativa, gerenciamento de estado e integração com APIs.',
          aulas: [
            'Core components: View, Text, Image, ScrollView, FlatList',
            'Estilização com StyleSheet e Styled Components',
            'Navegação com React Navigation (stack, tab e drawer)',
            'Estado global com Zustand ou Redux Toolkit',
            'Notificações, câmera e recursos nativos com Expo',
          ],
          projeto: 'App de delivery com tela de produtos, carrinho e rastreamento.',
          aberto: false,
        },
        {
          titulo: 'Flutter & Dart: Performance Nativa',
          objetivo:
            'Desenvolver aplicativos de alta performance com Flutter, aproveitando o ecossistema Dart e widgets robustos.',
          aulas: [
            'Dart: tipos, funções, classes e assincronismo',
            'Widgets stateless e stateful',
            'Gerenciamento de estado com Provider e Riverpod',
            'Navegação, rotas e deep linking',
            'Animações, temas e responsividade',
          ],
          projeto: 'App de finanças pessoais com gráficos e notificações.',
          aberto: false,
        },
        {
          titulo: 'Deploy e Publicação nas Lojas',
          objetivo:
            'Preparar, configurar e publicar aplicativos na Google Play Store e Apple App Store com as melhores práticas.',
          aulas: [
            'Configurações de build para produção',
            'Certificados, permissões e políticas das lojas',
            'CI/CD para mobile com GitHub Actions ou Fastlane',
            'Monitoramento com Firebase Crashlytics',
            'ASO: otimização de visibilidade nas lojas',
          ],
          projeto:
            'Publicação de um dos projetos anteriores na Play Store (modo internal testing).',
          aberto: false,
        },
      ],
    },
    {
      titulo: 'Formação Full Stack & Cloud Completa',
      descricao:
        'A formação mais completa do portfólio. Você percorre do front-end ao back-end, mobile, infraestrutura em nuvem, análise de dados e IA aplicada — exatamente como funciona em projetos reais de alta escala. Cada módulo entrega um projeto para o seu portfólio.',
      totalModulos: 10,
      cargaHoraria: '~200 horas',
      nivel: 'Iniciante ao avançado',
      destaque: true,
      resultadoFinal:
        'Portfólio completo com 10+ projetos reais. Domínio de front-end, back-end, mobile, cloud, dados e IA. Perfil competitivo para vagas júnior-pleno e renda como freelancer. Certificado de conclusão.',
      modulos: [
        {
          titulo: 'Fundamentos & Ambiente Profissional',
          objetivo:
            'Configurar o ambiente de desenvolvimento e dominar as ferramentas utilizadas por todo time de tecnologia.',
          aulas: [
            'Pensamento computacional e lógica de programação',
            'Terminal Linux: navegação, scripts e produtividade',
            'Git e GitHub: commits, branches, pull requests e merge',
            'Versionamento semântico e conventional commits',
            'Organização profissional: IDEs, extensões e workflows',
          ],
          projeto: 'Repositório público no GitHub com histórico de commits profissional.',
          aberto: false,
        },
        {
          titulo: 'Front-end: HTML, CSS e Design System',
          objetivo:
            'Construir interfaces semânticas, responsivas e acessíveis, com base em design systems profissionais.',
          aulas: [
            'HTML semântico e acessibilidade (WCAG)',
            'CSS avançado: Flexbox, Grid e variáveis CSS',
            'Responsividade e mobile-first',
            'Design systems: tokens, componentes e documentação',
            'Performance web: Core Web Vitals e otimização',
          ],
          projeto: 'Landing page de produto com design system próprio.',
          aberto: false,
        },
        {
          titulo: 'JavaScript & TypeScript Avançado',
          objetivo:
            'Dominar JavaScript moderno e TypeScript com foco em código escalável, testável e de alta qualidade.',
          aulas: [
            'ES2022+: optional chaining, nullish coalescing, top-level await',
            'Padrões de design: Factory, Observer, Strategy e Module',
            'Programação funcional em JavaScript',
            'TypeScript avançado: generics, conditional types e utility types',
            'Testes unitários com Vitest e cobertura de código',
          ],
          projeto: 'Biblioteca de utilitários TypeScript documentada e publicada no npm.',
          aberto: false,
        },
        {
          titulo: 'React & Angular: Frameworks Profissionais',
          objetivo:
            'Criar SPAs completas com React e Angular, com state management, roteamento avançado e arquitetura escalável.',
          aulas: [
            'React avançado: hooks customizados, performance e memoização',
            'Gerenciamento de estado: Zustand, Redux Toolkit e Context',
            'Angular: arquitetura modular, signals e standalone components',
            'Formulários reativos e validações complexas',
            'Micro-frontends: conceitos e implementação básica',
          ],
          projeto: 'Plataforma SaaS simples com dashboard, autenticação e multi-tenant UI.',
          aberto: false,
        },
        {
          titulo: 'Back-end com Java Spring Boot',
          objetivo:
            'Desenvolver APIs enterprise-grade com Spring Boot, seguindo os padrões utilizados em grandes bancos e fintechs.',
          aulas: [
            'Arquitetura hexagonal e Clean Architecture',
            'Spring Boot: controllers, services, repositories e DTOs',
            'Segurança: Spring Security, OAuth2 e JWT',
            'Cache com Redis e filas com RabbitMQ',
            'Testes de integração e TDD com JUnit e Mockito',
          ],
          projeto: 'API financeira com autenticação, controle de acesso e testes de integração.',
          aberto: false,
        },
        {
          titulo: 'Back-end com Node.js e Python',
          objetivo:
            'Ampliar o repertório back-end com Node.js e Python, cobrindo microsserviços, workers e automações.',
          aulas: [
            'Node.js avançado: streams, workers e event loop',
            'NestJS: arquitetura modular e decoradores',
            'Python: fundamentos, libs e FastAPI',
            'Microsserviços: comunicação síncrona e assíncrona',
            'WebSockets e eventos em tempo real',
          ],
          projeto: 'Microsserviço de notificações em tempo real com WebSocket.',
          aberto: false,
        },
        {
          titulo: 'Banco de Dados: SQL, NoSQL e Modelagem',
          objetivo:
            'Modelar, implementar e otimizar sistemas de persistência para diferentes cenários de negócio.',
          aulas: [
            'Modelagem avançada: DER, normalização e desnormalização',
            'PostgreSQL: funções, triggers, particionamento e tuning',
            'MongoDB avançado: aggregations e transactions',
            'Redis: cache, sessões e pub/sub',
            'Estratégias de migração e backup em produção',
          ],
          projeto: 'Modelagem completa de sistema e-commerce com múltiplos bancos de dados.',
          aberto: false,
        },
        {
          titulo: 'Cloud & DevOps com AWS e Terraform',
          objetivo:
            'Implantar e gerenciar infraestrutura em nuvem com infraestrutura como código, CI/CD e monitoramento.',
          aulas: [
            'AWS: EC2, S3, RDS, Lambda, API Gateway e IAM',
            'Terraform: IaC, workspaces e módulos reutilizáveis',
            'Docker: containers, imagens e Docker Compose',
            'CI/CD com GitHub Actions: build, test, deploy automatizado',
            'Observabilidade: logs, métricas e alertas com CloudWatch',
          ],
          projeto:
            'Deploy completo de aplicação full stack na AWS com pipeline CI/CD automatizado.',
          aberto: false,
        },
        {
          titulo: 'Análise de Dados & Business Intelligence',
          objetivo:
            'Extrair insights de dados com Python, SQL e ferramentas de BI para suportar decisões de negócio.',
          aulas: [
            'Python para dados: Pandas, NumPy e Matplotlib',
            'SQL analítico: window functions, CTEs e otimização',
            'ETL: extração, transformação e carga de dados',
            'Visualização: Power BI, dashboards e storytelling',
            'Fundamentos de estatística aplicada a negócios',
          ],
          projeto: 'Dashboard analítico com dados reais de vendas ou redes sociais.',
          aberto: false,
        },
        {
          titulo: 'Inteligência Artificial Aplicada à Produtividade',
          objetivo:
            'Integrar IA em fluxos de trabalho e aplicações, aumentando produtividade e entregando features diferenciadas.',
          aulas: [
            'LLMs e APIs de IA: OpenAI, Gemini e Claude',
            'Prompt engineering e técnicas avançadas (RAG, CoT)',
            'Integração de IA em aplicações back-end e front-end',
            'Automação de tarefas com agentes de IA',
            'Ética, LGPD e boas práticas com dados e IA',
          ],
          projeto: 'Assistente inteligente integrado à aplicação full stack desenvolvida no curso.',
          aberto: false,
        },
      ],
    },
  ];

  tecnologias: string[] = [
    'Java',
    'Spring Boot',
    'Python',
    'FastAPI',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'NestJS',
    'HTML5',
    'CSS3',
    'React',
    'Angular',
    'React Native',
    'Flutter',
    'Dart',
    'SQL',
    'PostgreSQL',
    'MySQL',
    'MongoDB',
    'Redis',
    'RabbitMQ',
    'AWS',
    'Lambda',
    'S3',
    'EC2',
    'Terraform',
    'Docker',
    'Git',
    'GitHub Actions',
    'CI/CD',
    'Linux',
    'Pandas',
    'Power BI',
    'OpenAI API',
    'Swagger',
    'JUnit',
    'Vitest',
    'UML',
    'BPMN',
    'SOLID',
    'Clean Architecture',
  ];

  opcoesPrecificacao: OpcaoPrecificacao[] = [
    {
      tipo: 'Individual avulsa',
      preco: 150,
      descricao: 'Aula individual por demanda, sem compromisso de módulo completo.',
      itens: [
        'Aula de 1h de duração',
        'Material complementar incluso',
        'Exercícios para casa',
        'Suporte pós-aula por chat',
        'Flexibilidade de horário',
      ],
    },
    {
      tipo: 'Individual — módulo',
      preco: 130,
      badge: 'Mais popular',
      destaque: true,
      descricao: 'Módulo completo com aulas individuais, projeto entregável e acompanhamento.',
      itens: [
        'Todas as aulas do módulo',
        'Projeto entregável para portfólio',
        'Feedback de código personalizado',
        'Suporte prioritário por chat',
        'Material de referência exclusivo',
      ],
    },
    {
      tipo: 'Grupo avulso',
      preco: 120,
      descricao: 'Aula avulsa em grupo. Ideal para turmas, bootcamps e empresas. Mín. 10 alunos.',
      itens: [
        'Aula de 1h30 de duração',
        'Dinâmica interativa em grupo',
        'Material complementar para todos',
        'Exercícios para casa',
        'Gravação da aula disponível',
      ],
    },
    {
      tipo: 'Grupo — módulo',
      preco: 110,
      descricao:
        'Módulo completo em grupo com projeto colaborativo. Máximo aproveitamento por aluno. Mín. 10 alunos.',
      itens: [
        'Todas as aulas do módulo',
        'Projeto colaborativo em equipe',
        'Dinâmica com revisão de código',
        'Gravação de todas as aulas',
        'Certificado de conclusão de módulo',
      ],
    },
  ];

  ngOnInit() {
    this.configurarTitulo();

    if (!('IntersectionObserver' in window)) {
      this.heroVisivel = true;
      this.metodologiaVisivel = true;
      this.publicoVisivel = true;
      this.formacoesVisivel = true;
      this.tecnologiasVisivel = true;
      this.valoresVisivel = true;
      this.ctaVisivel = true;
      return;
    }

    const opcoes: IntersectionObserverInit = { threshold: 0.1 };
    this.observarSecao(this.heroRef, () => (this.heroVisivel = true), opcoes);
    this.observarSecao(this.metodologiaRef, () => (this.metodologiaVisivel = true), opcoes);
    this.observarSecao(this.publicoRef, () => (this.publicoVisivel = true), opcoes);
    this.observarSecao(this.formacoesRef, () => (this.formacoesVisivel = true), opcoes);
    this.observarSecao(this.tecnologiasRef, () => (this.tecnologiasVisivel = true), opcoes);
    this.observarSecao(this.valoresRef, () => (this.valoresVisivel = true), opcoes);
    this.observarSecao(this.ctaRef, () => (this.ctaVisivel = true), opcoes);
  }

  private configurarTitulo() {
    const title = document.querySelector('title');
    if (title) {
      title.textContent = 'Aulas e Cursos de Desenvolvimento — Lorrane.dev';
    }
  }

  private observarSecao(ref: ElementRef, callback: () => void, opcoes: IntersectionObserverInit) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.zone.run(() => {
            callback();
            this.cdr.markForCheck();
          });
          obs.unobserve(entry.target);
        }
      });
    }, opcoes);
    obs.observe(ref.nativeElement);
    this.observadores.push(obs);
  }

  alternarModulo(indicePlano: number, indiceModulo: number) {
    const modulo = this.planos[indicePlano].modulos[indiceModulo];
    modulo.aberto = !modulo.aberto;
  }

  ngOnDestroy() {
    this.observadores.forEach((obs) => obs.disconnect());
  }
}
