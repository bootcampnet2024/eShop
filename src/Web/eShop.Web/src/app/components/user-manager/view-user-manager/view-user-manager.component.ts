import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserManagementService } from '../../../services/user-management/user-management.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-view-user-manager',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './view-user-manager.component.html',
  styleUrl: '../user-manager.css'
})
export class ViewUserManagerComponent {

  users: any[] = [];

  constructor(private userManagementService: UserManagementService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers(): Promise<void> {
    try {
      this.users = await firstValueFrom(this.userManagementService.getAll());
    } catch (error) {
      console.error('Erro ao carregar usuários', error);
    }
  }

  async deleteUser(userId: string): Promise<void> {
    const confirmed = confirm('Deseja realmente deletar esse usuário?');
    if (confirmed) {
      try {
        await firstValueFrom(this.userManagementService.delete(userId));
        alert('Usuário deletado com sucesso!');
        this.loadUsers();
      } catch (error) {
        console.error('Erro ao deletar usuário', error);
      }
    }
  }
}