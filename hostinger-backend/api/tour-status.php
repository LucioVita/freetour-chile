<?php
/**
 * API para gestionar el estado de los tours
 * Compatible con Hostinger Shared Hosting
 */

// Configuración CORS para permitir requests desde Vercel
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Ruta del archivo de estado
$statusFile = __DIR__ . '/../data/tours-status.json';

// Asegurar que el directorio existe
$dataDir = dirname($statusFile);
if (!file_exists($dataDir)) {
    mkdir($dataDir, 0755, true);
}

/**
 * Leer el estado actual de los tours
 */
function getToursStatus($file) {
    if (!file_exists($file)) {
        return [];
    }
    
    $content = file_get_contents($file);
    $data = json_decode($content, true);
    
    return $data ?: [];
}

/**
 * Guardar el estado de los tours
 */
function saveToursStatus($file, $data) {
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    return file_put_contents($file, $json, LOCK_EX) !== false;
}

/**
 * Manejar GET - Obtener estado de todos los tours
 */
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $status = getToursStatus($statusFile);
        
        echo json_encode([
            'success' => true,
            'data' => $status,
            'timestamp' => date('c')
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Failed to read status',
            'message' => $e->getMessage()
        ]);
    }
    exit();
}

/**
 * Manejar POST - Actualizar estado de un tour
 */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Leer el body del request
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        
        if (!$data) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'error' => 'Invalid JSON'
            ]);
            exit();
        }
        
        // Validar que tenga el campo 'slug'
        if (!isset($data['slug'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'error' => 'Slug is required'
            ]);
            exit();
        }
        
        $slug = $data['slug'];
        $status = isset($data['status']) ? $data['status'] : null;
        
        // Convertir status a boolean
        // Acepta: "si"/"no" (string) o true/false (boolean)
        if (is_string($status)) {
            $isActive = strtolower($status) === 'si';
        } else {
            $isActive = (bool)$status;
        }
        
        // Leer estado actual
        $toursStatus = getToursStatus($statusFile);
        
        // Actualizar el tour específico
        $toursStatus[$slug] = $isActive;
        
        // Guardar
        if (saveToursStatus($statusFile, $toursStatus)) {
            echo json_encode([
                'success' => true,
                'message' => "Tour $slug updated",
                'slug' => $slug,
                'currentStatus' => $isActive,
                'timestamp' => date('c')
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Failed to save status'
            ]);
        }
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Internal server error',
            'message' => $e->getMessage()
        ]);
    }
    exit();
}

// Método no permitido
http_response_code(405);
echo json_encode([
    'success' => false,
    'error' => 'Method not allowed',
    'allowed' => ['GET', 'POST']
]);
