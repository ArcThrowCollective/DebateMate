import { useRef, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import env from '../../env';
import { useDispatch } from 'react-redux';
import { setStreamLeft, setStreamRight } from '../state/stream/streamSlice';

type Props = {
  roomId: string;
  userName: string;
  video?: boolean;
  audio?: boolean;
};
type PeerConnections = { [id: string]: RTCPeerConnection };

export default function RemoteStream(props: Props) {
  const dispatch = useDispatch();
  const room = props.roomId;
  const userName = props.userName;
  // Collect socket IDs and peers in objects
  const socketLocal = useRef<Socket | null>(null);
  const socketIdRemote = useRef<string>('TMP REMOTE ID');
  const peersRef = useRef<PeerConnections>({});
  // set up <video> Refs
  const videoRefRem = useRef<HTMLVideoElement>(null);

  // set left stream to local webcam stream
  (async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: props.video || true,
      audio: props.audio || true,
    });
    dispatch(setStreamLeft(localStream));
  })();

  // run all connection logic once
  useEffect(() => {
    // create socket
    const socket = io(`https://${env.SIGNAL_HOST}:${env.SIGNAL_PORT}`, {
      auth: { userName, room },
    });
    socketLocal.current = socket;

    // one-to-one: get remote ID (on new user joining room)
    socket.on('requestOffer', async (requestOffer) => {
      socketIdRemote.current = requestOffer.newUser;
      console.log('i Remote socketId on requestOffer:', socketIdRemote.current);
      console.log('# Your socket id is: ', socketLocal.current.id);

      // Push tracks from local stream to peer connection
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: props.video || true,
        audio: props.audio || false,
      });
      console.log('= Adding local stream tracks too peer connection');
      localStream.getTracks().forEach((track) => {
        peer.addTrack(track, localStream);
      });

      // create offer
      peer
        .createOffer()
        .then((offer) => {
          peer.setLocalDescription(offer);
          console.log(`... set localDescription`);
          socketLocal.current?.emit('offer', {
            offer,
            from: socketLocal.current?.id,
            to: socketIdRemote.current,
            room,
          });
          console.log(`o Sent offer to ${socketIdRemote.current}`);
        })
        .catch((error) => console.error('Error creating offer:', error));
      peersRef.current[socketIdRemote.current] = peer;
    });

    // join room
    socket.emit('joinRoom', room);
    console.log(`# Joining room: ${room}`);

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
        console.log(
          `o Sending ICE candidate to ${socketIdRemote.current}:`
          // , event.candidate // <- uncomment for more info about ICE candidates
        );
        socketLocal.current?.emit('ice-candidate', {
          candidate: event.candidate,
          from: socketLocal.current?.id,
          to: socketIdRemote.current,
          room,
        });
      } else {
        console.log(':warning: No more ICE candidates.');
      }
    };

    peer.ontrack = (event) => {
      console.log(`= Received remote track from ${socketIdRemote.current}`);
      videoRefRem.current!.srcObject = event.streams[0];
      dispatch(setStreamRight(event.streams[0]));
    };

    // handle offer
    socketLocal.current?.on(
      'offer',
      async ({
        offer,
        from,
      }: {
        offer: RTCSessionDescriptionInit;
        from: string;
      }) => {
        console.log(`i Received offer from ${from}`);
        console.log('# Your socket id is: ', socketLocal.current.id);

        // set our remote's socket ID to that of the sender of the offer
        socketIdRemote.current = from;

        // Push tracks from local stream to peer connection
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: props.video || true,
          audio: props.audio || false,
        });
        console.log('= Adding local stream tracks too peer connection');
        localStream.getTracks().forEach((track) => {
          peer.addTrack(track, localStream);
        });

        // see line 73 of prototype:
        // IF NOT already sent an offer to the remotePeer, createConnection(remote, FALSE)
        await peer.setRemoteDescription(new RTCSessionDescription(offer));
        console.log(`... set remoteDescription with offer for ${from}`);
        // create answer
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        console.log(`... set localDescription with answer to ${from}`);
        socket.emit('answer', {
          answer,
          from: socketLocal.current?.id,
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
          console.log(`... set remoteDescription`);
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
        console.log(`_ Received ICE candidate from ${from}`);
        await peer.addIceCandidate(new RTCIceCandidate(candidate));
        console.log(`_ Successfully added ICE candidate from ${from}`);
      }
    );
    return () => {
      socket.emit('leaveRoom', room);
      socket.disconnect();
    };
  }, []);

  // JSX //
  return (
    <>
      <video ref={videoRefRem} autoPlay playsInline />
    </>
  );
}
