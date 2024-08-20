import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-first-page',
  standalone: true,
  imports: [],
  templateUrl: './first-page.component.html',
  styleUrl: './first-page.component.css'
})
export class FirstPageComponent {
// ngOnInit(): void{
//   console.log('shikikie');
// }

id: number = 0;

constructor(private route: ActivatedRoute) {}

ngOnInit(): void {
  this.route.paramMap.subscribe((params: ParamMap) =>{
this.id = Number(params.get('id'));
  });
}
}
