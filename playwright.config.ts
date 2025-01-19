import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests', // Directorio donde se encuentran las pruebas
  timeout: 30000, // Tiempo de espera para cada prueba
  workers: 1,
  reporter: [
    ['dot'], // Muestra un reporte básico en la consola
    ['json', { outputFile: 'test-results.json' }], // Genera un archivo JSON con el resultado
    ['html', { outputFolder: 'playwright-report' }] // Genera un informe HTML en 'playwright-report'
  ],
  use: {
    headless: true, // Ejecutar sin interfaz gráfica
    baseURL: 'https://app.todoist.com/',  // URL base
    screenshot: 'only-on-failure', // Tomar pantallas solo si la prueba falla
    video: 'retain-on-failure', // Grabar video solo si la prueba falla
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'] }, // Ejecutar pruebas en Chrome de escritorio
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 12'] }, // Ejecutar pruebas en un dispositivo móvil
    },
  ],
});
