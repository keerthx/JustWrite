import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
}) 

export class RegisterComponent implements OnInit, OnDestroy {
    isLoading = false;
    private authStatusSub: Subscription;

    constructor(public authService: AuthService) {}

    ngOnInit() {
        this.authStatusSub = this.authService.getAuthStatusListener()
            .subscribe(authStatus => {
                this.isLoading = false;
            });
    }

    onRegister(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.isLoading = true;
        // Obtains the necessary data from the front-end
        this.authService.createUser(form.value.email, form.value.password);
    }

    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
    }
}