import { CommonModule } from '@angular/common';
import { Component, effect, HostListener, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { mascaraTelefone } from '../../core/utils/mascaras';
import { WhatsappLeadModalService } from '../whatsapp-lead-modal/whatsapp-lead-modal.service';

@Component({
  selector: 'app-whatsapp-lead-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './whatsapp-lead-popup.html',
  styleUrl: './whatsapp-lead-popup.scss',
})
export class WhatsappLeadPopupComponent {
  protected readonly whatsappLead = inject(WhatsappLeadModalService);
  private readonly formBuilder = inject(FormBuilder);

  protected readonly formulario = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    telefone: ['', [Validators.required, WhatsappLeadPopupComponent.validarTelefone]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor() {
    effect(() => {
      if (!this.whatsappLead.aberto() || this.whatsappLead.ui() !== 'popup') return;
      this.formulario.reset();
    });
  }

  @HostListener('document:keydown.escape')
  protected aoPressionarEsc() {
    if (!this.whatsappLead.aberto() || this.whatsappLead.ui() !== 'popup') return;
    this.whatsappLead.fechar();
  }

  protected fechar() {
    this.whatsappLead.fechar();
  }

  protected pular() {
    this.whatsappLead.pularParaWhatsapp();
  }

  protected aoDigitarTelefone() {
    const control = this.formulario.controls.telefone;
    const valor = mascaraTelefone(String(control.value || ''));
    if (valor !== control.value) {
      control.setValue(valor, { emitEvent: false });
    }
  }

  protected enviar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    const valores = this.formulario.getRawValue();
    this.whatsappLead.enviarEIrParaWhatsapp({
      nome: valores.nome?.trim() || '',
      telefone: valores.telefone || '',
      email: valores.email || '',
      descricao: 'Quero mais informações.',
    });
  }

  private static validarTelefone(controle: AbstractControl): ValidationErrors | null {
    const valor = String(controle.value || '');
    const digits = valor.replace(/\D/g, '');
    if (!digits) return null;
    if (digits.length < 10) return { telefoneInvalido: true };
    return null;
  }
}
