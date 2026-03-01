import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatsappLeadModalService } from '../whatsapp-lead-modal/whatsapp-lead-modal.service';

@Component({
  selector: 'app-botao-whatsapp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './botao-whatsapp.html',
  styleUrl: './botao-whatsapp.scss',
})
export class BotaoWhatsappComponent {
  mostrarMsgAnimada = false;

  private readonly whatsappLeadModal = inject(WhatsappLeadModalService);
  numeroWhatsapp: string = '5511989595100';
  mensagemWhatsapp: string = 'Olá Lorrane! gostaria de saber mais sobre seus serviços.';

  constructor() {
    // Exibe a mensagem animada apenas 1 vez por sessão e se o usuário não clicou no WhatsApp
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const jaViu = sessionStorage.getItem('whatsappMsgAnimada');
      const jaClicou = sessionStorage.getItem('whatsappClicou');
      if (!jaViu && !jaClicou) {
        setTimeout(() => {
          this.mostrarMsgAnimada = true;
          setTimeout(() => {
            this.mostrarMsgAnimada = false;
            sessionStorage.setItem('whatsappMsgAnimada', '1');
          }, 2500);
        }, 1800);
      }
    }
  }

  get urlWhatsapp(): string {
    return `https://wa.me/${this.numeroWhatsapp}?text=${encodeURIComponent(this.mensagemWhatsapp)}`;
  }

  aoClicarWhatsapp(evento: MouseEvent) {
    if (evento.button !== 0 || evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey)
      return;
    evento.preventDefault();
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('whatsappClicou', '1');
    }
    this.whatsappLeadModal.abrir(
      {
        origem: 'flutuante',
        mensagemBase: this.mensagemWhatsapp,
      },
      'popup',
    );
  }
}
