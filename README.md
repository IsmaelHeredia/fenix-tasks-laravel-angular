# Fenix Tasks

En este proyecto se hizo un sistema para registrar espacios de trabajo en los cuales se pueden asignar tareas y registrar los tiempos de trabajo. Este sistema usa Laravel como Backend y desde el lado de Frontend usa Angular con Material. La base de datos elegida para este proyecto fue MySQL.

Las funciones incorporadas son : 

Inicio de sesión obligatorio para usar el sistema protegido con JWT.

Posibilidad de cambiar usuario y contraseña.

Posibilidad de cambiar el theme completo del sistema a un modo oscuro o claro.

Se puede agregar, editar y borrar espacios de trabajo. En la misma sección se maneja un filtro de redux para buscar por nombre. En cada espacio de trabajo se puede establecer la fecha de inicio, la fecha de finalización y el estado en el que se encuentra el espacio.

Dentro de los espacios se pueden crear, editar y borrar tareas, las mismas también se manejan por fechas de inicio y finalización, además poseen un cronómetro para medir el tiempo que lleva cada tarea.

En el inicio del dashboard se muestran unas estadísticas del sistema que consisten en mostrar dos gráficos, en el primero se muestran los espacios que tuvieron más días de trabajo y en el segundo gráfico se muestran los que demoraron menos. También se muestran dos tablas, en la primera se muestran las 3 tareas que llevaron más tiempo y en la segunda se muestran las que menos.

Se incluye un calendario donde se muestran las fechas de inicio y finalización de todas los espacios y tareas creados.

A continuación se muestran unas imágenes del sistema en funcionamiento.

![screenshot]()

Para la correcta instalación del sistema se deben seguir los siguiente pasos. 

En la carpeta del Backend que sería "sistema-api" se debe renombrar el archivo .env.example a solo .env y editar la configuración con los datos de tu conexión MySQL, el SECRET_KEY que sería la clave para generar el JWT.

Una vez editado el archivo .env se deben ejecutar los siguiente comandos : 

```
composer install
```
```
php artisan key:generate
```
```
php artisan migrate
```
```
php artisan db:seed --class=DatabaseSeeder
```
```
php artisan storage:link
```

Finalmente para iniciar el servidor se debe ejecutar este comando : 

```
php artisan serve --port=7777
```

En la carpeta del Frontend que sería "sistema-frontend" se debe ejecutar el siguiente comando para instalar las dependencias : 

```
npm install
```

En esa misma carpeta deben ir al directorio "environments" para modificar los archivos environment.ts reemplazando las variables "apiUrl" y "imagesUrl" por la ruta de su servidor Backend.

Finalmente para iniciar el servidor se debe ejecutar este comando : 

```
npm run start
```