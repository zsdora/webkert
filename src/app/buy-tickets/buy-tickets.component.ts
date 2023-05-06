import { Component, OnInit } from '@angular/core';
import { OrderDetailsService } from '../shared/services/order-details.service';
import { log } from 'console';

@Component({
  selector: 'app-buy-tickets',
  templateUrl: './buy-tickets.component.html',
  styleUrls: ['./buy-tickets.component.scss']
})
export class BuyTicketsComponent  implements OnInit{
  ticketData: any[] | undefined;

   

  ngOnInit(): void {
    this.getbuyTickets();
  }

  constructor(private service :OrderDetailsService) { }



  getbuyTickets(){
    this.service.getbuyTickets().subscribe((data) => {
         this.ticketData = data;
         console.log(this.ticketData);
    });
  }

  updateticket(data:any){

  console.log(data.docid);
   
      this.service.updateTicket( data.docid , data )
      .then((docRef) => {
        console.log('Data updated successfully!' ,docRef);     
      })
      .catch((error) => {      
        console.error('Error updated data:', error);
      });

      }

  


  delTicket(data:any){
    this.service.deleteTicket(data.docid);
         console.log(data.docid);
  }


}
