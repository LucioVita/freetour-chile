# 🚀 Guía de Despliegue - Arquitectura Híbrida
## Frontend en Vercel + Backend en Hostinger

Esta guía te ayudará a desplegar tu aplicación usando lo mejor de ambos mundos:
- **Frontend (Next.js)** → Vercel (gratis, rápido, optimizado)
- **Backend (API PHP)** → Hostinger (tu hosting actual)

---

## 📋 Resumen de la Arquitectura

```
┌─────────────────┐
│   USUARIO       │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│  VERCEL (Frontend)          │
│  - Next.js App              │
│  - React Components         │
│  - Static Assets            │
│  - Server Actions (n8n)     │
└────────┬────────────────────┘
         │
         │ fetch()
         ▼
┌─────────────────────────────┐
│  HOSTINGER (Backend)        │
│  - API PHP                  │
│  - tours-status.json        │
│  - Persistencia de datos    │
└─────────────────────────────┘
         ▲
         │
         │ webhook
         │
┌────────┴────────────────────┐
│  n8n                        │
│  - Automatizaciones         │
│  - Actualizar estado tours  │
└─────────────────────────────┘
```

---

## 🎯 PARTE 1: Desplegar Backend en Hostinger

### **Paso 1.1: Preparar archivos**

Los archivos del backend están en la carpeta `hostinger-backend/`:

```
hostinger-backend/
├── api/
│   └── tour-status.php    # API principal
├── data/
│   └── .gitkeep
├── .htaccess              # Configuración Apache
└── README.md
```

### **Paso 1.2: Subir a Hostinger vía FTP**

#### **Opción A: FileZilla (Recomendado)**

1. **Descarga FileZilla**: https://filezilla-project.org/
2. **Conecta a Hostinger**:
   - Host: `ftp.tudominio.com` (o la IP que te dio Hostinger)
   - Usuario: Tu usuario FTP de Hostinger
   - Contraseña: Tu contraseña FTP
   - Puerto: `21`

3. **Navega a `public_html/`** (o el directorio de tu dominio)

4. **Crea una carpeta llamada `api`**

5. **Sube los archivos**:
   - Arrastra `tour-status.php` a `public_html/api/`
   - Crea la carpeta `data` dentro de `api`
   - Sube `.htaccess` a `public_html/api/`

#### **Opción B: File Manager de Hostinger**

1. Inicia sesión en **hPanel** de Hostinger
2. Ve a **Files** → **File Manager**
3. Navega a `public_html/`
4. Clic en **+ New Folder** → nombra `api`
5. Entra a `api/` y clic en **Upload Files**
6. Sube `tour-status.php` y `.htaccess`
7. Crea otra carpeta llamada `data`

### **Paso 1.3: Configurar permisos**

Desde el File Manager de Hostinger:

1. Click derecho en la carpeta `data`
2. **Change Permissions**
3. Establece: `755` (rwxr-xr-x)
   - Owner: Read, Write, Execute ✓
   - Group: Read, Execute ✓
   - Public: Read, Execute ✓

### **Paso 1.4: Probar la API**

Abre tu navegador y ve a:

```
https://tudominio.com/api/tour-status.php
```

Deberías ver:

```json
{
  "success": true,
  "data": {},
  "timestamp": "2026-02-08T19:00:00-03:00"
}
```

✅ **Si ves esto, tu backend está funcionando!**

---

## 🎯 PARTE 2: Desplegar Frontend en Vercel

### **Paso 2.1: Subir cambios a GitHub**

Desde tu terminal:

```bash
cd /media/lucio/E8E07112E070E868/Users/Lucio/Carlos/freetour-santiago
git add .
git commit -m "Configurar backend en Hostinger"
git push
```

### **Paso 2.2: Conectar con Vercel**

1. **Ve a**: https://vercel.com/new
2. **Haz clic en**: "Continue with GitHub"
3. **Autoriza** a Vercel (si es la primera vez)
4. **Busca** el repositorio: `freetour-chile`
5. **Haz clic en**: "Import"

### **Paso 2.3: Configurar Variables de Entorno**

**MUY IMPORTANTE**: Antes de hacer deploy, agrega la variable de entorno:

1. En la pantalla de configuración, busca **"Environment Variables"**
2. Agrega:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://tudominio.com/api` (⚠️ SIN la barra final)
   - **Environment**: Production, Preview, Development (marca las 3)

3. Haz clic en **"Add"**

### **Paso 2.4: Deploy**

1. Haz clic en **"Deploy"**
2. Espera 2-3 minutos mientras Vercel construye tu app
3. ✅ **¡Listo!** Tu app estará en línea

---

## 🔗 PARTE 3: Configurar n8n

Actualiza tu webhook de n8n para apuntar al backend de Hostinger:

### **URL del Webhook**:
```
https://tudominio.com/api/tour-status.php
```

### **Método**: POST

### **Headers**:
```json
{
  "Content-Type": "application/json"
}
```

### **Body**:
```json
{
  "slug": "{{$json.slug}}",
  "status": "{{$json.status}}"
}
```

**Ejemplo de valores**:
- `slug`: `"free-tour-santiago-imprescindible"`
- `status`: `"si"` o `"no"` (también acepta `true`/`false`)

---

## ✅ Verificación Final

### **1. Probar el Backend**

```bash
# GET - Obtener estado
curl https://tudominio.com/api/tour-status.php

# POST - Actualizar estado
curl -X POST https://tudominio.com/api/tour-status.php \
  -H "Content-Type: application/json" \
  -d '{"slug": "free-tour-santiago-imprescindible", "status": "si"}'
```

