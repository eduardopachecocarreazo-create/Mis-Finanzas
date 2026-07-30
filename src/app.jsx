import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  Tooltip, LineChart, Line, AreaChart, Area, CartesianGrid
} from 'recharts';
import {
  Home, Clock, Target, PieChart as PieIcon, Settings, Plus, X, Check, Lock,
  Search, TrendingUp, TrendingDown, Wallet, CreditCard, Banknote,
  ArrowUpRight, ArrowDownRight, Trash2, Pencil, Download, Moon, Sun,
  Calendar, Filter, Utensils, Car, Film, Heart, GraduationCap, ShoppingBag,
  Zap, MoreHorizontal, Laptop, PlusCircle, ChevronRight, ChevronLeft,
  Gift, Plane, Dumbbell, BookOpen, Coffee, Landmark, PiggyBank, Smartphone,
  ArrowRightLeft, Archive, Repeat, Pause, Play, Users, Percent, PartyPopper,
  Info, Upload, FileJson, FileSpreadsheet, AlertTriangle, RefreshCw, Fingerprint,
  Eye, EyeOff,
  Tv, MonitorPlay, Clapperboard, Youtube, Twitch, Ticket, Music2, Headphones,
  Podcast, Radio, Gamepad2, Joystick, Wifi, Router, Globe, Phone, Cloud, Server,
  Database, Code2, Terminal, Monitor, Github, Figma, Slack, Palette, Camera,
  Sparkles, Bot, Newspaper, Rss, Library, Languages, Lightbulb, Droplet, Flame,
  Plug, Recycle, Wrench, Umbrella, Shield, ShieldCheck, Key, HeartPulse,
  Stethoscope, Pill, Pizza, ShoppingCart, Store, Package, Truck, Bike, Bus,
  Train, Fuel, Briefcase, Building2, PawPrint, Dog, Baby, Scissors, Shirt,
  Crown, Star, Bell, Mail, Receipt, Coins, CalendarClock
} from 'lucide-react';

const APP_VERSION = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : 'dev';

function lastPointDot(color, length) {
  return (props) => (
    props.index === length - 1
      ? <circle key={`dot-${props.index}`} cx={props.cx} cy={props.cy} r={3.5} fill={color} stroke="none" />
      : null
  );
}

/* ---------------------------------- ICONOS ---------------------------------- */
const ICONS = {
  Home, Clock, Target, PieIcon, Settings, Plus, X, Check, Lock, Search,
  TrendingUp, TrendingDown, Wallet, CreditCard, Banknote, ArrowUpRight,
  ArrowDownRight, Trash2, Pencil, Download, Moon, Sun, Calendar, Filter,
  Utensils, Car, Film, Heart, GraduationCap, ShoppingBag, Zap,
  MoreHorizontal, Laptop, PlusCircle, ChevronRight, ChevronLeft, Gift,
  Plane, Dumbbell, BookOpen, Coffee, Landmark, PiggyBank, Smartphone,
  ArrowRightLeft, Archive, Repeat, Pause, Play, Users, Percent, PartyPopper,
  Info, Upload, FileJson, FileSpreadsheet, AlertTriangle, RefreshCw, Fingerprint,
  Eye, EyeOff,
  Tv, MonitorPlay, Clapperboard, Youtube, Twitch, Ticket, Music2, Headphones,
  Podcast, Radio, Gamepad2, Joystick, Wifi, Router, Globe, Phone, Cloud, Server,
  Database, Code2, Terminal, Monitor, Github, Figma, Slack, Palette, Camera,
  Sparkles, Bot, Newspaper, Rss, Library, Languages, Lightbulb, Droplet, Flame,
  Plug, Recycle, Wrench, Umbrella, Shield, ShieldCheck, Key, HeartPulse,
  Stethoscope, Pill, Pizza, ShoppingCart, Store, Package, Truck, Bike, Bus,
  Train, Fuel, Briefcase, Building2, PawPrint, Dog, Baby, Scissors, Shirt,
  Crown, Star, Bell, Mail, Receipt, Coins, CalendarClock
};
const Icon = ({ name, size = 18, color, style }) => {
  const Cmp = ICONS[name] || MoreHorizontal;
  return <Cmp size={size} color={color} style={style} strokeWidth={1.8} />;
};

const CATEGORY_ICON_OPTIONS = ['Utensils','Car','Home','Film','Heart','GraduationCap','ShoppingBag','Zap','Wallet','Laptop','TrendingUp','PlusCircle','CreditCard','Banknote','Gift','Plane','Dumbbell','BookOpen','Coffee','MoreHorizontal'];
const COLOR_OPTIONS = ['#D98C7A','#8FA7D9','#C9A66B','#B79FD9','#D98CA0','#7FD9C4','#D9C87A','#9096A3','#8FBFA0','#6FA787','#5C9873','#A6D1B5','#D9A94A','#7A8290'];

/* ------------------------------- DATOS POR DEFECTO ------------------------------- */
const DEFAULT_CATEGORIES = [
  { id: 'alimentacion', name: 'Alimentación', icon: 'Utensils', color: '#D98C7A', type: 'expense' },
  { id: 'transporte', name: 'Transporte', icon: 'Car', color: '#8FA7D9', type: 'expense' },
  { id: 'vivienda', name: 'Vivienda', icon: 'Home', color: '#C9A66B', type: 'expense' },
  { id: 'entretenimiento', name: 'Entretenimiento', icon: 'Film', color: '#B79FD9', type: 'expense' },
  { id: 'salud', name: 'Salud', icon: 'Heart', color: '#D98CA0', type: 'expense' },
  { id: 'educacion', name: 'Educación', icon: 'GraduationCap', color: '#7FD9C4', type: 'expense' },
  { id: 'compras', name: 'Compras', icon: 'ShoppingBag', color: '#D9C87A', type: 'expense' },
  { id: 'servicios', name: 'Servicios', icon: 'Zap', color: '#9096A3', type: 'expense' },
  { id: 'otros_gasto', name: 'Otros', icon: 'MoreHorizontal', color: '#7A8290', type: 'expense' },
  { id: 'salario', name: 'Salario', icon: 'Wallet', color: '#8FBFA0', type: 'income' },
  { id: 'freelance', name: 'Freelance', icon: 'Laptop', color: '#6FA787', type: 'income' },
  { id: 'inversiones', name: 'Inversiones', icon: 'TrendingUp', color: '#5C9873', type: 'income' },
  { id: 'otros_ingreso', name: 'Otros ingresos', icon: 'PlusCircle', color: '#A6D1B5', type: 'income' },
];

const ACCOUNT_TYPES = [
  { value: 'cash', label: 'Efectivo', icon: 'Banknote' },
  { value: 'bank', label: 'Cuenta bancaria', icon: 'Landmark' },
  { value: 'credit_card', label: 'Tarjeta de crédito', icon: 'CreditCard' },
  { value: 'savings', label: 'Ahorros', icon: 'PiggyBank' },
  { value: 'digital_wallet', label: 'Billetera digital', icon: 'Smartphone' },
  { value: 'investment', label: 'Inversión', icon: 'TrendingUp' },
];
const ACCOUNT_ICON_OPTIONS = ['Banknote','Landmark','CreditCard','PiggyBank','Smartphone','TrendingUp','Wallet','MoreHorizontal'];

const DEFAULT_ACCOUNTS = [
  { id: 'efectivo', name: 'Efectivo', type: 'cash', icon: 'Banknote', color: '#8FBFA0', initialBalance: 0, currency: 'COP', includeInTotal: true, archived: false, order: 0 },
  { id: 'banco', name: 'Cuenta bancaria', type: 'bank', icon: 'Landmark', color: '#8FA7D9', initialBalance: 0, currency: 'COP', includeInTotal: true, archived: false, order: 1 },
  { id: 'tarjeta', name: 'Tarjeta de crédito', type: 'credit_card', icon: 'CreditCard', color: '#D98C7A', initialBalance: 0, currency: 'COP', includeInTotal: true, archived: false, order: 2 },
];

const FREQUENCIES = [
  { value: 'daily', label: 'Diaria' },
  { value: 'weekly', label: 'Semanal' },
  { value: 'biweekly', label: 'Quincenal' },
  { value: 'monthly', label: 'Mensual' },
  { value: 'bimonthly', label: 'Bimestral' },
  { value: 'quarterly', label: 'Trimestral' },
  { value: 'yearly', label: 'Anual' },
];

const GOAL_ICON_OPTIONS = ['Target','Plane','Gift','PiggyBank','Home','Laptop','GraduationCap','Heart','Dumbbell','Car','MoreHorizontal'];

/* -------------------------- SUSCRIPCIONES: ICONOS -------------------------- */
const SUBSCRIPTION_ICON_OPTIONS = [
  'Tv','MonitorPlay','Clapperboard','Film','Youtube','Twitch','Ticket','Radio',
  'Music2','Headphones','Podcast','Gamepad2','Joystick','Sparkles','Bot','Palette',
  'Smartphone','Phone','Wifi','Router','Globe','Cloud','Server','Database',
  'Laptop','Monitor','Code2','Terminal','Github','Figma','Slack','Camera',
  'BookOpen','Newspaper','Library','Rss','GraduationCap','Languages','Briefcase','Mail',
  'Home','Lightbulb','Zap','Droplet','Flame','Plug','Wrench','Recycle',
  'Dumbbell','HeartPulse','Stethoscope','Pill','Heart','Shield','ShieldCheck','Umbrella',
  'ShoppingCart','Utensils','Pizza','Coffee','Store','Package','Truck','Car',
  'Bike','Bus','Train','Fuel','PawPrint','Dog','Baby','Users',
  'Building2','Key','Receipt','Coins','CreditCard','Landmark','Repeat','MoreHorizontal',
];

function normalizeGuessText(s) {
  return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

// [ [palabras clave...], icono ] — se evalúa en orden, la primera coincidencia gana.
// Marcas específicas antes que sustantivos genéricos.
const SUBSCRIPTION_ICON_RULES = [
  [['claro video','win sports','directv','netflix','disney','hbo','hbo max','prime video','primevideo',
    'paramount','star+','starplus','crunchyroll','mubi','plex','apple tv','appletv','vix','pluto','cine',
    'cinema','cinemark','cineco'], 'Tv'],
  [['youtube'], 'Youtube'],
  [['twitch','kick'], 'Twitch'],
  [['spotify','deezer','tidal','apple music','applemusic','youtube music','musica','música'], 'Music2'],
  [['audible','audiolibro','podcast'], 'Podcast'],
  [['radio','emisora'], 'Radio'],
  [['steam','playstation','ps plus','psplus','xbox','game pass','gamepass','nintendo',
    'epic games','riot','roblox','fortnite','juego'], 'Gamepad2'],
  [['claro','movistar','tigo','wom','etb','avantel','virgin','plan celular','celular',
    'recarga','datos moviles','datos móviles'], 'Smartphone'],
  [['internet','fibra','banda ancha','wifi','wi-fi','router','modem','módem'], 'Wifi'],
  [['icloud','google one','googleone','dropbox','onedrive','mega','backblaze','nube',
    'almacenamiento'], 'Cloud'],
  [['chatgpt','openai','claude','anthropic','gemini','copilot','midjourney','perplexity',
    'ia ','inteligencia artificial'], 'Sparkles'],
  [['adobe','photoshop','lightroom','illustrator','canva','figma','capcut','premiere'], 'Palette'],
  [['office','microsoft','microsoft 365','office 365','google workspace','workspace',
    'notion','slack','zoom','trello','asana'], 'Briefcase'],
  [['github','gitlab','vercel','netlify','aws','azure','digitalocean','hosting','servidor',
    'vps','dominio','cloudflare'], 'Server'],
  [['antivirus','vpn','nordvpn','1password','bitwarden','lastpass','dashlane','norton',
    'mcafee','kaspersky'], 'ShieldCheck'],
  [['periodico','periódico','el tiempo','el espectador','semana','revista','diario',
    'noticias','medium','substack'], 'Newspaper'],
  [['kindle','libro','libros','scribd','bookmate','biblioteca'], 'BookOpen'],
  [['universidad','colegio','matricula','matrícula','pension colegio','pensión colegio',
    'curso','platzi','udemy','coursera','domestika','educacion','educación','clases'], 'GraduationCap'],
  [['duolingo','ingles','inglés','idioma','babbel'], 'Languages'],
  [['gimnasio','gym','smartfit','smart fit','bodytech','stark','crossfit','entrenador',
    'pesas','fitness','yoga','pilates'], 'Dumbbell'],
  [['eps','sura','sanitas','compensar','coomeva','famisanar','nueva eps','salud',
    'medicina prepagada','prepagada','colsanitas'], 'HeartPulse'],
  [['odontolog','dentista','medico','médico','consulta','terapia','psicolog'], 'Stethoscope'],
  [['farmacia','medicamento','pastilla','droguer'], 'Pill'],
  [['seguro','poliza','póliza','soat','allianz','bolivar','bolívar','mapfre','axa',
    'seguros','arl'], 'Shield'],
  [['arriendo','alquiler','renta','hipoteca','administracion','administración',
    'cuota administracion','vivienda','apartamento'], 'Home'],
  [['luz','energia','energía','electricidad','epm','codensa','enel','afinia','air-e',
    'celsia','electrica','eléctrica'], 'Lightbulb'],
  [['agua','acueducto','alcantarillado','triple a','eaab','veolia'], 'Droplet'],
  [['gas natural','vanti','surtigas','llanogas','propano'], 'Flame'],
  [['aseo','basura','reciclaje'], 'Recycle'],
  [['mantenimiento','reparacion','reparación','plomer','tecnico','técnico'], 'Wrench'],
  [['rappi','ifood','didi food','domicilio','mercado','supermercado','exito','éxito',
    'd1','ara','jumbo','olimpica','olímpica','carulla','despensa'], 'ShoppingCart'],
  [['restaurante','almuerzo','comida','pizza','domino','mcdonald','kfc','burger'], 'Utensils'],
  [['cafe','café','starbucks','juan valdez','tostao'], 'Coffee'],
  [['amazon','mercadolibre','mercado libre','temu','shein','aliexpress','envio','envío',
    'paquete'], 'Package'],
  [['uber','didi','cabify','indriver','taxi','beat'], 'Car'],
  [['transmilenio','metro','bus','sitp','pasaje','transporte publico',
    'transporte público','tarjeta civica','cívica'], 'Bus'],
  [['gasolina','combustible','terpel','biomax','primax','ecopetrol','peaje'], 'Fuel'],
  [['bici','bicicleta','patineta','scooter'], 'Bike'],
  [['vuelo','avion','avión','tiquete','avianca','latam','wingo','viva','viaje','hotel',
    'airbnb','booking'], 'Plane'],
  [['mascota','perro','gato','veterinaria','purina','agrocampo'], 'PawPrint'],
  [['bebe','bebé','pañal','panal','guarderia','guardería','jardin infantil'], 'Baby'],
  [['peluqueria','peluquería','barberia','barbería','estetica','estética','uñas','unas',
    'spa','manicure'], 'Scissors'],
  [['ropa','lavanderia','lavandería','tintoreria','zapatos'], 'Shirt'],
  [['tarjeta de credito','tarjeta de crédito','cuota manejo','cuota de manejo','banco',
    'bancolombia','davivienda','nequi','daviplata','nu ','lulo'], 'CreditCard'],
  [['prestamo','préstamo','credito','crédito','deuda','financiacion','financiación'], 'Landmark'],
  [['salario','sueldo','nomina','nómina','pago cliente','honorarios','freelance',
    'quincena'], 'Coins'],
  [['impuesto','dian','predial','vehiculo','vehículo','declaracion','declaración','multa'], 'Receipt'],
  [['donacion','donación','iglesia','diezmo','fundacion','fundación','apoyo'], 'Heart'],
  [['membresia','membresía','club','gremio','cuota social','sindicato'], 'Users'],
  [['parqueadero','parqueo','garaje'], 'Building2'],
];

function guessSubscriptionIcon(name, fallback = 'Repeat') {
  const s = normalizeGuessText(name).trim();
  if (!s) return fallback;
  for (const [keywords, icon] of SUBSCRIPTION_ICON_RULES) {
    if (keywords.some(k => s.includes(k))) return icon;
  }
  return fallback;
}

const DEBT_TYPES = [
  { value: 'loan', label: 'Préstamo', icon: 'Landmark' },
  { value: 'credit_card', label: 'Tarjeta de crédito', icon: 'CreditCard' },
  { value: 'personal', label: 'Deuda personal', icon: 'Users' },
  { value: 'mortgage', label: 'Hipoteca', icon: 'Home' },
  { value: 'other', label: 'Otra', icon: 'MoreHorizontal' },
];

const RECEIVABLE_TYPES = [
  { value: 'persona', label: 'Persona', icon: 'Users' },
  { value: 'empresa', label: 'Empresa', icon: 'Landmark' },
  { value: 'other', label: 'Otra', icon: 'MoreHorizontal' },
];

const DEFAULT_DATA = {
  transactions: [],
  categories: DEFAULT_CATEGORIES,
  budgets: {},
  settings: {
    theme: 'dark', palette: 'nocturne', currency: 'COP', pin: null, biometricCredentialId: null, lastBackupDate: null, onboardingCompleted: false, userName: '',
    notifications: { dailyReminder: false, dailyReminderTime: '21:00', budgetAlerts: true, upcomingPayments: true, lastCheckedDate: null }
  },
  accounts: DEFAULT_ACCOUNTS,
  recurringTransactions: [],
  savingsGoals: [],
  debts: [],
  receivables: [],
  tags: []
};

const STORAGE_KEY = 'finanzas_data_v1';

/* Todas las paletas comparten el mismo lenguaje visual (vidrio, insignias
   circulares, resplandor): glow/pillBadges quedan fijos en true para que
   cambiar de paleta o de modo claro/oscuro solo cambie el color, nunca el
   diseño. */
const THEMES = {
  gold: {
    dark: { bg:'#12141A', surface:'#1E212B', surfaceAlt:'#262B38', border:'#3D4354', accent:'#C9A66B', accentSoft:'#E4C989', accentText:'#12141A', income:'#8FBFA0', expense:'#D98C7A', warn:'#D9A94A', text:'#F1EEE6', textMuted:'#9096A3', shadow:'rgba(0,0,0,0.35)', glow:true, pillBadges:true },
    light: { bg:'#F6F3EC', surface:'#FFFFFF', surfaceAlt:'#F1EEE6', border:'#E3DED2', accent:'#A9812F', accentSoft:'#C9A66B', accentText:'#FFFFFF', income:'#4F8C68', expense:'#B85C4A', warn:'#B8862F', text:'#23241F', textMuted:'#6B6C63', shadow:'rgba(30,25,15,0.10)', glow:true, pillBadges:true }
  },
  rose: {
    dark: { bg:'#1A1216', surface:'#271C22', surfaceAlt:'#332530', border:'#4F3944', accent:'#E08FA6', accentSoft:'#F0B8C7', accentText:'#1A1216', income:'#8FBFA0', expense:'#D98C7A', warn:'#D9A94A', text:'#F5EDF0', textMuted:'#A8919B', shadow:'rgba(0,0,0,0.35)', glow:true, pillBadges:true },
    light: { bg:'#FCF2F5', surface:'#FFFFFF', surfaceAlt:'#FBEEF2', border:'#F0DCE3', accent:'#C25F7F', accentSoft:'#E08FA6', accentText:'#FFFFFF', income:'#4F8C68', expense:'#B85C4A', warn:'#B8862F', text:'#2A1F23', textMuted:'#8A6E76', shadow:'rgba(60,20,35,0.10)', glow:true, pillBadges:true }
  },
  steel: {
    dark: { bg:'#11151C', surface:'#1D2530', surfaceAlt:'#262F3E', border:'#3F4E66', accent:'#6FA8D9', accentSoft:'#9CC6EA', accentText:'#11151C', income:'#7FC49A', expense:'#D9836F', warn:'#D9A94A', text:'#EAF0F6', textMuted:'#8D9AAC', shadow:'rgba(0,0,0,0.35)', glow:true, pillBadges:true },
    light: { bg:'#F1F4F8', surface:'#FFFFFF', surfaceAlt:'#E9EEF4', border:'#DCE3EC', accent:'#3E6FA1', accentSoft:'#6FA8D9', accentText:'#FFFFFF', income:'#3F7D5C', expense:'#B0553F', warn:'#B8862F', text:'#1D2530', textMuted:'#647184', shadow:'rgba(20,35,60,0.10)', glow:true, pillBadges:true }
  },
  emerald: {
    dark: { bg:'#0F1712', surface:'#1A251E', surfaceAlt:'#213024', border:'#39584A', accent:'#5FB88A', accentSoft:'#8FD4AE', accentText:'#0F1712', income:'#5FB88A', expense:'#D9836F', warn:'#D9A94A', text:'#EAF3ED', textMuted:'#8CA396', shadow:'rgba(0,0,0,0.35)', glow:true, pillBadges:true },
    light: { bg:'#F0F6F2', surface:'#FFFFFF', surfaceAlt:'#E6F0EA', border:'#D8E6DC', accent:'#2E8558', accentSoft:'#5FB88A', accentText:'#FFFFFF', income:'#2E8558', expense:'#B0553F', warn:'#B8862F', text:'#16241C', textMuted:'#5E7568', shadow:'rgba(15,40,25,0.10)', glow:true, pillBadges:true }
  },
  purple: {
    dark: { bg:'#15121C', surface:'#1E1927', surfaceAlt:'#272032', border:'#332B40', accent:'#A98FD9', accentSoft:'#C7B4EA', accentText:'#15121C', income:'#8FBFA0', expense:'#D98C7A', warn:'#D9A94A', text:'#F0EDF5', textMuted:'#9C90AC', shadow:'rgba(0,0,0,0.35)', glow:true, pillBadges:true },
    light: { bg:'#F5F2FA', surface:'#FFFFFF', surfaceAlt:'#EEE8F6', border:'#E1D9EE', accent:'#7A5FB8', accentSoft:'#A98FD9', accentText:'#FFFFFF', income:'#4F8C68', expense:'#B85C4A', warn:'#B8862F', text:'#211C2A', textMuted:'#75697F', shadow:'rgba(35,20,55,0.10)', glow:true, pillBadges:true }
  },
  nocturne: {
    dark: { bg:'#0B0B14', surface:'#14141F', surfaceAlt:'#1B1B29', border:'#2A2A3C', accent:'#C9A44C', accentSoft:'#E6C878', accentText:'#191408', income:'#87C1A2', expense:'#D68F7C', warn:'#D9A94A', text:'#F1EEE6', textMuted:'#8C8AA0', shadow:'rgba(0,0,0,0.45)', glow:true, pillBadges:true },
    light: { bg:'#F7F5EF', surface:'#FFFFFF', surfaceAlt:'#F0ECE0', border:'#E5E1D6', accent:'#9C7A2E', accentSoft:'#C9A44C', accentText:'#FFFFFF', income:'#3F7D5C', expense:'#B0553F', warn:'#B8862F', text:'#1A1826', textMuted:'#6E6C80', shadow:'rgba(25,20,10,0.12)', glow:true, pillBadges:true }
  }
};

const PALETTES = [
  { id: 'gold', label: 'Dorado', swatch: '#C9A66B' },
  { id: 'rose', label: 'Rosa', swatch: '#E08FA6' },
  { id: 'steel', label: 'Azul acero', swatch: '#6FA8D9' },
  { id: 'emerald', label: 'Esmeralda', swatch: '#5FB88A' },
  { id: 'purple', label: 'Púrpura', swatch: '#A98FD9' },
  { id: 'nocturne', label: 'Nocturne', swatch: '#C9A44C' },
];

const MONTHS_ES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const MONTHS_SHORT = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const CURRENCIES = ['COP','USD','EUR','MXN','ARS','CLP','PEN'];

/* ---------------------------------- HELPERS ---------------------------------- */
const pad = n => (n < 10 ? '0' + n : '' + n);
const todayISO = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; };
const monthKeyOf = dateStr => dateStr.slice(0,7);
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,7);

/* ---------------------------------- BIOMETRÍA (WebAuthn) ---------------------------------- */
function randomBytes(len) { const a = new Uint8Array(len); crypto.getRandomValues(a); return a; }
function bufToBase64url(buf) {
  const bytes = new Uint8Array(buf);
  let str = '';
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
  return btoa(str).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
function base64urlToBuf(b64url) {
  const b64 = b64url.replace(/-/g,'+').replace(/_/g,'/') + '='.repeat((4 - b64url.length % 4) % 4);
  const str = atob(b64);
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) bytes[i] = str.charCodeAt(i);
  return bytes.buffer;
}
async function isBiometricAvailable() {
  try {
    if (!window.isSecureContext || !window.PublicKeyCredential || !navigator.credentials) return false;
    return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  } catch { return false; }
}
async function registerBiometricCredential(userName) {
  const cred = await navigator.credentials.create({
    publicKey: {
      challenge: randomBytes(32),
      rp: { id: location.hostname, name: 'Mis Finanzas' },
      user: { id: randomBytes(16), name: userName || 'usuario', displayName: userName || 'Usuario' },
      pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }],
      authenticatorSelection: { authenticatorAttachment: 'platform', userVerification: 'required', residentKey: 'preferred' },
      timeout: 60000,
      attestation: 'none'
    }
  });
  if (!cred) throw new Error('No se pudo crear la credencial');
  return bufToBase64url(cred.rawId);
}
async function verifyBiometricCredential(credentialIdB64) {
  const assertion = await navigator.credentials.get({
    publicKey: {
      challenge: randomBytes(32),
      allowCredentials: [{ id: base64urlToBuf(credentialIdB64), type: 'public-key' }],
      userVerification: 'required',
      timeout: 60000
    }
  });
  return !!assertion;
}

function truncateLabel(str, max) {
  const s = String(str || '');
  return s.length > max ? s.slice(0, max - 1) + '…' : s;
}
function formatCompactNumber(value) {
  const v = Number(value) || 0;
  const abs = Math.abs(v);
  if (abs >= 1e6) return (v/1e6).toFixed(abs % 1e6 === 0 ? 0 : 1) + 'M';
  if (abs >= 1e3) return (v/1e3).toFixed(0) + 'k';
  return String(v);
}
function groupDigits(str) {
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
function formatAmountDisplay(raw) {
  if (!raw) return '';
  return String(raw).replace(/\d+/g, (m) => groupDigits(m));
}
function formatMoney(value, currency) {
  const v = Number(value) || 0;
  try {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: currency || 'COP', maximumFractionDigits: currency === 'COP' || !currency ? 0 : 2 }).format(v);
  } catch (e) {
    return v.toFixed(2);
  }
}
function evaluateExpression(str) {
  if (!str) return null;
  const sanitized = String(str).replace(/[^0-9+\-*/().]/g, '');
  if (!sanitized || !/[0-9]/.test(sanitized)) return null;
  try {
    const result = Function('"use strict"; return (' + sanitized + ')')();
    return Number.isFinite(result) ? result : null;
  } catch (e) {
    return null;
  }
}

function formatDayHeader(dateStr) {
  const dd = new Date(dateStr + 'T00:00:00');
  const today = new Date(); today.setHours(0,0,0,0);
  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
  if (dd.getTime() === today.getTime()) return 'Hoy';
  if (dd.getTime() === yesterday.getTime()) return 'Ayer';
  return dd.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });
}
function monthLabel(year, month) { return `${MONTHS_ES[month][0].toUpperCase()}${MONTHS_ES[month].slice(1)} ${year}`; }

function getAccountBalance(accountId, transactions, accounts) {
  const account = accounts.find(a => a.id === accountId);
  if (!account) return 0;
  let balance = Number(account.initialBalance) || 0;
  transactions.forEach(tx => {
    if (tx.accountId === accountId) {
      if (tx.type === 'income') balance += Number(tx.amount);
      if (tx.type === 'expense') balance -= Number(tx.amount);
      if (tx.type === 'transfer') balance -= Number(tx.amount);
    }
    if (tx.type === 'transfer' && tx.toAccountId === accountId) {
      balance += Number(tx.amount);
    }
  });
  return balance;
}

function isoDate(d) { return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; }

const PERIOD_OPTIONS = [
  { value: 'week', label: 'Semana' },
  { value: 'month', label: 'Mes' },
  { value: 'quarter', label: 'Trimestre' },
  { value: 'year', label: 'Año' },
  { value: 'custom', label: 'Personalizado' },
];

