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

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjG6Ty6N0RCGCYOyQusNdjsm0VRyaUP4rPnU9WHJtjAoZlotbMkrrLruCDtlLO7_uRWHe3hlDm6Q3TJZSrHyKDvnc-2GRBz1909rRrdL7hEE_m4IPpD93dScTcmAPaa_pzCVyRLQCaBFbIp0icDD24ollTfM8tOrhVuGLtbFvEi6F_whMumxX0B7ocShc0/s1830/1.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiO7nc8INrOY90MOlFsGwCZgvoGWaY8m29q69IUdFbtuOUPMues40BFuDggsr12xRx-8m5Ujx84KyyNpDai-7myUQ6T46KUuYaD7w7Scu9bqXGyU9j5tnbpL-5X8Dryo4fv1POlHWbmZa4-sRHE4CUDX1cG6HyNmiuFhzjRh5V9NMgmhWS288V-ZdfjQfQ/s1830/2.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjB2yReu3IeBQRttAVAWeLqOQ6YgICdI8meSq1L79xIEPLNMfB271nDvBK-lgb2d65AaPxN6bLuF-4RNAySJg_vWOvIeriRXculwSyie4sUWDSSEkPimhs5k9D0oqutwV06jv1kMBRNLhS6YNtvzsvsl_zpKn29N6rEGKeA3g2mZqzI0VMEl6oWrdnUV9s/s1861/3.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhIP0VSVs-vrkzKzPtADnkqcFVqOjrsQCbvB1opDZWkk28nY1pk3HLvc97Z-XoLo77XUW8YG49_p-e-mKZmyOMIv3yf8IwZIjAVHNQDOtIAg1Kkb6J-R5eroPRei52f8SxNRM4NKpOuUIyIVI8mGPVh6CmXej-s3a-lyMg-Rgtw8B1r-PT0SDkTX_H7GJg/s1861/4.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh9LaSV8dR-9hVVNWV76EIooVnMffmVYKgI6o6nxPXqlngEBdSdDSu8fWT5QFiHinWIOkQQQLz0tPeZduXnw680cE8RGLbMtziAzwDSdrm-LTP-tAeLVU6aHxclvLPglD3BJ2qX-3XMsO34VQsjc23h7sTj2O3W_KmwhxB_P4etjYnQzaq10M3I0d-hqVE/s1861/5.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEipL5-oYASQcOCe5sYgUQyOHzTdEVTdZDxHCd8c-D5DvoLrBChB36Cl0ZoowzMVQhzuhoRdP84GcjswnSFB4CfUG1EIleFoI5zb5Ov9uW0S8bv5jZODKWYSzY3XJ34I37fxTLJU82-PxXJjvYvWowGs1YqtaD2dJHHnerHBSD_MNET0NNOqJmeoxlYOyZg/s1861/6.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjQ1_WqS17Ezw1wpypnmiHGaDu60HHEkKtGS_y4qM2awwmRsBfhtZucZb-ajVOnTUfAp311Bth6PbwJN01epdW-LFdn8ddKqAAq47HeVZM3sB4xeqJ4ESp9z2W6HP_OhyphenhyphenQFTqi9PwFtUfxXUStFLJfTLEDLXFeMRydVBJ0rjmD_ODLL7CKV6SWL6sveOoQ/s1861/7.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgP-Epwbl21g_Fqs9cflw5dXWzidJmB2CXflIiz0JxAqg3BDDH9Q8vYR_7boXjuB5nU2KxmsPhz0RHvGLEsAgBW8eq8BrwNa2T-LyAuugtxHV5phnuDLJ-DVe1B4eSqH7ynkWIgfvUqKC86QoFis02Wd4jIwQcfL4SRiSiv2mo6LvCEq6dEGGxSdRM3RZ8/s1861/8.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEivdSsmqC4tkZSgIT4Ic-4ruClrM_uAnTrG-gOXlLGIomCGsn0OrqvnuSxyE5frkVnivpClKlE_x5SD8GlDLqIRNKCxIyuTtLzij5Zgu0384uLY0koAq8nxMHDhyphenhyphent-qQcxH1Zs6BUsB1HsMiG8Q4wvFT-X7Xg4CMpGSDE4FirWMvlLTXtDI4WHAqvwYsVQ/s1861/9.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhw1mu_v3qL8YoVrU4fDFdIq62d55JsGrkYtLr5_0aEWaY8th9Kv3e9R_Kdwq-Raz9cs-9GpKBkSmbVzcXQkZsZQOtk0NWXjywmGQLsAsrJQAR5uOp749vR8rd4xqQauFJqTcbXRC4YKrZc5A1kNZAAZ279LiopvuQlzBIWRpTESmOMfR88-qgCDSUD2qo/s1861/10.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEitnesNruLpQrC3gHdODMVgJxriS3Hb7cVtpw5722gVMiwjcZVTNRjkM8ZQN20WO7IMRttvu-U31AtAyb3Yb8nA8Bj5m-BcjrSJzq_ssq6TtWPmGru1Ur1CF7VDgunDX2qLH0Tt2PoehS2M5VAWofm3uC7RdjxJiXEhvUEL46RfyU2cjKXI1P-nCdni610/s1861/11.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi6oDgIEbEQil1TYxxCvoJelRryPBBWbDG_mwCZnQYYdcUkDJ1dnbbBCjPrgR_kP1x7RPDvGtoe3WmRytgQTthCERQaxm0DHcVi3LbUIfVaECQaLemkzId7gjSP_GK-fAq5hQlNfJei1quiCsh_jpOKl0eJgoSDtxvkvoZvFXuP7SUR1GDFu13-8E7G4MM/s1861/12.png)

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