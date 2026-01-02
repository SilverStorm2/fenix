# FENIX Team App - Tailwind CSS (Czarny & Złoty)

## 1. Konfiguracja Tailwind - Paleta Czarno-Złota

### `tailwind.config.js`

```javascript name=tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // FENIX brand colors - Czarny i Złoty
        fenix: {
          black: '#0A0A0A',      // Głęboki czarny
          gold:  '#FFD700',       // Klasyczne złoto
          'gold-dark': '#DAA520', // Ciemniejsze złoto
          'gold-light': '#FFF4CC', // Jasne złoto (tła)
          success: '#10B981',    // Zielony (będzie)
          danger: '#EF4444',     // Czerwony (nie będzie)
          gray: '#9CA3AF',       // Szary (brak odpowiedzi)
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FFD700 0%, #DAA520 100%)',
        'black-gradient': 'linear-gradient(135deg, #1a1a1a 0%, #0A0A0A 100%)',
        'fenix-gradient': 'linear-gradient(135deg, #0A0A0A 0%, #DAA520 50%, #FFD700 100%)',
      },
    },
  },
  plugins: [],
}
```

---

## 2. Global Styles - `globals.css`

```css name=app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import Google Fonts - Montserrat (elegancki font) */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');

/* Custom base styles */
@layer base {
  body {
    @apply bg-fenix-black text-gray-100;
  }
}

/* Custom component styles */
@layer components {
  /* Przyciski */
  .btn-gold {
    @apply bg-fenix-gold hover:bg-fenix-gold-dark text-fenix-black font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover: scale-105;
  }
  
  . btn-black {
    @apply bg-fenix-black border-2 border-fenix-gold hover:bg-fenix-gold hover:text-fenix-black text-fenix-gold font-bold py-3 px-6 rounded-lg transition-all duration-300;
  }
  
  . btn-success {
    @apply bg-fenix-success hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg;
  }
  
  .btn-danger {
    @apply bg-fenix-danger hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg;
  }
  
  /* Karty */
  .card {
    @apply bg-gradient-to-br from-gray-900 to-fenix-black border border-fenix-gold/20 rounded-xl shadow-2xl p-6;
  }
  
  . card-gold {
    @apply bg-gradient-to-br from-fenix-gold-light to-fenix-gold border-2 border-fenix-gold-dark rounded-xl shadow-2xl p-6;
  }
  
  /* Input fields */
  .input-field {
    @apply w-full px-4 py-3 bg-gray-900 border-2 border-fenix-gold/30 rounded-lg text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-fenix-gold focus:border-fenix-gold transition-all;
  }
  
  /* Badge */
  .badge-gold {
    @apply inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-fenix-gold text-fenix-black;
  }
  
  /* Headings with gold accent */
  .heading-gold {
    @apply text-transparent bg-clip-text bg-gold-gradient font-extrabold;
  }
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }
  
  body {
    @apply bg-white text-black;
  }
  
  .card {
    @apply bg-white border-black;
  }
}

/* Gold shine animation */
@keyframes gold-shine {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position:  200% center;
  }
}

. gold-shine {
  background: linear-gradient(90deg, 
    #DAA520 0%, 
    #FFD700 25%, 
    #FFF4CC 50%, 
    #FFD700 75%, 
    #DAA520 100%
  );
  background-size: 200% auto;
  animation: gold-shine 3s linear infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color:  transparent;
  background-clip: text;
}
```

---

## 3. Komponenty z czarno-złotym motywem

### Komponent:  Login Page

```tsx name=app/admin/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push('/admin/treningi');
      } else {
        setError('Nieprawidłowy email lub hasło');
      }
    } catch (err) {
      setError('Coś poszło nie tak. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-fenix-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-fenix-gold/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-fenix-gold/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="card max-w-md w-full mx-4 relative z-10">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 mx-auto bg-gold-gradient rounded-full flex items-center justify-center shadow-xl">
              <span className="text-4xl">⚽</span>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold gold-shine mb-2">
            FENIX TEAM
          </h1>
          <p className="text-gray-400 text-sm">Panel trenerki</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-fenix-gold mb-2">
              Adres email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="anna. trenerka@fenix.pl"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-fenix-gold mb-2">
              Hasło
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target. value)}
              className="input-field"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full text-lg"
          >
            {loading ?  'Logowanie...' : 'Zaloguj się'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-fenix-gold hover: text-fenix-gold-dark transition-colors">
            Zapomniałeś hasła? 
          </a>
        </div>
      </div>
    </div>
  );
}
```