function getPeriodRange(periodType, offset, customFrom, customTo) {
  const now = new Date();
  if (periodType === 'custom') {
    const from = customFrom || todayISO();
    const to = customTo || todayISO();
    return { from, to, label: `${from} → ${to}` };
  }
  if (periodType === 'week') {
    const ref = new Date(now); ref.setDate(ref.getDate() + offset*7);
    const day = (ref.getDay()+6)%7;
    const monday = new Date(ref); monday.setDate(ref.getDate()-day);
    const sunday = new Date(monday); sunday.setDate(monday.getDate()+6);
    return { from: isoDate(monday), to: isoDate(sunday), label: `${monday.getDate()} ${MONTHS_SHORT[monday.getMonth()]} – ${sunday.getDate()} ${MONTHS_SHORT[sunday.getMonth()]}` };
  }
  if (periodType === 'quarter') {
    const totalQ = now.getFullYear()*4 + Math.floor(now.getMonth()/3) + offset;
    const y = Math.floor(totalQ/4), q = ((totalQ%4)+4)%4;
    const startMonth = q*3;
    const from = new Date(y, startMonth, 1);
    const to = new Date(y, startMonth+3, 0);
    return { from: isoDate(from), to: isoDate(to), label: `T${q+1} ${y}` };
  }
  if (periodType === 'year') {
    const y = now.getFullYear() + offset;
    return { from: `${y}-01-01`, to: `${y}-12-31`, label: `${y}` };
  }
  const d = new Date(now.getFullYear(), now.getMonth()+offset, 1);
  const from = isoDate(d);
  const to = isoDate(new Date(d.getFullYear(), d.getMonth()+1, 0));
  return { from, to, label: monthLabel(d.getFullYear(), d.getMonth()) };
}

function getPrevPeriodRange(periodType, offset, customFrom, customTo) {
  if (periodType === 'custom') {
    const from = new Date((customFrom || todayISO()) + 'T00:00:00');
    const to = new Date((customTo || todayISO()) + 'T00:00:00');
    const lengthDays = Math.round((to-from)/86400000) + 1;
    const prevTo = new Date(from); prevTo.setDate(prevTo.getDate()-1);
    const prevFrom = new Date(prevTo); prevFrom.setDate(prevFrom.getDate()-lengthDays+1);
    return { from: isoDate(prevFrom), to: isoDate(prevTo) };
  }
  return getPeriodRange(periodType, offset-1, customFrom, customTo);
}

function getNetWorthAt(dateStr, accounts, transactions) {
  return accounts.filter(a=>a.includeInTotal!==false && !a.archived).reduce((sum,acc)=>{
    let balance = Number(acc.initialBalance)||0;
    transactions.forEach(tx=>{
      if (tx.accountId === acc.id && tx.date <= dateStr) {
        if (tx.type==='income') balance += Number(tx.amount);
        if (tx.type==='expense') balance -= Number(tx.amount);
        if (tx.type==='transfer') balance -= Number(tx.amount);
      }
      if (tx.type==='transfer' && tx.toAccountId===acc.id && tx.date <= dateStr) balance += Number(tx.amount);
    });
    return sum + balance;
  }, 0);
}

function exportFullBackup(data) {
  const backup = { version: 2, exportedAt: new Date().toISOString(), app: 'MisFinanzas', data };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `mis-finanzas-backup-${todayISO()}.json`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function readFullBackupFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const backup = JSON.parse(e.target.result);
        if (backup.app !== 'MisFinanzas') throw new Error('Este archivo no es un respaldo de Mis Finanzas.');
        if (!backup.data || !backup.data.transactions) throw new Error('El archivo no contiene datos válidos.');
        resolve(backup.data);
      } catch (err) { reject(err); }
    };
    reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
    reader.readAsText(file);
  });
}

function parseCSVFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = String(e.target.result).replace(/^﻿/, '');
        const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
        if (!lines.length) throw new Error('El archivo está vacío.');
        const headers = lines[0].split(',').map(h => h.trim());
        const rows = lines.slice(1).map(line => line.split(',').map(c => c.trim()));
        resolve({ headers, rows });
      } catch (err) { reject(err); }
    };
    reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
    reader.readAsText(file);
  });
}

function guessDateISO(raw) {
  if (!raw) return null;
  const s = raw.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const dmY = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (dmY) return `${dmY[3]}-${pad(Number(dmY[2]))}-${pad(Number(dmY[1]))}`;
  const d = new Date(s);
  if (!isNaN(d.getTime())) return isoDate(d);
  return null;
}

function migrateV1toV2(oldData) {
  const accounts = [
    { id: 'efectivo', name: 'Efectivo', type: 'cash', icon: 'Banknote', color: '#8FBFA0', initialBalance: 0, currency: oldData.settings.currency, includeInTotal: true, archived: false, order: 0 },
    { id: 'banco', name: 'Cuenta bancaria', type: 'bank', icon: 'Landmark', color: '#8FA7D9', initialBalance: 0, currency: oldData.settings.currency, includeInTotal: true, archived: false, order: 1 },
    { id: 'tarjeta', name: 'Tarjeta de crédito', type: 'credit_card', icon: 'CreditCard', color: '#D98C7A', initialBalance: 0, currency: oldData.settings.currency, includeInTotal: true, archived: false, order: 2 },
  ];
  const methodToAccount = { 'Efectivo': 'efectivo', 'Tarjeta': 'tarjeta', 'Transferencia': 'banco' };
  const transactions = (oldData.transactions || []).map(tx => {
    const { method, ...rest } = tx;
    return { ...rest, accountId: tx.accountId || methodToAccount[tx.method] || 'efectivo' };
  });
  return { ...oldData, transactions, accounts };
}

function ensureDefaultAccounts(accounts, currency) {
  const list = accounts || [];
  const maxOrder = list.reduce((m,a)=>Math.max(m, a.order||0), -1);
  const missing = DEFAULT_ACCOUNTS.filter(def => !list.some(a=>a.id===def.id));
  if (!missing.length) return list;
  return [...list, ...missing.map((def,i)=>({ ...def, currency: currency || def.currency, order: maxOrder+1+i }))];
}

function daysInMonth(year, month) { return new Date(year, month + 1, 0).getDate(); }

function calculateNextDate(dateStr, frequency, dayOfMonth) {
  const d = new Date(dateStr + 'T00:00:00');
  switch (frequency) {
    case 'daily': d.setDate(d.getDate() + 1); break;
    case 'weekly': d.setDate(d.getDate() + 7); break;
    case 'biweekly': d.setDate(d.getDate() + 14); break;
    case 'monthly': d.setMonth(d.getMonth() + 1); break;
    case 'bimonthly': d.setMonth(d.getMonth() + 2); break;
    case 'quarterly': d.setMonth(d.getMonth() + 3); break;
    case 'yearly': d.setFullYear(d.getFullYear() + 1); break;
    default: d.setMonth(d.getMonth() + 1);
  }
  if (dayOfMonth && ['monthly', 'bimonthly', 'quarterly'].includes(frequency)) {
    d.setDate(Math.min(dayOfMonth, daysInMonth(d.getFullYear(), d.getMonth())));
  }
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const today = new Date(); today.setHours(0,0,0,0);
  const d = new Date(dateStr + 'T00:00:00');
  return Math.ceil((d - today) / 86400000);
}

/* ---------------------- RECURRENTES: pendientes por confirmar ---------------------- */
// Los pagos recurrentes ya NO se generan solos. `nextDueDate` es un cursor que
// solo avanza cuando el usuario confirma, ajusta u omite una ocurrencia — así que
// "pendiente" siempre se DERIVA de los datos, nunca se guarda aparte. Esto hace
// imposibles (en vez de bugs a cazar) los duplicados entre recargas, las filas
// huérfanas al borrar/editar un recurrente, o las filas obsoletas al restaurar
// un backup.
const MAX_OCCURRENCE_SCAN = 400; // guarda de loop (recurrente diario, ~13 meses atrás)

// Índice de "esta ocurrencia ya tiene un pago registrado", construido una vez por
// llamada. El fallback a tx.date cubre transacciones auto-generadas antes de este
// cambio, que nunca tuvieron recurringDueDate.
function buildRecurringTxIndex(transactions) {
  const s = new Set();
  (transactions || []).forEach(tx => {
    if (tx.recurringId) s.add(`${tx.recurringId}|${tx.recurringDueDate || tx.date}`);
  });
  return s;
}
function isOccurrenceRecorded(recId, dueDate, txIndex) {
  return txIndex.has(`${recId}|${dueDate}`);
}

function pendingOccurrenceDates(rec, today) {
  if (!rec || !rec.active) return [];
  let d = rec.nextDueDate || rec.startDate;
  if (!d) return [];
  const out = [];
  let guard = 0;
  while (d <= today && guard++ < MAX_OCCURRENCE_SCAN) {
    if (rec.endDate && d > rec.endDate) break;
    out.push(d);
    d = calculateNextDate(d, rec.frequency, rec.dayOfMonth);
  }
  return out;
}

function getPendingPayments(data) {
  const today = todayISO();
  const txIndex = buildRecurringTxIndex(data.transactions);
  const out = [];
  (data.recurringTransactions || []).forEach(rec => {
    const skipped = rec.skippedDates || [];
    pendingOccurrenceDates(rec, today).forEach(dueDate => {
      if (skipped.includes(dueDate)) return;
      if (isOccurrenceRecorded(rec.id, dueDate, txIndex)) return;
      out.push({ key: `${rec.id}|${dueDate}`, rec, dueDate, days: daysUntil(dueDate) });
    });
  });
  return out.sort((a,b) => a.dueDate.localeCompare(b.dueDate));
}

// Próxima fecha de vencimiento en el futuro (o null si ya terminó). Con el cursor
// "estacionado" en la ocurrencia pendiente más vieja, rec.nextDueDate puede estar
// en el pasado — cualquier UI que pregunte "¿cuándo vence?" debe usar esto.
function nextFutureDueDate(rec) {
  const today = todayISO();
  let d = rec.nextDueDate || rec.startDate;
  let guard = 0;
  while (d && d <= today && guard++ < MAX_OCCURRENCE_SCAN) {
    d = calculateNextDate(d, rec.frequency, rec.dayOfMonth);
  }
  if (rec.endDate && d > rec.endDate) return null;
  return d;
}

function dueLabel(dateStr) {
  const n = daysUntil(dateStr);
  if (n === null) return '';
  if (n === 0) return 'vence hoy';
  if (n === 1) return 'vence mañana';
  if (n === -1) return 'venció ayer';
  if (n > 30) return `vence el ${formatDayHeader(dateStr)}`;
  if (n > 1) return `en ${n} días`;
  return `venció hace ${Math.abs(n)} días`;
}

// Normaliza y reconcilia recurrentes — reemplaza al antiguo
// processRecurringTransactions. Ya NO crea transacciones: solo rellena defaults
// para registros viejos y avanza el cursor sobre ocurrencias ya cubiertas por una
// transacción auto-generada antes de este cambio (o ya omitidas), para que a un
// usuario existente no se le vuelva a proponer su propia historia. Es idempotente
// — corre en cada carga sin efectos acumulativos.
function reconcileRecurring(data) {
  const today = todayISO();
  const txIndex = buildRecurringTxIndex(data.transactions);
  const recurringTransactions = (data.recurringTransactions || []).map(rec => {
    const r = { ...rec };
    if (!r.nextDueDate) r.nextDueDate = r.startDate || today;
    if (!r.frequency) r.frequency = 'monthly';
    if (r.active === undefined) r.active = true;
    if (!Array.isArray(r.skippedDates)) r.skippedDates = [];
    if (r.name === undefined || r.name === null) r.name = (r.note || '').trim();
    if (!r.icon) { r.icon = guessSubscriptionIcon(r.name); r.iconManual = false; }
    if (r.iconManual === undefined) r.iconManual = false;

    if (r.active && r.endDate && r.endDate < today) r.active = false;

    let guard = 0;
    while (r.nextDueDate <= today && guard++ < MAX_OCCURRENCE_SCAN &&
           (r.skippedDates.includes(r.nextDueDate) ||
            isOccurrenceRecorded(r.id, r.nextDueDate, txIndex))) {
      r.nextDueDate = calculateNextDate(r.nextDueDate, r.frequency, r.dayOfMonth);
    }
    return r;
  });

  return { ...data, recurringTransactions }; // no toca data.transactions
}

function getGoalStats(goal) {
  const target = Number(goal.targetAmount) || 0;
  const current = Number(goal.currentAmount) || 0;
  const percent = target > 0 ? Math.min(100, (current / target) * 100) : 0;
  const remaining = Math.max(0, target - current);
  const days = goal.deadline ? daysUntil(goal.deadline) : null;
  const perDay = (days && days > 0) ? remaining / days : null;
  const completed = target > 0 && current >= target;
  return { percent, remaining, days, perDay, completed };
}

function getDebtStats(debt) {
  const original = Number(debt.originalAmount) || 0;
  const balance = Number(debt.currentBalance) || 0;
  const percentPaid = original > 0 ? Math.min(100, ((original - balance) / original) * 100) : 0;
  const minPayment = Number(debt.minimumPayment) || 0;
  const monthsRemaining = minPayment > 0 ? Math.ceil(balance / minPayment) : null;
  const totalInterest = (monthsRemaining && minPayment > 0) ? Math.max(0, (monthsRemaining * minPayment) - balance) : null;
  return { percentPaid, monthsRemaining, totalInterest };
}

function getReceivableStats(receivable) {
  const original = Number(receivable.originalAmount) || 0;
  const balance = Number(receivable.currentBalance) || 0;
  const percentCollected = original > 0 ? Math.min(100, ((original - balance) / original) * 100) : 0;
  return { percentCollected };
}

function checkNotifications(data, setData) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  const notif = data.settings.notifications;
  if (!notif) return;
  const today = todayISO();
  if (notif.lastCheckedDate === today) return;

  const { transactions, categories, budgets, recurringTransactions } = data;
  const curMonthKey = monthKeyOf(today);

  if (notif.dailyReminder) {
    const now = new Date();
    const [hh, mm] = (notif.dailyReminderTime || '21:00').split(':').map(Number);
    const reminderPassed = now.getHours() > hh || (now.getHours() === hh && now.getMinutes() >= mm);
    const loggedToday = transactions.some(tx => tx.date === today);
    if (reminderPassed && !loggedToday) {
      new Notification('Mis Finanzas', { body: '¿Ya registraste tus gastos de hoy?' });
    }
  }

  if (notif.budgetAlerts) {
    categories.filter(c=>c.type==='expense').forEach(cat => {
      const limit = Number(budgets[cat.id] || 0);
      if (limit <= 0) return;
      const spent = transactions.filter(tx=>tx.type==='expense' && tx.category===cat.id && monthKeyOf(tx.date)===curMonthKey).reduce((s,tx)=>s+Number(tx.amount),0);
      const pct = (spent / limit) * 100;
      if (pct >= 80) {
        new Notification('Presupuesto de ' + cat.name, { body: `Llevas ${pct.toFixed(0)}% de tu límite este mes.` });
      }
    });
  }

  if (notif.upcomingPayments) {
    const tomorrow = isoDate(new Date(Date.now() + 86400000));
    (recurringTransactions || []).filter(r=>r.active && nextFutureDueDate(r) === tomorrow).forEach(rec => {
      new Notification('Pago próximo', { body: `Mañana vence: ${rec.name || rec.note || 'movimiento recurrente'} (${formatMoney(rec.amount, data.settings.currency)})` });
    });
    const pend = getPendingPayments(data).filter(p => p.days <= 0);
    if (pend.length) {
      new Notification('Pagos por confirmar', {
        body: pend.length === 1
          ? `¿Ya pagaste ${pend[0].rec.name || pend[0].rec.note || 'tu recurrente'}?`
          : `Tienes ${pend.length} pagos recurrentes sin confirmar.`
      });
    }
  }

  setData(d => ({ ...d, settings: { ...d.settings, notifications: { ...d.settings.notifications, lastCheckedDate: today } } }));
}

function getStreak(transactions) {
  const days = new Set(transactions.map(tx=>tx.date));
  const cursor = new Date(); cursor.setHours(0,0,0,0);
  if (!days.has(isoDate(cursor))) cursor.setDate(cursor.getDate()-1);
  let streak = 0;
  while (days.has(isoDate(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate()-1);
  }
  return streak;
}

/* ---------------------------------- PIEZAS UI ---------------------------------- */
function MoneyInput({ value, onChange, placeholder, autoFocus, style }) {
  const display = (value === '' || value === null || value === undefined) ? '' : groupDigits(String(value).replace(/[^\d]/g,''));
  return (
    <input type="text" inputMode="numeric" autoFocus={autoFocus} value={display} placeholder={placeholder}
      onChange={e=>onChange(e.target.value.replace(/[^\d]/g,'').replace(/^0+(?=\d)/,''))}
      style={style} />
  );
}
function ProgressBar({ percent, color, track }) {
  const p = Math.max(0, Math.min(100, percent));
  return (
    <div style={{ height: 6, borderRadius: 4, background: track, overflow: 'hidden', width: '100%' }}>
      <div style={{ height: '100%', width: `${p}%`, background: color, borderRadius: 4, transition: 'width .4s ease' }} />
    </div>
  );
}

function SegmentedControl({ options, value, onChange, t }) {
  const compact = options.length > 4;
  return (
    <div style={{ display: 'flex', background: t.surfaceAlt, borderRadius: 10, padding: 3, border: `1px solid ${t.border}` }}>
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className="fz-seg-btn"
          style={{
            flex: 1, padding: compact ? '9px 4px' : '9px 10px', borderRadius: 8, border: 'none', cursor: 'pointer',
            background: value === opt.value ? t.accent : 'transparent',
            color: value === opt.value ? t.accentText : t.textMuted,
            fontWeight: 600, fontSize: compact ? 12 : 13.5, fontFamily: 'var(--font-body)', transition: 'all .2s ease'
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function CategoryBadge({ cat, size = 34, t }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: t.pillBadges ? size / 2 : size * 0.32, background: cat ? cat.color + '26' : t.surfaceAlt,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
    }}>
      <Icon name={cat ? cat.icon : 'MoreHorizontal'} size={size * 0.5} color={cat ? cat.color : t.textMuted} />
    </div>
  );
}

/* ---------------------------------- BARRA SUPERIOR ---------------------------------- */
function TopBar({ title, subtitle, t, onSettings, centered }) {
  return (
    <div style={{ padding: 'calc(22px + env(safe-area-inset-top)) 20px 14px', display: 'flex', alignItems: 'flex-start', justifyContent: centered ? 'center' : 'space-between' }}>
      <div style={{ textAlign: centered ? 'center' : 'left' }}>
        <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 22, color: t.text, fontWeight: 600 }}>{title}</div>
        {subtitle && <div style={{ fontSize: 13, color: t.textMuted, marginTop: 3 }}>{subtitle}</div>}
      </div>
      {onSettings && (
        <button onClick={onSettings} className="fz-icon-btn" style={{ background: t.surfaceAlt, border: `1px solid ${t.border}` }}>
          <Icon name="Settings" size={17} color={t.textMuted} />
        </button>
      )}
    </div>
  );
}

