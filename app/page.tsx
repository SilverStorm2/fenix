import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const trainingGroups = [
    { day: "Wtorki/Czwartki", time: "16:30–17:30", group: "Skrzaty" },
    { day: "Wtorki/Czwartki", time: "17:30–19:00", group: "Żaki" },
    { day: "Poniedziałki/Środy", time: "17:00–18:30", group: "Orliki" },
  ];
  const uniqueTrainingGroups = trainingGroups.filter(
    (slot, index, self) =>
      self.findIndex(
        (item) =>
          item.day === slot.day &&
          item.time === slot.time &&
          item.group === slot.group
      ) === index
  );

  return (
    <div className="min-h-screen bg-fenix-black text-gray-100">
      <div className="relative overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fenix-gold/10 blur-3xl"></div>
        <div className="absolute -bottom-40 right-[-120px] h-[420px] w-[420px] rounded-full bg-fenix-gold/10 blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(218,165,32,0.12),_transparent_55%)]"></div>
      </div>

      <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-24 pt-12 sm:px-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient shadow-lg">
              <span className="text-2xl">⚽</span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-fenix-gold/70">
                Fenix Academy
              </p>
              <h1 className="text-lg font-semibold text-fenix-gold">
                Szkółka Piłkarska FENIX
              </h1>
            </div>
          </div>
          <Link
            href="#kontakt"
            className="hidden rounded-full border border-fenix-gold/40 px-5 py-2 text-sm font-semibold text-fenix-gold transition hover:border-fenix-gold hover:text-fenix-gold-dark sm:inline-flex"
          >
            Zapisz dziecko
          </Link>
        </header>

        <section className="mt-12">
          <div className="relative overflow-hidden rounded-3xl border border-fenix-gold/20 bg-black/40 shadow-2xl">
            <div className="h-40 w-full bg-[radial-gradient(circle_at_top,_rgba(182,255,59,0.25),_transparent_60%)] sm:h-48 lg:h-56"></div>
          </div>
          <div className="relative -mt-12 flex flex-col items-center gap-4 text-center sm:-mt-16">
            <div className="h-24 w-24 rounded-full border border-fenix-gold/30 bg-fenix-black p-2 shadow-xl sm:h-28 sm:w-28">
              <Image
                src="/images/logo-fenix.png"
                alt="Logo Fenix Team"
                width={180}
                height={180}
                className="h-full w-full rounded-full object-contain"
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.4em] text-fenix-gold/70">
                Szkółka piłkarska
              </p>
              <h2 className="text-3xl font-extrabold sm:text-4xl">Fenix Team</h2>
              <p className="max-w-2xl text-sm text-gray-300">
                Ruch. Charakter. Drużyna. Treningi dla dzieci i młodzieży w Bochni.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="#wydarzenia" className="btn-black text-center">
                Zobacz wydarzenia
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-400">
              <span className="rounded-full border border-fenix-gold/30 px-3 py-1">
                Treningi 2-3 razy w tygodniu
              </span>
              <span className="rounded-full border border-fenix-gold/30 px-3 py-1">
                Licencjonowani trenerzy
              </span>
              <span className="rounded-full border border-fenix-gold/30 px-3 py-1">
                Małe grupy szkoleniowe
              </span>
            </div>
          </div>
        </section>

        <section id="o-nas" className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Mądre szkolenie",
              description:
                "Treningi prowadzone w oparciu o rozwój techniczny i motoryczny.",
            },
            {
              title: "Atmosfera drużyny",
              description:
                "Budujemy pewność siebie i współpracę, nie tylko wyniki.",
            },
            {
              title: "Opieka trenerska",
              description:
                "Stały kontakt z trenerami oraz jasne cele rozwoju.",
            },
          ].map((item) => (
            <div key={item.title} className="card space-y-3">
              <h3 className="text-lg font-semibold text-fenix-gold">
                {item.title}
              </h3>
              <p className="text-sm leading-6 text-gray-300">{item.description}</p>
            </div>
          ))}
        </section>

        <section id="oferta" className="mt-20 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <h3 className="text-3xl font-extrabold heading-gold">Oferta treningów</h3>
            <p className="text-sm text-gray-300">
              Grupy szkoleniowe podzielone są według wieku i poziomu. Stawiamy na
              solidne fundamenty techniczne, gry zadaniowe i rozwój motoryczny.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {[
              { title: "Skrzaty (2017–2018)", desc: "Pierwszy kontakt z piłką i zabawą ruchową." },
              { title: "Żaki (2015–2016)", desc: "Technika, prowadzenie piłki, małe gry." },
              { title: "Orliki (2013–2014)", desc: "Taktyka, dynamika, rozwój siły i szybkości." },
              { title: "Bramkarze", desc: "Dedykowane zajęcia dla młodych bramkarzy." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-fenix-gold/20 bg-black/30 p-4">
                  <p className="font-semibold text-fenix-gold">{item.title}</p>
                  <p className="text-xs text-gray-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card space-y-4">
            <h4 className="text-lg font-semibold text-fenix-gold">Grupy treningowe</h4>
            {uniqueTrainingGroups.map((slot) => (
              <div
                key={`${slot.day}-${slot.group}`}
                className="flex items-center justify-between rounded-lg border border-fenix-gold/10 bg-black/30 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-semibold text-gray-200">{slot.day}</p>
                  <p className="text-xs text-gray-400">{slot.group}</p>
                </div>
                <span className="text-fenix-gold font-semibold">{slot.time}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="wydarzenia" className="mt-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-fenix-gold/70">
                Aktualności
              </p>
              <h3 className="text-3xl font-extrabold heading-gold">Wydarzenia</h3>
            </div>
            <Link href="#kontakt" className="text-sm font-semibold text-fenix-gold hover:text-fenix-gold-dark">
              Zgłoś udział
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { title: "Turniej FENIX CUP", date: "12.10.2026", desc: "Rozgrywki dla roczników 2013–2016." },
              { title: "Obóz zimowy", date: "20–26.01.2027", desc: "Tygodniowy wyjazd z treningami i atrakcjami." },
              { title: "Dzień otwarty", date: "05.09.2026", desc: "Bezpłatny trening pokazowy dla nowych zawodników." },
            ].map((event) => (
              <article key={event.title} className="card space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-fenix-gold/70">
                  {event.date}
                </p>
                <h4 className="text-lg font-semibold text-fenix-gold">{event.title}</h4>
                <p className="text-sm text-gray-300">{event.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="galeria" className="mt-20">
          <h3 className="text-3xl font-extrabold heading-gold">Galeria</h3>
          <p className="mt-2 text-sm text-gray-300">
            Wstaw swoje zdjęcia do folderu `public/images/` i podmień nazwy poniżej.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "/images/518298034_748692270872473_1036527804555656099_n.jpg",
              "/images/557772285_666219966540771_5808923345919708690_n.jpg",
              "/images/573308965_17927587053137785_5287288249025965219_n.jpg",
              "/images/581872836_17928897000137785_598989839069452904_n.jpg",
              "/images/597371147_718926114603489_1950497919387894869_n.jpg",
              "/images/597880635_718929877936446_7055604293395048289_n.jpg",
            ].map((src) => (
              <div key={src} className="overflow-hidden rounded-2xl border border-fenix-gold/20 bg-black/30">
                <Image
                  src={src}
                  alt="Galeria FENIX"
                  width={520}
                  height={360}
                  className="h-56 w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>

        <section id="kontakt" className="mt-20 flex flex-col gap-6 rounded-2xl border border-fenix-gold/20 bg-gradient-to-br from-fenix-black via-gray-900 to-black px-6 py-10 text-center sm:px-12">
          <h3 className="text-2xl font-extrabold heading-gold">Prezentacja</h3>
          <p className="max-w-2xl text-sm text-gray-300">
            Szkółka piłkarska, której celem jest rozwijanie pasji do sportu już od
            najmłodszych lat.
          </p>
          <div className="flex flex-col items-center gap-3 text-sm text-gray-200">
            <p>📍 32-700, Bochnia, Poland</p>
            <p>📞 602 321 640</p>
            <p>✉️ fenixteambochnia@gmail.com</p>
            <a
              href="https://www.facebook.com/profile.php?id=100094583193524"
              className="text-fenix-gold hover:text-fenix-gold-dark"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </div>
          <Link href="mailto:fenixteambochnia@gmail.com" className="btn-gold">
            Napisz do nas
          </Link>
        </section>
      </main>
    </div>
  );
}
