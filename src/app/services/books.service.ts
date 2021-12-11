import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/Book.model';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  books!: Book[];
  booksSubject = new Subject<Book[]>();

  constructor() {
   // this.getBooks();
  }

  emitBooks() {
    this.booksSubject.next(this.books);
    console.log(this.books)
  }
  saveBooks() {
    firebase.database().ref('/books').set(this.books);
    console.log('Livre sauvegarder', this.books)
  }

  getBooks() {
    firebase.database().ref('/books')
      .on('value', (data) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
        console.log('Livres récupérer', this.books)
      });
  }

  getSingleBook(id: number) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/books/' + id).once('value').then(
        (data) => {
          resolve(data.val());
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
    console.log('Livre créer', this.books)
  }

  removeBook(book: Book) {
    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimée !');
        }
      ).catch(
        (error) => {
          console.log('Fichier non trouvé : ' + error);
        }
      )
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        return bookEl === book;
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement...');
          },
          (error) => {
            console.log('Erreur de chargement : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          });
      });
  }

}
