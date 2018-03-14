import { Component, OnInit } from '@angular/core';
import { DiaglogflowService } from './services/diaglogflow.service';

@Component({
  selector: 'app-root',
  providers: [DiaglogflowService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  poster_path = '';
  messages: any = [];
  userMessage = '';
  bot_url = '../assets/images/bot.png';
  user_url = '../assets/images/user.png';
  constructor(private service: DiaglogflowService) {}
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.userMessage = 'Hello';
    this.sendMessage(1);
  }
  sendMessage(flag) {
    let splitString = [];
    let customMessage = '';
    const tempMessage = this.userMessage;
    let userResponse = {
      url: this.user_url,
      text: this.userMessage
    };
    if (!flag) {
      this.messages.push(userResponse);
    }
    this.userMessage = '';
    this.service.getResponseFromAgent(tempMessage).then(result => {
    let url = result.result.fulfillment.speech;
    if (result.result.action.toString() === 'get-movie-details') {
      splitString = url.split('url');
      customMessage = splitString[0];
      this.poster_path = splitString[1] ? splitString[1].replace(/['"]+/g, '') : '';
    }
      let botResponse = {
        url: this.bot_url,
        text: customMessage ? customMessage : url,
        poster_path: this.poster_path ? 'http://image.tmdb.org/t/p/w154/' + this.poster_path : ''
      };
      this.messages.push(botResponse);
    });
    this.poster_path = '';
  }
}
