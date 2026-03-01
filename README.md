# Galaretkowo 🍮

Strona internetowa sklepu z tradycyjną galaretką z nóżek.

## 📋 Opis

Galaretkowo to prosta, responsywna strona e-commerce oferująca najlepszą tradycyjną galaretką z nóżek w Polsce. Projekt wykorzystuje TypeScript dla typowania i bezpieczeństwa kodu.

## 🚀 Funkcjonalności

- **Dynamiczny koszyk zakupowy** - dodawanie produktów z automatycznym przeliczaniem
- **Mini-koszyk** - zawsze widoczny w prawym górnym rogu
- **Animacje** - płynne animacje przy dodawaniu produktów
- **Responsywny design** - działa na wszystkich urządzeniach
- **Dostępność (a11y)** - ARIA labels, focus states dla czytników ekranu
- **SEO** - zoptymalizowane metatagi

## 🛠️ Technologie

- **TypeScript** - typowanie statyczne
- **CSS3** - zmienne CSS, animacje, flexbox
- **HTML5** - semantyczny markup

## 📦 Instalacja

1. Sklonuj repozytorium:
```bash
git clone [adres-repo]
cd galaretkowo
```

2. Zainstaluj zależności:
```bash
npm install
```

3. Kompiluj TypeScript:
```bash
npm run build
```

## 🏃 Uruchomienie

### Tryb deweloperski (watch mode):
```bash
npm run watch
```

Następnie otwórz `index.html` w przeglądarce.

## 📂 Struktura projektu

```
galaretkowo/
├── index.html          # Główna strona HTML
├── app.ts              # Główny plik TypeScript
├── app.js              # Skompilowany JavaScript
├── style.css           # Style CSS
├── tsconfig.json       # Konfiguracja TypeScript
├── package.json        # Konfiguracja npm
├── img/                # Obrazy produktów
└── favicon/            # Ikony strony
```

## 🎨 Produkty

1. **Kurczaczek** - Galaretka drobiowa z warzywami (18 zł)
2. **Kogucisko** - Galaretka drobiowa bez warzyw (20 zł)
3. **Prosiaczek** - Galaretka wieprzowa z warzywami (19 zł)
4. **Dzika Swinia** - Galaretka wieprzowa bez warzyw (22 zł)
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

Galaretkowo © 2026
