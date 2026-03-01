import {
  AfterViewInit,
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
  premium?: boolean;
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
export class AulasComponent implements OnInit, AfterViewInit, OnDestroy {
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

  planosExpandidos: boolean[] = [];
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
      titulo: 'Formação Full Stack & Cloud Completa',
      descricao:
        'A formação mais completa e estruturante do portfólio. Percorre front-end, back-end, mobile, cloud, dados, IA e arquitetura de sistemas. No front-end você escolhe entre React ou Angular. Se optar por Angular, o módulo de mobile será com Flutter. Cada módulo entrega um projeto real para o portfólio.',
      totalModulos: 16,
      cargaHoraria: '~400 horas',
      nivel: 'Iniciante ao avançado',
      destaque: true,
      resultadoFinal:
        'Ao concluir a formação completa, você domina múltiplas stacks e desenvolve maturidade técnica para atuar com autonomia, visão arquitetural e tomada de decisão estratégica. Portfólio com 16+ projetos reais cobrindo front-end, back-end, mobile, cloud, dados, IA, arquitetura, testes, segurança e observabilidade.',
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
          titulo: 'Front-end Framework: React ou Angular (sua escolha)',
          objetivo:
            'Criar SPAs completas com o framework de sua escolha, React ou Angular, com state management, roteamento avançado e arquitetura escalável.',
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
        {
          titulo: 'Arquitetura de Software Avançada',
          objetivo:
            'Projetar sistemas escaláveis e resilientes com padrões arquiteturais usados em empresas de grande porte.',
          aulas: [
            'Domain-Driven Design (DDD): bounded contexts, aggregates e value objects',
            'CQRS: separação de comandos e consultas para escalabilidade',
            'Event-driven architecture: eventos de domínio e de integração',
            'Microsserviços vs Monolito: trade-offs e estratégias de migração',
            'Saga Pattern: consistência eventual em transações distribuídas',
            'Idempotência e resiliência: circuit breaker, retry e bulkhead',
          ],
          projeto:
            'Refatoração de um módulo da aplicação full stack para arquitetura DDD com eventos de domínio.',
          aberto: false,
        },
        {
          titulo: 'Testes, Qualidade e Code Review',
          objetivo:
            'Construir suítes de testes abrangentes e estabelecer uma cultura de qualidade contínua.',
          aulas: [
            'TDD e BDD: desenvolvimento guiado por testes e comportamento',
            'Testes E2E com Cypress e Playwright: fluxos críticos do usuário',
            'Testes de contrato com Pact: garantindo compatibilidade entre serviços',
            'Testes de carga e stress com k6: limites de performance em produção',
            'Testcontainers: testes de integração com infraestrutura real',
            'Code review profissional: métricas de qualidade, coverage e code smells',
          ],
          projeto:
            'Suíte de testes completa (unitários, integração, E2E e carga) para a API desenvolvida no curso.',
          aberto: false,
        },
        {
          titulo: 'Segurança de Aplicações',
          objetivo:
            'Identificar e corrigir vulnerabilidades seguindo os padrões OWASP e boas práticas de segurança enterprise.',
          aulas: [
            'OWASP Top 10: as vulnerabilidades mais críticas e como mitigá-las',
            'XSS, CSRF e CORS: exploração, proteção e configuração segura',
            'Rate limiting, secure headers e HTTPS obrigatório',
            'Logs de auditoria e rastreabilidade de ações do usuário',
            'Secrets Manager: gestão segura de credenciais na cloud',
            'Segurança em pipelines CI/CD: SAST, DAST e dependency scanning',
          ],
          projeto:
            'Auditoria de segurança da aplicação full stack com relatório de vulnerabilidades e plano de correção.',
          aberto: false,
        },
        {
          titulo: 'Observabilidade e SRE',
          objetivo:
            'Monitorar, rastrear e diagnosticar problemas em sistemas distribuídos em produção com as ferramentas do mercado.',
          aulas: [
            'Os três pilares da observabilidade: logs, métricas e traces',
            'OpenTelemetry: instrumentação agnóstica de plataforma',
            'Prometheus: coleta de métricas, alertas e regras de gravação',
            'Grafana: dashboards operacionais e visualização de dados',
            'Distributed tracing: rastreamento de requisições entre microsserviços',
            'SLIs, SLOs e SLAs: práticas de Site Reliability Engineering',
          ],
          projeto:
            'Stack de observabilidade completa (Prometheus + Grafana + OpenTelemetry) integrada à aplicação.',
          aberto: false,
        },
        {
          titulo: 'UX/UI para Desenvolvedores',
          objetivo:
            'Criar interfaces que funcionam para o usuário com base em fundamentos de UX, design thinking e acessibilidade.',
          aulas: [
            'Fundamentos de UX: jornada do usuário e heurísticas de usabilidade de Nielsen',
            'Design thinking: empatia, definição, ideação e prototipação',
            'Wireframes e prototipação navegável com Figma',
            'Acessibilidade WCAG: diretrizes e implementação prática',
            'Design systems: criação de tokens, componentes e documentação',
            'UI moderna: tipografia, cor, espaçamento e hierarquia visual',
          ],
          projeto:
            'Protótipo navegável no Figma com design system documentado para a aplicação do curso.',
          aberto: false,
        },
        {
          titulo: 'Mercado, Carreira e Empregabilidade',
          objetivo:
            'Posicionar-se estrategicamente no mercado de tecnologia para vagas CLT, PJ ou como freelancer.',
          aulas: [
            'Como montar um currículo tech que passa pelo ATS',
            'LinkedIn estratégico: perfil completo, network e produção de conteúdo',
            'Simulação de entrevista técnica: live coding e soft skills',
            'System Design Interview: como responder perguntas de arquitetura',
            'Negociação salarial: diferenças CLT vs PJ e como negociar',
            'Freelancing: precificação, contratos e posicionamento de marca pessoal',
          ],
          projeto:
            'Portfólio publicado, currículo otimizado, LinkedIn revisado e simulação de entrevista gravada.',
          aberto: false,
        },
      ],
    },
    {
      titulo: 'Front-end Essencial',
      descricao:
        'Domine a construção de interfaces modernas, responsivas e acessíveis. Do HTML semântico ao TypeScript, você escolhe o framework: React ou Angular. Sai pronto para criar experiências visuais de alto nível.',
      totalModulos: 6,
      cargaHoraria: '~75 horas',
      nivel: 'Iniciante ao intermediário',
      destaque: false,
      resultadoFinal:
        'Portfólio com projetos front-end completos, dominando HTML, CSS, JavaScript, TypeScript, React ou Angular, UX/UI e acessibilidade. Pronto para vagas de front-end júnior e pleno.',
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
            'Manipulação do DOM: eventos, formulários e animações',
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
        {
          titulo: 'UX/UI Profissional e Acessibilidade',
          objetivo:
            'Projetar e implementar interfaces centradas no usuário com Figma, design systems, heurísticas de usabilidade e padrões de acessibilidade.',
          aulas: [
            'Fundamentos de UX: pesquisa, jornada do usuário e personas',
            'Heurísticas de Nielsen e avaliação de usabilidade',
            'Design thinking: empatia, definição, ideação e prototipação',
            'Wireframes e protótipos navegáveis com Figma',
            'Acessibilidade WCAG 2.1: critérios, testes e implementação',
            'Design systems: tokens de design, componentes e documentação viva',
            'UI moderna: tipografia, paleta de cores, espaçamento e hierarquia',
          ],
          projeto:
            'Redesign com protótipo Figma, design system documentado e auditoria de acessibilidade do projeto do curso.',
          aberto: false,
        },
      ],
    },
    {
      titulo: 'Back-end & APIs Profissional',
      descricao:
        'Aprenda a construir o coração das aplicações: APIs robustas, seguras e escaláveis. Domine Java, Node.js, bancos de dados e os padrões utilizados em grandes empresas.',
      totalModulos: 7,
      cargaHoraria: '~90 horas',
      nivel: 'Iniciante ao intermediário',
      destaque: false,
      resultadoFinal:
        'Portfólio com APIs REST completas em Java e Node.js, documentadas com Swagger, cobertas por testes automatizados, seguras e com arquitetura orientada a domínio. Perfil pronto para back-end júnior e pleno.',
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
            'Criar APIs REST completas com Spring Boot, autenticação, documentação e testes, do jeito que o mercado exige.',
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
        {
          titulo: 'Arquitetura Avançada de Back-end',
          objetivo:
            'Projetar APIs e sistemas back-end com os padrões arquiteturais exigidos em empresas de médio e grande porte.',
          aulas: [
            'Clean Architecture aprofundada: camadas, dependências e regras',
            'Domain-Driven Design (DDD): entities, aggregates e repositórios',
            'CQRS: separação de leitura e escrita para escalabilidade',
            'Event-driven: publicação e consumo de eventos com Kafka ou RabbitMQ',
            'Microsserviços: decomposição, comunicação e deploy independente',
            'Saga Pattern e idempotência em transações distribuídas',
          ],
          projeto:
            'Refatoração da API do curso para Clean Architecture com DDD e comunicação por eventos.',
          aberto: false,
        },
        {
          titulo: 'Testes Avançados e Segurança de APIs',
          objetivo:
            'Garantir qualidade e segurança das APIs com testes automatizados abrangentes e proteção contra as principais vulnerabilidades.',
          aulas: [
            'TDD e BDD com JUnit, Mockito e Cucumber',
            'Testes E2E de APIs com Playwright API e RestAssured',
            'Testes de contrato com Pact: compatibilidade entre serviços',
            'Testes de carga com k6: identificando gargalos em produção',
            'OWASP Top 10 para APIs: SQL Injection, Auth quebrada e exposição de dados',
            'Rate limiting, secure headers, logs de auditoria e gestão de secrets',
          ],
          projeto:
            'Suíte completa de testes (unitários, integração, contrato e carga) e relatório de vulnerabilidades da API.',
          aberto: false,
        },
      ],
    },
    {
      titulo: 'Mobile Development',
      descricao:
        'Crie aplicativos multiplataforma para iOS e Android. Você escolhe o framework: React Native (com JavaScript) ou Flutter (com Dart). Do zero ao app publicado nas lojas, você aprende o ciclo completo de desenvolvimento mobile.',
      totalModulos: 3,
      cargaHoraria: '~50 horas',
      nivel: 'Intermediário',
      destaque: false,
      resultadoFinal:
        'App mobile publicável com o framework de sua escolha: React Native ou Flutter. Portfólio completo para vagas de mobile developer.',
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
          titulo: 'React Native ou Flutter: sua escolha',
          objetivo:
            'Desenvolver um aplicativo completo com o framework escolhido, do zero ao app funcional com navegação, estado e consumo de API.',
          aulas: [
            'React Native: componentes, StyleSheet e React Navigation',
            'Flutter: widgets, Dart e gerenciamento de estado com Provider',
            'Consumo de APIs REST no mobile',
            'Estado global: Zustand (React Native) ou Riverpod (Flutter)',
            'Notificações, câmera e recursos nativos',
          ],
          projeto: 'App completo com navegação, consumo de API e tela de perfil.',
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
      titulo: 'Análise de Dados & Business Intelligence',
      descricao:
        'Aprenda a extrair insights de dados com Python, SQL e ferramentas de BI. Do tratamento de dados à visualização em dashboards, você passa a tomar decisões baseadas em dados e a entregar valor analítico para o negócio.',
      totalModulos: 4,
      cargaHoraria: '~50 horas',
      nivel: 'Iniciante ao intermediário',
      destaque: false,
      resultadoFinal:
        'Portfólio com projetos de análise de dados reais, domínio de Python para dados, SQL analítico e dashboards no Power BI. Pronto para vagas de analista de dados júnior.',
      modulos: [
        {
          titulo: 'Python para Dados',
          objetivo:
            'Dominar as principais bibliotecas Python para manipulação, análise e visualização de dados.',
          aulas: [
            'Python: fundamentos, estruturas de dados e funções',
            'Pandas: DataFrames, limpeza e transformação de dados',
            'NumPy: arrays, operações vetoriais e estatística descritiva',
            'Matplotlib e Seaborn: gráficos e visualização exploratória',
            'Tratamento de dados faltantes e outliers',
          ],
          projeto: 'Análise exploratória de um dataset real com relatório em Jupyter Notebook.',
          aberto: false,
        },
        {
          titulo: 'SQL Analítico',
          objetivo:
            'Escrever queries avançadas para extração e análise de dados em bancos relacionais.',
          aulas: [
            'Revisão de SQL: joins, subqueries e agregações',
            'Window functions: ROW_NUMBER, RANK, LAG e LEAD',
            'CTEs e queries recursivas',
            'Otimização de queries e leitura de plano de execução',
            'PostgreSQL para análise: extensions e funções analíticas',
          ],
          projeto: 'Relatório analítico completo de um sistema de vendas usando apenas SQL.',
          aberto: false,
        },
        {
          titulo: 'ETL: Pipelines de Dados',
          objetivo:
            'Construir pipelines de extração, transformação e carga de dados de fontes diversas.',
          aulas: [
            'O que é ETL e como aplicar na prática',
            'Consumo de APIs e arquivos (CSV, JSON, Excel)',
            'Automação de pipelines com Python',
            'Introdução a data warehouses e data lakes',
            'Agendamento de tarefas e monitoramento de pipelines',
          ],
          projeto:
            'Pipeline automatizado que coleta, transforma e carrega dados de uma API pública.',
          aberto: false,
        },
        {
          titulo: 'Visualização e Business Intelligence',
          objetivo:
            'Criar dashboards e relatórios que comunicam insights de forma clara para diferentes públicos.',
          aulas: [
            'Storytelling com dados: princípios e boas práticas',
            'Power BI: modelagem, relacionamentos e DAX',
            'Criação de dashboards interativos e relatórios',
            'Métricas e KPIs: como definir e monitorar',
            'Apresentação de resultados para área de negócios',
          ],
          projeto: 'Dashboard interativo no Power BI com dados reais de vendas ou redes sociais.',
          aberto: false,
        },
      ],
    },
    {
      titulo: 'Inteligência Artificial Aplicada',
      descricao:
        'Entenda como a IA funciona na prática e aprenda a integrá-la em aplicações reais. Do uso de APIs de LLMs à engenharia de prompts e automação de tarefas, você sai preparado para usar IA como diferencial no seu trabalho.',
      totalModulos: 3,
      cargaHoraria: '~35 horas',
      nivel: 'Iniciante ao intermediário',
      destaque: false,
      resultadoFinal:
        'Portfólio com projetos que integram IA em aplicações reais. Domínio de APIs de LLMs, prompt engineering e automação de tarefas com agentes. Diferencial imediato no mercado.',
      modulos: [
        {
          titulo: 'Fundamentos de IA e LLMs',
          objetivo:
            'Entender como os modelos de linguagem funcionam e como consumi-los via API em projetos reais.',
          aulas: [
            'Como funcionam os LLMs: tokens, contexto e temperatura',
            'APIs de IA: OpenAI, Google Gemini e Anthropic Claude',
            'Autenticação, limites de uso e boas práticas de segurança',
            'Tipos de modelos: chat, completions, embeddings e visão',
            'Casos de uso reais no desenvolvimento de software',
          ],
          projeto: 'Integração de uma API de LLM em uma aplicação web simples.',
          aberto: false,
        },
        {
          titulo: 'Prompt Engineering e RAG',
          objetivo:
            'Criar prompts eficientes e construir sistemas que combinam IA com bases de conhecimento próprias.',
          aulas: [
            'Técnicas de prompt: zero-shot, few-shot e chain-of-thought',
            'Estruturação de system prompts e personas',
            'RAG (Retrieval-Augmented Generation): conceito e implementação',
            'Embeddings e busca semântica com vetores',
            'Avaliação e iteração de prompts',
          ],
          projeto: 'Chatbot com RAG que responde perguntas a partir de documentos próprios.',
          aberto: false,
        },
        {
          titulo: 'Automação e Agentes de IA',
          objetivo:
            'Construir agentes e automações que usam IA para executar tarefas com autonomia.',
          aulas: [
            'O que são agentes de IA e como funcionam',
            'Function calling e ferramentas personalizadas',
            'Automação de tarefas repetitivas com IA',
            'Otimização de fluxo de trabalho com agentes',
            'Ética, LGPD e limites do uso de IA',
          ],
          projeto: 'Agente de IA que automatiza uma tarefa do dia a dia de desenvolvimento.',
          aberto: false,
        },
      ],
    },
    {
      titulo: 'Cloud & AWS na Prática',
      descricao:
        'Aprenda a colocar aplicações em produção na AWS com segurança, escalabilidade e boas práticas de DevOps. Do deploy manual à infraestrutura como código, você passa a entender como o mercado lida com cloud.',
      totalModulos: 6,
      cargaHoraria: '~65 horas',
      nivel: 'Intermediário',
      destaque: false,
      resultadoFinal:
        'Portfólio com aplicação deployada na AWS com Terraform, pipeline CI/CD, stack de observabilidade completa (Prometheus + Grafana + OpenTelemetry) e práticas de Cloud avançado. Pronto para vagas de DevOps e SRE júnior.',
      modulos: [
        {
          titulo: 'Fundamentos de Cloud e AWS',
          objetivo: 'Entender os conceitos de computação em nuvem e os principais serviços da AWS.',
          aulas: [
            'O que é cloud computing: IaaS, PaaS e SaaS',
            'Regiões, zonas de disponibilidade e latência',
            'IAM: usuários, roles, policies e boas práticas de segurança',
            'EC2: instâncias, tipos, key pairs e security groups',
            'S3: buckets, permissões, versionamento e hospedagem estática',
          ],
          projeto: 'Hospedagem de site estático no S3 com domínio e HTTPS via CloudFront.',
          aberto: false,
        },
        {
          titulo: 'Serviços Gerenciados e Serverless',
          objetivo:
            'Utilizar serviços gerenciados da AWS para reduzir overhead operacional e escalar com eficiência.',
          aulas: [
            'RDS: banco de dados gerenciado, backups e réplicas',
            'Lambda: funções serverless, triggers e limites',
            'API Gateway: criação e gestão de APIs REST na AWS',
            'SQS e SNS: filas e notificações assíncronas',
            'ElastiCache (Redis) e CloudFront para performance',
          ],
          projeto: 'API serverless com Lambda, API Gateway e RDS integrados.',
          aberto: false,
        },
        {
          titulo: 'Infraestrutura como Código com Terraform',
          objetivo:
            'Provisionar e gerenciar infraestrutura AWS de forma reproduzível usando Terraform.',
          aulas: [
            'Conceitos de IaC: por que automatizar infraestrutura',
            'Terraform: providers, resources, variables e outputs',
            'State management: local e remoto (S3 + DynamoDB)',
            'Módulos reutilizáveis e workspaces',
            'Destroy, plan e apply com segurança',
          ],
          projeto: 'Infraestrutura completa de uma aplicação web provisionada via Terraform.',
          aberto: false,
        },
        {
          titulo: 'CI/CD e Observabilidade',
          objetivo:
            'Automatizar deploys e monitorar aplicações em produção com as ferramentas do mercado.',
          aulas: [
            'GitHub Actions: workflows, jobs e secrets',
            'Pipeline CI/CD: build, test e deploy automatizado',
            'Docker na AWS: ECR e ECS básico',
            'CloudWatch: logs, métricas e alarmes',
            'Estratégias de deploy: blue/green e rolling update',
          ],
          projeto: 'Pipeline CI/CD completo que faz deploy automático na AWS a cada push.',
          aberto: false,
        },
        {
          titulo: 'Cloud Avançado e Kubernetes',
          objetivo:
            'Dominar recursos avançados de infraestrutura AWS e os fundamentos de orquestração de containers com Kubernetes.',
          aulas: [
            'VPC: subnetting, route tables, NAT Gateway e peering',
            'Load Balancer: ALB, NLB e target groups para alta disponibilidade',
            'Auto Scaling: políticas, métricas e configuração de grupos',
            'Kubernetes: pods, deployments, services e namespaces',
            'Secrets Manager e Parameter Store: gestão segura de configurações',
            'Otimização de custos AWS: Reserved Instances, Savings Plans e rightsizing',
          ],
          projeto:
            'Infraestrutura com VPC customizada, Auto Scaling e cluster Kubernetes básico provisionado via Terraform.',
          aberto: false,
        },
        {
          titulo: 'Observabilidade com OpenTelemetry e Grafana',
          objetivo:
            'Implementar observabilidade completa em aplicações cloud com os padrões open source do mercado.',
          aulas: [
            'Os três pilares da observabilidade: logs, métricas e traces',
            'OpenTelemetry: instrumentação automática e manual de aplicações',
            'Prometheus: coleta de métricas, alertas e regras de agregação',
            'Grafana: criação de dashboards e alertas operacionais',
            'Distributed tracing: rastreamento ponta a ponta entre serviços',
            'SLIs, SLOs e error budgets: práticas de SRE na AWS',
          ],
          projeto:
            'Stack de observabilidade completa integrada à aplicação na AWS com alertas configurados.',
          aberto: false,
        },
      ],
    },
    {
      titulo: 'Engenharia de Software & Arquitetura de Sistemas',
      descricao:
        'A formação mais estratégica do portfólio. Parte do zero e avança até o nível arquitetural, cobrindo UX estratégico, modelagem avançada, engenharia de requisitos, metodologias ágeis, padrões de projeto, system design e governança enterprise. Equivalente a uma graduação moderna em Engenharia de Software, com foco prático e projetos reais em cada módulo. Para quem quer atuar como Analista de Sistemas, Engenheiro de Software, Tech Lead ou Arquiteto Júnior em empresas de médio e grande porte.',
      totalModulos: 7,
      cargaHoraria: '~110 horas',
      nivel: 'Iniciante estruturado ao arquitetural',
      destaque: false,
      premium: true,
      resultadoFinal:
        'Portfólio com 7 projetos entregáveis: protótipo Figma validado, modelagem arquitetural completa, SRS com BDD, board ágil configurado, sistema refatorado com padrões de projeto, desenho de system design com C4 e repositório de governança com RFC e ADRs. Perfil pronto para Analista de Sistemas, Engenheiro de Software, Tech Lead e Arquiteto Júnior.',
      modulos: [
        {
          titulo: 'UX Estratégico & Product Thinking',
          objetivo:
            'Desenvolver visão de produto centrada no usuário antes de qualquer linha de código, aplicando UX estratégico, design thinking e prototipação validada.',
          aulas: [
            'Fundamentos de UX: o que é experiência do usuário e por que importa no desenvolvimento',
            'Design Thinking: empatia, definição, ideação, prototipação e teste',
            'Personas e jornada do usuário: mapeamento de comportamentos e pontos de dor',
            'Wireframes e prototipação navegável com Figma: do rascunho ao protótipo clicável',
            'Heurísticas de Nielsen: 10 princípios e como aplicá-los em auditorias',
            'Testes de usabilidade: moderados, não moderados e análise de resultados',
            'Acessibilidade WCAG 2.1: critérios de sucesso e implementação prática',
            'UX para produtos B2B vs B2C: diferenças estratégicas de design e fluxo',
          ],
          projeto:
            'Prototipação navegável validada no Figma de um sistema real, com personas, jornada do usuário, wireframes e relatório de teste de usabilidade.',
          aberto: false,
        },
        {
          titulo: 'Modelagem Avançada de Sistemas',
          objetivo:
            'Comunicar arquitetura, comportamento e processos de sistemas com precisão, usando as notações padronizadas do mercado enterprise.',
          aulas: [
            'UML completa: Classes, Sequência, Componentes, Implantação e Casos de Uso',
            'Modelagem C4: contexto, container, componente e código com visão progressiva',
            'BPMN: modelagem de processos de negócio com notação padronizada',
            'Integração entre UML, C4 e BPMN: quando e como usar cada notação',
            'Modelagem de APIs com OpenAPI/Swagger: contratos antes da implementação',
            'Diagramas com mensageria assíncrona: filas, tópicos e eventos de integração',
            'Event Storming: descoberta colaborativa de domínio com stakeholders',
            'DDD estratégico: bounded contexts, context maps e linguagem ubíqua',
          ],
          projeto:
            'Modelagem completa de um sistema real: diagramas UML, C4, BPMN, contrato OpenAPI e event storming documentados em repositório público.',
          aberto: false,
        },
        {
          titulo: 'Engenharia de Requisitos & Product Discovery',
          objetivo:
            'Descobrir, estruturar e validar requisitos conectando visão de negócio, UX e especificação técnica com as técnicas mais usadas em times de produto.',
          aulas: [
            'Tipos de requisitos: funcionais, não funcionais, de domínio e restrições',
            'Técnicas de levantamento: entrevistas, workshops, prototipação e shadowing',
            'Personas aplicadas a requisitos: conectando UX e especificação técnica',
            'Jornada do usuário como fonte de requisitos: do comportamento ao critério de aceite',
            'User Stories e BDD: Given/When/Then e critérios de aceitação testáveis',
            'Priorização estratégica: MoSCoW, RICE e matriz de valor vs esforço',
            'Documento SRS: estrutura, rastreabilidade e gestão de mudanças',
            'Métricas de validação de requisitos: como saber se o requisito está bom',
          ],
          projeto:
            'SRS completo com personas, jornada do usuário, user stories com BDD, casos de uso e matriz de priorização RICE do sistema prototipado no módulo anterior.',
          aberto: false,
        },
        {
          titulo: 'Metodologias Ágeis & Gestão de Produto',
          objetivo:
            'Aplicar metodologias ágeis com profundidade real, indo além do básico para dominar gestão de produto, métricas e frameworks de escala.',
          aulas: [
            'Scrum aprofundado: papéis, eventos, artefatos e disfunções comuns',
            'Kanban: fluxo, WIP limits, lead time, cycle time e CFD',
            'OKRs: alinhamento estratégico entre produto e negócio',
            'Discovery vs Delivery: Dual Track Agile e o papel do Analista',
            'SAFe: escalabilidade ágil em times e organizações grandes',
            'Métricas avançadas: burn-down, burn-up, velocity e throughput',
            'Refinamento de backlog: épicos, features, stories e critérios de pronto',
            'Ferramentas: Jira, Confluence e Notion para gestão de times tech',
          ],
          projeto:
            'Projeto configurado no Jira com épicos, sprints, definition of done, OKRs e dashboard de métricas de velocity e CFD.',
          aberto: false,
        },
        {
          titulo: 'Engenharia de Software & Padrões de Projeto',
          objetivo:
            'Aplicar os princípios e padrões de engenharia de software para construir sistemas extensíveis, testáveis e alinhados com as exigências do mercado enterprise.',
          aulas: [
            'SOLID aprofundado: exemplos reais, antipadrões comuns e como identificá-los',
            'GRASP: General Responsibility Assignment Software Patterns na prática',
            'Padrões criacionais: Factory Method, Abstract Factory, Builder e Prototype',
            'Padrões estruturais: Adapter, Decorator, Facade, Proxy e Composite',
            'Padrões comportamentais: Strategy, Observer, Command e Chain of Responsibility',
            'Arquitetura Hexagonal (Ports & Adapters): isolando domínio de infraestrutura',
            'Coesão e acoplamento na prática: métricas e refatoração orientada',
            'Anti-patterns clássicos e refatoração orientada a testes',
          ],
          projeto:
            'Refatoração completa de um sistema legado: SOLID aplicado, padrões de projeto implementados, arquitetura hexagonal e testes de regressão garantindo a refatoração.',
          aberto: false,
        },
        {
          titulo: 'System Design & Arquitetura Escalável',
          objetivo:
            'Projetar sistemas distribuídos escaláveis, tomando decisões arquiteturais justificadas com base em trade-offs reais de mercado.',
          aulas: [
            'Fundamentos de escalabilidade: vertical, horizontal e estratégias de crescimento',
            'CAP Theorem: consistência, disponibilidade e tolerância a partições',
            'Estratégias de cache: in-memory, distribuído, CDN e invalidação',
            'Load balancing: algoritmos, health checks e sessões distribuídas',
            'Mensageria e filas: Kafka, RabbitMQ e padrões de comunicação assíncrona',
            'Banco relacional vs NoSQL: critérios de escolha e trade-offs',
            'Introdução a microsserviços: decomposição, comunicação e deployment',
            'Como responder uma System Design Interview: método e exemplos reais',
          ],
          projeto:
            'Desenho arquitetural completo de um sistema escalável documentado com C4, decisões técnicas justificadas em ADRs e diagrama de mensageria.',
          aberto: false,
        },
        {
          titulo: 'Governança, Documentação e Compliance Enterprise',
          objetivo:
            'Produzir documentação técnica de alto nível e adotar práticas de governança, risco e compliance exigidas em empresas de médio e grande porte.',
          aulas: [
            'Documentação técnica: README profissional, docs de API e wikis de arquitetura',
            'RFC (Request for Comments): como propor e avaliar mudanças técnicas em equipe',
            'ADR (Architecture Decision Record): registro auditável de decisões arquiteturais',
            'SLA, SLO e SLI: definindo e monitorando acordos de serviço',
            'Gestão de risco técnico: identificação, classificação e plano de mitigação',
            'Auditoria de código: critérios, checklists e cultura de qualidade',
            'LGPD e compliance técnico: coleta de dados, consentimento e privacidade by design',
            'Boas práticas enterprise: onboarding técnico, padronização e governança de times',
          ],
          projeto:
            'Repositório de governança com RFC, ADRs, análise de risco técnico, mapa de compliance LGPD e documentação arquitetural do sistema desenvolvido ao longo da formação.',
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
      tipo: 'Individual por módulo',
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
      tipo: 'Grupo por módulo',
      preco: 110,
      descricao:
        'Módulo completo em grupo com projeto colaborativo. Máximo aproveitamento por aluno. Mín. 10 alunos.',
      itens: [
        'Todas as aulas do módulo',
        'Projeto colaborativo em equipe',
        'Dinâmica com revisão de código',
        'Gravação de todas as aulas',
        'Feedback de código em grupo',
      ],
    },
  ];

  ngOnInit() {
    this.configurarTitulo();
    this.planosExpandidos = this.planos.map(() => false);
  }

  ngAfterViewInit() {
    if (!('IntersectionObserver' in window)) {
      this.heroVisivel = true;
      this.metodologiaVisivel = true;
      this.publicoVisivel = true;
      this.formacoesVisivel = true;
      this.tecnologiasVisivel = true;
      this.valoresVisivel = true;
      this.ctaVisivel = true;
      this.cdr.markForCheck();
      return;
    }

    const opcoes: IntersectionObserverInit = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
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
      title.textContent = 'Lorrane.dev | Aulas e Cursos de Desenvolvimento';
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

  alternarPlano(index: number) {
    this.planosExpandidos[index] = !this.planosExpandidos[index];
  }

  ngOnDestroy() {
    this.observadores.forEach((obs) => obs.disconnect());
  }
}
