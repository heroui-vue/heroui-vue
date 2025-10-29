#!/usr/bin/env node

/**
 * Verification script for HeroUI Vue documentation i18n setup
 * This script checks that the internationalization is properly configured
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = __dirname;
const DIST_DIR = path.join(DOCS_DIR, ".vitepress", "dist");

// Colors for console output
const colors = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  reset: "\x1b[0m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFileExists(filePath, description) {
  if (fs.existsSync(filePath)) {
    log(`✓ ${description}`, "green");
    return true;
  } else {
    log(`✗ ${description}`, "red");
    return false;
  }
}

function checkDirectoryStructure() {
  log("\n📁 Checking directory structure...", "blue");

  const requiredDirs = [
    "en",
    "en/guide",
    "en/components",
    "zh",
    "zh/guide",
    "zh/components",
  ];

  let allValid = true;

  requiredDirs.forEach((dir) => {
    const dirPath = path.join(DOCS_DIR, dir);
    if (!checkFileExists(dirPath, `Directory: ${dir}`)) {
      allValid = false;
    }
  });

  return allValid;
}

function checkSourceFiles() {
  log("\n📄 Checking source files...", "blue");

  const requiredFiles = [
    "en/index.md",
    "en/guide/introduction.md",
    "en/guide/installation.md",
    "en/components/button.md",
    "en/components/alert.md",
    "en/components/chip.md",
    "zh/index.md",
    "zh/guide/introduction.md",
    "zh/guide/installation.md",
    "zh/components/button.md",
    "zh/components/alert.md",
    "zh/components/chip.md",
  ];

  let allValid = true;

  requiredFiles.forEach((file) => {
    const filePath = path.join(DOCS_DIR, file);
    if (!checkFileExists(filePath, `Source file: ${file}`)) {
      allValid = false;
    }
  });

  return allValid;
}

function checkBuildOutput() {
  log("\n🏗️ Checking build output...", "blue");

  if (!fs.existsSync(DIST_DIR)) {
    log(
      '✗ Build output directory not found. Run "npm run build" first.',
      "red",
    );
    return false;
  }

  const requiredBuildFiles = [
    "index.html",
    "en/index.html",
    "en/guide/introduction.html",
    "en/guide/installation.html",
    "en/components/button.html",
    "en/components/alert.html",
    "en/components/chip.html",
    "zh/index.html",
    "zh/guide/introduction.html",
    "zh/guide/installation.html",
    "zh/components/button.html",
    "zh/components/alert.html",
    "zh/components/chip.html",
  ];

  let allValid = true;

  requiredBuildFiles.forEach((file) => {
    const filePath = path.join(DIST_DIR, file);
    if (!checkFileExists(filePath, `Build file: ${file}`)) {
      allValid = false;
    }
  });

  return allValid;
}

function checkConfiguration() {
  log("\n⚙️ Checking VitePress configuration...", "blue");

  const configPath = path.join(DOCS_DIR, ".vitepress", "config.ts");

  if (!fs.existsSync(configPath)) {
    log("✗ VitePress config file not found", "red");
    return false;
  }

  const configContent = fs.readFileSync(configPath, "utf8");

  const checks = [
    { pattern: /locales:\s*{/, description: "Locales configuration" },
    { pattern: /root:\s*{/, description: "Root locale configuration" },
    { pattern: /zh:\s*{/, description: "Chinese locale configuration" },
    { pattern: /label:\s*['"]English['"]/, description: "English label" },
    { pattern: /label:\s*['"]简体中文['"]/, description: "Chinese label" },
    { pattern: /lang:\s*['"]en['"]/, description: "English language code" },
    { pattern: /lang:\s*['"]zh-CN['"]/, description: "Chinese language code" },
  ];

  let allValid = true;

  checks.forEach((check) => {
    if (check.pattern.test(configContent)) {
      log(`✓ ${check.description}`, "green");
    } else {
      log(`✗ ${check.description}`, "red");
      allValid = false;
    }
  });

  return allValid;
}

function checkLanguageContent() {
  log("\n🌐 Checking language-specific content...", "blue");

  // Check English content
  const enIndexPath = path.join(DOCS_DIR, "en", "index.md");
  const zhIndexPath = path.join(DOCS_DIR, "zh", "index.md");

  let allValid = true;

  if (fs.existsSync(enIndexPath)) {
    const enContent = fs.readFileSync(enIndexPath, "utf8");
    if (enContent.includes("Vue 3 Component Library")) {
      log("✓ English content detected in en/index.md", "green");
    } else {
      log("✗ English content not found in en/index.md", "red");
      allValid = false;
    }
  }

  if (fs.existsSync(zhIndexPath)) {
    const zhContent = fs.readFileSync(zhIndexPath, "utf8");
    if (zhContent.includes("Vue3组件库") || zhContent.includes("Vue 3组件库")) {
      log("✓ Chinese content detected in zh/index.md", "green");
    } else {
      log("✗ Chinese content not found in zh/index.md", "red");
      allValid = false;
    }
  }

  return allValid;
}

function checkUrlStructure() {
  log("\n🔗 Checking URL structure...", "blue");

  const checks = [
    {
      file: "en/guide/introduction.md",
      expectedLinks: ["/en/guide/installation"],
    },
    {
      file: "zh/guide/introduction.md",
      expectedLinks: ["/zh/guide/installation"],
    },
    {
      file: "en/components/button.md",
      expectedLinks: ["/en/guide/installation"],
    },
    {
      file: "zh/components/button.md",
      expectedLinks: ["/zh/guide/installation"],
    },
  ];

  let allValid = true;

  checks.forEach((check) => {
    const filePath = path.join(DOCS_DIR, check.file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf8");
      const hasCorrectLinks = check.expectedLinks.some((link) =>
        content.includes(link),
      );

      if (hasCorrectLinks) {
        log(`✓ Correct locale links in ${check.file}`, "green");
      } else {
        log(`⚠ Check locale links in ${check.file}`, "yellow");
      }
    }
  });

  return allValid;
}

function main() {
  log("🚀 HeroUI Vue i18n Verification Script", "blue");
  log("=====================================", "blue");

  const results = [
    checkDirectoryStructure(),
    checkSourceFiles(),
    checkConfiguration(),
    checkLanguageContent(),
    checkUrlStructure(),
    checkBuildOutput(),
  ];

  const allPassed = results.every((result) => result);

  log("\n📊 Summary:", "blue");
  log("===========", "blue");

  if (allPassed) {
    log("🎉 All checks passed! i18n setup is working correctly.", "green");
    log("\nYour documentation is ready with:", "green");
    log("• English as default language (accessible at / and /en/)", "green");
    log("• Chinese as additional language (accessible at /zh/)", "green");
    log("• Proper build output for both languages", "green");
  } else {
    log("❌ Some checks failed. Please review the issues above.", "red");
    process.exit(1);
  }

  log("\n🔧 Commands:", "blue");
  log("• Development: npm run dev", "blue");
  log("• Build: npm run build", "blue");
  log("• Verify: node verify-i18n.js", "blue");
}

// Run the verification
main();
