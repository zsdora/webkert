import { Injectable } from '@angular/core';
import { AngularFirestore,  DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  constructor(private afs: AngularFirestore) { }


ticketdata:any ;



buyTicket(object: any) {
  this.afs.collection('buyTickets').add(object)
    .then(() => {
      console.log('Object saved successfully!');
    })
    .catch((error) => {
      console.error('Error saving object:', error);
    });
}


 


 


getbuyTickets(): Observable<any> {
  return this.afs.collection('buyTickets').snapshotChanges().pipe(
    map((snaps: DocumentChangeAction<any>[]) => {
      return snaps.map((snap: DocumentChangeAction<any>) => {
        const docid = snap.payload.doc.id;
        const data = snap.payload.doc.data();
        return {docid, ...data };
      });
    })
  );
}



updateTicket(id: string, data: any): Promise<void> {
  return this.afs.collection('buyTickets').doc(id).update(data);
}

deleteTicket(id: string): Promise<void>  {
  return this.afs.collection('buyTickets').doc(id).delete();
}




  ticketDetails = [
    {
      id:1,
      ticketName: 'Budapest-London',
      ticketPrice: 300,
      ticketPopular: true,
      ticketImg: '../../../assets/img/plane1.jpg',
      ticketQuantity: 0
    },

    {
      id:2,
      ticketName: 'Budapest-Barcelona',
      ticketPrice: 250,
      ticketPopular: false,
      ticketImg: '../../../assets/img/plane2.jpg',
      ticketQuantity: 0

    },

    {
      id:3,
      ticketName: 'Budapest-Madrid',
      ticketPrice: 330,
      ticketPopular: false,
      ticketImg: '../../../assets/img/plane3.jpg',
      ticketQuantity: 0

    },

    {
      id:4,
      ticketName: 'Budapest-Párizs',
      ticketPrice: 280,
      ticketPopular: true,
      ticketImg: '../../../assets/img/plane4.jpg',
      ticketQuantity: 0

    },

    {
      id:5,
      ticketName: 'Budapest-Berlin',
      ticketPrice: 340,
      ticketPopular: false,
      ticketImg: '../../../assets/img/plane5.jpg',
      ticketQuantity: 0

    },

    {
      id:6,
      ticketName: 'Budapest-Nápoly',
      ticketPrice: 270,
      ticketPopular: true,
      ticketImg: '../../../assets/img/plane6.jpg',
      ticketQuantity: 0

    },

    {
      id:7,
      ticketName: 'Budapest-Koppenhága',
      ticketPrice: 220,
      ticketPopular: true,
      ticketImg: '../../../assets/img/plane7.jpg',
      ticketQuantity: 0

    },

    {
      id:8,
      ticketName: 'Budapest-Dublin',
      ticketPrice: 280,
      ticketPopular: false,
      ticketImg: '../../../assets/img/plane8.jpg',
      ticketQuantity: 0

    },

    {
      id:9,
      ticketName: 'Budapest-Prága',
      ticketPrice: 360,
      ticketPopular: false,
      ticketImg: '../../../assets/img/plane9.jpg',
      ticketQuantity: 0

    },

    {
      id:10,
      ticketName: 'Budapest-Palermo',
      ticketPrice: 240,
      ticketPopular: false,
      ticketImg: '../../../assets/img/plane10.jpg',
      ticketQuantity: 0

    }
  ]



}
