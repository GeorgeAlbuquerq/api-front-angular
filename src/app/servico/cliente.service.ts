import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../modelo/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //URL da API
  private url:string = 'http://localhost:8080';


  constructor(private http:HttpClient) { }

  //Método para selecionar todos os clientes
   selecionar():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url);
  }

  //Método para Cadastrar todos os clientes ( - post -  sendo para cadastro)
   cadastrar(obj:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.url, obj);
  }

   //Método para Editar todos os clientes ( - put -  sendo para alteração de dados)
   editar(obj:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(this.url, obj);
  }

   //Método para Remover os clientes ( - delete -  autoexplicativo \o/)
   remover(codigo:number):Observable<void>{
    return this.http.delete<void>(this.url + '/' + codigo);
  }

}
