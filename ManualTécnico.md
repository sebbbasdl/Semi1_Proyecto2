# Manual técnico 

# Usuarios IAM y Políticas Asociadas

## Usuario IAM para el manejo del bucket de S3

- **Nombre del Usuario IAM:** `AdminS3`
- **Descripción:** Este usuario tiene permisos para administrar el bucket de S3 utilizado para almacenar las imágnes de los usuarios de la aplicación.
- **Políticas Asociadas:**
  - `AmazonS3FullAccess`: Esta política otorga acceso completo a todos los recursos de Amazon S3, permitiendo la creación, modificación y eliminación de buckets, así como la gestión de objetos dentro de los buckets.

## Usuario IAM para el manejo de las instancias EC2

- **Nombre del Usuario IAM:** `AdminEC2`
- **Descripción:** Este usuario tiene permisos para administrar la instancia EC2 que aloja la base de datos y la instancia EC2 que aloja el frontend y backend de la aplicación.
- **Políticas Asociadas:**
  - `AmazonEC2FullAccess`: Esta política proporciona acceso completo a todos los recursos de Amazon EC2, lo que permite crear, modificar y eliminar instancias EC2, así como gestionar grupos de seguridad y otras configuraciones.

## Usuario IAM para el manejo de Cognito, Rekognition, Translate y AWSLambda

- **Nombre del Usuario IAM:** `Utils`
- **Descripción:** Este usuario tiene permisos para administrar diferentes utilidades de la aplicación, como lo son Cognito para el manejo de usuarios, Rekognition para reconocer diferentes atributos en las imágenes, Translate para traducir texto dentro de la aplicación y AWSLambda para ejecutar parte del código de la aplicación sin un servidor.
- **Políticas Asociadas:**
  - `AmazonCognito`: En este parte, no fue otorgado el permiso FullAcces pero posee los permisos necesarios para manejar los usuarios mediante la API de Cognito, así como el acceso de lectura y configuración limitada de Cognito.
  - `AmazonRekognitionFullAccess`: Otorga acceso completo a los recursos de Rekognition para la manipulación de imágenes, como comparación de rostros, detección de etiquetas, entre otros.
  - `TranslateFullAccess`: Proporciona acceso completo a los recursos de Amazon Translate.
  - `AWSLambda_FullAccess`: Esta política provee de acceso completo al servicio de AWS Lambda, así como a las funciones de la consola AWS Lambda.

## Usuario IAM administrador general

- **Nombre del Usuario IAM:** `Administrador_202003926`
- **Descripción:** Este usuario funge como administrador general de los recursos de AWS, por lo cual puede acceder a todos los servicios disponibles.
- **Políticas Asociadas:**
  - `AdministratorAccess`: Esta política otorga acceso completo a todos los servicios y recursos de AWS.

# Arquitectura de SemiSocial
![Arquitectura](https://github.com/Gerson7w7/Semi1-2S-G9/blob/master/arquitectura.jpeg)


## Usuarios y Autenticación:

Se implementó Cognito para la autenticación de usuarios. La información del usuario se almacenó en el pool de usuarios de Cognito.

## Almacenamiento de Imágenes:

Se configuró un bucket de S3 (`semi1proyecto-g9`) para almacenar imágenes. Las imágenes de perfil de usuario y publicaciones se almacenaron en este bucket.

## Servidor y Aplicación Web:

Se utilizaron instancias EC2 para alojar la aplicación web y el servidor. La seguridad en las instancias EC2 se implementó mediante security groups. Docker y docker-compose se utilizaron para la implementación y gestión de contenedores.

## Base de Datos:

Otra instancia EC2 se configuró exclusivamente para la base de datos. Docker y docker-compose se emplearon para implementar y gestionar el contenedor de la base de datos.

## Servicios de AWS:

### Rekognition:

Se utilizó Rekognition para obtener etiquetas de las imágenes publicadas. También se empleó Rekognition para el reconocimiento facial en el proceso de autenticación.

### Translate:

Translate se implementó para traducir el texto de las publicaciones a diferentes idiomas.

## Lambda y API Gateway:

Se implementó una función Lambda y una API Gateway para la funcionalidad de Chat de amigos.

## Seguridad:

Se configuraron permisos y roles adecuados utilizando IAM. Además, se aseguraron los endpoints del servidor backend utilizando JWT para la autenticación.
