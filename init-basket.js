// 1) Seleccionar / crear la base de datos "basket"
const dbBasket = db.getSiblingDB("basket");

// 2) Crear usuario específico para la aplicación
dbBasket.createUser({
  user: "basketuser",
  pwd: "basketpassword",
  roles: [
    { role: "readWrite", db: "basket" }
  ]
});

// 3) Crear colecciones principales
dbBasket.createCollection("matches");
dbBasket.createCollection("referees");

// 4) Insertar datos de prueba para la TAREA 1
dbBasket.referees.insertMany([
  {
    name: "Pierluigi Collina",
    licenseNumber: 1001
  },
  {
    name: "Ana Isabel García",
    licenseNumber: 1002
  }
]);

// 5) Insertar datos de prueba para Partidos (Matches)
// Nota: Se dejan sin árbitro asignado inicialmente para probar la TAREA 2.
dbBasket.matches.insertMany([
  {
    homeTeam: "Real Madrid",
    awayTeam: "FC Barcelona",
    date: new Date("2024-05-20T20:00:00Z"),
    referee: null
  },
  {
    homeTeam: "Unicaja",
    awayTeam: "Valencia Basket",
    date: new Date("2024-05-21T18:30:00Z"),
    referee: null
  }
]);

// 6) Mensaje de verificación en los logs de Docker
print(">>> [Docker Init] Base de datos 'basket' inicializada con éxito.");
print(">>> [Docker Init] Árbitros y partidos de prueba cargados.");