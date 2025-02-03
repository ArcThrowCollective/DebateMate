import { useRef, useEffect, useState } from 'react';
import VideoChat from '../components/VideoChat';
import useUserMedia from '../hooks/useUserMedia';
import { createConnection } from '../services/RTC.Service';
import { io, Socket } from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';
import env from '../../env';

type Props = {};
type PeerConnections = { [id: string]: RTCPeerConnection };
type Streams = { [id: string]: MediaStream };
type Participant = {
  socketId: string;
  userName: string;
};
const DebateRoom = (props: Props) => {
  const [searchParams] = useSearchParams();
  // TODO: reset to searchParams
  // const userName = searchParams.get('username');
  // const roomId = searchParams.get('roomid'); // was id
  const userName = 'username';
  const roomId = 'roomid'; // was id
  const room = 'test';
  // Collect all sockets, peers and streams in objects
  const socketRef = useRef<Socket | null>(null);
  const peersRef = useRef<PeerConnections>({});
  const streamsRef = useRef<Streams>({});
  // const [peers, setPeers] = useState<PeerConnections>({});
  // const [streams, setStreams] = useState<Streams>({});
  const [username, setUserName] = useState<string>('');
  const userStreamHasBeenCreated = useRef<boolean>(false);
  // set up <video> Refs
  const {
    stream: streamLoc,
    error: errorLoc,
    videoRef: videoRefLoc,
  } = useUserMedia({
    video: true,
    audio: false,
  });
  const videoRefRem = useRef<HTMLVideoElement>(null);

  // one-to-one variables (temporary)
  const remotePeerSocketId = useRef<string>('TMP REMOTE ID');
  const remoteStream = useRef<Streams>();

  // run all connection logic once
  useEffect(() => {
    // create socket
    // setUserName(userName);
    const socket = io(`https://${env.SIGNAL_HOST}:${env.SIGNAL_PORT}`, {
      auth: { userName, roomId },
    });
    socketRef.current = socket;
    console.log('Your socket id is: ', socketRef.current.id);

    // one-to-one: get remote ID (on new user joining room)
    socket.on('requestOffer', async (requestOffer) => {
      console.log(`i got requestOffer for new user: ${requestOffer.newUser}`);

      // Create connection and update state list
      if (!peersRef.current[requestOffer.newUser]) {
        createConnection({
          from: socketRef.current,
          to: requestOffer.newUser,
          room: room,
          peersRef: peersRef,
          streamsRef: streamsRef,
        });
      }
      console.log(peersRef.current);
      const peer = peersRef.current[requestOffer.newUser];

      // create offer
      peer
        .createOffer()
        .then((offer) => {
          peer.setLocalDescription(offer);
          console.log(`... set localDescription with created offer`);
          socketRef.current?.emit('offer', {
            offer,
            from: socketRef.current?.id,
            to: requestOffer.newUser,
            room,
          });
          console.log(`Sent offer to ${requestOffer.newUser}`);
        })
        .catch((error) => console.error('Error creating offer:', error));
      // peersRef.current[remotePeerSocketId.current] = peer;
    });

    // join room
    socket.emit('joinRoom', room);
    console.log(`Joining room: ${room}`);

    // TODO remove: initially created new local stream for peer connection
    // (async () => {
    //   const localStream = await navigator.mediaDevices.getUserMedia({
    //     video: true,
    //     audio: false,
    //   });
    //   // Push tracks from local stream to peer connection
    //   localStream.getTracks().forEach((track) => {
    //     peer.addTrack(track, localStream);
    //   });
    // })();

    // Push tracks from local stream to each peer connection
    // TODO: flag "broadcasting" or "is speaker"
    if (streamLoc) {
      streamLoc.getTracks().forEach((track) => {
        for (let peerId in peersRef.current) {
          peersRef.current[peerId].addTrack(track, streamLoc);
        }
      });
      console.log('+ local stream tracks added to peer connection');
    } else {
      console.log('WARNING: no local stream found to add to peer connection');
      console.log(streamLoc);
    }

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
        const offerFrom = from;
        if (!offerFrom) {
          console.log('WARNING: received offer from UNDEFINED');
          return;
        }
        console.log(`i received offer from ${offerFrom}`);
        if (!peersRef.current[offerFrom]) {
          createConnection({
            from: socketRef.current,
            to: offerFrom,
            room: room,
            peersRef: peersRef,
            streamsRef: streamsRef,
          });
          console.log(`# created connection to ${offerFrom}`);
        }
        const peer = peersRef.current[offerFrom];
        await peer.setRemoteDescription(new RTCSessionDescription(offer));
        console.log(`R Remote description set for ${offerFrom}`);
        // create answer
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        socket.emit('answer', {
          answer,
          from: socketRef.current?.id,
          to: offerFrom,
          room,
        });
        console.log(`o Sent answer to ${offerFrom}`);
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
        if (!peersRef.current[from]) {
          // createConnection({
          //   from: socketRef.current,
          //   to: answerFrom,
          //   room: room,
          // setPeers: setPeers,
          // });
          console.log(`WARNING: got answer from non-connected: ${from}`);
        }
        const peer = peersRef.current[from];
        console.log(`i received answer from ${from} in ${room}`);
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
        if (!peersRef.current[from]) {
          // createConnection({
          //   from: socketRef.current,
          //   to: answerFrom,
          //   room: room,
          //   setPeers: setPeers,
          // });
          console.log(`WARNING: got cand from non-connected: ${from}`);
        }
        const peer = peersRef.current[from];
        console.log(`i received ICE candidate from ${from}`);
        await peer.addIceCandidate(new RTCIceCandidate(candidate));
        console.log(`Successfully added ICE candidate from ${from}`);
      }
    );
    return () => {
      socket.emit('leaveRoom', room);
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div>
        <VideoChat
          stream={streamLoc}
          error={errorLoc}
          videoRef={videoRefLoc}
        ></VideoChat>
        <VideoChat
          stream={streamsRef.current[remotePeerSocketId.current]?.stream}
          error={null}
          videoRef={videoRefRem}
        ></VideoChat>
      </div>
    </>
  );
};

export default DebateRoom;
