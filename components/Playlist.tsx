import React from 'react';

type Props = {
  urls: string[];
};

const Playlist: React.FC<Props> = ({ urls }) => {
  const youtubeEmbeds: string[] = [];
  const spotifyEmbeds: string[] = [];

  urls.forEach((url) => {
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
    if (ytMatch) {
      youtubeEmbeds.push(`https://www.youtube.com/embed/${ytMatch[1]}`);
      return;
    }

    const spotifyMatch = url.match(/open\.spotify\.com\/(track|album|playlist)\/([\w]+)/);
    if (spotifyMatch) {
      const [_, type, id] = spotifyMatch;
      spotifyEmbeds.push(`https://open.spotify.com/embed/${type}/${id}`);
      return;
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {youtubeEmbeds.length > 0 && (
        <>
            <h2 className="col-span-full text-white text-xl font-bold mb-4">YouTube</h2>
            {youtubeEmbeds.slice(0, 3).map((src, idx) => (
            <div key={`yt-${idx}`} className="aspect-video rounded-xl shadow overflow-hidden">
                <iframe
                src={src}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                />
            </div>
            ))}
        </>
        )}

        
        {spotifyEmbeds.length > 0 && (
        <>
            <h2 className="col-span-full text-white text-xl font-bold mb-4 mt-8">Spotify</h2>
            {spotifyEmbeds.slice(0, 3).map((src, idx) => (
            <div key={`spotify-${idx}`} className="rounded-xl shadow overflow-hidden" style={{ minHeight: 380 }}>
                <iframe
                src={src}
                width="100%"
                height={380}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen"
                className="w-full"
                loading="lazy"
                />
            </div>
            ))}
        </>
        )}
    </div>
);


};

export default Playlist;
