# CMedico

## Descripción
CMedico es una aplicación enfocada en la gestión de inventario médico y la administración de consultas para pacientes. Esta herramienta facilita el manejo eficiente de recursos en un entorno médico, permitiendo un control detallado sobre los medicamentos y el historial de consultas.

## Características
- **Gestión de Inventario**: Permite agregar y quitar elementos del inventario de forma dinámica.
- **Consultas a Pacientes**: Facilita la creación y manejo de consultas médicas, permitiendo agregar medicamentos y comentarios.
- **Medidas de Seguridad**: Prevención de eliminación de consultas que contengan medicamentos, para mantener la integridad del historial médico.
- **Generación de Reportes**: Capacidad para generar reportes sobre el uso de medicamentos, con la opción de exportar los datos a PDF.

## Dependencias
Instale las dependencias necesarias ejecutando los siguientes comandos:

```npm i @ant-design/icons.```
```npm i antd```
```npm i bootstrap```
```npm i firebase```
```npm i react-bootstrap```
```npm i react-dom```
```npm i react-icons```
```npm i sort-by```


## Configuración de Firebase
Configura `firebase.js` con tu API de Firebase personal. Asegúrate de crear las colecciones: `Users`, `consultas`, `products`, y `usedProduct` antes de utilizar la aplicación.
en Users, debes crear un documento para el primer usuario, `userName, password,userType`

## Roles de Usuario
- **Admin (1)**: Puede ver y modificar el inventario.
- **Usuario Normal (2)**: Solo tiene permisos para visualizar el inventario.

## Instalación y Ejecución
1. Clonar el repositorio.
2. Ejecutar `npm install` para las dependencias.
3. Iniciar la aplicación con `npm run dev`.

