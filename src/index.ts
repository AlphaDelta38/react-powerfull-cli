#!/usr/bin/env node
import { Command } from 'commander';
import initFolderStructure from "./interactive/create-folder-structure/index.js";
import initGenerateTemplateCommands from "@/command/generate.js";
import { GeneralConfigManager } from '@/utils/config-utils.js'
import { initStructureCommand } from "@/command/create-structure.js";

GeneralConfigManager.createConfig()

export const program = new Command();

program
    .name('React powerfull CLI')
    .description('React CLI for management folders, and use template')
    .version('0.1.0');

initFolderStructure()

initStructureCommand()

initGenerateTemplateCommands()


program.parse(process.argv);
