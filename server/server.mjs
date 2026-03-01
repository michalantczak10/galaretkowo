import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['POST'],
  credentials: true
}));
app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD // Google App Password, not regular password
  }
});

// Test email connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email configuration error:', error.message);
  } else {
    console.log('✅ Email service ready');
  }
});

// Validation helper
const isPhoneValid = (phone) => /^[0-9+()\-\s]{7,20}$/.test(phone);

// POST /api/orders - Accept order and send email
app.post('/api/orders', async (req, res) => {
  try {
    const { name, phone, address, notes, items, total } = req.body;

    // Validation
    if (!name || name.trim().length < 3) {
      return res.status(400).json({ error: 'Podaj poprawne imię i nazwisko.' });
    }

    if (!phone || !isPhoneValid(phone)) {
      return res.status(400).json({ error: 'Podaj poprawny numer telefonu.' });
    }

    if (!address || address.trim().length < 6) {
      return res.status(400).json({ error: 'Podaj pełny adres dostawy.' });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Koszyk jest pusty.' });
    }

    if (typeof total !== 'number' || total <= 0) {
      return res.status(400).json({ error: 'Nieprawidłowa kwota.' });
    }

    // Format items for email
    const itemsText = items
      .map(item => `- ${item.name}: ${item.qty} słoik(ów) × ${item.price} zł = ${item.qty * item.price} zł`)
      .join('\n');

    // Email to shop owner
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ORDER_EMAIL || 'zamowienia@galaretkarnia.pl',
      subject: `Nowe zamówienie - Galaretkarnia.pl #${Date.now()}`,
      html: `
        <h2>📦 Nowe zamówienie</h2>
        <hr>
        <h3>Pozycje:</h3>
        <pre>${itemsText}</pre>
        <hr>
        <p><strong>Do zapłaty:</strong> ${total} zł</p>
        <hr>
        <h3>Dane klienta:</h3>
        <p><strong>Imię i nazwisko:</strong> ${name}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Adres dostawy:</strong> ${address}</p>
        <p><strong>Uwagi:</strong> ${notes || 'Brak'}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">Zamówienie przyjęte: ${new Date().toLocaleString('pl-PL')}</p>
      `
    };

    // Send email to owner
    await transporter.sendMail(mailOptions);

    // Email confirmation to customer
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CUSTOMER_EMAIL_FIELD ? req.body.email : undefined, // Optional if customer provides email
      subject: 'Potwierdzenie zamówienia - Galaretkarnia.pl',
      html: `
        <h2>✅ Zamówienie przyjęte!</h2>
        <p>Dziękujemy za Twoje zamówienie. Skontaktujemy się w ciągu 30 minut.</p>
        <hr>
        <h3>Twoje zamówienie:</h3>
        <pre>${itemsText}</pre>
        <p><strong>Do zapłaty:</strong> ${total} zł</p>
        <hr>
        <p style="color: #666;">Galaretkarnia.pl<br>📞 +48 500 600 700</p>
      `
    };

    // Send confirmation only if customer provided email
    if (req.body.email) {
      await transporter.sendMail(customerMailOptions);
    }

    // Success response
    res.json({
      success: true,
      message: 'Zamówienie przyjęte! Skontaktujemy się w ciągu 30 minut.',
      orderId: Date.now()
    });

  } catch (error) {
    console.error('Order processing error:', error);
    res.status(500).json({
      error: 'Błąd przy przetwarzaniu zamówienia. Spróbuj ponownie.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Galaretkarnia API is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Galaretkarnia API running on port ${PORT}`);
  console.log(`📧 Orders will be sent to: ${process.env.ORDER_EMAIL || 'zamowienia@galaretkarnia.pl'}`);
});
