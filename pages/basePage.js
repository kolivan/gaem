import { Page } from "@playwright/test";
const config = require("../playwright.config");

exports.BasePage = class BasePage {
  /**
   * @param relativeUrl
   */
  constructor(page, relativeUrl) {
    this.page = page;
    this.relativeUrl = relativeUrl;
  }

  /** Methods */
  async open() {
    await this.page.goto(`${config.use.baseUrl}${this.relativeUrl}`);
  }

  /** Assertions */

}