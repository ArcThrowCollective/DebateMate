import { useRef, useEffect, useState } from 'react';
import VideoChat from '../components/VideoChat';
import useUserMedia from '../hooks/useUserMedia';
import { io, Socket } from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';

type Props = {};
type PeerConnections = { [id: string]: RTCPeerConnection };
type Streams = {
  [id: string]: {
    stream?: MediaStream;
    candidates: RTCIceCandidateInit[];
  };
};
type Participant = {
  socketId: string;
  userName: string;
};
const DebateRoom = (props: Props) => {
  const [searchParams] = useSearchParams();
  const userName = searchParams.get('username');
  const roomId = searchParams.get('roomid'); // was id
  const room = 'test';
  // Collect all sockets, peers and streams in objects
  const socketRef = useRef<Socket | null>(null);
  const peersRef = useRef<PeerConnections>({});
  const streamsRef = useRef<Streams>({});
  const [peers, setPeers] = useState<PeerConnections>({});
  const [streams, setStreams] = useState<Streams>({});
  const [username, setUserName] = useState<string>('');
  const { stream, error, videoRef } = useUserMedia({
    video: true,
    audio: false,
  });

  // one-to-one variables (temporary)
  const remotePeerSocketId = useRef<string>('TMP REMOTE ID');

  // run all connection logic once
  useEffect(() => {
    // create socket
    // setUserName(userName);
    const socket = io('https://194.164.53.5:8181', {
      auth: { userName, roomId },
    });
    socketRef.current = socket;
    console.log('Your socket id is: ', socketRef.current);

    // one-to-one: get remote ID (on new user joining room)
    socket.on('requestOffer', async (requestOffer) => {
      remotePeerSocketId.current = requestOffer.newUser;
      console.log(
        'i Got remote user id on requestOffer event: ',
        remotePeerSocketId.current
      );

      // FIX: NEED TO ADD TRACKS TO SEND OUT ICE CANDIDATES
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      // Push tracks from local stream to peer connection
      localStream.getTracks().forEach((track) => {
        peer.addTrack(track, localStream);
      });

      // create offer
      peer
        .createOffer()
        .then((offer) => {
          peer.setLocalDescription(offer);
          console.log(`... setting localDescription`);
          socketRef.current?.emit('offer', {
            offer,
            from: socketRef.current?.id,
            to: remotePeerSocketId.current,
            room,
          });
          console.log(`Sent offer to ${remotePeerSocketId.current}`);
        })
        .catch((error) => console.error('Error creating offer:', error));
      peersRef.current[remotePeerSocketId.current] = peer;
    });

    // join room
    socket.emit('joinRoom', room);
    console.log(`Joining room: ${room}`);

    // socket.on('remoteID', (remoteId) => {
    //   if (remoteId === socketRef.current) return;
    //   remotePeerSocketId.current = remoteId;
    // });

    // set up peer connection
    const peer = new RTCPeerConnection({
      iceServers: [
        // { urls: ['stun:stun.l.google.com:19302'] },
        { urls: ['stun:188.245.183.220:5349'] },
        // { urls: ['stun:188.245.183.220:5349', 'turn:188.245.183.220:5349'] },
      ],
    });

    peer.onicecandidate = (event) => {
      console.log('onicecandidate triggered');
      if (event.candidate) {
        console.log(
          `o Sending ICE candidate to ${remotePeerSocketId.current}:`,
          event.candidate
        );
        socketRef.current?.emit('ice-candidate', {
          candidate: event.candidate,
          from: socketRef.current?.id,
          to: remotePeerSocketId.current,
          room,
        });
      } else {
        console.log(':warning: No more ICE candidates.');
      }
    };

    // handle offer
    socketRef.current?.on(
      'offer',
      async ({
        offer,
        from,
      }: {
        offer: RTCSessionDescriptionInit;
        from: string;
      }) => {
        console.log(`Received offer from ${from}`);
        // see line 73 of prototype:
        // IF NOT already sent an offer to the remotePeer, createConnection(remote, FALSE)
        await peer.setRemoteDescription(new RTCSessionDescription(offer));
        console.log(`R Remote description set for ${from}`);
        // create answer
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        socket.emit('answer', {
          answer,
          from: socketRef.current?.id,
          to: from,
          room,
        });
        console.log('o Sent answer to ', from);
      }
    );
    socket.on(
      'answer',
      async ({
        answer,
        from,
        room,
      }: {
        answer: RTCSessionDescriptionInit;
        from: string;
        room: string;
      }) => {
        console.log(`Received answer from ${from} in ${room}`);
        const peer = peersRef.current[from];
        if (peer) {
          await peer.setRemoteDescription(new RTCSessionDescription(answer));
          console.log(`... set remoteDescritption`);
        }
      }
    );
    socket.on(
      'ice-candidate',
      async ({
        candidate,
        from,
      }: {
        candidate: RTCIceCandidateInit;
        from: string;
      }) => {
        console.log(`Received ICE candidate from ${from}`);
        await peer.addIceCandidate(new RTCIceCandidate(candidate));
        console.log(
          `:white_check_mark: Successfully added ICE candidate from ${from}`
        );
      }
    );
    return () => {
      socket.emit('leaveRoom', room);
      socket.disconnect();
    };
  }, []);

  // se

  return (
    <>
      <div>{/* <VideoChat></VideoChat> */}</div>
    </>
  );
};

export default DebateRoom;
