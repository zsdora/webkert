import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailsService } from 'src/app/shared/services/order-details.service';
@Component({
  selector: 'app-ticketpage',
  templateUrl: './ticketpage.component.html',
  styleUrls: ['./ticketpage.component.scss']
})
export class TicketpageComponent implements OnInit{
  constructor(private param:ActivatedRoute,private service:OrderDetailsService) { }
  getTicketId:any;
  ticketpData:any;

  ngOnInit(): void {
    this.getTicketId = this.param.snapshot.paramMap.get('id');
    console.log(this.getTicketId,'getticketp');
    if(this.getTicketId)
    {
      this.ticketpData =  this.service.ticketDetails.filter((value)=>{
          return value.id == this.getTicketId;
        });
        console.log(this.ticketpData,'ticketpdata>>');

    }

  }
}
