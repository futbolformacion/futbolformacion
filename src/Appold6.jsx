import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

/* ================== I18N ================== */
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
    start: 'Iniciar',
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
    matchNotStarted: 'Partido no iniciado - Registra un evento para comenzar',
    xg: 'XGol',
    ownTeamName: 'Nombre de tu equipo',
    last5Results: 'Últimos 5 resultados',
    roster: 'Plantilla',
    number: 'Dorsal',
    name: 'Nombre',
    position: 'Posición',
    addPlayer: 'Añadir jugador',
    remove: 'Eliminar',
    lineup: 'Alineación',
    bench: 'Banquillo',
    applyInitial: 'Aplicar inicial',
    modality: 'Modalidad',
    playersOnFieldLimit: 'Máximo en campo',
    subIn: 'Entra',
    subOut: 'Sale',
    makeSub: 'Hacer cambio',
    minutes: 'Minutos',
    top3Minutes: 'Top 3 Minutos',
    top3Goals: 'Top 3 Goles',
    top3Assists: 'Top 3 Asistencias',
    yourTeamPlaysAs: 'Tu equipo juega como',
    rival: 'Rival',
    date: 'Fecha',
    competition: 'Competición',
    type: 'Tipo',
    league: 'Liga',
    knockout: 'Eliminatoria',
    extraTime: 'Prórroga',
    penaltiesSeries: 'Penaltis',
    newCompetition: 'Nueva',
    finishAndSaveMatch: 'Finalizar y guardar partido',
    select: 'Seleccionar',
    playersInField: 'Jugadores en campo',
    playersBench: 'Jugadores en banquillo',
    exportMatchCSV: 'Exportar partido (CSV)',
    exportHistoryCSV: 'Exportar Acumulado (CSV)',
    confirmFinishTitle: 'Finalizar partido',
    confirmFinishBody: '¿Deseas finalizar y guardar el partido en el histórico? No podrás deshacerlo.',
    confirm: 'Confirmar',
    possessionBar: 'Estado del balón',
    team: 'Equipo',
    shotsOn: 'Tiros a puerta',
    shotsOff: 'Tiros fuera',
    goalsFor: 'Goles a favor',
    goalsAgainst: 'Goles en contra',
    avgPerMatch: 'Medias por partido',
    results: 'Resultados',
    W: 'G',
    D: 'E',
    L: 'P',
    noMatchesYet: 'Aún no hay partidos guardados',
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
    start: 'Start',
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
    matchNotStarted: 'Match not started - Log an event to begin',
    xg: 'xG',
    ownTeamName: 'Your team name',
    last5Results: 'Last 5 results',
    roster: 'Roster',
    number: 'Number',
    name: 'Name',
    position: 'Position',
    addPlayer: 'Add player',
    remove: 'Remove',
    lineup: 'Lineup',
    bench: 'Bench',
    applyInitial: 'Apply initial',
    modality: 'Modality',
    playersOnFieldLimit: 'Players on field',
    subIn: 'Sub in',
    subOut: 'Sub out',
    makeSub: 'Make substitution',
    minutes: 'Minutes',
    top3Minutes: 'Top 3 Minutes',
    top3Goals: 'Top 3 Goals',
    top3Assists: 'Top 3 Assists',
    yourTeamPlaysAs: 'Your team plays as',
    rival: 'Opponent',
    date: 'Date',
    competition: 'Competition',
    type: 'Type',
    league: 'League',
    knockout: 'Knockout',
    extraTime: 'Extra time',
    penaltiesSeries: 'Penalties',
    newCompetition: 'New',
    finishAndSaveMatch: 'Finish and save match',
    select: 'Select',
    playersInField: 'Players on field',
    playersBench: 'Bench players',
    exportMatchCSV: 'Export match (CSV)',
    exportHistoryCSV: 'Export History (CSV)',
    confirmFinishTitle: 'Finish match',
    confirmFinishBody: 'Do you want to finish and save the match to history? This cannot be undone.',
    confirm: 'Confirm',
    possessionBar: 'Ball state',
    team: 'Team',
    shotsOn: 'Shots on',
    shotsOff: 'Shots off',
    goalsFor: 'Goals for',
    goalsAgainst: 'Goals against',
    avgPerMatch: 'Per-match averages',
    results: 'Results',
    W: 'W',
    D: 'D',
    L: 'L',
    noMatchesYet: 'No matches saved yet',
  },
};

