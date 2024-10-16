import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../servico/cliente.service';
import { Cliente } from '../modelo/Cliente';


@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

    //Objeto do tipo Cliente
    cliente = new Cliente();

    //variável para visibilidade dos botões
    btnCadastro:boolean = true;

    //Variável para visibilidade da tabela
    tabela:boolean = true;

    //JSON de clientes
    clientes:Cliente[] = [];

    constructor(private servico:ClienteService){}
  
    // Função de seleção de clientes (vai pegar os clientes da API e adicionar no JSON)
    selecionar():void{
    this.servico.selecionar()
    .subscribe(retorno => this.clientes = retorno);
  }

    //Método para cadastro de cliente
      cadastrar():void
      {
        this.servico.cadastrar(this.cliente)
        .subscribe(retorno => 
          {
          
          //Cadastrar o caboco no vetor
          this.clientes.push(retorno);
          
          //limpar o form depois de cadastrar um usuário
          this.cliente = new Cliente();

          //Vai dar uma mensagem - um campinho de alert, depois de cadastrar e limpar:
          alert('Cliente cadastrado com sucesso!');
        
        });
      }

    //Método para selecionar um cliente específico
    selecionarCliente(posicao:number):void{
      //selecionar cliente no vetor
      this.cliente = this.clientes[posicao];

      //visibilidade do botão:
      this.btnCadastro = false;

      //visibilidade da tabela em si
      this.tabela = false;

    }

    //Método para edição dos clientes:
    editar():void
    {
      this.servico.editar(this.cliente)
      .subscribe(retorno => 
      {
        //obter a posição do vetor onde está o cliente
        let posicao = this.clientes.findIndex(obj => {
          return obj.codigo == retorno.codigo;
        });

        //Alterar os dados do cliente no vetor
        this.clientes[posicao] = retorno;

        //Limpar form
        this.cliente = new Cliente();

        //exibição do botão de cadastrar e ocultar os outros botões
        this.btnCadastro = true;

        //exibição da tabela total
        this.tabela = true;

        // um aletzinho pra avisar
        alert('Cliente alterado com sucesso!');

      });

    }

    //Método para remover dos clientes:
    remover():void
    {
      this.servico.remover(this.cliente.codigo)
      .subscribe(retorno => 
      {
        //obter a posição do vetor onde está o cliente
        let posicao = this.clientes.findIndex(obj => {
          return obj.codigo == this.cliente.codigo;
        });

        //Remover o cliente (achado no this.cliente.codigo) no vetor 
        this.clientes.splice(posicao,1); //se eu não colocar o ,1 ele vai remover todos os dados a partir da posição

        //Limpar form
        this.cliente = new Cliente();

        //exibição do botão de cadastrar e ocultar os outros botões
        this.btnCadastro = true;

        //exibição da tabela total
        this.tabela = true;

        // um aletzinho pra avisar
        alert('Cliente removido com sucesso!');

      });

    }

    // Função do botão cancelar, para os desavidados que clicaram errado em outra opção;
    cancelar():void{
      //Limpar form
      this.cliente = new Cliente();

      //exibição do botão de cadastrar e ocultar os outros botões
      this.btnCadastro = true;

      //exibição da tabela total
      this.tabela = true;
    }


    //Método nativo do Angular para inicialização da ação
    ngOnInit(){
      this.selecionar();
  }

}
