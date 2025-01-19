import { Locator, Page } from '@playwright/test';

export class TaskPage {
  private taskList: Locator;
  private taskBtn: Locator;
  private taskName: Locator;
  private addTaskBtn: Locator;
  private addTaskLeftBtn: Locator;
  page: Page;

  constructor(page: Page) {
    this.page = page;
    this.taskList = page.locator('div.task_content');
    this.taskBtn = page.locator('button.plus_add_button');
    this.taskName = page.locator('div[aria-label="Task name"]');
    this.addTaskBtn = page.getByTestId('task-editor-submit-button');
    this.addTaskLeftBtn = page.locator('button:has(span:has-text("Add task"))').first();

  }

  // Crear una tarea
  async createTask() {
    const randomTaskName = `Task-${Math.random().toString(36).substring(2, 8)}`;
    await this.taskBtn.click();
    await this.taskName.fill(randomTaskName);
    await this.addTaskBtn.click();     
    return randomTaskName;
  }

  async createTaskSideBtn() {
    const randomTaskName = `Task-${Math.random().toString(36).substring(2, 8)}`;
    await this.addTaskLeftBtn.click({ delay: 500 });
    await this.taskName.fill(randomTaskName);
    await this.addTaskBtn.click({ delay: 500 });     
    return randomTaskName;
  }


  async isTaskCreated(taskName: string): Promise<boolean> {
    await this.page.waitForSelector('div.task_content');
    // Esperamos que la tarea esté visible
    const taskLocator = this.page.locator(`div.task_content:has-text("${taskName}")`);
    return await taskLocator.isVisible();

  }
}
