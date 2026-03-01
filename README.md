# Galaretkarnia 🍮

Strona internetowa sklepu z tradycyjną galaretką z nóżek.

## 📋 Opis

Galaretkarnia to prosta, responsywna strona e-commerce oferująca najlepszą tradycyjną galaretką z nóżek w Polsce. Projekt wykorzystuje TypeScript dla typowania i bezpieczeństwa kodu.

## 🚀 Funkcjonalności

- **Dynamiczny koszyk zakupowy** - dodawanie produktów z automatycznym przeliczaniem
- **Mini-koszyk** - zawsze widoczny w prawym górnym rogu
- **Animacje** - płynne animacje przy dodawaniu produktów
- **Responsywny design** - działa na wszystkich urządzeniach
- **Dostępność (a11y)** - ARIA labels, focus states dla czytników ekranu
- **SEO** - zoptymalizowane metatagi

## 🛠️ Technologie

- **Frontend**: TypeScript, CSS3, HTML5
- **Backend**: Node.js + Express
- **Baza danych**: MongoDB (archiwizacja zamówień)
- **Email**: Nodemailer + Gmail

## 📦 Instalacja

### Frontend

1. Sklonuj repozytorium:
```bash
git clone https://github.com/michalantczak10/galaretkarnia.pl.git
cd galaretkarnia.pl
```

2. Zainstaluj zależności:
```bash
npm install
```

3. Kompiluj TypeScript:
```bash
npm run build
```

### Backend

1. Przejdź do folderu `server`:
```bash
cd server
```

2. Zainstaluj zależności:
```bash
npm install
```

3. Skonfiguruj `.env` (patrz sekcja poniżej)

## ⚙️ Konfiguracja

### MongoDB

Backend wymaga MongoDB. Masz dwie opcje:

#### Opcja 1: Lokalne (localhost)
```bash
# Zainstaluj MongoDB Community Edition
# https://www.mongodb.com/docs/manual/installation/

# Uruchom MongoDB
mongod

# W .env ustaw:
MONGODB_URI=mongodb://localhost:27017/galaretkarnia
```

#### Opcja 2: MongoDB Cloud (Atlas) - rekomendowane dla produkcji
```bash
# Wejdź na https://www.mongodb.com/cloud/atlas
# Utwórz darmowe konto
# Skopiuj connection string
# W .env ustaw:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/galaretkarnia?retryWrites=true&w=majority
```

### Gmail & Email

Backend wysyła email z powiadomieniem o każdym nowym zamówieniu.

**📧 [Szczegółowa instrukcja konfiguracji email →](EMAIL-SETUP.md)**

Szybka konfiguracja:
1. Włącz 2FA na koncie Gmail: https://myaccount.google.com/security
2. Wygeneruj App Password (16 znaków): https://myaccount.google.com/apppasswords
3. W `server/.env` ustaw:
```env
EMAIL_USER=twoj-email@gmail.com
EMAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx
ORDER_EMAIL=zamowienia@galaretkarnia.pl
```

**Uwaga**: Zamówienia są zapisywane w MongoDB niezależnie od konfiguracji email!

## 🏃 Uruchomienie

### Dla developmentu - Terminal 1 (Frontend)
```bash
npm run watch
```
Otwórz `http://localhost:5173` lub `index.html` w przeglądarce.

### Dla developmentu - Terminal 2 (Backend)
```bash
cd server
npm run dev
```
Backend będzie dostępny na `http://localhost:3001`.

### Dla produkcji - Frontend
```bash
npm run build
# Wynikowe pliki w: index.html, app.js, style.css
```

## 📂 Struktura projektu

```
galaretkarnia.pl/
├── index.html              # Główna strona HTML
├── app.ts                  # Frontend (TypeScript)
├── app.js                  # Frontend skompilowany
├── style.css               # Style CSS
├── package.json            # Konfiguracja npm
├── tsconfig.json           # Konfiguracja TypeScript
├── img/                    # Obrazy produktów
├── favicon/                # Ikony strony
└── server/                 # Backend (Node.js + Express)
    ├── server.mjs          # API serwera
    ├── .env                # Zmienne środowiska (lokalne)
    ├── .env.example        # Szablon .env
    └── package.json        # Zależności backendu
```

## 🔌 API Endpoints

### Zamówienia

**POST `/api/orders`** - Złóż nowe zamówienie
```json
{
  "name": "Jan Nowak",
  "phone": "+48-123-456-789",
  "address": "ul. Galaretki 10, 00-000 Warszawa",
  "notes": "Proszę dostarczyć po 18:00",
  "items": [
    {"name": "Kurczaczek", "price": 18, "qty": 2}
  ],
  "total": 36
}
```

**GET `/api/orders`** - Pobierz wszystkie zamówienia (admin)

**GET `/api/orders/id/:orderId`** - Pobierz szczegóły zamówienia

**PUT `/api/orders/id/:orderId`** - Zmień status zamówienia
```json
{
  "status": "w-realizacji"  // nowe | w-realizacji | gotowe | anulowane
}
```

## 💾 Schemat Zamówienia

Każde zamówienie w MongoDB zawiera:
```json
{
  "_id": "ObjectId",
  "name": "string",
  "phone": "string",
  "address": "string",
  "notes": "string",
  "items": [
    {"name": "string", "price": "number", "qty": "number"}
  ],
  "total": "number",
  "status": "nowe|w-realizacji|gotowe|anulowane",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## 🎨 Produkty

1. **Kurczaczek** - Galaretka drobiowa z warzywami (18 zł)
2. **Kogucisko** - Galaretka drobiowa bez warzyw (20 zł)
3. **Prosiaczek** - Galaretka wieprzowa z warzywami (19 zł)
4. **Dzika Świnia** - Galaretka wieprzowa bez warzyw (22 zł)
5. **Warzywniak** - Galaretka warzywna na agarze (17 zł)

## 🔧 Konfiguracja

Kolory i inne zmienne można łatwo dostosować w `:root` w pliku `style.css`:

```css
:root {
  --color-primary: #b30000;
  --color-accent: #ffcc00;
  --color-bg: #fff8f0;
  /* ... */
}
```

## 📱 Responsywność

Strona jest w pełni responsywna z breakpointami:
- Mobile: < 480px
- Tablet: < 768px  
- Desktop: > 768px

## ♿ Dostępność

Projekt spełnia standardy dostępności:
- ARIA labels dla wszystkich interaktywnych elementów
- Focus states dla nawigacji klawiaturą
- Semantyczny HTML
- Odpowiedni kontrast kolorów

## 📄 Licencja

MIT

## 👨‍💻 Autor

Galaretkarnia.pl © 2026
