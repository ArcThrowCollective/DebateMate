interface ChannelPageProps {
  channelId: string;
}

export default function ChannelPage({ channelId }: ChannelPageProps) {
  return (
    <div>
      <h1 className="text-3xl">Channel: {channelId}</h1>
      <p>
        Cool channel stuff happens on my page, i only debate the greatest
        topics... but i have rules!
      </p>
      <p>Rules:</p>
    </div>
  );
}
