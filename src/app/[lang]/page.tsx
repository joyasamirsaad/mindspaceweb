// app/[lang]/page.tsx
export default function LangPage({
  params,
}: {
  params: { lang: string };
}) {
  return <h1>Hello from locale: {params.lang}</h1>;
}
