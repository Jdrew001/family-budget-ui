import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private readonly toastController: ToastController
  ) { }

  showMessage(message: string, isError: boolean = false, duration: number = 5000) {
    this.toastController.create({
      message,
      duration,
      color: isError ? 'danger' : 'success'
    }).then(toast => toast.present());
  }
}