---

### Komponent: Training List

```tsx name=app/admin/treningi/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Training {
  id: string;
  trainingDate: string;
  trainingTime: string;
  group: { name: string };
  token: string;
  _count: {
    attendance: number;
  };
  totalPlayers: number;
}

export default function TrainingsPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainings();
  }, [filter]);

  const fetchTrainings = async () => {
    setLoading(true);
    const res = await fetch(`/api/trainings?filter=${filter}`);
    const data = await res.json();
    setTrainings(data);
    setLoading(false);
  };

  const copyLink = (token: string) => {
    const url = `${window.location.origin}/t/${token}`;
    navigator.clipboard.writeText(url);
    alert('Link skopiowany do schowka!');
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-fenix-black">
      {/* Header */}
      <header className="bg-gradient-to-r from-fenix-black to-gray-900 border-b-2 border-fenix-gold/30 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gold-gradient rounded-full flex items-center justify-center">
                <span className="text-2xl">⚽</span>
              </div>
              <h1 className="text-2xl font-extrabold gold-shine">
                FENIX TEAM
              </h1>
            </div>
            <button className="text-fenix-gold hover:text-fenix-gold-dark font-semibold transition-colors">
              Wyloguj
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg: px-8">
        {/* Title & Create Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-4xl font-extrabold text-fenix-gold mb-2">Treningi</h2>
            <p className="text-gray-400">Zarządzaj treningami i obecnością</p>
          </div>
          <Link href="/admin/treningi/nowy" className="btn-gold whitespace-nowrap">
            ✨ Utwórz trening
          </Link>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              filter === 'upcoming'
                ? 'bg-fenix-gold text-fenix-black shadow-lg'
                : 'bg-gray-900 text-gray-400 hover:text-fenix-gold border border-fenix-gold/20'
            }`}
          >
            📅 Nadchodzące
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              filter === 'past'
                ? 'bg-fenix-gold text-fenix-black shadow-lg'
                : 'bg-gray-900 text-gray-400 hover:text-fenix-gold border border-fenix-gold/20'
            }`}
          >
            📜 Przeszłe
          </button>
        </div>

        {/* Trainings Cards */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-fenix-gold border-t-transparent"></div>
            <p className="mt-4 text-gray-400 font-semibold">Ładowanie treningów...</p>
          </div>
        ) : trainings.length === 0 ?  (
          <div className="card text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-400 text-lg">Brak treningów do wyświetlenia</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainings.map((training) => (
              <div key={training.id} className="card hover:border-fenix-gold/60 transition-all duration-300 group">
                {/* Date Badge */}
                <div className="flex justify-between items-start mb-4">
                  <div className="badge-gold">
                    {formatDate(training.trainingDate)}
                  </div>
                  <div className="text-2xl">{training.trainingTime}</div>
                </div>

                {/* Group Name */}
                <h3 className="text-xl font-bold text-fenix-gold mb-4 group-hover:gold-shine transition-all">
                  {training.group.name}
                </h3>

                {/* Attendance Stats */}
                <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Obecność</span>
                    <span className="text-fenix-gold font-bold text-lg">
                      {training._count.attendance}/{training.totalPlayers}
                    </span>
                  </div>
                  <div className="mt-2 bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gold-gradient h-full transition-all duration-500"
                      style={{ 
                        width: `${(training._count.attendance / training. totalPlayers) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/admin/treningi/${training.id}`}
                    className="flex-1 bg-fenix-gold hover:bg-fenix-gold-dark text-fenix-black font-bold py-2 px-4 rounded-lg text-center transition-all"
                  >
                    👁️ Podgląd
                  </Link>
                  <button
                    onClick={() => copyLink(training.token)}
                    className="bg-gray-900 hover:bg-gray-800 text-fenix-gold border border-fenix-gold/30 font-bold py-2 px-4 rounded-lg transition-all"
                  >
                    📋
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
```

---

### Komponent: Parent Attendance Page

```tsx name=app/t/[token]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface Player {
  id: string;
  firstName: string;
  lastName: string;
}

interface Training {
  trainingDate: string;
  trainingTime: string;
  group: { name: string };
  players: Player[];
}

export default function AttendancePage() {
  const params = useParams();
  const token = params.token as string;

  const [training, setTraining] = useState<Training | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [status, setStatus] = useState<'will_attend' | 'will_not_attend' | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTraining();
  }, [token]);

  const fetchTraining = async () => {
    try {
      const res = await fetch(`/api/attendance/${token}`);
      if (res.ok) {
        const data = await res.json();
        setTraining(data);
      } else {
        setError('Link nie został znaleziony lub wygasł.');
      }
    } catch (err) {
      setError('Coś poszło nie tak. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedPlayer || !status) return;

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch(`/api/attendance/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: selectedPlayer,
          status,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.message || 'Coś poszło nie tak.');
      }
    } catch (err) {
      setError('Coś poszło nie tak. Spróbuj ponownie.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-fenix-black">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-fenix-gold border-t-transparent"></div>
      </div>
    );
  }

  if (error && !training) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-fenix-black px-4">
        <div className="card max-w-md w-full text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-fenix-gold mb-2">Błąd</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (success) {
    const player = training?. players.find(p => p. id === selectedPlayer);
    return (
      <div className="min-h-screen flex items-center justify-center bg-fenix-black px-4">
        <div className="card max-w-md w-full text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gold-gradient rounded-full flex items-center justify-center animate-bounce">
            <span className="text-5xl">✅</span>
          </div>
          <h2 className="text-3xl font-bold gold-shine mb-3">Dziękujemy!</h2>
          <p className="text-gray-300 text-lg mb-8">
            Odpowiedź zapisana dla<br/>
            <span className="text-fenix-gold font-bold">{player?.firstName} {player?. lastName}</span>
          </p>
          <button
            onClick={() => {
              setSuccess(false);
              setSelectedPlayer('');
              setStatus(null);
            }}
            className="btn-black"
          >
            Zmień odpowiedź
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fenix-black flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-fenix-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-fenix-gold/5 rounded-full blur-3xl"></div>
      </div>

      <div className="card max-w-md w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-gold-gradient rounded-full flex items-center justify-center">
            <span className="text-3xl">⚽</span>
          </div>
          <h1 className="text-3xl font-extrabold gold-shine mb-1">
            FENIX TEAM
          </h1>
          <p className="text-gray-400 text-sm">Potwierdzenie obecności</p>
        </div>

        {/* Training Details */}
        <div className="bg-gradient-to-br from-fenix-gold/10 to-transparent border border-fenix-gold/20 rounded-xl p-5 mb-6">
          <h3 className="text-sm font-bold text-fenix-gold mb-3 flex items-center gap-2">
            <span>📅</span> Szczegóły treningu
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Data:</span>
              <span className="text-gray-100 font-semibold">{formatDate(training! .trainingDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Godzina:</span>
              <span className="text-gray-100 font-semibold">{training! .trainingTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Grupa:</span>
              <span className="text-fenix-gold font-bold">{training!.group.name}</span>
            </div>
          </div>
        </div>

        {/* Player Selection */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-fenix-gold mb-3 flex items-center gap-2">
            <span>👤</span> Wybierz zawodnika:
          </label>
          <select
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
            className="input-field text-lg font-semibold"
          >
            <option value="">-- Wybierz zawodnika --</option>
            {training! .players.map((player) => (
              <option key={player.id} value={player.id}>
                {player.firstName} {player.lastName}
              </option>
            ))}
          </select>
        </div>

        {/* Attendance Buttons */}
        {selectedPlayer && (
          <div className="mb-6">
            <p className="text-sm font-bold text-fenix-gold mb-4 text-center">
              Czy dziecko będzie na treningu?
            </p>
            <div className="space-y-4">
              <button
                onClick={() => setStatus('will_attend')}
                className={`w-full py-5 rounded-xl font-bold text-xl transition-all duration-300 ${
                  status === 'will_attend'
                    ? 'bg-fenix-success text-white shadow-2xl shadow-green-500/50 scale-105 border-2 border-green-400'
                    : 'bg-green-900/20 text-green-400 hover:bg-green-900/40 border-2 border-green-900/50'
                }`}
              >
                ✅ Będzie
              </button>
              <button
                onClick={() => setStatus('will_not_attend')}
                className={`w-full py-5 rounded-xl font-bold text-xl transition-all duration-300 ${
                  status === 'will_not_attend'
                    ? 'bg-fenix-danger text-white shadow-2xl shadow-red-500/50 scale-105 border-2 border-red-400'
                    : 'bg-red-900/20 text-red-400 hover:bg-red-900/40 border-2 border-red-900/50'
                }`}
              >
                ❌ Nie będzie
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border-2 border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={! selectedPlayer || ! status || submitting}
          className="btn-gold w-full text-xl disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {submitting ? '⏳ Wysyłanie...' : '🚀 Wyślij odpowiedź'}
        </button>
      </div>
    </div>
  );
}
```

---

### Komponent: Attendance Dashboard

```tsx name=app/admin/treningi/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface AttendanceData {
  training: {
    trainingDate:  string;
    trainingTime:  string;
    group: { name: string };
    token: string;
  };
  stats: {
    total:  number;
    willAttend: number;
    willNotAttend: number;
    noResponse: number;
  };
  players: Array<{
    id: string;
    firstName: string;
    lastName: string;
    status: 'will_attend' | 'will_not_attend' | 'no_response';
    respondedAt: string | null;
  }>;
}

export default function AttendanceDashboard() {
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<AttendanceData | null>(null);
  const [filter, setFilter] = useState<'all' | 'attending' | 'not_attending' | 'no_response'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    const res = await fetch(`/api/trainings/${id}`);
    const data = await res.json();
    setData(data);
    setLoading(false);
  };

  const copyLink = () => {
    const url = `${window.location.origin}/t/${data! .training.token}`;
    navigator.clipboard.writeText(url);
    alert('✅ Link skopiowany do schowka!');
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (time: string | null) => {
    if (!time) return '—';
    return new Date(time).toLocaleTimeString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'will_attend':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-fenix-success text-white">✅ Będzie</span>;
      case 'will_not_attend': 
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-fenix-danger text-white">❌ Nie będzie</span>;
      default:
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-gray-700 text-gray-300">— Brak odp. </span>;
    }
  };

  const filteredPlayers = data?.players. filter((player) => {
    if (filter === 'all') return true;
    if (filter === 'attending') return player.status === 'will_attend';
    if (filter === 'not_attending') return player.status === 'will_not_attend';
    if (filter === 'no_response') return player.status === 'no_response';
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-fenix-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-fenix-gold border-t-transparent mb-4"></div>
          <p className="text-gray-400 font-semibold">Ładowanie danych...</p>
        </div>
      </div>
    );
  }

  const attendancePercentage = (data! .stats.willAttend / data!.stats.total) * 100;

  return (
    <div className="min-h-screen bg-fenix-black">
      {/* Header */}
      <header className="bg-gradient-to-r from-fenix-black to-gray-900 border-b-2 border-fenix-gold/30 shadow-xl no-print">
        <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gold-gradient rounded-full flex items-center justify-center">
                <span className="text-2xl">⚽</span>
              </div>
              <h1 className="text-2xl font-extrabold gold-shine">FENIX TEAM</h1>
            </div>
            <button className="text-fenix-gold hover:text-fenix-gold-dark font-semibold transition-colors">
              Wyloguj
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg: px-8">
        {/* Training Info */}
        <div className="mb-8">
          <h2 className="text-4xl font-extrabold text-fenix-gold mb-3">Obecność na treningu</h2>
          <div className="flex flex-wrap items-center gap-4 text-gray-300">
            <span className="flex items-center gap-2">
              <span className="text-fenix-gold">📅</span> 
              {formatDate(data! .training.trainingDate)}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-fenix-gold">⏰</span> 
              {data!.training.trainingTime}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-fenix-gold">👥</span> 
              {data!.training.group.name}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8 no-print">
          <button onClick={copyLink} className="btn-gold">
            📋 Kopiuj link
          </button>
          <button onClick={handlePrint} className="btn-black">
            🖨️ Drukuj listę
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card-gold text-fenix-black">
            <div className="text-sm font-bold mb-1">Łącznie zawodników</div>
            <div className="text-4xl font-extrabold">{data!.stats.total}</div>
          </div>
          <div className="card bg-gradient-to-br from-green-900 to-green-950 border-green-500/30">
            <div className="text-sm font-bold text-green-300 mb-1">✅ Będzie</div>
            <div className="text-4xl font-extrabold text-green-400">{data!.stats.willAttend}</div>
            <div className="text-xs text-green-300 mt-1">
              {attendancePercentage.toFixed(0)}% frekwencji
            </div>
          </div>
          <div className="card bg-gradient-to-br from-red-900 to-red-950 border-red-500/30">
            <div className="text-sm font-bold text-red-300 mb-1">❌ Nie będzie</div>
            <div className="text-4xl font-extrabold text-red-400">{data!.stats.willNotAttend}</div>
          </div>
          <div className="card bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600/30">
            <div className="text-sm font-bold text-gray-300 mb-1">⏳ Brak odpowiedzi</div>
            <div className="text-4xl font-extrabold text-gray-400">{data!.stats.noResponse}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6 no-print">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2 rounded-lg font-bold transition-all ${
              filter === 'all'
                ? 'bg-fenix-gold text-fenix-black'
                : 'bg-gray-900 text-gray-400 hover:text-fenix-gold border border-fenix-gold/20'
            }`}
          >
            Wszyscy
          </button>
          <button
            onClick={() => setFilter('attending')}
            className={`px-5 py-2 rounded-lg font-bold transition-all ${
              filter === 'attending'
                ?  'bg-fenix-success text-white'
                : 'bg-gray-900 text-gray-400 hover:text-green-400 border border-green-900/50'
            }`}
          >
            ✅ Będą
          </button>
          <button
            onClick={() => setFilter('not_attending')}
            className={`px-5 py-2 rounded-lg font-bold transition-all ${
              filter === 'not_attending'
                ? 'bg-fenix-danger text-white'
                : 'bg-gray-900 text-gray-400 hover:text-red-400 border border-red-900/50'
            }`}
          >
            ❌ Nie będą
          </button>
          <button
            onClick={() => setFilter('no_response')}
            className={`px-5 py-2 rounded-lg font-bold transition-all ${
              filter === 'no_response'
                ? 'bg-gray-600 text-white'
                : 'bg-gray-900 text-gray-400 hover:text-gray-300 border border-gray-700/50'
            }`}
          >
            ⏳ Brak odpowiedzi
          </button>
        </div>

        {/* Players Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-900 border-b-2 border-fenix-gold/30">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-fenix-gold uppercase tracking-wider">#</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-fenix-gold uppercase tracking-wider">Imię i nazwisko</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-fenix-gold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-fenix-gold uppercase tracking-wider">Odpowiedź o</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredPlayers! .map((player, index) => (
                  <tr key={player.id} className="hover:bg-gray-900/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-semibold">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-100">
                      {player.firstName} {player.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(player. status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {formatTime(player.respondedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredPlayers!.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            Brak zawodników spełniających kryteria filtra
          </div>
        )}
      </main>
    </div>
  );
}
```

---

## 4. Podsumowanie kolorów FENIX

```javascript
// Główne kolory
fenix-black: '#0A0A0A'        // Tło główne
fenix-gold: '#FFD700'         // Akcenty, przyciski, nagłówki
fenix-gold-dark: '#DAA520'    // Hover states
fenix-gold-light: '#FFF4CC'   // Jasne tła

// Statusy
fenix-success: '#10B981'      // Zielony (będzie)
fenix-danger: '#EF4444'       // Czerwony (nie będzie)
fenix-gray: '#9CA3AF'         // Szary (brak odpowiedzi)
```

---

## 5. Dodatkowe efekty

### Gold Shine Animation (migotanie złota)
```css
. gold-shine {
  animation:  gold-shine 3s linear infinite;
}
```

### Gradienty
```css
bg-gold-gradient      - Gradient złoty
bg-black-gradient     - Gradient czarny
bg-fenix-gradient     - Gradient czarno-złoty (FENIX)
```

---

✅ **Kolory zmienione na czarny i złoty**  
✅ **Elegancki, premium design**  
✅ **Animacje i efekty**  
✅ **Wszystkie teksty po polsku**  
✅ **Mobile-first responsive**  
✅ **Gotowe do użycia**

Czy chcesz jeszcze coś zmienić? Na przykład:
- Dodać animacje hover
- Zmienić odcienie złotego
- Dodać dark mode toggle
- Więcej efektów świetlnych (glow)
