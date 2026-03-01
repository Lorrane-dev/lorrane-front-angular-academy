import { inject, Injectable, signal } from '@angular/core';
import { NotificacaoService } from '../../core/services/notificacao.service';

export type WhatsappLeadSource = 'home' | 'servicos' | 'contato' | 'flutuante';
export type WhatsappLeadUI = 'modal' | 'popup';

export interface WhatsappLeadContexto {
  origem: WhatsappLeadSource;
  interesse?: string;
  mensagemBase?: string;
}

export interface WhatsappLeadDados {
  nome: string;
  telefone?: string;
  email: string;
  descricao: string;
}

export interface WhatsappLeadRegistro extends WhatsappLeadDados {
  origem: WhatsappLeadSource;
  interesse?: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class WhatsappLeadModalService {
  private readonly notificacaoService = inject(NotificacaoService);
  private readonly storageKeyDispensado = 'waLeadModalDispensado';
  private readonly storageKeyLeads = 'lorrane_leads';

  readonly aberto = signal(false);
  readonly contexto = signal<WhatsappLeadContexto | null>(null);
  readonly ui = signal<WhatsappLeadUI>('modal');

  numeroWhatsapp = '5511989595100';

  abrir(contexto: WhatsappLeadContexto, ui: WhatsappLeadUI = 'modal') {
    if (ui === 'modal' && this.jaDispensouNaSessao()) {
      this.abrirWhatsapp(contexto);
      return;
    }
    this.ui.set(ui);
    this.contexto.set(contexto);
    this.aberto.set(true);
  }

  fechar() {
    this.aberto.set(false);
    this.contexto.set(null);
    this.ui.set('modal');
  }

  pularParaWhatsapp() {
    const contexto = this.contexto();
    if (!contexto) {
      this.fechar();
      return;
    }
    this.marcarDispensadoNaSessao();
    this.abrirWhatsapp(contexto);
    this.fechar();
  }

  enviarEIrParaWhatsapp(dados: WhatsappLeadDados) {
    const contexto = this.contexto();
    if (!contexto) {
      this.fechar();
      return;
    }

    // Envia notificação para o Lambda (assíncrono, não bloqueia o WhatsApp)
    this.notificacaoService.enviarNotificacaoLead({
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone || '',
      mensagem: dados.descricao,
      origem: contexto.origem,
    });

    this.salvarLead(contexto, dados);
    this.marcarDispensadoNaSessao();
    this.abrirWhatsapp(contexto, dados);
    this.fechar();
  }

  private abrirWhatsapp(contexto: WhatsappLeadContexto, dados?: WhatsappLeadDados) {
    const mensagem = this.montarMensagem(contexto, dados);
    const url = `https://wa.me/${this.numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  private montarMensagem(contexto: WhatsappLeadContexto, dados?: WhatsappLeadDados): string {
    const partes: Array<string | undefined> = [];

    if (contexto.mensagemBase?.trim()) {
      partes.push(contexto.mensagemBase.trim());
    } else if (contexto.interesse?.trim()) {
      partes.push(`Olá! Tenho interesse em: ${contexto.interesse.trim()}`);
    } else {
      partes.push('Olá! Quero crescer meu negócio com soluções digitais.');
    }

    if (!dados) return partes.filter(Boolean).join('\n');

    const telefoneLimpo = (dados.telefone || '').replace(/\D/g, '');
    partes.push('');
    partes.push('Meus dados:');
    partes.push(`Nome: ${dados.nome.trim()}`);
    if (telefoneLimpo) partes.push(`Telefone: ${telefoneLimpo}`);
    if (dados.email.trim()) partes.push(`E-mail: ${dados.email.trim()}`);
    partes.push('');
    partes.push('O que eu preciso:');
    partes.push(dados.descricao.trim());

    return partes.filter(Boolean).join('\n');
  }

  private jaDispensouNaSessao(): boolean {
    try {
      return sessionStorage.getItem(this.storageKeyDispensado) === '1';
    } catch {
      return false;
    }
  }

  private marcarDispensadoNaSessao() {
    try {
      sessionStorage.setItem(this.storageKeyDispensado, '1');
    } catch {}
  }

  private salvarLead(contexto: WhatsappLeadContexto, dados: WhatsappLeadDados) {
    const registro: WhatsappLeadRegistro = {
      ...dados,
      origem: contexto.origem,
      interesse: contexto.interesse,
      createdAt: new Date().toISOString(),
    };

    try {
      const atual = localStorage.getItem(this.storageKeyLeads);
      const lista: WhatsappLeadRegistro[] = atual ? JSON.parse(atual) : [];
      lista.push(registro);
      localStorage.setItem(this.storageKeyLeads, JSON.stringify(lista));
    } catch {}
  }
}
