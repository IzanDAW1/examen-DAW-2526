import mongoose from 'mongoose';
import Match from './models/match.js';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;;

async function insertar_datos() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado a MongoDB');

    // Limpiar colección
    await Match.deleteMany({});
    console.log('Colección Matches limpia');

    // Insertar partidos
    await Match.insertMany([
      {
        homeTeam: 'Lakers',
        awayTeam: 'Warriors',
        date: new Date('2026-02-15')
      },
      {
        homeTeam: 'Bulls',
        awayTeam: 'Celtics',
        date: new Date('2026-02-18')
      },
      {
        homeTeam: 'Heat',
        awayTeam: 'Spurs',
        date: new Date('2026-02-20')
      },
      {
        homeTeam: 'Nets',
        awayTeam: 'Knicks',
        date: new Date('2026-02-25')
      }
    ]);

    console.log('Partidos insertados correctamente');
  } catch (err) {
    console.error('Error insertando datos:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Conexión cerrada');
  }
}
console.log("Iniciando...");
insertar_datos();
