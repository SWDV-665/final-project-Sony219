import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { GroceriesProviderService } from '../groceries-provider.service';
import { InputDialogServiceService } from '../input-dialog-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  
})
export class Tab1Page {

  title = "Grocery S";
  socialSharing: any;

  

  constructor(
    public navCtrl: NavController, 
    public toastCtrl: ToastController, 
    public dataService: GroceriesProviderService,
    public InputDialogServiceService: InputDialogServiceService,
    public alertCtrl: AlertController) {}

    loadItems() {
      return this.dataService.getItems();
    }

  

  async removeItem(item, index) {
    console.log("Removing Item - ", item, index);
    const toast = await this.toastCtrl.create({
      message: 'Removing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();

    this.dataService.removeItem(index);
  }
  
  async shareItem(item, index) {
    console.log("Sharing Item - ", item, index);
    const toast = await this.toastCtrl.create({
      message: 'Sharing Item - ' + index + " ...",
      duration: 3000
    });

    toast.present();
    
    let message = "Grocery Item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries app";

    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Shared successfully!");
    }).catch((error) => {
      console.error("Error while sharing ", error);
    });    

  }


  async editItem(item, index) {
    console.log("Edit Item - ", item, index);
    const toast = await this.toastCtrl.create({
      message: 'Editing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();
    this.InputDialogServiceService.showPrompt(item, index);
  
  }  

  addItem() {
    console.log("Adding Item");
    this.InputDialogServiceService.showPrompt();

  }
}
