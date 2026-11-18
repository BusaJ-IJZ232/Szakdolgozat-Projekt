<?php
header('Content-Type: application/json; charset=utf-8');

$host = '127.0.0.1;port=3307';
$dbname = 'busa_boraszat';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    $sql = "SELECT * FROM borok WHERE 1=1";
    $params = [];

    if (!empty($_GET['vintage'])) {
        $sql .= " AND evjarat = :vintage";
        $params[':vintage'] = (int)$_GET['vintage'];
    }

    if (!empty($_GET['type']) && $_GET['type'] !== 'all') {
        $sql .= " AND fajta = :type";
        $params[':type'] = $_GET['type'];
    }

    if (!empty($_GET['price'])) {
        $sql .= " AND ar <= :price";
        $params[':price'] = (int)$_GET['price'];
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $talalatok = $stmt->fetchAll();

    echo json_encode($talalatok, JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Adatbázis kapcsolódási hiba: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>