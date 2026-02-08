# Backend API para FreeTour Santiago
## Despliegue en Hostinger

Este backend maneja el estado de los tours y se despliega en Hostinger (PHP).

---

## 📁 Estructura

```
hostinger-backend/
├── api/
│   └── tour-status.php    # API principal
├── data/
│   ├── .gitkeep
│   └── tours-status.json  # Se crea automáticamente
├── .htaccess              # Configuración Apache
└── README.md
```

---

## 🚀 Despliegue en Hostinger

### **Paso 1: Subir archivos**

#### **Opción A: FTP (Recomendado para principiantes)**

1. Abre tu cliente FTP (FileZilla, WinSCP, etc.)
2. Conéctate a Hostinger:
   - **Host**: Tu dominio o IP de Hostinger
   - **Usuario**: Tu usuario FTP
   - **Contraseña**: Tu contraseña FTP
   - **Puerto**: 21

3. Navega a `public_html/` (o el directorio de tu dominio)
4. Crea una carpeta llamada `api` (o el nombre que prefieras)
5. Sube todos los archivos de `hostinger-backend/` a esa carpeta

#### **Opción B: File Manager de Hostinger**

1. Inicia sesión en hPanel de Hostinger
2. Ve a **Files** → **File Manager**
3. Navega a `public_html/`
4. Crea una carpeta `api`
5. Sube los archivos usando el botón **Upload**

#### **Opción C: Git (Avanzado)**

Si tienes acceso SSH en Hostinger:

```bash
cd public_html
git clone git@github.com:LucioVita/freetour-chile.git temp
mv temp/hostinger-backend/* ./api/
rm -rf temp
```

---

### **Paso 2: Configurar permisos**

Asegúrate de que el directorio `data/` tenga permisos de escritura:

```bash
chmod 755 api/data
```

O desde el File Manager de Hostinger:
- Click derecho en la carpeta `data`
- **Change Permissions**
- Marca: **Read**, **Write**, **Execute** para Owner
- Marca: **Read**, **Execute** para Group y Public

---

### **Paso 3: Probar la API**

Suponiendo que tu dominio es `tudominio.com` y subiste a `public_html/api/`:

**URL de la API**: `https://tudominio.com/api/tour-status.php`

#### **Probar GET (obtener estado)**

```bash
curl https://tudominio.com/api/tour-status.php
```

Respuesta esperada:
```json
{
  "success": true,
  "data": {},
  "timestamp": "2026-02-08T19:00:00-03:00"
}
```

#### **Probar POST (actualizar estado)**

```bash
curl -X POST https://tudominio.com/api/tour-status.php \
  -H "Content-Type: application/json" \
  -d '{"slug": "valparaiso", "status": "si"}'
```

Respuesta esperada:
```json
{
  "success": true,
  "message": "Tour valparaiso updated",
  "slug": "valparaiso",
  "currentStatus": true,
  "timestamp": "2026-02-08T19:00:00-03:00"
}
```

---

## 🔗 Integración con Next.js (Vercel)

Ahora necesitas actualizar tu aplicación Next.js para usar esta API en lugar de las API routes locales.

### **Variables de Entorno**

Crea un archivo `.env.local` en tu proyecto Next.js:

```env
NEXT_PUBLIC_API_URL=https://tudominio.com/api
```

### **Actualizar el código**

En lugar de llamar a `/api/webhook/tour-status`, ahora llamarás a:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// GET - Obtener estado
const response = await fetch(`${API_URL}/tour-status.php`);
const data = await response.json();

// POST - Actualizar estado
const response = await fetch(`${API_URL}/tour-status.php`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ slug: 'valparaiso', status: 'si' })
});
```

---

## 🔐 Seguridad (Opcional pero Recomendado)

### **Proteger con API Key**

Agrega al inicio de `tour-status.php`:

```php
// Validar API Key
$apiKey = $_SERVER['HTTP_X_API_KEY'] ?? '';
$validApiKey = 'tu-clave-secreta-aqui'; // Cámbiala!

if ($apiKey !== $validApiKey) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}
```

Y en tu Next.js:

```typescript
fetch(`${API_URL}/tour-status.php`, {
  headers: {
    'X-API-Key': process.env.API_KEY
  }
});
```

---

## 📊 Endpoints

### **GET /api/tour-status.php**
Obtiene el estado de todos los tours.

**Response:**
```json
{
  "success": true,
  "data": {
    "valparaiso": true,
    "vina-del-mar": false
  },
  "timestamp": "2026-02-08T19:00:00-03:00"
}
```

### **POST /api/tour-status.php**
Actualiza el estado de un tour específico.

**Request Body:**
```json
{
  "slug": "valparaiso",
  "status": "si"  // o true/false
}
```

**Response:**
```json
{
  "success": true,
  "message": "Tour valparaiso updated",
  "slug": "valparaiso",
  "currentStatus": true,
  "timestamp": "2026-02-08T19:00:00-03:00"
}
```

---

## 🐛 Solución de Problemas

### Error 500: Internal Server Error
- Verifica los permisos del directorio `data/` (debe ser 755)
- Revisa los logs de PHP en Hostinger (hPanel → Advanced → Error Logs)

### Error 403: Forbidden
- Verifica que `.htaccess` esté correctamente configurado
- Asegúrate de que el archivo PHP tenga permisos 644

### CORS Error
- Verifica que `.htaccess` tenga las headers de CORS
- Si usas un subdominio, actualiza `Access-Control-Allow-Origin`

### El archivo tours-status.json no se crea
- Verifica permisos del directorio `data/`
- Intenta crear el archivo manualmente con `{}`

---

## 📝 Notas

- El archivo `tours-status.json` se crea automáticamente en el primer POST
- Los datos persisten entre requests (no se pierden como en Vercel)
- Compatible con cualquier plan de Hostinger que soporte PHP

---

## 🔄 Webhook de n8n

Para que n8n actualice el estado, configura el webhook para apuntar a:

```
https://tudominio.com/api/tour-status.php
```

Con el body:
```json
{
  "slug": "{{$json.slug}}",
  "status": "{{$json.status}}"
}
```

---

¿Necesitas ayuda? Revisa la documentación o contacta al desarrollador.
