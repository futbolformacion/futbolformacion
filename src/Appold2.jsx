import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

// Traducciones completas
const translations = {
  es: {
    appName: 'FFD – FutbolFormacionData Pro',
    eventsStats: 'Eventos y estadísticas',
    matchManagement: 'Gestión de equipo',
    dashboard: 'Dashboard',
    payment: 'Suscripción',
    language: 'Idioma',
    homeTeamLabel: 'Local',
    awayTeamLabel: 'Visitante',
    teamNames: 'Nombres de equipo',
    homeTeam: 'Equipo local',
    awayTeam: 'Equipo visitante',
    saveNames: 'Guardar nombres',
    start: 'Preparar',
    pause: 'Pausar',
    totalTime: 'Tiempo total',
    effectiveTime: 'Tiempo efectivo',
    possession: 'Posesión',
    possessionPercent: '% Posesión',
    inPlay: 'En juego',
    stopped: 'Parado',
    ballInPlay: 'Balón en juego',
    ballStopped: 'Balón parado',
    changePossession: 'Cambiar posesión',
    pass: 'Pase',
    loss: 'Pérdida',
    recovery: 'Recuperación',
    foul: 'Falta',
    penalty: 'Penalti',
    shot: 'Tiro',
    onTarget: 'A puerta',
    offTarget: 'Fuera',
    goal: 'Gol',
    corner: 'Córner',
    events: 'Eventos',
    proLocked: 'Función Pro. Actualiza para acceder.',
    payWithPayPal: 'Pagar con PayPal',
    paymentSuccess: '¡Pago exitoso! Pro activado.',
    goalDetails: 'Detalles del gol',
    scorer: 'Goleador',
    assist: 'Asistencia',
    footType: 'Tipo de remate',
    rightFoot: 'Pie derecho',
    leftFoot: 'Pie izquierdo',
    head: 'Cabeza',
    situation: 'Situación',
    openPlay: 'Jugada abierta',
    freeKick: 'Falta',
    penaltyKick: 'Penalti',
    save: 'Guardar',
    cancel: 'Cancelar',
    selectPlayer: 'Seleccionar jugador',
    noAssist: 'Sin asistencia',
    matchNotStarted: 'Partido no iniciado - Pulsa PASE para comenzar',
    xg: 'XGol'
  },
  en: {
    appName: 'FFD – FutbolFormacionData Pro',
    eventsStats: 'Events & statistics',
    matchManagement: 'Team management',
    dashboard: 'Dashboard',
    payment: 'Subscription',
    language: 'Language',
    homeTeamLabel: 'Home',
    awayTeamLabel: 'Away',
    teamNames: 'Team names',
    homeTeam: 'Home team',
    awayTeam: 'Away team',
    saveNames: 'Save names',
    start: 'Prepare',
    pause: 'Pause',
    totalTime: 'Total time',
    effectiveTime: 'Effective time',
    possession: 'Possession',
    possessionPercent: '% Possession',
    inPlay: 'In play',
    stopped: 'Stopped',
    ballInPlay: 'Ball in play',
    ballStopped: 'Ball stopped',
    changePossession: 'Change possession',
    pass: 'Pass',
    loss: 'Loss',
    recovery: 'Recovery',
    foul: 'Foul',
    penalty: 'Penalty',
    shot: 'Shot',
    onTarget: 'On target',
    offTarget: 'Off target',
    goal: 'Goal',
    corner: 'Corner',
    events: 'Events',
    proLocked: 'Pro feature. Upgrade to access.',
    payWithPayPal: 'Pay with PayPal',
    paymentSuccess: 'Payment successful! Pro enabled.',
    goalDetails: 'Goal details',
    scorer: 'Scorer',
    assist: 'Assist',
    footType: 'Shot type',
    rightFoot: 'Right foot',
    leftFoot: 'Left foot',
    head: 'Header',
    situation: 'Situation',
    openPlay: 'Open play',
    freeKick: 'Free kick',
    penaltyKick: 'Penalty',
    save: 'Save',
    cancel: 'Cancel',
    selectPlayer: 'Select player',
    noAssist: 'No assist',
    matchNotStarted: 'Match not started - Press PASS to begin',
    xg: 'xG'
  },
};

