import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class TicketService {

 
  constructor(private firestore: AngularFirestore ,private storage: AngularFireStorage) {}

  createData(data: any, imageFile: File): Promise<any> {
    return new Promise((resolve, reject) => {
      
      const storagePath = `images/${imageFile.name}`;
      const storageRef = this.storage.ref(storagePath);
      const uploadTask = storageRef.put(imageFile);
  
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          // Once the upload is complete, get the download URL
          storageRef.getDownloadURL().subscribe((downloadUrl: any) => {
            // Add the image URL to the data object
            data.imageUrl = downloadUrl;
  
            // Add the data to Firestore collection
            this.firestore.collection('tickets').add(data)
              .then((docRef) => {
                resolve(docRef);
              })
              .catch((error) => {
                reject(error);
              });
          }, (error: any) => {
            reject(error);
          });
        })
      ).subscribe();
    });
  }




  getData(): Observable<any[]> {
    return this.firestore.collection('tickets').snapshotChanges().pipe(
      map((snaps: DocumentChangeAction<any>[]) => {
        return snaps.map((snap: DocumentChangeAction<any>) => {
          const id = snap.payload.doc.id;
          const data = snap.payload.doc.data();
          return { id, ...data };
        });
      })
    );
  }
  
  


  async updateData(id: string, data: any, imageFile: File): Promise<void> {
    if (imageFile) {
      // Upload the updated image to storage and get the download URL
      const imageUrl = await this.uploadImageAndGetDownloadUrl(id, imageFile);
      // Include the new image URL in the data object
      data.imageUrl = imageUrl;
    }
    // Update the data in Firestore
    return this.firestore.collection('tickets').doc(id).update(data);
  }

  private async uploadImageAndGetDownloadUrl(id: string, imageFile: File): Promise<string> {
    const filePath = `ticket-images/${id}_${imageFile.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, imageFile);
    // Wait for the upload task to complete
    await task;
    // Get the download URL for the uploaded image
    return fileRef.getDownloadURL().toPromise();
  }

  deleteData(id: string): Promise<void> {
    return this.firestore.collection('tickets').doc(id).delete();
  }

  
}
