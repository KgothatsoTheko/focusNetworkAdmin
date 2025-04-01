import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebRTCService {
  private socket: Socket;
  private localStream!: MediaStream;
  private peerConnections: { [key: string]: RTCPeerConnection } = {};
  private attendeesCount = new BehaviorSubject<number>(0);
  private unmuteRequests = new BehaviorSubject<{ userId: string } | null>(null);

  constructor() {
    // this.socket = io('http://localhost:8899');
    this.socket = io('https://focusnetworkserver.onrender.com');

    this.socket.on('attendees-count', (count) => {
      this.attendeesCount.next(count);
    });

    this.socket.on('unmute-request', (data) => {
      this.unmuteRequests.next(data);
    });
  }

  getUnmuteRequests() {
    return this.unmuteRequests.asObservable();
  }

  approveUnmute(userId: string, roomId: string) {
    this.socket.emit('unmute-approve', { userId, roomId });
  }

  rejectUnmute(userId: string) {
    this.socket.emit('unmute-deny', { userId });
  }

  getAttendeesCount() {
    return this.attendeesCount.asObservable();
  }

  async initializeLocalStream() {
    this.localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  }

  connectToRoom(roomId: string) {
    this.socket.emit('join-room', roomId);

    this.socket.on('user-joined', (data) => {
      this.createOffer(data.id);
    });

    this.socket.on('signal', async (data) => {
      const pc = this.getPeerConnection(data.from);
      if (data.sdp) {
        await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
        if (data.sdp.type === 'offer') {
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          this.sendSignal(data.from, { sdp: pc.localDescription });
        }
      } else if (data.candidate) {
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    });

    this.socket.on('mute-toggle', (data) => {
      const pc = this.getPeerConnection(data.from);
      pc.getReceivers().forEach((receiver) => {
          if (receiver.track.kind === 'audio') {
              receiver.track.enabled = !data.isMuted;
          }
      });
  });

    this.socket.on('user-disconnected', (id) => {
      if (this.peerConnections[id]) {
        this.peerConnections[id].close();
        delete this.peerConnections[id];
      }
    });
  }

  notifyMuteState(roomId: string, isMuted: boolean) {
    this.socket.emit('mute-toggle', { roomId, isMuted });
}

  private getPeerConnection(id: string): RTCPeerConnection {
    if (!this.peerConnections[id]) {
      const pc = new RTCPeerConnection();
      
      // Add tracks consistently and avoid duplication
      if (this.localStream) {
        this.localStream.getTracks().forEach((track) => {
          if (!pc.getSenders().find((sender) => sender.track === track)) {
            pc.addTrack(track, this.localStream);
          }
        });
      }
  
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          this.sendSignal(id, { candidate: event.candidate });
        }
      };
  
      pc.ontrack = (event) => {
        const audio = document.createElement('audio');
        audio.srcObject = event.streams[0];
        audio.autoplay = true;
        document.body.appendChild(audio);
      };
  
      this.peerConnections[id] = pc;
    }
    return this.peerConnections[id];
  }
  

  private async createOffer(target: string) {
    const pc = this.getPeerConnection(target);
  
    // Avoid creating an offer if already stable
    if (pc.signalingState === 'stable') {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      this.sendSignal(target, { sdp: pc.localDescription });
    } else {
      console.warn('Skipping offer creation as connection is not stable.');
    }
  }
  

  private sendSignal(target: string, data: any) {
    this.socket.emit('signal', { target, ...data });
  }

  leaveRoom(roomId: string) {
    this.socket.emit('leave-room', roomId);
    this.localStream.getTracks().forEach((track) => track.stop());
  }

  muteAudio(mute: boolean) {
    this.localStream.getAudioTracks().forEach((track) => (track.enabled = !mute));
  }
}
