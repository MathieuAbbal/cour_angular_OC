import { Component, HostListener } from '@angular/core';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent {

  constructor(private booksService: BooksService) { }
  @HostListener('click')
  click() {
    this.booksService.removeBook;


  }

}
  