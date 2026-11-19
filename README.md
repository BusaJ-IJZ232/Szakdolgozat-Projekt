Ennek az útmutatónak a célja, hogy a weboldal termékkatalógussal kapcsolatos szűrési, adatbázis (MYSQL) illetve szerveroldali (PHP)

funkcióinak helyi környezetben történő beállítását segítse.



Megjegyzés: A fent felsorolt funkciók mindegyike XAMPP környezetben lett tesztelve, így a lent felsorolt utasítások is arra vonatkoznak.







&#x09;**1. Letöltést és telepítést követően futtassa rendszergazdaként a XAMPP Control Panel alkalmazást.**



* Indítsa el az Apache és a MySQL szolgáltatást a melettük lévő Start gombokkal.



* A tesztelés során nálam a MySQL a 3307-es porton futott, illetve a szures.php fájlban is ez lett beállítva:

($host = '127.0.0.1;port=3307';)



* De ez alap esetben a 3306-os port.



* Ahhoz, hogy működjön a weboldal, a MySQL portját állítsa át a XAMPP-on belül:



Kattintás a MySQl sorában lévő **Config** gombra	>>	legördülő menü: nyissa meg a **my.ini** fájlt		>>	Fájlon belül két sor: **Port:**<port száma> (3307 legyen) >> Mentés



Ezután kattintson a **XAMPP Control Panel** jobb felső sarkában lévő **Config** gombra (NEM a MySQL sorában lévő config)		>>	Felugró ablakon belül kattintson a **Service and Port Settings** gombra	>>	**Service Settings** felugró ablakon **MySQL** fül alatt **Main Port** legyen 3307	>> Mentés





Illetve Apache-nál:



Kattintson az Apache sorában lévő **Config** gombra	>>	legördülő menü: nyissa meg a **config.inc.php** fájlt	>>	Keresse meg ezt a sort a fájlban: **$cfg\['Servers']\[$i]\['host'] =** 	>>	Egyenlőségjel után: '127.0.0.1:3307';   tehát így nézzen ki a sor: **$cfg\['Servers']\[$i]\['host'] = '127.0.0.1:3307';  >>**

Mentés


Végül a böngészőbe másoljuk be: http://localhost/phpmyadmin/ és a felületen az SQL fül alatt futtassuk a borok.sql állományt.









&#x09;2. **Másolja be a projekt teljes állományát tartalmazó "Szakdolgozat projekt" mappáját a XAMPP htdocs mappájába:** **C:\\xampp\\htdocs**





* Ahhoz, hogy a weboldal működését tesztelni tudja, tetszőleges böngészőben írja be a következőt: http://localhost/szakdolgozat%20projekt/boraink.html

