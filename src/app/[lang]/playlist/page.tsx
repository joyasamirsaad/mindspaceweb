// app/playlist/page.tsx or pages/playlist.tsx (Next.js page)
'use client';

import Playlist from '../../../../components/Playlist';

export default function PlaylistPage() {
  const urls = [
    'https://youtu.be/QqiqISFT15w?feature=shared',
    'https://youtu.be/lMGHr5LSkYM?feature=shared',
    'https://youtu.be/NofWNvNU6Gk?feature=shared',
    'https://open.spotify.com/track/0Rl9X1PtunHz7w7A0oRIdn?si=8WMKy8VKSDqHUtF4Dc9XIg&context=spotify%3Atrack%3A0Rl9X1PtunHz7w7A0oRIdn',
    'https://open.spotify.com/track/3UxUrXb7owbD1JG1RLRV24?si=TDQ1eTXtTQ-lGbCS4TZDog&context=spotify%3Atrack%3A3UxUrXb7owbD1JG1RLRV24&nd=1&dlsi=0aa4f9476541463e',
    'https://open.spotify.com/track/3ZTuYuaV1fhdNnuIBuzTYy?si=qBmr-UscSlicNkILR53ZXQ&context=spotify%3Aplaylist%3A37i9dQZF1DWTTCCEjVC99N', 
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 md:px-20 py-20">
        <h1 className="text-2xl md:text-4xl font-bold mb-6">Playlist</h1>
        <Playlist urls={urls} />
      </div>
    </div>
  );
}