### **2. Probar el Frontend**

1. Abre tu app en Vercel: `https://freetour-chile.vercel.app`
2. Abre la consola del navegador (F12)
3. Busca errores de CORS o fetch
4. Verifica que los tours se muestren correctamente

### **3. Probar la Integración Completa**

1. Envía un webhook desde n8n
2. Verifica que el archivo `tours-status.json` se actualice en Hostinger
3. Recarga tu app en Vercel
4. Verifica que el estado del tour se actualice

---

## 🌐 Conectar Dominio Personalizado (Opcional)

Si quieres usar tu dominio de Hostinger para el frontend:

### **En Vercel**:
1. Ve a **Project Settings** → **Domains**
2. Agrega: `tours.tudominio.com` (o el subdominio que prefieras)
3. Vercel te dará un registro CNAME

### **En Hostinger (hPanel)**:
1. Ve a **Domains** → **DNS Zone Editor**
2. Agrega un registro **CNAME**:
   - Type: `CNAME`
   - Name: `tours` (o el subdominio que elegiste)
   - Value: `cname.vercel-dns.com`
   - TTL: `3600`

3. Espera 5-10 minutos para que se propague

---

## 🐛 Solución de Problemas

### **Error: CORS blocked**

**Síntoma**: En la consola del navegador ves:
```
Access to fetch at 'https://tudominio.com/api/tour-status.php' from origin 'https://freetour-chile.vercel.app' has been blocked by CORS policy
```

**Solución**:
1. Verifica que el archivo `.htaccess` esté en `public_html/api/`
2. Asegúrate de que tenga las headers de CORS:
```apache
Header set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
Header set Access-Control-Allow-Headers "Content-Type"
```

### **Error: 404 Not Found en la API**

**Síntoma**: Al acceder a `https://tudominio.com/api/tour-status.php` ves un error 404

**Solución**:
1. Verifica que el archivo esté en `public_html/api/tour-status.php`
2. Verifica que el nombre del archivo sea exactamente `tour-status.php`
3. Verifica los permisos del archivo (debe ser `644`)

### **Error: 500 Internal Server Error**

**Síntoma**: La API devuelve error 500

**Solución**:
1. Revisa los logs de error en Hostinger:
   - hPanel → **Advanced** → **Error Logs**
2. Verifica que la carpeta `data/` tenga permisos `755`
3. Verifica que PHP esté habilitado en tu hosting

### **Los tours no se actualizan en el frontend**

**Síntoma**: Cambias el estado en n8n pero no se refleja en la web

**Solución**:
1. Verifica que la variable de entorno `NEXT_PUBLIC_API_URL` esté configurada en Vercel
2. Abre la consola del navegador y busca errores
3. Verifica que el archivo `tours-status.json` se esté creando en Hostinger
4. Haz un hard refresh (Ctrl+Shift+R) en el navegador

---

## 📊 Monitoreo

### **Backend (Hostinger)**:
- Revisa los logs de acceso: hPanel → **Advanced** → **Access Logs**
- Revisa los logs de error: hPanel → **Advanced** → **Error Logs**
- Descarga el archivo `tours-status.json` para ver el estado actual

### **Frontend (Vercel)**:
- Dashboard: https://vercel.com/dashboard
- Logs en tiempo real
- Analytics de tráfico
- Error tracking

---

## 🔐 Seguridad (Opcional pero Recomendado)

### **Proteger la API con API Key**

Edita `tour-status.php` y agrega al inicio (después de los headers):

```php
// Validar API Key
$apiKey = $_SERVER['HTTP_X_API_KEY'] ?? '';
$validApiKey = 'tu-clave-secreta-super-segura'; // ¡Cámbiala!

if ($apiKey !== $validApiKey) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}
```

Luego, actualiza el código en Next.js (`src/app/page.tsx`):

```typescript
fetch(apiUrl, {
  headers: {
    'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || ''
  }
})
```

Y agrega en Vercel la variable:
- Name: `NEXT_PUBLIC_API_KEY`
- Value: `tu-clave-secreta-super-segura`

---

## 📝 Checklist de Despliegue

### **Backend (Hostinger)**:
- [ ] Subir `tour-status.php` a `public_html/api/`
- [ ] Subir `.htaccess` a `public_html/api/`
- [ ] Crear carpeta `data/` con permisos `755`
- [ ] Probar GET: `https://tudominio.com/api/tour-status.php`
- [ ] Probar POST con curl o Postman

### **Frontend (Vercel)**:
- [ ] Subir cambios a GitHub
- [ ] Conectar repositorio en Vercel
- [ ] Configurar variable `NEXT_PUBLIC_API_URL`
- [ ] Deploy
- [ ] Verificar que la app cargue correctamente
- [ ] Verificar que no haya errores de CORS

### **Integración**:
- [ ] Actualizar webhook de n8n
- [ ] Probar envío de webhook
- [ ] Verificar que `tours-status.json` se actualice
- [ ] Verificar que el frontend refleje los cambios

---

## 🎉 ¡Felicidades!

Tu aplicación ahora está desplegada con una arquitectura híbrida profesional:

- ✅ Frontend ultra-rápido en Vercel
- ✅ Backend persistente en Hostinger
- ✅ Integración con n8n funcionando
- ✅ Sin costos adicionales (usando tu hosting actual)

---

## 📞 Soporte

Si tienes problemas:
1. Revisa la sección "Solución de Problemas"
2. Revisa los logs de Hostinger y Vercel
3. Verifica que todas las URLs estén correctas
4. Asegúrate de que las variables de entorno estén configuradas

---

**Desarrollado por GuruWeb** 🚀
