import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Storage} from "@ionic/storage";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    access:boolean;
    constructor(private router: Router,
                private storage : Storage) {
    }

    async canActivate() {
        // todo changer pour verifier
        await this.storage.get('VICPIZZA').then(() => {this.access = true}).catch(()=> { this.access = false; }) == null
        if(this.access == false){
            this.router.navigateByUrl('/login');
            return false;
        }else
        return this.access;
    }
}
