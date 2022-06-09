import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css', '../app.component.css']
})
export class ChatComponent implements OnInit {
  model: any;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef | any;
  constructor(private http: HttpClient) { }

  onSubmit(data: any) {

    if (data.value.question == "" || data.value.question == null) {
      return;
    }
    this.model.push({
      text: data.value.question,
      sender: "user"
    })
    // console.log(this.model);
    // console.log(data.value.question);
    this.http.post('http://localhost:5000/findans', { question: data.value.question }).subscribe((result: any) => {
      this.model.push({
        text: result.answer,
        sender: "chatbot"
      })
    })
    data.reset();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
 
    }
  }

  ngOnInit(): void {
    this.model = [{
      text:"Hello From BigCo",
      sender:"chatbot"
    }];
    this.scrollToBottom();
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
}