/* ---------------------------------- INICIO ---------------------------------- */
function AccountMiniCard({ account, balance, t, settings }) {
  return (
    <div style={{ flexShrink: 0, minWidth: 132, background: t.glow ? t.surface + 'CC' : t.surface, border: `1px solid ${t.border}`, borderRadius: t.glow ? 18 : 14, padding: '12px 14px', backdropFilter: t.glow ? 'blur(10px)' : undefined, WebkitBackdropFilter: t.glow ? 'blur(10px)' : undefined }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <CategoryBadge cat={{ icon: account.icon, color: account.color }} t={t} size={26} />
        <div style={{ fontSize: 11.5, color: t.textMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{account.name}</div>
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: balance < 0 ? t.expense : t.text, whiteSpace: 'nowrap' }}>{formatMoney(balance, account.currency || settings.currency)}</div>
    </div>
  );
}

const BALANCE_VIEWS = [
  { value: 'total', label: 'Total' },
  { value: 'week', label: 'Semana' },
  { value: 'month', label: 'Mes' },
  { value: 'year', label: 'Año' },
];

function InicioScreen({ data, setData, t, goHistorial, openSheet, onQuickAdd, onNavigate, balanceHidden, setBalanceHidden, onOpenModal, onConfirmRecurring, onAdjustRecurring, onSkipRecurring, onUnsubscribeRecurring }) {
  const { transactions, categories, settings, accounts, recurringTransactions, debts, savingsGoals, budgets, receivables } = data;
  const [snoozed, setSnoozed] = useState(() => new Set());
  const now = new Date();
  const curMonthKey = `${now.getFullYear()}-${pad(now.getMonth()+1)}`;
  const balanceView = settings.homeBalanceView || 'total';
  const setBalanceView = (v) => setData(d => ({ ...d, settings: { ...d.settings, homeBalanceView: v } }));

  const freqCount = {};
  transactions.filter(tx=>tx.type==='expense').forEach(tx=>{ freqCount[tx.category] = (freqCount[tx.category]||0) + 1; });
  const frequentCategories = Object.entries(freqCount).sort((a,b)=>b[1]-a[1]).slice(0,6)
    .map(([catId])=>categories.find(c=>c.id===catId)).filter(Boolean);

  const monthTx = transactions.filter(tx => monthKeyOf(tx.date) === curMonthKey);
  const visibleAccounts = accounts.filter(a=>!a.archived);
  const balance = visibleAccounts.filter(a=>a.includeInTotal).reduce((s,a)=> s + getAccountBalance(a.id, transactions, accounts), 0);

  const homeRange = balanceView === 'total' ? null : getPeriodRange(balanceView, 0);
  const homeTx = homeRange ? transactions.filter(tx => tx.date >= homeRange.from && tx.date <= homeRange.to) : monthTx;
  const income = homeTx.filter(t2 => t2.type === 'income').reduce((s,t2)=>s+Number(t2.amount),0);
  const expense = homeTx.filter(t2 => t2.type === 'expense').reduce((s,t2)=>s+Number(t2.amount),0);
  const savingsRate = income > 0 ? ((income - expense) / income) * 100 : 0;
  const displayBalance = balanceView === 'total' ? balance : (income - expense);
  const balanceLabel = balanceView==='total' ? 'Balance total' : balanceView==='week' ? 'Balance de la semana' : balanceView==='month' ? 'Balance del mes' : 'Balance del año';
  const totalDebt = (debts || []).reduce((s,d)=>s+Number(d.currentBalance||0),0);
  const totalReceivable = (receivables || []).reduce((s,r)=>s+Number(r.currentBalance||0),0);
  const activeGoals = (savingsGoals || []).filter(g=>getGoalStats(g).percent < 100).length;
  const streak = getStreak(transactions);

  const budgetAlerts = categories.filter(c=>c.type==='expense').map(cat => {
    const limit = Number((budgets||{})[cat.id] || 0);
    if (limit <= 0) return null;
    const spent = monthTx.filter(tx=>tx.type==='expense' && tx.category===cat.id).reduce((s,tx)=>s+Number(tx.amount),0);
    const pct = (spent/limit)*100;
    if (pct < 80) return null;
    return { cat, pct, spent, limit };
  }).filter(Boolean).sort((a,b)=>b.pct-a.pct);

  const pending = useMemo(() => getPendingPayments(data), [data.recurringTransactions, data.transactions]);
  const upcoming = (recurringTransactions || [])
    .filter(r => r.active)
    .map(r => ({ rec: r, due: nextFutureDueDate(r) }))
    .filter(x => !!x.due)
    .sort((a,b)=> (a.due||'9999-12-31').localeCompare(b.due||'9999-12-31'))
    .slice(0, 5);

  const byCategory = {};
  monthTx.filter(t2=>t2.type==='expense').forEach(t2=>{
    byCategory[t2.category] = (byCategory[t2.category]||0) + Number(t2.amount);
  });
  const pieData = Object.entries(byCategory).map(([catId, value]) => {
    const cat = categories.find(c=>c.id===catId);
    return { name: cat ? cat.name : 'Otros', value, color: cat ? cat.color : t.textMuted };
  }).sort((a,b)=>b.value-a.value);

  const trend = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${pad(d.getMonth()+1)}`;
    const txs = transactions.filter(tx => monthKeyOf(tx.date) === key);
    trend.push({
      label: MONTHS_SHORT[d.getMonth()],
      Ingresos: txs.filter(t2=>t2.type==='income').reduce((s,t2)=>s+Number(t2.amount),0),
      Gastos: txs.filter(t2=>t2.type==='expense').reduce((s,t2)=>s+Number(t2.amount),0),
    });
  }

  const recent = [...transactions].sort((a,b)=> b.date.localeCompare(a.date) || b.createdAt-a.createdAt).slice(0,5);

  const periodWord = balanceView==='week' ? 'esta semana' : balanceView==='year' ? 'este año' : 'este mes';
  let mood = `Vas por buen camino ${periodWord}.`;
  if (income === 0 && expense === 0) mood = 'Registra tu primer movimiento para empezar.';
  else if (savingsRate >= 20) mood = `Vas muy bien ${periodWord} — sigue así.`;
  else if (savingsRate < 0) mood = `Gastaste más de lo que ingresó ${periodWord}.`;

  return (
    <div>
      <TopBar title={settings.userName ? `Finanzas de ${settings.userName}` : 'Mis Finanzas'} subtitle={now.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })} t={t} centered />
      <div style={{ padding: '0 20px' }}>

        {streak > 0 && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: t.warn+'1a', border: `1px solid ${t.warn}44`, borderRadius: 20, padding: '5px 12px', marginBottom: 12 }}>
            <span style={{ fontSize: 13 }}>🔥</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: t.warn }}>Racha: {streak} día{streak===1?'':'s'} registrando tus finanzas</span>
          </div>
        )}

        {budgetAlerts.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            {budgetAlerts.map(a=>{
              const over = a.pct >= 100;
              const color = over ? t.expense : t.warn;
              return (
                <div key={a.cat.id} onClick={()=>onNavigate('presupuestos','budgets')} style={{ display: 'flex', alignItems: 'center', gap: 10, background: color+'14', border: `1px solid ${color}44`, borderRadius: 12, padding: '10px 12px', marginBottom: 6, cursor: 'pointer' }}>
                  <Icon name="AlertTriangle" size={16} color={color} />
                  <div style={{ flex: 1, fontSize: 12, color: t.text }}>
                    <b>{a.cat.name}</b>: {over ? 'superaste' : 'llevas'} el <b style={{ color }}>{a.pct.toFixed(0)}%</b> de tu presupuesto ({formatMoney(a.spent, settings.currency)} de {formatMoney(a.limit, settings.currency)})
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {frequentCategories.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Registro rápido</div>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
              {frequentCategories.map(cat=>(
                <button key={cat.id} onClick={()=>onQuickAdd(cat)}
                  style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px 7px 7px', borderRadius: 20, cursor: 'pointer', border: `1px solid ${t.border}`, background: t.surface }}>
                  <div style={{ width: 22, height: 22, borderRadius: 7, background: cat.color+'33', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Icon name={cat.icon} size={12} color={cat.color} />
                  </div>
                  <span style={{ fontSize: 12, color: t.text }}>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Passbook balance card */}
        <div style={{
          background: t.glow ? t.surface + 'CC' : t.surface, border: `1px solid ${t.border}`, borderRadius: t.glow ? 22 : 16, padding: '22px 20px',
          position: 'relative', boxShadow: t.glow ? `0 10px 30px ${t.shadow}, inset 0 1px 0 rgba(255,255,255,0.06)` : `0 10px 30px ${t.shadow}`,
          backdropFilter: t.glow ? 'blur(10px)' : undefined, WebkitBackdropFilter: t.glow ? 'blur(10px)' : undefined
        }}>
          <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)`, marginBottom: 16, opacity: 0.6 }} />

          <div style={{ display: 'flex', gap: 6, marginBottom: 12, justifyContent: t.glow ? 'center' : undefined }}>
            {BALANCE_VIEWS.map(v=>(
              <button key={v.value} onClick={()=>setBalanceView(v.value)}
                style={{ padding: '4px 10px', borderRadius: 12, cursor: 'pointer', fontSize: 11, fontWeight: 600,
                  border: `1px solid ${balanceView===v.value ? t.accent : t.border}`, background: balanceView===v.value ? t.accent+'22' : 'transparent',
                  color: balanceView===v.value ? t.accent : t.textMuted, flex: t.glow ? '0 0 auto' : undefined }}>
                {v.label}
              </button>
            ))}
          </div>

          <div style={{ fontSize: 11, letterSpacing: '0.14em', color: t.textMuted, textTransform: 'uppercase', fontWeight: 600, textAlign: t.glow ? 'center' : undefined }}>{balanceLabel}</div>
          <div onClick={()=>setBalanceHidden(h=>!h)} title={balanceHidden ? 'Mostrar montos' : 'Ocultar montos'}
            style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none', justifyContent: t.glow ? 'center' : 'flex-start' }}>
            <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 36, color: t.text, fontWeight: 600, marginTop: 6, fontVariantNumeric: 'tabular-nums', textShadow: t.glow ? `0 0 2px ${t.accent}CC, 0 0 10px ${t.accent}99, 0 0 26px ${t.accent}70` : undefined }}>
              {balanceHidden ? '••••••' : formatMoney(displayBalance, settings.currency)}
            </div>
            <Icon name={balanceHidden ? 'EyeOff' : 'Eye'} size={16} color={t.textMuted} style={{ marginTop: 6 }} />
          </div>
          <div style={{ fontSize: 12.5, color: t.textMuted, marginTop: 6, textAlign: t.glow ? 'center' : undefined }}>{mood}</div>

          <div style={{ display: 'flex', alignItems: 'center', marginTop: 18, gap: 14 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: t.textMuted, fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <Icon name="ArrowUpRight" size={13} color={t.income} /> Ingresos
              </div>
              <div style={{ fontSize: 16.5, color: t.income, fontWeight: 600, marginTop: 3 }}>{balanceHidden ? '••••' : formatMoney(income, settings.currency)}</div>
            </div>
            <div style={{ width: 1, alignSelf: 'stretch', background: t.border }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: t.textMuted, fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <Icon name="ArrowDownRight" size={13} color={t.expense} /> Gastos
              </div>
              <div style={{ fontSize: 16.5, color: t.expense, fontWeight: 600, marginTop: 3 }}>{balanceHidden ? '••••' : formatMoney(expense, settings.currency)}</div>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: t.textMuted, marginBottom: 5 }}>
              <span>Tasa de ahorro</span>
              <span style={{ color: savingsRate >= 0 ? t.income : t.expense, fontWeight: 700 }}>{savingsRate.toFixed(0)}%</span>
            </div>
            <ProgressBar percent={Math.max(0, savingsRate)} color={savingsRate >= 0 ? t.income : t.expense} track={t.surfaceAlt} />
          </div>
          <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)`, marginTop: 18, opacity: 0.6 }} />
        </div>

        {/* Cuentas */}
        {visibleAccounts.length > 0 && (
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', marginTop: 16, paddingBottom: 4 }}>
            {visibleAccounts.map(acc => (
              <AccountMiniCard key={acc.id} account={acc} balance={getAccountBalance(acc.id, transactions, accounts)} t={t} settings={settings} />
            ))}
          </div>
        )}

        {/* Resumen deudas / por cobrar / metas */}
        {(totalDebt > 0 || totalReceivable > 0 || activeGoals > 0) && (
          <div style={{ display: 'flex', gap: 10, marginTop: 16, overflowX: 'auto' }}>
            {totalDebt > 0 && (
              <button onClick={()=>onNavigate('presupuestos','debts')}
                style={{ flex: 1, minWidth: 120, textAlign: 'left', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: '12px 14px', cursor: 'pointer' }}>
                <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Deuda pendiente</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: t.expense, marginTop: 4 }}>{formatMoney(totalDebt, settings.currency)}</div>
              </button>
            )}
            {totalReceivable > 0 && (
              <button onClick={()=>onNavigate('presupuestos','receivables')}
                style={{ flex: 1, minWidth: 120, textAlign: 'left', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: '12px 14px', cursor: 'pointer' }}>
                <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Por cobrar</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: t.income, marginTop: 4 }}>{formatMoney(totalReceivable, settings.currency)}</div>
              </button>
            )}
            {activeGoals > 0 && (
              <button onClick={()=>onNavigate('presupuestos','goals')}
                style={{ flex: 1, minWidth: 120, textAlign: 'left', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: '12px 14px', cursor: 'pointer' }}>
                <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Metas activas</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginTop: 4 }}>{activeGoals}</div>
              </button>
            )}
          </div>
        )}

        {/* Por confirmar */}
        {pending.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: t.text }}>Por confirmar</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.expense, background: t.expense+'22', borderRadius: 10, padding: '1px 7px' }}>{pending.length}</div>
              <div style={{ flex: 1 }} />
              <button onClick={()=>onNavigate('presupuestos','subs')} className="fz-link-btn" style={{ color: t.accent }}>Ver todos</button>
            </div>
            <div style={{ background: t.glow ? t.surface + 'CC' : t.surface, border: `1px solid ${t.expense}55`, borderRadius: t.glow ? 20 : 16, padding: '0 16px', backdropFilter: t.glow ? 'blur(10px)' : undefined, WebkitBackdropFilter: t.glow ? 'blur(10px)' : undefined }}>
              {pending.slice(0,3).map((p,i)=>(
                <div key={p.key} style={{ borderTop: i===0?'none':`1px solid ${t.border}` }}>
                  <PendingPaymentRow t={t} settings={settings} categories={categories} p={p}
                    onConfirm={onConfirmRecurring} onAdjust={onAdjustRecurring} onSkip={onSkipRecurring} onUnsubscribe={onUnsubscribeRecurring}
                    snoozed={snoozed.has(p.key)}
                    onSnooze={()=>setSnoozed(s=>{ const next = new Set(s); next.has(p.key) ? next.delete(p.key) : next.add(p.key); return next; })} />
                </div>
              ))}
              {pending.length > 3 && (
                <div style={{ padding: '10px 0', textAlign: 'center', borderTop: `1px solid ${t.border}` }}>
                  <button onClick={()=>onNavigate('presupuestos','subs')} className="fz-link-btn" style={{ color: t.textMuted }}>+{pending.length-3} más</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Próximos pagos */}
        {upcoming.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: t.text, marginBottom: 8 }}>Próximos pagos</div>
            <div style={{ background: t.glow ? t.surface + 'CC' : t.surface, border: `1px solid ${t.border}`, borderRadius: t.glow ? 20 : 16, overflow: 'hidden', backdropFilter: t.glow ? 'blur(10px)' : undefined, WebkitBackdropFilter: t.glow ? 'blur(10px)' : undefined }}>
              {upcoming.map(({rec, due},i)=>{
                const cat = categories.find(c=>c.id===rec.category);
                return (
                  <div key={rec.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderTop: i===0?'none':`1px solid ${t.border}` }}>
                    <CategoryBadge cat={{ icon: rec.icon || cat?.icon || 'Repeat', color: cat?.color || t.textMuted }} t={t} size={30} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, color: t.text, fontWeight: 500, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{rec.name || rec.note || (cat ? cat.name : 'Otros')}</div>
                      <div style={{ fontSize: 11, color: t.textMuted }}>{dueLabel(due)}</div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: rec.type==='income'?t.income:t.expense }}>
                      {rec.type==='income'?'+':'-'}{formatMoney(rec.amount, settings.currency)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Pie chart */}
        {pieData.length > 0 && (
          <div onClick={()=>onNavigate('reportes')} style={{ background: t.glow ? t.surface + 'CC' : t.surface, border: `1px solid ${t.border}`, borderRadius: t.glow ? 20 : 16, padding: '18px 18px 8px', marginTop: 16, cursor: 'pointer', backdropFilter: t.glow ? 'blur(10px)' : undefined, WebkitBackdropFilter: t.glow ? 'blur(10px)' : undefined }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: t.text, marginBottom: 4 }}>Gastos por categoría</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 120, height: 120, flexShrink: 0, filter: t.glow ? `drop-shadow(0 0 10px ${t.accent}35)` : undefined }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      {pieData.map((entry, i) => (
                        <radialGradient key={i} id={`pieGrad-${i}`} cx="35%" cy="35%" r="75%">
                          <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                          <stop offset="100%" stopColor={entry.color} stopOpacity={0.72} />
                        </radialGradient>
                      ))}
                    </defs>
                    <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={34} outerRadius={54} paddingAngle={3} stroke={t.glow ? t.bg : 'none'} strokeWidth={t.glow ? 2 : 0}>
                      {pieData.map((entry, i) => <Cell key={i} fill={t.glow ? `url(#pieGrad-${i})` : entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(v)=>formatMoney(v, settings.currency)} contentStyle={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: t.text }} itemStyle={{ color: t.text }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ flex: 1, paddingLeft: 8, paddingBottom: 12 }}>
                {pieData.slice(0,4).map((d,i)=>(
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 3, background: d.color, flexShrink: 0 }} />
                    <div style={{ fontSize: 12, color: t.textMuted, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</div>
                    <div style={{ fontSize: 12, color: t.text, fontWeight: 600 }}>{formatMoney(d.value, settings.currency)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Trend chart */}
        <div onClick={()=>onNavigate('reportes')} style={{ background: t.glow ? t.surface + 'CC' : t.surface, border: `1px solid ${t.border}`, borderRadius: t.glow ? 20 : 16, padding: '18px 12px 8px', marginTop: 16, cursor: 'pointer', backdropFilter: t.glow ? 'blur(10px)' : undefined, WebkitBackdropFilter: t.glow ? 'blur(10px)' : undefined }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: t.text, marginBottom: 4, paddingLeft: 6 }}>Tendencia (6 meses)</div>
          <div style={{ width: '100%', height: 140, filter: t.glow ? `drop-shadow(0 0 10px ${t.accent}40)` : undefined }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ top: 8, right: 10, left: -4, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradIncomeHome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={t.income} stopOpacity={0.32}/><stop offset="100%" stopColor={t.income} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gradExpenseHome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={t.expense} stopOpacity={0.32}/><stop offset="100%" stopColor={t.expense} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={t.border} vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: t.textMuted }} axisLine={{ stroke: t.border }} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: t.textMuted }} axisLine={false} tickLine={false} width={38} tickFormatter={formatCompactNumber} />
                <Tooltip formatter={(v)=>formatMoney(v, settings.currency)} contentStyle={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: t.text }} itemStyle={{ color: t.text }} />
                <Area type="monotone" dataKey="Ingresos" stroke={t.income} strokeWidth={2.2} fill={t.glow ? 'url(#gradIncomeHome)' : 'transparent'} dot={lastPointDot(t.income, trend.length)} activeDot={{ r: 4 }} />
                <Area type="monotone" dataKey="Gastos" stroke={t.expense} strokeWidth={2.2} fill={t.glow ? 'url(#gradExpenseHome)' : 'transparent'} dot={lastPointDot(t.expense, trend.length)} activeDot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent transactions */}
        <div style={{ marginTop: 16, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: t.text }}>Movimientos recientes</div>
            <button onClick={goHistorial} className="fz-link-btn" style={{ color: t.accent }}>Ver todo</button>
          </div>
          {recent.length === 0 ? (
            <EmptyState t={t} text="Aún no tienes movimientos. Toca + para registrar el primero." onAction={openSheet} />
          ) : (
            <div style={{ background: t.glow ? t.surface + 'CC' : t.surface, border: `1px solid ${t.border}`, borderRadius: t.glow ? 20 : 16, overflow: 'hidden', backdropFilter: t.glow ? 'blur(10px)' : undefined, WebkitBackdropFilter: t.glow ? 'blur(10px)' : undefined }}>
              {recent.map((tx,i)=>{
                const cat = categories.find(c=>c.id===tx.category);
                return (
                  <div key={tx.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderTop: i===0?'none':`1px solid ${t.border}` }}>
                    <CategoryBadge cat={cat} t={t} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13.5, color: t.text, fontWeight: 500, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                        {tx.recurringId && <Icon name="Repeat" size={11} color={t.textMuted} />}
                        <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{tx.note || (cat ? cat.name : 'Otros')}</span>
                      </div>
                      <div style={{ fontSize: 11.5, color: t.textMuted }}>{cat ? cat.name : 'Otros'}</div>
                    </div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: tx.type==='income'?t.income:t.expense, whiteSpace:'nowrap' }}>
                      {tx.type==='income'?'+':'-'}{formatMoney(tx.amount, settings.currency)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ t, text, onAction, actionLabel = 'Agregar movimiento' }) {
  return (
    <div style={{ background: t.glow ? t.surface + 'CC' : t.surface, border: `1px dashed ${t.border}`, borderRadius: t.glow ? 20 : 16, padding: '28px 20px', textAlign: 'center', backdropFilter: t.glow ? 'blur(10px)' : undefined, WebkitBackdropFilter: t.glow ? 'blur(10px)' : undefined }}>
      <div style={{ fontSize: 13, color: t.textMuted, marginBottom: onAction ? 14 : 0 }}>{text}</div>
      {onAction && (
        <button onClick={onAction} style={{ background: t.accent, color: t.accentText, border: 'none', borderRadius: 10, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

/* ---------------------------------- HISTORIAL ---------------------------------- */
function HistorialScreen({ data, t, onEdit }) {
  const { transactions, categories, settings, accounts, tags } = data;
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filterCat, setFilterCat] = useState('all');
  const [filterAccount, setFilterAccount] = useState('all');
  const [filterTag, setFilterTag] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [amountMin, setAmountMin] = useState('');
  const [amountMax, setAmountMax] = useState('');
  const [sortBy, setSortBy] = useState('date_desc');

  const clearFilters = () => {
    setFilterCat('all'); setFilterAccount('all'); setFilterTag('all');
    setDateFrom(''); setDateTo(''); setAmountMin(''); setAmountMax(''); setSortBy('date_desc');
  };
  const activeFilterCount = [filterCat!=='all', filterAccount!=='all', filterTag!=='all', dateFrom, dateTo, amountMin, amountMax, sortBy!=='date_desc'].filter(Boolean).length;

  const filtered = transactions.filter(tx => {
    if (filterType !== 'all' && tx.type !== filterType) return false;
    if (filterCat !== 'all' && tx.category !== filterCat) return false;
    if (filterAccount !== 'all' && tx.accountId !== filterAccount && tx.toAccountId !== filterAccount) return false;
    if (filterTag !== 'all' && !(tx.tags||[]).includes(filterTag)) return false;
    if (dateFrom && tx.date < dateFrom) return false;
    if (dateTo && tx.date > dateTo) return false;
    if (amountMin && Number(tx.amount) < Number(amountMin)) return false;
    if (amountMax && Number(tx.amount) > Number(amountMax)) return false;
    if (query) {
      const cat = categories.find(c=>c.id===tx.category);
      const acc = accounts.find(a=>a.id===tx.accountId);
      const hay = `${tx.note||''} ${cat?cat.name:''} ${acc?acc.name:''}`.toLowerCase();
      if (!hay.includes(query.toLowerCase())) return false;
    }
    return true;
  }).sort((a,b) => {
    if (sortBy === 'amount_desc') return Number(b.amount)-Number(a.amount);
    if (sortBy === 'amount_asc') return Number(a.amount)-Number(b.amount);
    if (sortBy === 'date_asc') return a.date.localeCompare(b.date) || a.createdAt-b.createdAt;
    if (sortBy === 'category') {
      const catA = categories.find(c=>c.id===a.category)?.name || '';
      const catB = categories.find(c=>c.id===b.category)?.name || '';
      return catA.localeCompare(catB);
    }
    return b.date.localeCompare(a.date) || b.createdAt-a.createdAt;
  });

  const groupByDate = sortBy === 'date_desc' || sortBy === 'date_asc';
  const groups = {};
  if (groupByDate) filtered.forEach(tx => { (groups[tx.date] = groups[tx.date] || []).push(tx); });
  const dateKeys = groupByDate ? Object.keys(groups).sort((a,b)=> sortBy==='date_asc' ? a.localeCompare(b) : b.localeCompare(a)) : ['__all__'];
  if (!groupByDate) groups['__all__'] = filtered;

  const renderRow = (tx, i, isFirst) => {
    const cat = categories.find(c=>c.id===tx.category);
    const acc = accounts.find(a=>a.id===tx.accountId);
    const toAcc = tx.type==='transfer' ? accounts.find(a=>a.id===tx.toAccountId) : null;
    const isTransfer = tx.type === 'transfer';
    return (
      <button key={tx.id} onClick={()=>onEdit(tx)} className="fz-row-btn"
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderTop: isFirst?'none':`1px solid ${t.border}`, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        {isTransfer
          ? <div style={{ width: 34, height: 34, borderRadius: 11, background: t.accent+'26', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="ArrowRightLeft" size={17} color={t.accent} /></div>
          : <CategoryBadge cat={cat} t={t} />}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13.5, color: t.text, fontWeight: 500, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {tx.recurringId && <Icon name="Repeat" size={11} color={t.textMuted} />}
            <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{isTransfer ? (tx.note || 'Transferencia') : (tx.note || (cat ? cat.name : 'Otros'))}</span>
          </div>
          <div style={{ fontSize: 11.5, color: t.textMuted }}>
            {isTransfer
              ? `${acc ? acc.name : '—'} → ${toAcc ? toAcc.name : '—'}`
              : `${cat ? cat.name : 'Otros'}${acc ? ` · ${acc.name}` : ''}${!groupByDate ? ` · ${tx.date}` : ''}`}
            {(tx.tags||[]).length > 0 && ` · #${tx.tags.join(' #')}`}
          </div>
        </div>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: isTransfer?t.accent:tx.type==='income'?t.income:t.expense, whiteSpace:'nowrap' }}>
          {isTransfer ? '' : tx.type==='income'?'+':'-'}{formatMoney(tx.amount, settings.currency)}
        </div>
      </button>
    );
  };

  return (
    <div>
      <TopBar title="Historial" subtitle={`${filtered.length} movimiento${filtered.length===1?'':'s'}`} t={t} />
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 10, padding: '9px 12px' }}>
            <Icon name="Search" size={15} color={t.textMuted} />
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar por nota o categoría"
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: t.text, flex: 1, fontFamily: 'var(--font-body)' }} />
          </div>
          <button onClick={()=>setShowFilters(s=>!s)} style={{ position: 'relative', width: 38, height: 38, borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            background: showFilters ? t.accent+'22' : t.surfaceAlt, border: `1px solid ${showFilters ? t.accent : t.border}` }}>
            <Icon name="Filter" size={16} color={showFilters ? t.accent : t.textMuted} />
            {activeFilterCount > 0 && (
              <div style={{ position: 'absolute', top: -4, right: -4, minWidth: 16, height: 16, borderRadius: 8, background: t.accent, color: t.accentText, fontSize: 9.5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px' }}>{activeFilterCount}</div>
            )}
          </button>
        </div>

        <div style={{ marginBottom: 14 }}>
          <SegmentedControl t={t} value={filterType} onChange={setFilterType}
            options={[{value:'all',label:'Todos'},{value:'income',label:'Ingresos'},{value:'expense',label:'Gastos'},{value:'transfer',label:'Transf.'}]} />
        </div>

        {showFilters && (
          <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: 14, marginBottom: 16 }}>
            <select value={filterCat} onChange={e=>setFilterCat(e.target.value)}
              style={{ width: '100%', marginBottom: 8, padding: '9px 10px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13, fontFamily: 'var(--font-body)' }}>
              <option value="all">Todas las categorías</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <select value={filterAccount} onChange={e=>setFilterAccount(e.target.value)}
                style={{ flex: 1, padding: '9px 10px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13, fontFamily: 'var(--font-body)' }}>
                <option value="all">Todas las cuentas</option>
                {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
              {(tags||[]).length > 0 && (
                <select value={filterTag} onChange={e=>setFilterTag(e.target.value)}
                  style={{ flex: 1, padding: '9px 10px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13, fontFamily: 'var(--font-body)' }}>
                  <option value="all">Todas las etiquetas</option>
                  {tags.map(tg => <option key={tg} value={tg}>{tg}</option>)}
                </select>
              )}
            </div>

            <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Rango de fechas</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)}
                style={{ flex: 1, padding: '9px 10px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 12.5, fontFamily: 'var(--font-body)' }} />
              <input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)}
                style={{ flex: 1, padding: '9px 10px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 12.5, fontFamily: 'var(--font-body)' }} />
            </div>

            <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Rango de monto</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <MoneyInput value={amountMin} onChange={setAmountMin} placeholder="Mínimo"
                style={{ flex: 1, padding: '9px 10px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 12.5, fontFamily: 'var(--font-body)' }} />
              <MoneyInput value={amountMax} onChange={setAmountMax} placeholder="Máximo"
                style={{ flex: 1, padding: '9px 10px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 12.5, fontFamily: 'var(--font-body)' }} />
            </div>

            <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Ordenar por</div>
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
              style={{ width: '100%', marginBottom: 10, padding: '9px 10px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13, fontFamily: 'var(--font-body)' }}>
              <option value="date_desc">Fecha (recientes primero)</option>
              <option value="date_asc">Fecha (antiguos primero)</option>
              <option value="amount_desc">Monto (mayor primero)</option>
              <option value="amount_asc">Monto (menor primero)</option>
              <option value="category">Categoría (A-Z)</option>
            </select>

            <button onClick={clearFilters}
              style={{ width: '100%', padding: '10px', borderRadius: 10, border: `1px solid ${t.border}`, background: 'transparent', color: t.textMuted, fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>
              Limpiar filtros
            </button>
          </div>
        )}

        {dateKeys.length === 0 || filtered.length === 0 ? (
          <EmptyState t={t} text="No hay movimientos que coincidan con el filtro." />
        ) : dateKeys.map(dateKey => (
          <div key={dateKey} style={{ marginBottom: 16 }}>
            {groupByDate && (
              <div style={{ fontSize: 11.5, color: t.textMuted, textTransform: 'capitalize', marginBottom: 6, fontWeight: 600, letterSpacing: '0.03em' }}>{formatDayHeader(dateKey)}</div>
            )}
            <div style={{ background: t.glow ? t.surface + 'CC' : t.surface, border: `1px solid ${t.border}`, borderRadius: t.glow ? 20 : 16, overflow: 'hidden', backdropFilter: t.glow ? 'blur(10px)' : undefined, WebkitBackdropFilter: t.glow ? 'blur(10px)' : undefined }}>
              {groups[dateKey].map((tx,i)=>renderRow(tx, i, i===0))}
            </div>
          </div>
        ))}
        <div style={{ height: 10 }} />
      </div>
    </div>
  );
}

/* ---------------------------------- PRESUPUESTOS ---------------------------------- */
function PresupuestosContent({ data, t, onEditBudget }) {
  const { transactions, categories, budgets, settings } = data;
  const now = new Date();
  const curMonthKey = `${now.getFullYear()}-${pad(now.getMonth()+1)}`;
  const expenseCats = categories.filter(c=>c.type==='expense');

  const totalBudget = Object.values(budgets).reduce((s,v)=>s+Number(v||0),0);
  const totalSpent = transactions.filter(tx=>tx.type==='expense' && monthKeyOf(tx.date)===curMonthKey).reduce((s,t2)=>s+Number(t2.amount),0);

  return (
    <div>
      <div style={{ padding: '0 20px' }}>
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: '16px 18px', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: t.textMuted, marginBottom: 6 }}>
            <span>Gastado del presupuesto total</span>
            <span style={{ color: t.text, fontWeight: 700 }}>{formatMoney(totalSpent, settings.currency)} / {formatMoney(totalBudget, settings.currency)}</span>
          </div>
          <ProgressBar percent={totalBudget>0?(totalSpent/totalBudget*100):0} color={t.accent} track={t.surfaceAlt} />
        </div>

        {expenseCats.map(cat => {
          const limit = Number(budgets[cat.id] || 0);
          const spent = transactions.filter(tx=>tx.type==='expense' && tx.category===cat.id && monthKeyOf(tx.date)===curMonthKey).reduce((s,t2)=>s+Number(t2.amount),0);
          const pct = limit>0 ? (spent/limit*100) : 0;
          const color = pct >= 100 ? t.expense : pct >= 70 ? t.warn : t.income;
          return (
            <button key={cat.id} onClick={()=>onEditBudget(cat)} className="fz-row-btn"
              style={{ width: '100%', textAlign: 'left', display: 'block', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: '14px 16px', marginBottom: 10, cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: limit>0?10:0 }}>
                <CategoryBadge cat={cat} t={t} size={30} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, color: t.text, fontWeight: 500 }}>{cat.name}</div>
                  {limit>0 ? (
                    <div style={{ fontSize: 11.5, color: t.textMuted }}>{formatMoney(spent, settings.currency)} de {formatMoney(limit, settings.currency)}</div>
                  ) : (
                    <div style={{ fontSize: 11.5, color: t.accent }}>Sin presupuesto · definir</div>
                  )}
                </div>
                {limit>0 && <div style={{ fontSize: 12, fontWeight: 700, color }}>{pct.toFixed(0)}%</div>}
              </div>
              {limit>0 && <ProgressBar percent={pct} color={color} track={t.surfaceAlt} />}
            </button>
          );
        })}
        <div style={{ height: 10 }} />
      </div>
    </div>
  );
}

/* ---------------------------------- METAS DE AHORRO ---------------------------------- */
function SavingsGoalsContent({ data, t, onOpenModal }) {
  const { savingsGoals, settings } = data;
  return (
    <div style={{ padding: '0 20px' }}>
      {savingsGoals.length === 0 ? (
        <EmptyState t={t} text="Aún no tienes metas de ahorro." onAction={()=>onOpenModal({ type: 'goal' })} actionLabel="Crear meta" />
      ) : savingsGoals.map(goal => {
        const stats = getGoalStats(goal);
        return (
          <div key={goal.id} style={{ background: t.surface, border: `1px solid ${stats.completed ? goal.color : t.border}`, borderRadius: 16, padding: '14px 16px', marginBottom: 12 }}>
            <div onClick={()=>onOpenModal({ type: 'goal', goal })} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, cursor: 'pointer' }}>
              <CategoryBadge cat={{ icon: goal.icon, color: goal.color }} t={t} size={34} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, color: t.text, fontWeight: 600 }}>{goal.name}</div>
                <div style={{ fontSize: 11.5, color: t.textMuted }}>
                  {formatMoney(goal.currentAmount, settings.currency)} de {formatMoney(goal.targetAmount, settings.currency)} ({stats.percent.toFixed(0)}%)
                </div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: goal.color }}>{stats.percent.toFixed(0)}%</div>
            </div>
            <ProgressBar percent={stats.percent} color={goal.color} track={t.surfaceAlt} />
            {stats.completed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, fontSize: 12.5, color: goal.color, fontWeight: 600 }}>
                <Icon name="PartyPopper" size={15} color={goal.color} /> ¡Meta completada!
              </div>
            ) : stats.days !== null && (
              <div style={{ fontSize: 11.5, color: t.textMuted, marginTop: 8 }}>
                {stats.days >= 0
                  ? `Faltan ${stats.days} día${stats.days===1?'':'s'}${stats.perDay ? ` — necesitas ahorrar ${formatMoney(stats.perDay, settings.currency)}/día` : ''}`
                  : 'Fecha límite vencida'}
              </div>
            )}
            <button onClick={()=>onOpenModal({ type: 'contribute', goal })}
              style={{ width: '100%', marginTop: 12, padding: '9px', borderRadius: 10, border: 'none', background: t.accent, color: t.accentText, fontWeight: 700, fontSize: 12.5, cursor: 'pointer' }}>
              Abonar
            </button>
          </div>
        );
      })}
      <button onClick={()=>onOpenModal({ type: 'goal' })}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: t.surfaceAlt, border: `1px dashed ${t.border}`, borderRadius: 12, padding: '11px', color: t.accent, fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 16 }}>
        <Icon name="Plus" size={14} color={t.accent} /> Nueva meta de ahorro
      </button>
    </div>
  );
}

/* ---------------------------------- DEUDAS ---------------------------------- */
function DebtsContent({ data, t, onOpenModal }) {
  const { debts, settings } = data;
  const totalDebt = debts.reduce((s,d)=>s+Number(d.currentBalance||0),0);
  return (
    <div style={{ padding: '0 20px' }}>
      {debts.length > 0 && (
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: '16px 18px', marginBottom: 16 }}>
          <div style={{ fontSize: 11.5, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Deuda total pendiente</div>
          <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 22, color: t.expense, fontWeight: 600, marginTop: 3 }}>{formatMoney(totalDebt, settings.currency)}</div>
        </div>
      )}
      {debts.length === 0 ? (
        <EmptyState t={t} text="No tienes deudas registradas." onAction={()=>onOpenModal({ type: 'debt' })} actionLabel="Registrar deuda" />
      ) : debts.map(debt => {
        const stats = getDebtStats(debt);
        return (
          <div key={debt.id} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: '14px 16px', marginBottom: 12 }}>
            <div onClick={()=>onOpenModal({ type: 'debt', debt })} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, cursor: 'pointer' }}>
              <CategoryBadge cat={{ icon: debt.icon, color: debt.color }} t={t} size={34} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, color: t.text, fontWeight: 600 }}>{debt.name}</div>
                <div style={{ fontSize: 11.5, color: t.textMuted }}>
                  {formatMoney(debt.currentBalance, settings.currency)} pendiente{debt.interestRate ? ` · ${debt.interestRate}% anual` : ''}
                </div>
                {debt.note && <div style={{ fontSize: 11.5, color: t.textMuted, fontStyle: 'italic', marginTop: 2 }}>{debt.note}</div>}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.income }}>{stats.percentPaid.toFixed(0)}%</div>
            </div>
            <ProgressBar percent={stats.percentPaid} color={t.income} track={t.surfaceAlt} />
            <div style={{ display: 'flex', gap: 12, marginTop: 10, fontSize: 11.5, color: t.textMuted, flexWrap: 'wrap' }}>
              {debt.minimumPayment > 0 && <span>Cuota: {formatMoney(debt.minimumPayment, settings.currency)}/mes</span>}
              {stats.monthsRemaining !== null && <span>{stats.monthsRemaining} meses restantes</span>}
              {stats.totalInterest !== null && <span>≈{formatMoney(stats.totalInterest, settings.currency)} en intereses</span>}
            </div>
            <button onClick={()=>onOpenModal({ type: 'debtPayment', debt })}
              style={{ width: '100%', marginTop: 12, padding: '9px', borderRadius: 10, border: 'none', background: t.accent, color: t.accentText, fontWeight: 700, fontSize: 12.5, cursor: 'pointer' }}>
              Registrar pago
            </button>
          </div>
        );
      })}
      <button onClick={()=>onOpenModal({ type: 'debt' })}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: t.surfaceAlt, border: `1px dashed ${t.border}`, borderRadius: 12, padding: '11px', color: t.accent, fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 16 }}>
        <Icon name="Plus" size={14} color={t.accent} /> Nueva deuda
      </button>
    </div>
  );
}