// Util
const formatTime = (s) => {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const r = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${r}`;
};

const makeTeamState = () => ({
  passes: 0,
  losses: 0,
  recoveries: 0,
  shotsOn: 0,
  shotsOff: 0,
  goals: 0,
  fouls: 0,
  penalties: 0,
  corners: 0,
  effective: 0,
});

// xG simple basado en eventos
const computeXG = (team, events) => {
  let xg = 0;
  for (const e of events) {
    if (e.team !== team) continue;
    switch (e.type) {
      case 'shot_on':
        xg += 0.09;
        break;
      case 'shot_off':
        xg += 0.03;
        break;
      case 'penalty':
        xg += 0.76;
        break;
      case 'goal': {
        if (e.situation === 'penaltyKick') xg += 0.76;
        else if (e.situation === 'freeKick') xg += 0.07;
        else {
          if (e.footType === 'head') xg += 0.10;
          else xg += 0.12;
        }
        break;
      }
      default:
        break;
    }
  }
  return xg;
};

// Jugadores de ejemplo para el modal de gol
const samplePlayers = [
  'Jugador 1', 'Jugador 2', 'Jugador 3', 'Jugador 4', 'Jugador 5',
  'Jugador 6', 'Jugador 7', 'Jugador 8', 'Jugador 9', 'Jugador 10', 'Jugador 11'
];

// ========== COMPONENTES REUTILIZABLES ==========
function Card({ title, subtitle, children }) {
  return (
    <div className="p-5 bg-white rounded-lg border border-slate-200 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function KPI({ label, value, helper }) {
  return (
    <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm text-center">
      <div className="text-xs text-slate-500 uppercase tracking-wide">{label}</div>
      <div className="text-3xl font-bold text-slate-900 mt-2">{value}</div>
      {helper && <div className="text-xs text-slate-400 mt-1">{helper}</div>}
    </div>
  );
}

function PlaceholderBox({ height = 180, children }) {
  return (
    <div
      className="rounded-lg border-2 border-dashed border-slate-300 text-slate-400 flex items-center justify-center bg-slate-50 text-sm"
      style={{ height }}
    >
      {children || '📊 Próximamente'}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="p-2 bg-slate-50 rounded border text-center">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}

function Locked({ t }) {
  return (
    <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-center">
      <div className="text-4xl mb-3">🔒</div>
      <div className="font-semibold">{t.proLocked}</div>
    </div>
  );
}

function renderEvent(e, t) {
  switch (e.type) {
    case 'pass': return t.pass;
    case 'loss': return t.loss + (e.implicit ? ' (↔)' : '');
    case 'recovery': return t.recovery + (e.implicit ? ' (↔)' : '');
    case 'foul': return t.foul;
    case 'penalty': return t.penalty;
    case 'corner': return t.corner;
    case 'shot_on': return `${t.shot} (${t.onTarget})`;
    case 'shot_off': return `${t.shot} (${t.offTarget})`;
    case 'goal': 
      let goalText = `${t.goal} ⚽`;
      if (e.scorer) goalText += ` - ${e.scorer}`;
      if (e.assist) goalText += ` (${e.assist})`;
      if (e.footType) goalText += ` [${t[e.footType]}]`;
      if (e.situation) goalText += ` {${t[e.situation]}}`;
      return goalText;
    case 'possession_switch': return '↔ ' + t.possession;
    case 'ball_in_play': return '● ' + t.ballInPlay;
    case 'ball_stopped': return '● ' + t.ballStopped;
    default: return e.type;
  }
}

// ========== COMPONENTE PRINCIPAL ==========
export default function App() {
  const [lang, setLang] = useState('es');
  const t = translations[lang] || translations.es;
  const [isPro, setIsPro] = useState(false);

  const [homeName, setHomeName] = useState('');
  const [awayName, setAwayName] = useState('');
  const [customNames, setCustomNames] = useState(false);

  const [home, setHome] = useState(makeTeamState());
  const [away, setAway] = useState(makeTeamState());

  const [matchStarted, setMatchStarted] = useState(false);
  const [running, setRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [possession, setPossession] = useState('home');
  const [stoppedPlay, setStoppedPlay] = useState(false);

  const [events, setEvents] = useState([]);

  const [shotMenu, setShotMenu] = useState(null);
  const [goalModal, setGoalModal] = useState(null);

  // PRO: gestión de equipo y partido actual
  const [competitions, setCompetitions] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ffd-competitions') || '[]'); } catch { return []; }
  });
  const [selectedCompetitionId, setSelectedCompetitionId] = useState(() => localStorage.getItem('ffd-selected-competition') || '');
  const [matchDate, setMatchDate] = useState(() => localStorage.getItem('ffd-match-date') || new Date().toISOString().slice(0,10));
  const [opponentName, setOpponentName] = useState(() => localStorage.getItem('ffd-opponent') || '');
  const [competitionType, setCompetitionType] = useState(() => localStorage.getItem('ffd-competition-type') || 'league');
  const [allowExtraTime, setAllowExtraTime] = useState(localStorage.getItem('ffd-allow-et') === 'true');
  const [allowPenalties, setAllowPenalties] = useState(localStorage.getItem('ffd-allow-pen') === 'true');
  const [ownTeamSide, setOwnTeamSide] = useState(() => localStorage.getItem('ffd-own-side') || 'home');

  // histórico de partidos
  const [matches, setMatches] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ffd-matches') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    if (!customNames) {
      setHomeName(t.homeTeamLabel);
      setAwayName(t.awayTeamLabel);
    }
  }, [lang, t.homeTeamLabel, t.awayTeamLabel, customNames]);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('ffd-lang');
      const savedPro = localStorage.getItem('ffd-pro') === 'true';
      const savedHome = localStorage.getItem('ffd-home-name');
      const savedAway = localStorage.getItem('ffd-away-name');
      const savedCustom = localStorage.getItem('ffd-custom-names') === 'true';
      
      if (savedLang && translations[savedLang]) setLang(savedLang);
      if (savedPro) setIsPro(true);
      if (savedCustom) {
        setCustomNames(true);
        setHomeName(savedHome || t.homeTeamLabel);
        setAwayName(savedAway || t.awayTeamLabel);
      }
    } catch {}
  }, []);

  useEffect(() => { localStorage.setItem('ffd-lang', lang); }, [lang]);
  useEffect(() => { localStorage.setItem('ffd-pro', isPro ? 'true' : 'false'); }, [isPro]);

  useEffect(() => { localStorage.setItem('ffd-competitions', JSON.stringify(competitions)); }, [competitions]);
  useEffect(() => { localStorage.setItem('ffd-selected-competition', selectedCompetitionId); }, [selectedCompetitionId]);
  useEffect(() => { localStorage.setItem('ffd-match-date', matchDate); }, [matchDate]);
  useEffect(() => { localStorage.setItem('ffd-opponent', opponentName); }, [opponentName]);
  useEffect(() => { localStorage.setItem('ffd-competition-type', competitionType); }, [competitionType]);
  useEffect(() => { localStorage.setItem('ffd-allow-et', allowExtraTime ? 'true':'false'); }, [allowExtraTime]);
  useEffect(() => { localStorage.setItem('ffd-allow-pen', allowPenalties ? 'true':'false'); }, [allowPenalties]);
  useEffect(() => { localStorage.setItem('ffd-own-side', ownTeamSide); }, [ownTeamSide]);
  useEffect(() => { localStorage.setItem('ffd-matches', JSON.stringify(matches)); }, [matches]);

  const saveTeamNames = () => {
    setCustomNames(true);
    localStorage.setItem('ffd-home-name', homeName);
    localStorage.setItem('ffd-away-name', awayName);
    localStorage.setItem('ffd-custom-names', 'true');
  };

  useEffect(() => {
    let id;
    if (running && matchStarted) {
      id = setInterval(() => {
        setTotalTime((x) => x + 1);
        if (!stoppedPlay) {
          if (possession === 'home') setHome((h) => ({ ...h, effective: h.effective + 1 }));
          else setAway((a) => ({ ...a, effective: a.effective + 1 }));
        }
      }, 1000);
    }
    return () => clearInterval(id);
  }, [running, matchStarted, possession, stoppedPlay]);

  const totalEffective = home.effective + away.effective;
  const homePossessionPct = totalEffective ? Math.round((home.effective / totalEffective) * 100) : 0;
  const awayPossessionPct = 100 - homePossessionPct;

  const homeXG = computeXG('home', events);
  const awayXG = computeXG('away', events);

  const pushEvent = (team, type, extra = {}) => {
    setEvents((ev) => [...ev, { id: Date.now() + Math.random(), ts: totalTime, team, type, ...extra }]);
  };

  const registerPass = (team) => {
    if (!matchStarted) {
      setMatchStarted(true);
      setRunning(true);
    }
    
    if (team === 'home') setHome((h) => ({ ...h, passes: h.passes + 1 }));
    else setAway((a) => ({ ...a, passes: a.passes + 1 }));
    if (stoppedPlay) setStoppedPlay(false);
    pushEvent(team, 'pass');
  };

  const registerLoss = (team) => {
    if (team === 'home') {
      setHome((h) => ({ ...h, losses: h.losses + 1 }));
      setAway((a) => ({ ...a, recoveries: a.recoveries + 1 }));
      setPossession('away');
      pushEvent('home', 'loss');
      pushEvent('away', 'recovery', { implicit: true });
    } else {
      setAway((a) => ({ ...a, losses: a.losses + 1 }));
      setHome((h) => ({ ...h, recoveries: h.recoveries + 1 }));
      setPossession('home');
      pushEvent('away', 'loss');
      pushEvent('home', 'recovery', { implicit: true });
    }
  };

  const registerRecovery = (team) => {
    if (team === 'home') {
      setHome((h) => ({ ...h, recoveries: h.recoveries + 1 }));
      setAway((a) => ({ ...a, losses: a.losses + 1 }));
      setPossession('home');
      pushEvent('home', 'recovery');
      pushEvent('away', 'loss', { implicit: true });
    } else {
      setAway((a) => ({ ...a, recoveries: a.recoveries + 1 }));
      setHome((h) => ({ ...h, losses: h.losses + 1 }));
      setPossession('away');
      pushEvent('away', 'recovery');
      pushEvent('home', 'loss', { implicit: true });
    }
  };

  const registerFoul = (team) => {
    if (team === 'home') setHome((h) => ({ ...h, fouls: h.fouls + 1 }));
    else setAway((a) => ({ ...a, fouls: a.fouls + 1 }));
    setStoppedPlay(true);
    pushEvent(team, 'foul');
  };

  const registerPenalty = (team) => {
    if (team === 'home') setHome((h) => ({ ...h, penalties: h.penalties + 1 }));
    else setAway((a) => ({ ...a, penalties: a.penalties + 1 }));
    setStoppedPlay(true);
    pushEvent(team, 'penalty');
  };

  const registerCorner = (team) => {
    if (team === 'home') setHome((h) => ({ ...h, corners: h.corners + 1 }));
    else setAway((a) => ({ ...a, corners: a.corners + 1 }));
    setStoppedPlay(true);
    pushEvent(team, 'corner');
  };

  const openShotMenu = (team) => {
    setShotMenu({ team });
  };
     
  const registerShotChoice = (choice) => {
    if (!shotMenu) return;
    const team = shotMenu.team;
    
    if (choice === 'on') {
      if (team === 'home') setHome((h) => ({ ...h, shotsOn: h.shotsOn + 1 }));
      else setAway((a) => ({ ...a, shotsOn: a.shotsOn + 1 }));
      pushEvent(team, 'shot_on');
    } else if (choice === 'off') {
      if (team === 'home') setHome((h) => ({ ...h, shotsOff: h.shotsOff + 1 }));
      else setAway((a) => ({ ...a, shotsOff: a.shotsOff + 1 }));
      pushEvent(team, 'shot_off');
      setStoppedPlay(true);
      setPossession(team === 'home' ? 'away' : 'home');
    } else if (choice === 'corner') {
      registerCorner(team === 'home' ? 'away' : 'home');
      setPossession(team === 'home' ? 'away' : 'home');
    } else if (choice === 'goal') {
      setGoalModal({
        team,
        scorer: '',
        assist: '',
        footType: 'rightFoot',
        situation: 'openPlay'
      });
    }
    setShotMenu(null);
  };

  const saveGoal = () => {
    if (!goalModal) return;
    const { team, scorer, assist, footType, situation } = goalModal;
    
    if (team === 'home') setHome((h) => ({ ...h, goals: h.goals + 1 }));
    else setAway((a) => ({ ...a, goals: a.goals + 1 }));
    
    pushEvent(team, 'goal', { scorer, assist, footType, situation });
    setStoppedPlay(true);
    setPossession(team === 'home' ? 'away' : 'home');
    setGoalModal(null);
  };

  const manualChangePossession = () => {
    setPossession((p) => (p === 'home' ? 'away' : 'home'));
    pushEvent('sys', 'possession_switch');
  };

  const toggleBallState = () => {
    setStoppedPlay(!stoppedPlay);
    pushEvent('sys', stoppedPlay ? 'ball_in_play' : 'ball_stopped');
  };

  // Helpers para competiciones e histórico
  const addCompetition = () => {
    const name = prompt('Nombre de la competición:');
    if (!name) return;
    const id = 'cmp_' + Date.now().toString(36);
    const comp = { id, name, type: competitionType, extraTime: allowExtraTime, penalties: allowPenalties };
    setCompetitions((list) => [...list, comp]);
    setSelectedCompetitionId(id);
  };

  const currentCompetition = competitions.find(c => c.id === selectedCompetitionId) || null;

  const computeResult = () => {
    const gf = home.goals;
    const ga = away.goals;
    const ownIsHome = ownTeamSide === 'home';
    const ownGF = ownIsHome ? gf : ga;
    const ownGA = ownIsHome ? ga : gf;
    let outcome = 'E';
    if (ownGF > ownGA) outcome = 'G';
    else if (ownGF < ownGA) outcome = 'P';
    return { gf: ownGF, ga: ownGA, outcome };
  };

  const computeIntervals15 = () => {
    const buckets = [0,15,30,45,60,75,90,105,120];
    const make = () => buckets.slice(0,6).map((_,i)=>({ range: i===0?'0-15': i===1?'16-30': i===2?'31-45': i===3?'46-60': i===4?'61-75':'76-90', gf:0, ga:0 }));
    const arr = make();

    const ownIsHome = ownTeamSide === 'home';
    for (const e of events) {
      if (e.type !== 'goal') continue;
      const minute = Math.floor(e.ts / 60);
      let idx = 0;
      if (minute<=15) idx = 0;
      else if (minute<=30) idx = 1;
      else if (minute<=45) idx = 2;
      else if (minute<=60) idx = 3;
      else if (minute<=75) idx = 4;
      else idx = 5;
      const isOwn = (ownIsHome && e.team==='home') || (!ownIsHome && e.team==='away');
      if (isOwn) arr[idx].gf += 1; else arr[idx].ga += 1;
    }
    return arr;
  };

  const finalizeAndSaveMatch = () => {
    if (!isPro) { alert('Función Pro'); return; }
    const { gf, ga, outcome } = computeResult();
    const rec = {
      id: 'm_' + Date.now().toString(36),
      competitionId: selectedCompetitionId || null,
      competitionName: currentCompetition?.name || '',
      competitionType: currentCompetition?.type || competitionType,
      extraTime: currentCompetition?.extraTime ?? allowExtraTime,
      penalties: currentCompetition?.penalties ?? allowPenalties,
      dateISO: matchDate,
      opponent: opponentName || (ownTeamSide==='home' ? awayName : homeName),
      ownSide: ownTeamSide,
      modality: null,
      result: { gf, ga, outcome },
      teamAgg: {
        own: {
          possessionPct: (ownTeamSide==='home' ? homePossessionPct : awayPossessionPct),
          shotsOn: ownTeamSide==='home' ? home.shotsOn : away.shotsOn,
          shotsOff: ownTeamSide==='home' ? home.shotsOff : away.shotsOff,
          passes: ownTeamSide==='home' ? home.passes : away.passes,
          goals: ownTeamSide==='home' ? home.goals : away.goals,
          xg: ownTeamSide==='home' ? homeXG : awayXG,
        },
        opp: {
          possessionPct: (ownTeamSide==='home' ? awayPossessionPct : homePossessionPct),
          shotsOn: ownTeamSide==='home' ? away.shotsOn : home.shotsOn,
          shotsOff: ownTeamSide==='home' ? away.shotsOff : home.shotsOff,
          passes: ownTeamSide==='home' ? away.passes : home.passes,
          goals: ownTeamSide==='home' ? away.goals : home.goals,
          xg: ownTeamSide==='home' ? awayXG : homeXG,
        }
      },
      playerAgg: [],
      intervals15: computeIntervals15(),
      events,
    };

    setMatches((list) => [rec, ...list]);
    alert('Partido guardado en el histórico.');
  };

  const exportPlayersCSV = () => {
    const own = ownTeamSide === 'home' ? home : away;
    const headers = ['Jugador','Minutos','Pases','Pérdidas','Recuperaciones','TirosOn','TirosOff','Goles','Asistencias','Faltas'];
    const rows = [
      ['EQUIPO_PROPIO', formatTime(own.effective), own.passes, own.losses, own.recoveries, own.shotsOn, own.shotsOff, own.goals, '', own.fouls]
    ];
    const csv = [headers.join(','), ...rows.map(r=>r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ffd-partido-${matchDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const btnHome = 'px-3 py-2 rounded font-semibold border shadow-sm bg-black text-white hover:opacity-90';
  const btnAway = 'px-3 py-2 rounded font-semibold border shadow-sm bg-white text-black hover:bg-slate-100';

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">{t.language}:</span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="border rounded px-2 py-1 bg-white text-sm"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>

          <h1 className="ml-2 text-lg font-bold">{t.appName}</h1>

          <nav className="ml-auto flex gap-4 text-sm">
            <Link to="/" className="hover:underline">{t.eventsStats}</Link>
            {isPro && <Link to="/manage" className="hover:underline">{t.matchManagement}</Link>}
            {isPro && <Link to="/dash" className="hover:underline">{t.dashboard}</Link>}
            <Link to="/pay" className="hover:underline">{t.payment}</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Routes>
          {/* ========== PANTALLA PRINCIPAL ========== */}
          <Route
            path="/"
            element={
              <div className="max-w-6xl mx-auto px-4 py-6">
                {/* Panel nombres de equipos */}
                <Card title={t.teamNames}>
                  <div className="flex flex-col md:flex-row gap-3 items-start md:items-end">
                    <div className="flex-1">
                      <label className="text-xs text-slate-500 block mb-1">
                        {t.homeTeamLabel}
                      </label>
                      <input
                        value={homeName}
                        onChange={(e) => setHomeName(e.target.value)}
                        className="w-full md:w-64 border rounded px-3 py-2"
                        placeholder={t.homeTeam}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-slate-500 block mb-1">
                        {t.awayTeamLabel}
                      </label>
                      <input
                        value={awayName}
                        onChange={(e) => setAwayName(e.target.value)}
                        className="w-full md:w-64 border rounded px-3 py-2"
                        placeholder={t.awayTeam}
                      />
                    </div>
                    <button onClick={saveTeamNames} className="px-4 py-2 bg-blue-600 text-white rounded font-semibold">
                      {t.saveNames}
                    </button>
                  </div>
                </Card>

                {/* Estado del partido */}
                {!matchStarted && (
                  <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-center">
                    {t.matchNotStarted}
                  </div>
                )}

                {/* Barra superior: reloj, estado y controles */}
                <div className="grid sm:grid-cols-4 gap-4 mt-6">
                  <Card title={t.totalTime}>
                    <div className="text-3xl font-bold">{formatTime(totalTime)}</div>
                    <div className="mt-3">
                      <button
                        className="w-full px-3 py-2 rounded bg-blue-600 text-white font-semibold text-sm"
                        onClick={() => setRunning((r) => !r)}
                        disabled={!matchStarted}
                      >
                        {running ? t.pause : t.start}
                      </button>
                    </div>
                  </Card>

                  <Card title={t.possession}>
                    <div className="text-xl font-semibold">
                      {possession === 'home' ? homeName : awayName}
                    </div>
                    <div className="mt-2">
                      <button
                        className="px-2 py-1 rounded border text-sm"
                        onClick={manualChangePossession}
                      >
                        ↔ {t.changePossession}
                      </button>
                    </div>
                  </Card>

                  <Card title={t.possessionPercent}>
                    <div className="flex gap-4">
                      <div>
                        <div className="text-xs text-slate-500">{homeName}</div>
                        <div className="text-xl font-semibold">{homePossessionPct}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">{awayName}</div>
                        <div className="text-xl font-semibold">{awayPossessionPct}%</div>
                      </div>
                    </div>
                  </Card>

                  <Card title="Estado del balón">
                    <div className="text-sm">
                      {stoppedPlay ? (
                        <span className="text-amber-700">● {t.stopped}</span>
                      ) : (
                        <span className="text-emerald-700">● {t.inPlay}</span>
                      )}
                    </div>
                    <div className="mt-2">
                      <button
                        className="px-2 py-1 rounded border text-sm"
                        onClick={toggleBallState}
                        disabled={!matchStarted}
                      >
                        {stoppedPlay ? t.ballInPlay : t.ballStopped}
                      </button>
                    </div>
                  </Card>
                </div>

                {/* Controles por equipo */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  {/* Local */}
                  <Card title={`${homeName} (${t.homeTeamLabel})`} subtitle={formatTime(home.effective)}>
                    <div className={`${possession === 'home' ? 'ring-2 ring-emerald-500 rounded-lg p-3' : ''}`}>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <button className={btnHome} onClick={() => registerPass('home')}>{t.pass}</button>
                        <button className={btnHome} onClick={() => registerLoss('home')}>{t.loss}</button>
                        <button className={btnHome} onClick={() => registerRecovery('home')}>{t.recovery}</button>
                        <button className={btnHome} onClick={() => openShotMenu('home')}>{t.shot} ▾</button>
                        <button className={btnHome} onClick={() => registerFoul('home')}>{t.foul}</button>
                        <button className={btnHome} onClick={() => registerPenalty('home')}>{t.penalty}</button>
                      </div>

                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                        <Stat label={t.pass} value={home.passes} />
                        <Stat label={t.loss} value={home.losses} />
                        <Stat label={t.recovery} value={home.recoveries} />
                        <Stat label={t.onTarget} value={home.shotsOn} />
                        <Stat label={t.offTarget} value={home.shotsOff} />
                        <Stat label={t.goal} value={home.goals} />
                        <Stat label={t.foul} value={home.fouls} />
                        <Stat label={t.corner} value={home.corners} />
                        <Stat label={t.effectiveTime} value={formatTime(home.effective)} />
                        <Stat label={t.xg} value={homeXG.toFixed(2)} />
                      </div>
                    </div>
                  </Card>

                  {/* Visitante */}
                  <Card title={`${awayName} (${t.awayTeamLabel})`} subtitle={formatTime(away.effective)}>
                    <div className={`${possession === 'away' ? 'ring-2 ring-emerald-500 rounded-lg p-3' : ''}`}>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <button className={btnAway} onClick={() => registerPass('away')}>{t.pass}</button>
                        <button className={btnAway} onClick={() => registerLoss('away')}>{t.loss}</button>
                        <button className={btnAway} onClick={() => registerRecovery('away')}>{t.recovery}</button>
                        <button className={btnAway} onClick={() => openShotMenu('away')}>{t.shot} ▾</button>
                        <button className={btnAway} onClick={() => registerFoul('away')}>{t.foul}</button>
                        <button className={btnAway} onClick={() => registerPenalty('away')}>{t.penalty}</button>
                      </div>

                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                        <Stat label={t.pass} value={away.passes} />
                        <Stat label={t.loss} value={away.losses} />
                        <Stat label={t.recovery} value={away.recoveries} />
                        <Stat label={t.onTarget} value={away.shotsOn} />
                        <Stat label={t.offTarget} value={away.shotsOff} />
                        <Stat label={t.goal} value={away.goals} />
                        <Stat label={t.foul} value={away.fouls} />
                        <Stat label={t.corner} value={away.corners} />
                        <Stat label={t.effectiveTime} value={formatTime(away.effective)} />
                        <Stat label={t.xg} value={awayXG.toFixed(2)} />
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Lista de eventos */}
                <Card title={t.events}>
                  <ul className="text-sm space-y-1 max-h-64 overflow-auto">
                    {events.slice().reverse().map((e) => (
                      <li key={e.id}>
                        [{formatTime(e.ts)}]{' '}
                        {e.team === 'home' ? homeName : e.team === 'away' ? awayName : 'SYS'} → {renderEvent(e, t)}
                      </li>
                    ))}
                  </ul>
                  {isPro && (
                    <div className="mt-4">
                      <button onClick={exportPlayersCSV} className="px-4 py-2 border rounded bg-blue-600 text-white font-semibold">
                        Exportar CSV (partido actual)
                      </button>
                    </div>
                  )}
                </Card>
              </div>
            }
          />

          {/* ========== GESTIÓN DE EQUIPO ========== */}
          <Route
            path="/manage"
            element={
              <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
                <h2 className="text-2xl font-bold">{t.matchManagement}</h2>

                {!isPro ? (
                  <Locked t={t} />
                ) : (
                  <>
                    <Card title="⚙️ Competición y partido" subtitle="Configura datos del encuentro">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-500 mb-1">Competición</label>
                          <div className="flex gap-2">
                            <select
                              className="border rounded px-2 py-2 flex-1"
                              value={selectedCompetitionId}
                              onChange={(e)=>setSelectedCompetitionId(e.target.value)}
                            >
                              <option value="">— Sin competición —</option>
                              {competitions.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                              ))}
                            </select>
                            <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={addCompetition}>
                              Nueva
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs text-slate-500 mb-1">Tipo</label>
                          <select
                            className="border rounded px-2 py-2 w-full"
                            value={competitionType}
                            onChange={(e)=>setCompetitionType(e.target.value)}
                          >
                            <option value="league">Liga</option>
                            <option value="knockout">Eliminatoria</option>
                          </select>
                          {competitionType === 'knockout' && (
                            <div className="mt-2 flex gap-4 text-sm">
                              <label className="inline-flex items-center gap-2">
                                <input type="checkbox" checked={allowExtraTime} onChange={(e)=>setAllowExtraTime(e.target.checked)} />
                                Prórroga
                              </label>
                              <label className="inline-flex items-center gap-2">
                                <input type="checkbox" checked={allowPenalties} onChange={(e)=>setAllowPenalties(e.target.checked)} />
                                Penaltis
                              </label>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs text-slate-500 mb-1">Rival</label>
                          <input className="border rounded px-3 py-2 w-full" value={opponentName} onChange={(e)=>setOpponentName(e.target.value)} placeholder="Nombre del rival" />
                        </div>

                        <div>
                          <label className="block text-xs text-slate-500 mb-1">Fecha</label>
                          <input type="date" className="border rounded px-3 py-2 w-full" value={matchDate} onChange={(e)=>setMatchDate(e.target.value)} />
                        </div>

                        <div>
                          <label className="block text-xs text-slate-500 mb-1">Equipo propio</label>
                          <select className="border rounded px-2 py-2 w-full" value={ownTeamSide} onChange={(e)=>setOwnTeamSide(e.target.value)}>
                            <option value="home">Local</option>
                            <option value="away">Visitante</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button className="px-4 py-2 bg-emerald-600 text-white rounded font-semibold" onClick={finalizeAndSaveMatch}>
                          Finalizar y guardar partido
                        </button>
                      </div>
                    </Card>

                    <Card title="📋 Modalidad" subtitle="f5, f7, f8, f9 o f11">
                      <div className="flex flex-wrap gap-2">
                        {['f5','f7','f8','f9','f11'].map(m => (
                          <button key={m} className="px-3 py-2 border rounded">{m.toUpperCase()}</button>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 mt-2">La validación de jugadores en juego se activará en la Entrega B.</p>
                    </Card>

                    <Card title="🧑‍🤝‍🧑 Plantilla" subtitle="Se activará en la Entrega B">
                      <PlaceholderBox>Tabla de jugadores y cambios (próximo paso)</PlaceholderBox>
                    </Card>
                  </>
                )}
              </div>
            }
          />

          {/* ========== DASHBOARD ========== */}
          <Route
            path="/dash"
            element={
              <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
                <h2 className="text-2xl font-bold">{t.dashboard}</h2>

                {!isPro ? (
                  <Locked t={t} />
                ) : (
                  <>
                    {/* KPIs medios por partido */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <KPI label="Media tiros a puerta" value={
                        matches.length ? 
                        (matches.reduce((acc,m)=>acc + m.teamAgg.own.shotsOn,0)/matches.length).toFixed(2) : '—'
                      } />
                      <KPI label="Posesión media" value={
                        matches.length ? 
                        Math.round(matches.reduce((acc,m)=>acc + m.teamAgg.own.possessionPct,0)/matches.length) + '%' : '—'
                      } />
                      <KPI label="xG medio" value={
                        matches.length ? 
                        (matches.reduce((acc,m)=>acc + (m.teamAgg.own.xg||0),0)/matches.length).toFixed(2) : '—'
                      } />
                      <KPI label="Pases por partido" value={
                        matches.length ? 
                        Math.round(matches.reduce((acc,m)=>acc + (m.teamAgg.own.passes||0),0)/matches.length) : '—'
                      } />
                    </div>

                    {/* Últimos 5 partidos GGEPE */}
                    <Card title="Últimos 5 (Equipo: GGEPE)" subtitle="G=Ganado, E=Empatado, P=Perdido">
                      <div className="flex flex-wrap gap-2 items-center">
                        {matches.slice(0,5).map((m) => (
                          <div key={m.id} className="px-3 py-2 border rounded bg-white">
                            <div className="font-semibold text-lg">{m.result.outcome}</div>
                            <div className="text-xs text-slate-500">{m.opponent}</div>
                            <div className="text-xs text-slate-400">{m.dateISO}</div>
                          </div>
                        ))}
                        {!matches.length && <div className="text-slate-500 text-sm">Aún no hay partidos guardados.</div>}
                      </div>
                    </Card>

                    {/* Top 3 jugadores */}
                    <div className="grid md:grid-cols-3 gap-6">
                      <Card title="🕐 Top 3 Minutos" subtitle="Se activará con Cambios en la próxima entrega">
                        <PlaceholderBox>🥇 🥈 🥉</PlaceholderBox>
                      </Card>
                      <Card title="⚽ Top 3 Goles" subtitle="Usa eventos actuales como aproximación">
                        <div className="text-sm">
                          <p>De momento sin plantilla real, mostramos totales del equipo: {homeName}/{awayName}.</p>
                          <ul className="mt-2 list-disc ml-5">
                            <li>{homeName}: {home.goals}</li>
                            <li>{awayName}: {away.goals}</li>
                          </ul>
                          <p className="mt-2 text-xs text-slate-500">En la Entrega B, esto se calculará por jugador.</p>
                        </div>
                      </Card>
                      <Card title="🅰️ Top 3 Asistencias" subtitle="A partir del modal de gol en B">
                        <PlaceholderBox>🅰️ Próximamente</PlaceholderBox>
                      </Card>
                    </div>

                    {/* Goles AF/EC por intervalos de 15' */}
                    <Card title="Goles AF/EC por intervalos (15')" subtitle="Acumulado de histórico">
                      <div className="text-sm">
                        {matches.length ? (
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="text-left text-xs text-slate-500">
                                <th className="py-2 pr-2">Intervalo</th>
                                <th className="py-2 pr-2">GF</th>
                                <th className="py-2 pr-2">GA</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(() => {
                                const sum = {};
                                for (const m of matches) {
                                  for (const row of m.intervals15) {
                                    sum[row.range] = sum[row.range] || { gf:0, ga:0 };
                                    sum[row.range].gf += row.gf;
                                    sum[row.range].ga += row.ga;
                                  }
                                }
                                const order = ['0-15','16-30','31-45','46-60','61-75','76-90'];
                                return order.map(r => (
                                  <tr key={r} className="border-t">
                                    <td className="py-2 pr-2">{r}</td>
                                    <td className="py-2 pr-2">{sum[r]?.gf || 0}</td>
                                    <td className="py-2 pr-2">{sum[r]?.ga || 0}</td>
                                  </tr>
                                ));
                              })()}
                            </tbody>
                          </table>
                        ) : (
                          <div className="text-slate-500">Aún no hay datos.</div>
                        )}
                      </div>
                    </Card>
                  </>
                )}
              </div>
            }
          />

          {/* ========== SUSCRIPCIÓN ========== */}
          <Route
            path="/pay"
            element={
              <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
                <h2 className="text-2xl font-bold">{t.payment}</h2>
                <Card title="🌟 FFD Pro" subtitle="Funciones avanzadas para entrenadores">
                  {isPro ? (
                    <div className="text-emerald-700 text-center py-4">
                      ✅ {t.paymentSuccess}
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-sm text-slate-600">
                        Guarda partidos ilimitados, dashboard avanzado y exportación a Excel.
                      </div>
                      <button
                        type="button"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                        onClick={() => { alert(t.paymentSuccess); setIsPro(true); }}
                      >
                        {t.payWithPayPal}
                      </button>
                    </div>
                  )}
                </Card>
              </div>
            }
          />
        </Routes>
      </main>

      {/* Menú contextual de tiro */}
      {shotMenu && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40 flex items-center justify-center"
          onClick={() => setShotMenu(null)}
          onKeyDown={(e) => e.key === 'Escape' && setShotMenu(null)}
          tabIndex={-1}
        >
          <div
            className="bg-white border shadow-lg rounded-lg overflow-hidden w-60"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              autoFocus
              onClick={() => registerShotChoice('on')}
              className="block w-full text-left px-4 py-2 hover:bg-slate-100 text-sm"
            >
              {t.onTarget}
            </button>
            <button
              onClick={() => registerShotChoice('off')}
              className="block w-full text-left px-4 py-2 hover:bg-slate-100 text-sm"
            >
              {t.offTarget}
            </button>
            <button
              onClick={() => registerShotChoice('corner')}
              className="block w-full text-left px-4 py-2 hover:bg-slate-100 text-sm"
            >
              {t.corner}
            </button>
            <button
              onClick={() => registerShotChoice('goal')}
              className="block w-full text-left px-4 py-2 hover:bg-slate-100 text-sm"
            >
              {t.goal}
            </button>
            <button
              onClick={() => setShotMenu(null)}
              className="block w-full text-left px-4 py-2 hover:bg-red-50 text-sm text-red-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Modal de gol */}
      {goalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">{t.goalDetails}</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t.scorer}</label>
                <select
                  value={goalModal.scorer}
                  onChange={(e) => setGoalModal({...goalModal, scorer: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">{t.selectPlayer}</option>
                  {samplePlayers.map(player => (
                    <option key={player} value={player}>{player}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t.assist}</label>
                <select
                  value={goalModal.assist}
                  onChange={(e) => setGoalModal({...goalModal, assist: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">{t.noAssist}</option>
                  {samplePlayers.map(player => (
                    <option key={player} value={player}>{player}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t.footType}</label>
                <select
                  value={goalModal.footType}
                  onChange={(e) => setGoalModal({...goalModal, footType: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="rightFoot">{t.rightFoot}</option>
                  <option value="leftFoot">{t.leftFoot}</option>
                  <option value="head">{t.head}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t.situation}</label>
                <select
                  value={goalModal.situation}
                  onChange={(e) => setGoalModal({...goalModal, situation: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="openPlay">{t.openPlay}</option>
                  <option value="freeKick">{t.freeKick}</option>
                  <option value="penaltyKick">{t.penaltyKick}</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={saveGoal}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded font-semibold"
              >
                {t.save}
              </button>
              <button
                onClick={() => setGoalModal(null)}
                className="flex-1 border px-4 py-2 rounded font-semibold"
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}