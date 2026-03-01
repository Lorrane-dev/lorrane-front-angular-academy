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
  private readonly whatsappLeadModal = inject(WhatsappLeadModalService);
  numeroWhatsapp: string = '5511989595100';
  mensagemWhatsapp: string = 'Olá Lorrane! gostaria de saber mais sobre seus serviços.';

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
