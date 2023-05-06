import { Image } from './../../shared/models/Image';
import { TicketService } from './../../shared/services/ticket.service';
import { Component, OnInit , Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  dailogTitle = 'Jegy hozzáadása';
  ticketForm!: FormGroup ;

  isLoading = false;
  file: any;
  constructor(private fb:FormBuilder ,
     private ticketService : TicketService ,
     @Inject(MAT_DIALOG_DATA) public data: any ,
     public dialogRef: MatDialogRef<TicketComponent>) { }

  ngOnInit(): void {

    console.log(this.data , 'ticket data 321');

          this.ticketForm = this.fb.group({
                   name: ['',[Validators.required]],
                   price : ['',[Validators.required]],
                   quantity:['',[Validators.required]],
                   destination :['',[Validators.required]]
          });

          if(this.data){
            this.dailogTitle = this.data.dailogTitle ;
            console.log(this.data.data , 'hy data');
            this.ticketForm.patchValue({
              name :  this.data.data.name,
              price :  this.data.data.price,
              quantity :  this.data.data.quantity,
               image :    this.data.data.image,
              destination :  this.data.data.destination
            });


          }



  }
  onFileSelected(event: any) {
      this.file = event.target.files[0];
      console.log(this.file.name);

  }

  createData(ticketForm:FormGroup) {
    console.log(ticketForm.value.image , 'vdh');

    this.isLoading = true;
      if(!this.data){

        this.ticketService.createData(ticketForm.value , this.file)
        .then((docRef) => {
          this.isLoading = false
         this.onDismiss();
        })
        .catch((error) => {
          this.isLoading = false
          console.error('Error creating data:', error);
          this.onDismiss();
        });
      }else{
        console.log(this.data.id)
        this.ticketService.updateData(this.data.data.id , ticketForm.value , this.file )
        .then((docRef) => {
          this.isLoading = false
          console.log('Data updated successfully!' ,docRef);
         this.onDismiss();
        })
        .catch((error) => {
          this.isLoading = false
          console.error('Error updated data:', error);
        });

      }


  }


  onDismiss(): void {
    this.dialogRef.close();
  }



}
