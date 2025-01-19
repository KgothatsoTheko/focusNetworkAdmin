import { Component, OnInit } from '@angular/core';
import { WebRTCService } from 'src/app/services/web-rtc.service';

@Component({
  selector: 'app-sisterhood-room',
  templateUrl: './sisterhood-room.component.html',
  styleUrls: ['./sisterhood-room.component.scss']
})
export class SisterhoodRoomComponent implements OnInit {
  roomId = 'sisterhood-room';
  roomLink: string = '';
  isMuted = false;
  isLive = false;
  attendeesCount = 0;

  constructor(private webrtcService: WebRTCService) {}

  ngOnInit() {
    this.roomLink = `${window.location.origin}/join/${this.roomId}`;

    // Listen for attendee count updates
    this.webrtcService.getAttendeesCount().subscribe((count) => {
      this.attendeesCount = count;
    });
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.webrtcService.muteAudio(this.isMuted);
  }

  toggleLive() {
    if (this.isLive) {
      this.webrtcService.leaveRoom(this.roomId);
      
    } else {
      this.webrtcService.initializeLocalStream();
      this.webrtcService.connectToRoom(this.roomId);
    }
    this.isLive = !this.isLive;
  }
}