function ReceivablesContent({ data, t, onOpenModal }) {
  const { receivables, settings } = data;
  const totalReceivable = (receivables||[]).reduce((s,r)=>s+Number(r.currentBalance||0),0);
  return (
    <div style={{ padding: '0 20px' }}>
      {receivables.length > 0 && (
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: '16px 18px', marginBottom: 16 }}>
          <div style={{ fontSize: 11.5, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total por cobrar</div>
          <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 22, color: t.income, fontWeight: 600, marginTop: 3 }}>{formatMoney(totalReceivable, settings.currency)}</div>
        </div>
      )}
      {receivables.length === 0 ? (
        <EmptyState t={t} text="No tienes cuentas por cobrar registradas." onAction={()=>onOpenModal({ type: 'receivable' })} actionLabel="Registrar por cobrar" />
      ) : receivables.map(r => {
        const stats = getReceivableStats(r);
        return (
          <div key={r.id} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: '14px 16px', marginBottom: 12 }}>
            <div onClick={()=>onOpenModal({ type: 'receivable', receivable: r })} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, cursor: 'pointer' }}>
              <CategoryBadge cat={{ icon: r.icon, color: r.color }} t={t} size={34} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, color: t.text, fontWeight: 600 }}>{r.name}</div>
                <div style={{ fontSize: 11.5, color: t.textMuted }}>{formatMoney(r.currentBalance, settings.currency)} pendiente por cobrar</div>
                {r.note && <div style={{ fontSize: 11.5, color: t.textMuted, fontStyle: 'italic', marginTop: 2 }}>{r.note}</div>}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.income }}>{stats.percentCollected.toFixed(0)}%</div>
            </div>
            <ProgressBar percent={stats.percentCollected} color={t.income} track={t.surfaceAlt} />
            <button onClick={()=>onOpenModal({ type: 'receivablePayment', receivable: r })}
              style={{ width: '100%', marginTop: 12, padding: '9px', borderRadius: 10, border: 'none', background: t.accent, color: t.accentText, fontWeight: 700, fontSize: 12.5, cursor: 'pointer' }}>
              Registrar abono
            </button>
          </div>
        );
      })}
      <button onClick={()=>onOpenModal({ type: 'receivable' })}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: t.surfaceAlt, border: `1px dashed ${t.border}`, borderRadius: 12, padding: '11px', color: t.accent, fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 16 }}>
        <Icon name="Plus" size={14} color={t.accent} /> Nueva cuenta por cobrar
      </button>
    </div>
  );
}

/* ---------------------------------- SUSCRIPCIONES / PAGOS RECURRENTES ---------------------------------- */
const MONTHLY_FACTOR = { daily: 365/12, weekly: 52/12, biweekly: 26/12, monthly: 1, bimonthly: 1/2, quarterly: 1/3, yearly: 1/12 };
function monthlyEquivalent(rec) { return (Number(rec.amount) || 0) * (MONTHLY_FACTOR[rec.frequency] ?? 1); }

function PendingPaymentRow({ t, settings, categories, p, onConfirm, onAdjust, onSkip, onUnsubscribe, snoozed, onSnooze }) {
  const { rec, dueDate, days } = p;
  const cat = categories.find(c=>c.id===rec.category);
  const dateColor = days < 0 ? t.expense : days === 0 ? t.text : t.textMuted;
  const [confirmingUnsub, setConfirmingUnsub] = useState(false);

  if (snoozed) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0' }}>
        <CategoryBadge cat={{ icon: rec.icon || cat?.icon || 'Repeat', color: cat?.color || t.textMuted }} t={t} size={28} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, color: t.text, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{rec.name || rec.note || 'Recurrente'}</div>
          <div style={{ fontSize: 11, color: t.textMuted }}>Aún no confirmado</div>
        </div>
        <button onClick={onSnooze} className="fz-link-btn" style={{ color: t.accent }}>Confirmar</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '12px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <CategoryBadge cat={{ icon: rec.icon || cat?.icon || 'Repeat', color: cat?.color || t.textMuted }} t={t} size={30} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, color: t.text, fontWeight: 500, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{rec.name || rec.note || 'Recurrente'}</div>
          <div style={{ fontSize: 11, color: dateColor, fontWeight: days<0 ? 700 : 400 }}>{dueLabel(dueDate)}</div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: rec.type==='income'?t.income:t.expense }}>
          {rec.type==='income'?'+':'-'}{formatMoney(rec.amount, settings.currency)}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <button onClick={()=>onConfirm(rec, dueDate)}
          style={{ flex: 1, padding: '9px', borderRadius: 10, border: 'none', background: t.accent, color: t.accentText, fontWeight: 700, fontSize: 12.5, cursor: 'pointer' }}>
          Ya lo pagué
        </button>
        <button onClick={()=>onAdjust(rec, dueDate)}
          style={{ padding: '9px 14px', borderRadius: 10, border: `1px solid ${t.border}`, background: 'transparent', color: t.text, fontWeight: 600, fontSize: 12.5, cursor: 'pointer' }}>
          Ajustar
        </button>
      </div>
      <div style={{ display: 'flex', gap: 14, fontSize: 11.5, flexWrap: 'wrap' }}>
        {onSnooze && <button onClick={onSnooze} className="fz-link-btn" style={{ color: t.textMuted }}>Aún no</button>}
        <button onClick={()=>onSkip(rec.id, dueDate)} className="fz-link-btn" style={{ color: t.textMuted }}>Omitir</button>
        {confirmingUnsub ? (
          <button onClick={()=>{ onUnsubscribe(rec.id); setConfirmingUnsub(false); }} className="fz-link-btn" style={{ color: t.expense }}>¿Seguro? Sí, darme de baja</button>
        ) : (
          <button onClick={()=>setConfirmingUnsub(true)} className="fz-link-btn" style={{ color: t.textMuted }}>Me di de baja</button>
        )}
      </div>
    </div>
  );
}

function SuscripcionesContent({ data, t, onOpenModal, onConfirm, onAdjust, onSkip, onUnsubscribe, onReactivate }) {
  const { recurringTransactions, categories, settings } = data;
  const recs = recurringTransactions || [];
  const pending = useMemo(() => getPendingPayments(data), [data.recurringTransactions, data.transactions]);
  const activeExpense = recs.filter(r=>r.active && r.type==='expense');
  const activeIncome = recs.filter(r=>r.active && r.type==='income');
  const monthlyTotal = activeExpense.reduce((s,r)=>s+monthlyEquivalent(r),0);
  const incomeMonthlyTotal = activeIncome.reduce((s,r)=>s+monthlyEquivalent(r),0);
  const pendingByRec = {};
  pending.forEach(p=>{ pendingByRec[p.rec.id] = (pendingByRec[p.rec.id]||0)+1; });
  const sorted = [...recs].sort((a,b)=> (b.active?1:0)-(a.active?1:0));

  return (
    <div style={{ padding: '0 20px' }}>
      {recs.length > 0 && (
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: '16px 18px', marginBottom: 16 }}>
          <div style={{ fontSize: 11.5, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Te cuestan al mes</div>
          <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 22, color: t.expense, fontWeight: 600, marginTop: 3 }}>{formatMoney(monthlyTotal, settings.currency)}</div>
          <div style={{ fontSize: 11.5, color: t.textMuted, marginTop: 3 }}>
            ≈ {formatMoney(monthlyTotal*12, settings.currency)} al año · {activeExpense.length} activa{activeExpense.length===1?'':'s'}
          </div>
          {incomeMonthlyTotal > 0 && (
            <div style={{ fontSize: 11.5, color: t.income, marginTop: 3 }}>Ingresos recurrentes: {formatMoney(incomeMonthlyTotal, settings.currency)}/mes</div>
          )}
        </div>
      )}

      {pending.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: t.text, marginBottom: 8 }}>Por confirmar</div>
          <div style={{ background: t.surface, border: `1px solid ${t.expense}55`, borderRadius: 16, padding: '0 16px' }}>
            {pending.map((p,i)=>(
              <div key={p.key} style={{ borderTop: i===0?'none':`1px solid ${t.border}` }}>
                <PendingPaymentRow t={t} settings={settings} categories={categories} p={p}
                  onConfirm={onConfirm} onAdjust={onAdjust} onSkip={onSkip} onUnsubscribe={onUnsubscribe} />
              </div>
            ))}
          </div>
        </div>
      )}

      {recs.length === 0 ? (
        <EmptyState t={t} text="Aún no tienes pagos recurrentes." onAction={()=>onOpenModal({ type: 'recurring' })} actionLabel="Agregar recurrente" />
      ) : sorted.map(rec => {
        const cat = categories.find(c=>c.id===rec.category);
        const pendingCount = pendingByRec[rec.id] || 0;
        const freqLabel = FREQUENCIES.find(f=>f.value===rec.frequency)?.label;
        const monthly = monthlyEquivalent(rec);
        return (
          <div key={rec.id} style={{ background: t.surface, border: `1px solid ${pendingCount>0 ? t.expense+'55' : t.border}`, borderRadius: 16, padding: '14px 16px', marginBottom: 12, opacity: rec.active ? 1 : 0.5 }}>
            <div onClick={()=>onOpenModal({ type: 'recurring', recurring: rec })} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
              <CategoryBadge cat={{ icon: rec.icon || cat?.icon || 'Repeat', color: cat?.color || t.textMuted }} t={t} size={34} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, color: t.text, fontWeight: 600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{rec.name || rec.note || cat?.name || 'Recurrente'}</div>
                <div style={{ fontSize: 11.5, color: t.textMuted }}>
                  {freqLabel}{rec.frequency!=='monthly' ? ` · ${formatMoney(monthly, settings.currency)}/mes` : ''}
                </div>
                {pendingCount > 0 ? (
                  <div style={{ fontSize: 11.5, color: t.expense, display:'flex', alignItems:'center', gap: 4, marginTop: 2 }}>
                    <Icon name="AlertTriangle" size={12} color={t.expense} /> {pendingCount} pago{pendingCount===1?'':'s'} sin confirmar
                  </div>
                ) : rec.active ? (
                  <div style={{ fontSize: 11.5, color: t.textMuted, marginTop: 2 }}>Próximo: {dueLabel(nextFutureDueDate(rec))}</div>
                ) : (
                  <div style={{ fontSize: 11.5, color: t.textMuted, marginTop: 2, display:'flex', alignItems:'center', gap: 6 }}>
                    Dada de baja
                    <button onClick={(e)=>{ e.stopPropagation(); onReactivate(rec.id); }} className="fz-link-btn" style={{ color: t.accent }}>Reactivar</button>
                  </div>
                )}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: rec.type==='income'?t.income:t.expense }}>
                {rec.type==='income'?'+':'-'}{formatMoney(rec.amount, settings.currency)}
              </div>
            </div>
            {pendingCount > 3 && (
              <button onClick={()=>{ pending.filter(p=>p.rec.id===rec.id).forEach(p=>onSkip(rec.id, p.dueDate)); }}
                style={{ width: '100%', marginTop: 10, padding: '8px', borderRadius: 10, border: 'none', background: t.accent, color: t.accentText, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
                Ponerme al día
              </button>
            )}
          </div>
        );
      })}
      <button onClick={()=>onOpenModal({ type: 'recurring' })}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: t.surfaceAlt, border: `1px dashed ${t.border}`, borderRadius: 12, padding: '11px', color: t.accent, fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 16 }}>
        <Icon name="Plus" size={14} color={t.accent} /> Nueva recurrente
      </button>
    </div>
  );
}

/* ---------------------------------- METAS (contenedor con sub-tabs) ---------------------------------- */
function MetasScreen({ data, t, subTab, setSubTab, onEditBudget, onOpenModal, onConfirmRecurring, onAdjustRecurring, onSkipRecurring, onUnsubscribeRecurring, onReactivateRecurring }) {
  return (
    <div>
      <TopBar title="Metas" t={t} />
      <div style={{ padding: '0 20px', marginBottom: 16 }}>
        <SegmentedControl t={t} value={subTab} onChange={setSubTab}
          options={[{value:'budgets',label:'Límites'},{value:'subs',label:'Suscrip.'},{value:'goals',label:'Ahorro'},{value:'debts',label:'Deudas'},{value:'receivables',label:'Cobrar'}]} />
      </div>
      {subTab === 'budgets' && <PresupuestosContent data={data} t={t} onEditBudget={onEditBudget} />}
      {subTab === 'subs' && <SuscripcionesContent data={data} t={t} onOpenModal={onOpenModal}
        onConfirm={onConfirmRecurring} onAdjust={onAdjustRecurring} onSkip={onSkipRecurring}
        onUnsubscribe={onUnsubscribeRecurring} onReactivate={onReactivateRecurring} />}
      {subTab === 'goals' && <SavingsGoalsContent data={data} t={t} onOpenModal={onOpenModal} />}
      {subTab === 'debts' && <DebtsContent data={data} t={t} onOpenModal={onOpenModal} />}
      {subTab === 'receivables' && <ReceivablesContent data={data} t={t} onOpenModal={onOpenModal} />}
    </div>
  );
}

