# 📧 Konfiguracja Email - Gmail

## Dlaczego potrzebujesz emaili?

Gdy klient złoży zamówienie, system:
1. ✅ Zapisuje zamówienie do bazy MongoDB
2. ✅ Wyświetla klientowi ID zamówienia
3. 📧 **Wysyła Ci email z pełnymi danymi zamówienia**

---

## 🔐 Krok 1: Włącz 2FA na Gmail

1. Wejdź na: https://myaccount.google.com/security
2. Znajdź **"2-Step Verification"** (Weryfikacja dwuetapowa)
3. Kliknij **"Get Started"** i postępuj według instrukcji
4. Zweryfikuj numer telefonu SMS

---

## 🔑 Krok 2: Wygeneruj App Password

1. Wejdź na: https://myaccount.google.com/apppasswords
2. Zaloguj się jeśli trzeba
3. W polu **"Select app"** wybierz: **"Mail"**
4. W polu **"Select device"** wybierz: **"Other (Custom name)"**
5. Wpisz: `Galaretkarnia Backend`
6. Kliknij **"Generate"**
7. **SKOPIUJ 16-ZNAKOWY KOD** (np. `abcd efgh ijkl mnop`)

⚠️ **WAŻNE**: Ten kod pokazuje się tylko RAZ! Zapisz go w bezpiecznym miejscu.

---

## ⚙️ Krok 3: Skonfiguruj `.env`

Otwórz plik `server/.env` i uzupełnij:

```env
# Gmail configuration
EMAIL_USER=twoj-prawdziwy-email@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop

# Business email (gdzie zamówienia będą przychodzić)
ORDER_EMAIL=twoj-prawdziwy-email@gmail.com
```

**Uwagi**:
- `EMAIL_PASSWORD` = 16-znakowy App Password (BEZ spacji!)
- `ORDER_EMAIL` = email gdzie chcesz dostawać zamówienia (może być ten sam co EMAIL_USER)

---

## ✅ Krok 4: Przetestuj

1. **Zrestartuj backend**:
   ```bash
   # Zatrzymaj poprzedni proces (Ctrl+C)
   cd server
   node server.mjs
   ```

2. **Powinien pojawić się komunikat**:
   ```
   ✅ Email service ready
   ```

3. **Wyślij testowe zamówienie** ze strony

4. **Sprawdź skrzynkę odbiorczą** - powinien być email z zamówieniem!

---

## ❌ Troubleshooting

### Błąd: "Invalid login: 535-5.7.8"
- ❌ Używasz zwykłego hasła zamiast App Password
- ✅ Wygeneruj App Password (krok 2)

### Błąd: "Username and Password not accepted"
- Sprawdź czy EMAIL_USER jest poprawny
- Sprawdź czy skopiowałeś App Password bez spacji

### Nie widzę opcji "App passwords"
- Musisz najpierw włączyć 2FA (krok 1)
- Po włączeniu 2FA odśwież stronę

### Email nie przychodzi
- Sprawdź folder SPAM
- Sprawdź czy backend wyświetlił: `✅ Order email sent for ID: ...`
- Sprawdź logi backendu czy są błędy

---

## 🔒 Bezpieczeństwo

⚠️ **NIGDY** nie commituj pliku `.env` do GitHuba!

Plik `.gitignore` powinien zawierać:
```
server/.env
.env
```

---

## 📧 Przykładowy email zamówienia

Po konfiguracji dostaniesz emaile w formacie:

```
📦 Nowe zamówienie

ID Zamówienia: 69a4b0b698a4d919968eadce

Pozycje:
- Dzika Świnia: 2 słoik(ów) × 22 zł = 44 zł
- Prosiaczek: 1 słoik(ów) × 19 zł = 19 zł

📌 Do zapłaty: 63 zł

Dane klienta:
👤 Imię i nazwisko: Michał Antczak
📞 Telefon: +48794535366
📍 Adres dostawy: Eugeniusza Płoskiego 1/1 m. 10
💬 Uwagi: Brak

⏰ Zamówienie przyjęte: 01.03.2026, 22:33:42
Status: NOWE (oczekuje na potwierdzenie)
```

---

Gotowe! Po skonfigurowaniu emaile będą przychodzić automatycznie przy każdym zamówieniu. 🎉
