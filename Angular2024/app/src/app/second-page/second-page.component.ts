import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-second-page',
  standalone: true,
  imports: [],
  templateUrl: './second-page.component.html',
  styleUrl: './second-page.component.css'
})
export class SecondPageComponent {
constructor(private http: HttpClient) {}

ngOnInit() {
  const payload = {
    id: 100,
    name: 'Shikikie',
  }
 this.http.
 get('https://fakerapi.it/api/v1/persons')
 .subscribe((res) => {

// this.http.
// post('https://fakerapi.it/api/v1/persons', payload)
// .subscribe((res) => {

// this.http.
// put('https://fakerapi.it/api/v1/persons', payload)
// .subscribe((res) => {

// this.http.
// delete('https://fakerapi.it/api/v1/persons')
// .subscribe((res) => {

    console.log(res);
    });
  }
}

