import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
  standalone: true,
  imports: [] // Add necessary imports here if any. For example, HttpClientModule, MatInputModule, etc.  // ^^ Important: Do not forget to add the necessary imports in the component's module.ts file as well.  // ^^ Also, remember to import the necessary selectors in the component's selector file.  // ^^ If you're using Angular Material, you'll also need to import the MatInputModule in the component's
})
export class LoadingSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
