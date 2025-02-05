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

export default function RemoteStream({
  roomId,
  userName,
  video = true,
  audio = false,
}: Props) {
  const dispatch = useDispatch();
  const socketLocal = useRef<Socket | null>(null);
  const peersRef = useRef<{ [id: string]: RTCPeerConnection }>({});
  const videoRefRem = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const setupStream = async () => {
      try {
        // 🔹 Captura la cámara del usuario local y la asigna a Redux
        const localStream = await navigator.mediaDevices.getUserMedia({
          video,
          audio,
        });
        dispatch(setStreamLeft(localStream));

        // 🔹 Crea la conexión WebRTC
        const socket = io(`https://${env.SIGNAL_HOST}:${env.SIGNAL_PORT}`, {
          auth: { userName, room: roomId },
        });
        socketLocal.current = socket;

        const peer = new RTCPeerConnection({
          iceServers: [
            { urls: [`stun:${env.STUN_HOST}:${env.STUN_PORT}`] },
            {
              urls: [`turn:${env.TURN_HOST}:${env.TURN_PORT}`],
              username: env.TURN_USER,
              credential: env.TURN_PWD,
            },
          ],
        });

        peer.ontrack = (event) => {
          console.log(`= Received remote track`);
          if (event.streams.length > 0) {
            dispatch(setStreamRight(event.streams[0])); // 🔹 Guarda el stream remoto en Redux
            if (videoRefRem.current) {
              videoRefRem.current.srcObject = event.streams[0]; // 🔹 Muestra el stream en el video
            }
          }
        };

        socket.on('requestOffer', async ({ newUser }) => {
          console.log(`i Received offer request from ${newUser}`);
          const localStream = await navigator.mediaDevices.getUserMedia({
            video,
            audio,
          });

          localStream.getTracks().forEach((track) => {
            peer.addTrack(track, localStream);
          });

          const offer = await peer.createOffer();
          await peer.setLocalDescription(offer);
          socket.emit('offer', {
            offer,
            from: socket.id,
            to: newUser,
            room: roomId,
          });
        });

        socket.on('offer', async ({ offer, from }) => {
          await peer.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await peer.createAnswer();
          await peer.setLocalDescription(answer);
          socket.emit('answer', {
            answer,
            from: socket.id,
            to: from,
            room: roomId,
          });
        });

        socket.on('answer', async ({ answer, from }) => {
          const peerConnection = peersRef.current[from];
          if (peerConnection) {
            await peerConnection.setRemoteDescription(
              new RTCSessionDescription(answer)
            );
          }
        });

        socket.on('ice-candidate', async ({ candidate, from }) => {
          await peer.addIceCandidate(new RTCIceCandidate(candidate));
        });

        socket.emit('joinRoom', roomId);
      } catch (error) {
        console.error('Error al obtener la cámara:', error);
      }
    };

    setupStream();
  }, [dispatch, roomId, userName, video, audio]);

  return <video ref={videoRefRem} autoPlay playsInline />;
}