const formatTime = (s) => {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const r = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${r}`;
};

/* ================== DATOS Y HELPERS ================== */
const defaultModality = 'f11';
const modalityToMax = { f5:5, f7:7, f8:8, f9:9, f11:11 };

const makeTeamAgg = () => ({
  passes: 0, losses: 0, recoveries: 0,
  shotsOn: 0, shotsOff: 0, goals: 0,
  fouls: 0, penalties: 0, corners: 0, effective: 0,
});

const makePlayer = (n=0, name='', pos='') => ({
  id: 'p_'+Math.random().toString(36).slice(2),
  number: n, name, position: pos,
  onField: false,
  minutes: 0,
  stats: { passes:0, losses:0, recoveries:0, shotsOn:0, shotsOff:0, goals:0, assists:0, fouls:0, penalties:0, corners:0 },
});

const computeXGFromEvents = (events, teamKey) => {
  let xg = 0;
  for (const e of events) {
    if (e.team !== teamKey) continue;
    switch (e.type) {
      case 'shot_on': xg += 0.09; break;
      case 'shot_off': xg += 0.03; break;
      case 'penalty': xg += 0.76; break;
      case 'goal':
        if (e.situation === 'penaltyKick') xg += 0.76;
        else if (e.situation === 'freeKick') xg += 0.07;
        else xg += 0.12;
        break;
      default: break;
    }
  }
  return xg;
};

const downloadCSV = (filename, rows) => {
  const csvContent = rows.map(r => r.map(v => {
    if (v == null) return '';
    const s = String(v).replace(/"/g,'""');
    if (/[",\n]/.test(s)) return `"${s}"`;
    return s;
  }).join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

/* ================== UI ELEMENTOS ================== */
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

function Stat({ label, value }) {
  return (
    <div className="p-2 bg-slate-50 rounded border text-center">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}

/* ================== APP ================== */
function AppInner() {
  const [lang, setLang] = React.useState(() => localStorage.getItem('ffd-lang') || 'es');
  const t = translations[lang] || translations.es;
  const [isPro, setIsPro] = React.useState(localStorage.getItem('ffd-pro') === 'true');

  // Ajustes de partido
  const [ownTeamName, setOwnTeamName] = React.useState(() => localStorage.getItem('ffd-own-team-name') || '');
  const [opponentName, setOpponentName] = React.useState(() => localStorage.getItem('ffd-opponent') || '');
  const [ownTeamSide, setOwnTeamSide] = React.useState(() => localStorage.getItem('ffd-own-side') || 'home');
  const [matchDate, setMatchDate] = React.useState(() => localStorage.getItem('ffd-match-date') || new Date().toISOString().slice(0,10));

  const [homeName, setHomeName] = React.useState('');
  const [awayName, setAwayName] = React.useState('');

  React.useEffect(() => {
    if (ownTeamName && opponentName) {
      if (ownTeamSide === 'home') { setHomeName(ownTeamName); setAwayName(opponentName); }
      else { setHomeName(opponentName); setAwayName(ownTeamName); }
    } else {
      setHomeName(t.homeTeamLabel); setAwayName(t.awayTeamLabel);
    }
  }, [ownTeamName, opponentName, ownTeamSide, t.homeTeamLabel, t.awayTeamLabel]);

  // Estado de partido en curso
  const [matchStarted, setMatchStarted] = React.useState(false);
  const [running, setRunning] = React.useState(false);
  const [totalTime, setTotalTime] = React.useState(0);
  const [possession, setPossession] = React.useState('home');
  const [stoppedPlay, setStoppedPlay] = React.useState(false);

  const [home, setHome] = React.useState(makeTeamAgg());
  const [away, setAway] = React.useState(makeTeamAgg());

  // Plantilla y modalidad
  const [modality, setModality] = React.useState(() => localStorage.getItem('ffd-modality') || defaultModality);
  const maxOnField = modalityToMax[modality] || 11;

  const [roster, setRoster] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('ffd-roster') || '[]'); } catch { return []; }
  });

// Estados para campograma (sistema)
const [systemName, setSystemName] = React.useState(() => localStorage.getItem('ffd-system-name') || '4-3-3');
const [systemLayouts, setSystemLayouts] = React.useState(() => {
  try { return JSON.parse(localStorage.getItem('ffd-system-presets') || '{}'); } catch { return {}; }
});
const [systemSlots, setSystemSlots] = React.useState(() => {
  try { return JSON.parse(localStorage.getItem('ffd-current-system-layout') || '[]'); } catch { return []; }
});
const [attackRight, setAttackRight] = React.useState(() => localStorage.getItem('ffd-attack-right') !== 'false');

React.useEffect(()=>localStorage.setItem('ffd-system-name', systemName),[systemName]);
React.useEffect(()=>localStorage.setItem('ffd-system-presets', JSON.stringify(systemLayouts)),[systemLayouts]);
React.useEffect(()=>localStorage.setItem('ffd-current-system-layout', JSON.stringify(systemSlots)),[systemSlots]);
React.useEffect(()=>localStorage.setItem('ffd-attack-right', attackRight?'true':'false'),[attackRight]);

  // Eventos del partido actual
  const [events, setEvents] = React.useState([]);

  // Modales
  const [shotMenu, setShotMenu] = React.useState(null);
  const [goalModal, setGoalModal] = React.useState(null);

  // Persistencia ajustes
  React.useEffect(()=>localStorage.setItem('ffd-lang', lang),[lang]);
  React.useEffect(()=>localStorage.setItem('ffd-pro', isPro?'true':'false'),[isPro]);
  React.useEffect(()=>localStorage.setItem('ffd-own-team-name', ownTeamName),[ownTeamName]);
  React.useEffect(()=>localStorage.setItem('ffd-opponent', opponentName),[opponentName]);
  React.useEffect(()=>localStorage.setItem('ffd-own-side', ownTeamSide),[ownTeamSide]);
  React.useEffect(()=>localStorage.setItem('ffd-match-date', matchDate),[matchDate]);
  React.useEffect(()=>localStorage.setItem('ffd-modality', modality),[modality]);
  React.useEffect(()=>localStorage.setItem('ffd-roster', JSON.stringify(roster)),[roster]);

  // Cronómetro
  React.useEffect(() => {
    if (!(running && matchStarted)) return;
    const id = setInterval(() => {
      setTotalTime((x) => x + 1);
      if (!stoppedPlay) {
        if (possession === 'home') setHome(h => ({...h, effective: h.effective + 1}));
        else setAway(a => ({...a, effective: a.effective + 1}));
      }
      // Minutos por jugador en campo (segundos)
      setRoster(prev => prev.map(p => p.onField ? {...p, minutes: p.minutes + 1} : p));
    }, 1000);
    return () => clearInterval(id);
  }, [running, matchStarted, possession, stoppedPlay]);

  const totalEffective = home.effective + away.effective;
  const homePossPct = totalEffective ? Math.round((home.effective/totalEffective)*100) : 0;
  const awayPossPct = 100 - homePossPct;

  const pushEvent = (team, type, extra={}) => {
    setEvents(ev => [...ev, { id: Date.now()+Math.random(), ts: totalTime, team, type, ...extra }]);
  };

  // Plantilla
  const addPlayer = () => {
    const number = prompt(lang === 'es' ? 'Dorsal:' : 'Number:');
    if (number === null || number === '') return;
    const name = prompt(lang === 'es' ? 'Nombre:' : 'Name:') || '';
    const pos = prompt(lang === 'es' ? 'Posición (POR/DEF/MED/DEL):' : 'Position (GK/DEF/MID/FWD):') || '';
    setRoster(list => [...list, makePlayer(Number(number)||0, name, pos)]);
  };
  const removePlayer = (id) => setRoster(list => list.filter(p => p.id !== id));
  const playersOnField = roster.filter(p => p.onField);
  const playersOnBench = roster.filter(p => !p.onField);

  const applyInitial = () => {
    const max = maxOnField;
    setRoster(list => {
      const clean = list.map(p => ({...p, onField:false}));
      let count = 0;
      return clean.map(p => {
        if (count < max) { count++; return {...p, onField:true}; }
        return p;
      });
    });
  };

  const makeSub = (idIn, idOut) => {
    if (!idIn || !idOut) return;
    setRoster(list => {
      const pIn = list.find(p => p.id === idIn);
      const pOut = list.find(p => p.id === idOut);
      if (!pIn || !pOut) return list;
      if (pIn.onField) { alert(lang==='es' ? 'El que entra ya está en campo' : 'Incoming player is already on the field'); return list; }
      if (!pOut.onField) { alert(lang==='es' ? 'El que sale no está en campo' : 'Outgoing player is not on the field'); return list; }
      return list.map(p => {
        if (p.id === idIn) return {...p, onField:true};
        if (p.id === idOut) return {...p, onField:false};
        return p;
      });
    });
  };

const buildSystemPreset = (name, count=11) => {
  const base = {
    '4-3-3': [
      { x: 8, y: 50, role:'GK' },
      { x: 25, y: 20, role:'DEF' }, { x: 25, y: 40, role:'DEF' }, { x: 25, y: 60, role:'DEF' }, { x: 25, y: 80, role:'DEF' },
      { x: 50, y: 25, role:'MID' }, { x: 50, y: 50, role:'MID' }, { x: 50, y: 75, role:'MID' },
      { x: 75, y: 25, role:'FWD' }, { x: 75, y: 50, role:'FWD' }, { x: 75, y: 75, role:'FWD' },
    ],
    '4-4-2': [
      { x: 8, y: 50, role:'GK' },
      { x: 25, y: 20, role:'DEF' }, { x: 25, y: 40, role:'DEF' }, { x: 25, y: 60, role:'DEF' }, { x: 25, y: 80, role:'DEF' },
      { x: 50, y: 20, role:'MID' }, { x: 50, y: 40, role:'MID' }, { x: 50, y: 60, role:'MID' }, { x: 50, y: 80, role:'MID' },
      { x: 75, y: 40, role:'FWD' }, { x: 75, y: 60, role:'FWD' },
    ],
    '4-2-3-1': [
      { x: 8, y: 50, role:'GK' },
      { x: 25, y: 20, role:'DEF' }, { x: 25, y: 40, role:'DEF' }, { x: 25, y: 60, role:'DEF' }, { x: 25, y: 80, role:'DEF' },
      { x: 45, y: 40, role:'MID' }, { x: 45, y: 60, role:'MID' },
      { x: 60, y: 25, role:'MID' }, { x: 60, y: 50, role:'MID' }, { x: 60, y: 75, role:'MID' },
      { x: 78, y: 50, role:'FWD' },
    ],
    '3-5-2': [
      { x: 8, y: 50, role:'GK' },
      { x: 25, y: 35, role:'DEF' }, { x: 25, y: 50, role:'DEF' }, { x: 25, y: 65, role:'DEF' },
      { x: 45, y: 20, role:'MID' }, { x: 45, y: 40, role:'MID' }, { x: 45, y: 60, role:'MID' }, { x: 45, y: 80, role:'MID' }, { x: 58, y: 50, role:'MID' },
      { x: 75, y: 40, role:'FWD' }, { x: 75, y: 60, role:'FWD' },
    ],
    '3-4-3': [
      { x: 8, y: 50, role:'GK' },
      { x: 25, y: 35, role:'DEF' }, { x: 25, y: 50, role:'DEF' }, { x: 25, y: 65, role:'DEF' },
      { x: 48, y: 25, role:'MID' }, { x: 48, y: 50, role:'MID' }, { x: 48, y: 75, role:'MID' }, { x: 60, y: 50, role:'MID' },
      { x: 75, y: 25, role:'FWD' }, { x: 75, y: 50, role:'FWD' }, { x: 75, y: 75, role:'FWD' },
    ],
    '5-3-2': [
      { x: 8, y: 50, role:'GK' },
      { x: 20, y: 20, role:'DEF' }, { x: 22, y: 35, role:'DEF' }, { x: 24, y: 50, role:'DEF' }, { x: 22, y: 65, role:'DEF' }, { x: 20, y: 80, role:'DEF' },
      { x: 45, y: 30, role:'MID' }, { x: 45, y: 50, role:'MID' }, { x: 45, y: 70, role:'MID' },
      { x: 75, y: 40, role:'FWD' }, { x: 75, y: 60, role:'FWD' },
    ],
  };
  const arr = base[name] ? base[name].slice(0, count) : base['4-3-3'].slice(0, count);
  return arr.map((s, idx) => ({ ...s, id: 'slot_'+idx, playerId: '' }));
};

const applySystem = (name) => {
  const count = maxOnField;
  const presetKey = `${modality}:${name}`;
  let layout = systemLayouts[presetKey];
  if (!layout || layout.length !== count) {
    layout = buildSystemPreset(name, count);
  }
  setSystemName(name);
  setSystemSlots(layout);
};

const saveSystemPreset = () => {
  const key = `${modality}:${systemName}`;
  setSystemLayouts(prev => ({ ...prev, [key]: systemSlots }));
  alert(lang==='es' ? 'Plantilla de sistema guardada.' : 'System preset saved.');
};

const loadSystemPreset = (name) => {
  const key = `${modality}:${name}`;
  const layout = systemLayouts[key];
  if (!layout) {
    alert(lang==='es' ? 'No hay plantilla guardada para este sistema en esta modalidad.' : 'No preset saved for this system and modality.');
    return;
  }
  setSystemName(name);
  setSystemSlots(layout);
};

const invertSystemSide = () => {
  setAttackRight(v => !v);
};

  // Eventos de partido (sin jugador para pases/pérdidas/recuperaciones)
  const registerPass = (team) => {
    if (!matchStarted) { setMatchStarted(true); setRunning(true); }
    if (team === 'home') setHome(h=>({...h, passes:h.passes+1}));
    else setAway(a=>({...a, passes:a.passes+1}));
    if (stoppedPlay) setStoppedPlay(false);
    pushEvent(team, 'pass');
  };

  const registerLoss = (team) => {
    if (team === 'home') {
      setHome(h=>({...h, losses:h.losses+1}));
      setAway(a=>({...a, recoveries:a.recoveries+1}));
      setPossession('away');
      pushEvent('home', 'loss');
      pushEvent('away', 'recovery', { implicit:true });
    } else {
      setAway(a=>({...a, losses:a.losses+1}));
      setHome(h=>({...h, recoveries:h.recoveries+1}));
      setPossession('home');
      pushEvent('away', 'loss');
      pushEvent('home', 'recovery', { implicit:true });
    }
  };

  const registerRecovery = (team) => {
    if (team === 'home') {
      setHome(h=>({...h, recoveries:h.recoveries+1}));
      setAway(a=>({...a, losses:a.losses+1}));
      setPossession('home');
      pushEvent('home', 'recovery');
      pushEvent('away', 'loss', { implicit:true });
    } else {
      setAway(a=>({...a, recoveries:a.recoveries+1}));
      setHome(h=>({...h, losses:a.losses+1}));
      setPossession('away');
      pushEvent('away', 'recovery');
      pushEvent('home', 'loss', { implicit:true });
    }
  };

  const registerFoul = (team) => {
    if (team === 'home') setHome(h=>({...h, fouls:h.fouls+1}));
    else setAway(a=>({...a, fouls:a.fouls+1}));
    setStoppedPlay(true);
    pushEvent(team, 'foul');
  };

  const registerPenalty = (team) => {
    if (team === 'home') setHome(h=>({...h, penalties:h.penalties+1}));
    else setAway(a=>({...a, penalties:a.penalties+1}));
    setStoppedPlay(true);
    pushEvent(team, 'penalty');
  };

  const registerCorner = (team) => {
    if (team === 'home') setHome(h=>({...h, corners:h.corners+1}));
    else setAway(a=>({...a, corners:a.corners+1}));
    setStoppedPlay(true);
    pushEvent(team, 'corner');
  };

  const openShotMenu = (team) => setShotMenu({ team });

  const registerShotChoice = (choice) => {
    if (!shotMenu) return;
    const team = shotMenu.team;
    if (choice === 'on') {
      if (team === 'home') setHome(h=>({...h, shotsOn:h.shotsOn+1}));
      else setAway(a=>({...a, shotsOn:a.shotsOn+1}));
      pushEvent(team, 'shot_on');
    } else if (choice === 'off') {
      if (team === 'home') setHome(h=>({...h, shotsOff:h.shotsOff+1}));
      else setAway(a=>({...a, shotsOff:a.shotsOff+1}));
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

    if (team === 'home') setHome(h=>({...h, goals:h.goals+1}));
    else setAway(a=>({...a, goals:a.goals+1}));

    pushEvent(team, 'goal', { scorer, assist, footType, situation });
    setStoppedPlay(true);
    setPossession(team === 'home' ? 'away' : 'home');
    setGoalModal(null);

    // Stats individuales: solo goles y asistencias
    if (scorer) {
      setRoster(list => list.map(p => p.id === scorer ? {...p, stats:{...p.stats, goals:(p.stats.goals||0)+1 }} : p));
    }
    if (assist) {
      setRoster(list => list.map(p => p.id === assist ? {...p, stats:{...p.stats, assists:(p.stats.assists||0)+1 }} : p));
    }
  };

  const manualChangePossession = () => {
    setPossession(p => p === 'home' ? 'away' : 'home');
    pushEvent('sys', 'possession_switch');
  };

  const toggleBallState = () => {
    setStoppedPlay(s => !s);
    pushEvent('sys', !stoppedPlay ? 'ball_stopped' : 'ball_in_play');
  };

  // Substituciones rápidas UI
  const [subInId, setSubInId] = React.useState('');
  const [subOutId, setSubOutId] = React.useState('');

  // Export partido actual (CSV)
  const exportCurrentMatchCSV = () => {
    const rows = [];
    rows.push(['Fecha', matchDate]);
    rows.push(['Local', homeName]);
    rows.push(['Visitante', awayName]);
    rows.push(['Tiempo total (mm:ss)', formatTime(totalTime)]);
    rows.push([]);
    rows.push(['Equipo','Pases','Pérdidas','Recuperaciones','Tiros a puerta','Tiros fuera','Goles','Faltas','Penaltis','Córners','Tiempo efectivo (mm:ss)','xG']);
    const homeXG = computeXGFromEvents(events, 'home').toFixed(2);
    const awayXG = computeXGFromEvents(events, 'away').toFixed(2);
    rows.push(['Local', home.passes, home.losses, home.recoveries, home.shotsOn, home.shotsOff, home.goals, home.fouls, home.penalties, home.corners, formatTime(home.effective), homeXG]);
    rows.push(['Visitante', away.passes, away.losses, away.recoveries, away.shotsOn, away.shotsOff, away.goals, away.fouls, away.penalties, away.corners, formatTime(away.effective), awayXG]);
    rows.push([]);
    rows.push(['Eventos (ts, equipo, tipo, detalles)']);
    events.forEach(e => {
      rows.push([formatTime(e.ts), e.team, e.type, JSON.stringify({scorer:e.scorer||'', assist:e.assist||'', footType:e.footType||'', situation:e.situation||'', implicit: !!e.implicit})]);
    });
    rows.push([]);
    rows.push(['Plantilla (solo goles/asistencias contabilizadas)']);
    rows.push(['Dorsal','Nombre','Posición','Minutos (mm:ss)','Goles','Asistencias']);
    roster.forEach(p => {
      rows.push([p.number, p.name, p.position, formatTime(p.minutes), p.stats.goals||0, p.stats.assists||0]);
    });
    downloadCSV(`partido_${matchDate}.csv`, rows);
  };

  // Finalizar y guardar partido al histórico
  const finishAndSaveMatch = () => {
    const ok = confirm(`${t.confirmFinishTitle}\n\n${t.confirmFinishBody}`);
    if (!ok) return;

    // Construir objeto partido
    const homeXG = computeXGFromEvents(events, 'home');
    const awayXG = computeXGFromEvents(events, 'away');

    const matchObj = {
      date: matchDate,
      homeName,
      awayName,
      ownTeamSide,
      totals: {
        totalTime,
        home: {...home, xg: homeXG},
        away: {...away, xg: awayXG},
        possessionPct: { home: homePossPct, away: awayPossPct },
      },
      events,
      roster: roster.map(p => ({
        number: p.number, name: p.name, position: p.position,
        minutes: p.minutes, goals: p.stats.goals||0, assists: p.stats.assists||0
      })),
      result: {
        home: home.goals,
        away: away.goals,
      },
    };

    let history = [];
    try { history = JSON.parse(localStorage.getItem('ffd-history') || '[]'); } catch { history = []; }
    history.push(matchObj);
    localStorage.setItem('ffd-history', JSON.stringify(history));

    // Reset partido actual (mantener plantilla y modalidad)
    setMatchStarted(false);
    setRunning(false);
    setTotalTime(0);
    setPossession('home');
    setStoppedPlay(false);
    setHome(makeTeamAgg());
    setAway(makeTeamAgg());
    setEvents([]);

    alert(lang==='es' ? 'Partido guardado en el histórico.' : 'Match saved to history.');
  };

  // Dashboard: carga histórico
  const [history, setHistory] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('ffd-history') || '[]'); } catch { return []; }
  });
  React.useEffect(() => {
    const onStorage = () => {
      try { setHistory(JSON.parse(localStorage.getItem('ffd-history') || '[]')); } catch { /* noop */ }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const computeDashboard = () => {
    const games = history.filter(g => g.ownTeamSide === ownTeamSide);
    const totalGames = games.length;
    const last5 = games.slice(-5);
    const results = last5.map(g => {
      const ownGoals = g.ownTeamSide === 'home' ? g.totals.home.goals : g.totals.away.goals;
      const oppGoals = g.ownTeamSide === 'home' ? g.totals.away.goals : g.totals.home.goals;
      if (ownGoals > oppGoals) return 'W';
      if (ownGoals < oppGoals) return 'L';
      return 'D';
    });

    let sumPossOwn = 0, sumShotsOnOwn = 0, sumShotsOnOpp = 0, sumXgOwn = 0, sumXgOpp = 0, sumGF = 0, sumGA = 0;
    games.forEach(g => {
      const ownSide = g.ownTeamSide;
      const oppSide = ownSide === 'home' ? 'away' : 'home';
      sumPossOwn += g.totals.possessionPct[ownSide] || 0;
      sumShotsOnOwn += g.totals[ownSide].shotsOn || 0;
      sumShotsOnOpp += g.totals[oppSide].shotsOn || 0;
      sumXgOwn += g.totals[ownSide].xg || 0;
      sumXgOpp += g.totals[oppSide].xg || 0;
      sumGF += g.totals[ownSide].goals || 0;
      sumGA += g.totals[oppSide].goals || 0;
    });

    const avg = (v) => totalGames ? (v/totalGames) : 0;

    // Top 3 minutos, goles, asistencias (acumulado sobre plantilla agregada)
    const playerMap = new Map();
    games.forEach(g => {
      g.roster.forEach(p => {
        const key = `${p.number}|${p.name}`;
        const prev = playerMap.get(key) || { number: p.number, name: p.name, minutes: 0, goals: 0, assists: 0 };
        playerMap.set(key, {
          number: p.number,
          name: p.name,
          minutes: prev.minutes + (p.minutes || 0),
          goals: prev.goals + (p.goals || 0),
          assists: prev.assists + (p.assists || 0),
        });
      });
    });
    const playersAgg = Array.from(playerMap.values());
    const topMinutes = playersAgg.slice().sort((a,b)=>b.minutes - a.minutes).slice(0,3);
    const topGoals = playersAgg.slice().sort((a,b)=>b.goals - a.goals).slice(0,3);
    const topAssists = playersAgg.slice().sort((a,b)=>b.assists - a.assists).slice(0,3);

    return {
      totalGames,
      results,
      avgPossOwn: avg(sumPossOwn).toFixed(1),
      avgShotsOnFor: avg(sumShotsOnOwn).toFixed(1),
      avgShotsOnAgainst: avg(sumShotsOnOpp).toFixed(1),
      avgXgFor: avg(sumXgOwn).toFixed(2),
      avgXgAgainst: avg(sumXgOpp).toFixed(2),
      avgGF: avg(sumGF).toFixed(2),
      avgGA: avg(sumGA).toFixed(2),
      topMinutes,
      topGoals,
      topAssists,
    };
  };

  const dash = computeDashboard();

  const renderEvent = (e) => {
    switch (e.type) {
      case 'pass': return t.pass;
      case 'loss': return t.loss + (e.implicit ? ' (↔)' : '');
      case 'recovery': return t.recovery + (e.implicit ? ' (↔)' : '');
      case 'foul': return t.foul;
      case 'penalty': return t.penalty;
      case 'corner': return t.corner;
      case 'shot_on': return `${t.shot} (${t.onTarget})`;
      case 'shot_off': return `${t.shot} (${t.offTarget})`;
      case 'goal': {
        let txt = `${t.goal} ⚽`;
        if (e.scorer) {
          const p = roster.find(p=>p.id===e.scorer);
          txt += ` - ${p ? `${p.number} ${p.name}` : '—'}`;
        }
        if (e.assist) {
          const a = roster.find(p=>p.id===e.assist);
          txt += ` (${a ? `${a.number} ${a.name}` : '—'})`;
        }
        if (e.footType) txt += ` [${t[e.footType]}]`;
        if (e.situation) txt += ` {${t[e.situation]}}`;
        return txt;
      }
      case 'possession_switch': return '↔ ' + t.possession;
      case 'ball_in_play': return '● ' + t.ballInPlay;
      case 'ball_stopped': return '● ' + t.ballStopped;
      default: return e.type;
    }
  };

  // Export histórico CSV
  const exportHistoryCSV = () => {
    const rows = [];
    rows.push(['Acumulado FFD']);
    rows.push(['Total partidos', dash.totalGames]);
    rows.push([]);
    rows.push(['Fecha','Local','Visitante','Goles Local','Goles Visitante','xG Local','xG Visitante','% Posesión Local','Tiros a puerta L','Tiros a puerta V','Tiempo total']);
    history.forEach(g=>{
      rows.push([
        g.date,
        g.homeName,
        g.awayName,
        g.totals.home.goals,
        g.totals.away.goals,
        (g.totals.home.xg||0).toFixed(2),
        (g.totals.away.xg||0).toFixed(2),
        (g.totals.possessionPct?.home||0),
        (g.totals.home.shotsOn||0),
        (g.totals.away.shotsOn||0),
        formatTime(g.totals.totalTime||0),
      ]);
    });
    rows.push([]);
    rows.push(['Medias por partido']);
    rows.push(['% Posesión', dash.avgPossOwn, 'Tiros a puerta a favor', dash.avgShotsOnFor, 'Tiros a puerta en contra', dash.avgShotsOnAgainst]);
    rows.push(['xG a favor', dash.avgXgFor, 'xG en contra', dash.avgXgAgainst, 'GF', dash.avgGF, 'GC', dash.avgGA]);
    rows.push([]);
    rows.push(['Top 3 Minutos']);
    rows.push(['Dorsal','Nombre','Minutos (mm:ss)']);
    dash.topMinutes.forEach(p=>rows.push([p.number, p.name, formatTime(p.minutes)]));
    rows.push([]);
    rows.push(['Top 3 Goles']);
    rows.push(['Dorsal','Nombre','Goles']);
    dash.topGoals.forEach(p=>rows.push([p.number, p.name, p.goals]));
    rows.push([]);
    rows.push(['Top 3 Asistencias']);
    rows.push(['Dorsal','Nombre','Asistencias']);
    dash.topAssists.forEach(p=>rows.push([p.number, p.name, p.assists]));

    downloadCSV('ffd_acumulado.csv', rows);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">{t.language}:</span>
            <select value={lang} onChange={(e)=>setLang(e.target.value)} className="border rounded px-2 py-1 bg-white text-sm">
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>
          <h1 className="ml-2 text-lg font-bold">{t.appName}</h1>
          <nav className="ml-auto flex gap-4 text-sm">
            <Link to="/" className="hover:underline">{t.eventsStats}</Link>
            <Link to="/manage" className="hover:underline">{t.matchManagement}</Link>
            <Link to="/dash" className="hover:underline">{t.dashboard}</Link>
            <Link to="/pay" className="hover:underline">{t.payment}</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Routes>
          {/* ================== PARTIDO ACTUAL ================== */}
          <Route path="/" element={
            <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">

              {!matchStarted && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-center">
                  {t.matchNotStarted}
                </div>
              )}

              {/* Cabecera de control */}
              <div className="grid sm:grid-cols-4 gap-4">
                <Card title={t.totalTime}>
                  <div className="text-3xl font-bold">{formatTime(totalTime)}</div>
                  <div className="mt-3 flex gap-2">
                    <button
                      className="w-full px-3 py-2 rounded bg-blue-600 text-white font-semibold text-sm"
                      onClick={() => !matchStarted ? setMatchStarted(true) || setRunning(true) : setRunning(r=>!r)}
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
                    <button className="px-2 py-1 rounded border text-sm" onClick={manualChangePossession}>
                      ↔ {t.changePossession}
                    </button>
                  </div>
                </Card>
                <Card title={t.possessionPercent}>
                  <div className="flex gap-4">
                    <div>
                      <div className="text-xs text-slate-500">{homeName}</div>
                      <div className="text-xl font-semibold">{homePossPct}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">{awayName}</div>
                      <div className="text-xl font-semibold">{awayPossPct}%</div>
                    </div>
                  </div>
                </Card>
                <Card title={t.possessionBar}>
                  <div className="text-sm">
                    {stoppedPlay ? <span className="text-amber-700">● {t.stopped}</span> : <span className="text-emerald-700">● {t.inPlay}</span>}
                  </div>
                  <div className="mt-2">
                    <button className="px-2 py-1 rounded border text-sm" onClick={toggleBallState} disabled={!matchStarted}>
                      {stoppedPlay ? t.ballInPlay : t.ballStopped}
                    </button>
                  </div>
                </Card>
              </div>

              {/* Cambios rápidos */}
              <Card title="🔁 Cambios rápidos">
                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">{t.subIn}</div>
                    <select className="w-full border rounded px-2 py-2" value={subInId} onChange={(e)=>setSubInId(e.target.value)}>
                      <option value="">{t.select}</option>
                      {playersOnBench.map(p=>(
                        <option key={p.id} value={p.id}>{p.number} - {p.name} ({p.position})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">{t.subOut}</div>
                    <select className="w-full border rounded px-2 py-2" value={subOutId} onChange={(e)=>setSubOutId(e.target.value)}>
                      <option value="">{t.select}</option>
                      {playersOnField.map(p=>(
                        <option key={p.id} value={p.id}>{p.number} - {p.name} ({p.position})</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded font-semibold w-full" onClick={()=>{makeSub(subInId, subOutId); setSubInId(''); setSubOutId('');}}>
                      {t.makeSub}
                    </button>
                  </div>
                </div>
                <div className="text-xs text-slate-500 mt-2">
                  {t.playersOnFieldLimit}: {maxOnField}. {t.applyInitial} en "Gestión".
                </div>
              </Card>

              {/* Controles por equipo */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Local */}
                <Card title={`${homeName} (${t.homeTeamLabel})`} subtitle={formatTime(home.effective)}>
                  <div className={`${possession === 'home' ? 'ring-2 ring-emerald-500 rounded-lg p-3' : ''}`}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <button className="px-3 py-2 rounded font-semibold border shadow-sm bg-black text-white hover:opacity-90" onClick={() => registerPass('home')}>{t.pass}</button>
                      <button className="px-3 py-2 rounded font-semibold border shadow-sm bg-black text-white hover:opacity-90" onClick={() => registerLoss('home')}>{t.loss}</button>
                      <button className="px-3 py-2 rounded font-semibold border shadow-sm bg-black text-white hover:opacity-90" onClick={() => registerRecovery('home')}>{t.recovery}</button>
                      <button className="px-3 py-2 rounded font-semibold border shadow-sm bg-black text-white hover:opacity-90" onClick={() => openShotMenu('home')}>{t.shot} ▾</button>
                      <button className="px-3 py-2 rounded font-semibold border shadow-sm bg-black text-white hover:opacity-90" onClick={() => registerFoul('home')}>{t.foul}</button>
                      <button className="px-3 py-2 rounded font-semibold border shadow-sm bg-black text-white hover:opacity-90" onClick={() => registerPenalty('home')}>{t.penalty}</button>
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
                      <Stat label={t.xg} value={computeXGFromEvents(events,'home').toFixed(2)} />
                    </div>
                  </div>
                </Card>

                {/* Visitante */}
                <Card title={`${awayName} (${t.awayTeamLabel})`} subtitle={formatTime(away.effective)}>
                  <div className={`${possession === 'away' ? 'ring-2 ring-emerald-500 rounded-lg p-3' : ''}`}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <button className="px-3 py-2 rounded font-semibold border shadow-sm bg-white text-black hover:bg-slate-100" onClick={() => registerPass('away')}>{t.pass}</button>
                      <button className="px-3 py-2 rounded font-semibold border shadow-sm bg-white text-black hover:bg-slate-100" onClick={() => registerLoss('away')}>{t.loss}</button>
                      <button className="px-3 py-2 rounded font-semibold border shadow-sm bg-white text-black hover:bg-slate-100" onClick={() => registerRecovery('away')}>{t.recovery}</button>
                      <button className="px-3 py-2 rounded font-semibold border shadow-sm bg-white text-black hover:bg-slate-100" onClick={() => openShotMenu('away')}>{t.shot} ▾</button>
                      <button className="px-3 py-2 rounded font-semibold border shadow-sm bg-white text-black hover:bg-slate-100" onClick={() => registerFoul('away')}>{t.foul}</button>
                      <button className="px-3 py-2 rounded font-semibold border shadow-sm bg-white text-black hover:bg-slate-100" onClick={() => registerPenalty('away')}>{t.penalty}</button>
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
                      <Stat label={t.xg} value={computeXGFromEvents(events,'away').toFixed(2)} />
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
                      {e.team === 'home' ? homeName : e.team === 'away' ? awayName : 'SYS'} → {renderEvent(e)}
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Modal tiro */}
              {shotMenu && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-40 flex items-center justify-center" onClick={()=>setShotMenu(null)} tabIndex={-1}>
                  <div className="bg-white border shadow-lg rounded-lg overflow-hidden w-full max-w-sm mx-3" onClick={(e)=>e.stopPropagation()}>
                    <div className="p-3 border-b font-semibold">{t.shot}</div>
                    <div className="p-3 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <button className="px-3 py-2 border rounded" onClick={()=>registerShotChoice('on')}>{t.onTarget}</button>
                        <button className="px-3 py-2 border rounded" onClick={()=>registerShotChoice('off')}>{t.offTarget}</button>
                        <button className="px-3 py-2 border rounded" onClick={()=>registerShotChoice('corner')}>{t.corner}</button>
                        <button className="px-3 py-2 border rounded" onClick={()=>{ setGoalModal({ team: shotMenu.team, scorer:'', assist:'', footType:'rightFoot', situation:'openPlay' }); setShotMenu(null); }}>{t.goal}</button>
                      </div>
                      <button className="w-full px-3 py-2 rounded bg-red-50 text-red-700 border" onClick={()=>setShotMenu(null)}>✕</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal gol */}
              {goalModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
                  <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                    <h3 className="text-lg font-semibold mb-4">{t.goalDetails}</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">{t.scorer}</label>
                        <select value={goalModal.scorer} onChange={(e)=>setGoalModal({...goalModal, scorer: e.target.value})} className="w-full border rounded px-3 py-2">
                          <option value="">{t.selectPlayer}</option>
                          {roster.map(p=><option key={p.id} value={p.id}>{p.number} - {p.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">{t.assist}</label>
                        <select value={goalModal.assist} onChange={(e)=>setGoalModal({...goalModal, assist: e.target.value})} className="w-full border rounded px-3 py-2">
                          <option value="">{t.noAssist}</option>
                          {roster.map(p=><option key={p.id} value={p.id}>{p.number} - {p.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">{t.footType}</label>
                        <select value={goalModal.footType} onChange={(e)=>setGoalModal({...goalModal, footType: e.target.value})} className="w-full border rounded px-3 py-2">
                          <option value="rightFoot">{t.rightFoot}</option>
                          <option value="leftFoot">{t.leftFoot}</option>
                          <option value="head">{t.head}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">{t.situation}</label>
                        <select value={goalModal.situation} onChange={(e)=>setGoalModal({...goalModal, situation: e.target.value})} className="w-full border rounded px-3 py-2">
                          <option value="openPlay">{t.openPlay}</option>
                          <option value="freeKick">{t.freeKick}</option>
                          <option value="penaltyKick">{t.penaltyKick}</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button onClick={saveGoal} className="flex-1 bg-blue-600 text-white px-4 py-2 rounded font-semibold">{t.save}</button>
                      <button onClick={()=>setGoalModal(null)} className="flex-1 border px-4 py-2 rounded font-semibold">{t.cancel}</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Finalizar y guardar + Exportar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="px-4 py-2 bg-emerald-600 text-white rounded font-semibold" onClick={finishAndSaveMatch}>
                  {t.finishAndSaveMatch}
                </button>
                <button className="px-4 py-2 border rounded font-semibold" onClick={exportCurrentMatchCSV}>
                  {t.exportMatchCSV}
                </button>
              </div>
            </div>
          } />

          {/* ================== GESTIÓN ================== */}
          <Route path="/manage" element={
            <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
              <h2 className="text-2xl font-bold">{t.matchManagement}</h2>

              <Card title="⚙️ Partido">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">{t.ownTeamName}</label>
                    <input className="border rounded px-3 py-2 w-full" value={ownTeamName} onChange={(e)=>setOwnTeamName(e.target.value)} placeholder="Ej: FFD U-14" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">{t.rival}</label>
                    <input className="border rounded px-3 py-2 w-full" value={opponentName} onChange={(e)=>setOpponentName(e.target.value)} placeholder="Rival" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">{t.yourTeamPlaysAs}</label>
                    <select className="border rounded px-2 py-2 w-full" value={ownTeamSide} onChange={(e)=>setOwnTeamSide(e.target.value)}>
                      <option value="home">{t.homeTeamLabel}</option>
                      <option value="away">{t.awayTeamLabel}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">{t.date}</label>
                    <input type="date" className="border rounded px-3 py-2 w-full" value={matchDate} onChange={(e)=>setMatchDate(e.target.value)} />
                  </div>
                </div>
              </Card>

              <Card title={`📋 ${t.modality}`} subtitle={`${t.playersOnFieldLimit}: ${maxOnField}`}>
                <div className="flex flex-wrap gap-2 items-center">
                  {Object.keys(modalityToMax).map(m => (
                    <button key={m} className={`px-3 py-2 border rounded ${modality===m?'bg-blue-600 text-white':'bg-white'}`} onClick={()=>setModality(m)}>
                      {m.toUpperCase()}
                    </button>
                  ))}
                  <button className="ml-auto px-3 py-2 border rounded bg-emerald-600 text-white" onClick={applyInitial}>
                    {t.applyInitial}
                  </button>
                </div>
              </Card>

              <Card title={`🧑‍🤝‍🧑 ${t.roster}`}>
                <div className="mb-3">
                  <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={addPlayer}>{t.addPlayer}</button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* En campo */}
                  <div>
                    <div className="text-sm font-semibold mb-2">{t.playersInField} ({playersOnField.length}/{maxOnField})</div>
                    <ul className="space-y-2">
                      {playersOnField.map(p=>(
                        <li key={p.id} className="p-3 border rounded bg-emerald-50 flex items-center justify-between">
                          <div className="text-sm">
                            <div className="font-semibold">{p.number} - {p.name}</div>
                            <div className="text-xs text-slate-500">{p.position} - {t.minutes}: {formatTime(p.minutes)}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              className="px-2 py-1 border rounded"
                              onClick={() => setRoster(list => list.map(x => x.id === p.id ? { ...x, onField: false } : x))}
                            >
                              {t.subOut}
                            </button>
                            <button
                              className="px-2 py-1 border rounded text-red-700"
                              onClick={() => removePlayer(p.id)}
                            >
                              {t.remove}
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Banquillo */}
                  <div>
                    <div className="text-sm font-semibold mb-2">{t.playersBench} ({playersOnBench.length})</div>
                    <ul className="space-y-2">
                      {playersOnBench.map(p=>(
                        <li key={p.id} className="p-3 border rounded bg-white flex items-center justify-between">
                          <div className="text-sm">
                            <div className="font-semibold">{p.number} - {p.name}</div>
                            <div className="text-xs text-slate-500">{p.position}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              className="px-2 py-1 border rounded"
                              onClick={() => {
                                const currentOnField = roster.filter(x => x.onField).length;
                                if (currentOnField >= maxOnField) {
                                  alert(`${t.playersOnFieldLimit}: ${maxOnField}`);
                                  return;
                                }
                                setRoster(list => list.map(x => x.id === p.id ? { ...x, onField: true } : x));
                              }}
                            >
                              {t.subIn}
                            </button>
                            <button
                              className="px-2 py-1 border rounded text-red-700"
                              onClick={() => removePlayer(p.id)}
                            >
                              {t.remove}
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
<Card title="🗺️ Campograma (Sistema de juego)">
                {/* ... todo el código de la Card que te pasé ... */}
              </Card>
              {/* Export histórico */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="px-4 py-2 border rounded font-semibold" onClick={exportHistoryCSV}>
                  {t.exportHistoryCSV}
                </button>
              </div>
            </div>
          } />

          {/* ================== DASHBOARD ================== */}
          <Route path="/dash" element={
            <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
              <h2 className="text-2xl font-bold">{t.dashboard}</h2>
              {history.length === 0 ? (
                <div className="p-4 border rounded bg-slate-50">{t.noMatchesYet}</div>
              ) : (
                <>
                  <Card title={t.results}>
                    <div className="flex gap-2 flex-wrap">
                      {history.slice(-5).map((g, i) => {
                        const ownSide = g.ownTeamSide;
                        const ownGoals = ownSide === 'home' ? g.totals.home.goals : g.totals.away.goals;
                        const oppGoals = ownSide === 'home' ? g.totals.away.goals : g.totals.home.goals;
                        const res = ownGoals > oppGoals ? t.W : ownGoals < oppGoals ? t.L : t.D;
                        return <span key={i} className="px-2 py-1 border rounded bg-white">{res}</span>;
                      })}
                    </div>
                  </Card>

                  <Card title={t.avgPerMatch}>
                    <div className="grid sm:grid-cols-3 gap-3">
                      <Stat label="% Posesión (propia)" value={dash.avgPossOwn} />
                      <Stat label={t.shotsOn + ' (propios)'} value={dash.avgShotsOnFor} />
                      <Stat label={t.shotsOn + ' (contra)'} value={dash.avgShotsOnAgainst} />
                      <Stat label={'xG (propio)'} value={dash.avgXgFor} />
                      <Stat label={'xG (contra)'} value={dash.avgXgAgainst} />
                      <Stat label={'GF'} value={dash.avgGF} />
                      <Stat label={'GC'} value={dash.avgGA} />
                    </div>
                  </Card>

                  <div className="grid md:grid-cols-3 gap-4">
                    <Card title={t.top3Minutes}>
                      <ul className="text-sm space-y-1">
                        {dash.topMinutes.map((p,i)=>(
                          <li key={i}>{p.number} - {p.name}: {formatTime(p.minutes)}</li>
                        ))}
                      </ul>
                    </Card>
                    <Card title={t.top3Goals}>
                      <ul className="text-sm space-y-1">
                        {dash.topGoals.map((p,i)=>(
                          <li key={i}>{p.number} - {p.name}: {p.goals}</li>
                        ))}
                      </ul>
                    </Card>
                    <Card title={t.top3Assists}>
                      <ul className="text-sm space-y-1">
                        {dash.topAssists.map((p,i)=>(
                          <li key={i}>{p.number} - {p.name}: {p.assists}</li>
                        ))}
                      </ul>
                    </Card>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="px-4 py-2 border rounded font-semibold" onClick={exportHistoryCSV}>
                      {t.exportHistoryCSV}
                    </button>
                  </div>
                </>
              )}
            </div>
          } />

          {/* ================== PAGO (placeholder) ================== */}
          <Route path="/pay" element={
            <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
              <h2 className="text-2xl font-bold">{t.payment}</h2>
              <Card title="PayPal">
                <p className="text-sm mb-3">{t.proLocked}</p>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded font-semibold"
                  onClick={()=>{
                    setIsPro(true);
                    localStorage.setItem('ffd-pro','true');
                    alert(t.paymentSuccess);
                  }}
                >
                  {t.payWithPayPal}
                </button>
              </Card>
            </div>
          } />
        </Routes>
      </main>
    </div>
  );
}

/* Wrapper con Router */
export default function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}