/* ---------------------------------- REPORTES ---------------------------------- */
function ReportesScreen({ data, t }) {
  const { transactions: allTransactions, categories, settings, accounts, tags } = data;
  const [periodType, setPeriodType] = useState('month');
  const [offset, setOffset] = useState(0);
  const [customFrom, setCustomFrom] = useState(todayISO());
  const [customTo, setCustomTo] = useState(todayISO());
  const [filterTag, setFilterTag] = useState('all');

  const range = getPeriodRange(periodType, offset, customFrom, customTo);
  const prevRange = getPrevPeriodRange(periodType, offset, customFrom, customTo);

  const transactions = filterTag === 'all' ? allTransactions : allTransactions.filter(tx => (tx.tags||[]).includes(filterTag));

  const periodTx = transactions.filter(tx => tx.date >= range.from && tx.date <= range.to);
  const prevTx = transactions.filter(tx => tx.date >= prevRange.from && tx.date <= prevRange.to);
  const expenseTotal = periodTx.filter(t2=>t2.type==='expense').reduce((s,t2)=>s+Number(t2.amount),0);
  const incomeTotal = periodTx.filter(t2=>t2.type==='income').reduce((s,t2)=>s+Number(t2.amount),0);
  const prevExpenseTotal = prevTx.filter(t2=>t2.type==='expense').reduce((s,t2)=>s+Number(t2.amount),0);
  const changePct = prevExpenseTotal>0 ? ((expenseTotal-prevExpenseTotal)/prevExpenseTotal*100) : (expenseTotal>0?100:0);

  const daysInRange = Math.max(1, Math.round((new Date(range.to+'T00:00:00') - new Date(range.from+'T00:00:00'))/86400000)+1);
  const dailyAvgExpense = expenseTotal / daysInRange;

  const byCat = {};
  periodTx.filter(t2=>t2.type==='expense').forEach(t2=>{ byCat[t2.category]=(byCat[t2.category]||0)+Number(t2.amount); });
  const barData = Object.entries(byCat).map(([catId,value])=>{
    const cat = categories.find(c=>c.id===catId);
    return { name: cat?cat.name:'Otros', value, color: cat?cat.color:t.textMuted };
  }).sort((a,b)=>b.value-a.value);

  const byIncomeCat = {};
  periodTx.filter(t2=>t2.type==='income').forEach(t2=>{ byIncomeCat[t2.category]=(byIncomeCat[t2.category]||0)+Number(t2.amount); });
  const incomeBarData = Object.entries(byIncomeCat).map(([catId,value])=>{
    const cat = categories.find(c=>c.id===catId);
    return { name: cat?cat.name:'Otros', value, color: cat?cat.color:t.income };
  }).sort((a,b)=>b.value-a.value);

  const byAccount = {};
  periodTx.filter(t2=>t2.type==='expense').forEach(t2=>{ byAccount[t2.accountId]=(byAccount[t2.accountId]||0)+Number(t2.amount); });
  const accountBarData = Object.entries(byAccount).map(([accId,value])=>{
    const acc = accounts.find(a=>a.id===accId);
    return { name: acc?acc.name:'Otra', value, color: acc?acc.color:t.textMuted };
  }).sort((a,b)=>b.value-a.value);

  const catComparison = Object.keys(byCat).map(catId => {
    const cat = categories.find(c=>c.id===catId);
    const current = byCat[catId] || 0;
    const previous = prevTx.filter(t2=>t2.type==='expense' && t2.category===catId).reduce((s,t2)=>s+Number(t2.amount),0);
    const pct = previous>0 ? ((current-previous)/previous*100) : (current>0?100:0);
    return { catId, name: cat?cat.name:'Otros', current, previous, pct };
  }).sort((a,b)=>b.current-a.current);

  const now = new Date();
  const trend = [];
  for (let i=5;i>=0;i--) {
    const d = new Date(now.getFullYear(), now.getMonth()-i, 1);
    const k = `${d.getFullYear()}-${pad(d.getMonth()+1)}`;
    const txs = transactions.filter(tx=>monthKeyOf(tx.date)===k);
    const ing = txs.filter(t2=>t2.type==='income').reduce((s,t2)=>s+Number(t2.amount),0);
    const gas = txs.filter(t2=>t2.type==='expense').reduce((s,t2)=>s+Number(t2.amount),0);
    trend.push({ label: MONTHS_SHORT[d.getMonth()], Ingresos: ing, Gastos: gas, Ahorro: ing-gas });
  }

  const netWorthTrend = [];
  for (let i=5;i>=0;i--) {
    const d = new Date(now.getFullYear(), now.getMonth()-i+1, 0);
    const dStr = isoDate(d);
    netWorthTrend.push({ label: MONTHS_SHORT[d.getMonth()], Patrimonio: getNetWorthAt(dStr, accounts, allTransactions) });
  }

  const topGastos = [...periodTx].filter(t2=>t2.type==='expense').sort((a,b)=>Number(b.amount)-Number(a.amount)).slice(0,10);

  const exportCSV = () => {
    try {
      const header = 'Fecha,Tipo,Categoria,Cuenta,Monto,Nota,Etiquetas\n';
      const rows = allTransactions.map(tx => {
        const cat = categories.find(c=>c.id===tx.category);
        const acc = accounts.find(a=>a.id===tx.accountId);
        const tipo = tx.type==='income'?'Ingreso':tx.type==='transfer'?'Transferencia':'Gasto';
        const nota = (tx.note||'').replace(/,/g,';');
        const catName = tx.type==='transfer' ? 'Transferencia' : (cat?cat.name:'Otros');
        const tagStr = (tx.tags||[]).join('; ');
        return `${tx.date},${tipo},${catName},${acc?acc.name:''},${tx.amount},${nota},${tagStr}`;
      }).join('\n');
      const blob = new Blob(['﻿'+header+rows], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'mis-finanzas.csv';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch(e) { /* descarga no disponible en este entorno */ }
  };

  return (
    <div>
      <TopBar title="Reportes" t={t} />
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 12, paddingBottom: 2 }}>
          {PERIOD_OPTIONS.map(opt=>(
            <button key={opt.value} onClick={()=>{ setPeriodType(opt.value); setOffset(0); }}
              style={{ flexShrink: 0, padding: '7px 13px', borderRadius: 20, cursor: 'pointer', fontSize: 12.5, fontWeight: 600,
                border: `1px solid ${periodType===opt.value ? t.accent : t.border}`, background: periodType===opt.value ? t.accent+'22' : t.surfaceAlt, color: periodType===opt.value ? t.accent : t.textMuted }}>
              {opt.label}
            </button>
          ))}
        </div>

        {periodType === 'custom' ? (
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <input type="date" value={customFrom} onChange={e=>setCustomFrom(e.target.value)}
              style={{ flex: 1, padding: '9px 10px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 12.5, fontFamily: 'var(--font-body)' }} />
            <input type="date" value={customTo} onChange={e=>setCustomTo(e.target.value)}
              style={{ flex: 1, padding: '9px 10px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 12.5, fontFamily: 'var(--font-body)' }} />
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <button onClick={()=>setOffset(o=>o-1)} className="fz-icon-btn" style={{ background: t.surfaceAlt, border: `1px solid ${t.border}` }}>
              <Icon name="ChevronLeft" size={16} color={t.text} />
            </button>
            <div style={{ fontSize: 14, fontWeight: 600, color: t.text, textTransform: 'capitalize' }}>{range.label}</div>
            <button onClick={()=>setOffset(o=>o+1)} className="fz-icon-btn" style={{ background: t.surfaceAlt, border: `1px solid ${t.border}` }}>
              <Icon name="ChevronRight" size={16} color={t.text} />
            </button>
          </div>
        )}

        {(tags||[]).length > 0 && (
          <select value={filterTag} onChange={e=>setFilterTag(e.target.value)}
            style={{ width: '100%', marginBottom: 16, padding: '9px 10px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13, fontFamily: 'var(--font-body)' }}>
            <option value="all">Todas las etiquetas</option>
            {tags.map(tg => <option key={tg} value={tg}>{tg}</option>)}
          </select>
        )}

        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <div style={{ flex: 1, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Gastos</div>
            <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 18, color: t.expense, fontWeight: 600, marginTop: 3 }}>{formatMoney(expenseTotal, settings.currency)}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 4 }}>
              <Icon name={changePct>0?'TrendingUp':'TrendingDown'} size={11} color={changePct>0?t.expense:t.income} />
              <span style={{ fontSize: 11, fontWeight: 700, color: changePct>0?t.expense:t.income }}>{Math.abs(changePct).toFixed(0)}% vs anterior</span>
            </div>
          </div>
          <div style={{ flex: 1, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Ingresos</div>
            <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 18, color: t.income, fontWeight: 600, marginTop: 3 }}>{formatMoney(incomeTotal, settings.currency)}</div>
            <div style={{ fontSize: 11, color: t.textMuted, marginTop: 4 }}>Promedio diario: {formatMoney(dailyAvgExpense, settings.currency)}</div>
          </div>
        </div>

        {barData.length>0 && (
          <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: '18px 12px 8px', marginBottom: 16 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: t.text, marginBottom: 8, paddingLeft: 6 }}>Gasto por categoría</div>
            <div style={{ width: '100%', height: Math.max(120, barData.length*34) }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" width={92} tick={{ fontSize: 11, fill: t.textMuted }} axisLine={false} tickLine={false} tickFormatter={(v)=>truncateLabel(v, 13)} />
                  <Tooltip formatter={(v)=>formatMoney(v, settings.currency)} contentStyle={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: t.text }} itemStyle={{ color: t.text }} cursor={{fill: t.surfaceAlt}} />
                  <Bar dataKey="value" radius={[0,6,6,0]}>
                    {barData.map((entry,i)=><Cell key={i} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {incomeBarData.length>0 && (
          <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: '18px 12px 8px', marginBottom: 16 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: t.text, marginBottom: 8, paddingLeft: 6 }}>Ingresos por categoría</div>
            <div style={{ width: '100%', height: Math.max(120, incomeBarData.length*34) }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incomeBarData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" width={92} tick={{ fontSize: 11, fill: t.textMuted }} axisLine={false} tickLine={false} tickFormatter={(v)=>truncateLabel(v, 13)} />
                  <Tooltip formatter={(v)=>formatMoney(v, settings.currency)} contentStyle={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: t.text }} itemStyle={{ color: t.text }} cursor={{fill: t.surfaceAlt}} />
                  <Bar dataKey="value" radius={[0,6,6,0]}>
                    {incomeBarData.map((entry,i)=><Cell key={i} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {accountBarData.length>0 && (
          <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: '18px 12px 8px', marginBottom: 16 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: t.text, marginBottom: 8, paddingLeft: 6 }}>Gasto por cuenta</div>
            <div style={{ width: '100%', height: Math.max(120, accountBarData.length*34) }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={accountBarData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" width={92} tick={{ fontSize: 11, fill: t.textMuted }} axisLine={false} tickLine={false} tickFormatter={(v)=>truncateLabel(v, 13)} />
                  <Tooltip formatter={(v)=>formatMoney(v, settings.currency)} contentStyle={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: t.text }} itemStyle={{ color: t.text }} cursor={{fill: t.surfaceAlt}} />
                  <Bar dataKey="value" radius={[0,6,6,0]}>
                    {accountBarData.map((entry,i)=><Cell key={i} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: '18px 12px 8px', marginBottom: 16 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: t.text, marginBottom: 8, paddingLeft: 6 }}>Flujo de caja neto · últimos 6 meses</div>
          <div style={{ width: '100%', height: 150, filter: t.glow ? `drop-shadow(0 0 10px ${t.accent}40)` : undefined }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ top: 8, right: 10, left: -4, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradIncomeRep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={t.income} stopOpacity={0.3}/><stop offset="100%" stopColor={t.income} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gradExpenseRep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={t.expense} stopOpacity={0.3}/><stop offset="100%" stopColor={t.expense} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gradAhorroRep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={t.accent} stopOpacity={0.3}/><stop offset="100%" stopColor={t.accent} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={t.border} vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: t.textMuted }} axisLine={{ stroke: t.border }} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: t.textMuted }} axisLine={false} tickLine={false} width={38} tickFormatter={formatCompactNumber} />
                <Tooltip formatter={(v)=>formatMoney(v, settings.currency)} contentStyle={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: t.text }} itemStyle={{ color: t.text }} />
                <Area type="monotone" dataKey="Ingresos" stroke={t.income} strokeWidth={2.2} fill={t.glow ? 'url(#gradIncomeRep)' : 'transparent'} dot={lastPointDot(t.income, trend.length)} activeDot={{ r: 4 }} />
                <Area type="monotone" dataKey="Gastos" stroke={t.expense} strokeWidth={2.2} fill={t.glow ? 'url(#gradExpenseRep)' : 'transparent'} dot={lastPointDot(t.expense, trend.length)} activeDot={{ r: 4 }} />
                <Area type="monotone" dataKey="Ahorro" stroke={t.accent} strokeWidth={2.2} fill={t.glow ? 'url(#gradAhorroRep)' : 'transparent'} dot={lastPointDot(t.accent, trend.length)} activeDot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: '18px 12px 8px', marginBottom: 16 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: t.text, marginBottom: 8, paddingLeft: 6 }}>Evolución del patrimonio neto</div>
          <div style={{ width: '100%', height: 130, filter: t.glow ? `drop-shadow(0 0 10px ${t.accent}40)` : undefined }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={netWorthTrend} margin={{ top: 8, right: 10, left: -4, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradPatrimonio" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={t.accent} stopOpacity={0.32}/><stop offset="100%" stopColor={t.accent} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={t.border} vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: t.textMuted }} axisLine={{ stroke: t.border }} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: t.textMuted }} axisLine={false} tickLine={false} width={38} tickFormatter={formatCompactNumber} />
                <Tooltip formatter={(v)=>formatMoney(v, settings.currency)} contentStyle={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: t.text }} itemStyle={{ color: t.text }} />
                <Area type="monotone" dataKey="Patrimonio" stroke={t.accent} strokeWidth={2.2} fill={t.glow ? 'url(#gradPatrimonio)' : 'transparent'} dot={lastPointDot(t.accent, netWorthTrend.length)} activeDot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {catComparison.length>0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: t.text, marginBottom: 8 }}>Comparativo vs período anterior</div>
            <div style={{ background: t.glow ? t.surface + 'CC' : t.surface, border: `1px solid ${t.border}`, borderRadius: t.glow ? 20 : 16, overflow: 'hidden', backdropFilter: t.glow ? 'blur(10px)' : undefined, WebkitBackdropFilter: t.glow ? 'blur(10px)' : undefined }}>
              {catComparison.map((c,i)=>(
                <div key={c.catId} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderTop: i===0?'none':`1px solid ${t.border}` }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, color: t.text, fontWeight: 500 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: t.textMuted }}>Antes: {formatMoney(c.previous, settings.currency)}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{formatMoney(c.current, settings.currency)}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end' }}>
                      <Icon name={c.pct>0?'TrendingUp':'TrendingDown'} size={10} color={c.pct>0?t.expense:t.income} />
                      <span style={{ fontSize: 11, fontWeight: 700, color: c.pct>0?t.expense:t.income }}>{Math.abs(c.pct).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {topGastos.length>0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: t.text, marginBottom: 8 }}>Mayores gastos del período</div>
            <div style={{ background: t.glow ? t.surface + 'CC' : t.surface, border: `1px solid ${t.border}`, borderRadius: t.glow ? 20 : 16, overflow: 'hidden', backdropFilter: t.glow ? 'blur(10px)' : undefined, WebkitBackdropFilter: t.glow ? 'blur(10px)' : undefined }}>
              {topGastos.map((tx,i)=>{
                const cat = categories.find(c=>c.id===tx.category);
                return (
                  <div key={tx.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderTop: i===0?'none':`1px solid ${t.border}` }}>
                    <CategoryBadge cat={cat} t={t} size={30} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, color: t.text, fontWeight: 500, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{tx.note || (cat?cat.name:'Otros')}</div>
                      <div style={{ fontSize: 11, color: t.textMuted }}>{cat?cat.name:'Otros'}</div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: t.expense }}>{formatMoney(tx.amount, settings.currency)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <button onClick={exportCSV} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 12, padding: '12px', color: t.text, fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 16 }}>
          <Icon name="Download" size={15} color={t.text} /> Exportar todo a CSV
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------- AJUSTES ---------------------------------- */
function AjustesScreen({ data, setData, t, onOpenModal }) {
  const { categories, settings, accounts, transactions, recurringTransactions } = data;
  const notifications = settings.notifications || DEFAULT_DATA.settings.notifications;
  const jsonInputRef = useRef(null);
  const csvInputRef = useRef(null);
  const [updateStatus, setUpdateStatus] = useState('');
  const [biometricSupported, setBiometricSupported] = useState(false);
  const [biometricBusy, setBiometricBusy] = useState(false);
  const [biometricError, setBiometricError] = useState('');
  useEffect(() => { isBiometricAvailable().then(setBiometricSupported); }, []);

  const toggleBiometric = async () => {
    setBiometricError('');
    if (settings.biometricCredentialId) {
      setData(d => ({ ...d, settings: { ...d.settings, biometricCredentialId: null } }));
      return;
    }
    setBiometricBusy(true);
    try {
      const credId = await registerBiometricCredential(settings.userName);
      setData(d => ({ ...d, settings: { ...d.settings, biometricCredentialId: credId } }));
    } catch (e) {
      const msg = e && e.name === 'NotAllowedError'
        ? 'Cancelaste la verificación o tu dispositivo la rechazó.'
        : e && e.message ? `No se pudo activar (${e.name || 'Error'}: ${e.message}).` : 'No se pudo activar.';
      setBiometricError(msg + ' Verifica que tengas Face ID / huella configurada en tu dispositivo.');
    } finally {
      setBiometricBusy(false);
    }
  };

  const forceUpdateCheck = async () => {
    setUpdateStatus('Buscando...');
    try {
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
      }
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map(r => r.unregister()));
      }
    } catch (e) { /* no-op */ }
    setUpdateStatus('Actualizando...');
    setTimeout(() => window.location.reload(), 400);
  };

  const setTheme = (theme) => setData(d => ({ ...d, settings: { ...d.settings, theme } }));
  const setPalette = (palette) => setData(d => ({ ...d, settings: { ...d.settings, palette } }));
  const setUserName = (userName) => setData(d => ({ ...d, settings: { ...d.settings, userName } }));
  const setCurrency = (currency) => setData(d => ({ ...d, settings: { ...d.settings, currency } }));

  const setNotif = (key, value) => {
    if (value === true && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    setData(d => ({ ...d, settings: { ...d.settings, notifications: { ...(d.settings.notifications || DEFAULT_DATA.settings.notifications), [key]: value } } }));
  };

  const toggleRecurringActive = (recId) => {
    setData(d => ({ ...d, recurringTransactions: d.recurringTransactions.map(r=>r.id===recId?{...r, active: !r.active}:r) }));
  };

  const doBackup = () => {
    exportFullBackup(data);
    setData(d => ({ ...d, settings: { ...d.settings, lastBackupDate: todayISO() } }));
  };

  const handleJsonFile = async (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    try {
      const importedData = await readFullBackupFile(file);
      onOpenModal({ type: 'importConfirm', importedData });
    } catch (err) {
      onOpenModal({ type: 'importError', message: err.message });
    }
  };

  const handleCsvFile = async (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    try {
      const { headers, rows } = await parseCSVFile(file);
      onOpenModal({ type: 'csvImport', headers, rows });
    } catch (err) {
      onOpenModal({ type: 'importError', message: err.message });
    }
  };

  return (
    <div>
      <TopBar title="Ajustes" t={t} />
      <div style={{ padding: '0 20px 20px' }}>

        <SectionLabel t={t}>Perfil</SectionLabel>
        <input value={settings.userName || ''} onChange={e=>setUserName(e.target.value)} placeholder="Tu nombre"
          style={{ width: '100%', marginBottom: 18, padding: '11px 12px', borderRadius: 12, border: `1px solid ${t.border}`, background: t.surface, color: t.text, fontSize: 13.5, fontFamily: 'var(--font-body)', outline: 'none' }} />

        <SectionLabel t={t}>Apariencia</SectionLabel>
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: 14, marginBottom: 10 }}>
          <SegmentedControl t={t} value={settings.theme} onChange={setTheme}
            options={[{value:'dark',label:'🌙 Oscuro'},{value:'light',label:'☀️ Claro'},{value:'system',label:'⚙️ Sistema'}]} />
        </div>
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: 14, marginBottom: 18 }}>
          <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Paleta de color</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {PALETTES.map(p=>{
              const active = (settings.palette || 'gold') === p.id;
              return (
                <button key={p.id} onClick={()=>setPalette(p.id)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, background: 'transparent', border: 'none', cursor: 'pointer', padding: 2 }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: p.swatch, border: active ? `2px solid ${t.text}` : `2px solid transparent`, boxShadow: active ? `0 0 0 2px ${t.surface}` : 'none' }} />
                  <span style={{ fontSize: 10.5, color: active ? t.text : t.textMuted, fontWeight: active ? 700 : 500 }}>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <SectionLabel t={t}>Moneda</SectionLabel>
        <select value={settings.currency} onChange={e=>setCurrency(e.target.value)}
          style={{ width: '100%', marginBottom: 18, padding: '11px 12px', borderRadius: 12, border: `1px solid ${t.border}`, background: t.surface, color: t.text, fontSize: 13.5, fontFamily: 'var(--font-body)' }}>
          {CURRENCIES.map(c=><option key={c} value={c}>{c}</option>)}
        </select>

        <SectionLabel t={t}>Cuentas</SectionLabel>
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, overflow: 'hidden', marginBottom: 10 }}>
          {accounts.slice().sort((a,b)=>a.order-b.order).map((acc,i)=>{
            const balance = getAccountBalance(acc.id, transactions, accounts);
            return (
              <button key={acc.id} onClick={()=>onOpenModal({ type: 'account', account: acc })} className="fz-row-btn"
                style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderTop: i===0?'none':`1px solid ${t.border}`, background: 'transparent', border: 'none', cursor: 'pointer', opacity: acc.archived ? 0.5 : 1 }}>
                <CategoryBadge cat={{ icon: acc.icon, color: acc.color }} t={t} size={28} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: t.text, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{acc.name}{acc.archived ? ' (archivada)' : ''}</div>
                  <div style={{ fontSize: 11, color: t.textMuted }}>{ACCOUNT_TYPES.find(a2=>a2.value===acc.type)?.label || acc.type}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: balance < 0 ? t.expense : t.text }}>{formatMoney(balance, acc.currency || settings.currency)}</div>
              </button>
            );
          })}
        </div>
        <button onClick={()=>onOpenModal({ type: 'account' })}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: t.surfaceAlt, border: `1px dashed ${t.border}`, borderRadius: 12, padding: '11px', color: t.accent, fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 18 }}>
          <Icon name="Plus" size={14} color={t.accent} /> Nueva cuenta
        </button>

        <SectionLabel t={t}>Categorías</SectionLabel>
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, overflow: 'hidden', marginBottom: 10 }}>
          {categories.map((c,i)=>(
            <button key={c.id} onClick={()=>onOpenModal({ type: 'category', cat: c })} className="fz-row-btn"
              style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderTop: i===0?'none':`1px solid ${t.border}`, background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <CategoryBadge cat={c} t={t} size={28} />
              <div style={{ flex: 1, fontSize: 13, color: t.text }}>{c.name}</div>
              <div style={{ fontSize: 11, color: t.textMuted, marginRight: 4 }}>{c.type==='income'?'Ingreso':'Gasto'}</div>
              <Icon name="ChevronRight" size={14} color={t.textMuted} />
            </button>
          ))}
        </div>
        <button onClick={()=>onOpenModal({ type: 'category' })}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: t.surfaceAlt, border: `1px dashed ${t.border}`, borderRadius: 12, padding: '11px', color: t.accent, fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 18 }}>
          <Icon name="Plus" size={14} color={t.accent} /> Nueva categoría
        </button>

        <SectionLabel t={t}>Transacciones recurrentes</SectionLabel>
        {recurringTransactions.length === 0 ? (
          <div style={{ background: t.surface, border: `1px dashed ${t.border}`, borderRadius: 14, padding: '16px', textAlign: 'center', fontSize: 12.5, color: t.textMuted, marginBottom: 10 }}>
            Aún no tienes movimientos recurrentes.
          </div>
        ) : (
          <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, overflow: 'hidden', marginBottom: 10 }}>
            {recurringTransactions.map((rec,i)=>{
              const cat = categories.find(c=>c.id===rec.category);
              const pendingCount = getPendingPayments(data).filter(p=>p.rec.id===rec.id).length;
              return (
                <div key={rec.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderTop: i===0?'none':`1px solid ${t.border}`, opacity: rec.active ? 1 : 0.5 }}>
                  <button onClick={()=>onOpenModal({ type: 'recurring', recurring: rec })} style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                    <CategoryBadge cat={{ icon: rec.icon || cat?.icon || 'Repeat', color: cat?.color || t.textMuted }} t={t} size={28} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, color: t.text, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{rec.name || rec.note || (cat ? cat.name : 'Otros')}</div>
                      <div style={{ fontSize: 11, color: t.textMuted }}>
                        {FREQUENCIES.find(f=>f.value===rec.frequency)?.label} · Próx. {dueLabel(nextFutureDueDate(rec))}
                        {pendingCount > 0 && <span style={{ color: t.expense }}> · {pendingCount} sin confirmar</span>}
                      </div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: rec.type==='income'?t.income:t.expense, marginRight: 4 }}>
                      {rec.type==='income'?'+':'-'}{formatMoney(rec.amount, settings.currency)}
                    </div>
                  </button>
                  <button onClick={()=>toggleRecurringActive(rec.id)} className="fz-icon-btn" style={{ background: 'transparent', border: 'none', padding: 4, flexShrink: 0 }}>
                    <Icon name={rec.active ? 'Pause' : 'Play'} size={15} color={t.textMuted} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <button onClick={()=>onOpenModal({ type: 'recurring' })}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: t.surfaceAlt, border: `1px dashed ${t.border}`, borderRadius: 12, padding: '11px', color: t.accent, fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 18 }}>
          <Icon name="Plus" size={14} color={t.accent} /> Nueva recurrente
        </button>

        <SectionLabel t={t}>Notificaciones</SectionLabel>
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, overflow: 'hidden', marginBottom: 18 }}>
          <NotificationToggle t={t} label="Recordatorio diario" desc="Te avisa si no has registrado movimientos hoy" borderTop={false}
            checked={notifications.dailyReminder} onChange={(v)=>setNotif('dailyReminder', v)} />
          {notifications.dailyReminder && (
            <div style={{ padding: '0 14px 12px 40px' }}>
              <input type="time" value={notifications.dailyReminderTime} onChange={e=>setNotif('dailyReminderTime', e.target.value)}
                style={{ padding: '7px 10px', borderRadius: 8, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 12.5, fontFamily: 'var(--font-body)' }} />
            </div>
          )}
          <NotificationToggle t={t} label="Alertas de presupuesto" desc="Cuando una categoría supera el 80% del límite"
            checked={notifications.budgetAlerts} onChange={(v)=>setNotif('budgetAlerts', v)} />
          <NotificationToggle t={t} label="Pagos próximos" desc="Recordatorio de recurrentes por vencer"
            checked={notifications.upcomingPayments} onChange={(v)=>setNotif('upcomingPayments', v)} />
        </div>

        <SectionLabel t={t}>Privacidad</SectionLabel>
        <button onClick={()=>onOpenModal({ type: settings.pin ? 'pinDisable' : 'pinSetup' })}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: '13px 14px', cursor: 'pointer', marginBottom: 18 }}>
          <Icon name="Lock" size={16} color={t.text} />
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontSize: 13, color: t.text, fontWeight: 500 }}>Bloqueo con PIN</div>
            <div style={{ fontSize: 11, color: t.textMuted }}>{settings.pin ? 'Activado — toca para desactivar' : 'Protege el acceso con un PIN de 4 dígitos'}</div>
          </div>
          <div style={{ width: 36, height: 20, borderRadius: 10, background: settings.pin ? t.accent : t.surfaceAlt, border: `1px solid ${t.border}`, position: 'relative' }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: settings.pin ? t.accentText : t.textMuted, position: 'absolute', top: 2, left: settings.pin ? 18 : 2, transition: 'left .2s ease' }} />
          </div>
        </button>

        {settings.pin && !biometricSupported && (
          <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 14, padding: '0 2px' }}>
            Face ID / Huella no está disponible en este navegador o dispositivo. Debes abrir la app desde Safari/Chrome sobre HTTPS y tener biometría configurada en el sistema.
          </div>
        )}
        {settings.pin && biometricSupported && (
          <>
            <button onClick={toggleBiometric} disabled={biometricBusy} className="fz-row-btn"
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: '13px 14px', cursor: biometricBusy?'default':'pointer', marginBottom: 6, opacity: biometricBusy?0.6:1 }}>
              <Icon name="Fingerprint" size={16} color={t.text} />
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: 13, color: t.text, fontWeight: 500 }}>Face ID / Huella</div>
                <div style={{ fontSize: 11, color: t.textMuted }}>{biometricBusy ? 'Esperando verificación…' : settings.biometricCredentialId ? 'Activado — toca para desactivar' : 'Desbloquea con tu biometría en vez del PIN'}</div>
              </div>
              <div style={{ width: 36, height: 20, borderRadius: 10, background: settings.biometricCredentialId ? t.accent : t.surfaceAlt, border: `1px solid ${t.border}`, position: 'relative', flexShrink: 0 }}>
                <div style={{ width: 14, height: 14, borderRadius: 7, background: settings.biometricCredentialId ? t.accentText : t.textMuted, position: 'absolute', top: 2, left: settings.biometricCredentialId ? 18 : 2, transition: 'left .2s ease' }} />
              </div>
            </button>
            {biometricError && <div style={{ fontSize: 11, color: t.expense, marginBottom: 10, padding: '0 2px' }}>{biometricError}</div>}
          </>
        )}
        <div style={{ marginBottom: 18 }} />

        <SectionLabel t={t}>Actualizaciones</SectionLabel>
        <button onClick={forceUpdateCheck} className="fz-row-btn"
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: '13px 14px', cursor: 'pointer', marginBottom: 8 }}>
          <Icon name="RefreshCw" size={16} color={t.text} />
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontSize: 13, color: t.text, fontWeight: 500 }}>Buscar actualizaciones</div>
            <div style={{ fontSize: 11, color: t.textMuted }}>{updateStatus || 'Toca aquí si crees que te falta una versión nueva'}</div>
          </div>
        </button>
        <div style={{ textAlign: 'center', fontSize: 11, color: t.textMuted, marginBottom: 4 }}>Esto nunca borra tus datos, solo refresca el código de la app.</div>
        <div style={{ textAlign: 'center', fontSize: 11, color: t.textMuted, marginBottom: 18, fontVariantNumeric: 'tabular-nums' }}>Versión instalada: <span style={{ color: t.text, fontWeight: 600 }}>{APP_VERSION}</span></div>

        <SectionLabel t={t}>Datos</SectionLabel>
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, overflow: 'hidden', marginBottom: 6 }}>
          <button onClick={doBackup} className="fz-row-btn"
            style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10, padding: '13px 14px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <Icon name="FileJson" size={16} color={t.text} />
            <div style={{ flex: 1 }}>Exportar respaldo completo (JSON)</div>
            <Icon name="Download" size={14} color={t.textMuted} />
          </button>
          <button onClick={()=>jsonInputRef.current?.click()} className="fz-row-btn"
            style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10, padding: '13px 14px', borderTop: `1px solid ${t.border}`, background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <Icon name="Upload" size={16} color={t.text} />
            <div style={{ flex: 1, color: t.text }}>Importar respaldo (JSON)</div>
          </button>
          <button onClick={()=>csvInputRef.current?.click()} className="fz-row-btn"
            style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10, padding: '13px 14px', borderTop: `1px solid ${t.border}`, background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <Icon name="FileSpreadsheet" size={16} color={t.text} />
            <div style={{ flex: 1, color: t.text }}>Importar movimientos desde CSV</div>
          </button>
        </div>
        <input ref={jsonInputRef} type="file" accept="application/json" onChange={handleJsonFile} style={{ display: 'none' }} />
        <input ref={csvInputRef} type="file" accept=".csv,text/csv" onChange={handleCsvFile} style={{ display: 'none' }} />
        <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 18 }}>
          {settings.lastBackupDate ? `Último respaldo: ${settings.lastBackupDate}` : 'Aún no has hecho un respaldo.'}
        </div>

        <SectionLabel t={t}>Zona de riesgo</SectionLabel>
        <button onClick={()=>onOpenModal({ type: 'resetConfirm' })}
          style={{ width: '100%', background: 'transparent', border: `1px solid ${t.expense}55`, borderRadius: 14, padding: '13px', color: t.expense, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          Borrar todos los datos
        </button>
        <div style={{ textAlign: 'center', fontSize: 11, color: t.textMuted, marginTop: 20 }}>Tus datos se guardan solo en tu cuenta, de forma privada.</div>
      </div>
    </div>
  );
}
function NotificationToggle({ t, label, desc, checked, onChange, borderTop = true }) {
  return (
    <button onClick={()=>onChange(!checked)} className="fz-row-btn"
      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '13px 14px', borderTop: borderTop ? `1px solid ${t.border}` : 'none', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: t.text, fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: 11, color: t.textMuted }}>{desc}</div>
      </div>
      <div style={{ width: 36, height: 20, borderRadius: 10, background: checked ? t.accent : t.surfaceAlt, border: `1px solid ${t.border}`, position: 'relative', flexShrink: 0 }}>
        <div style={{ width: 14, height: 14, borderRadius: 7, background: checked ? t.accentText : t.textMuted, position: 'absolute', top: 2, left: checked ? 18 : 2, transition: 'left .2s ease' }} />
      </div>
    </button>
  );
}
function SectionLabel({ t, children }) {
  return <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: t.textMuted, fontWeight: 700, marginBottom: 8 }}>{children}</div>;
}

/* ---------------------------------- HOJA: AGREGAR / EDITAR MOVIMIENTO ---------------------------------- */
function TransactionSheet({ t, categories, accounts, settings, allTags, initial, onSave, onDelete, onClose }) {
  const activeAccounts = accounts.filter(a=>!a.archived);
  const [type, setType] = useState(initial?.type || 'expense');
  const [amount, setAmount] = useState(initial?.amount ?? '');
  const [category, setCategory] = useState(initial?.category || '');
  const [date, setDate] = useState(initial?.date || todayISO());
  const [note, setNote] = useState(initial?.note || '');
  const [accountId, setAccountId] = useState(initial?.accountId || activeAccounts[0]?.id || '');
  const [toAccountId, setToAccountId] = useState(initial?.toAccountId || activeAccounts[1]?.id || activeAccounts[0]?.id || '');
  const [tags, setTags] = useState(initial?.tags || []);
  const [tagInput, setTagInput] = useState('');

  const tagSuggestions = (allTags || []).filter(tg => tg.toLowerCase().includes(tagInput.trim().toLowerCase()) && !tags.includes(tg));
  const addTag = (tg) => {
    const clean = tg.trim();
    if (!clean || tags.includes(clean)) return;
    setTags(ts => [...ts, clean]);
    setTagInput('');
  };
  const removeTag = (tg) => setTags(ts => ts.filter(x=>x!==tg));

  const filteredCats = categories.filter(c=>c.type===type);
  useEffect(() => { if (type !== 'transfer' && !filteredCats.find(c=>c.id===category)) setCategory(filteredCats[0]?.id || ''); }, [type]);
  useEffect(() => { if (toAccountId === accountId) { const alt = activeAccounts.find(a=>a.id!==accountId); if (alt) setToAccountId(alt.id); } }, [accountId]);

  const evaluated = evaluateExpression(amount);
  const resolvedAmount = evaluated !== null ? evaluated : Number(amount);
  const isExpression = /[+\-*/]/.test(String(amount));

  const canSave = type === 'transfer'
    ? resolvedAmount > 0 && accountId && toAccountId && accountId !== toAccountId && date
    : resolvedAmount > 0 && category && accountId && date;

  const save = () => {
    if (!canSave) return;
    const tx = {
      id: initial?.id || uid(),
      createdAt: initial?.createdAt || Date.now(),
      type, amount: resolvedAmount, date, note: note.trim(), accountId, tags
    };
    if (type === 'transfer') { tx.toAccountId = toAccountId; tx.category = ''; }
    else { tx.category = category; }
    onSave(tx);
  };

  return (
    <div className="fz-sheet-backdrop" onClick={onClose}>
      <div className="fz-sheet" style={{ background: t.surface, borderTop: `1px solid ${t.border}` }} onClick={e=>e.stopPropagation()}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: t.border, margin: '0 auto 16px' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: t.text, fontFamily: 'Fraunces, Georgia, serif' }}>{initial ? 'Editar movimiento' : 'Nuevo movimiento'}</div>
          <button onClick={onClose} className="fz-icon-btn" style={{ background: t.surfaceAlt, border: `1px solid ${t.border}` }}><Icon name="X" size={15} color={t.text} /></button>
        </div>

        <SegmentedControl t={t} value={type} onChange={setType} options={[{value:'expense',label:'Gasto'},{value:'income',label:'Ingreso'},{value:'transfer',label:'Transferencia'}]} />

        {type === 'transfer' && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginTop: 12, padding: '10px 12px', borderRadius: 10, background: t.accent+'14', border: `1px solid ${t.accent}33` }}>
            <Icon name="Info" size={14} color={t.accent} style={{ flexShrink: 0, marginTop: 1 }} />
            <div style={{ fontSize: 11.5, color: t.textMuted, lineHeight: 1.4 }}>
              Usa esto para mover dinero entre <b style={{ color: t.text }}>tus propias cuentas</b> — por ejemplo, sacar efectivo del banco o pagar tu tarjeta de crédito. No es un gasto ni un ingreso: tu patrimonio total no cambia, solo cambia en qué cuenta está el dinero.
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', margin: '18px 0 14px' }}>
          <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Monto</div>
          <input autoFocus type="text" inputMode="decimal" value={formatAmountDisplay(amount)}
            onChange={e=>setAmount(e.target.value.replace(/[^0-9+\-*/()]/g, ''))} placeholder="0"
            style={{ width: '100%', textAlign: 'center', fontFamily: 'Fraunces, Georgia, serif', fontSize: 34, color: type==='income'?t.income:type==='transfer'?t.accent:t.expense, background: 'transparent', border: 'none', outline: 'none' }} />
          {isExpression && (
            <div style={{ fontSize: 12.5, color: t.textMuted, marginTop: 2 }}>
              {evaluated !== null ? `= ${formatMoney(evaluated, settings.currency)}` : 'Expresión inválida'}
            </div>
          )}
        </div>

        {type !== 'transfer' && (
          <>
            <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Categoría</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {filteredCats.map(c=>(
                <button key={c.id} onClick={()=>setCategory(c.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px 7px 7px', borderRadius: 20, cursor: 'pointer',
                    border: `1px solid ${category===c.id ? c.color : t.border}`, background: category===c.id ? c.color+'22' : t.surfaceAlt }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: c.color+'33', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Icon name={c.icon} size={12} color={c.color} />
                  </div>
                  <span style={{ fontSize: 12, color: t.text }}>{c.name}</span>
                </button>
              ))}
            </div>
          </>
        )}

        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Fecha</div>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)}
              style={{ width: '100%', padding: '9px 10px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13, fontFamily: 'var(--font-body)' }} />
          </div>
        </div>

        <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
          {type==='transfer' ? 'Cuenta de origen (de dónde sale)' : type==='income' ? '¿En qué cuenta la recibiste?' : '¿Con qué cuenta pagaste?'}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: type==='transfer'?14:14 }}>
          {activeAccounts.map(a=>(
            <button key={a.id} onClick={()=>setAccountId(a.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px 7px 7px', borderRadius: 20, cursor: 'pointer',
                border: `1px solid ${accountId===a.id ? a.color : t.border}`, background: accountId===a.id ? a.color+'22' : t.surfaceAlt }}>
              <div style={{ width: 20, height: 20, borderRadius: 6, background: a.color+'33', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icon name={a.icon} size={12} color={a.color} />
              </div>
              <span style={{ fontSize: 12, color: t.text }}>{a.name}</span>
            </button>
          ))}
        </div>

        {type === 'transfer' && (
          <>
            <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Cuenta de destino (a dónde entra)</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
              {activeAccounts.filter(a=>a.id!==accountId).map(a=>(
                <button key={a.id} onClick={()=>setToAccountId(a.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px 7px 7px', borderRadius: 20, cursor: 'pointer',
                    border: `1px solid ${toAccountId===a.id ? a.color : t.border}`, background: toAccountId===a.id ? a.color+'22' : t.surfaceAlt }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: a.color+'33', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Icon name={a.icon} size={12} color={a.color} />
                  </div>
                  <span style={{ fontSize: 12, color: t.text }}>{a.name}</span>
                </button>
              ))}
            </div>
          </>
        )}

        <input value={note} onChange={e=>setNote(e.target.value)} placeholder="Nota (opcional)"
          style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13, marginBottom: 12, fontFamily: 'var(--font-body)', outline: 'none' }} />

        {tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
            {tags.map(tg=>(
              <div key={tg} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 6px 4px 10px', borderRadius: 14, background: t.accent+'22', border: `1px solid ${t.accent}55` }}>
                <span style={{ fontSize: 11.5, color: t.text }}>{tg}</span>
                <button onClick={()=>removeTag(tg)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex' }}>
                  <Icon name="X" size={11} color={t.textMuted} />
                </button>
              </div>
            ))}
          </div>
        )}
        <div style={{ position: 'relative', marginBottom: 18 }}>
          <input value={tagInput} onChange={e=>setTagInput(e.target.value)}
            onKeyDown={e=>{ if (e.key==='Enter') { e.preventDefault(); addTag(tagInput); } }}
            placeholder="Agregar etiqueta y presiona Enter"
            style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 12.5, fontFamily: 'var(--font-body)', outline: 'none' }} />
          {tagInput.trim() && tagSuggestions.length > 0 && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, overflow: 'hidden', zIndex: 5 }}>
              {tagSuggestions.slice(0,5).map(tg=>(
                <div key={tg} onClick={()=>addTag(tg)} style={{ padding: '8px 12px', fontSize: 12.5, color: t.text, cursor: 'pointer' }}>{tg}</div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {initial && (
            <button onClick={()=>onDelete(initial.id)} style={{ padding: '13px 16px', borderRadius: 12, border: `1px solid ${t.expense}55`, background: 'transparent', color: t.expense, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
              <Icon name="Trash2" size={15} color={t.expense} />
            </button>
          )}
          <button onClick={save} disabled={!canSave}
            style={{ flex: 1, padding: '13px', borderRadius: 12, border: 'none', background: canSave?t.accent:t.surfaceAlt, color: canSave?t.accentText:t.textMuted, fontWeight: 700, fontSize: 14, cursor: canSave?'pointer':'not-allowed' }}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- MODALES ---------------------------------- */
function ModalShell({ t, title, onClose, children }) {
  return (
    <div className="fz-sheet-backdrop" onClick={onClose}>
      <div className="fz-sheet" style={{ background: t.surface, borderTop: `1px solid ${t.border}` }} onClick={e=>e.stopPropagation()}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: t.border, margin: '0 auto 16px' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ fontSize: 15.5, fontWeight: 600, color: t.text, fontFamily: 'Fraunces, Georgia, serif' }}>{title}</div>
          <button onClick={onClose} className="fz-icon-btn" style={{ background: t.surfaceAlt, border: `1px solid ${t.border}` }}><Icon name="X" size={15} color={t.text} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function QuickAddModal({ t, cat, accounts, settings, onSave, onClose }) {
  const activeAccounts = accounts.filter(a=>!a.archived);
  const [amount, setAmount] = useState('');
  const [accountId, setAccountId] = useState(activeAccounts[0]?.id || '');
  const canSave = Number(amount) > 0 && accountId;

  const save = () => {
    if (!canSave) return;
    onSave({ id: uid(), createdAt: Date.now(), type: 'expense', amount: Number(amount), category: cat.id, date: todayISO(), note: '', accountId, tags: [] });
  };

  return (
    <ModalShell t={t} title={cat.name} onClose={onClose}>
      <div style={{ textAlign: 'center', margin: '4px 0 18px' }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: cat.color+'33', display:'flex', alignItems:'center', justifyContent:'center', margin: '0 auto 12px' }}>
          <Icon name={cat.icon} size={22} color={cat.color} />
        </div>
        <MoneyInput autoFocus value={amount} onChange={setAmount} placeholder="0"
          style={{ width: '100%', textAlign: 'center', fontFamily: 'Fraunces, Georgia, serif', fontSize: 32, color: t.expense, background: 'transparent', border: 'none', outline: 'none' }} />
      </div>

      {activeAccounts.length > 1 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18, justifyContent: 'center' }}>
          {activeAccounts.map(a=>(
            <button key={a.id} onClick={()=>setAccountId(a.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px 7px 7px', borderRadius: 20, cursor: 'pointer',
                border: `1px solid ${accountId===a.id ? a.color : t.border}`, background: accountId===a.id ? a.color+'22' : t.surfaceAlt }}>
              <Icon name={a.icon} size={12} color={a.color} />
              <span style={{ fontSize: 12, color: t.text }}>{a.name}</span>
            </button>
          ))}
        </div>
      )}

      <button disabled={!canSave} onClick={save}
        style={{ width: '100%', padding: '13px', borderRadius: 12, border: 'none', background: canSave?t.accent:t.surfaceAlt, color: canSave?t.accentText:t.textMuted, fontWeight: 700, fontSize: 14, cursor: canSave?'pointer':'not-allowed' }}>
        Guardar
      </button>
    </ModalShell>
  );
}

function BudgetModal({ t, cat, current, settings, onSave, onRemove, onClose }) {
  const [val, setVal] = useState(current || '');
  return (
    <ModalShell t={t} title={`Presupuesto · ${cat.name}`} onClose={onClose}>
      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Límite mensual</div>
      <MoneyInput value={val} onChange={setVal} placeholder="0" autoFocus
        style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 16, marginBottom: 18, fontFamily: 'var(--font-body)', outline: 'none' }} />
      <div style={{ display: 'flex', gap: 10 }}>
        {current > 0 && (
          <button onClick={onRemove} style={{ padding: '12px 14px', borderRadius: 12, border: `1px solid ${t.border}`, background: 'transparent', color: t.textMuted, fontSize: 13, cursor: 'pointer' }}>Quitar</button>
        )}
        <button onClick={()=>onSave(Number(val)||0)} style={{ flex: 1, padding: '12px', borderRadius: 12, border: 'none', background: t.accent, color: t.accentText, fontWeight: 700, fontSize: 13.5, cursor: 'pointer' }}>Guardar</button>
      </div>
    </ModalShell>
  );
}

