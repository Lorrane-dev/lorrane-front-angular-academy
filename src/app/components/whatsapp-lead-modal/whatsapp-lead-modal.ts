import { CommonModule } from '@angular/common';
import { Component, effect, HostListener, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { mascaraTelefone } from '../../core/utils/mascaras';
import { WhatsappLeadModalService } from './whatsapp-lead-modal.service';

@Component({
  selector: 'app-whatsapp-lead-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './whatsapp-lead-modal.html',
  styleUrl: './whatsapp-lead-modal.scss',
})
export class WhatsappLeadModalComponent {
  protected readonly whatsappLeadModal = inject(WhatsappLeadModalService);
  private readonly formBuilder = inject(FormBuilder);

  protected readonly formulario = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    telefone: ['', [Validators.required, WhatsappLeadModalComponent.validarTelefone]],
    email: ['', [Validators.required, Validators.email]],
    descricao: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor() {
    effect(() => {
      if (!this.whatsappLeadModal.aberto() || this.whatsappLeadModal.ui() !== 'modal') return;
      this.formulario.reset();
    });
  }

  protected fechar() {
    this.whatsappLeadModal.fechar();
  }

  @HostListener('document:keydown.escape')
  protected aoPressionarEsc() {
    if (!this.whatsappLeadModal.aberto() || this.whatsappLeadModal.ui() !== 'modal') return;
    this.fechar();
  }

  protected pular() {
    this.whatsappLeadModal.pularParaWhatsapp();
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
    this.whatsappLeadModal.enviarEIrParaWhatsapp({
      nome: valores.nome?.trim() || '',
      telefone: valores.telefone || '',
      email: valores.email || '',
      descricao: valores.descricao?.trim() || '',
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
