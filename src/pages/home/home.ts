import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var SMS : any ; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {
    this.ReadListSMS();
    this.ExpectingSMS();
  }

  ReadListSMS(){    
    let filter = { 
      box : 'inbox' , // 'inbox' (default), 'sent', 'draft' 
      indexFrom : 0 , // start from index 0 
      maxCount : 10 , // count of SMS to return each time 
    }; 
    if (SMS)SMS.listSMS(filter,(ListSms) => { 
      console.log ( "Sms" , ListSms); 
    },Error => { 
      console.log ( 'error list sms:' + Error ); 
    }); 
  } 
    
  ExpectingSMS(){          
    if (SMS)SMS.startWatch(() => { 
      console.log( 'Empezo ha esperar' ); 
    },Error => { 
      console.log( 'Fallo el inicio de la espera' ); 
    });      
    document.addEventListener( 'onSMSArrive' ,(e : any ) => { 
      var sms = e.data; 
      console.log({mensaje_entrante:sms});       
    }); 
  }
}
