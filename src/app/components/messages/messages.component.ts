import * as firebase from 'firebase';
import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { FirebaseListObservable } from "angularfire2/database";
import { FormsModule } from "@angular/forms";

import { MessageService } from './message.service';

@Component({
  selector: 'app-messages',
  templateUrl: 'messages.component.html',
  styleUrls: ['./messages.component.css']
})

export class MessagesComponent implements OnInit, AfterViewChecked {
   @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  public newMessage: string;
  public messages: FirebaseListObservable<any>;
    
  constructor(public messageService: MessageService) {
     this.messageService.userName = firebase.auth().currentUser.displayName;
     this.messageService.email = firebase.auth().currentUser.email;
     this.messages = this.messageService.messages;
  }
  
  isYou(email) {
    if(email == this.messageService.email)
      return true;
    else
      return false;
  }
  isMe(email) {
    if(email == this.messageService.email)
      return false;
    else
      return true;
  }

  ngOnInit() {

  }

  ngAfterViewChecked() {
   // this.scrollToBottom();
  }
  /*
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { console.log('Scroll to bottom failed') }
  }*/
  
  sendMessage(){
    console.log('new message: ', this.newMessage);
    this.messageService.sendMessage('', this.newMessage);
    this.newMessage = '';
  }
       
}
