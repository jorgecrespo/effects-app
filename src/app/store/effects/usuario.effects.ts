import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';
import * as usuariosActions from '../actions';
import { Usuario } from '../../models/usuario.model';



@Injectable()
export class UsuarioEffects{
    
    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
    ){

    }

    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuario ),
            tap( data => console.log(data, 'dataa')),
            mergeMap( 
                (action)=> this.usuarioService.getUserById(action.id)
                    .pipe(
                        tap( data => console.log('get User Effects MergeMap', data)),
                        map( user => usuariosActions.cargarUsuarioSuccess({ usuario: user })),
                        catchError( err => of(usuariosActions.cargarUsuarioError({payload: err})))
                    )
             )
        )
    );
}