function CategoryModal({ t, initial, otherCategories, hasTransactions, onSave, onDelete, onMerge, onClose }) {
  const [name, setName] = useState(initial?.name || '');
  const [type, setType] = useState(initial?.type || 'expense');
  const [icon, setIcon] = useState(initial?.icon || 'MoreHorizontal');
  const [color, setColor] = useState(initial?.color || COLOR_OPTIONS[0]);
  const [mergeTarget, setMergeTarget] = useState('');
  const canSave = name.trim().length > 0;
  const mergeCandidates = (otherCategories || []).filter(c => c.type === type);

  return (
    <ModalShell t={t} title={initial ? 'Editar categoría' : 'Nueva categoría'} onClose={onClose}>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre de la categoría" autoFocus
        style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, marginBottom: 14, fontFamily: 'var(--font-body)', outline: 'none' }} />
      <div style={{ marginBottom: 14, opacity: (initial && hasTransactions) ? 0.5 : 1, pointerEvents: (initial && hasTransactions) ? 'none' : 'auto' }}>
        <SegmentedControl t={t} value={type} onChange={setType} options={[{value:'expense',label:'Gasto'},{value:'income',label:'Ingreso'}]} />
      </div>
      {initial && hasTransactions && (
        <div style={{ fontSize: 11, color: t.textMuted, marginTop: -8, marginBottom: 14 }}>El tipo no se puede cambiar porque ya tiene movimientos.</div>
      )}
      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Ícono</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        {CATEGORY_ICON_OPTIONS.map(ic=>(
          <button key={ic} onClick={()=>setIcon(ic)} style={{ width: 34, height: 34, borderRadius: 9, display:'flex', alignItems:'center', justifyContent:'center', cursor: 'pointer',
            border: `1px solid ${icon===ic?color:t.border}`, background: icon===ic?color+'22':t.surfaceAlt }}>
            <Icon name={ic} size={16} color={icon===ic?color:t.textMuted} />
          </button>
        ))}
      </div>
      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Color</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        {COLOR_OPTIONS.map(c=>(
          <button key={c} onClick={()=>setColor(c)} style={{ width: 26, height: 26, borderRadius: '50%', background: c, cursor: 'pointer', border: color===c?`2px solid ${t.text}`:'2px solid transparent' }} />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: initial ? 20 : 0 }}>
        {initial && (
          <button disabled={hasTransactions} title={hasTransactions ? 'Tiene movimientos — usa "Fusionar" para reasignarlos' : 'Eliminar'}
            onClick={()=>onDelete(initial.id)}
            style={{ padding: '12px 14px', borderRadius: 12, border: `1px solid ${t.expense}55`, background: 'transparent', color: t.expense, fontWeight: 600, fontSize: 13, cursor: hasTransactions ? 'not-allowed' : 'pointer', opacity: hasTransactions ? 0.4 : 1 }}>
            <Icon name="Trash2" size={15} color={t.expense} />
          </button>
        )}
        <button disabled={!canSave} onClick={()=>onSave({ id: initial?.id || uid(), name: name.trim(), type, icon, color })}
          style={{ flex: 1, padding: '12px', borderRadius: 12, border: 'none', background: canSave?t.accent:t.surfaceAlt, color: canSave?t.accentText:t.textMuted, fontWeight: 700, fontSize: 13.5, cursor: canSave?'pointer':'not-allowed' }}>
          {initial ? 'Guardar cambios' : 'Crear categoría'}
        </button>
      </div>

      {initial && mergeCandidates.length > 0 && (
        <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Fusionar con otra categoría</div>
          <div style={{ fontSize: 11.5, color: t.textMuted, marginBottom: 10, lineHeight: 1.4 }}>Todos los movimientos de "{initial.name}" pasarán a la categoría que elijas, y "{initial.name}" se eliminará.</div>
          <select value={mergeTarget} onChange={e=>setMergeTarget(e.target.value)}
            style={{ width: '100%', marginBottom: 10, padding: '9px 10px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13, fontFamily: 'var(--font-body)' }}>
            <option value="">Selecciona una categoría destino</option>
            {mergeCandidates.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <button disabled={!mergeTarget} onClick={()=>onMerge(initial.id, mergeTarget)}
            style={{ width: '100%', padding: '11px', borderRadius: 12, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: mergeTarget?t.text:t.textMuted, fontWeight: 600, fontSize: 13, cursor: mergeTarget?'pointer':'not-allowed' }}>
            Fusionar categorías
          </button>
        </div>
      )}
    </ModalShell>
  );
}

function AccountModal({ t, settings, initial, onSave, onArchive, onClose }) {
  const [name, setName] = useState(initial?.name || '');
  const [type, setType] = useState(initial?.type || 'cash');
  const [icon, setIcon] = useState(initial?.icon || ACCOUNT_TYPES[0].icon);
  const [color, setColor] = useState(initial?.color || COLOR_OPTIONS[0]);
  const [initialBalance, setInitialBalance] = useState(initial?.initialBalance ?? '');
  const [currency, setCurrency] = useState(initial?.currency || settings.currency);
  const [includeInTotal, setIncludeInTotal] = useState(initial ? initial.includeInTotal !== false : true);
  const canSave = name.trim().length > 0;

  const chooseType = (val) => {
    setType(val);
    const def = ACCOUNT_TYPES.find(a=>a.value===val);
    if (def) setIcon(def.icon);
  };

  const save = () => {
    if (!canSave) return;
    onSave({
      id: initial?.id || uid(),
      name: name.trim(), type, icon, color,
      initialBalance: Number(initialBalance) || 0,
      currency, includeInTotal,
      archived: initial?.archived || false,
      order: initial?.order ?? Date.now()
    });
  };

  return (
    <ModalShell t={t} title={initial ? 'Editar cuenta' : 'Nueva cuenta'} onClose={onClose}>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre de la cuenta" autoFocus
        style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, marginBottom: 14, fontFamily: 'var(--font-body)', outline: 'none' }} />

      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Tipo de cuenta</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        {ACCOUNT_TYPES.map(at=>(
          <button key={at.value} onClick={()=>chooseType(at.value)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px 7px 7px', borderRadius: 20, cursor: 'pointer',
              border: `1px solid ${type===at.value ? color : t.border}`, background: type===at.value ? color+'22' : t.surfaceAlt }}>
            <Icon name={at.icon} size={13} color={type===at.value?color:t.textMuted} />
            <span style={{ fontSize: 12, color: t.text }}>{at.label}</span>
          </button>
        ))}
      </div>

      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Ícono</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        {ACCOUNT_ICON_OPTIONS.map(ic=>(
          <button key={ic} onClick={()=>setIcon(ic)} style={{ width: 34, height: 34, borderRadius: 9, display:'flex', alignItems:'center', justifyContent:'center', cursor: 'pointer',
            border: `1px solid ${icon===ic?color:t.border}`, background: icon===ic?color+'22':t.surfaceAlt }}>
            <Icon name={ic} size={16} color={icon===ic?color:t.textMuted} />
          </button>
        ))}
      </div>

      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Color</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        {COLOR_OPTIONS.map(c=>(
          <button key={c} onClick={()=>setColor(c)} style={{ width: 26, height: 26, borderRadius: '50%', background: c, cursor: 'pointer', border: color===c?`2px solid ${t.text}`:'2px solid transparent' }} />
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{initial ? 'Saldo inicial' : 'Saldo inicial'}</div>
          <MoneyInput value={initialBalance} onChange={setInitialBalance} placeholder="0"
            style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, fontFamily: 'var(--font-body)', outline: 'none' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Moneda</div>
          <select value={currency} onChange={e=>setCurrency(e.target.value)}
            style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, fontFamily: 'var(--font-body)' }}>
            {CURRENCIES.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <button onClick={()=>setIncludeInTotal(v=>!v)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 12, padding: '11px 12px', cursor: 'pointer', marginBottom: 18 }}>
        <div style={{ flex: 1, textAlign: 'left', fontSize: 12.5, color: t.text }}>Incluir en balance total</div>
        <div style={{ width: 36, height: 20, borderRadius: 10, background: includeInTotal ? t.accent : t.border, position: 'relative', flexShrink: 0 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: includeInTotal ? t.accentText : t.textMuted, position: 'absolute', top: 2, left: includeInTotal ? 18 : 2, transition: 'left .2s ease' }} />
        </div>
      </button>

      <div style={{ display: 'flex', gap: 10 }}>
        {initial && onArchive && (
          <button onClick={onArchive} style={{ padding: '12px 14px', borderRadius: 12, border: `1px solid ${t.border}`, background: 'transparent', color: t.textMuted, fontSize: 13, cursor: 'pointer' }}>
            {initial.archived ? 'Reactivar' : 'Archivar'}
          </button>
        )}
        <button disabled={!canSave} onClick={save}
          style={{ flex: 1, padding: '12px', borderRadius: 12, border: 'none', background: canSave?t.accent:t.surfaceAlt, color: canSave?t.accentText:t.textMuted, fontWeight: 700, fontSize: 13.5, cursor: canSave?'pointer':'not-allowed' }}>
          {initial ? 'Guardar cambios' : 'Crear cuenta'}
        </button>
      </div>
    </ModalShell>
  );
}

