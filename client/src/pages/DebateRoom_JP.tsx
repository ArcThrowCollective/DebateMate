import React, { useEffect, useRef, useState, useCallback } from 'react';
import VideoChat from '../components/VideoChat';
import useUserMedia from '../hooks/useUserMedia';
import { io, Socket } from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';
import env from '../../env';

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
  const id = searchParams.get('id');
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
  useEffect(() => {
    if (!id || !userName) return;
    setUserName(userName);
    const socket = io('https://194.164.53.5:8181', {
      auth: { userName, id },
    });
    socketRef.current = socket;
    console.log('Your socket id is: ', socketRef.current);
    socket.emit('joinRoom', room);
    console.log(`Joining room: ${room}`);
    socket.on('roomParticipants', (participants: Participant[]) => {
      console.log(`:busts_in_silhouette: Participants in room:`, participants);
      participants.forEach(({ socketId }) => {
        if (!peersRef.current[socketId] && socketId !== socket.id) {
          console.log(`:clapper: Creating peer connection for ${socketId}`);
          createPeerConnection(socketId, true);
        }
      });
    });
    socket.on(
      'roomParticipants',
      (participants: { socketId: string; userName: string }[]) => {
        participants.forEach(({ socketId }) => {
          if (!peersRef.current[socketId] && socketId !== socket.id) {
            createPeerConnection(socketId, true);
          }
        });
      }
    );
    socket.on(
      'offer',
      async ({
        offer,
        from,
      }: {
        offer: RTCSessionDescriptionInit;
        from: string;
      }) => {
        console.log(`Received offer from ${from}`);
        if (!peersRef.current[from]) {
          createPeerConnection(from, false);
        }
        // Sets the remote peer
        const peer = peersRef.current[from];
        await peer.setRemoteDescription(new RTCSessionDescription(offer));
        console.log(`:white_check_mark: Remote description set for ${from}`);
        if (streamsRef.current[from]?.candidates) {
          console.log(`Adding stored ICE candidates for ${from}`);
          streamsRef.current[from].candidates.forEach(async (candidate) => {
            await peer.addIceCandidate(new RTCIceCandidate(candidate));
          });
          streamsRef.current[from].candidates = [];
        }
        // Create answer
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        socket.emit('answer', {
          answer,
          from: socketRef.current?.id,
          to: from,
          room,
        });
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
        }
      }
    );
    socket.on('requestOffer', ({ newUser }) => {
      console.log(`:large_green_circle: Request to send offer to ${newUser}`);
      // Check if a connection exists, if not create one
      if (!peersRef.current[newUser] && socketRef.current?.id) {
        createPeerConnection(socketRef.current.id, true); // Set as Initiator and socketId as peer information
      }
    });
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
        const peer = peersRef.current[from];
        if (!peer) {
          console.warn(
            `:warning: Peer connection for ${from} not found, storing candidate...`
          );
          // Store the ICE candidate for later use
          if (!streamsRef.current[from]) {
            streamsRef.current[from] = { stream: undefined, candidates: [] };
          }
          streamsRef.current[from].candidates.push(candidate);
        }
        // only add ice candidate if remoteDescription exists
        if (!peer.remoteDescription) {
          console.warn(
            `:warning: No remote description for ${from}, delaying ICE candidate...`
          );
          setTimeout(
            () => peer.addIceCandidate(new RTCIceCandidate(candidate)),
            100
          );
        } else {
          await peer.addIceCandidate(new RTCIceCandidate(candidate));
          console.log(
            `:white_check_mark: Successfully added ICE candidate from ${from}`
          );
        }
      }
    );
    return () => {
      socket.emit('leaveRoom', room);
      socket.disconnect();
    };
  }, [username]);
  const createPeerConnection = useCallback(
    (peerId: string, isInitiator: boolean) => {
      const peer = new RTCPeerConnection({
        iceServers: [
          // { urls: 'stun:stun.l.google.com:19302' }
          { urls: [`stun:${env.STUN_HOST}:${env.STUN_PORT}`] },
          {
            urls: [`turn:${env.TURN_HOST}:${env.TURN_PORT}`],
            username: env.TURN_USER,
            credential: env.TURN_PWD,
          },
        ],
      });
      peersRef.current[peerId] = peer;
      peer.onicecandidate = (event) => {
        if (event.candidate) {
          console.log(
            `:arrow_up_small: Sending ICE candidate to ${peerId}:`,
            event.candidate
          );
          socketRef.current?.emit('ice-candidate', {
            candidate: event.candidate,
            from: socketRef.current?.id,
            to: peerId,
            room,
          });
          console.log(`Sent ICE candidate to ${peerId}`);
        } else {
          console.log(':warning: No more ICE candidates.');
        }
      };
      peer.ontrack = (event) => {
        console.log(`Received remote track from ${peerId}`);
        if (!streamsRef.current[peerId]) {
          // note: redundant
          streamsRef.current[peerId] = { candidates: [] };
        }
        if (!streamsRef.current[peerId]) {
          streamsRef.current[peerId] = {
            stream: event.streams[0],
            candidates: [],
          };
        } else {
          streamsRef.current[peerId].stream = event.streams[0];
        }
        setStreams((prev) => ({
          ...prev,
          [peerId]: { ...streamsRef.current[peerId] },
        }));
      };
      if (stream) {
        stream.getTracks().forEach((track) => peer.addTrack(track, stream));
      }
      if (isInitiator && peerId !== socketRef.current?.id) {
        //Only send offer if theres another peer
        peer
          .createOffer()
          .then((offer) => {
            peer.setLocalDescription(offer);
            socketRef.current?.emit('offer', {
              offer,
              from: userName,
              to: peerId,
              room,
            });
            console.log(`Sent offer to ${peerId}`);
          })
          .catch((error) => console.error('Error creating offer:', error));
      }
      peersRef.current[peerId] = peer;
      setPeers((prev) => ({ ...prev, [peerId]: peer }));
    },
    [stream]
  );
  // useEffect(() => {
  //   return () => {
  //     Object.values(peersRef.current).forEach((peer) => peer.close());
  //     setPeers({});
  //     setStreams({});
  //   };
  // }, []);
  return (
    <div>
      <h2>{username} - Debate Room</h2>
      <VideoChat stream={stream} error={error} videoRef={videoRef} />
      <div>
        <h3>Participants</h3>
        {Object.keys(streams).map((peerId) => (
          <video
            key={peerId}
            ref={(el) => el && (el.srcObject = streams[peerId])}
            autoPlay
            playsInline
          />
        ))}
      </div>
    </div>
  );
};
export default DebateRoom;
