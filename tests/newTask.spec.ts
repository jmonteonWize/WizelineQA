import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { config } from '../config/config';
import { TaskPage } from '../pages/taskPage'; 
import assert from 'assert';
test.describe('Tests tasks', () => {
  let loginPage: LoginPage;
  let taskPage: TaskPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    taskPage = new TaskPage(page);
    await page.goto(config.baseUrl);  // Usa la URL base configurada en .env
  });

  test('Add new task', async () => {
    await loginPage.login(config.email, config.password);
    await loginPage.todayHeader();
   // Crea una tarea con un nombre aleatorio
   const randomTaskName = await taskPage.createTask();

   // Imprime el nombre de la tarea para verificar si es el correcto
   console.log('Tarea creada:', randomTaskName);
 
   // Verifica si la tarea se creó correctamente en la lista
   const taskCreated = await taskPage.isTaskCreated(randomTaskName);

  });
  test('create 10 tasks', async () => {
    await loginPage.login(config.email, config.password);
    await loginPage.todayHeader();
    const createdTaskNames: string[] = []; // Array para almacenar los nombres de las tareas creadas
  
    // Crear 10 tareas
    for (let i = 0; i < 10; i++) {
      const randomTaskName = await taskPage.createTaskSideBtn();
      await createdTaskNames.push(randomTaskName); // Almacenamos el nombre de la tarea creada
      await console.log(`Tarea ${i + 1} creada:`, randomTaskName); // Imprimir el nombre de la tarea creada
    }
  
    // Validar que cada tarea se haya creado correctamente
    for (const taskName of createdTaskNames) {
      const taskCreated = await taskPage.isTaskCreated(taskName);
      await expect(taskCreated).toBe(true); // Verifica que la tarea esté visible en la lista
    }
  });

});

