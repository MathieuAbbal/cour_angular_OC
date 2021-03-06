import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book } from '../models/Book.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[] = [];
  booksSubscription!: Subscription;

  constructor(private booksService: BooksService,
     private router: Router,
     private dialog: MatDialog) {}
     openDialog() {
      const dialogRef = this.dialog.open(DialogComponent);
  
      dialogRef.afterClosed().subscribe(()=> {
        
      });
    }
  ngOnInit() {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
        console.log(books)
      }
    );
    this.booksService.getBooks();
    this.booksService.emitBooks();
  }

  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }

  onDeleteBook(book: Book) {
    this.booksService.removeBook(book);
  }

  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }
  
  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }
}