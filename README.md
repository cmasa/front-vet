# 🐶 Sistema de Gestión Veterinaria

Este proyecto es una aplicación web para gestionar la información de una veterinaria, permitiendo el manejo de **familias (dueños)**, **mascotas**, y sus respectivas **consultas** médicas.

---

## 🔧 Tecnologías utilizadas

- **Frontend:** React + Bootstrap
- **Backend:** Node.js + Express
- **Base de datos:** MySQL
- **Alertas y confirmaciones:** SweetAlert2
- **Gestión de estado simple:** React Context (para el nombre de la mascota)
- **Validación de formularios (backend):** express-validator

---

## 🧭 Funcionalidades principales

### Familias (Dueños)
- Listado de familias registradas
- Búsqueda por nombre o apellido
- Alta, edición y eliminación
- Validación de campos con mensajes claros

### Mascotas
- Listado de mascotas por familia
- Alta, edición y eliminación
- Campos como especie, raza, edad y peso

### Consultas
- Listado de consultas por mascota
- Detalle de cada consulta médica
- Alta, edición y eliminación de registros

---

## 📁 Estructura del proyecto

```
/backend
  ├─ controllers/
  ├─ services/
  ├─ routes/
  ├─ config/
  └─ app.js

/frontend
  ├─ src/
      ├─ components/
      ├─ context/
      ├─ utils/
      ├─ config/
```

---

## 🚀 Cómo ejecutar

1. Clonar el repositorio:
```
git clone https://github.com/usuario/nombre_repo_backend.git
git clone https://github.com/usuario/nombre_repo_frontend.git
```

2. Ir al directorio del backend y frontend para instalar dependencias:
```
cd backend
npm install
```
```
cd ../frontend
npm install
```
3. Crear archivos \`.env\` si corresponde y configurar conexión a la base de datos en el backend.

4. Iniciar el backend:
```
npm start
```
5. Iniciar el frontend:
```
npm run dev
```
---

## 📝 Notas

- Este proyecto fue desarrollado con fines educativos.
- Se implementan buenas prácticas como validaciones, alertas y manejo de errores.

---

## ✨ Autor

- Claudio Masa