import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OrderDetailsService } from 'src/app/shared/services/order-details.service';
import {MatDialog} from '@angular/material/dialog';
import { TicketComponent } from '../ticket/ticket.component';
import { TicketService } from 'src/app/shared/services/ticket.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
 

  constructor(private service: OrderDetailsService ,private router:Router, public dialog: MatDialog , private ticketService : TicketService) { }
  ticketData:any;
  p:any = 1;
  searchQuery: string |any;
  searchResults: any[] = [];

  

  ngOnInit(): void {
     
    this.getTickets();
  }


  search(): void {
    if (this.searchQuery) {
      this.searchResults = this.ticketData.filter((item: any) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.searchResults = [];
    }
  }

  getTickets(){
    this.ticketService.getData()
    .subscribe((data) => {
      console.log('Retrieved data:', data);
      this.ticketData = data ;
      // Use the data in your component
    }, (error) => {
      console.error('Error retrieving data:', error);
    });
    
  }


  ticketdetail(data:any){
    console.log(data , 'hy detail page');

    this.service.ticketdata  = data;
    this.router.navigate(['/gallery'])
   
  }

  editTicket(data:any){
    const dialogRef = this.dialog.open(TicketComponent, {
      data: {data ,
        dailogTitle : 'Update Ticket'
       }
      });
       

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openTicketDialog(){
    const dialogRef = this.dialog.open(TicketComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  deleteTicket(id:any){
    

    this.ticketService.deleteData(id)
    .then(() => {
      console.log('Data deleted successfully!');
    })
    .catch((error) => {
      console.error('Error deleting data:', error);
    });

  }

  

}
