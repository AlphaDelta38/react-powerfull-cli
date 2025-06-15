#!/usr/bin/env node
import { Command } from 'commander';
import createFolderStructure from "./interactive/create-folder-structure/index.js";
import { createConfig } from './utils/config-utils.js'

createConfig()

export const program = new Command();

program
    .name('React powerfull CLI')
    .description('React CLI for management folders, and use template')
    .version('0.1.0');


createFolderStructure()


program.parse(process.argv);