import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  registerForm: any;
  activeForm: 'login' | 'register' = 'login';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  toggleForm(form: 'login' | 'register') {
    this.activeForm = form;
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Retrieve users from local storage (or use in-memory array)
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Find user by email
      const user = users.find((u: any) => u.email === email && u.password === password);

      if (user) {
        console.log("Login successful for:", email);
        this.router.navigate(['/dashboard']);
      } else {
        this.snackBar.open('Invalid email or password!', 'Close', { duration: 3000 });
      }
    } else {
      this.snackBar.open('Please fill in the form correctly!', 'Close', { duration: 3000 });
    }
  }

  register() {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;

      // Check if the email already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find((u: any) => u.email === email);

      if (existingUser) {
        this.snackBar.open('Email already exists!', 'Close', { duration: 3000 });
      } else {
        // Add the new user to the list and save to local storage
        const newUser = { username, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users)); // Store users in localStorage

        this.snackBar.open('Registration successful!', 'Close', { duration: 3000 });
        setTimeout(() => {
          this.activeForm = 'login'; // Switch to login form after successful registration
        }, 2000);
      }
    } else {
      this.snackBar.open('Please fill all fields correctly!', 'Close', { duration: 3000 });
    }
  }
}
