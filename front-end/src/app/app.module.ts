import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BooksComponent } from './components/books/books.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { GlobalHeaderComponent } from './components/global-header/global-header.component';
import { GlobalFooterComponent } from './components/global-footer/global-footer.component';
import { AddBookDialogComponent } from './components/add-book-dialog/add-book-dialog.component';
import { DeleteBookDialogComponent } from './components/delete-book-dialog/delete-book-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSortModule } from '@angular/material/sort';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AdminTransactionComponent } from './components/admin-transaction/admin-transaction.component';
import { AdminMembersComponent } from './components/admin-members/admin-members.component';
import { BranchComponent } from './components/branch/branch.component';
import { MemberBookComponent } from './components/member-book/member-book.component';
import { AddCopyDialogComponent } from './components/add-copy-dialog/add-copy-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    BooksComponent,
    DashboardComponent,
    UserProfileComponent,
    GlobalHeaderComponent,
    GlobalFooterComponent,
    AdminDashboardComponent,
    AddBookDialogComponent,
    DeleteBookDialogComponent,
    TransactionsComponent,
    AdminTransactionComponent,
    AdminMembersComponent,
    BranchComponent,
    MemberBookComponent,
    AddCopyDialogComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDialogModule,
    MatPaginatorModule,
    MatMomentDateModule,
    MatSortModule,
    MatTableModule,
    CommonModule,
    MatDatepickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
