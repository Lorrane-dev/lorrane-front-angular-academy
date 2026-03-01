import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface DadosNotificacao {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
  origem?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificacaoService {
  private readonly http = inject(HttpClient);
  private readonly lambdaUrl = 'https://rgy7ocyigeffm3rhijkjarywre0qwjfl.lambda-url.us-east-2.on.aws/';

  /**
   * Envia uma notificação de novo lead para o Lambda
   */
  async enviarNotificacaoLead(dados: DadosNotificacao): Promise<void> {
    const emailLead = String(dados.email || '').trim();
    if (!emailLead) {
      return;
    }

    const payload = {
      para: emailLead,
      assunto: 'Recebemos seu contato - Lorrane.dev',
      tipoTemplate: 'confirmacao-lead',
      dados: {
        nome: dados.nome,
        email: emailLead,
        telefone: dados.telefone,
        mensagem: dados.mensagem,
        origem: dados.origem || 'Site Institucional',
      },
    };

    try {
      const resposta = await firstValueFrom(this.http.post(this.lambdaUrl, payload));
      console.log('Resposta do Lambda (lead):', resposta);
    } catch (error) {
      console.error('Erro ao enviar notificação para o Lambda:', error);
    }
  }
}
