import { Socket } from 'socket.io-client';
import { Dispatch, SetStateAction, RefObject } from 'react';
import env from '../../env';

type PeerConnections = { [id: string]: RTCPeerConnection };
type Streams = { [id: string]: MediaStream };
interface connProps {
  from: typeof Socket;
  to: string;
  room: string;
  peersRef: RefObject<PeerConnections>;
  streamsRef: RefObject<Streams>;
}

async function createConnection(connProps: connProps) {
  // set up peer connection
  const peer = new RTCPeerConnection({
    iceServers: [
      // { urls: ['stun:stun.l.google.com:19302'] },
      { urls: [`stun:${env.STUN_HOST}:${env.STUN_PORT}`] },
      {
        urls: [`turn:${env.TURN_HOST}:${env.TURN_PORT}`],
        username: env.TURN_USER,
        credential: env.TURN_PWD,
      },
    ],
  });

  peer.onicecandidate = (event) => {
    console.log('onicecandidate triggered');
    if (event.candidate) {
      console.log(`o Sending ICE candidate to ${connProps.to}`);
      // console.log(`... candidate: ${event.candidate}`);
      connProps.from.emit('ice-candidate', {
        candidate: event.candidate,
        from: connProps.from.id,
        to: connProps.to,
        room: connProps.room,
      });
    } else {
      console.log(':warning: No more ICE candidates.');
    }
  };

  peer.ontrack = (event) => {
    console.log(`i received remote track from ${connProps.to}`);
    // TODO: check if there are more streams than [0] ?
    connProps.streamsRef.current[connProps.to] = event.streams[0];
  };

  connProps.peersRef.current[connProps.to] = peer;
}

export { createConnection };
