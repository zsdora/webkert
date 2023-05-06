import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Image } from '../../shared/models/Image';
import { GalleryService } from '../../shared/services/gallery.service';
import { OrderDetailsService } from 'src/app/shared/services/order-details.service';
import { TicketService } from 'src/app/shared/services/ticket.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor(private service:OrderDetailsService ,
    private route : Router ,
    private fb:FormBuilder, private ticketService :TicketService ) { }
  ticketData:any;
  buyTickets : FormGroup | any;

  quantity:any
  ngOnInit(): void {
    

    this.buyTickets = this.fb.group({
      quantity: ['']
    });
    this.getTickets();
  }


  buyTicket(data:any){
     this.ticketData = data;
     this.ticketData.buyquantity = this.buyTickets.value.quantity;

    

    this.service.buyTicket(this.ticketData);
  
  this.route.navigate(['/buyTickets']);
    this.buyTickets.reset();
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

}