function RecurringModal({ t, categories, accounts, settings, initial, onSave, onDelete, onClose }) {
  const activeAccounts = accounts.filter(a=>!a.archived);
  const [type, setType] = useState(initial?.type || 'expense');
  const [name, setName] = useState(initial?.name || initial?.note || '');
  const [icon, setIcon] = useState(initial?.icon || guessSubscriptionIcon(initial?.name || initial?.note || ''));
  const [iconManual, setIconManual] = useState(!!initial?.iconManual);
  const [amount, setAmount] = useState(initial?.amount ?? '');
  const [category, setCategory] = useState(initial?.category || '');
  const [accountId, setAccountId] = useState(initial?.accountId || activeAccounts[0]?.id || '');
  const [note, setNote] = useState(initial?.note || '');
  const [frequency, setFrequency] = useState(initial?.frequency || 'monthly');
  const [dayOfMonth, setDayOfMonth] = useState(initial?.dayOfMonth ?? '');
  const [startDate, setStartDate] = useState(initial?.startDate || todayISO());
  const [hasEndDate, setHasEndDate] = useState(!!initial?.endDate);
  const [endDate, setEndDate] = useState(initial?.endDate || '');

  const filteredCats = categories.filter(c=>c.type===type);
  useEffect(() => { if (!filteredCats.find(c=>c.id===category)) setCategory(filteredCats[0]?.id || ''); }, [type]);

  const onNameChange = (v) => { setName(v); if (!iconManual) setIcon(guessSubscriptionIcon(v)); };
  const onPickIcon = (ic) => { setIcon(ic); setIconManual(true); };
  const accentColor = filteredCats.find(c=>c.id===category)?.color || t.accent;

  const usesDayOfMonth = ['monthly','bimonthly','quarterly'].includes(frequency);
  const canSave = name.trim() && Number(amount) > 0 && category && accountId && startDate;

  const save = () => {
    if (!canSave) return;
    onSave({
      id: initial?.id || uid(),
      type, name: name.trim(), icon, iconManual,
      amount: Number(amount), category, accountId, note: note.trim(),
      frequency,
      startDate,
      endDate: hasEndDate && endDate ? endDate : null,
      dayOfMonth: usesDayOfMonth && dayOfMonth ? Number(dayOfMonth) : null,
      dayOfWeek: null,
      skippedDates: initial?.skippedDates || [],
      lastGeneratedDate: initial?.lastGeneratedDate || null,
      lastPaidDate: initial?.lastPaidDate || null,
      unsubscribedAt: initial?.unsubscribedAt || null,
      active: initial ? initial.active : true,
      nextDueDate: initial?.nextDueDate || startDate
    });
  };

  return (
    <ModalShell t={t} title={initial ? 'Editar recurrente' : 'Nueva recurrente'} onClose={onClose}>
      <SegmentedControl t={t} value={type} onChange={setType} options={[{value:'expense',label:'Gasto'},{value:'income',label:'Ingreso'}]} />

      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '14px 0 8px' }}>Nombre</div>
      <input autoFocus value={name} onChange={e=>onNameChange(e.target.value)} placeholder="Netflix, gimnasio, arriendo…"
        style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, marginBottom: 14, fontFamily: 'var(--font-body)', outline: 'none' }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ícono</div>
        {iconManual && (
          <button onClick={()=>{ setIconManual(false); setIcon(guessSubscriptionIcon(name)); }} className="fz-link-btn" style={{ color: t.accent }}>
            Sugerir ícono
          </button>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 6, maxHeight: 150, overflowY: 'auto', overscrollBehavior: 'contain', marginBottom: 14, padding: 4, borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt }}>
        {SUBSCRIPTION_ICON_OPTIONS.map(ic=>(
          <button key={ic} onClick={()=>onPickIcon(ic)}
            style={{ aspectRatio: '1', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              border: `1px solid ${icon===ic ? accentColor : t.border}`, background: icon===ic ? accentColor+'22' : t.surface }}>
            <Icon name={ic} size={16} color={icon===ic ? accentColor : t.textMuted} />
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', margin: '16px 0 14px' }}>
        <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Monto</div>
        <MoneyInput value={amount} onChange={setAmount} placeholder="0"
          style={{ width: '100%', textAlign: 'center', fontFamily: 'Fraunces, Georgia, serif', fontSize: 30, color: type==='income'?t.income:t.expense, background: 'transparent', border: 'none', outline: 'none' }} />
      </div>

      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Categoría</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        {filteredCats.map(c=>(
          <button key={c.id} onClick={()=>setCategory(c.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px 7px 7px', borderRadius: 20, cursor: 'pointer',
              border: `1px solid ${category===c.id ? c.color : t.border}`, background: category===c.id ? c.color+'22' : t.surfaceAlt }}>
            <div style={{ width: 20, height: 20, borderRadius: 6, background: c.color+'33', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Icon name={c.icon} size={12} color={c.color} />
            </div>
            <span style={{ fontSize: 12, color: t.text }}>{c.name}</span>
          </button>
        ))}
      </div>

      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Cuenta</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        {activeAccounts.map(a=>(
          <button key={a.id} onClick={()=>setAccountId(a.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px 7px 7px', borderRadius: 20, cursor: 'pointer',
              border: `1px solid ${accountId===a.id ? a.color : t.border}`, background: accountId===a.id ? a.color+'22' : t.surfaceAlt }}>
            <div style={{ width: 20, height: 20, borderRadius: 6, background: a.color+'33', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Icon name={a.icon} size={12} color={a.color} />
            </div>
            <span style={{ fontSize: 12, color: t.text }}>{a.name}</span>
          </button>
        ))}
      </div>

      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Frecuencia</div>
      <select value={frequency} onChange={e=>setFrequency(e.target.value)}
        style={{ width: '100%', marginBottom: 14, padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, fontFamily: 'var(--font-body)' }}>
        {FREQUENCIES.map(f=><option key={f.value} value={f.value}>{f.label}</option>)}
      </select>

      <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Fecha inicio</div>
          <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)}
            style={{ width: '100%', padding: '9px 10px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13, fontFamily: 'var(--font-body)' }} />
        </div>
        {usesDayOfMonth && (
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Día del mes</div>
            <input type="number" min="1" max="31" value={dayOfMonth} onChange={e=>setDayOfMonth(e.target.value)} placeholder="1-31"
              style={{ width: '100%', padding: '9px 10px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13, fontFamily: 'var(--font-body)' }} />
          </div>
        )}
      </div>

      <button onClick={()=>setHasEndDate(v=>!v)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 12, padding: '11px 12px', cursor: 'pointer', marginBottom: hasEndDate?10:14 }}>
        <div style={{ flex: 1, textAlign: 'left', fontSize: 12.5, color: t.text }}>Tiene fecha de fin</div>
        <div style={{ width: 36, height: 20, borderRadius: 10, background: hasEndDate ? t.accent : t.border, position: 'relative', flexShrink: 0 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: hasEndDate ? t.accentText : t.textMuted, position: 'absolute', top: 2, left: hasEndDate ? 18 : 2, transition: 'left .2s ease' }} />
        </div>
      </button>
      {hasEndDate && (
        <input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)}
          style={{ width: '100%', marginBottom: 14, padding: '9px 10px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13, fontFamily: 'var(--font-body)' }} />
      )}

      <input value={note} onChange={e=>setNote(e.target.value)} placeholder="Nota (opcional)"
        style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13, marginBottom: 18, fontFamily: 'var(--font-body)', outline: 'none' }} />

      <div style={{ display: 'flex', gap: 10 }}>
        {initial && onDelete && (
          <button onClick={onDelete} style={{ padding: '12px 14px', borderRadius: 12, border: `1px solid ${t.expense}55`, background: 'transparent', color: t.expense, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
            <Icon name="Trash2" size={15} color={t.expense} />
          </button>
        )}
        <button disabled={!canSave} onClick={save}
          style={{ flex: 1, padding: '12px', borderRadius: 12, border: 'none', background: canSave?t.accent:t.surfaceAlt, color: canSave?t.accentText:t.textMuted, fontWeight: 700, fontSize: 13.5, cursor: canSave?'pointer':'not-allowed' }}>
          {initial ? 'Guardar cambios' : 'Crear recurrente'}
        </button>
      </div>
    </ModalShell>
  );
}

function GoalModal({ t, accounts, settings, initial, onSave, onDelete, onClose }) {
  const [name, setName] = useState(initial?.name || '');
  const [icon, setIcon] = useState(initial?.icon || GOAL_ICON_OPTIONS[0]);
  const [color, setColor] = useState(initial?.color || COLOR_OPTIONS[0]);
  const [targetAmount, setTargetAmount] = useState(initial?.targetAmount ?? '');
  const [hasDeadline, setHasDeadline] = useState(!!initial?.deadline);
  const [deadline, setDeadline] = useState(initial?.deadline || '');
  const [linkedAccountId, setLinkedAccountId] = useState(initial?.linkedAccountId || '');
  const canSave = name.trim().length > 0 && Number(targetAmount) > 0;

  const save = () => {
    if (!canSave) return;
    onSave({
      id: initial?.id || uid(),
      name: name.trim(), icon, color,
      targetAmount: Number(targetAmount),
      currentAmount: initial?.currentAmount ?? 0,
      deadline: hasDeadline && deadline ? deadline : null,
      createdAt: initial?.createdAt || todayISO(),
      linkedAccountId: linkedAccountId || null,
      contributions: initial?.contributions || []
    });
  };

  return (
    <ModalShell t={t} title={initial ? 'Editar meta' : 'Nueva meta de ahorro'} onClose={onClose}>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre de la meta" autoFocus
        style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, marginBottom: 14, fontFamily: 'var(--font-body)', outline: 'none' }} />

      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Ícono</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        {GOAL_ICON_OPTIONS.map(ic=>(
          <button key={ic} onClick={()=>setIcon(ic)} style={{ width: 34, height: 34, borderRadius: 9, display:'flex', alignItems:'center', justifyContent:'center', cursor: 'pointer',
            border: `1px solid ${icon===ic?color:t.border}`, background: icon===ic?color+'22':t.surfaceAlt }}>
            <Icon name={ic} size={16} color={icon===ic?color:t.textMuted} />
          </button>
        ))}
      </div>

      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Color</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        {COLOR_OPTIONS.map(c=>(
          <button key={c} onClick={()=>setColor(c)} style={{ width: 26, height: 26, borderRadius: '50%', background: c, cursor: 'pointer', border: color===c?`2px solid ${t.text}`:'2px solid transparent' }} />
        ))}
      </div>

      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Monto objetivo</div>
      <MoneyInput value={targetAmount} onChange={setTargetAmount} placeholder="0"
        style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, marginBottom: 14, fontFamily: 'var(--font-body)', outline: 'none' }} />

      <button onClick={()=>setHasDeadline(v=>!v)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 12, padding: '11px 12px', cursor: 'pointer', marginBottom: hasDeadline?10:14 }}>
        <div style={{ flex: 1, textAlign: 'left', fontSize: 12.5, color: t.text }}>Tiene fecha límite</div>
        <div style={{ width: 36, height: 20, borderRadius: 10, background: hasDeadline ? t.accent : t.border, position: 'relative', flexShrink: 0 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: hasDeadline ? t.accentText : t.textMuted, position: 'absolute', top: 2, left: hasDeadline ? 18 : 2, transition: 'left .2s ease' }} />
        </div>
      </button>
      {hasDeadline && (
        <input type="date" value={deadline} onChange={e=>setDeadline(e.target.value)}
          style={{ width: '100%', marginBottom: 14, padding: '9px 10px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13, fontFamily: 'var(--font-body)' }} />
      )}

      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Cuenta vinculada (opcional)</div>
      <select value={linkedAccountId} onChange={e=>setLinkedAccountId(e.target.value)}
        style={{ width: '100%', marginBottom: 18, padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, fontFamily: 'var(--font-body)' }}>
        <option value="">Ninguna</option>
        {accounts.filter(a=>!a.archived).map(a=><option key={a.id} value={a.id}>{a.name}</option>)}
      </select>

      <div style={{ display: 'flex', gap: 10 }}>
        {initial && onDelete && (
          <button onClick={onDelete} style={{ padding: '12px 14px', borderRadius: 12, border: `1px solid ${t.expense}55`, background: 'transparent', color: t.expense, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
            <Icon name="Trash2" size={15} color={t.expense} />
          </button>
        )}
        <button disabled={!canSave} onClick={save}
          style={{ flex: 1, padding: '12px', borderRadius: 12, border: 'none', background: canSave?t.accent:t.surfaceAlt, color: canSave?t.accentText:t.textMuted, fontWeight: 700, fontSize: 13.5, cursor: canSave?'pointer':'not-allowed' }}>
          {initial ? 'Guardar cambios' : 'Crear meta'}
        </button>
      </div>
    </ModalShell>
  );
}

function ContributeModal({ t, accounts, settings, goal, onSave, onClose }) {
  const [direction, setDirection] = useState('aporte');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const otherAccounts = accounts.filter(a=>!a.archived && a.id !== goal.linkedAccountId);
  const [otherAccountId, setOtherAccountId] = useState(otherAccounts[0]?.id || '');
  const canSave = Number(amount) > 0 && (!goal.linkedAccountId || otherAccountId);

  const save = () => {
    if (!canSave) return;
    onSave({
      amount: Number(amount) * (direction === 'retiro' ? -1 : 1),
      note: note.trim(),
      otherAccountId: goal.linkedAccountId ? otherAccountId : null
    });
  };

  return (
    <ModalShell t={t} title={`Abonar · ${goal.name}`} onClose={onClose}>
      <SegmentedControl t={t} value={direction} onChange={setDirection} options={[{value:'aporte',label:'Aporte'},{value:'retiro',label:'Retiro'}]} />

      <div style={{ textAlign: 'center', margin: '18px 0 14px' }}>
        <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Monto</div>
        <MoneyInput autoFocus value={amount} onChange={setAmount} placeholder="0"
          style={{ width: '100%', textAlign: 'center', fontFamily: 'Fraunces, Georgia, serif', fontSize: 30, color: direction==='retiro'?t.expense:t.income, background: 'transparent', border: 'none', outline: 'none' }} />
      </div>

      {goal.linkedAccountId && (
        <>
          <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
            {direction === 'retiro' ? 'Cuenta de destino' : 'Cuenta de origen'}
          </div>
          <select value={otherAccountId} onChange={e=>setOtherAccountId(e.target.value)}
            style={{ width: '100%', marginBottom: 14, padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, fontFamily: 'var(--font-body)' }}>
            {otherAccounts.map(a=><option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </>
      )}

      <input value={note} onChange={e=>setNote(e.target.value)} placeholder="Nota (opcional)"
        style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13, marginBottom: 18, fontFamily: 'var(--font-body)', outline: 'none' }} />

      <button disabled={!canSave} onClick={save}
        style={{ width: '100%', padding: '12px', borderRadius: 12, border: 'none', background: canSave?t.accent:t.surfaceAlt, color: canSave?t.accentText:t.textMuted, fontWeight: 700, fontSize: 13.5, cursor: canSave?'pointer':'not-allowed' }}>
        Guardar
      </button>
    </ModalShell>
  );
}

function DebtModal({ t, accounts, settings, initial, onSave, onDelete, onClose }) {
  const [name, setName] = useState(initial?.name || '');
  const [type, setType] = useState(initial?.type || 'loan');
  const [icon, setIcon] = useState(initial?.icon || DEBT_TYPES[0].icon);
  const [color, setColor] = useState(initial?.color || COLOR_OPTIONS[0]);
  const [originalAmount, setOriginalAmount] = useState(initial?.originalAmount ?? '');
  const [currentBalance, setCurrentBalance] = useState(initial?.currentBalance ?? '');
  const [interestRate, setInterestRate] = useState(initial?.interestRate ?? '');
  const [minimumPayment, setMinimumPayment] = useState(initial?.minimumPayment ?? '');
  const [dueDate, setDueDate] = useState(initial?.dueDate ?? '');
  const [startDate, setStartDate] = useState(initial?.startDate || todayISO());
  const [linkedAccountId, setLinkedAccountId] = useState(initial?.linkedAccountId || '');
  const [note, setNote] = useState(initial?.note || '');
  const canSave = name.trim().length > 0 && Number(originalAmount) > 0;

  const chooseType = (val) => {
    setType(val);
    const def = DEBT_TYPES.find(d=>d.value===val);
    if (def) setIcon(def.icon);
  };

  const save = () => {
    if (!canSave) return;
    onSave({
      id: initial?.id || uid(),
      name: name.trim(), type, icon, color,
      originalAmount: Number(originalAmount),
      currentBalance: currentBalance !== '' ? Number(currentBalance) : Number(originalAmount),
      interestRate: interestRate !== '' ? Number(interestRate) : null,
      minimumPayment: minimumPayment !== '' ? Number(minimumPayment) : null,
      dueDate: dueDate !== '' ? Number(dueDate) : null,
      startDate,
      linkedAccountId: linkedAccountId || null,
      note: note.trim(),
      payments: initial?.payments || []
    });
  };

  return (
    <ModalShell t={t} title={initial ? 'Editar deuda' : 'Nueva deuda'} onClose={onClose}>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre de la deuda (ej. Le debo a Pablo)" autoFocus
        style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, marginBottom: 14, fontFamily: 'var(--font-body)', outline: 'none' }} />

      <input value={note} onChange={e=>setNote(e.target.value)} placeholder="Nota (ej. motivo: perfumes)"
        style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, marginBottom: 14, fontFamily: 'var(--font-body)', outline: 'none' }} />

      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Tipo de deuda</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        {DEBT_TYPES.map(dt=>(
          <button key={dt.value} onClick={()=>chooseType(dt.value)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px 7px 7px', borderRadius: 20, cursor: 'pointer',
              border: `1px solid ${type===dt.value ? color : t.border}`, background: type===dt.value ? color+'22' : t.surfaceAlt }}>
            <Icon name={dt.icon} size={13} color={type===dt.value?color:t.textMuted} />
            <span style={{ fontSize: 12, color: t.text }}>{dt.label}</span>
          </button>
        ))}
      </div>

      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Color</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        {COLOR_OPTIONS.map(c=>(
          <button key={c} onClick={()=>setColor(c)} style={{ width: 26, height: 26, borderRadius: '50%', background: c, cursor: 'pointer', border: color===c?`2px solid ${t.text}`:'2px solid transparent' }} />
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Monto original</div>
          <MoneyInput value={originalAmount} onChange={setOriginalAmount} placeholder="0"
            style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, fontFamily: 'var(--font-body)', outline: 'none' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Saldo actual</div>
          <MoneyInput value={currentBalance} onChange={setCurrentBalance} placeholder={originalAmount || '0'}
            style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, fontFamily: 'var(--font-body)', outline: 'none' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Tasa anual %</div>
          <input type="number" min="0" step="0.1" value={interestRate} onChange={e=>setInterestRate(e.target.value)} placeholder="Opcional"
            style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, fontFamily: 'var(--font-body)', outline: 'none' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Cuota mínima</div>
          <MoneyInput value={minimumPayment} onChange={setMinimumPayment} placeholder="Opcional"
            style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, fontFamily: 'var(--font-body)', outline: 'none' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Día de pago</div>
          <input type="number" min="1" max="31" value={dueDate} onChange={e=>setDueDate(e.target.value)} placeholder="1-31"
            style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, fontFamily: 'var(--font-body)', outline: 'none' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Fecha inicio</div>
          <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)}
            style={{ width: '100%', padding: '9px 10px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13, fontFamily: 'var(--font-body)' }} />
        </div>
      </div>

      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Cuenta vinculada (opcional)</div>
      <select value={linkedAccountId} onChange={e=>setLinkedAccountId(e.target.value)}
        style={{ width: '100%', marginBottom: 18, padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, fontFamily: 'var(--font-body)' }}>
        <option value="">Ninguna</option>
        {accounts.filter(a=>!a.archived).map(a=><option key={a.id} value={a.id}>{a.name}</option>)}
      </select>

      <div style={{ display: 'flex', gap: 10 }}>
        {initial && onDelete && (
          <button onClick={onDelete} style={{ padding: '12px 14px', borderRadius: 12, border: `1px solid ${t.expense}55`, background: 'transparent', color: t.expense, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
            <Icon name="Trash2" size={15} color={t.expense} />
          </button>
        )}
        <button disabled={!canSave} onClick={save}
          style={{ flex: 1, padding: '12px', borderRadius: 12, border: 'none', background: canSave?t.accent:t.surfaceAlt, color: canSave?t.accentText:t.textMuted, fontWeight: 700, fontSize: 13.5, cursor: canSave?'pointer':'not-allowed' }}>
          {initial ? 'Guardar cambios' : 'Crear deuda'}
        </button>
      </div>
    </ModalShell>
  );
}

function AdjustPaymentModal({ t, accounts, rec, dueDate, onConfirm, onClose }) {
  const activeAccounts = accounts.filter(a=>!a.archived);
  const [amount, setAmount] = useState(rec.amount ?? '');
  const [date, setDate] = useState(dueDate || todayISO());
  const [accountId, setAccountId] = useState(rec.accountId || activeAccounts[0]?.id || '');
  const canSave = Number(amount) > 0 && !!accountId && !!date;

  const save = () => {
    if (!canSave) return;
    onConfirm({ amount: Number(amount), date, accountId });
  };

  return (
    <ModalShell t={t} title={rec.name || rec.note || 'Ajustar pago'} onClose={onClose}>
      <div style={{ fontSize: 12.5, color: t.textMuted, marginBottom: 14 }}>Programado para el {dueDate}</div>

      <div style={{ textAlign: 'center', margin: '4px 0 14px' }}>
        <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Monto pagado</div>
        <MoneyInput autoFocus value={amount} onChange={setAmount} placeholder="0"
          style={{ width: '100%', textAlign: 'center', fontFamily: 'Fraunces, Georgia, serif', fontSize: 30, color: rec.type==='income'?t.income:t.expense, background: 'transparent', border: 'none', outline: 'none' }} />
      </div>

      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Fecha real del pago</div>
      <input type="date" value={date} onChange={e=>setDate(e.target.value)}
        style={{ width: '100%', marginBottom: 14, padding: '9px 10px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13, fontFamily: 'var(--font-body)' }} />

      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Cuenta</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
        {activeAccounts.map(a=>(
          <button key={a.id} onClick={()=>setAccountId(a.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px 7px 7px', borderRadius: 20, cursor: 'pointer',
              border: `1px solid ${accountId===a.id ? a.color : t.border}`, background: accountId===a.id ? a.color+'22' : t.surfaceAlt }}>
            <div style={{ width: 20, height: 20, borderRadius: 6, background: a.color+'33', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Icon name={a.icon} size={12} color={a.color} />
            </div>
            <span style={{ fontSize: 12, color: t.text }}>{a.name}</span>
          </button>
        ))}
      </div>

      <button disabled={!canSave} onClick={save}
        style={{ width: '100%', padding: '12px', borderRadius: 12, border: 'none', background: canSave?t.accent:t.surfaceAlt, color: canSave?t.accentText:t.textMuted, fontWeight: 700, fontSize: 13.5, cursor: canSave?'pointer':'not-allowed' }}>
        Registrar pago
      </button>
    </ModalShell>
  );
}

function DebtPaymentModal({ t, accounts, settings, debt, onSave, onClose }) {
  const activeAccounts = accounts.filter(a=>!a.archived);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [accountId, setAccountId] = useState(debt.linkedAccountId || activeAccounts[0]?.id || '');
  const canSave = Number(amount) > 0 && !!accountId;

  const save = () => {
    if (!canSave) return;
    onSave({ amount: Number(amount), note: note.trim(), accountId });
  };

  return (
    <ModalShell t={t} title={`Registrar pago · ${debt.name}`} onClose={onClose}>
      <div style={{ textAlign: 'center', margin: '4px 0 14px' }}>
        <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Monto del pago</div>
        <MoneyInput autoFocus value={amount} onChange={setAmount} placeholder="0"
          style={{ width: '100%', textAlign: 'center', fontFamily: 'Fraunces, Georgia, serif', fontSize: 30, color: t.income, background: 'transparent', border: 'none', outline: 'none' }} />
      </div>

      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Descontar de la cuenta</div>
      <select value={accountId} onChange={e=>setAccountId(e.target.value)}
        style={{ width: '100%', marginBottom: 14, padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, fontFamily: 'var(--font-body)' }}>
        {activeAccounts.length === 0 && <option value="">Sin cuentas disponibles</option>}
        {activeAccounts.map(a=><option key={a.id} value={a.id}>{a.name}</option>)}
      </select>

      <input value={note} onChange={e=>setNote(e.target.value)} placeholder="Nota (opcional)"
        style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13, marginBottom: 18, fontFamily: 'var(--font-body)', outline: 'none' }} />

      <button disabled={!canSave} onClick={save}
        style={{ width: '100%', padding: '12px', borderRadius: 12, border: 'none', background: canSave?t.accent:t.surfaceAlt, color: canSave?t.accentText:t.textMuted, fontWeight: 700, fontSize: 13.5, cursor: canSave?'pointer':'not-allowed' }}>
        Registrar pago
      </button>
    </ModalShell>
  );
}

function ReceivableModal({ t, accounts, settings, initial, onSave, onDelete, onClose }) {
  const [name, setName] = useState(initial?.name || '');
  const [type, setType] = useState(initial?.type || 'persona');
  const [icon, setIcon] = useState(initial?.icon || RECEIVABLE_TYPES[0].icon);
  const [color, setColor] = useState(initial?.color || COLOR_OPTIONS[0]);
  const [originalAmount, setOriginalAmount] = useState(initial?.originalAmount ?? '');
  const [currentBalance, setCurrentBalance] = useState(initial?.currentBalance ?? '');
  const [dueDate, setDueDate] = useState(initial?.dueDate ?? '');
  const [startDate, setStartDate] = useState(initial?.startDate || todayISO());
  const [linkedAccountId, setLinkedAccountId] = useState(initial?.linkedAccountId || '');
  const [note, setNote] = useState(initial?.note || '');
  const canSave = name.trim().length > 0 && Number(originalAmount) > 0;

  const chooseType = (val) => {
    setType(val);
    const def = RECEIVABLE_TYPES.find(d=>d.value===val);
    if (def) setIcon(def.icon);
  };

  const save = () => {
    if (!canSave) return;
    onSave({
      id: initial?.id || uid(),
      name: name.trim(), type, icon, color,
      originalAmount: Number(originalAmount),
      currentBalance: currentBalance !== '' ? Number(currentBalance) : Number(originalAmount),
      dueDate: dueDate !== '' ? Number(dueDate) : null,
      startDate,
      linkedAccountId: linkedAccountId || null,
      note: note.trim(),
      payments: initial?.payments || []
    });
  };

  return (
    <ModalShell t={t} title={initial ? 'Editar por cobrar' : 'Nueva cuenta por cobrar'} onClose={onClose}>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre (ej. Me debe Pablo)" autoFocus
        style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, marginBottom: 14, fontFamily: 'var(--font-body)', outline: 'none' }} />

      <input value={note} onChange={e=>setNote(e.target.value)} placeholder="Nota (ej. motivo: patines)"
        style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, marginBottom: 14, fontFamily: 'var(--font-body)', outline: 'none' }} />

      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Tipo</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        {RECEIVABLE_TYPES.map(dt=>(
          <button key={dt.value} onClick={()=>chooseType(dt.value)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px 7px 7px', borderRadius: 20, cursor: 'pointer',
              border: `1px solid ${type===dt.value ? color : t.border}`, background: type===dt.value ? color+'22' : t.surfaceAlt }}>
            <Icon name={dt.icon} size={13} color={type===dt.value?color:t.textMuted} />
            <span style={{ fontSize: 12, color: t.text }}>{dt.label}</span>
          </button>
        ))}
      </div>

      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Color</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        {COLOR_OPTIONS.map(c=>(
          <button key={c} onClick={()=>setColor(c)} style={{ width: 26, height: 26, borderRadius: '50%', background: c, cursor: 'pointer', border: color===c?`2px solid ${t.text}`:'2px solid transparent' }} />
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Monto original</div>
          <MoneyInput value={originalAmount} onChange={setOriginalAmount} placeholder="0"
            style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, fontFamily: 'var(--font-body)', outline: 'none' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Saldo pendiente</div>
          <MoneyInput value={currentBalance} onChange={setCurrentBalance} placeholder={originalAmount || '0'}
            style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, fontFamily: 'var(--font-body)', outline: 'none' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Día de cobro</div>
          <input type="number" min="1" max="31" value={dueDate} onChange={e=>setDueDate(e.target.value)} placeholder="1-31"
            style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, fontFamily: 'var(--font-body)', outline: 'none' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Fecha inicio</div>
          <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)}
            style={{ width: '100%', padding: '9px 10px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13, fontFamily: 'var(--font-body)' }} />
        </div>
      </div>

      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Cuenta vinculada (opcional)</div>
      <select value={linkedAccountId} onChange={e=>setLinkedAccountId(e.target.value)}
        style={{ width: '100%', marginBottom: 18, padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, fontFamily: 'var(--font-body)' }}>
        <option value="">Ninguna</option>
        {accounts.filter(a=>!a.archived).map(a=><option key={a.id} value={a.id}>{a.name}</option>)}
      </select>

      <div style={{ display: 'flex', gap: 10 }}>
        {initial && onDelete && (
          <button onClick={onDelete} style={{ padding: '12px 14px', borderRadius: 12, border: `1px solid ${t.expense}55`, background: 'transparent', color: t.expense, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
            <Icon name="Trash2" size={15} color={t.expense} />
          </button>
        )}
        <button disabled={!canSave} onClick={save}
          style={{ flex: 1, padding: '12px', borderRadius: 12, border: 'none', background: canSave?t.accent:t.surfaceAlt, color: canSave?t.accentText:t.textMuted, fontWeight: 700, fontSize: 13.5, cursor: canSave?'pointer':'not-allowed' }}>
          {initial ? 'Guardar cambios' : 'Crear'}
        </button>
      </div>
    </ModalShell>
  );
}

function ReceivablePaymentModal({ t, accounts, settings, receivable, onSave, onClose }) {
  const activeAccounts = accounts.filter(a=>!a.archived);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [accountId, setAccountId] = useState(receivable.linkedAccountId || activeAccounts[0]?.id || '');
  const canSave = Number(amount) > 0 && !!accountId;

  const save = () => {
    if (!canSave) return;
    onSave({ amount: Number(amount), note: note.trim(), accountId });
  };

  return (
    <ModalShell t={t} title={`Registrar abono · ${receivable.name}`} onClose={onClose}>
      <div style={{ textAlign: 'center', margin: '4px 0 14px' }}>
        <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Monto abonado</div>
        <MoneyInput autoFocus value={amount} onChange={setAmount} placeholder="0"
          style={{ width: '100%', textAlign: 'center', fontFamily: 'Fraunces, Georgia, serif', fontSize: 30, color: t.income, background: 'transparent', border: 'none', outline: 'none' }} />
      </div>

      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Ingresar a la cuenta</div>
      <select value={accountId} onChange={e=>setAccountId(e.target.value)}
        style={{ width: '100%', marginBottom: 14, padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13.5, fontFamily: 'var(--font-body)' }}>
        {activeAccounts.length === 0 && <option value="">Sin cuentas disponibles</option>}
        {activeAccounts.map(a=><option key={a.id} value={a.id}>{a.name}</option>)}
      </select>

      <input value={note} onChange={e=>setNote(e.target.value)} placeholder="Nota (opcional)"
        style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 13, marginBottom: 18, fontFamily: 'var(--font-body)', outline: 'none' }} />

      <button disabled={!canSave} onClick={save}
        style={{ width: '100%', padding: '12px', borderRadius: 12, border: 'none', background: canSave?t.accent:t.surfaceAlt, color: canSave?t.accentText:t.textMuted, fontWeight: 700, fontSize: 13.5, cursor: canSave?'pointer':'not-allowed' }}>
        Registrar abono
      </button>
    </ModalShell>
  );
}

function PinSetupModal({ t, onSave, onClose }) {
  const [pin, setPin] = useState('');
  const [confirm, setConfirm] = useState('');
  const canSave = pin.length === 4 && pin === confirm;
  return (
    <ModalShell t={t} title="Activar bloqueo con PIN" onClose={onClose}>
      <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 16, lineHeight: 1.5 }}>Es un bloqueo simple para tu privacidad personal, no un cifrado de seguridad.</div>
      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Nuevo PIN (4 dígitos)</div>
      <input type="password" inputMode="numeric" maxLength={4} value={pin} onChange={e=>setPin(e.target.value.replace(/\D/g,''))}
        style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 18, letterSpacing: '0.4em', marginBottom: 14, textAlign: 'center' }} />
      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Confirmar PIN</div>
      <input type="password" inputMode="numeric" maxLength={4} value={confirm} onChange={e=>setConfirm(e.target.value.replace(/\D/g,''))}
        style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 18, letterSpacing: '0.4em', marginBottom: 20, textAlign: 'center' }} />
      <button disabled={!canSave} onClick={()=>onSave(pin)}
        style={{ width: '100%', padding: '12px', borderRadius: 12, border: 'none', background: canSave?t.accent:t.surfaceAlt, color: canSave?t.accentText:t.textMuted, fontWeight: 700, fontSize: 13.5, cursor: canSave?'pointer':'not-allowed' }}>
        Activar PIN
      </button>
    </ModalShell>
  );
}

function PinDisableModal({ t, actualPin, onConfirm, onClose }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const submit = () => { if (pin === actualPin) onConfirm(); else { setError(true); setPin(''); } };
  return (
    <ModalShell t={t} title="Desactivar bloqueo" onClose={onClose}>
      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Ingresa tu PIN actual</div>
      <input type="password" inputMode="numeric" maxLength={4} value={pin} onChange={e=>{setPin(e.target.value.replace(/\D/g,'')); setError(false);}}
        style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${error?t.expense:t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 18, letterSpacing: '0.4em', marginBottom: 10, textAlign: 'center' }} />
      {error && <div style={{ fontSize: 12, color: t.expense, marginBottom: 10 }}>PIN incorrecto.</div>}
      <button disabled={pin.length!==4} onClick={submit}
        style={{ width: '100%', padding: '12px', borderRadius: 12, border: 'none', marginTop: 8, background: pin.length===4?t.expense:t.surfaceAlt, color: pin.length===4?'#fff':t.textMuted, fontWeight: 700, fontSize: 13.5, cursor: pin.length===4?'pointer':'not-allowed' }}>
        Desactivar
      </button>
    </ModalShell>
  );
}

function ResetConfirmModal({ t, onConfirm, onClose }) {
  const [step, setStep] = useState(1);
  return (
    <ModalShell t={t} title="Borrar todos los datos" onClose={onClose}>
      <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 20, lineHeight: 1.5 }}>
        Esta acción eliminará todos tus movimientos, presupuestos y categorías personalizadas. No se puede deshacer.
      </div>
      {step===1 ? (
        <button onClick={()=>setStep(2)} style={{ width: '100%', padding: '12px', borderRadius: 12, border: `1px solid ${t.expense}`, background: 'transparent', color: t.expense, fontWeight: 700, fontSize: 13.5, cursor: 'pointer' }}>
          Quiero borrar todo
        </button>
      ) : (
        <button onClick={onConfirm} style={{ width: '100%', padding: '12px', borderRadius: 12, border: 'none', background: t.expense, color: '#fff', fontWeight: 700, fontSize: 13.5, cursor: 'pointer' }}>
          Sí, borrar todo definitivamente
        </button>
      )}
    </ModalShell>
  );
}

function ImportConfirmModal({ t, importedData, onConfirm, onClose }) {
  const txCount = (importedData.transactions || []).length;
  return (
    <ModalShell t={t} title="Importar respaldo" onClose={onClose}>
      <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 20, lineHeight: 1.5 }}>
        Este archivo contiene <b style={{ color: t.text }}>{txCount} movimiento{txCount===1?'':'s'}</b>. Esto <b style={{ color: t.expense }}>reemplazará TODOS tus datos actuales</b> (cuentas, categorías, presupuestos, metas y deudas). No se puede deshacer.
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: 12, border: `1px solid ${t.border}`, background: 'transparent', color: t.textMuted, fontSize: 13, cursor: 'pointer' }}>Cancelar</button>
        <button onClick={onConfirm} style={{ flex: 1, padding: '12px', borderRadius: 12, border: 'none', background: t.expense, color: '#fff', fontWeight: 700, fontSize: 13.5, cursor: 'pointer' }}>Reemplazar datos</button>
      </div>
    </ModalShell>
  );
}

