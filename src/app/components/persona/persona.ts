import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona';
import { Persona } from '../../models/persona';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

//TODO: agregar template: <router-outlet></router-outlet> en caso  de que no funcione
@Component({
  selector: 'app-persona',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './persona.html',
  styleUrl: './persona.css',
})
export class PersonaComponent implements OnInit {
  personas: Persona[] = [];
  persona: Persona = { id: 0, nombre: '' };

  constructor(private personaService: PersonaService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('componente.persona.ngOnInit');
    this.cargarPersonaComponent();
  }

  //TODO: revisar si funciona sin el ChangeDetectorRef
  cargarPersonaComponent() {
    this.personaService.getPersonasHttp().subscribe({
      next: (data: Persona[]) => this.personas = data,
      error: (err: any) => console.error(err)
    })
  }

  guardar() {
    if (this.persona.id === 0) {
      this.personaService.crearPersona(this.persona).subscribe({
        next: () => {
          this.cargarPersonaComponent();
          this.limpiar();
        },
        error: (err: any) => console.error(err)
      });
    } else {
      this.personaService.actualizarPersona(this.persona.id, this.persona).subscribe({
        next: () => {
          this.cargarPersonaComponent();
          this.limpiar();
        },
        error: (err: any) => console.error(err)
      });
    }
  }

  eliminar(id: number) {
    this.personaService.eliminarPersona(id).subscribe({
      next: () => this.cargarPersonaComponent(),
      error: (err: any) => console.error(err)
    })
  }

  editar(p: Persona) {
    this.persona = { ...p };
  }

  limpiar() {
    this.persona = {id: 0, nombre: ''};
  }
}
