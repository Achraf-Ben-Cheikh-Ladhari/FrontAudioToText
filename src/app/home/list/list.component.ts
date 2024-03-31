import { ChangeDetectorRef, Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
import { AudioRecordingService } from './audio-recording.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  recording='';
  isRecording = false;
  audioURL: string | null = null;
  montimer:any;
  cmpt = 0;

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
    constructor(private audioRecordingService: AudioRecordingService, private cd: ChangeDetectorRef){}
  
  ngOnInit(): void { 
    this.audioRecordingService.audioBlob$.subscribe(blob => {
      this.audioURL = window.URL.createObjectURL(blob);
      this.audioPlayer.nativeElement.src = this.audioURL;
      this.cd.detectChanges();
    });
    //this.typewriter();
  }

  startRecording() {
    this.isRecording = true;
    this.audioRecordingService.startRecording();
    this.recording=''
    this.recording='Start recording!'
    this.typewriter()
  }

  stopRecording() {
    this.isRecording = false;
    this.audioRecordingService.stopRecording();
    this.recording='Recording stopped!'
    this.typewriter()
  }

  copyInputMessage(inputElement:any){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  
  typewriter() {
    const lelien:any= document.getElementById('recording');
    if (this.cmpt < this.recording.length) {
    lelien.innerHTML = this.recording.substring(0, this.cmpt + 1); // Update content with new text
    this.cmpt++;
    this.montimer = setTimeout(() => this.typewriter(), 100);
    } else {
      
      clearTimeout(this.montimer);
      this.cmpt = -1;
    }
   
  }

}