function CsvImportModal({ t, headers, rows, categories, accounts, onImport, onClose }) {
  const [dateCol, setDateCol] = useState('0');
  const [amountCol, setAmountCol] = useState('1');
  const [typeCol, setTypeCol] = useState('');
  const [catCol, setCatCol] = useState('');
  const [noteCol, setNoteCol] = useState('');

  const preview = rows.slice(0, 5);

  const buildTransactions = () => {
    const defaultAccountId = (accounts.find(a=>!a.archived) || accounts[0])?.id || '';
    return rows.map(row => {
      const date = guessDateISO(row[Number(dateCol)]) || todayISO();
      const rawAmount = (row[Number(amountCol)] || '0').replace(/[^0-9.\-]/g, '');
      const amount = Math.abs(parseFloat(rawAmount)) || 0;
      let type = 'expense';
      if (typeCol !== '') {
        const tv = (row[Number(typeCol)] || '').toLowerCase();
        type = tv.includes('ingreso') || tv.includes('income') ? 'income' : 'expense';
      } else {
        type = parseFloat(rawAmount) >= 0 ? 'income' : 'expense';
      }
      let category = '';
      if (catCol !== '') {
        const catName = (row[Number(catCol)] || '').trim().toLowerCase();
        const match = categories.find(c => c.type === type && c.name.toLowerCase() === catName);
        category = match ? match.id : (categories.find(c=>c.id === (type==='income'?'otros_ingreso':'otros_gasto'))?.id || '');
      } else {
        category = categories.find(c=>c.id === (type==='income'?'otros_ingreso':'otros_gasto'))?.id || '';
      }
      const note = noteCol !== '' ? (row[Number(noteCol)] || '') : '';
      return { id: uid(), createdAt: Date.now(), type, amount, category, date, note, accountId: defaultAccountId, tags: [] };
    }).filter(tx => tx.amount > 0);
  };

  const importCount = rows.length;

  return (
    <ModalShell t={t} title="Importar desde CSV" onClose={onClose}>
      <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 14 }}>Indica qué columna corresponde a cada dato ({headers.length} columnas detectadas).</div>

      {[
        { label: 'Fecha', val: dateCol, set: setDateCol, required: true },
        { label: 'Monto', val: amountCol, set: setAmountCol, required: true },
        { label: 'Tipo (ingreso/gasto)', val: typeCol, set: setTypeCol, required: false },
        { label: 'Categoría', val: catCol, set: setCatCol, required: false },
        { label: 'Nota', val: noteCol, set: setNoteCol, required: false },
      ].map(f => (
        <div key={f.label} style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{f.label}</div>
          <select value={f.val} onChange={e=>f.set(e.target.value)}
            style={{ width: '100%', padding: '8px 10px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.text, fontSize: 12.5, fontFamily: 'var(--font-body)' }}>
            {!f.required && <option value="">— No usar —</option>}
            {headers.map((h,i)=><option key={i} value={i}>{h || `Columna ${i+1}`}</option>)}
          </select>
        </div>
      ))}

      <div style={{ overflowX: 'auto', marginBottom: 14, marginTop: 8 }}>
        <table style={{ borderCollapse: 'collapse', fontSize: 11, color: t.textMuted, width: '100%' }}>
          <thead>
            <tr>{headers.map((h,i)=><th key={i} style={{ textAlign: 'left', padding: '4px 8px', borderBottom: `1px solid ${t.border}`, whiteSpace: 'nowrap' }}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {preview.map((row,ri)=>(
              <tr key={ri}>{row.map((cell,ci)=><td key={ci} style={{ padding: '4px 8px', borderBottom: `1px solid ${t.border}`, whiteSpace: 'nowrap' }}>{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={()=>onImport(buildTransactions())}
        style={{ width: '100%', padding: '12px', borderRadius: 12, border: 'none', background: t.accent, color: t.accentText, fontWeight: 700, fontSize: 13.5, cursor: 'pointer' }}>
        Importar {importCount} movimiento{importCount===1?'':'s'}
      </button>
    </ModalShell>
  );
}

/* ---------------------------------- PANTALLA DE BLOQUEO ---------------------------------- */
function LockScreen({ t, actualPin, biometricCredentialId, onUnlock }) {
  const [entry, setEntry] = useState('');
  const [shake, setShake] = useState(false);
  const [biometricTried, setBiometricTried] = useState(false);
  const attemptingRef = useRef(false);

  const press = (d) => {
    if (entry.length >= 4) return;
    const next = entry + d;
    setEntry(next);
    if (next.length === 4) {
      setTimeout(() => {
        if (next === actualPin) onUnlock();
        else { setShake(true); setTimeout(()=>{ setShake(false); setEntry(''); }, 400); }
      }, 120);
    }
  };

  const tryBiometric = useCallback(async () => {
    if (!biometricCredentialId || attemptingRef.current) return;
    attemptingRef.current = true;
    setBiometricTried(true);
    try {
      const ok = await verifyBiometricCredential(biometricCredentialId);
      if (ok) onUnlock();
    } catch { /* usuario canceló o falló — se queda en el PIN */ }
    finally { attemptingRef.current = false; }
  }, [biometricCredentialId, onUnlock]);

  useEffect(() => { tryBiometric(); }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, maxWidth: 430, margin: '0 auto', background: t.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
      <div style={{ width: 52, height: 52, borderRadius: 16, background: t.surfaceAlt, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
        <Icon name="Lock" size={22} color={t.accent} />
      </div>
      <div style={{ fontSize: 15, color: t.text, fontWeight: 600, marginBottom: 20, fontFamily: 'Fraunces, Georgia, serif' }}>Ingresa tu PIN</div>

      {biometricCredentialId && (
        <button onClick={tryBiometric}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 20, padding: '9px 16px', marginBottom: 24, cursor: 'pointer' }}>
          <Icon name="Fingerprint" size={16} color={t.accent} />
          <span style={{ fontSize: 12.5, color: t.text, fontWeight: 600 }}>{biometricTried ? 'Intentar de nuevo' : 'Usar Face ID / Huella'}</span>
        </button>
      )}

      <div className={shake ? 'fz-shake' : ''} style={{ display: 'flex', gap: 12, marginBottom: 30 }}>
        {[0,1,2,3].map(i=>(
          <div key={i} style={{ width: 13, height: 13, borderRadius: '50%', background: i < entry.length ? t.accent : 'transparent', border: `1.5px solid ${t.border}` }} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 62px)', gap: 14 }}>
        {['1','2','3','4','5','6','7','8','9','','0','del'].map((d,i)=> d==='' ? <div key={i} /> : (
          <button key={i} onClick={()=> d==='del' ? setEntry(entry.slice(0,-1)) : press(d)}
            style={{ width: 62, height: 62, borderRadius: '50%', border: `1px solid ${t.border}`, background: t.surface, color: t.text, fontSize: 18, cursor: 'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            {d==='del' ? <span style={{ fontSize: 16, color: t.textMuted }}>⌫</span> : d}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- NAV INFERIOR ---------------------------------- */
const TABS = [
  { id: 'inicio', label: 'Inicio', icon: 'Home' },
  { id: 'historial', label: 'Historial', icon: 'Clock' },
  { id: 'presupuestos', label: 'Metas', icon: 'Target' },
  { id: 'reportes', label: 'Reportes', icon: 'PieIcon' },
  { id: 'ajustes', label: 'Ajustes', icon: 'Settings' },
];
function BottomNav({ tab, setTab, t }) {
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 66, background: t.surface, borderTop: `1px solid ${t.border}`, display: 'flex', zIndex: 10, pointerEvents: 'auto' }}>
      {TABS.map(tb=>{
        const active = tab===tb.id;
        return (
          <button key={tb.id} onClick={()=>setTab(tb.id)} style={{ flex: 1, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
            <Icon name={tb.icon} size={19} color={active ? t.accent : t.textMuted} />
            <span style={{ fontSize: 10, color: active ? t.accent : t.textMuted, fontWeight: active?700:500 }}>{tb.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------- ONBOARDING ---------------------------------- */
const ONBOARDING_ACCOUNT_OPTIONS = [
  { id: 'efectivo', name: 'Efectivo', type: 'cash', icon: 'Banknote', color: '#8FBFA0' },
  { id: 'banco', name: 'Cuenta bancaria', type: 'bank', icon: 'Landmark', color: '#8FA7D9' },
  { id: 'tarjeta', name: 'Tarjeta de crédito', type: 'credit_card', icon: 'CreditCard', color: '#D98C7A' },
  { id: 'digital', name: 'Nequi / Daviplata', type: 'digital_wallet', icon: 'Smartphone', color: '#B79FD9' },
];

function OnboardingScreen({ t, onComplete }) {
  const [step, setStep] = useState(0);
  const [currency, setCurrency] = useState('COP');
  const [selected, setSelected] = useState(['efectivo']);
  const [balances, setBalances] = useState({});

  const toggleAccount = (id) => setSelected(s => s.includes(id) ? s.filter(x=>x!==id) : [...s, id]);

  const finish = () => {
    const accounts = ONBOARDING_ACCOUNT_OPTIONS.filter(o=>selected.includes(o.id)).map((o,i)=>({
      id: o.id, name: o.name, type: o.type, icon: o.icon, color: o.color,
      initialBalance: Number(balances[o.id]) || 0, currency, includeInTotal: true, archived: false, order: i
    }));
    onComplete(accounts.length ? accounts : DEFAULT_ACCOUNTS, currency);
  };

  const wrap = (children) => (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px 28px', background: t.bg }}>
      {children}
    </div>
  );

  if (step === 0) {
    return wrap(
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🌾</div>
        <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 26, color: t.text, fontWeight: 600, marginBottom: 10 }}>Bienvenido a Mis Finanzas</div>
        <div style={{ fontSize: 13.5, color: t.textMuted, lineHeight: 1.5, marginBottom: 30 }}>Vamos a configurar rápidamente tus cuentas para que empieces a registrar tus movimientos.</div>
        <button onClick={()=>setStep(1)} style={{ width: '100%', padding: '13px', borderRadius: 12, border: 'none', background: t.accent, color: t.accentText, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Empezar</button>
      </div>
    );
  }

  if (step === 1) {
    return wrap(
      <div>
        <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Paso 1 de 3</div>
        <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 21, color: t.text, fontWeight: 600, marginBottom: 18 }}>¿Cuál es tu moneda principal?</div>
        <select value={currency} onChange={e=>setCurrency(e.target.value)}
          style={{ width: '100%', marginBottom: 24, padding: '12px 14px', borderRadius: 12, border: `1px solid ${t.border}`, background: t.surface, color: t.text, fontSize: 15, fontFamily: 'var(--font-body)' }}>
          {CURRENCIES.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={()=>setStep(2)} style={{ width: '100%', padding: '13px', borderRadius: 12, border: 'none', background: t.accent, color: t.accentText, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Continuar</button>
      </div>
    );
  }

  if (step === 2) {
    return wrap(
      <div>
        <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Paso 2 de 3</div>
        <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 21, color: t.text, fontWeight: 600, marginBottom: 18 }}>¿Qué cuentas quieres usar?</div>
        <div style={{ marginBottom: 24 }}>
          {ONBOARDING_ACCOUNT_OPTIONS.map(o=>{
            const checked = selected.includes(o.id);
            return (
              <button key={o.id} onClick={()=>toggleAccount(o.id)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12, marginBottom: 8, cursor: 'pointer',
                  border: `1px solid ${checked ? o.color : t.border}`, background: checked ? o.color+'1a' : t.surface }}>
                <Icon name={o.icon} size={17} color={checked ? o.color : t.textMuted} />
                <span style={{ flex: 1, textAlign: 'left', fontSize: 13.5, color: t.text }}>{o.name}</span>
                {checked && <Icon name="Check" size={15} color={o.color} />}
              </button>
            );
          })}
        </div>
        <button disabled={!selected.length} onClick={()=>setStep(3)}
          style={{ width: '100%', padding: '13px', borderRadius: 12, border: 'none', background: selected.length?t.accent:t.surfaceAlt, color: selected.length?t.accentText:t.textMuted, fontWeight: 700, fontSize: 14, cursor: selected.length?'pointer':'not-allowed' }}>
          Continuar
        </button>
      </div>
    );
  }

  return wrap(
    <div>
      <div style={{ fontSize: 11, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Paso 3 de 3</div>
      <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 21, color: t.text, fontWeight: 600, marginBottom: 18 }}>¿Cuál es tu saldo actual?</div>
      <div style={{ marginBottom: 24 }}>
        {ONBOARDING_ACCOUNT_OPTIONS.filter(o=>selected.includes(o.id)).map(o=>(
          <div key={o.id} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11.5, color: t.textMuted, marginBottom: 5 }}>{o.name}</div>
            <MoneyInput value={balances[o.id] || ''} onChange={(v)=>setBalances(b=>({ ...b, [o.id]: v }))} placeholder="0"
              style={{ width: '100%', padding: '11px 12px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surface, color: t.text, fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none' }} />
          </div>
        ))}
      </div>
      <button onClick={finish} style={{ width: '100%', padding: '13px', borderRadius: 12, border: 'none', background: t.accent, color: t.accentText, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
        ¡Listo! Empezar
      </button>
    </div>
  );
}

/* ---------------------------------- APP PRINCIPAL ---------------------------------- */
function useSystemTheme() {
  const [systemTheme, setSystemTheme] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  ));
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const update = (e) => setSystemTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener ? mq.addEventListener('change', update) : mq.addListener(update);
    return () => { mq.removeEventListener ? mq.removeEventListener('change', update) : mq.removeListener(update); };
  }, []);
  return systemTheme;
}

function App() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState('inicio');
  const [metasSubTab, setMetasSubTab] = useState('budgets');
  const [balanceHidden, setBalanceHidden] = useState(() => {
    try { return localStorage.getItem('fz_balance_hidden') === '1'; } catch { return false; }
  });
  useEffect(() => {
    try { localStorage.setItem('fz_balance_hidden', balanceHidden ? '1' : '0'); } catch {}
  }, [balanceHidden]);
  const goTo = (nextTab, subTab) => { setTab(nextTab); if (subTab) setMetasSubTab(subTab); };
  const [sheet, setSheet] = useState(null); // null | {} (new) | transaction (edit)
  const [modal, setModal] = useState({ type: null });
  const [quickAddCat, setQuickAddCat] = useState(null);
  const [locked, setLocked] = useState(false);

  const anyOverlayOpen = sheet !== null || modal.type !== null || quickAddCat !== null;

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const updateViewport = () => {
      document.documentElement.style.setProperty('--fz-vvh', vv.height + 'px');
      document.documentElement.style.setProperty('--fz-vvt', vv.offsetTop + 'px');
    };
    updateViewport();
    vv.addEventListener('resize', updateViewport);
    vv.addEventListener('scroll', updateViewport);
    return () => {
      vv.removeEventListener('resize', updateViewport);
      vv.removeEventListener('scroll', updateViewport);
    };
  }, []);

  useEffect(() => {
    if (!anyOverlayOpen) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const prev = { position: body.style.position, top: body.style.top, left: body.style.left, right: body.style.right, width: body.style.width };
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      window.scrollTo(0, scrollY);
    };
  }, [anyOverlayOpen]);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY, false);
        if (res && res.value) {
          const parsed = JSON.parse(res.value);
          let merged = {
            transactions: parsed.transactions || [],
            categories: (parsed.categories && parsed.categories.length) ? parsed.categories : DEFAULT_CATEGORIES,
            budgets: parsed.budgets || {},
            settings: { ...DEFAULT_DATA.settings, ...(parsed.settings || {}), onboardingCompleted: true },
            accounts: parsed.accounts,
            recurringTransactions: parsed.recurringTransactions || [],
            savingsGoals: parsed.savingsGoals || [],
            debts: parsed.debts || [],
            receivables: parsed.receivables || [],
            tags: parsed.tags || []
          };
          if (!merged.accounts || !merged.accounts.length) {
            merged = migrateV1toV2(merged);
          }
          merged = { ...merged, accounts: ensureDefaultAccounts(merged.accounts, merged.settings.currency) };
          merged = reconcileRecurring(merged);
          setData(merged);
          if (merged.settings.pin) setLocked(true);
        }
      } catch (e) {
        // sin datos previos o almacenamiento no disponible: se usa el estado por defecto
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try { await window.storage.set(STORAGE_KEY, JSON.stringify(data), false); } catch (e) { /* no-op */ }
    })();
  }, [data, loaded]);

  useEffect(() => {
    if (!loaded) return;
    checkNotifications(data, setData);
  }, [loaded]);

  const systemTheme = useSystemTheme();
  const resolvedTheme = data.settings.theme === 'system' ? systemTheme : data.settings.theme;
  const t = (THEMES[data.settings.palette] || THEMES.gold)[resolvedTheme] || THEMES.gold.dark;

  const saveTransaction = (tx) => {
    setData(d => {
      const exists = d.transactions.find(x=>x.id===tx.id);
      const transactions = exists ? d.transactions.map(x=>x.id===tx.id?tx:x) : [...d.transactions, tx];
      const tags = Array.from(new Set([...(d.tags||[]), ...(tx.tags||[])]));
      return { ...d, transactions, tags };
    });
    setSheet(null);
  };
  const deleteTransaction = (id) => {
    setData(d => ({ ...d, transactions: d.transactions.filter(x=>x.id!==id) }));
    setSheet(null);
  };

  const closeModal = () => setModal({ type: null });

  // "Ya lo pagué" (override=null) y "Ajustar" (override={amount,date,accountId})
  // comparten esta función: crean el pago real solo cuando el usuario lo confirma.
  const confirmRecurringPayment = (rec, dueDate, override) => {
    const o = override || {};
    setData(d => {
      const cur = d.recurringTransactions.find(r => r.id === rec.id);
      if (!cur) return d;
      const txIndex = buildRecurringTxIndex(d.transactions);
      if (isOccurrenceRecorded(cur.id, dueDate, txIndex)) return d; // idempotencia (doble tap)
      if ((cur.skippedDates || []).includes(dueDate)) return d;

      const amount = Number(o.amount != null && o.amount !== '' ? o.amount : cur.amount) || 0;
      if (amount <= 0) return d;
      const paidDate = o.date || dueDate;

      const tx = {
        id: uid(), createdAt: Date.now(), type: cur.type, amount,
        category: cur.category, accountId: o.accountId || cur.accountId,
        date: paidDate, note: (cur.name || cur.note || '').trim() || '(recurrente)',
        recurringId: cur.id, recurringDueDate: dueDate, tags: []
      };

      return {
        ...d,
        transactions: [...d.transactions, tx],
        recurringTransactions: d.recurringTransactions.map(r => r.id !== cur.id ? r : {
          ...r,
          // avanza el cursor solo si esta ocurrencia era la que estaba pendiente
          nextDueDate: r.nextDueDate === dueDate
            ? calculateNextDate(dueDate, r.frequency, r.dayOfMonth) : r.nextDueDate,
          lastPaidDate: paidDate, lastGeneratedDate: todayISO()
        })
      };
    });
  };

  // "Omitir": esta ocurrencia no se pagó y no se va a pagar (te la regalaron, te
  // la reembolsaron, etc). Sin esto el cursor se queda pegado para siempre.
  const skipRecurringOccurrence = (recId, dueDate) => setData(d => {
    const today = todayISO();
    const txIndex = buildRecurringTxIndex(d.transactions);
    return { ...d, recurringTransactions: d.recurringTransactions.map(r => {
      if (r.id !== recId) return r;
      const skippedDates = Array.from(new Set([...(r.skippedDates || []), dueDate])).slice(-24);
      let nextDueDate = r.nextDueDate, guard = 0;
      while (nextDueDate <= today && guard++ < MAX_OCCURRENCE_SCAN &&
             (skippedDates.includes(nextDueDate) || isOccurrenceRecorded(recId, nextDueDate, txIndex))) {
        nextDueDate = calculateNextDate(nextDueDate, r.frequency, r.dayOfMonth);
      }
      return { ...r, skippedDates, nextDueDate };
    })};
  });

  // "Me di de baja": los pendientes de este recurrente desaparecen solos
  // (pendingOccurrenceDates devuelve [] si !active), sin necesidad de barrerlos.
  const unsubscribeRecurring = (recId) => setData(d => ({ ...d,
    recurringTransactions: d.recurringTransactions.map(r =>
      r.id === recId ? { ...r, active: false, unsubscribedAt: todayISO() } : r) }));

  const reactivateRecurring = (recId) => setData(d => ({ ...d,
    recurringTransactions: d.recurringTransactions.map(r =>
      r.id === recId ? { ...r, active: true, unsubscribedAt: null } : r) }));

  // "Ya lo pagué" (un toque, sin overrides) y "Ajustar" (abre la hoja de detalle).
  const onConfirmRecurringOneTap = (rec, dueDate) => confirmRecurringPayment(rec, dueDate, null);
  const onAdjustRecurringOpen = (rec, dueDate) => setModal({ type: 'adjustRecurring', recurring: rec, dueDate });

  const fontBody = t.glow ? 'Optima, Candara, "Trebuchet MS", -apple-system, sans-serif' : 'Inter, -apple-system, sans-serif';
  const cssVars = {
    '--bg': t.bg, '--surface': t.surface, '--surfaceAlt': t.surfaceAlt, '--border': t.border,
    '--accent': t.accent, '--text': t.text, '--textMuted': t.textMuted, '--font-body': fontBody
  };

  return (
    <div style={{ ...cssVars, display: 'flex', justifyContent: 'center', width: '100%', minHeight: '100%', background: t.bg, fontFamily: 'var(--font-body)' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        .fz-icon-btn { width: 34px; height: 34px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .fz-link-btn { background: none; border: none; font-size: 12.5px; font-weight: 600; cursor: pointer; font-family: var(--font-body); }
        .fz-row-btn:active, .fz-seg-btn:active { opacity: 0.75; }
        select { -webkit-appearance: none; appearance: none; }
        input:focus, select:focus { border-color: ${t.accent} !important; }
        ::placeholder { color: ${t.textMuted}; opacity: 0.8; }
        .fz-sheet-backdrop { position: fixed; left: 0; right: 0; bottom: 0; top: var(--fz-vvt, 0px); height: var(--fz-vvh, 100%); max-width: 430px; margin: 0 auto; background: rgba(0,0,0,0.5); display: flex; align-items: flex-end; z-index: 40; animation: fz-fade .18s ease; }
        .fz-sheet { width: 100%; border-radius: 22px 22px 0 0; padding: 14px 20px 22px; max-height: 88%; overflow-y: auto; -webkit-overflow-scrolling: touch; animation: fz-up .22s ease; }
        @keyframes fz-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fz-up { from { transform: translateY(24px); opacity: .4; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fz-shake-kf { 10%,90% { transform: translateX(-2px); } 20%,80% { transform: translateX(4px); } 30%,50%,70% { transform: translateX(-8px); } 40%,60% { transform: translateX(8px); } }
        .fz-shake { animation: fz-shake-kf .4s; }
        @media (prefers-reduced-motion: reduce) { .fz-sheet, .fz-sheet-backdrop, .fz-shake { animation: none !important; } }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: ${resolvedTheme==='dark' ? 'invert(1)' : 'none'}; opacity: 0.6; }
      `}</style>

      <div style={{ width: '100%', maxWidth: 430, minHeight: '100vh', background: t.glow ? `radial-gradient(120% 46% at 50% 0%, ${t.surfaceAlt} 0%, ${t.bg} 62%)` : t.bg, position: 'relative', overflow: 'hidden', boxShadow: `0 0 60px ${t.shadow}` }}>

        {!loaded ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: t.textMuted, fontSize: 13 }}>Cargando tus finanzas…</div>
        ) : !data.settings.onboardingCompleted ? (
          <OnboardingScreen t={t} onComplete={(accounts, currency)=>setData(d=>({
            ...d,
            accounts,
            settings: { ...d.settings, currency, mainCurrency: currency, onboardingCompleted: true }
          }))} />
        ) : (
          <>
            <div style={{ paddingBottom: 84, minHeight: '100vh' }}>
              {tab==='inicio' && <InicioScreen data={data} setData={setData} t={t} goHistorial={()=>setTab('historial')} openSheet={()=>setSheet({})} onQuickAdd={setQuickAddCat} onNavigate={goTo} balanceHidden={balanceHidden} setBalanceHidden={setBalanceHidden} onOpenModal={setModal} onConfirmRecurring={onConfirmRecurringOneTap} onAdjustRecurring={onAdjustRecurringOpen} onSkipRecurring={skipRecurringOccurrence} onUnsubscribeRecurring={unsubscribeRecurring} />}
              {tab==='historial' && <HistorialScreen data={data} t={t} onEdit={(tx)=>setSheet(tx)} />}
              {tab==='presupuestos' && <MetasScreen data={data} t={t} subTab={metasSubTab} setSubTab={setMetasSubTab} onEditBudget={(cat)=>setModal({ type: 'budget', cat })} onOpenModal={setModal}
                onConfirmRecurring={onConfirmRecurringOneTap} onAdjustRecurring={onAdjustRecurringOpen} onSkipRecurring={skipRecurringOccurrence} onUnsubscribeRecurring={unsubscribeRecurring} onReactivateRecurring={reactivateRecurring} />}
              {tab==='reportes' && <ReportesScreen data={data} t={t} />}
              {tab==='ajustes' && <AjustesScreen data={data} setData={setData} t={t} onOpenModal={setModal} />}
            </div>

            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, maxWidth: 430, margin: '0 auto', pointerEvents: 'none', zIndex: 15 }}>
              <button onClick={()=>setSheet({})}
                style={{ position: 'absolute', right: 20, bottom: 82, width: 54, height: 54, borderRadius: '50%', background: t.accent, border: 'none', boxShadow: `0 8px 20px ${t.shadow}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', pointerEvents: 'auto' }}>
                <Icon name="Plus" size={24} color={t.accentText} />
              </button>

              <BottomNav tab={tab} setTab={setTab} t={t} />
            </div>

            {sheet !== null && (
              <TransactionSheet t={t} categories={data.categories} accounts={data.accounts} settings={data.settings} allTags={data.tags}
                initial={sheet && sheet.id ? sheet : null}
                onSave={saveTransaction} onDelete={deleteTransaction} onClose={()=>setSheet(null)} />
            )}

            {quickAddCat && (
              <QuickAddModal t={t} cat={quickAddCat} accounts={data.accounts} settings={data.settings}
                onSave={(tx)=>{ saveTransaction(tx); setQuickAddCat(null); }}
                onClose={()=>setQuickAddCat(null)} />
            )}

            {modal.type === 'budget' && (
              <BudgetModal t={t} cat={modal.cat} current={data.budgets[modal.cat.id]} settings={data.settings}
                onSave={(val)=>{ setData(d=>({ ...d, budgets: { ...d.budgets, [modal.cat.id]: val } })); closeModal(); }}
                onRemove={()=>{ setData(d=>{ const b={...d.budgets}; delete b[modal.cat.id]; return {...d, budgets:b}; }); closeModal(); }}
                onClose={closeModal} />
            )}
            {modal.type === 'category' && (
              <CategoryModal t={t} initial={modal.cat}
                otherCategories={data.categories.filter(c=>c.id !== modal.cat?.id)}
                hasTransactions={modal.cat ? data.transactions.some(tx=>tx.category===modal.cat.id) : false}
                onSave={(cat)=>{
                  setData(d => {
                    const exists = d.categories.find(c=>c.id===cat.id);
                    const categories = exists ? d.categories.map(c=>c.id===cat.id?cat:c) : [...d.categories, cat];
                    return { ...d, categories };
                  });
                  closeModal();
                }}
                onDelete={(catId)=>{
                  setData(d => {
                    const budgets = { ...d.budgets }; delete budgets[catId];
                    return { ...d, categories: d.categories.filter(c=>c.id!==catId), budgets };
                  });
                  closeModal();
                }}
                onMerge={(fromId, toId)=>{
                  setData(d => {
                    const budgets = { ...d.budgets }; delete budgets[fromId];
                    return {
                      ...d,
                      categories: d.categories.filter(c=>c.id!==fromId),
                      transactions: d.transactions.map(tx=>tx.category===fromId ? { ...tx, category: toId } : tx),
                      recurringTransactions: d.recurringTransactions.map(r=>r.category===fromId ? { ...r, category: toId } : r),
                      budgets
                    };
                  });
                  closeModal();
                }}
                onClose={closeModal} />
            )}
            {modal.type === 'account' && (
              <AccountModal t={t} settings={data.settings} initial={modal.account}
                onSave={(acc)=>{ setData(d=>{ const exists = d.accounts.find(a=>a.id===acc.id); const accounts = exists ? d.accounts.map(a=>a.id===acc.id?acc:a) : [...d.accounts, acc]; return { ...d, accounts }; }); closeModal(); }}
                onArchive={modal.account ? ()=>{ setData(d=>({ ...d, accounts: d.accounts.map(a=>a.id===modal.account.id?{...a, archived: !a.archived}:a) })); closeModal(); } : null}
                onClose={closeModal} />
            )}
            {modal.type === 'recurring' && (
              <RecurringModal t={t} categories={data.categories} accounts={data.accounts} settings={data.settings} initial={modal.recurring}
                onSave={(rec)=>{ setData(d=>{ const exists = d.recurringTransactions.find(r=>r.id===rec.id); const recurringTransactions = exists ? d.recurringTransactions.map(r=>r.id===rec.id?rec:r) : [...d.recurringTransactions, rec]; return reconcileRecurring({ ...d, recurringTransactions }); }); closeModal(); }}
                onDelete={modal.recurring ? ()=>{ setData(d=>({ ...d, recurringTransactions: d.recurringTransactions.filter(r=>r.id!==modal.recurring.id) })); closeModal(); } : null}
                onClose={closeModal} />
            )}
            {modal.type === 'adjustRecurring' && (
              <AdjustPaymentModal t={t} accounts={data.accounts} rec={modal.recurring} dueDate={modal.dueDate}
                onConfirm={(v)=>{ confirmRecurringPayment(modal.recurring, modal.dueDate, v); closeModal(); }}
                onClose={closeModal} />
            )}
            {modal.type === 'goal' && (
              <GoalModal t={t} accounts={data.accounts} settings={data.settings} initial={modal.goal}
                onSave={(goal)=>{ setData(d=>{ const exists = d.savingsGoals.find(g=>g.id===goal.id); const savingsGoals = exists ? d.savingsGoals.map(g=>g.id===goal.id?goal:g) : [...d.savingsGoals, goal]; return { ...d, savingsGoals }; }); closeModal(); }}
                onDelete={modal.goal ? ()=>{ setData(d=>({ ...d, savingsGoals: d.savingsGoals.filter(g=>g.id!==modal.goal.id) })); closeModal(); } : null}
                onClose={closeModal} />
            )}
            {modal.type === 'contribute' && (
              <ContributeModal t={t} accounts={data.accounts} settings={data.settings} goal={modal.goal}
                onSave={({ amount, note, otherAccountId })=>{
                  setData(d=>{
                    const goal = d.savingsGoals.find(g=>g.id===modal.goal.id);
                    const contribution = { id: uid(), date: todayISO(), amount, note };
                    const savingsGoals = d.savingsGoals.map(g=>g.id===goal.id?{ ...g, currentAmount: Number(g.currentAmount)+amount, contributions: [...g.contributions, contribution] }:g);
                    let transactions = d.transactions;
                    if (goal.linkedAccountId && otherAccountId) {
                      const isAporte = amount >= 0;
                      transactions = [...transactions, {
                        id: uid(), createdAt: Date.now(), type: 'transfer', category: '',
                        accountId: isAporte ? otherAccountId : goal.linkedAccountId,
                        toAccountId: isAporte ? goal.linkedAccountId : otherAccountId,
                        amount: Math.abs(amount), date: todayISO(), note: note || goal.name
                      }];
                    }
                    return { ...d, savingsGoals, transactions };
                  });
                  closeModal();
                }}
                onClose={closeModal} />
            )}
            {modal.type === 'debt' && (
              <DebtModal t={t} accounts={data.accounts} settings={data.settings} initial={modal.debt}
                onSave={(debt)=>{ setData(d=>{ const exists = d.debts.find(x=>x.id===debt.id); const debts = exists ? d.debts.map(x=>x.id===debt.id?debt:x) : [...d.debts, debt]; return { ...d, debts }; }); closeModal(); }}
                onDelete={modal.debt ? ()=>{ setData(d=>({ ...d, debts: d.debts.filter(x=>x.id!==modal.debt.id) })); closeModal(); } : null}
                onClose={closeModal} />
            )}
            {modal.type === 'debtPayment' && (
              <DebtPaymentModal t={t} accounts={data.accounts} settings={data.settings} debt={modal.debt}
                onSave={({ amount, note, accountId })=>{
                  setData(d=>{
                    const debt = d.debts.find(x=>x.id===modal.debt.id);
                    const payment = { id: uid(), date: todayISO(), amount, note };
                    const debts = d.debts.map(x=>x.id===debt.id?{ ...x, currentBalance: Math.max(0, Number(x.currentBalance)-amount), payments: [...x.payments, payment] }:x);
                    let transactions = d.transactions;
                    if (accountId) {
                      transactions = [...transactions, { id: uid(), createdAt: Date.now(), type: 'expense', category: '', accountId, amount, date: todayISO(), note: note || `Pago ${debt.name}` }];
                    }
                    return { ...d, debts, transactions };
                  });
                  closeModal();
                }}
                onClose={closeModal} />
            )}
            {modal.type === 'receivable' && (
              <ReceivableModal t={t} accounts={data.accounts} settings={data.settings} initial={modal.receivable}
                onSave={(r)=>{ setData(d=>{ const exists = (d.receivables||[]).find(x=>x.id===r.id); const receivables = exists ? d.receivables.map(x=>x.id===r.id?r:x) : [...(d.receivables||[]), r]; return { ...d, receivables }; }); closeModal(); }}
                onDelete={modal.receivable ? ()=>{ setData(d=>({ ...d, receivables: d.receivables.filter(x=>x.id!==modal.receivable.id) })); closeModal(); } : null}
                onClose={closeModal} />
            )}
            {modal.type === 'receivablePayment' && (
              <ReceivablePaymentModal t={t} accounts={data.accounts} settings={data.settings} receivable={modal.receivable}
                onSave={({ amount, note, accountId })=>{
                  setData(d=>{
                    const receivable = d.receivables.find(x=>x.id===modal.receivable.id);
                    const payment = { id: uid(), date: todayISO(), amount, note };
                    const receivables = d.receivables.map(x=>x.id===receivable.id?{ ...x, currentBalance: Math.max(0, Number(x.currentBalance)-amount), payments: [...x.payments, payment] }:x);
                    let transactions = d.transactions;
                    if (accountId) {
                      transactions = [...transactions, { id: uid(), createdAt: Date.now(), type: 'income', category: '', accountId, amount, date: todayISO(), note: note || `Cobro ${receivable.name}` }];
                    }
                    return { ...d, receivables, transactions };
                  });
                  closeModal();
                }}
                onClose={closeModal} />
            )}
            {modal.type === 'pinSetup' && (
              <PinSetupModal t={t} onSave={(pin)=>{ setData(d=>({ ...d, settings: { ...d.settings, pin } })); closeModal(); }} onClose={closeModal} />
            )}
            {modal.type === 'pinDisable' && (
              <PinDisableModal t={t} actualPin={data.settings.pin} onConfirm={()=>{ setData(d=>({ ...d, settings: { ...d.settings, pin: null, biometricCredentialId: null } })); closeModal(); }} onClose={closeModal} />
            )}
            {modal.type === 'resetConfirm' && (
              <ResetConfirmModal t={t} onConfirm={()=>{ setData(DEFAULT_DATA); closeModal(); }} onClose={closeModal} />
            )}

            {modal.type === 'importConfirm' && (
              <ImportConfirmModal t={t} importedData={modal.importedData}
                onConfirm={()=>{ setData(reconcileRecurring({ ...DEFAULT_DATA, ...modal.importedData, tags: modal.importedData.tags || [] })); closeModal(); }}
                onClose={closeModal} />
            )}

            {modal.type === 'importError' && (
              <ModalShell t={t} title="No se pudo importar" onClose={closeModal}>
                <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 18, lineHeight: 1.5 }}>{modal.message}</div>
                <button onClick={closeModal} style={{ width: '100%', padding: '12px', borderRadius: 12, border: 'none', background: t.accent, color: t.accentText, fontWeight: 700, fontSize: 13.5, cursor: 'pointer' }}>Entendido</button>
              </ModalShell>
            )}

            {modal.type === 'csvImport' && (
              <CsvImportModal t={t} headers={modal.headers} rows={modal.rows} categories={data.categories} accounts={data.accounts}
                onImport={(newTx)=>{ setData(d=>({ ...d, transactions: [...d.transactions, ...newTx] })); closeModal(); }}
                onClose={closeModal} />
            )}

            {locked && data.settings.pin && (
              <LockScreen t={t} actualPin={data.settings.pin} biometricCredentialId={data.settings.biometricCredentialId} onUnlock={()=>setLocked(false)} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

const rootEl = document.getElementById('root');
ReactDOM.createRoot(rootEl).render(<App />);
