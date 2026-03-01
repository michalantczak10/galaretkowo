# 📧 Konfiguracja Email - Outlook/Hotmail

## Dlaczego potrzebujesz emaili?

Gdy klient złoży zamówienie, system:
1. ✅ Zapisuje zamówienie do bazy MongoDB
2. ✅ Wyświetla klientowi ID zamówienia
3. 📧 **Wysyła Ci email z pełnymi danymi zamówienia**

---

## ⚙️ Konfiguracja Outlook

### Opcja 1: Zwykłe hasło (prostsza)

Wystarczy użyć swojego normalnego hasła do konta Outlook/Hotmail.

1. Otwórz `server/.env`
2. Wpisz:
```env
EMAIL_USER=twoj-email@outlook.com
EMAIL_PASSWORD=twoje-normalne-haslo
ORDER_EMAIL=twoj-email@outlook.com
```

### Opcja 2: App Password (bezpieczniejsza)

Jeśli masz włączoną weryfikację dwuetapową:

1. Wejdź na: https://account.microsoft.com/security
2. Znajdź **"App passwords"**
3. Kliknij **"Create a new app password"**
4. Skopiuj wygenerowane hasło
5. W `server/.env` użyj tego hasła jako `EMAIL_PASSWORD`

---

## ✅ Testuj konfigurację

1. **Zrestartuj backend**:
   ```bash
   # Zatrzymaj poprzedni proces (Ctrl+C w terminalu backendu)
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

### Błąd: "Invalid login" lub "Authentication failed"
- Sprawdź czy EMAIL_USER jest poprawny
- Sprawdź czy hasło jest poprawne
- Spróbuj wygenerować App Password (opcja 2)

### Email nie przychodzi
- Sprawdź folder SPAM/Junk
- Sprawdź czy backend wyświetlił: `✅ Order email sent for ID: ...`
- Sprawdź logi backendu czy są błędy

### "self signed certificate" error
- To normalne z Outlookiem - dodane `tls.ciphers` w konfiguracji to naprawia

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
