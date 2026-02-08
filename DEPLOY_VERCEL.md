# 🚀 Guía de Despliegue en Vercel

## Proyecto: FreeTour Santiago

Esta guía te ayudará a desplegar tu aplicación Next.js en Vercel en menos de 5 minutos.

---

## ✅ Pre-requisitos Completados

- ✅ Código subido a GitHub: `git@github.com:LucioVita/freetour-chile.git`
- ✅ Configuración de Next.js optimizada para Vercel
- ✅ Dependencias correctamente configuradas

---

## 📋 Pasos para Desplegar

### **1. Acceder a Vercel**

Ve a: **https://vercel.com/new**

### **2. Conectar con GitHub**

1. Haz clic en el botón **"Continue with GitHub"**
2. Si no has iniciado sesión, ingresa con tu cuenta de GitHub
3. Autoriza a Vercel para acceder a tus repositorios (si es la primera vez)

### **3. Importar el Repositorio**

1. Busca el repositorio: **`freetour-chile`**
2. Haz clic en **"Import"** al lado del repositorio

### **4. Configurar el Proyecto**

Vercel detectará automáticamente que es un proyecto Next.js. La configuración por defecto es:

```
Framework Preset: Next.js
Root Directory: ./
Build Command: next build
Output Directory: .next
Install Command: npm install
```

**No necesitas cambiar nada.** ✅

### **5. Variables de Entorno (Opcional)**

Tu aplicación actualmente no requiere variables de entorno secretas. El webhook de n8n está hardcodeado en el código:

```typescript
const N8N_WEBHOOK_URL = "https://n8n.resto.guruweb.com.ar/webhook/carlos-activador";
```

Si en el futuro quieres hacerlo configurable, puedes agregar:
- Nombre: `N8N_WEBHOOK_URL`
- Valor: `https://n8n.resto.guruweb.com.ar/webhook/carlos-activador`

**Por ahora, puedes omitir este paso.**

### **6. Desplegar**

1. Haz clic en el botón **"Deploy"**
2. Espera 2-3 minutos mientras Vercel:
   - Clona tu repositorio
   - Instala las dependencias
   - Construye la aplicación
   - La despliega

### **7. ¡Listo! 🎉**

Una vez completado, verás:
- ✅ Una URL de producción (ej: `freetour-chile.vercel.app`)
- ✅ Un preview de tu sitio
- ✅ Logs del build

---

## 🔄 Despliegues Automáticos

Ahora, cada vez que hagas `git push` a la rama `main`, Vercel automáticamente:
1. Detectará los cambios
2. Construirá la nueva versión
3. La desplegará en producción

---

## 🌐 Conectar tu Dominio Personalizado (Opcional)

Si tienes un dominio en Hostinger y quieres usarlo:

### **Opción 1: Dominio Completo**
Ejemplo: `freetour-santiago.com`

1. Ve a **Project Settings** → **Domains**
2. Agrega tu dominio
3. En Hostinger, configura los DNS:
   - Tipo: `A`
   - Nombre: `@`
   - Valor: `76.76.21.21`
   
   Y también:
   - Tipo: `CNAME`
   - Nombre: `www`
   - Valor: `cname.vercel-dns.com`

### **Opción 2: Subdominio**
Ejemplo: `tours.tudominio.com`

1. Ve a **Project Settings** → **Domains**
2. Agrega tu subdominio
3. En Hostinger, configura:
   - Tipo: `CNAME`
   - Nombre: `tours` (o el subdominio que quieras)
   - Valor: `cname.vercel-dns.com`

---

## 🐛 Solución de Problemas

### Error: "Build failed"
- Verifica que el build funcione localmente: `npm run build`
- Revisa los logs en Vercel para ver el error específico

### Error: "API route not working"
- Las API routes funcionan automáticamente en Vercel
- Verifica que la ruta sea correcta: `/api/webhook/tour-status`

### Error: "File system not working"
- ⚠️ **IMPORTANTE**: El sistema de archivos en Vercel es **efímero**
- Los archivos escritos se borran después de cada deploy
- **Solución**: Usa una base de datos (Vercel KV, PostgreSQL, etc.)

---

## 📊 Monitoreo

Vercel te proporciona:
- 📈 Analytics de tráfico
- 🐛 Error tracking
- 📝 Logs en tiempo real
- 🚀 Performance metrics

Todo gratis en el plan Hobby.

---

## 🔗 Enlaces Útiles

- **Dashboard de Vercel**: https://vercel.com/dashboard
- **Documentación de Next.js en Vercel**: https://vercel.com/docs/frameworks/nextjs
- **Tu Repositorio**: https://github.com/LucioVita/freetour-chile

---

## ⚠️ Nota Importante sobre el Sistema de Archivos

Tu aplicación actualmente escribe en un archivo JSON:
```typescript
// src/app/api/webhook/tour-status/route.ts
fs.writeFileSync(filePath, JSON.stringify(toursStatus, null, 2));
```

**Problema**: En Vercel, el sistema de archivos es efímero. Los cambios se perderán después de cada deploy.

**Solución Recomendada**: Migrar a una base de datos. Opciones gratuitas:
1. **Vercel KV** (Redis) - Gratis hasta 256MB
2. **Vercel Postgres** - Gratis hasta 256MB
3. **MongoDB Atlas** - Gratis hasta 512MB

¿Necesitas ayuda para migrar a una base de datos? ¡Avísame!

---

## 🎯 Próximos Pasos

1. ✅ Desplegar en Vercel (siguiendo esta guía)
2. 🔄 Configurar dominio personalizado (opcional)
3. 💾 Migrar de archivos JSON a base de datos (recomendado)
4. 📊 Configurar analytics (opcional)

---

**¿Preguntas?** Estoy aquí para ayudarte. 🚀
